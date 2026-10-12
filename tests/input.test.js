import { assert, boot, changeVar, flag, forever, menu, op, setVar, stageVar, test } from './helpers.js';

const whenKey = key => op('event_whenkeypressed', {}, { KEY_OPTION: key });
const keyDown = key => op('sensing_keypressed', { KEY_OPTION: menu('sensing_keyoptions', 'KEY_OPTION', key) });

test('scheduled key presses fire hats and show up in key-pressed sensing', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { presses: 0, held: 0 } },
        sprites: {
            Cat: {
                scripts: [
                    [whenKey('space'), changeVar('presses', 1)],
                    [flag(), forever([setVar('held', keyDown('space'))])],
                ],
            },
        },
    });
    spre.greenFlag();
    spre.input.at(3, { type: 'key', key: 'space', down: true });
    spre.input.at(6, { type: 'key', key: 'space', down: false });
    spre.step(4);
    assert.equal(stageVar(vm, 'presses'), 1);
    assert.equal(stageVar(vm, 'held'), true);
    spre.step(3);
    assert.equal(stageVar(vm, 'held'), false);
    assert.deepEqual(spre.input.log().map(e => [e.frame, e.type, e.down]), [[0, 'flag', undefined], [3, 'key', true], [6, 'key', false]]);
});

test('mouse position uses Scratch coordinates and clicks can target a sprite directly', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { mx: 0, my: 0, clicks: 0 } },
        sprites: {
            Cat: {
                x: 100,
                y: -50,
                scripts: [
                    [flag(), forever([setVar('mx', op('sensing_mousex')), setVar('my', op('sensing_mousey'))])],
                    [op('event_whenthisspriteclicked'), changeVar('clicks', 1)],
                ],
            },
        },
    });
    spre.greenFlag();
    spre.input.mouse({ x: 12.4, y: -300 });
    spre.step(2);
    assert.deepEqual([stageVar(vm, 'mx'), stageVar(vm, 'my')], [12, -180]);
    spre.input.click('Cat');
    spre.step(3);
    assert.equal(stageVar(vm, 'clicks'), 1);
    assert.deepEqual([stageVar(vm, 'mx'), stageVar(vm, 'my')], [100, -50]);
});

test('ask and wait is answered by the answer source and resumes the asking script', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { first: '', second: '' } },
        sprites: {
            Cat: {
                scripts: [[
                    flag(),
                    op('sensing_askandwait', { QUESTION: 'name?' }),
                    setVar('first', op('sensing_answer')),
                    op('sensing_askandwait', { QUESTION: 'age?' }),
                    setVar('second', op('sensing_answer')),
                ]],
            },
        },
    }, { answers: ({ question }) => (question === 'name?' ? 'Scratch Cat' : '17') });
    const asked = [];
    vm.runtime.on('QUESTION', q => asked.push(q));
    spre.greenFlag();
    spre.step(6);
    assert.equal(stageVar(vm, 'first'), 'Scratch Cat');
    assert.equal(stageVar(vm, 'second'), '17');
    assert.ok(asked.includes(''), 'a visible sprite asks through its speech bubble');
});

test('loudness is an input', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { loud: 0, level: 0, hat: 0 } },
        sprites: {
            Cat: {
                scripts: [
                    [flag(), forever([setVar('loud', op('sensing_loud')), setVar('level', op('sensing_loudness'))])],
                    [op('event_whengreaterthan', { VALUE: 50 }, { WHENGREATERTHANMENU: 'LOUDNESS' }), changeVar('hat', 1)],
                ],
            },
        },
    });
    spre.greenFlag();
    spre.step(2);
    assert.deepEqual([stageVar(vm, 'loud'), stageVar(vm, 'level')], [false, -1]);
    spre.input.setLoudness(80);
    spre.step(3);
    assert.deepEqual([stageVar(vm, 'loud'), stageVar(vm, 'level'), stageVar(vm, 'hat')], [true, 80, 1]);
});

test('a recorded movie replays to the same state', async () => {
    const spec = {
        stage: { variables: { score: 0 } },
        sprites: {
            Cat: {
                scripts: [
                    [whenKey('a'), changeVar('score', op('operator_random', { FROM: 1, TO: 10 }))],
                    [op('event_whenthisspriteclicked'), changeVar('score', 100)],
                ],
            },
        },
    };
    const live = await boot(spec, { seed: 5 });
    live.spre.greenFlag();
    for (let i = 0; i < 20; i++) {
        if (i % 3 === 0) live.spre.input.tap('a');
        if (i === 7) live.spre.input.click('Cat');
        live.spre.step(1);
    }
    const movie = JSON.parse(JSON.stringify(live.spre.movie()));
    const replay = await boot(spec, { seed: movie.seed });
    replay.spre.input.schedule(movie.events);
    replay.spre.step(20);
    assert.equal(replay.spre.hash(), live.spre.hash());
    assert.ok(Number(stageVar(replay.vm, 'score')) > 100);
});

test('unknown input events are rejected up front', async () => {
    const { spre } = await boot({});
    assert.throws(() => spre.input.send({ type: 'teleport' }), /unknown input event/);
    assert.throws(() => spre.input.at(-1, { type: 'flag' }), RangeError);
});
