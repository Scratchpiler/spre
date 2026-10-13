import { canonicalBlockId } from './block-ids.js';
import { hashValue } from './encode.js';
import { blockLabel, procedureName, scriptLabel, spriteName, targetLabel } from './labels.js';

const PROPS = ['x', 'y', 'direction', 'size', 'visible', 'rotationStyle', 'draggable'];
const MAX_DIFFERENCES = 40;

const pixelHash = pixels => {
    const words = new Uint32Array(pixels.buffer, pixels.byteOffset, pixels.byteLength >>> 2);
    let h1 = 0x811c9dc5;
    let h2 = 0x01000193;
    for (let i = 0; i < words.length; i++) {
        h1 = Math.imul(h1 ^ words[i], 16777619);
        h2 = Math.imul(h2 ^ (words[i] >>> 7), 2246822507);
    }
    return `${(h1 >>> 0).toString(16)}${(h2 >>> 0).toString(16)}`;
};

const keyedTargets = runtime => {
    const keyed = [];
    for (const target of runtime.targets) {
        if (target.isStage) keyed.push(['Stage', target]);
        else if (target.isOriginal) keyed.push([spriteName(target.sprite.name), target]);
    }
    for (const target of runtime.targets) {
        if (!target.isOriginal || target.isStage) continue;
        target.sprite.clones.filter(clone => !clone.isOriginal).forEach((clone, i) => keyed.push([`${spriteName(target.sprite.name)}#${i + 1}`, clone]));
    }
    return keyed;
};

export function findTarget(runtime, key) {
    for (const [name, target] of keyedTargets(runtime)) if (name === key) return target;
    return null;
}

export function observe(spre, { ignore = null, pen = false } = {}) {
    const runtime = spre.runtime;
    const skip = name => ignore !== null && ignore.test(name);
    const targets = {};
    for (const [key, target] of keyedTargets(runtime)) {
        const variables = {};
        const lists = {};
        for (const variable of Object.values(target.variables)) {
            if (skip(variable.name)) continue;
            if (variable.type === 'list') lists[variable.name] = variable.value;
            else if (variable.type === '') variables[variable.name] = variable.value;
        }
        const entry = { costume: target.getCostumes()[target.currentCostume]?.name ?? target.currentCostume, effects: { ...target.effects }, variables, lists };
        if (!target.isStage) {
            for (const prop of PROPS) entry[prop] = target[prop];
            entry.layer = runtime.renderer && target.drawableID !== null ? target.getLayerOrder() : null;
            const bubble = target.getCustomState('Scratch.looks');
            entry.bubble = bubble?.text ? `${bubble.type}: ${bubble.text}` : '';
        }
        targets[key] = entry;
    }
    const observation = { targets };
    if (pen) {
        const skin = runtime.renderer?.allSkins?.find(candidate => candidate?.kind === 'pen');
        observation.pen = skin ? pixelHash(skin.pixels) : null;
    }
    return observation;
}

const same = (a, b) => Object.is(a, b) || (typeof a === 'number' && typeof b === 'number' && a === b);

const listDifference = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return { a: a === undefined ? 'missing' : `${a.length} items`, b: b === undefined ? 'missing' : `${b.length} items` };
    const length = Math.min(a.length, b.length);
    for (let i = 0; i < length; i++) {
        if (!same(a[i], b[i])) return { index: i + 1, a: a[i], b: b[i], lengths: [a.length, b.length] };
    }
    if (a.length !== b.length) return { index: length + 1, a: a[length] ?? `(${a.length} items)`, b: b[length] ?? `(${b.length} items)`, lengths: [a.length, b.length] };
    return null;
};

export function compareObservations(a, b) {
    const differences = [];
    const push = difference => {
        if (differences.length < MAX_DIFFERENCES) differences.push(difference);
    };
    const keys = [...new Set([...Object.keys(a.targets), ...Object.keys(b.targets)])];
    for (const key of keys) {
        const ta = a.targets[key];
        const tb = b.targets[key];
        if (!ta || !tb) {
            push({ target: key, field: 'exists', path: `${key}`, a: Boolean(ta), b: Boolean(tb) });
            continue;
        }
        for (const field of ['costume', ...PROPS, 'layer', 'bubble']) {
            if (!same(ta[field], tb[field])) push({ target: key, field, path: `${key}.${field}`, a: ta[field], b: tb[field] });
        }
        for (const effect of new Set([...Object.keys(ta.effects), ...Object.keys(tb.effects)])) {
            if (!same(ta.effects[effect], tb.effects[effect])) push({ target: key, field: `effect:${effect}`, path: `${key}.effect:${effect}`, a: ta.effects[effect], b: tb.effects[effect] });
        }
        for (const name of new Set([...Object.keys(ta.variables), ...Object.keys(tb.variables)])) {
            if (!same(ta.variables[name], tb.variables[name])) push({ target: key, variable: name, path: `${key}.var:${name}`, a: ta.variables[name], b: tb.variables[name] });
        }
        for (const name of new Set([...Object.keys(ta.lists), ...Object.keys(tb.lists)])) {
            const difference = listDifference(ta.lists[name], tb.lists[name]);
            if (difference) push({ target: key, list: name, path: `${key}.list:${name}${difference.index ? `[${difference.index}]` : ''}`, ...difference });
        }
    }
    if (!same(a.pen, b.pen)) push({ field: 'pen', path: 'pen', a: a.pen, b: b.pen });
    return differences;
}

