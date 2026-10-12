import { createRng } from '../src/rng.js';
import { addToList, assert, boot, flag, menu, op, repeat, sprite, stageVar, test } from './helpers.js';

const rollTen = {
    stage: { lists: { rolls: [] } },
    sprites: { Cat: { scripts: [[flag(), repeat(10, [addToList('rolls', op('operator_random', { FROM: 1, TO: 100 }))])]] } },
};

const rolls = async (options, prepare) => {
    const { vm, spre } = await boot(rollTen, options);
    prepare?.(spre);
    spre.greenFlag();
    spre.step(2);
    return stageVar(vm, 'rolls');
};

test('pick random is a pure function of the seed', async () => {
    const a = await rolls({ seed: 'alpha' });
    const b = await rolls({ seed: 'alpha' });
    const c = await rolls({ seed: 'beta' });
    assert.equal(a.length, 10);
    assert.deepEqual(a, b);
    assert.notDeepEqual(a, c);
    assert.ok(a.every(n => Number.isInteger(n) && n >= 1 && n <= 100));
});

test('forced picks and pick overrides spoof pick random results', async () => {
    const forced = await rolls({ seed: 1 }, spre => spre.rng.force(7, 7, 'seven'));
    assert.deepEqual(forced.slice(0, 3), [7, 7, 'seven']);
    const unforced = await rolls({ seed: 1 });
    assert.deepEqual(forced.slice(3), unforced.slice(0, 7), 'forcing does not consume draws');
    const overridden = await rolls({ seed: 1 }, spre => spre.rng.onPick(({ from, to }) => (Number(from) === 1 && Number(to) === 100 ? 42 : undefined)));
    assert.ok(overridden.every(n => n === 42));
});

test('streams are independent per block category', async () => {
    const spec = {
        stage: { lists: { rolls: [] } },
        sprites: {
            Cat: {
                scripts: [[
                    flag(),
                    op('motion_goto', { TO: menu('motion_goto_menu', 'TO', '_random_') }),
                    repeat(3, [addToList('rolls', op('operator_random', { FROM: 1, TO: 1000000 }))]),
                ]],
            },
        },
    };
    const run = async queueMotion => {
        const { vm, spre } = await boot(spec, { seed: 9 });
        if (queueMotion) spre.rng.queue('motion', 0.75, 0.25);
        spre.greenFlag();
        spre.step(2);
        return { rolls: stageVar(vm, 'rolls'), x: sprite(vm, 'Cat').x, y: sprite(vm, 'Cat').y };
    };
    const plain = await run(false);
    const queued = await run(true);
    assert.deepEqual(queued.rolls, plain.rolls, 'motion draws do not shift the operator stream');
    assert.deepEqual([queued.x, queued.y], [120, -90]);
});

test('clone ids are deterministic', async () => {
    const spec = {
        sprites: { Cat: { scripts: [[flag(), repeat(3, [op('control_create_clone_of', { CLONE_OPTION: menu('control_create_clone_of_menu', 'CLONE_OPTION', '_myself_') })])]] } },
    };
    const ids = async () => {
        const { vm, spre } = await boot(spec, { seed: 3 });
        spre.greenFlag();
        spre.step(5);
        return vm.runtime.targets.filter(t => !t.isOriginal).map(t => t.id);
    };
    const first = await ids();
    assert.equal(first.length, 3);
    assert.deepEqual(await ids(), first);
});

test('the generator rejects queued draws outside [0, 1) and round-trips its state', () => {
    const rng = createRng('x');
    assert.throws(() => rng.queue('engine', 1), RangeError);
    rng.next('engine');
    const saved = rng.save();
    const expected = [rng.next('engine'), rng.next('looks')];
    const copy = createRng('other');
    copy.load(JSON.parse(JSON.stringify(saved)));
    assert.deepEqual([copy.next('engine'), copy.next('looks')], expected);
});
