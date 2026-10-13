import { aggregateFrames, hottest, toFolded, toSpeedscope } from '../src/profile.js';
import { formatProfile } from '../src/report.js';
import {
    assert, boot, call, changeVar, define, flag, forever, op, param, procedure, repeat, test,
} from './helpers.js';

const work = procedure({ code: 'work %s', names: ['n'], warp: true });
const inner = procedure({ code: 'inner', names: [] });

const busy = {
    stage: { variables: { total: 0, ticks: 0 } },
    sprites: {
        Cat: {
            scripts: [
                [flag(), forever([call(work, 5), changeVar('ticks', 1)])],
                define(work, [repeat(param('n'), [changeVar('total', 1), call(inner)])]),
                define(inner, [op('motion_changexby', { DX: 1 })]),
            ],
        },
        Dog: { scripts: [[flag(), forever([op('motion_turnright', { DEGREES: 15 })])]] },
    },
};

const profiled = async (options = {}, frames = 40) => {
    const booted = await boot(busy, options);
    booted.spre.greenFlag();
    booted.spre.step(5);
    booted.spre.profile.start();
    booted.spre.step(frames);
    return { ...booted, profile: booted.spre.profile.stop() };
};

const byPath = (profile, ...labels) => {
    let node = profile.nodes[0];
    for (const label of labels) {
        node = profile.nodes.find(candidate => candidate.parent === node.id && candidate.label === label);
        if (!node) return null;
    }
    return node;
};

test('profiling leaves the world bit for bit the same', async () => {
    for (const fastExecute of [true, false]) {
        const plain = await boot(busy, { fastExecute });
        plain.spre.greenFlag();
        plain.spre.step(45);
        const { spre } = await profiled({ fastExecute });
        assert.equal(spre.hash(), plain.spre.hash(), `fastExecute ${fastExecute}`);
    }
});

test('every executed block is attributed and frame totals add up', async () => {
    const { profile } = await profiled();
    assert.equal(profile.frames, 40);
    assert.equal(profile.frameOps.length, 40);
    assert.equal(profile.totalOps, profile.frameOps.reduce((sum, ops) => sum + ops, 0));
    assert.equal(profile.nodes[0].self, 0, 'nothing ran outside a thread');
    assert.equal(profile.nodes[0].total, profile.totalOps);
    assert.equal(profile.granularity, 'block');
    for (const node of profile.nodes) {
        const children = profile.nodes.filter(child => child.parent === node.id).reduce((sum, child) => sum + child.total, 0);
        assert.equal(node.total, node.self + children, `inclusive total of ${node.label}`);
    }
});

test('procedure calls nest and count how often they were entered', async () => {
    const { profile } = await profiled();
    const workNode = byPath(profile, 'Cat', 'when flag clicked', 'work');
    assert.ok(workNode, 'work is a call under the flag script');
    assert.equal(workNode.kind, 'call');
    assert.equal(workNode.calls, 40);
    const innerNode = byPath(profile, 'Cat', 'when flag clicked', 'work', 'inner');
    assert.equal(innerNode.calls, 200);
    const move = byPath(profile, 'Cat', 'when flag clicked', 'work', 'inner', 'change x 1');
    assert.equal(move.calls, 200);
    assert.equal(move.self, 200);
    const change = byPath(profile, 'Cat', 'when flag clicked', 'work', 'change [total] 1');
    assert.equal(change.calls, 200);
    assert.ok(byPath(profile, 'Dog', 'when flag clicked', 'turn right 15'));
    const [hot] = hottest(profile, { kind: 'call', by: 'total' });
    assert.equal(hot.label, 'work');
});

test('the stock interpreter is profiled per script', async () => {
    const { profile } = await profiled({ fastExecute: false });
    assert.equal(profile.granularity, 'script');
    const fast = (await profiled()).profile;
    assert.equal(profile.totalOps, fast.totalOps);
    assert.equal(byPath(profile, 'Cat', 'when flag clicked').total, byPath(fast, 'Cat', 'when flag clicked').total);
});

test('exports carry every op', async () => {
    const { profile } = await profiled();
    const speedscope = toSpeedscope(profile);
    assert.equal(speedscope.profiles[0].weights.reduce((sum, weight) => sum + weight, 0), profile.totalOps);
    const folded = toFolded(profile).trim().split('\n');
    assert.equal(folded.reduce((sum, line) => sum + Number(line.slice(line.lastIndexOf(' ') + 1)), 0), profile.totalOps);
    assert.ok(folded.some(line => line.startsWith('Cat;when flag clicked (Cat);work (Cat);inner (Cat);change x 1 (Cat) ')));
    const text = formatProfile(profile, { color: false });
    assert.match(text, /hottest blocks/);
    assert.match(text, /work/);
});

test('clearing starts a fresh session and stopping detaches the probe', async () => {
    const { spre } = await profiled();
    assert.equal(spre.profile.running, false);
    spre.profile.start();
    spre.step(3);
    spre.profile.clear();
    spre.step(2);
    const profile = spre.profile.stop();
    assert.equal(profile.frames, 2);
    assert.throws(() => spre.withProbe({ step() {}, block() {} }, () => spre.profile.start()), /another probe/);
});

test('the timeline has a lane per script with blocks and live threads per frame', async () => {
    const { spre, profile } = await profiled();
    const full = spre.profile.report({ detail: true });
    const { timeline } = full;
    assert.equal(timeline.frameNumbers.length, 40);
    assert.deepEqual(timeline.frameNumbers, Array.from({ length: 40 }, (_, i) => i + 5));
    assert.deepEqual(timeline.ops, profile.frameOps);
    assert.ok(timeline.threads.every(count => count === 2));
    const name = lane => full.nodes[lane.script].target + ' ' + full.nodes[lane.script].label;
    assert.deepEqual(timeline.lanes.map(name), ['Cat when flag clicked', 'Dog when flag clicked']);
    const [cat, dog] = timeline.lanes;
    assert.ok(cat.alive.every(count => count === 1));
    assert.equal(cat.ops.reduce((sum, ops) => sum + ops, 0), byPath(full, 'Cat', 'when flag clicked').total);
    assert.equal(dog.total, byPath(full, 'Dog', 'when flag clicked').total);
    assert.equal(timeline.labels[cat.at[0]], 'forever');
    const lanesTotal = timeline.lanes.reduce((sum, lane) => sum + lane.total, 0);
    assert.equal(lanesTotal, full.totalOps);
    const tail = spre.profile.report({ timelineFrames: 10 });
    assert.equal(tail.timeline.frameNumbers[0], 35);
    assert.equal(spre.profile.report({ timelineFrames: 0 }).timeline, undefined);
});

test('a frame range re-aggregates the tree from per-frame history', async () => {
    const { spre } = await profiled();
    const full = spre.profile.report({ detail: true });
    const whole = aggregateFrames(full, 0, Infinity);
    assert.equal(whole.totalOps, full.totalOps);
    whole.nodes.forEach((node, i) => assert.equal(node.total, full.nodes[i].total, node.label));
    const one = spre.profile.report({ from: 10, to: 10 });
    assert.equal(one.totalOps, full.frameOps[5]);
    assert.deepEqual(one.range, { from: 10, to: 10, frames: 1 });
    assert.equal(byPath(one, 'Cat', 'when flag clicked', 'work', 'inner', 'change x 1').self, 5);
    assert.equal(one.frameNodes, undefined);
    assert.ok(one.timeline);
});
