import { makeVirtualDate } from './clock.js';

const TIMEOUT_MAX = 2147483647;

export const normalizeDelay = ms => {
    const delay = Number(ms);
    if (!(delay > 0)) return 0;
    if (delay > TIMEOUT_MAX) return 1;
    return delay;
};

export function createTimers(clock) {
    const pending = new Map();
    let nextId = 1;
    let seq = 0;

    const add = (fn, ms, args, repeat) => {
        const id = nextId++;
        const delay = normalizeDelay(ms);
        pending.set(id, { id, due: clock.now() + delay, seq: seq++, fn, args, repeat: repeat ? Math.max(delay, 1) : 0 });
        return id;
    };

    return {
        setTimeout: (fn, ms, ...args) => add(fn, ms, args, false),
        setInterval: (fn, ms, ...args) => add(fn, ms, args, true),
        clear: id => { pending.delete(id); },
        get size() { return pending.size; },
        describe: () => [...pending.values()].map(t => ({ due: t.due, repeat: t.repeat, fn: t.fn?.name || 'anonymous' })),

        fireDue(now) {
            for (;;) {
                let first = null;
                for (const timer of pending.values()) {
                    if (timer.due > now) continue;
                    if (!first || timer.due < first.due || (timer.due === first.due && timer.seq < first.seq)) first = timer;
                }
                if (!first) return;
                if (first.repeat) {
                    first.due += first.repeat;
                    first.seq = seq++;
                } else {
                    pending.delete(first.id);
                }
                if (typeof first.fn === 'function') first.fn(...first.args);
            }
        },

        clearAll() { pending.clear(); },
    };
}

export function createScope({ clock, rng, timers, currentStream }) {
    const VirtualDate = makeVirtualDate(clock);
    const performanceNow = () => clock.elapsed();
    const random = () => rng.next(currentStream());
    let depth = 0;
    let saved = null;

    const swapPerformance = (now) => {
        const perf = globalThis.performance;
        if (!perf) return undefined;
        const had = Object.hasOwn(perf, 'now');
        const previous = perf.now;
        try {
            Object.defineProperty(perf, 'now', { value: now, configurable: true, writable: true });
        } catch {
            return undefined;
        }
        return { perf, had, previous };
    };

    const restorePerformance = (swap) => {
        if (!swap) return;
        if (swap.had) Object.defineProperty(swap.perf, 'now', { value: swap.previous, configurable: true, writable: true });
        else delete swap.perf.now;
    };

    const enter = () => {
        if (depth++ > 0) return;
        saved = {
            Date: globalThis.Date,
            random: Math.random,
            setTimeout: globalThis.setTimeout,
            clearTimeout: globalThis.clearTimeout,
            setInterval: globalThis.setInterval,
            clearInterval: globalThis.clearInterval,
            performance: swapPerformance(performanceNow),
        };
        globalThis.Date = VirtualDate;
        Math.random = random;
        globalThis.setTimeout = timers.setTimeout;
        globalThis.clearTimeout = timers.clear;
        globalThis.setInterval = timers.setInterval;
        globalThis.clearInterval = timers.clear;
    };

    const exit = () => {
        if (--depth > 0) return;
        globalThis.Date = saved.Date;
        Math.random = saved.random;
        globalThis.setTimeout = saved.setTimeout;
        globalThis.clearTimeout = saved.clearTimeout;
        globalThis.setInterval = saved.setInterval;
        globalThis.clearInterval = saved.clearInterval;
        restorePerformance(saved.performance);
        saved = null;
    };

    return {
        VirtualDate,
        get active() { return depth > 0; },
        run(fn) {
            enter();
            try {
                return fn();
            } finally {
                exit();
            }
        },
    };
}
