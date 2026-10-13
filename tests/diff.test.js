import { compareObservations, diffRuns, observe } from '../src/diff.js';
import { formatDiff } from '../src/report.js';
import {
    addToList, assert, boot, call, changeVar, define, flag, forever, op, procedure, setVar, test, variable,
} from './helpers.js';

const equals = (a, b) => op('operator_equals', { OPERAND1: a, OPERAND2: b });
const bump = procedure({ code: 'bump', names: [] });

const counter = ({ extraAt = null, hidden = false } = {}) => ({
    stage: { variables: { score: 0, ...(hidden && { __tmp: 0 }) }, lists: { log: [] } },
    sprites: {
        Cat: {
            scripts: [
                [flag(), forever([
                    call(bump),
                    op('motion_changexby', { DX: 2 }),
                    ...(hidden ? [changeVar('__tmp', 3)] : []),
                ])],
                define(bump, [
                    changeVar('score', 1),
                    ...(extraAt === null ? [] : [op('control_if', { CONDITION: equals(variable('score'), extraAt), SUBSTACK: [changeVar('score', 1)] })]),
                    addToList('log', variable('score')),
                ]),
            ],
        },
    },
});

const pair = async (specA, specB, options = {}) => {
    const a = await boot(specA, options);
    const b = await boot(specB, options.b ?? options);
    a.spre.greenFlag();
    b.spre.greenFlag();
    return [a.spre, b.spre];
};

test('identical worlds from separate loads never diverge', async () => {
    const [a, b] = await pair(counter(), counter());
    const result = diffRuns(a, b, { frames: 90, mode: 'world' });
    assert.equal(result.diverged, false);
    assert.equal(result.frames, 90);
    assert.equal(result.a.hash, result.b.hash);
});

test('the stock interpreter and compiled stacks agree on the whole world', async () => {
    const [a, b] = await pair(counter({ extraAt: 7 }), counter({ extraAt: 7 }), { fastExecute: true, b: { fastExecute: false } });
    assert.equal(diffRuns(a, b, { frames: 60, mode: 'world' }).diverged, false);
});

test('a divergence between checkpoints is pinned to its exact frame', async () => {
    for (const every of [1, 30, 200]) {
        const [a, b] = await pair(counter(), counter({ extraAt: 47 }));
        const result = diffRuns(a, b, { frames: 120, every });
        assert.equal(result.diverged, true, `every ${every}`);
        assert.equal(result.frame, 47, `every ${every}`);
        assert.equal(result.checked, 47);
        assert.equal(a.frame, 47, 'the runs stop right after the diverging frame');
    }
});

test('blame finds the first write that differs and the blocks behind it', async () => {
    const [a, b] = await pair(counter(), counter({ extraAt: 47 }));
    const result = diffRuns(a, b, { frames: 120 });
    const paths = result.differences.map(difference => difference.path);
    assert.deepEqual(paths.sort(), ['Stage.list:log[47]', 'Stage.var:score'].sort());
    assert.equal(result.origin, 'Stage.var:score');
    const score = result.differences.find(difference => difference.path === 'Stage.var:score');
    assert.equal(score.a, 47);
    assert.equal(score.b, 48);
    const { mismatch } = score.blame;
    assert.equal(mismatch.index, 1);
    assert.equal(mismatch.a, null, 'A writes score once in that frame');
    assert.deepEqual({ ...mismatch.b, seq: undefined, block: undefined }, {
        seq: undefined,
        block: undefined,
        sprite: 'Cat',
        script: 'when flag clicked',
        calls: ['bump'],
        label: 'change [score] 1',
        opcode: 'data_changevariableby',
        value: 48,
    });
    assert.equal(score.blame.a.count, 1);
    assert.equal(score.blame.b.count, 2);
    const log = result.differences.find(difference => difference.list === 'log');
    assert.equal(log.index, 47);
    assert.equal(log.blame.b.last.at(-1).label, 'add to [log] (score)');

    const text = formatDiff(result, { a: 'a.sb3', b: 'b.sb3' }, { color: false });
    assert.match(text, /diverged in frame 46/);
    assert.match(text, /first different write {2}Stage\.var:score, 2nd write in the frame/);
    assert.match(text, /B Cat › when flag clicked › bump › change \[score\] 1 → 48/);
});

test('ignored names drop out of the comparison', async () => {
    const [a, b] = await pair(counter(), counter({ hidden: true }));
    assert.equal(diffRuns(a, b, { frames: 30 }).differences[0].path, 'Stage.var:__tmp');
    const [c, d] = await pair(counter(), counter({ hidden: true }));
    assert.equal(diffRuns(c, d, { frames: 30, ignore: '^__' }).diverged, false);
});

test('observations line up clones by creation order and compare lists item by item', async () => {
    const spec = {
        stage: { lists: { items: [1, 2, 3] } },
        sprites: { Ball: { scripts: [[flag(), op('control_create_clone_of', { CLONE_OPTION: { ...op('control_create_clone_of_menu', {}, { CLONE_OPTION: '_myself_' }), shadow: true } }), setVar('ignored', 1)]], variables: { ignored: 0 } } },
    };
    const { spre } = await boot(spec);
    spre.greenFlag();
    spre.step(2);
    const seen = observe(spre);
    assert.deepEqual(Object.keys(seen.targets), ['Stage', 'Ball', 'Ball#1']);
    const other = structuredClone(seen);
    other.targets.Stage.lists.items = [1, 5, 3, 4];
    other.targets['Ball#1'].x = 10;
    const differences = compareObservations(seen, other);
    assert.deepEqual(differences.map(difference => difference.path), ['Stage.list:items[2]', 'Ball#1.x']);
    assert.deepEqual(differences[0].lengths, [3, 4]);
});
