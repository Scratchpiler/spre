import { SnapshotError } from '../src/index.js';
import { loadProject } from '../src/node.js';
import {
    addToList, assert, boot, broadcast, changeVar, flag, forever, menu, op, repeat, setVar, stageVar, test, variable, wait,
} from './helpers.js';

const cloneOf = name => op('control_create_clone_of', { CLONE_OPTION: menu('control_create_clone_of_menu', 'CLONE_OPTION', name) });
const randomSpot = () => menu('motion_glideto_menu', 'TO', '_random_');

const busyWorld = {
    stage: {
        variables: { ticks: 0, weird: 0, answer: '', plays: 0 },
        lists: { log: [] },
        broadcasts: ['tick'],
        scripts: [
            [flag(), forever([op('event_broadcastandwait', { BROADCAST_INPUT: broadcast('tick') })])],
            [op('event_whenbroadcastreceived', {}, { BROADCAST_OPTION: broadcast('tick') }), changeVar('ticks', 1), wait(0.05)],
            [
                flag(),
                setVar('weird', op('operator_divide', { NUM1: 0, NUM2: 0 })),
                addToList('log', op('operator_divide', { NUM1: 1, NUM2: 0 })),
                addToList('log', op('operator_multiply', { NUM1: -1, NUM2: 0 })),
            ],
        ],
    },
    sprites: {
        Cat: {
            scripts: [
                [flag(), forever([
                    op('motion_glideto', { SECS: 0.4, TO: randomSpot() }),
                    op('looks_sayforsecs', { MESSAGE: 'hi', SECS: 0.3 }),
                ])],
                [op('event_whenkeypressed', {}, { KEY_OPTION: 'q' }), op('sensing_askandwait', { QUESTION: 'why?' }), setVar('answer', op('sensing_answer'))],
            ],
        },
        Dog: {
            scripts: [
                [flag(), repeat(4, [cloneOf('_myself_'), wait(0.1)])],
                [op('control_start_as_clone'), forever([
                    op('motion_changexby', { DX: op('operator_random', { FROM: -3, TO: 3 }) }),
                    op('motion_turnright', { DEGREES: op('operator_random', { FROM: 0, TO: 30 }) }),
                ])],
            ],
        },
        Bird: {
            sounds: [{ name: 'chirp', sampleCount: 24000, rate: 48000 }],
            scripts: [[flag(), forever([op('sound_playuntildone', { SOUND_MENU: menu('sound_sounds_menu', 'SOUND_MENU', 'chirp') }), changeVar('plays', 1)])]],
        },
    },
};

const startBusy = async () => {
    const booted = await boot(busyWorld, { seed: 'snap' });
    booted.spre.greenFlag();
    booted.spre.input.at(12, { type: 'key', key: 'q', down: true });
    booted.spre.input.at(13, { type: 'key', key: 'q', down: false });
    booted.spre.input.at(40, { type: 'answer', text: 'because' });
    return booted;
};

test('restore then replay reproduces the uninterrupted run at every point', async () => {
    const { spre } = await startBusy();
    const checkpoints = [1, 5, 11, 14, 20, 33, 41, 60];
    const saved = [];
    const hashes = new Map();
    for (let frame = 0; frame <= 90; frame++) {
        if (checkpoints.includes(spre.frame)) saved.push(JSON.parse(JSON.stringify(spre.snapshot())));
        hashes.set(spre.frame, spre.hash());
        spre.step(1);
    }
    const final = spre.hash();
    for (const snapshot of saved) {
        spre.restore(snapshot);
        assert.equal(spre.hash(), hashes.get(snapshot.frame), `hash right after restoring frame ${snapshot.frame}`);
        spre.step(91 - snapshot.frame);
        assert.equal(spre.hash(), final, `replay from frame ${snapshot.frame}`);
    }
});

test('a snapshot restores into a freshly loaded VM', async () => {
    const live = await startBusy();
    live.spre.step(37);
    const snapshot = JSON.parse(JSON.stringify(live.spre.snapshot()));
    live.spre.step(50);
    const fresh = await loadProject(live.data, { seed: 'something else' });
    fresh.spre.restore(snapshot);
    fresh.spre.step(50);
    assert.equal(fresh.spre.hash(), live.spre.hash());
    assert.equal(stageVar(fresh.vm, 'answer'), 'because');
    assert.ok(Number(stageVar(fresh.vm, 'plays')) >= 4);
});

