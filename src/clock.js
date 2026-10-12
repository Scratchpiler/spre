const MS_PER_MINUTE = 60000;

export const toEpochMs = epoch => {
    if (epoch instanceof Date) return epoch.getTime();
    if (typeof epoch === 'string') {
        const ms = Date.parse(epoch);
        if (Number.isNaN(ms)) throw new RangeError(`unparseable epoch "${epoch}"`);
        return ms;
    }
    if (typeof epoch !== 'number' || !Number.isFinite(epoch)) throw new RangeError(`bad epoch ${epoch}`);
    return epoch;
};

export function createClock({ epoch = '2025-01-01T00:00:00Z', fps = 30, opCostMs = 0.001, utcOffsetMinutes = 0 } = {}) {
    const state = {
        epoch: toEpochMs(epoch),
        frameMs: 1000 / fps,
        opCostMs,
        utcOffsetMinutes,
        frameStart: 0,
        nextFrameStart: 0,
    };
    const work = { ops: 0 };

    const elapsed = () => state.frameStart + work.ops * state.opCostMs;
    const now = () => state.epoch + elapsed();

    return {
        now,
        elapsed,
        frameNow: () => state.epoch + state.frameStart,
        work,
        charge(ops = 1) { work.ops += ops; },
        get ops() { return work.ops; },
        get frameMs() { return state.frameMs; },
        get utcOffsetMinutes() { return state.utcOffsetMinutes; },

        beginFrame() {
            state.frameStart = state.nextFrameStart;
            work.ops = 0;
        },

        endFrame() {
            state.nextFrameStart = state.frameStart + Math.max(state.frameMs, work.ops * state.opCostMs);
        },

        localParts(ms = now()) {
            const shifted = new Date(Math.trunc(ms) + state.utcOffsetMinutes * MS_PER_MINUTE);
            return {
                year: shifted.getUTCFullYear(),
                month: shifted.getUTCMonth() + 1,
                date: shifted.getUTCDate(),
                dayofweek: shifted.getUTCDay() + 1,
                hour: shifted.getUTCHours(),
                minute: shifted.getUTCMinutes(),
                second: shifted.getUTCSeconds(),
            };
        },

        configure({ fps, opCostMs, utcOffsetMinutes } = {}) {
            if (fps !== undefined) state.frameMs = 1000 / fps;
            if (opCostMs !== undefined) state.opCostMs = opCostMs;
            if (utcOffsetMinutes !== undefined) state.utcOffsetMinutes = utcOffsetMinutes;
        },

        save: () => ({ ...state, ops: work.ops }),
        load({ ops, ...saved }) {
            Object.assign(state, saved);
            work.ops = ops;
        },
    };
}

export function makeVirtualDate(clock, RealDate = Date) {
    function VirtualDate(...args) {
        if (!new.target) return new RealDate(clock.now()).toString();
        return Reflect.construct(RealDate, args.length ? args : [clock.now()], new.target);
    }
    VirtualDate.prototype = RealDate.prototype;
    VirtualDate.now = () => clock.now();
    VirtualDate.UTC = RealDate.UTC;
    VirtualDate.parse = RealDate.parse;
    return VirtualDate;
}
