import { canonicalBlockId } from './block-ids.js';
import { aggregateFrames } from './display/profile-view.js';
import { blockLabel, procedureName, scriptLabel, targetLabel } from './labels.js';

export { aggregateFrames };

export const PROFILE_VERSION = 1;
const WORK_FRACTION = 0.75;
const HISTORY_FRAMES = 1800;
const DONE = 4;

const PATH = Symbol('spre.profilePath');

const makeNode = (id, parent, kind, label, extra) => ({ id, parent, kind, label, self: 0, calls: 0, kids: new Map(), ...extra });

export function createProfiler(ctx) {
    const { runtime, clock } = ctx;
    const work = clock.work;
    let session = null;

    const adopt = (parent, key, node) => {
        node.id = session.nodes.length;
        node.parent = parent.id;
        node.script = node.kind === 'script' ? node.id : (parent.script ?? -1);
        session.nodes.push(node);
        session.frameSelf.push(0);
        parent.kids.set(key, node);
        return node;
    };

    const charge = (node, ops) => {
        node.self += ops;
        if (ops === 0) return;
        const { frameSelf } = session;
        if (frameSelf[node.id] === 0) session.touched.push(node.id);
        frameSelf[node.id] += ops;
    };

    const scriptNodeOf = thread => {
        const container = thread.blockContainer;
        const monitor = container === runtime.monitorBlocks;
        const targetName = monitor ? '(monitors)' : targetLabel(thread.target);
        const targetNode = session.root.kids.get(targetName)
            ?? adopt(session.root, targetName, makeNode(0, 0, 'target', targetName, {}));
        const top = thread.topBlock;
        const opcode = container.getBlock(top)?.opcode ?? null;
        const found = targetNode.kids.get(top);
        if (found !== undefined) return found;
        const node = adopt(targetNode, top, makeNode(0, 0, 'script', monitor ? (opcode ?? 'monitor') : scriptLabel(container, top), {
            target: targetName,
            block: canonicalBlockId(container, top),
            opcode,
        }));
        session.containers.set(node.id, container);
        return node;
    };

    const callNodeOf = (parent, block) => {
        const proccode = block.mutation?.proccode ?? '?';
        const key = `call\u0000${proccode}`;
        return parent.kids.get(key) ?? adopt(parent, key, makeNode(0, 0, 'call', procedureName(proccode), { target: parent.target, proccode }));
    };

    const blockNodeOf = (parent, container, blockId) => {
        const found = parent.kids.get(blockId);
        if (found !== undefined) return found;
        const block = container.getBlock(blockId);
        if (block?.opcode === 'procedures_call' || block?.opcode === 'procedures_definition') {
            const node = block.opcode === 'procedures_call' ? callNodeOf(parent, block) : parent;
            parent.kids.set(blockId, node);
            return node;
        }
        return adopt(parent, blockId, makeNode(0, 0, 'block', blockLabel(block, container), {
            target: parent.target,
            block: canonicalBlockId(container, blockId),
            opcode: block?.opcode ?? null,
        }));
    };

    const pathCacheOf = thread => {
        const cache = thread[PATH];
        if (cache !== undefined && cache.session === session && cache.top === thread.topBlock
            && cache.container === thread.blockContainer && cache.target === thread.target) return cache;
        const fresh = {
            session,
            top: thread.topBlock,
            container: thread.blockContainer,
            target: thread.target,
            script: scriptNodeOf(thread),
            ids: [],
            nodes: [],
        };
        thread[PATH] = fresh;
        return fresh;
    };

    const pathOf = thread => {
        const cache = pathCacheOf(thread);
        const { ids, nodes, container } = cache;
        const stack = thread.stack;
        const depth = stack.length - 1;
        let i = 0;
        const known = Math.min(depth, ids.length);
        while (i < known && ids[i] === stack[i]) i++;
        if (i < ids.length) {
            ids.length = i;
            nodes.length = i;
        }
        let node = i === 0 ? cache.script : nodes[i - 1];
        for (; i < depth; i++) {
            const id = stack[i];
            const block = container.getBlock(id);
            if (block !== undefined && block.opcode === 'procedures_call') node = callNodeOf(node, block);
            ids.push(id);
            nodes.push(node);
        }
        return node;
    };

    const probe = {
        step(thread) {
            const node = pathCacheOf(thread).script;
            charge(node, 1);
            node.steps = (node.steps ?? 0) + 1;
        },
        block(thread, blockId, run) {
            const before = work.ops;
            const parent = pathOf(thread);
            const container = thread.blockContainer;
            run(thread);
            const leaf = blockId === null ? parent : blockNodeOf(parent, container, blockId);
            charge(leaf, work.ops - before);
            if (leaf !== parent) leaf.calls += 1;
        },
    };

    const onFrame = (frame, ops) => {
        session.frameOps.push(ops);
        const { touched, frameSelf, history } = session;
        const nodes = new Float64Array(touched.length * 2);
        touched.forEach((id, i) => {
            nodes[2 * i] = id;
            nodes[(2 * i) + 1] = frameSelf[id];
            frameSelf[id] = 0;
        });
        touched.length = 0;
        const alive = new Map();
        const at = new Map();
        for (const thread of runtime.threads) {
            if (thread.status === DONE || !thread.target || thread.topBlock === null) continue;
            const script = pathCacheOf(thread).script.id;
            alive.set(script, (alive.get(script) ?? 0) + 1);
            if (!at.has(script)) at.set(script, thread.peekStack());
        }
        const lanes = new Int32Array(alive.size * 2);
        let i = 0;
        for (const [script, count] of alive) {
            lanes[i++] = script;
            lanes[i++] = count;
        }
        history.push({ frame, ops, nodes, lanes, at, threads: runtime.threads.length, clones: runtime._cloneCounter });
        if (history.length > session.historyFrames) history.shift();
    };

    const labelsFor = () => {
        const table = [];
        const index = new Map();
        return {
            table,
            of(script, blockId) {
                if (blockId === null || blockId === undefined) return -1;
                const key = `${script}\u0000${blockId}`;
                let found = index.get(key);
                if (found === undefined) {
                    const container = session.containers.get(script);
                    found = table.length;
                    table.push(blockLabel(container?.getBlock(blockId), container));
                    index.set(key, found);
                }
                return found;
            },
        };
    };

    const timelineOf = records => {
        const count = records.length;
        const lanes = new Map();
        const labels = labelsFor();
        const laneOf = script => {
            let lane = lanes.get(script);
            if (lane === undefined) {
                lane = { script, ops: new Array(count).fill(0), alive: new Array(count).fill(0), at: new Array(count).fill(-1), total: 0 };
                lanes.set(script, lane);
            }
            return lane;
        };
        records.forEach((record, i) => {
            for (let k = 0; k < record.nodes.length; k += 2) {
                const script = session.nodes[record.nodes[k]].script;
                if (script === undefined || script < 0) continue;
                const lane = laneOf(script);
                lane.ops[i] += record.nodes[k + 1];
                lane.total += record.nodes[k + 1];
            }
            for (let k = 0; k < record.lanes.length; k += 2) {
                const lane = laneOf(record.lanes[k]);
                lane.alive[i] = record.lanes[k + 1];
                lane.at[i] = labels.of(record.lanes[k], record.at.get(record.lanes[k]));
            }
        });
        const busy = lane => lane.alive.reduce((sum, n) => sum + (n > 0 ? 1 : 0), 0);
        return {
            frameNumbers: records.map(record => record.frame),
            ops: records.map(record => record.ops),
            threads: records.map(record => record.threads),
            clones: records.map(record => record.clones),
            lanes: [...lanes.values()].sort((a, b) => b.total - a.total || busy(b) - busy(a) || a.script - b.script),
            labels: labels.table,
        };
    };

    const totals = nodes => {
        const total = nodes.map(node => node.self);
        for (let i = nodes.length - 1; i > 0; i--) total[nodes[i].parent] += total[i];
        return total;
    };

    const report = ({ from, to, timelineFrames = Infinity, detail = false } = {}) => {
        if (!session) return null;
        const frameMs = clock.frameMs;
        const opCostMs = clock.save().opCostMs;
        const totalOps = session.frameOps.reduce((sum, ops) => sum + ops, 0);
        const attributed = session.nodes.reduce((sum, node) => sum + node.self, 0);
        const nodes = session.nodes.map(node => {
            const { kids, ...plain } = node;
            return plain;
        });
        nodes[0].self = Math.max(0, totalOps - attributed);
        const total = totals(nodes);
        nodes.forEach((node, i) => { node.total = total[i]; });
        const budgetOps = Math.floor((WORK_FRACTION * frameMs) / opCostMs);
        const result = {
            spre: 'profile',
            version: PROFILE_VERSION,
            fps: 1000 / frameMs,
            frameMs,
            opCostMs,
            budgetOps,
            peakOps: session.frameOps.reduce((max, ops) => Math.max(max, ops), 0),
            framesOverBudget: session.frameOps.filter(ops => ops >= budgetOps).length,
            firstFrame: session.firstFrame,
            frames: session.frameOps.length,
            frameOps: session.frameOps.slice(),
            totalOps,
            granularity: session.granularity,
            nodes,
        };
        const { history } = session;
        const window = timelineFrames >= history.length ? history : history.slice(history.length - timelineFrames);
        if (window.length) result.timeline = timelineOf(window);
        if (detail) result.frameNodes = window.map(record => Array.from(record.nodes));
        if (from === undefined) return result;
        const full = {
            ...result,
            timeline: { frameNumbers: history.map(record => record.frame), ops: history.map(record => record.ops) },
            frameNodes: history.map(record => record.nodes),
        };
        const { frameNodes, timeline, ...ranged } = aggregateFrames(full, from, to ?? from);
        return { ...ranged, ...(result.timeline && { timeline: result.timeline }), ...(detail && { frameNodes: result.frameNodes }) };
    };

    return {
        get running() { return ctx.probes.current === probe; },

        start({ granularity = ctx.fastExecute ? 'block' : 'script', historyFrames = HISTORY_FRAMES } = {}) {
            if (ctx.inFrame) throw new Error('the profiler can only start between frames');
            if (ctx.probes.current !== null && ctx.probes.current !== probe) throw new Error('another probe is attached');
            if (!session) {
                session = {
                    nodes: [], frameOps: [], firstFrame: ctx.frame, granularity, historyFrames,
                    frameSelf: [0], touched: [], history: [], containers: new Map(),
                };
                session.root = makeNode(0, -1, 'root', 'all', {});
                session.nodes.push(session.root);
            }
            ctx.probes.current = probe;
            ctx.frameHooks.add(onFrame);
        },

        stop() {
            if (ctx.probes.current === probe) ctx.probes.current = null;
            ctx.frameHooks.delete(onFrame);
            return report();
        },

        clear() {
            session = null;
            if (ctx.probes.current === probe) this.start();
        },

        report,
    };
}

