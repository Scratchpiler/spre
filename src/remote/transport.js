import { decodeMessage, encodeMessage } from './codec.js';

const createEndpoint = () => {
    const messageHandlers = new Set();
    const closeHandlers = new Set();
    let closed = false;
    return {
        handlers: messageHandlers,
        deliver(message) {
            for (const handler of messageHandlers) handler(message);
        },
        shut() {
            if (closed) return;
            closed = true;
            for (const handler of closeHandlers) handler();
        },
        get closed() {
            return closed;
        },
        onMessage(handler) {
            messageHandlers.add(handler);
            return () => messageHandlers.delete(handler);
        },
        onClose(handler) {
            closeHandlers.add(handler);
            return () => closeHandlers.delete(handler);
        },
    };
};

export function createLoopback() {
    const a = createEndpoint();
    const b = createEndpoint();
    const link = (from, to) => ({
        send(message) {
            if (from.closed) return;
            queueMicrotask(() => to.deliver(message));
        },
        onMessage: from.onMessage,
        onClose: from.onClose,
        close() {
            from.shut();
            to.shut();
        },
        get bufferedAmount() {
            return 0;
        },
    });
    return [link(a, b), link(b, a)];
}

export function fromWebSocket(socket) {
    const endpoint = createEndpoint();
    socket.binaryType = 'arraybuffer';
    socket.addEventListener('message', event => {
        if (typeof event.data !== 'string') endpoint.deliver(decodeMessage(event.data));
    });
    socket.addEventListener('close', () => endpoint.shut());
    return {
        send(message) {
            socket.send(encodeMessage(message));
        },
        onMessage: endpoint.onMessage,
        onClose: endpoint.onClose,
        close() {
            socket.close();
        },
        get bufferedAmount() {
            return socket.bufferedAmount;
        },
    };
}

export function fromServerConnection(connection) {
    const endpoint = createEndpoint();
    connection.onMessage((data, isBinary) => {
        if (isBinary) endpoint.deliver(decodeMessage(data));
    });
    connection.onClose(() => endpoint.shut());
    return {
        send(message) {
            if (connection.open) connection.send(encodeMessage(message));
        },
        onMessage: endpoint.onMessage,
        onClose: endpoint.onClose,
        close() {
            connection.close();
        },
        get bufferedAmount() {
            return connection.bufferedAmount;
        },
    };
}

export function fromMessagePort(port) {
    const endpoint = createEndpoint();
    port.addEventListener('message', event => endpoint.deliver(event.data));
    port.start?.();
    return {
        send(message) {
            port.postMessage(message);
        },
        onMessage: endpoint.onMessage,
        onClose: endpoint.onClose,
        close() {
            port.close?.();
            endpoint.shut();
        },
        get bufferedAmount() {
            return 0;
        },
    };
}
