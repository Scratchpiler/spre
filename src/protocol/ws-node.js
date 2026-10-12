import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

const ACCEPT_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const DEFAULT_MAX_MESSAGE_BYTES = 64 * 1024 * 1024;
const FIN_BIT = 0x80;
const RSV_MASK = 0x70;
const OPCODE_MASK = 0x0f;
const CONTROL_BIT = 0x08;
const MASK_BIT = 0x80;
const LENGTH_MASK = 0x7f;
const LENGTH_CODE_16 = 126;
const LENGTH_CODE_64 = 127;
const MAX_CONTROL_PAYLOAD = 125;
const CLOSE_CODE_PREFIX_LENGTH = 2;
const MASK_KEY_LENGTH = 4;
const OPCODE = Object.freeze({ continuation: 0x0, text: 0x1, binary: 0x2, close: 0x8, ping: 0x9, pong: 0xa });
const KNOWN_OPCODES = new Set(Object.values(OPCODE));
const CLOSE_CODE = Object.freeze({
    normal: 1000,
    goingAway: 1001,
    protocolError: 1002,
    noStatus: 1005,
    abnormal: 1006,
    invalidData: 1007,
    messageTooBig: 1009,
});
const BAD_REQUEST_RESPONSE = 'HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n';
const utf8Decoder = new TextDecoder('utf-8', { fatal: true });

export function attachWebSocketServer(httpServer, { path = '/', maxMessageBytes = DEFAULT_MAX_MESSAGE_BYTES, onConnection }) {
    const connections = new Set();
    const options = { path, maxMessageBytes, onConnection, connections };
    const onUpgrade = (request, socket, head) => handleUpgrade(options, request, socket, head);
    httpServer.on('upgrade', onUpgrade);
    return {
        close() {
            httpServer.off('upgrade', onUpgrade);
            for (const connection of [...connections]) {
                connection.close(CLOSE_CODE.goingAway);
            }
        },
    };
}

function handleUpgrade(options, request, socket, head) {
    if (!isWebSocketUpgrade(request, options.path)) {
        rejectUpgrade(socket);
        return;
    }
    socket.write(handshakeResponse(request.headers['sec-websocket-key']));
    socket.setNoDelay(true);
    if (head.length > 0) {
        socket.unshift(head);
    }
    const connection = createConnection(socket, options.maxMessageBytes, () => options.connections.delete(connection));
    options.connections.add(connection);
    options.onConnection(connection, request);
}

function isWebSocketUpgrade(request, path) {
    return request.method === 'GET'
        && pathnameOf(request) === path
        && request.headers.upgrade?.toLowerCase() === 'websocket'
        && request.headers['sec-websocket-version'] === '13'
        && Boolean(request.headers['sec-websocket-key']);
}

function pathnameOf(request) {
    try {
        return new URL(request.url, 'http://localhost').pathname;
    } catch {
        return null;
    }
}

