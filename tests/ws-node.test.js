import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import net from 'node:net';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
import { attachWebSocketServer } from '../src/protocol/ws-node.js';

const CLIENT_KEY = 'dGhlIHNhbXBsZSBub25jZQ==';
const RFC_ACCEPT = 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=';
const MASK_KEY = Buffer.from([0x37, 0xfa, 0x21, 0x3d]);
const OPCODE = { continuation: 0x0, text: 0x1, binary: 0x2, close: 0x8, ping: 0x9, pong: 0xa };

function echoConnection(connection) {
    connection.onMessage(data => connection.send(data));
}

function patternBytes(size) {
    return Buffer.from({ length: size }, (_, index) => index % 251);
}

async function startServer(t, options = {}) {
    const server = http.createServer((request, response) => response.end('plain'));
    const sockets = new Set();
    server.on('connection', socket => {
        sockets.add(socket);
        socket.on('close', () => sockets.delete(socket));
    });
    const wsServer = attachWebSocketServer(server, { path: '/ws', onConnection: echoConnection, ...options });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();
    t.after(async () => {
        wsServer.close();
        for (const socket of sockets) {
            socket.destroy();
        }
        await new Promise(resolve => server.close(resolve));
    });
    return { wsServer, port, url: `ws://127.0.0.1:${port}/ws` };
}

function openClient(t, url, binaryType = 'blob') {
    const client = new WebSocket(url);
    client.binaryType = binaryType;
    t.after(() => client.close());
    return client;
}

function collectMessages(client, count) {
    return new Promise(resolve => {
        const messages = [];
        const listener = event => {
            messages.push(event.data);
            if (messages.length === count) {
                client.removeEventListener('message', listener);
                resolve(messages);
            }
        };
        client.addEventListener('message', listener);
    });
}

function wakeRaw(client) {
    const wake = client.wake;
    client.wake = null;
    if (wake) {
        wake();
    }
}

async function connectRaw(t, port) {
    const socket = net.createConnection({ host: '127.0.0.1', port });
    t.after(() => socket.destroy());
    const client = { socket, buffered: Buffer.alloc(0), ended: false, wake: null };
    socket.on('data', chunk => {
        client.buffered = Buffer.concat([client.buffered, chunk]);
        wakeRaw(client);
    });
    socket.on('close', () => {
        client.ended = true;
        wakeRaw(client);
    });
    socket.on('error', () => socket.destroy());
    await once(socket, 'connect');
    socket.setNoDelay(true);
    return client;
}

async function readRaw(client, parse) {
    for (;;) {
        const parsed = parse(client.buffered);
        if (parsed) {
            client.buffered = client.buffered.subarray(parsed.size);
            return parsed.value;
        }
        if (client.ended) {
            throw new Error('socket closed before a complete message arrived');
        }
        await new Promise(resolve => {
            client.wake = resolve;
        });
    }
}

function parseHttpHead(bytes) {
    const end = bytes.indexOf('\r\n\r\n');
    if (end === -1) {
        return null;
    }
    return { size: end + 4, value: bytes.subarray(0, end).toString('latin1') };
}

function parseServerFrame(bytes) {
    if (bytes.length < 2) {
        return null;
    }
    let length = bytes[1] & 0x7f;
    let offset = 2;
    if (length === 126) {
        if (bytes.length < 4) {
            return null;
        }
        length = bytes.readUInt16BE(2);
        offset = 4;
    } else if (length === 127) {
        if (bytes.length < 10) {
            return null;
        }
        length = Number(bytes.readBigUInt64BE(2));
        offset = 10;
    }
    if (bytes.length < offset + length) {
        return null;
    }
    const value = {
        fin: (bytes[0] & 0x80) !== 0,
        opcode: bytes[0] & 0x0f,
        masked: (bytes[1] & 0x80) !== 0,
        payload: bytes.subarray(offset, offset + length),
    };
    return { size: offset + length, value };
}

