import { loadProject } from './node.js';

export const movieOptions = movie => ({
    seed: movie.seed ?? 0,
    fps: Number(movie.fps ?? 30),
    ...(movie.opCostMs !== undefined && { opCostMs: movie.opCostMs }),
    ...(movie.epoch !== undefined && { epoch: movie.epoch }),
    ...(movie.utcOffsetMinutes !== undefined && { utcOffsetMinutes: movie.utcOffsetMinutes }),
    ...((movie.renderer === 'null' || movie.renderer === 'cpu') && { renderer: movie.renderer }),
});

export function startMovie(spre, movie) {
    const warnings = [];
    if (movie.project && movie.project !== spre.movie({ end: false }).project) {
        warnings.push('this project is not the one the movie was recorded with');
    }
    if (movie.renderer === 'other' || movie.renderer === 'none') {
        warnings.push(`the movie was recorded with ${movie.renderer === 'none' ? 'no renderer' : 'a renderer SPRE does not ship'}, so touching and pick results may differ`);
    }
    for (const name of movie.unrecorded ?? []) warnings.push(`${name} was used while recording and is not in the movie`);
    if (movie.start && movie.start !== 'load') spre.restore(movie.start);
    spre.input.schedule(movie.events.filter(event => event.frame >= spre.frame));
    return warnings;
}

export const movieEnd = movie => movie.end?.frame ?? (movie.events.length ? movie.events.at(-1).frame + 1 : 0);

export async function replayMovie(source, movie, { until, ...options } = {}) {
    const { vm, spre } = await loadProject(source, { ...movieOptions(movie), ...options });
    const warnings = startMovie(spre, movie);
    const end = until ?? movieEnd(movie);
    spre.step(Math.max(0, end - spre.frame));
    const hash = spre.hash();
    const expected = until === undefined ? movie.end?.hash ?? null : null;
    return { vm, spre, frame: spre.frame, hash, expected, matches: expected === null ? null : hash === expected, warnings };
}
