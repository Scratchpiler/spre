#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { loadProject } from '../src/node.js';

const USAGE = `usage: spre <project.sb3> [options]
       spre serve <project.sb3> [--port N] [--host H] [--seed S] [--fps N] [--no-flag]
       spre diff <a.sb3> [b.sb3] [options]
       spre profile <project.sb3> [options]
       spre replay <project.sb3> <movie.json> [--json FILE]

run options (also used by diff and profile):
  --frames N          frames to run (default 300)
  --seed S            RNG seed (default 0)
  --fps N             30 or 60 (default 30)
  --op-cost MS        virtual milliseconds per block (default 0.001)
  --epoch ISO         virtual wall-clock start (default 2025-01-01T00:00:00Z)
  --no-flag           do not click the green flag at frame 0
  --no-fast           run blocks through the stock interpreter instead of compiled stacks
  --movie FILE        replay inputs from a movie (spre movie JSON)
  --answers A,B,...   answers for ask-and-wait, in order
  --restore FILE      start from a snapshot instead of frame 0
  --snapshot FILE     write a snapshot after the last frame
  --record FILE       write the inputs of this run as a movie
  --every N           print the state hash every N frames

diff: run two worlds in lockstep and report the first frame where they differ
  b.sb3               the second project (default: the same project again)
  --b-seed S, --b-fps N, --b-op-cost MS, --b-no-fast, --b-movie FILE
                      settings for the second world only
  --mode M            state (sprites, variables, lists) or world (the whole snapshot);
                      world is the default when both sides load the same file with the same seed
  --ignore REGEX      leave variables and lists whose names match out of the comparison
  --pen               also compare the pen layer's pixels
  --every N           frames between checkpoints (default 30)
  --no-blame          do not rerun the diverging frame to find the blocks that wrote the difference
  --verbose, -v       list the last writes to every difference
  --json FILE         write the result as JSON (- for stdout instead of the text report)
  exit status: 0 identical, 1 diverged

replay: replay a movie from its start and check the world ends exactly as recorded
  exit status: 0 the end hash matches, 1 it does not, 2 the movie has no end hash

profile: count the blocks each script, procedure and block costs
  --warmup N          frames to run before profiling starts (default 0)
  --top N             rows in the hot-block table (default 15)
  --json FILE         write the full profile
  --speedscope FILE   write a speedscope.app profile
  --folded FILE       write collapsed stacks (flamegraph.pl, inferno)
  --html FILE         write a self-contained interactive report
`;

const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        frames: { type: 'string', default: '300' },
        seed: { type: 'string', default: '0' },
        fps: { type: 'string', default: '30' },
        'op-cost': { type: 'string' },
        epoch: { type: 'string' },
        'no-flag': { type: 'boolean', default: false },
        'no-fast': { type: 'boolean', default: false },
        movie: { type: 'string' },
        answers: { type: 'string' },
        restore: { type: 'string' },
        snapshot: { type: 'string' },
        record: { type: 'string' },
        every: { type: 'string' },
        port: { type: 'string', default: '8642' },
        host: { type: 'string', default: '127.0.0.1' },
        'b-seed': { type: 'string' },
        'b-fps': { type: 'string' },
        'b-op-cost': { type: 'string' },
        'b-no-fast': { type: 'boolean', default: false },
        'b-movie': { type: 'string' },
        mode: { type: 'string' },
        ignore: { type: 'string' },
        pen: { type: 'boolean', default: false },
        'no-blame': { type: 'boolean', default: false },
        verbose: { type: 'boolean', short: 'v', default: false },
        json: { type: 'string' },
        speedscope: { type: 'string' },
        folded: { type: 'string' },
        html: { type: 'string' },
        warmup: { type: 'string', default: '0' },
        top: { type: 'string', default: '15' },
        help: { type: 'boolean', short: 'h', default: false },
    },
});

const MAX_FRAME_NUMBERS = 3_000_000;

const fail = message => {
    process.stderr.write(`spre: ${message}\n`);
    process.exit(2);
};

const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));

const sideOptions = (side = '') => {
    const pick = name => values[`${side}${name}`] ?? values[name];
    return {
        seed: pick('seed'),
        fps: Number(pick('fps')),
        fastExecute: !(values['no-fast'] || (side && values[`${side}no-fast`])),
        ...(pick('op-cost') !== undefined && { opCostMs: Number(pick('op-cost')) }),
        ...(values.epoch !== undefined && { epoch: values.epoch }),
        ...(values.answers !== undefined && { answers: values.answers.split(',') }),
    };
};

async function prepare(project, options, moviePath) {
    const movie = moviePath ? await readJSON(moviePath) : null;
    const { movieOptions, startMovie } = await import('../src/replay.js');
    const { vm, spre } = await loadProject(project, { ...options, ...(movie && movieOptions(movie)) });
    if (values.restore) spre.restore(await readJSON(values.restore));
    if (movie) {
        for (const warning of startMovie(spre, movie)) process.stderr.write(`spre: ${warning}\n`);
    } else if (!values['no-flag'] && !values.restore) {
        spre.greenFlag();
    }
    return { vm, spre };
}

const command = positionals[0];

if (values.help) {
    process.stdout.write(USAGE);
    process.exit(0);
}

