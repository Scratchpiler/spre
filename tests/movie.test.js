import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { attach } from '../src/index.js';
import { createVM, loadProject } from '../src/node.js';
import { createBackend } from '../src/remote/backend.js';
import { replayMovie } from '../src/replay.js';
import {
    assert, boot, changeVar, flag, forever, menu, op, project, setVar, test, variable, zipProject,
} from './helpers.js';

const keyPressed = key => op('sensing_keypressed', { KEY_OPTION: menu('sensing_keyoptions', 'KEY_OPTION', key) });
const ifThen = (condition, body) => op('control_if', { CONDITION: condition, SUBSTACK: body });

const world = {
    stage: {
        variables: { name: '', ticks: 0, clock: 0, picked: 0 },
        scripts: [
            [flag(), op('sensing_askandwait', { QUESTION: 'name?' }), setVar('name', op('sensing_answer'))],
            [flag(), forever([changeVar('ticks', 1), setVar('clock', op('sensing_timer')), setVar('picked', op('operator_random', { FROM: 1, TO: 1000 }))])],
        ],
    },
    sprites: {
        Cat: {
            scripts: [
                [flag(), forever([
                    ifThen(keyPressed('space'), [op('motion_changexby', { DX: op('operator_random', { FROM: 1, TO: 9 }) })]),
                    ifThen(op('sensing_mousedown'), [op('motion_goto', { TO: menu('motion_goto_menu', 'TO', '_mouse_') })]),
                    op('motion_turnright', { DEGREES: 3 }),
                ])],
                [op('event_whenkeypressed', {}, { KEY_OPTION: 'c' }), op('control_create_clone_of', { CLONE_OPTION: menu('control_create_clone_of_menu', 'CLONE_OPTION', '_myself_') })],
                [op('control_start_as_clone'), forever([op('motion_changeyby', { DY: op('operator_random', { FROM: -2, TO: 2 }) })])],
            ],
        },
    },
};

const roundTrip = value => JSON.parse(JSON.stringify(value));

const stageVariableId = (vm, name) => Object.values(vm.runtime.getTargetForStage().variables).find(v => v.name === name).id;

test('a session with seeks, savestates from another branch, edits and settings changes replays exactly', async () => {
    const { vm, spre, data } = await boot(world, { seed: 'session' });
    const backend = createBackend({ spre, vm });
    const call = (method, ...args) => backend.call(method, ...args);
    call('timeline.start', { every: 10 });
    call('project.flag');
    call('time.step', 5);
    call('input.send', { type: 'answer', text: 'Ada' });
    call('input.send', { type: 'key', key: 'space', down: true });
    call('time.step', 10);
    call('input.send', { type: 'key', key: 'space', down: false });
    call('input.send', { type: 'key', key: 'c', down: true });
    call('time.step', 1);
    call('input.send', { type: 'key', key: 'c', down: false });
    call('time.step', 14);
    call('states.save', 'A30');
    call('vars.set', 'stage', stageVariableId(vm, 'ticks'), 500);
    spre.clock.configure({ fps: 60 });
    spre.rng.force(7, 7);
    call('input.send', { type: 'mouse', x: 40, y: -20, down: true });
    call('time.step', 20);
    call('input.send', { type: 'mouse', x: 40, y: -20, down: false });
    call('holds.set', { target: 'stage', variable: stageVariableId(vm, 'picked'), value: 3 });
    call('time.step', 20);
    call('states.save', 'A70');
    const branchA = spre.hash();

    call('timeline.seek', 25);
    call('input.send', { type: 'key', key: 'c', down: true });
    call('input.send', { type: 'mouse', x: -100, y: 100, down: true });
    call('time.step', 30);
    assert.notEqual(spre.hash(), branchA, 'branch B really went elsewhere');

    call('states.load', 'A70');
    assert.equal(spre.hash(), branchA);
    call('holds.release', {});
    spre.rng.reseed('later');
    spre.clock.configure({ opCostMs: 0.002, utcOffsetMinutes: 90 });
    call('input.send', { type: 'key', key: 'space', down: true });
    call('time.step', 25);

    const movie = roundTrip(call('spre.movie'));
    assert.equal(movie.start, 'load');
    assert.deepEqual(movie.unrecorded, []);
    assert.ok(movie.events.some(event => event.type === 'clock'), 'clock changes are in the movie');
    assert.ok(movie.events.some(event => event.type === 'rng' && event.op === 'force'), 'rng changes are in the movie');
    assert.ok(!movie.events.some(event => event.type === 'mouse' && event.x === -100), 'branch B is not in the movie');

    const replay = await replayMovie(data, movie);
    assert.deepEqual(replay.warnings, []);
    assert.equal(replay.frame, movie.end.frame);
    assert.equal(replay.hash, movie.end.hash);
    assert.equal(replay.matches, true);
});

