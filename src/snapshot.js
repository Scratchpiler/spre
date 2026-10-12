import { SnapshotError, decodeValue, encodeValue } from './encode.js';

export const SNAPSHOT_VERSION = 1;

const TARGET_PROPS = [
    'x', 'y', 'direction', 'draggable', 'visible', 'size', 'currentCostume', 'rotationStyle',
    'volume', 'tempo', 'videoTransparency', 'videoState', 'textToSpeechLanguage', 'dragging', 'drawableID',
];

export function createSnapshots(ctx) {
    const { runtime, internals } = ctx;

    const refOf = target => {
        if (!target) return null;
        if (target.isStage) return 'stage';
        return target.isOriginal ? `sprite:${target.sprite.name}` : `clone:${target.id}`;
    };

    const originalsByRef = () => {
        const map = new Map();
        for (const target of runtime.targets) if (target.isOriginal) map.set(refOf(target), target);
        return map;
    };

    const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const replacer = mapping => {
        if (!mapping.size) return text => text;
        const pattern = new RegExp([...mapping.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp).join('|'), 'g');
        return text => (typeof text === 'string' ? text.replace(pattern, match => mapping.get(match)) : text);
    };
    const canonicalIds = () => {
        const originals = runtime.targets.filter(t => t.isOriginal);
        return {
            canon: replacer(new Map(originals.map(t => [t.id, `@${refOf(t)}`]))),
            real: replacer(new Map(originals.map(t => [`@${refOf(t)}`, t.id]))),
        };
    };

    const ownerOfVariable = variable => runtime.targets.find(t => t.variables[variable.id] === variable);

    const timerBase = timer => {
        const nowObj = timer.nowObj;
        if (nowObj === ctx.scope.VirtualDate || nowObj === ctx.clockNowObj) return 'clock';
        if (nowObj === ctx.realDate || nowObj === globalThis.performance || typeof nowObj?.now !== 'function') return null;
        return 'frame';
    };

    function capture({ strict = true } = {}) {
        if (ctx.inFrame) throw new SnapshotError('snapshots can only be taken between frames');
        const problems = [];
        const threadIndex = new Map(runtime.threads.map((thread, i) => [thread, i]));
        const Stage = runtime.getTargetForStage()?.constructor;
        const refs = {
            encode(value, path) {
                if (value instanceof internals.Timer) {
                    const base = timerBase(value);
                    if (!base) problems.push(`${path}: timer reads a clock SPRE does not control`);
                    return { kind: 'timer', data: { start: value.startTime, base: base ?? 'clock' } };
                }
                if (runtime.threads.length && value instanceof internals.Thread) {
                    return { kind: 'thread', data: { i: threadIndex.get(value) ?? -1 } };
                }
                if (Stage && value instanceof Stage) return { kind: 'target', data: { ref: refOf(value) } };
                if (internals.Variable && value instanceof internals.Variable) {
                    const owner = ownerOfVariable(value);
                    if (!owner) problems.push(`${path}: variable "${value.name}" belongs to no live target`);
                    return { kind: 'variable', data: { owner: refOf(owner), id: value.id } };
                }
                return undefined;
            },
        };
        const encode = (value, path) => {
            try {
                return encodeValue(value, refs, path);
            } catch (error) {
                if (!(error instanceof SnapshotError)) throw error;
                problems.push(error.message);
                return null;
            }
        };

        const containerOf = thread => {
            if (thread.blockContainer === runtime.monitorBlocks) return 'monitor';
            if (thread.blockContainer === runtime.flyoutBlocks) return 'flyout';
            return 'target';
        };

        const targets = runtime.targets.map(target => {
            const ref = refOf(target);
            return {
                ref,
                sprite: target.isStage ? null : target.sprite.name,
                props: encode(Object.fromEntries(TARGET_PROPS.map(key => [key, target[key]])), `${ref}.props`),
                effects: encode({ ...target.effects }, `${ref}.effects`),
                variables: Object.values(target.variables).map(variable => ({
                    id: variable.id,
                    name: variable.name,
                    type: variable.type,
                    cloud: Boolean(variable.isCloud),
                    value: encode(variable.value, `${ref}.variables.${variable.name}`),
                })),
                edge: encode({ ...target._edgeActivatedHatValues }, `${ref}.edge`),
                custom: encode({ ...target._customState }, `${ref}.custom`),
            };
        });

        const cloneOrder = {};
        for (const target of runtime.targets) {
            if (!target.isOriginal || target.isStage || target.sprite.clones.length < 2) continue;
            cloneOrder[target.sprite.name] = target.sprite.clones.filter(c => !c.isOriginal).map(refOf);
        }

        const waits = ctx.waits.save();
        const controlledWaiters = new Set(waits.entries.map(entry => entry.thread));
        const threads = runtime.threads.map((thread, i) => {
            const path = `threads[${i}]`;
            if (thread.status === internals.status.PROMISE_WAIT && !controlledWaiters.has(thread)) {
                problems.push(`${path}: waits on a promise SPRE does not control (block ${thread.peekStack()})`);
            }
            return {
                target: refOf(thread.target),
                container: containerOf(thread),
                top: thread.topBlock,
                status: thread.status,
                stack: [...thread.stack],
                frames: thread.stackFrames.map((frame, j) => ({
                    loop: frame.isLoop,
                    warp: frame.warpMode,
                    justReported: encode(frame.justReported, `${path}.frames[${j}].justReported`),
                    reporting: frame.reported === null ? null : frame.reporting,
                    reported: encode(frame.reported, `${path}.frames[${j}].reported`),
                    waitingReporter: encode(frame.waitingReporter, `${path}.frames[${j}].waitingReporter`),
                    params: encode(frame.params, `${path}.frames[${j}].params`),
                    context: encode(frame.executionContext, `${path}.frames[${j}].context`),
                })),
                stackClick: Boolean(thread.stackClick),
                updateMonitor: Boolean(thread.updateMonitor),
                killed: thread.isKilled,
                justReported: encode(thread.justReported, `${path}.justReported`),
                warpTimer: encode(thread.warpTimer, `${path}.warpTimer`),
                glow: thread.requestScriptGlowInFrame,
                glowBlock: thread.blockGlowInFrame,
            };
        });

        const encodedWaits = waits.entries.map(entry => ({
            ...entry,
            thread: entry.thread ? (threadIndex.get(entry.thread) ?? -1) : -1,
            target: entry.target ? refOf(entry.target) : undefined,
        }));

        const renderer = runtime.renderer;
        if (renderer && typeof renderer.save !== 'function') {
            problems.push('the attached renderer cannot save its state (layer order, pen, bubbles)');
        }

        if (ctx.timers.size) {
            problems.push(`${ctx.timers.size} pending setTimeout/setInterval callback(s) from inside the VM cannot be saved`);
        }

        const ids = canonicalIds();
        const monitors = [...runtime._monitorState.values()].map(record => ({
            id: ids.canon(record.get('id')),
            visible: Boolean(record.get('visible')),
        }));
        const monitored = Object.values(runtime.monitorBlocks._blocks)
            .filter(block => block.isMonitored !== undefined)
            .map(block => ({ id: ids.canon(block.id), on: Boolean(block.isMonitored) }));

        const projectTimer = runtime.ioDevices.clock;
        const snapshot = {
            spre: SNAPSHOT_VERSION,
            frame: ctx.frame,
            clock: ctx.clock.save(),
            rng: encode(ctx.rng.save(), 'rng'),
            input: encode(ctx.input.save(), 'input'),
            holds: encode(ctx.memory.save(), 'holds'),
            waits: {
                seq: waits.seq,
                answer: encode(waits.answer, 'answer'),
                entries: encodedWaits,
                questions: waits.questions.map(question => ({
                    text: question.text,
                    target: refOf(question.target),
                    wasVisible: question.wasVisible,
                    wasStage: question.wasStage,
                    wait: question.wait,
                })),
            },
            runtime: {
                currentMSecs: runtime.currentMSecs,
                turbo: Boolean(runtime.turboMode),
                cloneCounter: runtime._cloneCounter,
                projectTimer: {
                    start: projectTimer._projectTimer.startTime,
                    paused: projectTimer._paused,
                    pausedTime: projectTimer._pausedTime,
                },
            },
            targets,
            executable: runtime.executableTargets.map(refOf),
            cloneOrder,
            threads,
            monitors,
            monitored,
            renderer: renderer && typeof renderer.save === 'function' ? renderer.save() : null,
        };
        if (problems.length) {
            if (strict) throw new SnapshotError(`cannot snapshot deterministically:\n  ${problems.join('\n  ')}`);
            snapshot.problems = problems;
        }
        return snapshot;
    }

    function restore(snapshot) {
        if (snapshot?.spre !== SNAPSHOT_VERSION) throw new SnapshotError(`not a SPRE v${SNAPSHOT_VERSION} snapshot`);
        if (ctx.inFrame) throw new SnapshotError('snapshots can only be restored between frames');
        const originals = originalsByRef();
        for (const saved of snapshot.targets) {
            if (saved.ref.startsWith('clone:')) {
                if (!originals.has(`sprite:${saved.sprite}`)) throw new SnapshotError(`no sprite "${saved.sprite}" to clone`);
            } else if (!originals.has(saved.ref)) {
                throw new SnapshotError(`the project has no target ${saved.ref}`);
            }
        }
        const Variable = internals.Variable;
        const { Thread, StackFrame } = snapshot.threads.length ? internals : {};

        runtime.threads = [];
        for (const target of [...runtime.targets]) {
            if (!target.isOriginal) runtime.disposeTarget(target);
        }

        const byRef = new Map(originals);
        for (const saved of snapshot.targets) {
            if (!saved.ref.startsWith('clone:')) continue;
            const original = originals.get(`sprite:${saved.sprite}`);
            const clone = original.sprite.createClone();
            clone.id = saved.ref.slice('clone:'.length);
            byRef.set(saved.ref, clone);
        }
        const targetOf = ref => {
            if (ref === null) return null;
            const target = byRef.get(ref);
            if (!target) throw new SnapshotError(`snapshot refers to missing target ${ref}`);
            return target;
        };

        const threads = snapshot.threads.map(saved => new Thread(saved.top));
        const deadThread = () => {
            const thread = new Thread(null);
            thread.status = internals.status.DONE;
            return thread;
        };
        const refs = {
            decode(kind, data) {
                switch (kind) {
                case 'timer': {
                    const timer = new internals.Timer(data.base === 'frame' ? ctx.frameNowObj : ctx.scope.VirtualDate);
                    timer.startTime = data.start;
                    return { value: timer };
                }
                case 'thread': return { value: data.i >= 0 ? threads[data.i] : deadThread() };
                case 'target': return { value: targetOf(data.ref) };
                case 'variable': return { value: targetOf(data.owner).variables[data.id] };
                }
                return undefined;
            },
        };
        const decode = (value, path) => decodeValue(value, refs, path);

        for (const saved of snapshot.targets) {
            const target = targetOf(saved.ref);
            const previous = { ...target.variables };
            for (const key of Object.keys(target.variables)) delete target.variables[key];
            for (const entry of saved.variables) {
                let variable = previous[entry.id];
                if (!variable || variable.type !== entry.type) variable = new Variable(entry.id, entry.name, entry.type, entry.cloud);
                variable.name = entry.name;
                variable.isCloud = entry.cloud;
                target.variables[entry.id] = variable;
            }
        }
        for (const saved of snapshot.targets) {
            const target = targetOf(saved.ref);
            Object.assign(target, decode(saved.props, `${saved.ref}.props`));
            const effects = decode(saved.effects, `${saved.ref}.effects`);
            for (const key of Object.keys(target.effects)) delete target.effects[key];
            Object.assign(target.effects, effects);
            for (const entry of saved.variables) {
                target.variables[entry.id].value = decode(entry.value, `${saved.ref}.variables.${entry.name}`);
            }
            target._edgeActivatedHatValues = decode(saved.edge, `${saved.ref}.edge`);
            target._customState = decode(saved.custom, `${saved.ref}.custom`);
        }
        const renderer = runtime.renderer;
        if (renderer && snapshot.renderer && typeof renderer.load === 'function') {
            renderer.load(snapshot.renderer);
        } else if (renderer) {
            for (const target of byRef.values()) target.updateAllDrawableProperties();
        }

        runtime.targets = snapshot.targets.map(saved => targetOf(saved.ref));
        runtime.executableTargets = snapshot.executable.map(targetOf);
        for (const [spriteName, clones] of Object.entries(snapshot.cloneOrder)) {
            const original = originals.get(`sprite:${spriteName}`);
            original.sprite.clones = [original, ...clones.map(targetOf)];
        }
        runtime._cloneCounter = snapshot.runtime.cloneCounter;
        runtime.currentMSecs = snapshot.runtime.currentMSecs;
        runtime.turboMode = snapshot.runtime.turbo;
        const projectClock = runtime.ioDevices.clock;
        projectClock._projectTimer.startTime = snapshot.runtime.projectTimer.start;
        projectClock._paused = snapshot.runtime.projectTimer.paused;
        projectClock._pausedTime = snapshot.runtime.projectTimer.pausedTime;

        snapshot.threads.forEach((saved, i) => {
            const thread = threads[i];
            const path = `threads[${i}]`;
            thread.target = targetOf(saved.target);
            thread.blockContainer = saved.container === 'monitor' ? runtime.monitorBlocks
                : saved.container === 'flyout' ? runtime.flyoutBlocks
                    : thread.target.blocks;
            for (const blockId of saved.stack) {
                if (blockId !== null && !thread.blockContainer.getBlock(blockId)) {
                    throw new SnapshotError(`block ${blockId} is not in this project`, path);
                }
            }
            thread.stack = [...saved.stack];
            thread.stackFrames = saved.frames.map((savedFrame, j) => {
                const frame = new StackFrame(savedFrame.warp);
                frame.isLoop = savedFrame.loop;
                frame.justReported = decode(savedFrame.justReported, `${path}.frames[${j}].justReported`);
                frame.reporting = savedFrame.reporting ?? '';
                frame.reported = decode(savedFrame.reported, `${path}.frames[${j}].reported`);
                frame.waitingReporter = decode(savedFrame.waitingReporter, `${path}.frames[${j}].waitingReporter`);
                frame.params = decode(savedFrame.params, `${path}.frames[${j}].params`);
                frame.executionContext = decode(savedFrame.context, `${path}.frames[${j}].context`);
                return frame;
            });
            thread.status = saved.status;
            thread.stackClick = saved.stackClick;
            thread.updateMonitor = saved.updateMonitor;
            thread.isKilled = saved.killed;
            thread.justReported = decode(saved.justReported, `${path}.justReported`);
            thread.warpTimer = decode(saved.warpTimer, `${path}.warpTimer`);
            thread.requestScriptGlowInFrame = saved.glow;
            thread.blockGlowInFrame = saved.glowBlock;
        });
        runtime.threads = threads;

        const entries = snapshot.waits.entries.map(entry => {
            const restored = { ...entry, thread: entry.thread >= 0 ? threads[entry.thread] : null };
            if (entry.target !== undefined) restored.target = targetOf(entry.target);
            else delete restored.target;
            return restored;
        });
        ctx.waits.load({
            seq: snapshot.waits.seq,
            answer: decode(snapshot.waits.answer, 'answer'),
            entries,
            questions: snapshot.waits.questions.map(question => ({ ...question, target: targetOf(question.target) })),
        });

        const ids = canonicalIds();
        let monitorState = runtime._monitorState;
        for (const { id, visible } of snapshot.monitors) {
            const realId = ids.real(id);
            const record = monitorState.get(realId);
            if (record && record.get('visible') !== visible) monitorState = monitorState.set(realId, record.set('visible', visible));
        }
        runtime._monitorState = monitorState;
        for (const { id, on } of snapshot.monitored) {
            const block = runtime.monitorBlocks.getBlock(ids.real(id));
            if (block) block.isMonitored = on;
        }

        ctx.frame = snapshot.frame;
        ctx.clock.load(snapshot.clock);
        ctx.rng.load(decode(snapshot.rng, 'rng'));
        ctx.input.load(decode(snapshot.input, 'input'));
        ctx.memory.load(decode(snapshot.holds ?? [], 'holds'));
        ctx.timers.clearAll();
        ctx.waits.replayQuestionPrompt();
        runtime._refreshTargets = true;
    }

    return { capture, restore, refOf };
}