function handshakeResponse(key) {
    const accept = createHash('sha1').update(key + ACCEPT_GUID).digest('base64');
    return [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${accept}`,
        '',
        '',
    ].join('\r\n');
}

function rejectUpgrade(socket) {
    socket.on('error', () => socket.destroy());
    socket.end(BAD_REQUEST_RESPONSE, () => socket.destroy());
}

function createConnection(socket, maxMessageBytes, onFinish) {
    const state = {
        socket,
        maxMessageBytes,
        onFinish,
        queue: { chunks: [], length: 0 },
        fragments: null,
        messageHandlers: new Set(),
        closeHandlers: new Set(),
        closing: false,
        closed: false,
        closeCode: undefined,
        closeReason: '',
    };
    attachSocketListeners(state);
    return {
        send: data => sendData(state, data),
        onMessage: handler => subscribe(state.messageHandlers, handler),
        onClose: handler => subscribe(state.closeHandlers, handler),
        close: (code = CLOSE_CODE.normal, reason = '') => closeConnection(state, code, reason),
        get open() {
            return !state.closing;
        },
        get bufferedAmount() {
            return socket.writableLength;
        },
    };
}

function attachSocketListeners(state) {
    const { socket } = state;
    socket.on('data', chunk => ingest(state, chunk));
    socket.on('end', () => socket.end());
    socket.on('error', () => socket.destroy());
    socket.on('close', () => finish(state));
}

function subscribe(handlers, handler) {
    handlers.add(handler);
    return () => {
        handlers.delete(handler);
    };
}

function finish(state) {
    if (state.closed) {
        return;
    }
    state.closed = true;
    state.closing = true;
    state.onFinish();
    for (const handler of state.closeHandlers) {
        handler(state.closeCode ?? CLOSE_CODE.abnormal, state.closeReason);
    }
}

function sendData(state, data) {
    if (state.closing) {
        throw new Error('WebSocket connection is closed');
    }
    const { opcode, payload } = outgoingFrameParts(data);
    writeFrame(state, opcode, payload);
}

function outgoingFrameParts(data) {
    if (typeof data === 'string') {
        return { opcode: OPCODE.text, payload: Buffer.from(data, 'utf8') };
    }
    if (ArrayBuffer.isView(data)) {
        return { opcode: OPCODE.binary, payload: Buffer.from(data.buffer, data.byteOffset, data.byteLength) };
    }
    if (data instanceof ArrayBuffer) {
        return { opcode: OPCODE.binary, payload: Buffer.from(data) };
    }
    throw new TypeError('send() expects a string, an ArrayBuffer or an ArrayBuffer view');
}

function writeFrame(state, opcode, payload) {
    state.socket.write(encodeFrame(opcode, payload));
}

function encodeFrame(opcode, payload) {
    return Buffer.concat([encodeFrameHeader(opcode, payload.length), payload]);
}

function encodeFrameHeader(opcode, length) {
    const firstByte = FIN_BIT | opcode;
    if (length < LENGTH_CODE_16) {
        return Buffer.from([firstByte, length]);
    }
    if (length <= 0xffff) {
        const header = Buffer.alloc(4);
        header[0] = firstByte;
        header[1] = LENGTH_CODE_16;
        header.writeUInt16BE(length, 2);
        return header;
    }
    const header = Buffer.alloc(10);
    header[0] = firstByte;
    header[1] = LENGTH_CODE_64;
    header.writeBigUInt64BE(BigInt(length), 2);
    return header;
}

function closeConnection(state, code, reason) {
    if (state.closing) {
        return;
    }
    const frame = encodeFrame(OPCODE.close, encodeClosePayload(code, reason));
    state.closing = true;
    state.closeCode = code;
    state.closeReason = reason;
    state.socket.end(frame);
}

function encodeClosePayload(code, reason) {
    if (code === CLOSE_CODE.noStatus) {
        return Buffer.alloc(0);
    }
    const reasonBytes = Buffer.from(reason, 'utf8');
    if (reasonBytes.length > MAX_CONTROL_PAYLOAD - CLOSE_CODE_PREFIX_LENGTH) {
        throw new RangeError('close reason exceeds 123 bytes');
    }
    const payload = Buffer.alloc(CLOSE_CODE_PREFIX_LENGTH + reasonBytes.length);
    payload.writeUInt16BE(code, 0);
    reasonBytes.copy(payload, CLOSE_CODE_PREFIX_LENGTH);
    return payload;
}

function ingest(state, chunk) {
    if (state.closing) {
        return;
    }
    state.queue.chunks.push(chunk);
    state.queue.length += chunk.length;
    drainFrames(state);
}

function drainFrames(state) {
    try {
        while (!state.closing) {
            const frame = readFrame(state);
            if (!frame) {
                return;
            }
            handleFrame(state, frame);
        }
    } catch (error) {
        if (error.closeCode === undefined) {
            throw error;
        }
        closeConnection(state, error.closeCode, '');
    }
}

function protocolFailure(closeCode) {
    const error = new Error(`WebSocket protocol failure (${closeCode})`);
    error.closeCode = closeCode;
    return error;
}

function readFrame(state) {
    const { queue } = state;
    if (queue.length < 2) {
        return null;
    }
    const headerLength = headerLengthFor(peekBytes(queue, 2));
    if (queue.length < headerLength) {
        return null;
    }
    const header = parseHeader(peekBytes(queue, headerLength), state.maxMessageBytes);
    if (queue.length < headerLength + header.payloadLength) {
        return null;
    }
    discardBytes(queue, headerLength);
    const payload = unmask(takeBytes(queue, header.payloadLength), header.maskKey);
    return { fin: header.fin, opcode: header.opcode, payload };
}

function headerLengthFor(prefix) {
    validateFirstByte(prefix[0]);
    if ((prefix[1] & MASK_BIT) === 0) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    return 2 + extendedLengthSize(prefix[1] & LENGTH_MASK) + MASK_KEY_LENGTH;
}

function extendedLengthSize(lengthCode) {
    if (lengthCode === LENGTH_CODE_16) {
        return 2;
    }
    if (lengthCode === LENGTH_CODE_64) {
        return 8;
    }
    return 0;
}

function validateFirstByte(firstByte) {
    if (firstByte & RSV_MASK) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    if (!KNOWN_OPCODES.has(firstByte & OPCODE_MASK)) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
}

function parseHeader(head, maxMessageBytes) {
    const fin = (head[0] & FIN_BIT) !== 0;
    const opcode = head[0] & OPCODE_MASK;
    const payloadLength = readPayloadLength(head);
    validateFrameShape(opcode, fin, payloadLength, maxMessageBytes);
    return { fin, opcode, payloadLength, maskKey: head.subarray(head.length - MASK_KEY_LENGTH) };
}

function readPayloadLength(head) {
    const lengthCode = head[1] & LENGTH_MASK;
    if (lengthCode === LENGTH_CODE_16) {
        return head.readUInt16BE(2);
    }
    if (lengthCode === LENGTH_CODE_64) {
        return toSafeLength(head.readBigUInt64BE(2));
    }
    return lengthCode;
}

function toSafeLength(value) {
    if (value >= (1n << 63n)) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    return Number(value);
}

function validateFrameShape(opcode, fin, payloadLength, maxMessageBytes) {
    if (opcode & CONTROL_BIT) {
        if (!fin || payloadLength > MAX_CONTROL_PAYLOAD) {
            throw protocolFailure(CLOSE_CODE.protocolError);
        }
        return;
    }
    if (payloadLength > maxMessageBytes) {
        throw protocolFailure(CLOSE_CODE.messageTooBig);
    }
}

function unmask(payload, maskKey) {
    for (let index = 0; index < payload.length; index += 1) {
        payload[index] ^= maskKey[index % MASK_KEY_LENGTH];
    }
    return payload;
}

function handleFrame(state, frame) {
    if (frame.opcode & CONTROL_BIT) {
        handleControlFrame(state, frame);
    } else {
        handleDataFrame(state, frame);
    }
}

function handleControlFrame(state, frame) {
    if (frame.opcode === OPCODE.close) {
        handleCloseFrame(state, frame.payload);
    } else if (frame.opcode === OPCODE.ping) {
        writeFrame(state, OPCODE.pong, frame.payload);
    }
}

function handleCloseFrame(state, payload) {
    if (payload.length === 1) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    if (payload.length === 0) {
        closeConnection(state, CLOSE_CODE.noStatus, '');
        return;
    }
    const code = payload.readUInt16BE(0);
    if (!isValidCloseCode(code)) {
        closeConnection(state, CLOSE_CODE.protocolError, '');
        return;
    }
    closeConnection(state, code, decodeText(payload.subarray(CLOSE_CODE_PREFIX_LENGTH)));
}

function isValidCloseCode(code) {
    return (code >= 1000 && code <= 1003) || (code >= 1007 && code <= 1014) || (code >= 3000 && code <= 4999);
}

function handleDataFrame(state, frame) {
    if (frame.opcode === OPCODE.continuation) {
        appendFragment(state, frame);
        return;
    }
    if (state.fragments) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    if (frame.fin) {
        deliverMessage(state, frame.opcode, frame.payload);
        return;
    }
    state.fragments = { opcode: frame.opcode, chunks: [frame.payload], length: frame.payload.length };
}

function appendFragment(state, frame) {
    const { fragments } = state;
    if (!fragments) {
        throw protocolFailure(CLOSE_CODE.protocolError);
    }
    fragments.chunks.push(frame.payload);
    fragments.length += frame.payload.length;
    if (fragments.length > state.maxMessageBytes) {
        throw protocolFailure(CLOSE_CODE.messageTooBig);
    }
    if (!frame.fin) {
        return;
    }
    state.fragments = null;
    deliverMessage(state, fragments.opcode, Buffer.concat(fragments.chunks, fragments.length));
}

function deliverMessage(state, opcode, payload) {
    if (opcode === OPCODE.text) {
        emitMessage(state, decodeText(payload), false);
    } else {
        emitMessage(state, payload, true);
    }
}

function emitMessage(state, data, isBinary) {
    for (const handler of state.messageHandlers) {
        handler(data, isBinary);
    }
}

function decodeText(bytes) {
    try {
        return utf8Decoder.decode(bytes);
    } catch {
        throw protocolFailure(CLOSE_CODE.invalidData);
    }
}

function peekBytes(queue, length) {
    const parts = [];
    let remaining = length;
    for (const chunk of queue.chunks) {
        if (remaining === 0) {
            break;
        }
        const part = chunk.subarray(0, remaining);
        parts.push(part);
        remaining -= part.length;
    }
    return Buffer.concat(parts, length);
}

function takeBytes(queue, length) {
    const bytes = peekBytes(queue, length);
    discardBytes(queue, length);
    return bytes;
}

function discardBytes(queue, length) {
    let remaining = length;
    while (remaining > 0) {
        const chunk = queue.chunks.shift();
        if (chunk.length > remaining) {
            queue.chunks.unshift(chunk.subarray(remaining));
            remaining = 0;
        } else {
            remaining -= chunk.length;
        }
    }
    queue.length -= length;
}
