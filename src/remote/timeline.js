export function createTimeline(spre, { every = 30, maxKeyframes = 240, seriesFrames = 3600 } = {}) {
    let keyframes = [];
    let recording = false;
    let error = null;
    const watched = new Map();

    const thin = () => {
        if (keyframes.length <= maxKeyframes) return;
        const half = Math.floor(keyframes.length / 2);
        keyframes = [...keyframes.slice(0, half).filter((_, i) => i % 2 === 0), ...keyframes.slice(half)];
    };

    const capture = () => {
        try {
            keyframes.push({ frame: spre.frame, snapshot: spre.snapshot() });
            thin();
        } catch (problem) {
            recording = false;
            error = problem.message;
        }
    };

    const sample = () => {
        for (const entry of watched.values()) {
            const variable = spre.memory.variableOf(entry.target, entry.variable);
            const value = variable ? (Array.isArray(variable.value) ? variable.value.length : variable.value) : null;
            entry.values.push([spre.frame, value]);
            if (entry.values.length > seriesFrames) entry.values.splice(0, entry.values.length - seriesFrames);
        }
    };

    const keyframeAtOrBefore = frame => {
        let best = null;
        for (const keyframe of keyframes) {
            if (keyframe.frame <= frame && (!best || keyframe.frame > best.frame)) best = keyframe;
        }
        return best;
    };

    return {
        afterFrame() {
            if (!recording) return;
            if (keyframes.length === 0 || spre.frame - keyframes[keyframes.length - 1].frame >= every) capture();
            sample();
        },

        start(options = {}) {
            if (options.every) every = options.every;
            recording = true;
            error = null;
            if (!keyframes.some(keyframe => keyframe.frame === spre.frame)) capture();
            return this.info();
        },

        stop() {
            recording = false;
            return this.info();
        },

        clear() {
            keyframes = [];
            for (const entry of watched.values()) entry.values.length = 0;
            return this.info();
        },

        info() {
            const log = spre.input.log();
            const pending = spre.input.pending();
            const lastEvent = Math.max(log.at(-1)?.frame ?? 0, pending.at(-1)?.frame ?? 0);
            return {
                recording,
                error,
                every,
                frame: spre.frame,
                start: keyframes[0]?.frame ?? null,
                end: Math.max(spre.frame, lastEvent, keyframes.at(-1)?.frame ?? 0),
                keyframes: keyframes.map(keyframe => keyframe.frame),
            };
        },

        seek(target) {
            const keyframe = keyframeAtOrBefore(target);
            if (!keyframe) throw new Error(`no keyframe at or before frame ${target}`);
            const replay = [...spre.input.log(), ...spre.input.pending()].filter(event => event.frame >= keyframe.frame);
            spre.restore(keyframe.snapshot);
            spre.input.clear();
            spre.input.schedule(replay);
            if (target > spre.frame) spre.step(target - spre.frame);
            return this.info();
        },

        cut() {
            const keep = spre.input.pending().filter(event => event.frame < spre.frame);
            spre.input.clear();
            spre.input.schedule(keep);
            keyframes = keyframes.filter(keyframe => keyframe.frame <= spre.frame);
            return this.info();
        },

        watch(target, variable) {
            const key = `${target}|${variable}`;
            if (!watched.has(key)) watched.set(key, { target, variable, values: [] });
            return key;
        },

        unwatch(target, variable) {
            watched.delete(`${target}|${variable}`);
        },

        series(target, variable) {
            return watched.get(`${target}|${variable}`)?.values.map(([frame, value]) => ({ frame, value })) ?? [];
        },
    };
}
