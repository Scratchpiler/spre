import { PROTOCOL_VERSION } from './backend.js';

export function connectClient(port, { scene = false, status = true } = {}) {
    const pending = new Map();
    const listeners = new Map();
    let nextId = 1;
    let welcomed;
    const ready = new Promise(resolve => { welcomed = resolve; });

    const emit = (name, data) => {
        for (const listener of listeners.get(name) ?? []) listener(data);
    };

    port.onMessage(async message => {
        switch (message.type) {
        case 'welcome':
            if (message.protocol !== PROTOCOL_VERSION) emit('error', `backend speaks protocol ${message.protocol}, display speaks ${PROTOCOL_VERSION}`);
            welcomed(message);
            emit('status', message.status);
            break;
        case 'result':
        case 'error': {
            const call = pending.get(message.id);
            if (!call) return;
            pending.delete(message.id);
            if (message.type === 'result') call.resolve(message.value);
            else call.reject(new Error(message.message));
            break;
        }
        case 'frame': {
            emit('status', message.status);
            const handlers = listeners.get('frame') ?? new Set();
            try {
                await Promise.all([...handlers].map(handler => handler(message)));
            } finally {
                port.send({ type: 'ack' });
            }
            break;
        }
        case 'status':
            emit('status', message.status);
            break;
        case 'event':
            emit(message.name, message.data);
            break;
        }
    });
    port.onClose(() => {
        for (const call of pending.values()) call.reject(new Error('connection closed'));
        pending.clear();
        emit('close');
    });
    port.send({ type: 'hello', protocol: PROTOCOL_VERSION, scene, status });

    return {
        ready,
        call(method, ...args) {
            const id = nextId++;
            return new Promise((resolve, reject) => {
                pending.set(id, { resolve, reject });
                port.send({ type: 'call', id, method, args });
            });
        },
        input(event) {
            port.send({ type: 'input', event });
        },
        on(name, listener) {
            if (!listeners.has(name)) listeners.set(name, new Set());
            listeners.get(name).add(listener);
            return () => listeners.get(name).delete(listener);
        },
        close() {
            port.close();
        },
    };
}
