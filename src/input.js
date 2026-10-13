const STAGE_W = 480;
const STAGE_H = 360;

const KEY_ALIASES = {
    space: ' ',
    'left arrow': 'ArrowLeft',
    'right arrow': 'ArrowRight',
    'up arrow': 'ArrowUp',
    'down arrow': 'ArrowDown',
    enter: 'Enter',
};

export const EVENT_TYPES = ['key', 'mouse', 'wheel', 'answer', 'loudness', 'username', 'flag', 'stop', 'turbo', 'cloud', 'poke', 'list', 'hold', 'release', 'clock', 'rng'];

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const validate = event => {
    if (!event || !EVENT_TYPES.includes(event.type)) {
        throw new TypeError(`unknown input event ${JSON.stringify(event)}; expected one of ${EVENT_TYPES.join(', ')}`);
    }
    return event;
};

export function createInput(ctx, { answers = null } = {}) {
    const { runtime } = ctx;
    let schedule = [];
    let head = 0;
    let log = [];
    let seq = 0;
    let loudness = -1;
    let answerSource = answers;

    const targetNamed = name => {
        const target = name === 'stage' || name === '_stage_' ? runtime.getTargetForStage() : runtime.getSpriteTargetByName(name);
        if (!target) throw new Error(`no sprite named "${name}"`);
        return target;
    };

    const applyMouse = ({ x, y, down, target, wasDragged = false }) => {
        const mouse = runtime.ioDevices.mouse;
        if (down && target !== undefined && x === undefined && y === undefined) {
            const picked = targetNamed(target);
            if (!picked.isStage) ({ x, y } = picked);
            else if (mouse._clientX === undefined) x = y = 0;
        }
        if (x !== undefined) {
            mouse._clientX = x + STAGE_W / 2;
            mouse._scratchX = Math.round(clamp(x, -STAGE_W / 2, STAGE_W / 2));
        }
        if (y !== undefined) {
            mouse._clientY = STAGE_H / 2 - y;
            mouse._scratchY = Math.round(clamp(y, -STAGE_H / 2, STAGE_H / 2));
        }
        if (down === undefined) return;
        const wasDown = mouse._isDown;
        mouse._isDown = Boolean(down);
        if (wasDown === mouse._isDown || wasDragged) return;
        const cx = mouse._clientX;
        const cy = mouse._clientY;
        if (!(cx > 0 && cx < STAGE_W && cy > 0 && cy < STAGE_H)) return;
        const picked = target !== undefined ? targetNamed(target) : mouse._pickTarget(cx, cy);
        const pressed = !wasDown && mouse._isDown;
        if (picked.draggable ? !pressed : pressed) mouse._activateClickHats(picked);
    };

    const apply = event => {
        switch (event.type) {
        case 'key':
            runtime.ioDevices.keyboard.postData({ key: KEY_ALIASES[event.key] ?? event.key, isDown: event.down !== false });
            break;
        case 'mouse': applyMouse(event); break;
        case 'wheel': runtime.ioDevices.mouseWheel.postData({ deltaY: event.deltaY }); break;
        case 'answer': ctx.waits.submit(String(event.text)); break;
        case 'loudness': loudness = Number(event.value); break;
        case 'username': runtime.ioDevices.userData.postData({ username: String(event.name) }); break;
        case 'flag': runtime.greenFlag(); break;
        case 'stop': runtime.stopAll(); break;
        case 'turbo': runtime.turboMode = Boolean(event.on); break;
        case 'cloud': runtime.ioDevices.cloud.postData({ varUpdate: { name: event.name, value: event.value } }); break;
        case 'poke':
        case 'list':
        case 'hold':
        case 'release':
            ctx.memory.apply(event);
            break;
        case 'clock':
            ctx.clock.configure(event);
            runtime.currentStepTime = ctx.clock.frameMs;
            break;
        case 'rng':
            if (event.op === 'reseed') ctx.rng.reseed(event.seed);
            else if (event.op === 'force') ctx.rng.force(...event.values);
            else if (event.op === 'queue') ctx.rng.queue(event.stream, ...event.values);
            else throw new TypeError(`unknown rng event op ${event.op}`);
            break;
        }
    };

    const record = event => {
        log.push({ frame: ctx.frame, ...event });
        apply(event);
    };

    const offerAnswer = () => {
        const question = ctx.waits.question;
        if (!question || answerSource === null) return;
        let text;
        if (typeof answerSource === 'function') {
            text = answerSource({ question: question.text, sprite: question.target.isStage ? 'stage' : question.target.getName(), frame: ctx.frame });
        } else if (answerSource.length) {
            text = answerSource.shift();
        }
        if (text !== undefined) record({ type: 'answer', text: String(text) });
    };

    const insertionPoint = frame => {
        let lo = head;
        let hi = schedule.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (schedule[mid].frame <= frame) lo = mid + 1; else hi = mid;
        }
        return lo;
    };

    const at = (frame, event) => {
        if (!Number.isInteger(frame) || frame < 0) throw new RangeError(`bad frame ${frame}`);
        const item = { frame, seq: seq++, event: { ...validate(event) } };
        const index = insertionPoint(frame);
        if (index === schedule.length) schedule.push(item); else schedule.splice(index, 0, item);
    };

    const pendingItems = () => schedule.slice(head);
    const soon = event => at(ctx.frame, event);

    return {
        get loudness() { return loudness; },

        recordNow(event) {
            record({ ...validate(event) });
        },

        setLog(entries) {
            log = entries.map(entry => ({ ...entry }));
        },

        applyFrame(frame) {
            while (head < schedule.length && schedule[head].frame <= frame) record(schedule[head++].event);
            if (head > 1024 && head * 2 > schedule.length) {
                schedule = schedule.slice(head);
                head = 0;
            }
            offerAnswer();
        },

        api: {
            at,
            send: soon,
            schedule(events) {
                for (const { frame, ...event } of events) at(frame, event);
            },
            key: (key, down = true) => soon({ type: 'key', key, down }),
            tap(key, frames = 1) {
                at(ctx.frame, { type: 'key', key, down: true });
                at(ctx.frame + frames, { type: 'key', key, down: false });
            },
            mouse: ({ x, y, down, target } = {}) => soon({ type: 'mouse', x, y, down, target }),
            click(target, { x, y, frames = 1 } = {}) {
                at(ctx.frame, { type: 'mouse', x, y, down: true, target });
                at(ctx.frame + frames, { type: 'mouse', down: false, target });
            },
            wheel: deltaY => soon({ type: 'wheel', deltaY }),
            answer: text => soon({ type: 'answer', text }),
            setLoudness: value => soon({ type: 'loudness', value }),
            username: name => soon({ type: 'username', name }),
            cloud: (name, value) => soon({ type: 'cloud', name, value }),
            answers(source) {
                answerSource = typeof source === 'function' ? source : source ? [...source] : null;
            },
            pending: () => pendingItems().map(({ frame, event }) => ({ frame, ...event })),
            clear() {
                schedule = [];
                head = 0;
            },
            log: () => log.map(entry => ({ ...entry })),
            state() {
                const mouse = runtime.ioDevices.mouse;
                return {
                    keys: [...runtime.ioDevices.keyboard._keysPressed],
                    mouse: { x: mouse._scratchX ?? 0, y: mouse._scratchY ?? 0, down: mouse._isDown },
                    loudness,
                    username: runtime.ioDevices.userData._username,
                    question: ctx.waits.question?.text ?? null,
                };
            },
        },

        save() {
            const mouse = runtime.ioDevices.mouse;
            return {
                keys: [...runtime.ioDevices.keyboard._keysPressed],
                mouse: { clientX: mouse._clientX, clientY: mouse._clientY, x: mouse._scratchX, y: mouse._scratchY, down: mouse._isDown },
                username: runtime.ioDevices.userData._username,
                loudness,
                seq,
                schedule: pendingItems().map(item => ({ ...item, event: { ...item.event } })),
            };
        },

        load(saved) {
            runtime.ioDevices.keyboard._keysPressed = [...saved.keys];
            const mouse = runtime.ioDevices.mouse;
            mouse._clientX = saved.mouse.clientX;
            mouse._clientY = saved.mouse.clientY;
            mouse._scratchX = saved.mouse.x;
            mouse._scratchY = saved.mouse.y;
            mouse._isDown = saved.mouse.down;
            runtime.ioDevices.userData._username = saved.username;
            loudness = saved.loudness;
            seq = saved.seq;
            schedule = saved.schedule.map(item => ({ ...item, event: { ...item.event } }));
            head = 0;
        },
    };
}
