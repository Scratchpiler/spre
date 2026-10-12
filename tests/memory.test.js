import { assert, boot, changeVar, flag, forever, op, setVar, stageVar, test } from './helpers.js';

const counterWorld = {
    stage: { variables: { score: 0, lives: 3 }, lists: { items: ['a', 'b', 'c'] } },
    sprites: { Cat: { scripts: [[flag(), forever([changeVar('score', 1), changeVar('lives', -1)])]] } },
};

const idOf = (vm, name) => Object.values(vm.runtime.getTargetForStage().variables).find(v => v.name === name).id;

test('pokes, list edits and holds are logged inputs that replay', async () => {
    const live = await boot(counterWorld, { seed: 2 });
    const { vm, spre } = live;
    const score = idOf(vm, 'score');
    const lives = idOf(vm, 'lives');
    const items = idOf(vm, 'items');
    spre.greenFlag();
    spre.step(3);
    spre.input.send({ type: 'poke', target: 'stage', variable: score, value: 1000 });
    spre.input.send({ type: 'hold', target: 'stage', variable: lives, value: 99 });
    spre.input.send({ type: 'list', target: 'stage', variable: items, op: 'set', index: 2, value: 'B' });
    spre.input.send({ type: 'hold', target: 'stage', variable: items, index: 3, mode: 'random', low: 1, high: 6 });
    spre.step(5);
    assert.ok(Number(stageVar(vm, 'score')) >= 1004);
    assert.equal(stageVar(vm, 'lives'), 99);
    assert.equal(stageVar(vm, 'items')[1], 'B');
    assert.ok([1, 2, 3, 4, 5, 6].includes(stageVar(vm, 'items')[2]));
    spre.input.send({ type: 'release', target: 'stage', variable: lives });
    spre.step(2);
    assert.ok(Number(stageVar(vm, 'lives')) < 99);
    const replay = await boot(counterWorld, { seed: 2 });
    replay.spre.input.schedule(spre.movie().events);
    replay.spre.step(spre.frame);
    assert.equal(replay.spre.hash(), spre.hash());
});

test('holds are part of snapshots', async () => {
    const { vm, spre } = await boot(counterWorld);
    const lives = idOf(vm, 'lives');
    spre.greenFlag();
    spre.input.send({ type: 'hold', target: 'stage', variable: lives, mode: 'blank' });
    spre.step(2);
    const snapshot = JSON.parse(JSON.stringify(spre.snapshot()));
    spre.input.send({ type: 'release' });
    spre.step(2);
    assert.notEqual(stageVar(vm, 'lives'), '');
    spre.restore(snapshot);
    spre.step(2);
    assert.equal(stageVar(vm, 'lives'), '');
    assert.equal(spre.memory.holds().length, 1);
});
