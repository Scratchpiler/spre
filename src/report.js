import { hottest } from './profile.js';

const STYLES = { bold: [1, 22], dim: [2, 22], red: [31, 39], green: [32, 39], yellow: [33, 39], cyan: [36, 39] };

const painter = color => Object.fromEntries(Object.entries(STYLES).map(([name, [on, off]]) => [
    name,
    text => (color ? `\u001b[${on}m${text}\u001b[${off}m` : String(text)),
]));

const shown = value => {
    if (value === undefined) return 'missing';
    if (typeof value === 'string') return JSON.stringify(value.length > 60 ? `${value.slice(0, 59)}…` : value);
    if (typeof value === 'number' && Object.is(value, -0)) return '-0';
    return String(value);
};

const pad = (text, width) => text + ' '.repeat(Math.max(0, width - text.length));
const padStart = (text, width) => ' '.repeat(Math.max(0, width - text.length)) + text;

const site = write => [write.sprite, write.script, ...write.calls, write.label].join(' › ');

const ordinal = n => `${n}${['th', 'st', 'nd', 'rd'][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10]}`;

export function formatDiff(result, labels = { a: 'A', b: 'B' }, { color = Boolean(globalThis.process?.stdout?.isTTY) && !globalThis.process?.env?.NO_COLOR, verbose = false } = {}) {
    const p = painter(color);
    const lines = [`${p.dim('A')} ${labels.a}   ${p.dim('B')} ${labels.b}   ${p.dim(`mode ${result.mode}`)}`];
    if (!result.diverged) {
        lines.push(`${p.green('identical')} for ${result.frames} frames ${p.dim(`(hash ${result.a.hash})`)}`);
        return `${lines.join('\n')}\n`;
    }
    const where = result.checked === 0 ? 'before the first frame' : `in frame ${result.frame - 1}`;
    lines.push(`${p.red('diverged')} ${where} ${p.dim(`(after ${result.checked} frames)`)}`);
    const { differences } = result;
    if (!differences.length) lines.push(p.dim('  the hashes differ but no difference was found in the compared state'));

    const origin = differences.find(difference => difference.path === result.origin);
    if (origin) {
        const { mismatch } = origin.blame;
        lines.push('', `${p.bold('first different write')}  ${origin.path}, ${ordinal(mismatch.index + 1)} write in the frame`);
        for (const side of ['a', 'b']) {
            const write = mismatch[side];
            const tag = p.dim(side.toUpperCase());
            lines.push(write ? `  ${tag} ${site(write)} ${p.dim('→')} ${side === 'a' ? p.cyan(shown(write.value)) : p.yellow(shown(write.value))}` : `  ${tag} ${p.dim('no such write')}`);
        }
    }

    const width = Math.min(40, Math.max(...differences.map(d => d.path.length)));
    lines.push('', p.bold(`${differences.length}${differences.length >= 40 ? '+' : ''} difference${differences.length === 1 ? '' : 's'}${origin ? ', earliest write first' : ''}`));
    for (const difference of differences) {
        const writes = difference.blame ? p.dim(`  ${difference.blame.a.count} / ${difference.blame.b.count} writes`) : '';
        lines.push(`  ${pad(difference.path, width)}  ${p.dim('A')} ${p.cyan(shown(difference.a))}  ${p.dim('B')} ${p.yellow(shown(difference.b))}${writes}`);
        if (!verbose || !difference.blame) continue;
        for (const side of ['a', 'b']) {
            for (const write of difference.blame[side].last) lines.push(`      ${p.dim(side.toUpperCase())} ${site(write)} ${p.dim('→')} ${shown(write.value)}`);
        }
    }
    return `${lines.join('\n')}\n`;
}

const percent = (part, whole) => (whole ? `${((100 * part) / whole).toFixed(1)}%` : '0%');

export function formatProfile(profile, { top = 15, color = Boolean(globalThis.process?.stdout?.isTTY) && !globalThis.process?.env?.NO_COLOR } = {}) {
    const p = painter(color);
    const frames = profile.frames || 1;
    const atBudget = profile.framesOverBudget;
    const peak = profile.peakOps;
    const lines = [
        `${p.bold(profile.project ?? 'profile')}  ${profile.frames} frames from frame ${profile.firstFrame}  ${p.dim(`${profile.granularity} granularity`)}`,
        `${profile.totalOps.toLocaleString('en-US')} blocks, ${Math.round(profile.totalOps / frames).toLocaleString('en-US')} per frame, peak ${peak.toLocaleString('en-US')}`,
        `${atBudget} of ${profile.frames} frames used the whole budget of ${profile.budgetOps.toLocaleString('en-US')} blocks ${p.dim(`(${percent(atBudget, profile.frames)})`)}`,
        '',
    ];
    const table = (title, rows) => {
        if (!rows.length) return;
        lines.push(p.bold(title));
        for (const row of rows) {
            const share = padStart(percent(row.self, profile.totalOps), 6);
            const self = padStart(row.self.toLocaleString('en-US'), 12);
            lines.push(`${share} ${self}  ${p.dim(pad(row.target ?? '', 14))} ${row.label}`);
        }
        lines.push('');
    };
    table('hottest blocks (self)', hottest(profile, { limit: top }));
    const inclusive = kind => hottest(profile, { limit: Math.min(top, 10), kind, by: 'total' }).map(row => ({ ...row, self: row.total }));
    table('procedures (inclusive)', inclusive('call'));
    table('scripts (inclusive)', inclusive('script'));
    return `${lines.join('\n')}`;
}