async function rawHandshake(client, path = '/ws') {
    client.socket.write([
        `GET ${path} HTTP/1.1`,
        'Host: 127.0.0.1',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Key: ${CLIENT_KEY}`,
        'Sec-WebSocket-Version: 13',
        '',
        '',
    ].join('\r\n'));
    return readRaw(client, parseHttpHead);
}

function readFrame(client) {
    return readRaw(client, parseServerFrame);
}

async function waitForRawClose(client) {
    if (!client.ended) {
        await once(client.socket, 'close');
    }
}

function lengthPrefix(length) {
    if (length < 126) {
        return Buffer.from([length]);
    }
    if (length <= 0xffff) {
        const prefix = Buffer.alloc(3);
        prefix[0] = 126;
        prefix.writeUInt16BE(length, 1);
        return prefix;
    }
    const prefix = Buffer.alloc(9);
    prefix[0] = 127;
    prefix.writeBigUInt64BE(BigInt(length), 1);
    return prefix;
}

function clientFrame(payload, { opcode = OPCODE.text, fin = true, masked = true, rsv = 0 } = {}) {
    const body = Buffer.from(payload);
    const prefix = lengthPrefix(body.length);
    prefix[0] |= masked ? 0x80 : 0;
    const firstByte = Buffer.from([(fin ? 0x80 : 0) | (rsv << 4) | opcode]);
    if (!masked) {
        return Buffer.concat([firstByte, prefix, body]);
    }
    const maskedBody = Buffer.alloc(body.length);
    for (let index = 0; index < body.length; index += 1) {
        maskedBody[index] = body[index] ^ MASK_KEY[index % 4];
    }
    return Buffer.concat([firstByte, prefix, MASK_KEY, maskedBody]);
}

test('completes the handshake and echoes text through the global client', async t => {
    const { url } = await startServer(t);
    const client = openClient(t, url);
    await once(client, 'open');
    const reply = once(client, 'message');
    client.send('hello ws');
    const [event] = await reply;
    assert.equal(event.data, 'hello ws');
});

test('answers the handshake with the RFC 6455 accept key', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    const head = await rawHandshake(client);
    assert.equal(head.split('\r\n')[0], 'HTTP/1.1 101 Switching Protocols');
    assert.ok(head.includes(`Sec-WebSocket-Accept: ${RFC_ACCEPT}`));
});

test('round-trips binary messages of 200 and 70000 bytes', async t => {
    const { url } = await startServer(t);
    const client = openClient(t, url, 'arraybuffer');
    await once(client, 'open');
    for (const size of [200, 70000]) {
        const payload = patternBytes(size);
        const reply = once(client, 'message');
        client.send(payload);
        const [event] = await reply;
        assert.ok(Buffer.from(event.data).equals(payload), `binary echo of ${size} bytes`);
    }
});

test('delivers server messages of 10, 300 and 70000 bytes', async t => {
    const { url } = await startServer(t, {
        onConnection: connection => connection.onMessage(() => {
            connection.send('a'.repeat(10));
            connection.send('b'.repeat(300));
            connection.send('c'.repeat(70000));
        }),
    });
    const client = openClient(t, url);
    await once(client, 'open');
    const received = collectMessages(client, 3);
    client.send('go');
    const [small, medium, large] = await received;
    assert.equal(small, 'a'.repeat(10));
    assert.equal(medium, 'b'.repeat(300));
    assert.equal(large, 'c'.repeat(70000));
});

test('reassembles a fragmented message sent as separate frames', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    await rawHandshake(client);
    client.socket.write(clientFrame('Hel', { opcode: OPCODE.text, fin: false }));
    client.socket.write(clientFrame('lo', { opcode: OPCODE.continuation, fin: true }));
    const reply = await readFrame(client);
    assert.equal(reply.opcode, OPCODE.text);
    assert.equal(reply.payload.toString(), 'Hello');
});

test('parses a frame written one byte at a time and two frames in one write', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    await rawHandshake(client);
    for (const byte of clientFrame('slowly')) {
        client.socket.write(Buffer.from([byte]));
        await delay(1);
    }
    assert.equal((await readFrame(client)).payload.toString(), 'slowly');
    client.socket.write(Buffer.concat([clientFrame('first'), clientFrame('second')]));
    assert.equal((await readFrame(client)).payload.toString(), 'first');
    assert.equal((await readFrame(client)).payload.toString(), 'second');
});

test('answers a ping with a pong carrying the same payload', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    await rawHandshake(client);
    client.socket.write(clientFrame('ping-data', { opcode: OPCODE.ping }));
    const pong = await readFrame(client);
    assert.equal(pong.opcode, OPCODE.pong);
    assert.equal(pong.payload.toString(), 'ping-data');
});

test('closes with 1002 when a client frame is not masked', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    await rawHandshake(client);
    client.socket.write(clientFrame('plain', { masked: false }));
    const close = await readFrame(client);
    assert.equal(close.opcode, OPCODE.close);
    assert.equal(close.payload.readUInt16BE(0), 1002);
});

test('closes with 1007 when text is not valid UTF-8', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    await rawHandshake(client);
    client.socket.write(clientFrame(Buffer.from([0xff, 0xfe, 0xfd])));
    const close = await readFrame(client);
    assert.equal(close.opcode, OPCODE.close);
    assert.equal(close.payload.readUInt16BE(0), 1007);
});

test('closes with 1002 on reserved bits, unknown opcodes and malformed control frames', async t => {
    const { port } = await startServer(t);
    const cases = [
        clientFrame('x', { rsv: 0b100 }),
        clientFrame('x', { opcode: 0x3 }),
        clientFrame('x', { opcode: OPCODE.ping, fin: false }),
        clientFrame(Buffer.alloc(126), { opcode: OPCODE.ping }),
    ];
    for (const frame of cases) {
        const client = await connectRaw(t, port);
        await rawHandshake(client);
        client.socket.write(frame);
        const close = await readFrame(client);
        assert.equal(close.opcode, OPCODE.close);
        assert.equal(close.payload.readUInt16BE(0), 1002);
    }
});

test('rejects a request for another path with 400', async t => {
    const { port } = await startServer(t);
    const client = await connectRaw(t, port);
    const head = await rawHandshake(client, '/elsewhere');
    assert.match(head, /^HTTP\/1\.1 400 Bad Request/);
    await waitForRawClose(client);
});

test('closes with 1009 when a message exceeds maxMessageBytes', async t => {
    const { url } = await startServer(t, { maxMessageBytes: 1024 });
    const client = openClient(t, url);
    await once(client, 'open');
    client.send('x'.repeat(2000));
    const [event] = await once(client, 'close');
    assert.equal(event.code, 1009);
});

test('close() from the server delivers code 1001 to the client', async t => {
    const { url, wsServer } = await startServer(t);
    const client = openClient(t, url);
    await once(client, 'open');
    const closed = once(client, 'close');
    wsServer.close();
    const [event] = await closed;
    assert.equal(event.code, 1001);
});

test('send() throws once the connection is closed', async t => {
    let serverConnection;
    const { url } = await startServer(t, {
        onConnection: connection => {
            serverConnection = connection;
        },
    });
    const client = openClient(t, url);
    await once(client, 'open');
    serverConnection.close();
    assert.equal(serverConnection.open, false);
    assert.throws(() => serverConnection.send('late'), /closed/);
    await once(client, 'close');
});

test('onClose fires exactly once when the client closes', async t => {
    const calls = [];
    let notifyClosed;
    const serverClosed = new Promise(resolve => {
        notifyClosed = resolve;
    });
    const { url } = await startServer(t, {
        onConnection: connection => {
            connection.onClose((code, reason) => {
                calls.push([code, reason]);
                notifyClosed();
            });
        },
    });
    const client = openClient(t, url);
    await once(client, 'open');
    const closed = once(client, 'close');
    client.close(1000, 'bye');
    await closed;
    await serverClosed;
    await delay(20);
    assert.deepEqual(calls, [[1000, 'bye']]);
});