const stackOf = (nodes, id) => {
    const path = [];
    for (let node = nodes[id]; node && node.kind !== 'root'; node = nodes[node.parent]) path.push(node);
    return path.reverse();
};

const frameName = node => {
    if (node.kind === 'block' || node.kind === 'script') return `${node.label} (${node.target})`;
    if (node.kind === 'call') return `${node.label} (${node.target})`;
    return node.label;
};

export function toFolded(profile) {
    const lines = [];
    for (const node of profile.nodes) {
        if (node.self <= 0) continue;
        const path = node.kind === 'root' ? ['(other)'] : stackOf(profile.nodes, node.id).map(frameName);
        lines.push(`${path.map(name => name.replaceAll(';', ',')).join(';')} ${node.self}`);
    }
    return `${lines.join('\n')}\n`;
}

export function toSpeedscope(profile, name = 'SPRE profile') {
    const frames = [];
    const frameIndex = new Map();
    const indexOf = node => {
        const key = `${node.kind}\u0000${node.target ?? ''}\u0000${node.block ?? node.label}`;
        if (!frameIndex.has(key)) {
            frameIndex.set(key, frames.length);
            frames.push({ name: frameName(node), file: node.target ?? undefined });
        }
        return frameIndex.get(key);
    };
    const samples = [];
    const weights = [];
    for (const node of profile.nodes) {
        if (node.self <= 0) continue;
        const path = node.kind === 'root' ? [{ kind: 'other', label: '(other)' }] : stackOf(profile.nodes, node.id);
        samples.push(path.map(indexOf));
        weights.push(node.self);
    }
    return {
        $schema: 'https://www.speedscope.app/file-format-schema.json',
        shared: { frames },
        profiles: [{
            type: 'sampled',
            name,
            unit: 'none',
            startValue: 0,
            endValue: profile.totalOps,
            samples,
            weights,
        }],
        name,
        exporter: 'spre',
    };
}

export function hottest(profile, { limit = 15, kind = 'block', by = 'self' } = {}) {
    const merged = new Map();
    const keyOf = node => `${node.target}\u0000${node.block ?? node.label}`;
    const nested = node => {
        const key = keyOf(node);
        for (let up = profile.nodes[node.parent]; up && up.kind !== 'root'; up = profile.nodes[up.parent]) {
            if (up.kind === node.kind && keyOf(up) === key) return true;
        }
        return false;
    };
    for (const node of profile.nodes) {
        if (node.kind !== kind) continue;
        const key = keyOf(node);
        const entry = merged.get(key) ?? { label: node.label, target: node.target, block: node.block, opcode: node.opcode, self: 0, total: 0, calls: 0 };
        entry.self += node.self;
        if (!nested(node)) entry.total += node.total;
        entry.calls += node.calls;
        merged.set(key, entry);
    }
    return [...merged.values()].sort((a, b) => b[by] - a[by] || a.label.localeCompare(b.label)).slice(0, limit);
}
