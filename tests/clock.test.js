import { assert, boot, changeVar, flag, forever, op, setVar, stageVar, sprite, test, wait } from './helpers.js';

test('wait 1 second takes 30 frames at 30 fps and 60 at 60 fps', async () => {
    for (const fps of [30, 60]) {
        const { vm, spre } = await boot({
            stage: { variables: { done: 0 } },
            sprites: { Cat: { scripts: [[flag(), wait(1), setVar('done', 1)]] } },
        }, { fps });
        spre.greenFlag();
        const { frame } = spre.run({ frames: 500, until: () => stageVar(vm, 'done') === '1' });
        assert.equal(frame, fps + 1, `fps ${fps}`);
    }
});

test('the project timer advances by exactly one frame per frame', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { t: 0 } },
        sprites: { Cat: { scripts: [[flag(), forever([setVar('t', op('sensing_timer'))])]] } },
    });
    spre.greenFlag();
    spre.step(31);
    assert.equal(stageVar(vm, 't'), 1);
});

test('sensing_current and days since 2000 read the virtual wall clock with a fixed UTC offset', async () => {
    const parts = ['year', 'month', 'date', 'dayofweek', 'hour', 'minute', 'second'];
    const spec = {
        stage: { variables: Object.fromEntries([...parts, 'days'].map(p => [p, 0])) },
        sprites: {
            Cat: {
                scripts: [[
                    flag(),
                    ...parts.map(p => setVar(p, op('sensing_current', {}, { CURRENTMENU: p.toUpperCase() }))),
                    setVar('days', op('sensing_dayssince2000')),
                ]],
            },
        },
    };
    const { vm, spre } = await boot(spec, { epoch: '2024-02-29T23:59:58Z', utcOffsetMinutes: 60 });
    spre.greenFlag();
    spre.step(1);
    const read = Object.fromEntries([...parts, 'days'].map(p => [p, stageVar(vm, p)]));
    assert.deepEqual({ ...read, days: undefined }, {
        year: 2024, month: 3, date: 1, dayofweek: 6, hour: 0, minute: 59, second: 58, days: undefined,
    });
    assert.ok(Math.abs(read.days - (Date.parse('2024-02-29T23:59:58Z') - Date.UTC(2000, 0, 1)) / 86400000) < 1e-6);
});

test('glides follow the virtual clock', async () => {
    const { vm, spre } = await boot({
        sprites: { Cat: { scripts: [[flag(), op('motion_glidesecstoxy', { SECS: 1, X: 90, Y: 0 })]] } },
    });
    spre.greenFlag();
    spre.step(16);
    const cat = sprite(vm, 'Cat');
    assert.ok(cat.x > 40 && cat.x < 50, `x=${cat.x}`);
    spre.step(20);
    assert.equal(cat.x, 90);
});

test('the work budget is counted in operations, so tight loops do the same work every run', async () => {
    const counts = [];
    for (let run = 0; run < 2; run++) {
        const { vm, spre } = await boot({
            stage: { variables: { n: 0 } },
            sprites: { Cat: { scripts: [[flag(), forever([changeVar('n', 1)])]] } },
        });
        spre.greenFlag();
        spre.step(2);
        counts.push(stageVar(vm, 'n'));
    }
    assert.equal(counts[0], counts[1]);
    assert.ok(counts[0] > 1000, `a non-drawing loop should run many iterations per frame, got ${counts[0]}`);
});

test('opCostMs scales how much a non-drawing loop does per frame', async () => {
    const run = async opCostMs => {
        const { vm, spre } = await boot({
            stage: { variables: { n: 0 } },
            sprites: { Cat: { scripts: [[flag(), forever([changeVar('n', 1)])]] } },
        }, { opCostMs });
        spre.greenFlag();
        spre.step(2);
        return stageVar(vm, 'n');
    };
    const cheap = await run(0.001);
    const dear = await run(0.01);
    assert.ok(cheap > dear * 8 && cheap < dear * 12, `${cheap} vs ${dear}`);
});

test('real globals are untouched outside frames, even when a frame throws', async () => {
    const { vm, spre } = await boot({ sprites: { Cat: { scripts: [[flag(), forever([op('motion_movesteps', { STEPS: 1 })])]] } } });
    const realRandom = Math.random;
    const RealDate = Date;
    spre.greenFlag();
    spre.step(3);
    assert.equal(Math.random, realRandom);
    assert.equal(Date, RealDate);
    vm.runtime._primitives.motion_movesteps = () => { throw new Error('boom'); };
    for (const target of vm.runtime.targets) target.blocks.resetCache();
    assert.throws(() => spre.step(1), /boom/);
    assert.equal(Math.random, realRandom);
    assert.equal(Date, RealDate);
});
