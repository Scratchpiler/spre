import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createDebugger } from '../src/remote/debugger.js';
import {
    assert, boot, changeVar, flag, forever, op, project, test, variable, zipProject,
} from './helpers.js';

const BIN = new URL('../bin/spre.js', import.meta.url).pathname;

const spre = (...args) => new Promise(resolve => {
    execFile(process.execPath, [BIN, ...args], { env: { ...process.env, NO_COLOR: '1' } }, (error, stdout, stderr) => {
        resolve({ code: error ? error.code : 0, stdout, stderr });
    });
});

const counter = extraAt => ({
    stage: { variables: { score: 0 } },
    sprites: {
        Cat: {
            scripts: [[flag(), forever([
                changeVar('score', 1),
                op('motion_changexby', { DX: 1 }),
                ...(extraAt ? [op('control_if', { CONDITION: op('operator_equals', { OPERAND1: variable('score'), OPERAND2: extraAt }), SUBSTACK: [changeVar('score', 1)] })] : []),
            ])]],
        },
    },
});

const withProjects = async work => {
    const dir = await mkdtemp(join(tmpdir(), 'spre-cli-'));
    try {
        const a = join(dir, 'a.sb3');
        const b = join(dir, 'b.sb3');
        await writeFile(a, await zipProject(project(counter(null))));
        await writeFile(b, await zipProject(project(counter(20))));
        await work({ dir, a, b });
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
};

test('spre diff exits 1 with the diverging frame and 0 for identical runs', async () => withProjects(async ({ dir, a, b }) => {
    const diverged = await spre('diff', a, b, '--frames', '60', '--json', join(dir, 'diff.json'));
    assert.equal(diverged.code, 1, diverged.stderr);
    assert.match(diverged.stdout, /diverged in frame 19/);
    assert.match(diverged.stdout, /first different write {2}Stage\.var:score/);
    const json = JSON.parse(await readFile(join(dir, 'diff.json'), 'utf8'));
    assert.equal(json.frame, 20);
    assert.equal(json.origin, 'Stage.var:score');

    const same = await spre('diff', a, '--frames', '40', '--b-no-fast');
    assert.equal(same.code, 0, same.stderr);
    assert.match(same.stdout, /mode world/);
    assert.match(same.stdout, /identical for 40 frames/);
}));

test('spre profile prints a summary and writes every export', async () => withProjects(async ({ dir, a }) => {
    const out = name => join(dir, name);
    const result = await spre('profile', a, '--frames', '30', '--json', out('p.json'), '--speedscope', out('p.speedscope.json'), '--folded', out('p.folded'), '--html', out('p.html'));
    assert.equal(result.code, 0, result.stderr);
    assert.match(result.stdout, /30 frames from frame 0/);
    assert.match(result.stdout, /change \[score\] 1/);
    for (const name of ['p.json', 'p.speedscope.json', 'p.folded', 'p.html']) assert.ok(existsSync(out(name)), name);
    const html = await readFile(out('p.html'), 'utf8');
    assert.match(html, /<script type="application\/json" id="spre-profile">/);
    assert.doesNotMatch(html.slice(html.indexOf('id="spre-view"')), /<\/script>[\s\S]*<\/script>[\s\S]*<\/script>[\s\S]*<\/script>/);
    const profile = JSON.parse(await readFile(out('p.json'), 'utf8'));
    assert.equal(profile.frames, 30);
}));

test('the debugger serves the profiler over RPC with a bounded frame series', async () => {
    const booted = await boot(counter(null));
    const methods = createDebugger(booted);
    booted.spre.greenFlag();
    assert.deepEqual(methods['profile.report'](), { running: false, report: null });
    methods['profile.start']();
    booted.spre.step(50);
    const { running, report } = methods['profile.report']({ recentFrames: 20 });
    assert.equal(running, true);
    assert.equal(report.frames, 50);
    assert.equal(report.frameOps.length, 20);
    assert.equal(report.frameOpsFirst, 30);
    methods['profile.stop']();
    assert.equal(methods['profile.report']().running, false);
    methods['profile.clear']();
    assert.equal(methods['profile.report']().report, null);
});
