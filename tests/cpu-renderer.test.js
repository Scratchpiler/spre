import { assert, boot, changeVar, flag, forever, menu, op, setVar, sprite, stageVar, test } from './helpers.js';

const touching = name => op('sensing_touchingobject', { TOUCHINGOBJECTMENU: menu('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', name) });
const touchingColor = color => op('sensing_touchingcolor', { COLOR: color });
const gotoXY = (x, y) => op('motion_gotoxy', { X: x, Y: y });

const probe = (variable, reporter) => [flag(), forever([setVar(variable, reporter)])];

test('touching a sprite is decided by pixels, not boxes', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { hit: '' } },
        sprites: {
            Cat: { costumes: [{ size: 50, fill: '#ff0000', shape: 'circle' }], scripts: [probe('hit', touching('Dog'))] },
            Dog: { costumes: [{ size: 50, fill: '#00ff00', shape: 'circle' }], x: 40, y: 40 },
        },
    });
    spre.greenFlag();
    spre.step(2);
    assert.equal(stageVar(vm, 'hit'), false, 'bounding boxes overlap but the circles do not');
    sprite(vm, 'Dog').setXY(30, 20);
    spre.step(2);
    assert.equal(stageVar(vm, 'hit'), true);
});

test('touching color sees other sprites, the backdrop and nothing else', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { red: '', green: '', white: '' }, costumes: [{ size: 100, fill: '#ff0000' }] },
        sprites: {
            Cat: {
                costumes: [{ size: 20, fill: '#0000ff' }],
                scripts: [[flag(), forever([
                    setVar('red', touchingColor('#ff0000')),
                    setVar('green', touchingColor('#00ff00')),
                    setVar('white', touchingColor('#ffffff')),
                ])]],
            },
        },
    });
    spre.greenFlag();
    spre.step(2);
    assert.deepEqual([stageVar(vm, 'red'), stageVar(vm, 'green'), stageVar(vm, 'white')], [true, false, false]);
    sprite(vm, 'Cat').setXY(150, 0);
    spre.step(2);
    assert.deepEqual([stageVar(vm, 'red'), stageVar(vm, 'white')], [false, true]);
});

test('pen lines and stamps land on the pen layer and are seen by touching color', async () => {
    const { vm, spre } = await boot({
        extensions: ['pen'],
        stage: { variables: { onLine: '', onStamp: '' } },
        sprites: {
            Painter: {
                costumes: [{ size: 10, fill: '#ff0000' }],
                scripts: [[
                    flag(),
                    gotoXY(-200, -100),
                    op('pen_setPenColorToColor', { COLOR: '#00ff00' }),
                    op('pen_setPenSizeTo', { SIZE: 6 }),
                    op('pen_penDown'),
                    gotoXY(200, -100),
                    op('pen_penUp'),
                    gotoXY(100, 100),
                    op('pen_stamp'),
                    op('looks_hide'),
                ]],
            },
            Probe: {
                costumes: [{ size: 4, fill: '#000000' }],
                x: 0,
                y: -100,
                scripts: [[flag(), forever([setVar('onLine', touchingColor('#00ff00')), setVar('onStamp', touchingColor('#ff0000'))])]],
            },
        },
    });
    spre.greenFlag();
    spre.step(3);
    assert.equal(stageVar(vm, 'onLine'), true);
    assert.equal(stageVar(vm, 'onStamp'), false);
    sprite(vm, 'Probe').setXY(100, 100);
    spre.step(2);
    assert.equal(stageVar(vm, 'onStamp'), true, 'the stamp stays after the painter hides');
});

test('a click without an explicit target is picked by pixels, ignoring fully ghosted sprites', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { cat: 0, dog: 0, stage: 0 } },
        sprites: {
            Cat: { costumes: [{ size: 60, fill: '#ff0000', shape: 'circle' }], scripts: [[op('event_whenthisspriteclicked'), changeVar('cat', 1)]] },
            Dog: {
                costumes: [{ size: 60, fill: '#00ff00' }],
                x: 100,
                scripts: [
                    [flag(), op('looks_seteffectto', { EFFECT: menu('looks_effectmenu', 'EFFECT', 'GHOST'), VALUE: 100 })],
                    [op('event_whenthisspriteclicked'), changeVar('dog', 1)],
                ],
            },
        },
        stage: { variables: { cat: 0, dog: 0, stage: 0 }, scripts: [[op('event_whenstageclicked'), changeVar('stage', 1)]] },
    });
    spre.greenFlag();
    spre.step(1);
    const click = (x, y) => {
        spre.input.mouse({ x, y, down: true });
        spre.step(1);
        spre.input.mouse({ down: false });
        spre.step(1);
    };
    click(0, 0);
    click(28, 28);
    click(100, 0);
    assert.deepEqual([stageVar(vm, 'cat'), stageVar(vm, 'dog'), stageVar(vm, 'stage')], [1, 0, 2]);
});

test('bounds come from the opaque pixels, so a transparent margin does not touch the edge', async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect x="25" y="25" width="10" height="10" fill="#000"/></svg>';
    const { vm, spre } = await boot({
        stage: { variables: { edge: '' } },
        sprites: { Cat: { x: 225, costumes: [{ size: 60, fill: '#000' }], scripts: [probe('edge', touching('_edge_'))] } },
    });
    vm.runtime.renderer.updateSVGSkin(sprite(vm, 'Cat').getCostumes()[0].skinId, svg, [30, 30]);
    spre.greenFlag();
    spre.step(2);
    assert.equal(stageVar(vm, 'edge'), false);
    sprite(vm, 'Cat').setXY(237, 0);
    spre.step(2);
    assert.equal(stageVar(vm, 'edge'), true);
});

test('pen layer, stamps and scaled silhouettes survive a snapshot into a fresh VM', async () => {
    const spec = {
        extensions: ['pen'],
        stage: { variables: { seen: 0 } },
        sprites: {
            Painter: {
                costumes: [{ size: 12, fill: '#ff00ff', shape: 'circle' }],
                scripts: [[flag(), op('looks_setsizeto', { SIZE: 330 }), op('pen_penDown'), forever([
                    op('motion_movesteps', { STEPS: 7 }),
                    op('motion_turnright', { DEGREES: op('operator_random', { FROM: 5, TO: 40 }) }),
                    op('motion_ifonedgebounce'),
                    op('pen_stamp'),
                ])]],
            },
            Probe: { costumes: [{ size: 30, fill: '#000000' }], scripts: [[flag(), forever([op('control_if', { CONDITION: touchingColor('#ff00ff'), SUBSTACK: [changeVar('seen', 1)] })])]] },
        },
    };
    const live = await boot(spec, { seed: 'pen' });
    live.spre.greenFlag();
    live.spre.step(40);
    const snapshot = JSON.parse(JSON.stringify(live.spre.snapshot()));
    live.spre.step(40);
    const fresh = await boot(spec, { seed: 'other' });
    fresh.spre.restore(snapshot);
    fresh.spre.step(40);
    assert.equal(fresh.spre.hash(), live.spre.hash());
    assert.ok(Number(stageVar(live.vm, 'seen')) > 0);
});
