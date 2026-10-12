#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { loadProject } from '../src/node.js';

const USAGE = `usage: spre <project.sb3> [options]
       spre serve <project.sb3> [--port N] [--host H] [--seed S] [--fps N] [--no-flag]

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
        help: { type: 'boolean', short: 'h', default: false },
    },
});

if (positionals[0] === 'serve' && positionals.length === 2 && !values.help) {
    const { serve } = await import('../src/serve.js');
    const session = await serve(positionals[1], {
        port: Number(values.port),
        host: values.host,
        flag: !values['no-flag'],
        fastExecute: !values['no-fast'],
        seed: values.seed,
        fps: Number(values.fps),
        ...(values['op-cost'] !== undefined && { opCostMs: Number(values['op-cost']) }),
        ...(values.epoch !== undefined && { epoch: values.epoch }),
    });
    process.stdout.write(`SPRE is serving ${positionals[1]} at ${session.url}\n`);
    await new Promise(() => {});
}

if (values.help || positionals.length !== 1) {
    process.stdout.write(USAGE);
    process.exit(values.help ? 0 : 2);
}

const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const movie = values.movie ? await readJSON(values.movie) : null;

const { spre } = await loadProject(positionals[0], {
    seed: movie?.seed ?? values.seed,
    fps: Number(movie?.fps ?? values.fps),
    fastExecute: !values['no-fast'],
    ...(values['op-cost'] !== undefined && { opCostMs: Number(values['op-cost']) }),
    ...(values.epoch !== undefined && { epoch: values.epoch }),
    ...(values.answers !== undefined && { answers: values.answers.split(',') }),
});

if (values.restore) spre.restore(await readJSON(values.restore));
if (movie) spre.input.schedule(movie.events.filter(event => event.frame >= spre.frame));
else if (!values['no-flag'] && !values.restore) spre.greenFlag();

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
