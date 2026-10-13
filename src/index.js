import { createClock } from './clock.js';
import { hashValue } from './encode.js';
import { installFastExecute } from './fastexec.js';
import { ensurePenLayer, reattachPenListeners } from './extensions.js';
import { createInput } from './input.js';
import { createMemory } from './memory.js';
import { MOVIE_VERSION, projectFingerprint, rendererKind, withoutHistory } from './movie.js';
import { discoverInternals } from './internals.js';
import { createPrimitives } from './primitives.js';
import { createProfiler } from './profile.js';
import { createRng } from './rng.js';
import { createScope, createTimers } from './scope.js';
import { createSnapshots } from './snapshot.js';
import { createWaits } from './waits.js';

export { SnapshotError } from './encode.js';
export { SNAPSHOT_VERSION } from './snapshot.js';
export { EVENT_TYPES } from './input.js';

const ATTACHED = Symbol.for('spre.attached');
const ENGINE_STREAM = 'engine';

const macrotask = () => new Promise(resolve => {
    if (typeof setImmediate === 'function') setImmediate(resolve);
    else setTimeout(resolve, 0);
});

export function attach(vm, options = {}) {
    const runtime = vm.runtime ?? vm;
    if (runtime[ATTACHED]) throw new Error('SPRE is already attached to this runtime');
    const {
        seed = 0,
        epoch,
        fps = 30,
        opCostMs = 0.001,
        utcOffsetMinutes = 0,
        answers = null,
        fastExecute = true,
        origin = 'snapshot',
    } = options;

    const clock = createClock({ epoch, fps, opCostMs, utcOffsetMinutes });
    const ctx = {
        vm,
        runtime,
        clock,
        rng: createRng(seed),
        internals: discoverInternals(runtime),
        stream: ENGINE_STREAM,
        frame: 0,
        inFrame: false,
        realDate: Date,
        frameNowObj: { now: () => runtime.currentMSecs },
        clockNowObj: { now: clock.now },
        fastExecute,
        probes: { current: null },
        frameHooks: new Set(),
        unrecorded: new Set(),
    };
    const { epoch: epochMs } = clock.save();
    ctx.settings = { seed: String(seed), fps, opCostMs, epoch: epochMs, utcOffsetMinutes };
    ctx.timers = createTimers(clock);
    ctx.scope = createScope({ clock, rng: ctx.rng, timers: ctx.timers, currentStream: () => ctx.stream });
    ctx.waits = createWaits(ctx);
    ctx.input = createInput(ctx, { answers });
    ctx.memory = createMemory(ctx);
    const primitives = createPrimitives(ctx);
    ctx.original = primitives.original;
    const snapshots = createSnapshots(ctx);
    const profiler = createProfiler(ctx);

    if (runtime._steppingInterval) {
        clearInterval(runtime._steppingInterval);
        runtime._steppingInterval = null;
    }

    const projectClock = runtime.ioDevices.clock;
    const elapsedProjectTime = projectClock._projectTimer.timeElapsed();
    runtime.currentStepTime = clock.frameMs;
    runtime.currentMSecs = clock.frameNow();
    projectClock._projectTimer.startTime = runtime.currentMSecs - elapsedProjectTime;

    const sequencer = runtime.sequencer;
    const originalSequencerNow = sequencer.timer.nowObj;
    sequencer.timer.nowObj = ctx.clockNowObj;
    const fast = fastExecute ? installFastExecute(runtime, { work: clock.work, countedImpl: fn => primitives.countedImpl(fn), isStock: op => primitives.isStock(op), probes: ctx.probes }) : null;
    const stepThreadOfPrototype = Object.getPrototypeOf(sequencer).stepThread;
    sequencer.stepThread = fast?.stepThread ?? function (thread) {
        clock.charge(1);
        const probe = ctx.probes.current;
        if (probe === null) return stepThreadOfPrototype.call(this, thread);
        probe.step(thread);
        return probe.block(thread, null, stepped => stepThreadOfPrototype.call(this, stepped));
    };
    runtime.updateCurrentMSecs = function () {
        this.currentMSecs = clock.frameNow();
    };

    const listeners = {
        PROJECT_START: () => ctx.waits.onProjectStart(),
        PROJECT_STOP_ALL: () => ctx.waits.onStopAll(),
        STOP_FOR_TARGET: target => ctx.waits.onStopForTarget(target),
        EXTENSION_ADDED: () => {
            primitives.install();
            ensurePenLayer(runtime);
        },
    };
    for (const [event, fn] of Object.entries(listeners)) runtime.on(event, fn);
    primitives.install();
    fast?.reset();
    ensurePenLayer(runtime);
    runtime[ATTACHED] = true;

    let projectPrint = null;
    const fingerprint = () => {
        projectPrint ??= projectFingerprint(runtime);
        return projectPrint;
    };
    const recordNow = event => {
        if (ctx.inFrame) throw new Error(`${event.type} changes can only be made between frames`);
        ctx.input.recordNow(event);
    };
    if (origin === 'load') {
        ctx.origin = { id: `load:${hashValue([fingerprint(), ctx.settings])}`, snapshot: null };
    } else {
        const start = withoutHistory(snapshots.capture({ strict: false }));
        ctx.origin = { id: `snapshot:${hashValue(start)}`, snapshot: start };
    }

    const stepFrame = () => {
        clock.beginFrame();
        ctx.inFrame = true;
        try {
            ctx.scope.run(() => {
                ctx.stream = ENGINE_STREAM;
                const now = clock.now();
                ctx.timers.fireDue(now);
                ctx.waits.resolveDue(now);
                ctx.input.applyFrame(ctx.frame);
                ctx.memory.applyHolds();
                runtime._step();
                ctx.memory.applyHolds();
            });
        } finally {
            ctx.stream = ENGINE_STREAM;
            ctx.inFrame = false;
            clock.endFrame();
            ctx.frame++;
        }
        for (const hook of ctx.frameHooks) hook(ctx.frame - 1, clock.ops);
    };

    const runFrames = (count, until) => {
        for (let i = 0; i < count; i++) {
            stepFrame();
            if (until?.(spre)) return true;
        }
        return false;
    };

    const spre = {
        vm,
        runtime,
        get frame() { return ctx.frame; },
        get time() { return clock.elapsed(); },
        get now() { return clock.now(); },

        step(frames = 1) {
            runFrames(frames);
            return ctx.frame;
        },

        run({ frames = Infinity, until, idle = false } = {}) {
            const stop = idle ? s => !runtime.threads.length || until?.(s) : until;
            if (!Number.isFinite(frames) && !stop) throw new RangeError('run() needs a frame limit or a stop condition');
            const stopped = runFrames(frames, stop);
            return { frame: ctx.frame, stopped };
        },

        async runAsync({ frames = Infinity, until, idle = false } = {}) {
            const stop = idle ? s => !runtime.threads.length || until?.(s) : until;
            if (!Number.isFinite(frames) && !stop) throw new RangeError('runAsync() needs a frame limit or a stop condition');
            for (let i = 0; i < frames; i++) {
                stepFrame();
                await macrotask();
                if (stop?.(spre)) return { frame: ctx.frame, stopped: true };
            }
            return { frame: ctx.frame, stopped: false };
        },

        greenFlag() { ctx.input.api.send({ type: 'flag' }); },
        stopAll() { ctx.input.api.send({ type: 'stop' }); },
        turbo(on = true) { ctx.input.api.send({ type: 'turbo', on }); },

        input: ctx.input.api,

        memory: {
            targetOf: ref => ctx.memory.targetOf(ref),
            variableOf: (ref, id) => ctx.memory.variableOf(ref, id),
            holds: () => ctx.memory.holds(),
        },

        rng: {
            get seed() { return ctx.rng.seed; },
            reseed: newSeed => recordNow({ type: 'rng', op: 'reseed', seed: String(newSeed) }),
            queue: (stream, ...values) => recordNow({ type: 'rng', op: 'queue', stream, values }),
            override: (stream, fn) => {
                if (fn) ctx.unrecorded.add('rng.override');
                return ctx.rng.override(stream, fn);
            },
            force: (...values) => recordNow({ type: 'rng', op: 'force', values }),
            onPick: fn => {
                if (fn) ctx.unrecorded.add('rng.onPick');
                return ctx.rng.onPick(fn);
            },
            stream: name => ctx.rng.stream(name),
            streams: () => ctx.rng.streams(),
        },

        clock: {
            now: clock.now,
            elapsed: clock.elapsed,
            get frameMs() { return clock.frameMs; },
            configure: ({ fps: nextFps, opCostMs: nextCost, utcOffsetMinutes: nextOffset } = {}) => recordNow({
                type: 'clock',
                ...(nextFps !== undefined && { fps: nextFps }),
                ...(nextCost !== undefined && { opCostMs: nextCost }),
                ...(nextOffset !== undefined && { utcOffsetMinutes: nextOffset }),
            }),
        },

        profile: profiler,

        withProbe(probe, work) {
            if (ctx.inFrame) throw new Error('probes can only be attached between frames');
            const previous = ctx.probes.current;
            ctx.probes.current = previous === null ? probe : {
                step(thread) {
                    previous.step(thread);
                    probe.step(thread);
                },
                block(thread, blockId, run) {
                    probe.block(thread, blockId, inner => previous.block(inner, blockId, run));
                },
            };
            try {
                return work();
            } finally {
                ctx.probes.current = previous;
            }
        },

        snapshot: options => snapshots.capture(options),
        restore: snapshot => ctx.scope.run(() => {
            snapshots.restore(snapshot);
            reattachPenListeners(runtime);
        }),
        hash() {
            const { input: { schedule, seq, ...input }, history, ...world } = snapshots.capture({ strict: false });
            return hashValue({ ...world, input });
        },
        refOf: snapshots.refOf,

        movie({ end = true } = {}) {
            return {
                spre: MOVIE_VERSION,
                project: fingerprint(),
                ...ctx.settings,
                renderer: rendererKind(runtime.renderer),
                start: ctx.origin.snapshot ?? 'load',
                events: ctx.input.api.log(),
                ...(end && { end: { frame: ctx.frame, hash: spre.hash() } }),
                unrecorded: [...ctx.unrecorded],
            };
        },

        status() {
            return {
                frame: ctx.frame,
                time: clock.elapsed(),
                threads: runtime.threads.length,
                clones: runtime._cloneCounter,
                waits: ctx.waits.pending,
                question: ctx.waits.question?.text ?? null,
                questionInBubble: Boolean(ctx.waits.question?.wasVisible && !ctx.waits.question?.wasStage),
                timers: ctx.timers.size,
                compiledBlocks: fast?.compiledBlocks ?? 0,
            };
        },

        detach() {
            profiler.stop();
            for (const [event, fn] of Object.entries(listeners)) runtime.removeListener(event, fn);
            primitives.uninstall();
            delete sequencer.stepThread;
            fast?.reset();
            delete runtime.updateCurrentMSecs;
            sequencer.timer.nowObj = originalSequencerNow;
            delete runtime[ATTACHED];
        },
    };
    return spre;
}
