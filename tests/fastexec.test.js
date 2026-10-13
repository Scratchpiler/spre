import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { loadProject } from '../src/node.js';
import {
    assert, boot, broadcast, call, changeVar, define, flag, forever, menu, op, param, procedure, repeat, setVar, test, variable, wait,
} from './helpers.js';

const fib = procedure({ code: 'fib %s', names: ['n'] });
const accumulate = procedure({ code: 'accumulate %s %s', names: ['count', 'step'], defaults: ['3', '2'], warp: true });
const lonely = procedure({ code: 'lonely', names: [] });
const missing = procedure({ code: 'ghost %s', names: ['x'] });

const operatorsWorld = {
    stage: {
        variables: { total: 0, fibResult: 0, text: 'abc', mix: 0, fallthrough: 0 },
        lists: { cells: ['1', 2, 'three', '', 5.5, '  ', 'NaN', '10'], scratch: [] },
        scripts: [
            define(fib, [
                op('control_if_else', {
                    CONDITION: op('operator_lt', { OPERAND1: param('n'), OPERAND2: 2 }),
                    SUBSTACK: [changeVar('fibResult', param('n'))],
                    SUBSTACK2: [
                        call(fib, op('operator_subtract', { NUM1: param('n'), NUM2: 1 })),
                        call(fib, op('operator_subtract', { NUM1: param('n'), NUM2: 2 })),
                    ],
                }),
            ]),
            define(accumulate, [
                repeat(param('count'), [changeVar('total', param('step'))]),
            ]),
            define(lonely, [changeVar('total', 1)]),
            [
                flag(),
                call(fib, 9),
                call(accumulate, 5, 3),
                call(accumulate),
                call(lonely),
                call(missing, 1),
                setVar('mix', op('operator_add', { NUM1: 'x1', NUM2: op('operator_multiply', { NUM1: '2', NUM2: ' 4 ' }) })),
                forever([
                    changeVar('total', op('operator_divide', { NUM1: op('data_itemoflist', { INDEX: 'last' }, { LIST: variable('cells') }), NUM2: 0 })),
                    op('data_replaceitemoflist', { INDEX: op('operator_random', { FROM: 1, TO: 12 }), ITEM: op('operator_add', { NUM1: variable('total'), NUM2: 1 }) }, { LIST: variable('cells') }),
                    op('data_replaceitemoflist', { INDEX: 'random', ITEM: 'r' }, { LIST: variable('cells') }),
                    op('data_addtolist', { ITEM: op('data_itemoflist', { INDEX: op('operator_random', { FROM: -2, TO: 11 }) }, { LIST: variable('cells') }) }, { LIST: variable('scratch') }),
                    op('control_if', {
                        CONDITION: op('operator_equals', { OPERAND1: op('data_itemoflist', { INDEX: 3 }, { LIST: variable('cells') }), OPERAND2: 'THREE' }),
                        SUBSTACK: [changeVar('fallthrough', 1)],
                    }),
                    op('control_if', {
                        CONDITION: op('operator_gt', { OPERAND1: op('data_itemoflist', { INDEX: op('operator_random', { FROM: 1, TO: 8 }) }, { LIST: variable('cells') }), OPERAND2: ' ' }),
                        SUBSTACK: [changeVar('fallthrough', 2)],
                    }),
                    op('control_if', {
                        CONDITION: op('operator_not', { OPERAND: op('operator_lt', { OPERAND1: variable('total'), OPERAND2: '1e3' }) }),
                        SUBSTACK: [setVar('total', 0), op('data_deletealloflist', {}, { LIST: variable('scratch') })],
                    }),
                    wait(0),
                ]),
            ],
        ],
    },
    sprites: {
        Local: {
            variables: { total: 5, own: 0 },
            lists: { cells: [9, 8, 7] },
            scripts: [
                [flag(), forever([
                    changeVar('total', 2),
                    changeVar('own', op('data_itemoflist', { INDEX: op('operator_random', { FROM: 1, TO: 4 }) }, { LIST: variable('cells') })),
                    op('data_replaceitemoflist', { INDEX: 2, ITEM: variable('own') }, { LIST: variable('cells') }),
                    call(accumulate, 2, variable('total')),
                ])],
                [op('control_start_as_clone'), forever([changeVar('own', 1)])],
                [flag(), repeat(3, [op('control_create_clone_of', { CLONE_OPTION: menu('control_create_clone_of_menu', 'CLONE_OPTION', '_myself_') }), wait(0.07)])],
            ],
        },
    },
};

const checkpoints = (frames, every) => Array.from({ length: Math.floor(frames / every) }, (_, i) => (i + 1) * every);

const differential = async (load, frames, every, setup = () => {}) => {
    const stats = {};
    const trace = async fastExecute => {
        const { spre } = await load({ seed: 5, fastExecute });
        setup(spre);
        const hashes = [];
        let done = 0;
        stats[fastExecute] = spre;
        for (const frame of checkpoints(frames, every)) {
            spre.step(frame - done);
            done = frame;
            hashes.push(spre.hash());
        }
        return hashes;
    };
    const stock = await trace(false);
    const fast = await trace(true);
    assert.deepEqual(fast, stock);
    assert.ok(stats[true].status().compiledBlocks > 0);
    assert.equal(stats[false].status().compiledBlocks, 0);
    assert.equal(new Set(stock).size > 1, true);
};

test('fast execution matches the stock interpreter on procedures, operators, lists and clones', async () => {
    await differential(options => boot(operatorsWorld, options), 120, 10, spre => spre.greenFlag());
});

test('fast execution matches the stock interpreter when blocks yield on promises', async () => {
    const busy = {
        stage: {
            variables: { ticks: 0, answer: '', plays: 0 },
            broadcasts: ['tick'],
            scripts: [
                [flag(), forever([op('event_broadcastandwait', { BROADCAST_INPUT: broadcast('tick') })])],
                [op('event_whenbroadcastreceived', {}, { BROADCAST_OPTION: broadcast('tick') }), changeVar('ticks', 1), wait(0.05)],
            ],
        },
        sprites: {
            Cat: {
                scripts: [
                    [flag(), forever([op('looks_sayforsecs', { MESSAGE: op('operator_join', { STRING1: 'hi ', STRING2: op('operator_add', { NUM1: 1, NUM2: 2 }) }), SECS: 0.3 })])],
                    [op('event_whenkeypressed', {}, { KEY_OPTION: 'q' }), op('sensing_askandwait', { QUESTION: 'why?' }), setVar('answer', op('sensing_answer'))],
                ],
            },
            Bird: {
                sounds: [{ name: 'chirp', sampleCount: 24000, rate: 48000 }],
                scripts: [[flag(), forever([op('sound_playuntildone', { SOUND_MENU: menu('sound_sounds_menu', 'SOUND_MENU', 'chirp') }), changeVar('plays', 1)])]],
            },
        },
    };
    await differential(options => boot(busy, options), 90, 5, spre => {
        spre.greenFlag();
        spre.input.at(12, { type: 'key', key: 'q', down: true });
        spre.input.at(13, { type: 'key', key: 'q', down: false });
        spre.input.at(40, { type: 'answer', text: 'because' });
    });
});

const REAL = [['2D Physics Engine.sb3', 80, 20]];

for (const [name, frames, every] of REAL) {
    const path = new URL(`../../test-projects/${name}`, import.meta.url);
    test(`fast execution matches the stock interpreter on ${name}`, { skip: !existsSync(path) && 'test project not present' }, async () => {
        const data = await readFile(path);
        await differential(options => loadProject(data, options), frames, every, spre => spre.greenFlag());
    });
}