if (command === 'serve') {
    if (positionals.length !== 2) fail('serve takes one project');
    const { serve } = await import('../src/serve.js');
    const session = await serve(positionals[1], {
        port: Number(values.port),
        host: values.host,
        flag: !values['no-flag'],
        ...sideOptions(),
    });
    process.stdout.write(`SPRE is serving ${positionals[1]} at ${session.url}\n`);
} else if (command === 'diff') {
    await runDiff(positionals.slice(1));
} else if (command === 'profile') {
    await runProfile(positionals.slice(1));
} else if (command === 'replay') {
    await runReplay(positionals.slice(1));
} else if (positionals.length === 1) {
    await runPlain(positionals[0]);
} else {
    process.stdout.write(USAGE);
    process.exit(2);
}

async function runPlain(project) {
    const { spre } = await prepare(project, sideOptions(), values.movie);
    const frames = Number(values.frames);
    const every = values.every ? Number(values.every) : 0;
    const started = performance.now();
    for (let done = 0; done < frames;) {
        const chunk = every ? Math.min(every, frames - done) : frames - done;
        spre.step(chunk);
        done += chunk;
        if (every) process.stdout.write(`frame ${spre.frame} ${spre.hash()}\n`);
    }
    const elapsedMs = performance.now() - started;
    if (values.snapshot) await writeFile(values.snapshot, JSON.stringify(spre.snapshot()));
    if (values.record) await writeFile(values.record, JSON.stringify(spre.movie(), null, 1));
    process.stdout.write(`${JSON.stringify({ ...spre.status(), hash: spre.hash(), realMs: Math.round(elapsedMs) })}\n`);
}

async function runDiff(projects) {
    if (projects.length < 1 || projects.length > 2) fail('diff takes one or two projects');
    const { diffRuns } = await import('../src/diff.js');
    const { formatDiff } = await import('../src/report.js');
    const [pathA, pathB = pathA] = projects;
    const sameWorld = resolve(pathA) === resolve(pathB) && values['b-seed'] === undefined && values['b-movie'] === undefined;
    const mode = values.mode ?? (sameWorld ? 'world' : 'state');
    const a = await prepare(pathA, sideOptions(), values.movie);
    const b = await prepare(pathB, sideOptions('b-'), values['b-movie'] ?? values.movie);
    const result = diffRuns(a.spre, b.spre, {
        frames: Number(values.frames),
        every: values.every ? Number(values.every) : 30,
        mode,
        ignore: values.ignore ?? null,
        pen: values.pen,
        blame: !values['no-blame'],
    });
    const labels = { a: basename(pathA), b: pathB === pathA ? `${basename(pathB)} (B)` : basename(pathB) };
    const json = `${JSON.stringify({ ...result, projects: [pathA, pathB] }, null, 1)}\n`;
    if (values.json === '-') process.stdout.write(json);
    else process.stdout.write(formatDiff(result, labels, { verbose: values.verbose }));
    if (values.json && values.json !== '-') await writeFile(values.json, json);
    process.exit(result.diverged ? 1 : 0);
}

async function runReplay(args) {
    if (args.length !== 2) fail('replay takes a project and a movie');
    const { replayMovie } = await import('../src/replay.js');
    const movie = await readJSON(args[1]);
    const started = performance.now();
    const result = await replayMovie(args[0], movie, { fastExecute: !values['no-fast'] });
    for (const warning of result.warnings) process.stderr.write(`spre: ${warning}\n`);
    const summary = { frame: result.frame, hash: result.hash, expected: result.expected, matches: result.matches, warnings: result.warnings, realMs: Math.round(performance.now() - started) };
    if (values.json) await writeFile(values.json, JSON.stringify(summary, null, 1));
    if (result.matches === null) process.stdout.write(`replayed ${result.frame} frames, hash ${result.hash}; the movie has no end hash to check against\n`);
    else process.stdout.write(`${result.matches ? 'matches' : 'DIFFERS'}: frame ${result.frame}, hash ${result.hash}${result.matches ? '' : `, recorded ${result.expected}`}\n`);
    process.exit(result.matches === null ? 2 : result.matches ? 0 : 1);
}

async function runProfile(projects) {
    if (projects.length !== 1) fail('profile takes one project');
    const { toFolded, toSpeedscope } = await import('../src/profile.js');
    const { formatProfile } = await import('../src/report.js');
    const { spre } = await prepare(projects[0], sideOptions(), values.movie);
    spre.step(Number(values.warmup));
    spre.profile.start({ historyFrames: Number(values.frames) });
    const started = performance.now();
    spre.step(Number(values.frames));
    const realMs = performance.now() - started;
    spre.profile.stop();
    const profile = { ...spre.profile.report({ detail: true }), project: basename(projects[0]), realMs: Math.round(realMs) };
    if (profile.frameNodes.reduce((sum, pairs) => sum + pairs.length, 0) > MAX_FRAME_NUMBERS) delete profile.frameNodes;
    const writes = [];
    if (values.json) writes.push(writeFile(values.json, JSON.stringify(profile)));
    if (values.speedscope) writes.push(writeFile(values.speedscope, JSON.stringify(toSpeedscope(profile, basename(projects[0])))));
    if (values.folded) writes.push(writeFile(values.folded, toFolded(profile)));
    if (values.html) {
        const { profileReportHTML } = await import('../src/profile-report.js');
        writes.push(profileReportHTML(profile).then(html => writeFile(values.html, html)));
    }
    await Promise.all(writes);
    process.stdout.write(formatProfile(profile, { top: Number(values.top) }));
}
