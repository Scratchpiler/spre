import { nodeRasterizer } from '../src/node.js';
import { createDisplayRenderer } from '../src/render/display-renderer.js';
import { createNodeCompositorPool } from '../src/render/node-pool.js';
import { createCompositorPool } from '../src/render/pool.js';
import { createSceneChannel, describeScene } from '../src/render/scene.js';
import { assert, boot, flag, forever, menu, op, test } from './helpers.js';

const busyStage = {
    extensions: ['pen'],
    stage: { costumes: [{ size: 480, fill: '#88ccff' }] },
    sprites: {
        Cat: {
            costumes: [{ size: 80, fill: '#ff6600', shape: 'circle' }],
            x: -100,
            scripts: [[flag(),
                op('looks_seteffectto', { EFFECT: menu('looks_effectmenu', 'EFFECT', 'GHOST'), VALUE: 40 }),
                op('pen_setPenSizeTo', { SIZE: 8 }), op('pen_penDown'),
                forever([op('motion_movesteps', { STEPS: 9 }), op('motion_turnright', { DEGREES: 13 }), op('looks_changeeffectby', { EFFECT: menu('looks_effectmenu', 'EFFECT', 'COLOR'), CHANGE: 7 })])]],
        },
        Dog: {
            costumes: [{ size: 120, fill: '#33aa33' }],
            x: 120,
            y: 60,
            scripts: [[flag(), op('looks_setsizeto', { SIZE: 70 }), forever([op('motion_turnright', { DEGREES: 3 }), op('looks_changeeffectby', { EFFECT: menu('looks_effectmenu', 'EFFECT', 'WHIRL'), CHANGE: 4 })])]],
        },
    },
};

const fingerprint = data => {
    let h = 2166136261;
    for (let i = 0; i < data.length; i++) h = Math.imul(h ^ data[i], 16777619);
    return (h >>> 0).toString(16);
};

test('compositing gives identical pixels on any number of threads, frame after frame', async () => {
    const { vm, spre } = await boot(busyStage, { seed: 3 });
    spre.greenFlag();
    const pools = [
        createCompositorPool({ rasterizer: await nodeRasterizer() }),
        await createNodeCompositorPool({ threads: 1 }),
        await createNodeCompositorPool({ threads: 3 }),
    ];
    const channels = pools.map(() => createSceneChannel());
    const displays = pools.map(pool => createDisplayRenderer({ pool }));
    try {
        for (let frame = 0; frame < 12; frame++) {
            spre.step(1);
            const prints = [];
            for (const [i, display] of displays.entries()) {
                display.apply(channels[i].update(describeScene(vm.runtime.renderer)));
                display.render({ width: 640 });
                await display.settle();
                prints.push(fingerprint((await display.render({ width: 640 })).data));
            }
            assert.equal(new Set(prints).size, 1, `frame ${frame}: ${prints}`);
        }
        const update = channels[0].update(describeScene(vm.runtime.renderer));
        assert.ok(update.skins.every(entry => entry.patch), 'after the first frame only pen patches travel');
    } finally {
        pools.forEach(pool => pool.terminate());
    }
});

test('the composite shows the backdrop, the sprites and the pen trail', async () => {
    const { vm, spre } = await boot(busyStage, { seed: 3 });
    spre.greenFlag();
    spre.step(20);
    const display = createDisplayRenderer({ pool: createCompositorPool({ rasterizer: await nodeRasterizer() }) });
    display.apply(createSceneChannel().update(describeScene(vm.runtime.renderer)));
    display.render();
    await display.settle();
    const frame = await display.render();
    const at = (x, y) => [...frame.data.slice((((180 - y) * 480) + x + 240) * 4, (((180 - y) * 480) + x + 240) * 4 + 3)];
    assert.deepEqual(at(-235, -175), [136, 204, 255], 'backdrop colour in a corner');
    const counts = new Map();
    for (let i = 0; i < frame.data.length; i += 4) {
        const key = `${frame.data[i]},${frame.data[i + 1]},${frame.data[i + 2]}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    assert.ok(counts.size > 50, `expected effects, blending and a pen trail, saw ${counts.size} colours`);
});

const pixelsDirty = frame => frame.dirty.reduce((sum, rect) => sum + (rect.width * rect.height), 0);

test('repainting only the changed tiles gives the same pixels as drawing the frame from scratch', async () => {
    const { vm, spre } = await boot(busyStage, { seed: 3 });
    spre.greenFlag();
    const pool = await createNodeCompositorPool({ threads: 3 });
    const reference = createCompositorPool({ rasterizer: await nodeRasterizer() });
    const channel = createSceneChannel();
    const incremental = createDisplayRenderer({ pool });
    try {
        let partial = 0;
        for (let frame = 0; frame < 16; frame++) {
            spre.step(1);
            const described = describeScene(vm.runtime.renderer);
            incremental.apply(channel.update(described));
            const fresh = createDisplayRenderer({ pool: reference });
            fresh.apply(createSceneChannel().update(described));
            for (const display of [incremental, fresh]) {
                display.render({ width: 640 });
                await display.settle();
            }
            const [shown, expected] = [await incremental.render({ width: 640 }), await fresh.render({ width: 640 })];
            assert.equal(fingerprint(shown.data), fingerprint(expected.data), `frame ${frame}`);
            if (frame > 4 && pixelsDirty(shown) < shown.width * shown.height) partial++;
        }
        assert.ok(partial > 0, 'some frames repainted less than the whole stage');
        const idle = await incremental.render({ width: 640 });
        assert.deepEqual(idle.dirty, [], 'an unchanged scene repaints nothing');
    } finally {
        pool.terminate();
    }
});