test('a session that started mid-run carries its starting state', async () => {
    const built = project(world);
    const data = await zipProject(built);
    const vm = await createVM(data, { renderer: 'cpu' });
    vm.greenFlag();
    for (let i = 0; i < 6; i++) vm.runtime._step();
    const spre = attach(vm, { seed: 'late' });
    spre.input.answer('Grace');
    spre.input.tap('c', 2);
    spre.step(30);
    const movie = roundTrip(spre.movie());
    assert.equal(typeof movie.start, 'object');
    const replay = await replayMovie(data, movie);
    assert.equal(replay.matches, true);
    assert.equal(replay.hash, spre.hash());
});

test('restoring a snapshot from another session starts the movie there', async () => {
    const donor = await boot(world, { seed: 1 });
    donor.spre.greenFlag();
    donor.spre.step(20);
    const snapshot = roundTrip(donor.spre.snapshot());
    const { spre, data } = await boot(world, { seed: 2 });
    spre.greenFlag();
    spre.step(5);
    spre.restore(snapshot);
    spre.input.answer('Linus');
    spre.step(15);
    const movie = roundTrip(spre.movie());
    assert.equal(movie.start.frame, 20);
    assert.ok(movie.events.every(event => event.frame >= 20));
    const replay = await replayMovie(data, movie);
    assert.equal(replay.matches, true);
});

test('state the movie cannot carry is called out', async () => {
    const { spre, data } = await boot(world);
    spre.rng.onPick(() => 4);
    spre.greenFlag();
    spre.step(10);
    const movie = roundTrip(spre.movie());
    assert.deepEqual(movie.unrecorded, ['rng.onPick']);
    const replay = await replayMovie(data, movie);
    assert.ok(replay.warnings.some(warning => warning.includes('rng.onPick')));
    const mismatch = await replayMovie(await zipProject(project({ ...world, stage: { ...world.stage, variables: { ...world.stage.variables, extra: 1 } } })), movie);
    assert.ok(mismatch.warnings.some(warning => warning.includes('not the one the movie was recorded with')));
});

test('spre replay checks a movie from the command line', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'spre-movie-'));
    try {
        const { spre, data } = await boot(world, { seed: 'cli' });
        spre.greenFlag();
        spre.input.answer('Hopper');
        spre.input.tap('space', 4);
        spre.step(40);
        const movie = roundTrip(spre.movie());
        await writeFile(join(dir, 'p.sb3'), data);
        await writeFile(join(dir, 'good.json'), JSON.stringify(movie));
        const tampered = roundTrip(movie);
        tampered.events.find(event => event.type === 'answer').text = 'Lovelace';
        await writeFile(join(dir, 'bad.json'), JSON.stringify(tampered));
        const run = file => new Promise(resolve => {
            execFile(process.execPath, [new URL('../bin/spre.js', import.meta.url).pathname, 'replay', join(dir, 'p.sb3'), join(dir, file)], (error, stdout) => {
                resolve({ code: error ? error.code : 0, stdout });
            });
        });
        const good = await run('good.json');
        assert.equal(good.code, 0);
        assert.match(good.stdout, /^matches: frame 40/);
        const bad = await run('bad.json');
        assert.equal(bad.code, 1);
        assert.match(bad.stdout, /^DIFFERS/);
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
});

test('a recorded run replays through the plain CLI path too', async () => {
    const { spre, data } = await boot(world, { seed: 'plain', fps: 60, opCostMs: 0.003, epoch: '2030-06-01T12:00:00Z', utcOffsetMinutes: -300 });
    spre.greenFlag();
    spre.input.answer('Turing');
    spre.step(25);
    const movie = roundTrip(spre.movie());
    assert.equal(movie.fps, 60);
    assert.equal(movie.opCostMs, 0.003);
    assert.equal(movie.utcOffsetMinutes, -300);
    const replay = await replayMovie(data, movie);
    assert.equal(replay.matches, true);
    const fresh = await loadProject(data, { seed: 'plain' });
    fresh.spre.input.schedule(movie.events);
    fresh.spre.step(25);
    assert.notEqual(fresh.spre.hash(), movie.end.hash, 'replaying events without the movie settings does not match');
});
