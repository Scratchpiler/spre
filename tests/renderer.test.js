import { costumeGeometry, jpegSize, pngSize, svgViewBox } from '../src/geometry.js';
import { assert, boot, flag, forever, op, sprite, test } from './helpers.js';

test('a visible sprite moving in a loop yields once per frame, like in the browser', async () => {
    const { vm, spre } = await boot({ sprites: { Cat: { scripts: [[flag(), forever([op('motion_changexby', { DX: 1 })])]] } } });
    spre.greenFlag();
    spre.step(10);
    assert.equal(sprite(vm, 'Cat').x, 10);
});

test('hidden sprites do not request redraws, so their loops run until the work budget', async () => {
    const { vm, spre } = await boot({
        sprites: { Cat: { visible: false, scripts: [[flag(), forever([op('motion_changexby', { DX: 0.001 })])]] } },
    });
    spre.greenFlag();
    spre.step(1);
    assert.ok(sprite(vm, 'Cat').x > 1);
});

test('sprites are fenced with scratch-render\'s AABB rule', async () => {
    const { vm, spre } = await boot({ sprites: { Cat: { costumeSize: 50, scripts: [[flag(), op('motion_gotoxy', { X: 1000, Y: -1000 })]] } } });
    spre.greenFlag();
    spre.step(1);
    const cat = sprite(vm, 'Cat');
    assert.deepEqual([cat.x, cat.y], [250, -190]);
});

test('size is clamped relative to the costume, and edge bounce sees the bounds', async () => {
    const { vm, spre } = await boot({
        sprites: {
            Cat: {
                costumeSize: 50,
                scripts: [[flag(), op('looks_setsizeto', { SIZE: 5000 })]],
            },
            Dog: {
                costumeSize: 50,
                x: 230,
                scripts: [[flag(), op('motion_ifonedgebounce')]],
            },
        },
    });
    spre.greenFlag();
    spre.step(1);
    assert.equal(sprite(vm, 'Cat').size, 1080);
    const dog = sprite(vm, 'Dog');
    assert.equal(dog.direction, -90);
    assert.equal(dog.x, 215);
});

test('costume geometry comes from asset headers', () => {
    const png = new Uint8Array(24);
    png.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    png.set([0, 0, 0, 200, 0, 0, 0, 100], 16);
    assert.deepEqual(pngSize(png), [200, 100]);
    const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 4, 0, 0, 0xff, 0xc0, 0, 11, 8, 0, 60, 0, 80, 3, 0, 0, 0]);
    assert.deepEqual(jpegSize(jpeg), [80, 60]);
    assert.deepEqual(svgViewBox('<svg width="10" height="20" viewBox="-5 -5 30 40">'), { x: -5, y: -5, width: 30, height: 40 });
    assert.deepEqual(svgViewBox("<svg width='12px' height='8'>"), { x: 0, y: 0, width: 12, height: 8 });
    assert.deepEqual(
        costumeGeometry({ dataFormat: 'png', bitmapResolution: 2, rotationCenterX: 100, rotationCenterY: 50 }, png),
        { size: [100, 50], rotationCenter: [50, 25] },
    );
    assert.deepEqual(
        costumeGeometry({ dataFormat: 'svg', rotationCenterX: 10, rotationCenterY: 10 }, '<svg viewBox="-5 -5 30 40">'),
        { size: [30, 40], rotationCenter: [15, 15] },
    );
});
