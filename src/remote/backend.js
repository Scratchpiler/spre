import { createSceneChannel, describeScene } from '../render/scene.js';
import { createDebugger } from './debugger.js';
import { createTimeline } from './timeline.js';

export const PROTOCOL_VERSION = 1;

const defaultTiming = {
    now: () => performance.now(),
    later: (fn, ms) => setTimeout(fn, ms),
    cancel: handle => clearTimeout(handle),
};

const MAX_CATCH_UP_FRAMES = 8;
const TURBO_SLICE_MS = 12;
const STATUS_INTERVAL_MS = 100;

export function createBackend({ spre, vm, name = 'project', timing = defaultTiming, timeline: timelineOptions } = {}) {
    const timeline = createTimeline(spre, timelineOptions);
    const methods = createDebugger({ spre, vm });
    const sessions = new Set();
    let running = false;
    let speed = 1;
    let anchorTime = 0;
    let anchorFrame = 0;
    let timer = null;
    let lastStatusAt = -Infinity;
    let version = 0;
    const touched = () => { version++; };

    const fps = () => 1000 / spre.clock.frameMs;

    const status = () => ({
        ...spre.status(),
        running,
        speed,
        fps: fps(),
        holds: spre.memory.holds().length,
        timeline: timeline.info(),
    });

    const sendTo = (session, message) => {
        if (!session.closed) session.port.send(message);
    };

    const broadcast = ({ force = false } = {}) => {
        const now = timing.now();
        const statusDue = force || now - lastStatusAt >= STATUS_INTERVAL_MS;
        if (statusDue) lastStatusAt = now;
        let described = null;
        let current = null;
        for (const session of sessions) {
            if (session.scene && !session.awaitingAck && session.sentVersion !== version) {
                described ??= describeScene(vm.runtime.renderer);
                current ??= status();
                session.awaitingAck = true;
                session.sentVersion = version;
                sendTo(session, { type: 'frame', status: current, scene: session.channel.update(described) });
            } else if (statusDue && session.status) {
                current ??= status();
                sendTo(session, { type: 'status', status: current });
            }
            if (session.watching.size) {
                const changes = [];
                for (const [key, watch] of session.watching) {
                    const variable = spre.memory.variableOf(watch.target, watch.variable);
                    const value = variable ? variable.value : undefined;
                    const shown = Array.isArray(value) ? value.length : value;
                    if (shown === watch.last) continue;
                    watch.last = shown;
                    changes.push({ key, target: watch.target, variable: watch.variable, value: Array.isArray(value) ? { length: value.length } : value });
                }
                if (changes.length) sendTo(session, { type: 'event', name: 'watch', data: changes });
            }
        }
    };

    const runFrame = () => {
        touched();
        spre.step(1);
        timeline.afterFrame();
    };

    const schedule = () => {
        if (timer !== null || !running) return;
        const delay = Number.isFinite(speed) ? Math.max(1, Math.min(spre.clock.frameMs / speed, 16)) : 0;
        timer = timing.later(tick, delay);
    };

    const reanchor = () => {
        anchorTime = timing.now();
        anchorFrame = spre.frame;
    };

    const tick = () => {
        timer = null;
        if (!running) return;
        const started = timing.now();
        try {
            if (!Number.isFinite(speed)) {
                do runFrame(); while (timing.now() - started < TURBO_SLICE_MS);
            } else {
                const due = anchorFrame + Math.floor((started - anchorTime) * fps() * speed / 1000);
                let ran = 0;
                while (spre.frame < due && ran < MAX_CATCH_UP_FRAMES) {
                    runFrame();
                    ran++;
                }
                if (spre.frame < due) reanchor();
            }
        } catch (error) {
            running = false;
            for (const session of sessions) sendTo(session, { type: 'event', name: 'error', data: error.message });
        }
        broadcast();
        schedule();
    };

    const time = {
        'time.status': () => status(),
        'time.pause'() {
            running = false;
            if (timer !== null) timing.cancel(timer);
            timer = null;
            broadcast({ force: true });
            return status();
        },
        'time.resume'() {
            if (!running) {
                running = true;
                reanchor();
                schedule();
            }
            return status();
        },
        'time.step'(frames = 1) {
            for (let i = 0; i < frames; i++) runFrame();
            reanchor();
            broadcast({ force: true });
            return status();
        },
        'time.speed'(value) {
            if (value !== undefined) {
                const next = Number(value);
                if (!(next > 0)) throw new RangeError('speed must be above 0 (Infinity runs flat out)');
                speed = next;
                reanchor();
            }
            return status();
        },
        'timeline.start': options => timeline.start(options),
        'timeline.stop': () => timeline.stop(),
        'timeline.clear': () => timeline.clear(),
        'timeline.info': () => timeline.info(),
        'timeline.seek'(frame) {
            touched();
            const info = timeline.seek(frame);
            reanchor();
            broadcast({ force: true });
            return info;
        },
        'timeline.cut': () => timeline.cut(),
        'timeline.series': (target, variable) => timeline.series(target, variable),
    };

    const handlers = { ...methods, ...time };

    const MUTATING = ['states.load', 'vars.set', 'lists.edit', 'holds.', 'project.', 'input.send', 'input.schedule', 'timeline.cut'];
    const afterCall = method => {
        if (!MUTATING.some(prefix => method.startsWith(prefix))) return;
        touched();
        if (!running) broadcast({ force: true });
    };

    const connect = port => {
        const session = {
            port,
            scene: false,
            status: false,
            awaitingAck: false,
            sentVersion: -1,
            closed: false,
            channel: createSceneChannel(),
            watching: new Map(),
        };
        sessions.add(session);
        port.onClose(() => {
            session.closed = true;
            sessions.delete(session);
        });
        port.onMessage(async message => {
            switch (message.type) {
            case 'hello':
                session.scene = Boolean(message.scene);
                session.status = message.status !== false;
                session.channel.reset();
                session.awaitingAck = false;
                session.sentVersion = -1;
                sendTo(session, { type: 'welcome', protocol: PROTOCOL_VERSION, name, status: status(), methods: Object.keys(handlers).concat(['watch.set']) });
                broadcast({ force: true });
                break;
            case 'ack':
                session.awaitingAck = false;
                if (!running) broadcast();
                break;
            case 'input':
                spre.input.send(message.event);
                touched();
                if (!running) broadcast({ force: true });
                break;
            case 'call': {
                try {
                    let value;
                    if (message.method === 'watch.set') {
                        session.watching = new Map((message.args[0] ?? []).map(w => [`${w.target}|${w.variable}`, { ...w, last: Symbol('unseen') }]));
                        value = session.watching.size;
                    } else {
                        const handler = handlers[message.method];
                        if (!handler) throw new Error(`unknown method ${message.method}`);
                        value = await handler(...(message.args ?? []));
                    }
                    sendTo(session, { type: 'result', id: message.id, value });
                    afterCall(message.method);
                } catch (error) {
                    sendTo(session, { type: 'error', id: message.id, message: error.message });
                }
                break;
            }
            }
        });
        return session;
    };

    return {
        connect,
        status,
        call: (method, ...args) => handlers[method](...args),
        get running() {
            return running;
        },
        start() {
            return time['time.resume']();
        },
        stop() {
            return time['time.pause']();
        },
        timeline,
    };
}
