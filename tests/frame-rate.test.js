import { createFrameRate } from '../src/remote/frame-rate.js';
import { assert, test } from './helpers.js';

const steady = (meter, { from = 0, frames, everyMs, perTick = 1 }) => {
    let now = from;
    for (let i = 0; i < frames; i += perTick) {
        now += everyMs;
        meter.record(perTick, now);
    }
    return now;
};

test('a steady 30 fps run reads 30 everywhere', () => {
    const meter = createFrameRate();
    meter.begin(0);
    const now = steady(meter, { frames: 90, everyMs: 1000 / 30 });
    const stats = meter.stats(now);
    for (const key of ['current', 'max', 'p99', 'p95', 'p75', 'p50', 'p25', 'p1', 'min']) {
        assert.ok(Math.abs(stats[key] - 30) < 0.01, `${key} ${stats[key]}`);
    }
    assert.equal(stats.frames, 90);
});

test('percentiles are weighted by frames, so slow stretches show in the low ones', () => {
    const meter = createFrameRate();
    meter.begin(0);
    let now = steady(meter, { frames: 95, everyMs: 1000 / 30 });
    now = steady(meter, { from: now, frames: 5, everyMs: 100 });
    const stats = meter.stats(now);
    assert.ok(Math.abs(stats.min - 10) < 0.01);
    assert.ok(Math.abs(stats.p1 - 10) < 0.01);
    assert.ok(Math.abs(stats.p95 - 30) < 0.01, 'the 95th percentile is still a fast frame');
    assert.ok(Math.abs(stats.p50 - 30) < 0.01);
    assert.ok(Math.abs(stats.max - 30) < 0.01);
    assert.ok(stats.current < 30, 'the last second includes the slow frames');
});

test('a batch of frames in one tick counts as that many frames over the interval', () => {
    const meter = createFrameRate();
    meter.begin(0);
    meter.record(4, 50);
    meter.record(0, 60);
    meter.record(2, 100);
    const stats = meter.stats(100);
    assert.equal(stats.max, 80);
    assert.equal(stats.min, 40);
    assert.equal(stats.p25, 40, 'two of six frames ran at 40');
    assert.equal(stats.p50, 80);
    assert.equal(stats.current, 60);
});

test('pauses leave no gap sample and freeze the window', () => {
    const meter = createFrameRate({ windowMs: 1000 });
    meter.begin(0);
    const end = steady(meter, { frames: 30, everyMs: 1000 / 30 });
    meter.pause();
    assert.equal(meter.stats(end + 60000).frames, 30, 'paused stats do not age out');
    assert.equal(meter.stats(end + 60000).current, 0);
    meter.begin(end + 60000);
    meter.record(1, end + 60000 + 1000 / 30);
    const stats = meter.stats(end + 60000 + 1000 / 30);
    assert.equal(stats.frames, 1, 'old samples left the window, no sample spans the pause');
    assert.ok(Math.abs(stats.min - 30) < 0.01);
});