const worldDifferences = (a, b) => {
    const differences = [];
    const walk = (x, y, path) => {
        if (differences.length >= MAX_DIFFERENCES) return;
        if (x === y || (Number.isNaN(x) && Number.isNaN(y))) return;
        if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object' || Array.isArray(x) !== Array.isArray(y)) {
            differences.push({ path, a: x, b: y });
            return;
        }
        for (const key of new Set([...Object.keys(x), ...Object.keys(y)])) walk(x[key], y[key], Array.isArray(x) ? `${path}[${key}]` : `${path}.${key}`);
    };
    const strip = ({ input: { schedule, seq, ...input }, renderer, problems, history, ...world }) => ({ ...world, input });
    walk(strip(a), strip(b), 'world');
    return differences;
};

const KEEP_WRITES = 3;

const watcherFor = (runtime, difference) => {
    if (difference.field === 'exists' || difference.field === 'pen') return null;
    let target = null;
    let variable = null;
    const name = difference.variable ?? difference.list;
    const type = difference.list !== undefined ? 'list' : '';
    const resolve = () => {
        target = findTarget(runtime, difference.target);
        if (name !== undefined) variable = Object.values(target?.variables ?? {}).find(v => v.name === name && v.type === type) ?? null;
    };
    let read;
    if (type === 'list') {
        read = () => {
            const list = variable?.value;
            if (!list) return undefined;
            return difference.index ? list[difference.index - 1] : list.length;
        };
    } else if (name !== undefined) {
        read = () => variable?.value;
    } else {
        read = () => {
            if (!target) return undefined;
            if (difference.field === 'costume') return target.getCostumes()[target.currentCostume]?.name;
            if (difference.field === 'layer') return target.drawableID !== null && runtime.renderer ? target.getLayerOrder() : null;
            if (difference.field === 'bubble') return target.getCustomState('Scratch.looks')?.text ?? '';
            if (difference.field.startsWith('effect:')) return target.effects[difference.field.slice('effect:'.length)];
            return target[difference.field];
        };
    }
    const length = () => variable?.value?.length;
    resolve();
    return {
        arm() {
            if (target === null || (name !== undefined && variable === null)) resolve();
            this.before = read();
            this.length = length();
        },
        changed() { return !same(read(), this.before) || length() !== this.length; },
        value: read,
    };
};

const callPath = thread => {
    const container = thread.blockContainer;
    const calls = [];
    for (let i = 0; i < thread.stack.length - 1; i++) {
        const block = container.getBlock(thread.stack[i]);
        if (block?.opcode === 'procedures_call') calls.push(procedureName(block.mutation?.proccode ?? '?'));
    }
    return calls;
};

const recordWrites = (spre, differences) => {
    const runtime = spre.runtime;
    const watched = differences.map(difference => ({ watcher: watcherFor(runtime, difference), writes: [] }));
    const live = watched.filter(entry => entry.watcher);
    let seq = 0;
    const probe = {
        step() {},
        block(thread, blockId, run) {
            for (const entry of live) entry.watcher.arm();
            const site = blockId ?? thread.peekStack();
            const { blockContainer: container, target, topBlock: top } = thread;
            const calls = live.length ? callPath(thread) : null;
            run(thread);
            seq += 1;
            for (const entry of live) {
                if (entry.watcher.changed()) entry.writes.push({ seq, value: entry.watcher.value(), container, target, top, site, calls, whole: blockId === null });
            }
        },
    };
    spre.withProbe(probe, () => spre.step(1));
    return watched.map(entry => (entry.watcher ? entry.writes : null));
};

const describeWrite = write => {
    if (!write) return null;
    const { container, site, top } = write;
    const block = container.getBlock(site);
    return {
        seq: write.seq,
        sprite: targetLabel(write.target),
        script: scriptLabel(container, top),
        calls: write.calls,
        block: canonicalBlockId(container, site),
        label: write.whole ? '(whole thread step)' : blockLabel(block, container),
        opcode: block?.opcode ?? null,
        value: write.value,
    };
};