const waitingOnComputedInput = {
    stage: { variables: { n: 3 } },
    sprites: {
        Cat: {
            scripts: [[flag(), forever([
                op('looks_sayforsecs', { MESSAGE: op('operator_join', { STRING1: variable('n'), STRING2: '!' }), SECS: 0.5 }),
                changeVar('n', 1),
            ])]],
        },
    },
};

test('separate loads of a project hash equal while a computed input waits on a promise', async () => {
    const [a, b] = [await boot(waitingOnComputedInput), await boot(waitingOnComputedInput)];
    for (const { spre } of [a, b]) {
        spre.greenFlag();
        spre.step(5);
    }
    const reported = a.spre.snapshot().threads[0].frames.flatMap(frame => frame.reported ?? []);
    assert.ok(reported.some(report => report.opCached.startsWith('$[')), 'the inline variable reporter has a canonical id');
    assert.equal(a.spre.hash(), b.spre.hash());

    const snapshot = JSON.parse(JSON.stringify(a.spre.snapshot()));
    b.spre.restore(snapshot);
    a.spre.step(40);
    b.spre.step(40);
    assert.equal(a.spre.hash(), b.spre.hash());
    assert.equal(stageVar(b.vm, 'n'), stageVar(a.vm, 'n'));
});

test('NaN, infinities and negative zero survive JSON', async () => {
    const { vm, spre } = await startBusy();
    spre.step(2);
    const snapshot = JSON.parse(JSON.stringify(spre.snapshot()));
    stageVar(vm, 'log').length = 0;
    spre.restore(snapshot);
    assert.ok(Number.isNaN(stageVar(vm, 'weird')));
    assert.deepEqual(stageVar(vm, 'log'), [Infinity, -0]);
    assert.ok(Object.is(stageVar(vm, 'log')[1], -0));
});

test('the busy world actually exercised what it claims to', async () => {
    const { vm, spre } = await startBusy();
    const kinds = new Set();
    for (let i = 0; i < 60; i++) {
        spre.step(1);
        for (const entry of spre.snapshot().waits.entries) kinds.add(entry.kind);
    }
    assert.deepEqual([...kinds].sort(), ['bubble', 'question', 'sound']);
    assert.equal(vm.runtime.targets.filter(t => !t.isOriginal).length, 4);
    assert.ok(Number(stageVar(vm, 'ticks')) > 10);
});

test('restoring rewinds the input log so a rerecorded movie stays consistent', async () => {
    const { spre } = await startBusy();
    spre.step(10);
    const snapshot = spre.snapshot();
    spre.step(10);
    assert.ok(spre.input.log().some(e => e.frame >= 10));
    spre.restore(snapshot);
    assert.ok(spre.input.log().every(e => e.frame < 10));
    assert.deepEqual(spre.input.pending().map(e => e.frame), [12, 13, 40]);
});

test('strict snapshots refuse promises SPRE does not control', async () => {
    const { vm, spre } = await boot({
        sprites: { Cat: { scripts: [[flag(), op('looks_say', { MESSAGE: 'x' })]] } },
    });
    vm.runtime._primitives.looks_say = () => new Promise(() => {});
    for (const target of vm.runtime.targets) target.blocks.resetCache();
    spre.greenFlag();
    spre.step(1);
    assert.throws(() => spre.snapshot(), error => error instanceof SnapshotError && /promise SPRE does not control/.test(error.message));
    const lenient = spre.snapshot({ strict: false });
    assert.equal(lenient.problems.length, 1);
});

test('snapshots are refused mid-frame and for other projects', async () => {
    const { vm, spre } = await boot({ stage: { variables: { v: 0 } }, sprites: { Cat: { scripts: [[flag(), setVar('v', 1)]] } } });
    let midFrameError = null;
    vm.runtime._primitives.data_setvariableto = () => {
        try { spre.snapshot(); } catch (error) { midFrameError = error; }
    };
    for (const target of vm.runtime.targets) target.blocks.resetCache();
    spre.greenFlag();
    spre.step(1);
    assert.match(String(midFrameError), /between frames/);
    const other = await boot({ sprites: { Dog: {} } });
    assert.throws(() => other.spre.restore(spre.snapshot()), /no target sprite:Cat/);
});

