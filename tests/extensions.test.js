import { assert, boot, changeVar, flag, op, setVar, stageVar, test } from './helpers.js';

const speaker = (extra = {}) => ({
    extensions: ['text2speech'],
    stage: { variables: { done: 0 } },
    sprites: { Talker: { scripts: [[flag(), op('text2speech_speakAndWait', { WORDS: 'hello there' }), changeVar('done', 1)]] } },
    ...extra,
});

test('a project with the music extension loads without an unhandled rejection', async () => {
    const rejections = [];
    const listener = reason => rejections.push(reason);
    process.on('unhandledRejection', listener);
    try {
        const { spre, vm } = await boot({
            extensions: ['music'],
            stage: { variables: { beats: 0 } },
            sprites: { Band: { scripts: [[flag(), op('music_playNoteForBeats', { NOTE: 60, BEATS: 0.5 }), changeVar('beats', 1)]] } },
        });
        await new Promise(resolve => setImmediate(resolve));
        spre.greenFlag();
        spre.step(30);
        assert.deepEqual(rejections, []);
        assert.equal(stageVar(vm, 'beats'), 1);
        assert.equal(vm.runtime.audioEngine, null);
        assert.doesNotThrow(() => spre.snapshot());
    } finally {
        process.off('unhandledRejection', listener);
    }
});

test('speak and wait is a wait of deterministic length that snapshots and restores', async () => {
    const live = await boot(speaker(), { speechMs: ({ words }) => 40 * words.length });
    live.spre.greenFlag();
    live.spre.step(10);
    assert.equal(live.spre.status().waits, 1);
    assert.equal(stageVar(live.vm, 'done'), 0);
    const snapshot = JSON.parse(JSON.stringify(live.spre.snapshot()));
    live.spre.step(30);
    assert.equal(stageVar(live.vm, 'done'), 1);

    const fresh = await boot(speaker(), { speechMs: ({ words }) => 40 * words.length });
    fresh.spre.restore(snapshot);
    fresh.spre.step(30);
    assert.equal(fresh.spre.hash(), live.spre.hash());
});

test('speak and wait defaults to a length proportional to the words and passes the voice to speechMs', async () => {
    const seen = [];
    const { spre } = await boot(speaker(), { speechMs: args => { seen.push(args); return 100; } });
    spre.greenFlag();
    spre.step(2);
    assert.deepEqual(seen, [{ words: 'hello there', voice: null, sprite: 'Talker' }]);

    const plain = await boot(speaker());
    plain.spre.greenFlag();
    plain.spre.step(18);
    assert.equal(stageVar(plain.vm, 'done'), 0);
    plain.spre.step(4);
    assert.equal(stageVar(plain.vm, 'done'), 1);
    assert.equal(plain.vm.runtime.threads.length, 0);
});

test('stop all drops a pending speech', async () => {
    const { spre, vm } = await boot(speaker());
    spre.greenFlag();
    spre.step(3);
    spre.stopAll();
    spre.step(40);
    assert.equal(spre.status().waits, 0);
    assert.equal(stageVar(vm, 'done'), 0);
});

test('translate answers from the translate option, leaving digits alone', async () => {
    const spec = {
        extensions: ['translate'],
        stage: { variables: { word: '', number: '' } },
        sprites: {
            Linguist: {
                scripts: [[
                    flag(),
                    setVar('word', op('translate_getTranslate', { WORDS: 'hello', LANGUAGE: 'fr' })),
                    setVar('number', op('translate_getTranslate', { WORDS: '42', LANGUAGE: 'fr' })),
                ]],
            },
        },
    };
    const calls = [];
    const translated = await boot(spec, { translate: args => { calls.push(args); return `${args.language}:${args.words}`; } });
    translated.spre.greenFlag();
    translated.spre.step(2);
    assert.equal(stageVar(translated.vm, 'word'), 'fr:hello');
    assert.equal(stageVar(translated.vm, 'number'), '42');
    assert.deepEqual(calls, [{ words: 'hello', language: 'fr' }]);
    assert.deepEqual(translated.spre.movie().unrecorded, ['translate']);

    const offline = await boot(spec);
    offline.spre.greenFlag();
    offline.spre.step(2);
    assert.equal(stageVar(offline.vm, 'word'), 'hello');
    assert.deepEqual(offline.spre.movie().unrecorded, []);
});