const firstMismatch = (writesA, writesB) => {
    const length = Math.max(writesA.length, writesB.length);
    for (let i = 0; i < length; i++) {
        const x = writesA[i];
        const y = writesB[i];
        if (!x || !y || !same(x.value, y.value)) return { index: i, a: describeWrite(x), b: describeWrite(y) };
    }
    return null;
};

const summarize = writes => ({ count: writes.length, last: writes.slice(-KEEP_WRITES).map(describeWrite) });

const mergedStream = writesPerDifference => writesPerDifference
    .flatMap((writes, difference) => (writes ?? []).map(write => ({ difference, write })))
    .sort((x, y) => x.write.seq - y.write.seq);

const originOf = (streamA, streamB) => {
    const length = Math.max(streamA.length, streamB.length);
    for (let i = 0; i < length; i++) {
        const x = streamA[i];
        const y = streamB[i];
        if (x && y && x.difference === y.difference && same(x.write.value, y.write.value)) continue;
        if (!x || !y) return (x ?? y).difference;
        if (x.difference === y.difference) return x.difference;
        if (streamB[i + 1]?.difference === x.difference) return y.difference;
        if (streamA[i + 1]?.difference === y.difference) return x.difference;
        return Math.min(x.difference, y.difference);
    }
    return -1;
};

const blame = (a, b, differences) => {
    const writesA = recordWrites(a, differences);
    const writesB = recordWrites(b, differences);
    differences.forEach((difference, i) => {
        if (!writesA[i] || !writesB[i]) return;
        const mismatch = firstMismatch(writesA[i], writesB[i]);
        difference.blame = { a: summarize(writesA[i]), b: summarize(writesB[i]), mismatch };
    });
    const origin = originOf(mergedStream(writesA), mergedStream(writesB));
    const originPath = origin >= 0 && differences[origin].blame?.mismatch ? differences[origin].path : null;
    const order = difference => {
        if (difference.path === originPath) return -1;
        const mismatch = difference.blame?.mismatch;
        return mismatch ? (mismatch.b?.seq ?? mismatch.a?.seq ?? Infinity) : Infinity;
    };
    differences.sort((x, y) => order(x) - order(y));
    return originPath;
};

const describeSide = spre => ({ frame: spre.frame, hash: spre.hash() });

export function diffRuns(a, b, { frames = 300, every = 30, mode = 'state', ignore = null, pen = false, blame: withBlame = true, onCheck } = {}) {
    if (mode !== 'state' && mode !== 'world') throw new RangeError(`unknown diff mode "${mode}"`);
    const ignorePattern = typeof ignore === 'string' ? new RegExp(ignore) : ignore;
    const fingerprint = spre => (mode === 'world' ? spre.hash() : hashValue(observe(spre, { ignore: ignorePattern, pen })));
    const details = () => {
        const differences = compareObservations(observe(a, { ignore: ignorePattern, pen }), observe(b, { ignore: ignorePattern, pen }));
        if (differences.length || mode === 'state') return differences;
        return worldDifferences(a.snapshot({ strict: false }), b.snapshot({ strict: false }));
    };
    const checkpoint = () => {
        const saved = [a.snapshot({ strict: false }), b.snapshot({ strict: false })];
        return saved.some(snapshot => snapshot.problems) ? null : saved;
    };
    const restore = saved => {
        a.restore(saved[0]);
        b.restore(saved[1]);
    };
    const startFrame = a.frame;
    let step = every;
    let base = checkpoint();
    if (base === null) step = 1;
    let checked = 0;

    const diverged = () => {
        const differences = details();
        const result = { diverged: true, frame: a.frame, frameB: b.frame, checked, mode, differences, a: describeSide(a), b: describeSide(b) };
        if (withBlame && base !== null && checked > 0 && differences.some(d => d.field !== 'exists')) {
            const back = base;
            restore(back);
            const offset = checked - (back[0].frame - startFrame) - 1;
            a.step(offset);
            b.step(offset);
            result.origin = blame(a, b, differences);
        }
        return result;
    };

    if (fingerprint(a) !== fingerprint(b)) return diverged();
    while (checked < frames) {
        const chunk = Math.min(step, frames - checked);
        a.step(chunk);
        b.step(chunk);
        checked += chunk;
        onCheck?.({ checked, frames });
        if (fingerprint(a) === fingerprint(b)) {
            if (step > 1) base = checkpoint() ?? base;
            continue;
        }
        if (chunk > 1 && base !== null) {
            restore(base);
            checked -= chunk;
            for (let i = 0; i < chunk; i++) {
                a.step(1);
                b.step(1);
                checked += 1;
                if (fingerprint(a) !== fingerprint(b)) return diverged();
            }
            throw new Error('runs diverged across a checkpoint but not when replayed frame by frame; a snapshot did not restore exactly');
        }
        return diverged();
    }
    return { diverged: false, frames: checked, mode, a: describeSide(a), b: describeSide(b) };
}
