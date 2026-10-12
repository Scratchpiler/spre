const seedWord = text => {
    let h = 1779033703 ^ text.length;
    for (let i = 0; i < text.length; i++) {
        h = Math.imul(h ^ text.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return () => {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    };
};

const sfc32 = s => {
    const t = (((s[0] + s[1]) | 0) + s[3]) | 0;
    s[3] = (s[3] + 1) | 0;
    s[0] = s[1] ^ (s[1] >>> 9);
    s[1] = (s[2] + (s[2] << 3)) | 0;
    s[2] = (s[2] << 21) | (s[2] >>> 11);
    s[2] = (s[2] + t) | 0;
    return t >>> 0;
};

const unitDouble = s => ((sfc32(s) >>> 5) * 67108864 + (sfc32(s) >>> 6)) / 9007199254740992;

const freshState = (seed, name) => {
    const word = seedWord(`${seed}\u0000${name}`);
    const state = [word() | 0, word() | 0, word() | 0, word() | 0];
    for (let i = 0; i < 12; i++) sfc32(state);
    return state;
};

const checkUnit = value => {
    if (typeof value !== 'number' || !(value >= 0 && value < 1)) {
        throw new RangeError(`queued draws must be numbers in [0, 1), got ${value}`);
    }
    return value;
};

export function createRng(seed = 0) {
    let currentSeed = String(seed);
    const streams = new Map();
    const forcedPicks = [];
    const overrides = new Map();
    let pickOverride = null;

    const stream = name => {
        let entry = streams.get(name);
        if (!entry) {
            entry = { state: freshState(currentSeed, name), draws: 0, queue: [] };
            streams.set(name, entry);
        }
        return entry;
    };

    const next = (name, context) => {
        const entry = stream(name);
        entry.draws++;
        const override = overrides.get(name);
        if (override) {
            const value = override(context ?? { stream: name, draw: entry.draws });
            if (value !== undefined) return checkUnit(value);
        }
        if (entry.queue.length) return entry.queue.shift();
        return unitDouble(entry.state);
    };

    return {
        get seed() { return currentSeed; },
        next,
        stream: name => ({ name, draws: stream(name).draws, queued: stream(name).queue.length }),
        streams: () => [...streams.keys()],

        reseed(newSeed) {
            currentSeed = String(newSeed);
            streams.clear();
            forcedPicks.length = 0;
        },

        queue(name, ...values) {
            stream(name).queue.push(...values.map(checkUnit));
        },

        override(name, fn) {
            if (fn) overrides.set(name, fn); else overrides.delete(name);
        },

        force(...values) {
            forcedPicks.push(...values);
        },

        onPick(fn) {
            pickOverride = fn ?? null;
        },

        takePick(request) {
            if (pickOverride) {
                const value = pickOverride(request);
                if (value !== undefined) return { value };
            }
            if (forcedPicks.length) return { value: forcedPicks.shift() };
            return null;
        },

        save() {
            return {
                seed: currentSeed,
                streams: Object.fromEntries([...streams].map(([name, entry]) => [name, {
                    state: entry.state.map(n => n >>> 0),
                    draws: entry.draws,
                    queue: [...entry.queue],
                }])),
                forced: [...forcedPicks],
            };
        },

        load(saved) {
            currentSeed = saved.seed;
            streams.clear();
            for (const [name, entry] of Object.entries(saved.streams)) {
                streams.set(name, { state: entry.state.map(n => n | 0), draws: entry.draws, queue: [...entry.queue] });
            }
            forcedPicks.length = 0;
            forcedPicks.push(...saved.forced);
        },
    };
}
