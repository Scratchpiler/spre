import { createServer } from 'node:http';
import { createDisplayRenderer } from '../src/render/display-renderer.js';
import { createCompositorPool } from '../src/render/pool.js';
import { nodeRasterizer } from '../src/node.js';
import { createBackend } from '../src/remote/backend.js';
import { connectClient } from '../src/remote/client.js';
import { decodeMessage, encodeMessage } from '../src/remote/codec.js';
import { createLoopback, fromServerConnection, fromWebSocket } from '../src/remote/transport.js';
import { attachWebSocketServer } from '../src/protocol/ws-node.js';
import { assert, boot, changeVar, flag, forever, op, stageVar, test } from './helpers.js';

const world = {
    stage: { variables: { score: 0, lives: 3 }, lists: { log: [] } },
    sprites: {
        Cat: {
            costumes: [{ size: 40, fill: '#ff8800', shape: 'circle' }],
            scripts: [[flag(), forever([changeVar('score', 1), op('motion_movesteps', { STEPS: 4 }), op('motion_ifonedgebounce')])]],
        },
    },
};

const idOf = (vm, name) => Object.values(vm.runtime.getTargetForStage().variables).find(v => v.name === name).id;

test('the codec round-trips typed arrays, odd numbers and nesting', () => {
    const message = { a: new Uint8ClampedArray([1, 2, 3]), b: [new Float32Array([1.5, -2]), { c: NaN, d: -Infinity }], e: 'text' };
    const decoded = decodeMessage(encodeMessage(message));
    assert.deepEqual([...decoded.a], [1, 2, 3]);
    assert.ok(decoded.a instanceof Uint8ClampedArray);
    assert.deepEqual([...decoded.b[0]], [1.5, -2]);
    assert.ok(Number.isNaN(decoded.b[1].c));
    assert.equal(decoded.b[1].d, -Infinity);
    assert.equal(decoded.e, 'text');
});

test('a display client drives the backend and renders the scene it is sent', async () => {
    const { vm, spre } = await boot(world, { seed: 4 });
    const backend = createBackend({ spre, vm });
    const [backendPort, displayPort] = createLoopback();
    backend.connect(backendPort);
    const client = connectClient(displayPort, { scene: true });
    const display = createDisplayRenderer({ pool: createCompositorPool({ rasterizer: await nodeRasterizer() }) });
    const frames = [];
    client.on('frame', message => {
        display.apply(message.scene);
        frames.push(message.status.frame);
    });
    await client.ready;
    await client.call('project.flag');
    await client.call('time.step', 10);
    await new Promise(resolve => setTimeout(resolve, 20));
    assert.equal(Number(stageVar(vm, 'score')), 10);
    assert.ok(frames.includes(10));
    display.render();
    await display.settle();
    const image = await display.render();
    const center = (((180 * 480) + 240 + 40) * 4);
    assert.deepEqual([...image.data.slice(center, center + 3)], [255, 136, 0], 'the cat is drawn where it walked');
    const listed = await client.call('vars.list', { kind: 'var' });
    assert.deepEqual(listed.rows.map(row => row.name).sort(), ['lives', 'score']);
    await client.call('holds.set', { target: 'stage', variable: idOf(vm, 'lives'), value: 42 });
    await client.call('time.step', 1);
    assert.equal(stageVar(vm, 'lives'), 42);
    client.close();
});

test('time travel: seek rewinds to any recorded frame and replays inputs exactly', async () => {
    const { vm, spre } = await boot(world, { seed: 5 });
    const backend = createBackend({ spre, vm, timeline: { every: 7 } });
    backend.call('timeline.start');
    backend.call('project.flag');
    const hashes = [];
    for (let i = 0; i < 60; i++) {
        if (i === 20) backend.call('vars.set', 'stage', idOf(vm, 'score'), 500);
        backend.call('time.step', 1);
        hashes[spre.frame] = spre.hash();
    }
    for (const frame of [45, 3, 21, 22, 60, 1]) {
        backend.call('timeline.seek', frame);
        assert.equal(spre.frame, frame);
        assert.equal(spre.hash(), hashes[frame], `frame ${frame}`);
    }
    backend.call('timeline.seek', 10);
    backend.call('timeline.cut');
    backend.call('time.step', 30);
    assert.ok(Number(stageVar(vm, 'score')) < 500, 'after a cut the poke at frame 20 is gone');
});

test('scan narrows variables by value and by change', async () => {
    const { vm, spre } = await boot(world, { seed: 6 });
    const backend = createBackend({ spre, vm });
    backend.call('project.flag');
    backend.call('time.step', 5);
    assert.equal(backend.call('scan.start', 5).count, 1);
    backend.call('scan.start');
    backend.call('time.step', 1);
    assert.equal(backend.call('scan.narrow', 'increased').count, 1);
    assert.equal(backend.call('scan.results').rows[0].name, 'score');
});

test('the same session works across a real WebSocket', async () => {
    const { vm, spre } = await boot(world, { seed: 7 });
    const backend = createBackend({ spre, vm });
    const server = createServer();
    const ws = attachWebSocketServer(server, { path: '/spre', onConnection: connection => backend.connect(fromServerConnection(connection)) });
    await new Promise(resolve => server.listen(0, resolve));
    const socket = new WebSocket(`ws://127.0.0.1:${server.address().port}/spre`);
    await new Promise(resolve => socket.addEventListener('open', resolve));
    const client = connectClient(fromWebSocket(socket), { scene: true });
    let sawPixels = false;
    client.on('frame', message => {
        if (message.scene.skins.some(skin => skin.kind === 'svg')) sawPixels = true;
    });
    await client.ready;
    await client.call('project.flag');
    await client.call('time.step', 3);
    await new Promise(resolve => setTimeout(resolve, 50));
    assert.ok(sawPixels, 'skin sources arrive over the socket');
    assert.equal(await client.call('spre.hash'), spre.hash());
    client.close();
    ws.close();
    await new Promise(resolve => server.close(resolve));
});
