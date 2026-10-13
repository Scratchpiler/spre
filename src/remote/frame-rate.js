export const FRAME_RATE_PERCENTILES = [99, 95, 75, 50, 25, 1];

const WINDOW_MS = 10000;
const CURRENT_MS = 1000;

export function weightedPercentile(sorted, total, percent) {
    const wanted = (percent / 100) * total;
    let seen = 0;
    for (const sample of sorted) {
        seen += sample.frames;
        if (seen >= wanted) return sample.fps;
    }
    return sorted.at(-1)?.fps ?? null;
}

export function createFrameRate({ windowMs = WINDOW_MS, currentMs = CURRENT_MS } = {}) {
    let samples = [];
    let lastAt = null;
    let runningSince = null;

    const prune = now => {
        const cutoff = now - windowMs;
        let drop = 0;
        while (drop < samples.length && samples[drop].at < cutoff) drop++;
        if (drop) samples = samples.slice(drop);
    };

    return {
        begin(now) {
            lastAt = now;
            runningSince = now;
        },

        pause() {
            lastAt = null;
            runningSince = null;
        },

        record(frames, now) {
            if (frames <= 0) return;
            if (lastAt !== null && now > lastAt) samples.push({ at: now, frames, fps: (frames * 1000) / (now - lastAt) });
            lastAt = now;
            prune(now);
        },

        clear() {
            samples = [];
        },

        stats(now) {
            if (runningSince !== null) prune(now);
            if (!samples.length) return null;
            const since = Math.max(now - currentMs, runningSince ?? now);
            const span = now - since;
            const recentFrames = samples.reduce((sum, sample) => sum + (sample.at > since ? sample.frames : 0), 0);
            const sorted = samples.slice().sort((a, b) => a.fps - b.fps);
            const total = sorted.reduce((sum, sample) => sum + sample.frames, 0);
            const result = {
                current: span > 0 ? (recentFrames * 1000) / span : 0,
                max: sorted.at(-1).fps,
                min: sorted[0].fps,
                frames: total,
                windowMs,
            };
            for (const percent of FRAME_RATE_PERCENTILES) result[`p${percent}`] = weightedPercentile(sorted, total, percent);
            return result;
        },
    };
}