test('detach puts the VM back the way it was', async () => {
    const { vm, spre } = await boot({ sprites: { Cat: {} } });
    const before = vm.runtime._primitives.operator_random;
    spre.detach();
    assert.notEqual(vm.runtime._primitives.operator_random, before);
    assert.equal(Object.hasOwn(vm.runtime, 'updateCurrentMSecs'), false);
    assert.equal(Object.hasOwn(vm.runtime.sequencer, 'stepThread'), false);
    assert.equal(vm.runtime.listenerCount('PROJECT_STOP_ALL') > 0, true);
    assert.doesNotThrow(() => vm.runtime._step());
});

test('variable references inside block state are restored by identity', async () => {
    const { vm, spre } = await boot({
        stage: { broadcasts: ['go'], variables: { n: 0 } },
        sprites: {
            Cat: {
                scripts: [
                    [flag(), op('event_broadcastandwait', { BROADCAST_INPUT: broadcast('go') }), setVar('n', 99)],
                    [op('event_whenbroadcastreceived', {}, { BROADCAST_OPTION: broadcast('go') }), wait(0.2)],
                ],
            },
        },
    });
    spre.greenFlag();
    spre.step(2);
    const snapshot = spre.snapshot();
    const context = snapshot.threads.flatMap(t => t.frames).map(f => f.context).find(c => c && c.broadcastVar);
    assert.equal(context.broadcastVar.$spre, 'variable');
    assert.equal(context.startedThreads[0].$spre, 'thread');
    spre.restore(JSON.parse(JSON.stringify(snapshot)));
    spre.step(10);
    assert.equal(stageVar(vm, 'n'), '99');
});

test('sound effect and volume blocks yield one frame without real promises', async () => {
    const { vm, spre } = await boot({
        stage: { variables: { steps: 0 } },
        sprites: {
            Bird: {
                scripts: [[flag(), forever([
                    op('sound_setvolumeto', { VOLUME: 50 }),
                    op('sound_changeeffectby', { EFFECT: menu('sound_effects_menu', 'EFFECT', 'PITCH'), VALUE: 10 }),
                    changeVar('steps', 1),
                ])]],
            },
        },
    });
    spre.greenFlag();
    spre.step(1);
    const snapshot = spre.snapshot();
    assert.deepEqual(snapshot.waits.entries.map(e => e.kind), ['tick']);
    spre.step(9);
    assert.equal(stageVar(vm, 'steps'), 4);
    spre.restore(snapshot);
    spre.step(9);
    assert.equal(stageVar(vm, 'steps'), 4);
});

test('loose reporters lying in the scripting area get load-independent names too', async () => {
    const { project: build, zipProject: zip } = await import('./helpers.js');
    const { canonicalBlockId, realBlockId } = await import('../src/block-ids.js');
    const { projectFingerprint } = await import('../src/movie.js');
    const built = build({ stage: { variables: { n: 1 } }, sprites: { Cat: { scripts: [[flag(), changeVar('n', 1)]] } } });
    const stage = built.json.targets[0];
    const cat = built.json.targets[1];
    const varId = Object.keys(stage.variables)[0];
    cat.blocks.looseA = [12, 'n', varId, 40, 80];
    cat.blocks.looseB = [12, 'n', varId, 40, 80];
    const data = await zip(built);
    const [a, b] = [await loadProject(data), await loadProject(data)];
    assert.equal(projectFingerprint(a.vm.runtime), projectFingerprint(b.vm.runtime));
    const names = vm => {
        const blocks = vm.runtime.getSpriteTargetByName('Cat').blocks;
        return blocks.getScripts().filter(id => blocks.getBlock(id).opcode === 'data_variable').map(id => [canonicalBlockId(blocks, id), id]);
    };
    const [namesA, namesB] = [names(a.vm), names(b.vm)];
    assert.deepEqual(namesA.map(([name]) => name), namesB.map(([name]) => name));
    assert.notEqual(namesA[0][0], namesA[1][0], 'identical reporters on the same spot are told apart');
    const blocksB = b.vm.runtime.getSpriteTargetByName('Cat').blocks;
    namesA.forEach(([name], i) => assert.equal(realBlockId(blocksB, name), namesB[i][1]));
});
