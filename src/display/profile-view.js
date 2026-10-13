const ROW = 20;
const LANE = 16;
const SPARK = 22;
const STRIP_HEIGHT = 46;
const HOT_ROWS = 12;

const CATEGORIES = [
    ['motion_', '#4c97ff'],
    ['looks_', '#9966ff'],
    ['sound_', '#cf63cf'],
    ['event_', '#ffbf00'],
    ['control_', '#ffab19'],
    ['sensing_', '#5cb1d6'],
    ['operator_', '#59c059'],
    ['data_', '#ff8c1a'],
    ['procedures_', '#ff6680'],
    ['argument_', '#ff6680'],
    ['pen_', '#0fbd8c'],
    ['music_', '#0fbd8c'],
];

const LIST_OPCODES = /^data_(add|delete|insert|replace|item|length|list|show|hide)(to|of|at|item|alloflist|oflist|numoflist|containsitem|list)/;

export const categoryColor = node => {
    if (node.kind === 'call') return '#ff6680';
    const opcode = node.opcode ?? '';
    if (LIST_OPCODES.test(opcode)) return '#ff661a';
    for (const [prefix, color] of CATEGORIES) if (opcode.startsWith(prefix)) return color;
    return null;
};

const luminance = hex => {
    const channel = i => {
        const c = parseInt(hex.slice(1 + (2 * i), 3 + (2 * i)), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return (0.2126 * channel(0)) + (0.7152 * channel(1)) + (0.0722 * channel(2));
};

const textOn = hex => (luminance(hex) > 0.36 ? '#1d2230' : '#ffffff');

const group = n => Math.round(n).toLocaleString('en-US');
const share = (part, whole) => (whole > 0 ? `${((100 * part) / whole).toFixed(part / whole < 0.1 ? 1 : 0)}%` : '0%');

function el(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
        if (value === undefined || value === null || value === false) continue;
        if (key === 'class') element.className = value;
        else if (key.startsWith('on') && typeof value === 'function') element.addEventListener(key.slice(2).toLowerCase(), value);
        else element.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) {
        if (child !== null && child !== undefined && child !== false) element.append(child instanceof Node ? child : String(child));
    }
    return element;
}

export function aggregateFrames(profile, from, to) {
    const numbers = profile.timeline?.frameNumbers ?? [];
    const self = new Float64Array(profile.nodes.length);
    let totalOps = 0;
    let attributed = 0;
    let frames = 0;
    numbers.forEach((frame, i) => {
        if (frame < from || frame > to) return;
        frames += 1;
        totalOps += profile.timeline.ops[i];
        const pairs = profile.frameNodes[i];
        for (let k = 0; k < pairs.length; k += 2) {
            self[pairs[k]] += pairs[k + 1];
            attributed += pairs[k + 1];
        }
    });
    self[0] = Math.max(0, totalOps - attributed);
    const total = Float64Array.from(self);
    for (let i = profile.nodes.length - 1; i > 0; i--) total[profile.nodes[i].parent] += total[i];
    const nodes = profile.nodes.map(node => ({ ...node, self: self[node.id], total: total[node.id], calls: null }));
    return { ...profile, nodes, totalOps, range: { from, to, frames } };
}

export const PROFILE_CSS = `
.pv button { border: 0; background: none; padding: 0; font: inherit; color: inherit; cursor: pointer; }
.pv button:focus-visible, .pv li:focus-visible, .pv-find:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.pv { container-type: inline-size; display: grid; gap: 12px; padding: 12px; min-width: 0; color: var(--ink); font: 400 12.5px/1.4 var(--ui); font-variant-numeric: tabular-nums; }
.pv[data-empty] .pv-live { display: none !important; }
.pv-live { display: grid; gap: 12px; min-width: 0; }
@container (min-width: 860px) {
    .pv-live { grid-template-columns: minmax(0, 1fr) 340px; grid-template-rows: auto auto auto 1fr; column-gap: 18px; align-items: start; }
    .pv-figures { grid-column: 1; grid-row: 1; }
    .pv-strip { grid-column: 1; grid-row: 2; }
    .pv-bar { grid-column: 1; grid-row: 3; }
    .pv-views { grid-column: 1; grid-row: 4; }
    .pv-heading { grid-column: 2; grid-row: 1; align-self: end; }
    .pv-hot { grid-column: 2; grid-row: 2 / span 3; }
}
.pv:not([data-empty]) > .pv-placeholder { display: none; }
.pv-placeholder { padding: 4px 2px; color: var(--muted); max-width: 60ch; }
.pv-figures { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 4px; border-radius: 14px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--hair); }
.pv-figure { display: grid; gap: 3px; padding: 8px 10px; border-radius: 10px; background: var(--card); box-shadow: 0 1px 2px rgba(29, 34, 48, 0.06), inset 0 0 0 1px var(--hair); min-width: 0; }
.pv-figure b { font: 620 18px/1.05 var(--ui); letter-spacing: -0.015em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pv-figure span { color: var(--muted); font-size: 11px; line-height: 1.25; }
.pv-figure[data-tone="hot"] b { color: var(--live); }
.pv-plate { position: relative; padding: 4px; border-radius: 14px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--hair); }
.pv-plate canvas { display: block; width: 100%; border-radius: 10px; background: var(--card); box-shadow: inset 0 0 0 1px var(--hair); }
.pv-strip canvas { height: ${STRIP_HEIGHT}px; cursor: crosshair; }
.pv-caption { display: flex; justify-content: space-between; gap: 8px; padding: 6px 6px 2px; color: var(--muted); font-size: 11px; }
.pv-caption i { font-style: normal; color: var(--accent); }
.pv-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.pv-crumbs { display: flex; flex: 1 1 160px; flex-wrap: wrap; align-items: center; gap: 2px; min-width: 0; }
.pv-crumbs button { max-width: 160px; height: 24px; padding: 0 8px; border-radius: 999px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: background-color 200ms var(--snap), color 200ms var(--snap); }
.pv-crumbs button:hover { background: var(--hair); color: var(--ink); }
.pv-crumbs button[aria-current="true"] { color: var(--ink); background: var(--card); box-shadow: 0 1px 2px rgba(29, 34, 48, 0.1), inset 0 0 0 1px var(--hair); }
.pv-crumbs .sep { color: var(--faint); }
.pv-find { flex: 0 1 180px; min-width: 120px; height: 28px; padding: 0 12px; border: 0; border-radius: 999px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--hair); color: var(--ink); font: inherit; }
.pv-find::placeholder { color: var(--faint); }
.pv-flame { max-height: var(--pv-flame-max, 420px); overflow: auto; overscroll-behavior: contain; border-radius: 10px; }
.pv-flame canvas { cursor: pointer; }
.pv-tip { position: absolute; z-index: 2; max-width: 300px; padding: 8px 10px; border-radius: 10px; background: var(--ink); color: var(--card); font-size: 11.5px; line-height: 1.4; pointer-events: none; opacity: 0; transform: translateY(4px); transition: opacity 160ms var(--snap), transform 220ms var(--spring); box-shadow: 0 18px 36px -18px rgba(29, 34, 48, 0.6); }
.pv-tip[data-on] { opacity: 1; transform: none; }
.pv-tip strong { display: block; margin-bottom: 2px; font-weight: 600; word-break: break-word; }
.pv-tip .where { display: block; margin-bottom: 4px; opacity: 0.66; word-break: break-word; }
.pv-tip dl { display: grid; grid-template-columns: auto auto; gap: 1px 12px; margin: 0; }
.pv-tip dt { opacity: 0.66; }
.pv-tip dd { margin: 0; text-align: right; }
.pv-hot { list-style: none; margin: 0; padding: 0; }
.pv-hot li { position: relative; display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 30px; padding: 2px 8px; border-radius: 8px; cursor: pointer; isolation: isolate; }
.pv-hot li + li { box-shadow: inset 0 1px 0 var(--hair); }
.pv-hot li:hover { background: var(--card-raised, var(--paper)); }
.pv-hot li::before { content: ""; position: absolute; z-index: -1; left: 0; top: 3px; bottom: 3px; width: var(--share); border-radius: 6px; background: var(--tint); opacity: 0.12; transform-origin: 0 50%; animation: pv-grow 620ms var(--spring) both; }
.pv-hot .swatch { width: 8px; height: 8px; border-radius: 3px; }
.pv-hot .what { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pv-hot .who { color: var(--faint); margin-left: 6px; }
.pv-hot .pct { font-size: 12px; color: var(--muted); }
.pv-heading { margin: 4px 2px 0; font-size: 12px; font-weight: 600; color: var(--muted); }
.pv-empty { padding: 4px 2px; color: var(--muted); }
.pv-strip canvas[data-selectable="false"] { cursor: default; }
.pv-caption button { color: var(--accent); }
.pv-caption button:hover { text-decoration: underline; }
.pv-modes { display: inline-flex; padding: 2px; border-radius: 999px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--hair); }
.pv-modes button { height: 24px; padding: 0 10px; border-radius: 999px; color: var(--muted); white-space: nowrap; transition: background-color 220ms var(--snap), color 220ms var(--snap); }
.pv-modes button[aria-pressed="true"] { background: var(--card); color: var(--ink); box-shadow: 0 1px 2px rgba(29, 34, 48, 0.12), inset 0 0 0 1px var(--hair); }
.pv[data-mode="threads"] .pv-crumbs, .pv[data-mode="threads"] .pv-find, .pv[data-mode="threads"] .pv-flame-plate { display: none; }
.pv[data-mode="flame"] .pv-thread-plate { display: none; }
.pv-threads { max-height: var(--pv-flame-max, 420px); overflow: auto; overscroll-behavior: contain; border-radius: 10px; }
.pv-threads canvas { cursor: crosshair; }
.pv-range { color: var(--accent); }
.pv-views { position: relative; display: grid; min-width: 0; }
@container (max-width: 440px) { .pv-figure { padding: 7px 8px; } .pv-figure b { font-size: 14px; } }
@keyframes pv-grow { from { transform: scaleX(0); } to { transform: none; } }
@media (prefers-reduced-motion: reduce) { .pv-hot li::before, .pv-tip { animation: none; transition: none; } }
`;

const childrenOf = nodes => {
    const children = nodes.map(() => []);
    for (const node of nodes) if (node.parent >= 0) children[node.parent].push(node);
    for (const list of children) list.sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
    return children;
};

const where = (nodes, node) => {
    const path = [];
    for (let up = nodes[node.parent]; up && up.kind !== 'root'; up = nodes[up.parent]) path.push(up.label);
    return path.reverse().join(' › ');
};

const fitText = (context, text, room) => {
    if (room <= 0) return '';
    if (context.measureText(text).width <= room) return text;
    let low = 0;
    let high = text.length;
    while (low < high) {
        const mid = (low + high + 1) >> 1;
        if (context.measureText(`${text.slice(0, mid)}…`).width <= room) low = mid;
        else high = mid - 1;
    }
    return low > 0 ? `${text.slice(0, low)}…` : '';
};

const framesText = (from, to) => (from === to ? `frame ${group(from)}` : `frames ${group(from)} to ${group(to)}`);

export function createProfileView({ emptyText = 'No profile yet.', flameMaxHeight, loadRange = null } = {}) {
    let base = null;
    let shown = null;
    let children = [];
    let range = null;
    let rangeToken = 0;
    let mode = 'flame';
    let zoom = 0;
    let hover = null;
    let highlight = null;
    let query = '';
    let rects = [];
    let theme = null;
    let flameHeight = 0;
    let threadHover = null;
    let threadLayout = null;
    let dragging = null;

    const figures = el('div', { class: 'pv-figures' });
    const stripCanvas = el('canvas', { role: 'img', 'aria-label': 'Blocks run in each frame. Drag to pick frames.' });
    const stripCaption = el('div', { class: 'pv-caption' });
    const strip = el('div', { class: 'pv-plate pv-strip' }, stripCanvas, stripCaption);
    const flameButton = el('button', { type: 'button', 'aria-pressed': 'true', onClick: () => setMode('flame') }, 'Flame graph');
    const threadButton = el('button', { type: 'button', 'aria-pressed': 'false', onClick: () => setMode('threads') }, 'Thread graph');
    const modes = el('div', { class: 'pv-modes', role: 'group', 'aria-label': 'View' }, flameButton, threadButton);
    const crumbs = el('nav', { class: 'pv-crumbs', 'aria-label': 'Zoom path' });
    const find = el('input', { class: 'pv-find', type: 'search', placeholder: 'Find a block or sprite', 'aria-label': 'Find a block or sprite' });
    const flameCanvas = el('canvas', { role: 'img', 'aria-label': 'Flame graph: sprites at the bottom, then scripts, procedures and blocks above' });
    const flame = el('div', { class: 'pv-flame' }, flameCanvas);
    const tip = el('div', { class: 'pv-tip', role: 'tooltip' });
    const flamePlate = el('div', { class: 'pv-plate pv-flame-plate' }, flame);
    const threadCanvas = el('canvas', { role: 'img', 'aria-label': 'Thread graph: one lane per script, one column per frame' });
    const threads = el('div', { class: 'pv-threads' }, threadCanvas);
    const threadPlate = el('div', { class: 'pv-plate pv-thread-plate' }, threads);
    const views = el('div', { class: 'pv-views' }, flamePlate, threadPlate, tip);
    const hotHeading = el('h3', { class: 'pv-heading' }, 'Hottest blocks');
    const hot = el('ol', { class: 'pv-hot' });
    const empty = el('div', { class: 'pv-placeholder' }, emptyText);
    const element = el('div', { class: 'pv', 'data-empty': '', 'data-mode': 'flame' },
        empty,
        el('div', { class: 'pv-live' },
            figures,
            strip,
            el('div', { class: 'pv-bar' }, modes, crumbs, find),
            views,
            hotHeading,
            hot));
    if (flameMaxHeight) element.style.setProperty('--pv-flame-max', `${flameMaxHeight}px`);

    const readTheme = () => {
        const style = getComputedStyle(element);
        const read = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
        theme = {
            ink: read('--ink', '#1d2230'),
            muted: read('--muted', '#6b7286'),
            faint: read('--faint', '#9aa1b2'),
            card: read('--card', '#ffffff'),
            raised: read('--card-raised', '#f7f8fa'),
            paper: read('--paper', '#eef0f4'),
            hair: read('--hair-strong', 'rgba(29,34,48,0.14)'),
            accent: read('--accent', '#007aff'),
            ice: read('--ice', '#1ba7c4'),
            live: read('--live', '#e5484d'),
            ui: read('--ui', 'system-ui, sans-serif'),
        };
    };

    const sizeCanvas = (canvas, width, height) => {
        const ratio = window.devicePixelRatio || 1;
        canvas.style.height = `${height}px`;
        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        const context = canvas.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        return context;
    };

    const canRange = () => Boolean(loadRange || base?.frameNodes);

    const matches = node => {
        if (!query) return true;
        return node.label.toLowerCase().includes(query) || (node.target ?? '').toLowerCase().includes(query);
    };

    const highlighted = node => highlight !== null && node.kind === 'block' && node.target === highlight.target && (node.block ?? node.label) === highlight.key;

    const renderFigures = () => {
        const frames = Math.max(1, base.frames);
        const over = base.framesOverBudget ?? base.frameOps.filter(ops => ops >= base.budgetOps).length;
        const peak = base.peakOps ?? base.frameOps.reduce((max, ops) => Math.max(max, ops), 0);
        const figure = (value, label, tone) => el('div', { class: 'pv-figure', 'data-tone': tone }, el('b', {}, value), el('span', {}, label));
        figures.replaceChildren(
            figure(group(base.totalOps / frames), 'blocks per frame'),
            figure(group(peak), 'in the busiest frame'),
            figure(`${group(over)}/${group(base.frames)}`, 'frames used the whole budget', over ? 'hot' : undefined));
    };

    const stripFrames = () => {
        const ops = base.frameOps;
        const first = base.frameOpsFirst ?? base.firstFrame;
        return { ops, first };
    };

    const renderStrip = () => {
        const width = stripCanvas.clientWidth || strip.clientWidth - 8;
        const context = sizeCanvas(stripCanvas, width, STRIP_HEIGHT);
        context.clearRect(0, 0, width, STRIP_HEIGHT);
        stripCanvas.dataset.selectable = String(canRange());
        const { ops, first } = stripFrames();
        if (!ops.length) return;
        const peak = Math.max(1, ...ops);
        const budgetShown = base.budgetOps <= peak * 4;
        const top = budgetShown ? Math.max(base.budgetOps * 1.15, peak) : peak * 1.1;
        const perBar = Math.max(1, Math.ceil(ops.length / Math.max(1, width / 2)));
        const bars = Math.ceil(ops.length / perBar);
        const barWidth = width / bars;
        const scale = value => (STRIP_HEIGHT - 6) * Math.sqrt(Math.min(1, value / top));
        const shownRange = dragging ?? range;
        if (shownRange) {
            const x0 = ((shownRange.from - first) / perBar) * barWidth;
            const x1 = (((shownRange.to - first) / perBar) + 1) * barWidth;
            context.fillStyle = theme.accent;
            context.globalAlpha = 0.14;
            context.fillRect(x0, 0, Math.max(2, x1 - x0), STRIP_HEIGHT);
        }
        for (let i = 0; i < bars; i++) {
            let value = 0;
            for (let j = i * perBar; j < Math.min(ops.length, (i + 1) * perBar); j++) value = Math.max(value, ops[j]);
            const height = Math.max(1, scale(value));
            const frame = first + (i * perBar);
            const inside = !shownRange || (frame + perBar - 1 >= shownRange.from && frame <= shownRange.to);
            context.fillStyle = value >= base.budgetOps ? theme.live : theme.faint;
            context.globalAlpha = (value >= base.budgetOps ? 0.9 : 0.55) * (inside ? 1 : 0.35);
            context.fillRect(i * barWidth, STRIP_HEIGHT - height, Math.max(1, barWidth - (barWidth > 3 ? 1 : 0)), height);
        }
        context.globalAlpha = 1;
        if (budgetShown) {
            const budgetY = Math.round(STRIP_HEIGHT - scale(base.budgetOps)) + 0.5;
            context.strokeStyle = theme.accent;
            context.lineWidth = 1.5;
            context.setLineDash([4, 3]);
            context.beginPath();
            context.moveTo(0, budgetY);
            context.lineTo(width, budgetY);
            context.stroke();
            context.setLineDash([]);
            context.lineWidth = 1;
        }
        const left = range
            ? el('span', { class: 'pv-range' }, `${framesText(range.from, range.to)} picked `, el('button', { type: 'button', onClick: () => setRange(null) }, 'show all'))
            : el('span', {}, `${framesText(first, first + ops.length - 1)}${canRange() ? ', drag to pick' : ''}`);
        const budget = budgetShown
            ? el('span', {}, el('i', {}, '- - '), `budget ${group(base.budgetOps)} blocks`)
            : el('span', {}, `budget ${group(base.budgetOps)}, far above`);
        stripCaption.replaceChildren(left, budget);
        stripCanvas.dataset.perBar = String(perBar);
        stripCanvas.dataset.barWidth = String(barWidth);
    };

    const stripFrameAt = clientX => {
        const { ops, first } = stripFrames();
        const rect = stripCanvas.getBoundingClientRect();
        const perBar = Number(stripCanvas.dataset.perBar);
        const index = Math.min(ops.length - 1, Math.max(0, Math.floor((clientX - rect.left) / Number(stripCanvas.dataset.barWidth)) * perBar));
        return { index, frame: first + index, perBar };
    };

    const renderCrumbs = () => {
        const path = [];
        for (let node = shown.nodes[zoom]; node; node = shown.nodes[node.parent]) path.unshift(node);
        crumbs.replaceChildren(...path.flatMap((node, i) => [
            i ? el('span', { class: 'sep', 'aria-hidden': 'true' }, '›') : null,
            el('button', { type: 'button', 'aria-current': String(node.id === zoom), title: node.label, onClick: () => zoomTo(node.id) }, node.kind === 'root' ? 'Everything' : node.label),
        ]).filter(Boolean));
    };

    const drawCell = (context, node, x, y, w, height, dim, outlined) => {
        const color = categoryColor(node);
        const fill = color ?? (node.kind === 'target' ? theme.raised : theme.paper);
        context.globalAlpha = dim ? 0.22 : 1;
        context.fillStyle = fill;
        const width = Math.max(0.5, w - 1);
        if (width > 6 && context.roundRect) {
            context.beginPath();
            context.roundRect(x, y, width, height - 2, 4);
            context.fill();
        } else {
            context.fillRect(x, y, width, height - 2);
        }
        if (!color) {
            context.strokeStyle = theme.hair;
            context.strokeRect(x + 0.5, y + 0.5, Math.max(0, width - 1), height - 3);
        }
        if (outlined) {
            context.globalAlpha = 1;
            context.strokeStyle = theme.ink;
            context.lineWidth = 2;
            context.strokeRect(x + 1, y + 1, Math.max(0, width - 2), height - 4);
            context.lineWidth = 1;
        }
        if (width > 28) {
            context.globalAlpha = dim ? 0.35 : 1;
            context.fillStyle = color ? textOn(color) : theme.ink;
            const text = fitText(context, node.label, width - 10);
            if (text) context.fillText(text, x + 5, y + (height / 2) - 1);
        }
        context.globalAlpha = 1;
    };

    const renderFlame = () => {
        const nodes = shown.nodes;
        const root = nodes[zoom];
        const ancestors = [];
        for (let up = nodes[root.parent]; up; up = nodes[up.parent]) if (up.kind !== 'root') ancestors.unshift(up);
        let maxDepth = ancestors.length;
        const layout = [];
        const place = (node, x, w, depth) => {
            if (w < 0.6 || node.total <= 0) return;
            layout.push({ node, x, w, depth });
            maxDepth = Math.max(maxDepth, depth);
            let cursor = x;
            for (const child of children[node.id]) {
                const childWidth = node.total > 0 ? (w * child.total) / node.total : 0;
                place(child, cursor, childWidth, depth + 1);
                cursor += childWidth;
            }
        };
        const width = flame.clientWidth || flamePlate.clientWidth - 8;
        if (root.kind === 'root') {
            let cursor = 0;
            for (const child of children[root.id]) {
                const childWidth = root.total > 0 ? (width * child.total) / root.total : 0;
                place(child, cursor, childWidth, 0);
                cursor += childWidth;
            }
        } else {
            place(root, 0, width, ancestors.length);
        }
        const rows = maxDepth + 1;
        const height = Math.max(ROW * 3, (rows * ROW) + 2);
        const yOf = depth => height - ((depth + 1) * ROW) - 1;
        const context = sizeCanvas(flameCanvas, width, height);
        context.clearRect(0, 0, width, height);
        context.font = `500 11px ${theme.ui}`;
        context.textBaseline = 'middle';
        rects = [];
        ancestors.forEach((node, depth) => {
            drawCell(context, node, 0, yOf(depth), width, ROW, true, false);
            rects.push({ node, x: 0, y: yOf(depth), w: width });
        });
        const searching = query !== '';
        for (const { node, x, w, depth } of layout) {
            const y = yOf(depth);
            drawCell(context, node, x, y, w, ROW, searching && !matches(node), node === hover || highlighted(node));
            rects.push({ node, x, y, w });
        }
        if (!layout.length) {
            context.fillStyle = theme.muted;
            context.fillText(range ? 'Nothing ran in these frames.' : 'Nothing ran while recording.', 8, height - ROW);
        }
        if (height !== flameHeight) {
            flameHeight = height;
            flame.scrollTop = flame.scrollHeight;
        }
    };

    const laneColor = node => categoryColor(node) ?? theme.faint;

    const renderThreads = () => {
        const timeline = base.timeline;
        const width = threads.clientWidth || threadPlate.clientWidth - 8;
        const lanes = timeline?.lanes ?? [];
        const height = (SPARK * 2) + 10 + Math.max(1, lanes.length) * LANE + 4;
        const context = sizeCanvas(threadCanvas, width, height);
        context.clearRect(0, 0, width, height);
        context.font = `500 11px ${theme.ui}`;
        context.textBaseline = 'middle';
        threadLayout = null;
        const count = timeline?.frameNumbers.length ?? 0;
        if (!count) {
            context.fillStyle = theme.muted;
            context.fillText('No frames recorded yet.', 8, SPARK);
            return;
        }
        const gutter = Math.round(Math.min(220, Math.max(96, width * 0.34)));
        const graph = width - gutter - 8;
        const perColumn = Math.max(1, Math.ceil(count / Math.max(1, graph / 2)));
        const columns = Math.ceil(count / perColumn);
        const columnWidth = graph / columns;
        const bucket = (values, i, pick = Math.max) => {
            let value = 0;
            for (let j = i * perColumn; j < Math.min(count, (i + 1) * perColumn); j++) value = pick(value, values[j]);
            return value;
        };
        const x0 = gutter;
        const spark = (values, y, color, label) => {
            const max = Math.max(1, ...values);
            context.fillStyle = theme.muted;
            context.fillText(fitText(context, `${group(values[count - 1])} ${label}`, gutter - 12), 6, y + (SPARK / 2));
            context.strokeStyle = color;
            context.lineWidth = 1.5;
            context.beginPath();
            for (let i = 0; i < columns; i++) {
                const value = bucket(values, i);
                const x = x0 + ((i + 0.5) * columnWidth);
                const yy = y + SPARK - 3 - ((SPARK - 6) * (value / max));
                if (i === 0) context.moveTo(x, yy);
                else context.lineTo(x, yy);
            }
            context.stroke();
            context.lineWidth = 1;
        };
        const shownRange = range;
        const columnOf = frame => timeline.frameNumbers.indexOf(frame);
        if (shownRange) {
            const a = columnOf(shownRange.from);
            const b = columnOf(shownRange.to);
            if (a >= 0 || b >= 0) {
                const start = Math.floor(Math.max(0, a) / perColumn);
                const end = Math.floor((b >= 0 ? b : count - 1) / perColumn);
                context.fillStyle = theme.accent;
                context.globalAlpha = 0.12;
                context.fillRect(x0 + (start * columnWidth), 0, Math.max(2, (end - start + 1) * columnWidth), height);
                context.globalAlpha = 1;
            }
        }
        spark(timeline.threads, 2, theme.accent, 'threads');
        spark(timeline.clones, SPARK + 4, theme.muted, 'clones');
        const top = (SPARK * 2) + 10;
        context.strokeStyle = theme.hair;
        context.beginPath();
        context.moveTo(0, top - 3.5);
        context.lineTo(width, top - 3.5);
        context.stroke();
        const maxOps = Math.max(1, ...lanes.map(lane => Math.max(...lane.ops)));
        const scale = Math.log1p(maxOps);
        lanes.forEach((lane, row) => {
            const node = base.nodes[lane.script];
            const y = top + (row * LANE);
            const color = laneColor(node ?? {});
            if (threadHover?.row === row) {
                context.fillStyle = theme.accent;
                context.globalAlpha = 0.08;
                context.fillRect(0, y, width, LANE);
                context.globalAlpha = 1;
            }
            context.fillStyle = color;
            context.fillRect(6, y + 4, 6, LANE - 8);
            context.fillStyle = theme.ink;
            const name = fitText(context, node?.label ?? `script ${lane.script}`, gutter - 26);
            context.fillText(name, 18, y + (LANE / 2));
            const used = context.measureText(name).width;
            const owner = node ? fitText(context, node.target, gutter - 32 - used) : '';
            if (owner) {
                context.fillStyle = theme.faint;
                context.fillText(owner, 24 + used, y + (LANE / 2));
            }
            for (let i = 0; i < columns; i++) {
                const ops = bucket(lane.ops, i);
                const alive = bucket(lane.alive, i);
                const x = x0 + (i * columnWidth);
                const w = Math.max(1, columnWidth - (columnWidth > 3 ? 1 : 0));
                if (ops > 0) {
                    context.fillStyle = color;
                    context.globalAlpha = 0.2 + (0.8 * (Math.log1p(ops) / scale));
                    context.fillRect(x, y + 2, w, LANE - 4);
                } else if (alive > 0) {
                    context.fillStyle = theme.faint;
                    context.globalAlpha = 0.7;
                    context.fillRect(x, y + (LANE / 2) - 1, w, 2);
                }
            }
            context.globalAlpha = 1;
        });
        if (threadHover) {
            context.strokeStyle = theme.accent;
            context.beginPath();
            const x = x0 + ((threadHover.column + 0.5) * columnWidth);
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }
        threadLayout = { gutter, columnWidth, perColumn, columns, top, count, lanes };
    };

    const renderHot = () => {
        const merged = new Map();
        for (const node of shown.nodes) {
            if (node.kind !== 'block' || node.self <= 0) continue;
            const key = `${node.target}\u0000${node.block ?? node.label}`;
            const entry = merged.get(key) ?? { node, self: 0, best: node };
            entry.self += node.self;
            if (node.self > entry.best.self) entry.best = node;
            merged.set(key, entry);
        }
        const rows = [...merged.values()].sort((a, b) => b.self - a.self).slice(0, HOT_ROWS);
        const top = rows[0]?.self ?? 1;
        hotHeading.textContent = range ? `Hottest blocks in ${framesText(range.from, range.to)}` : 'Hottest blocks';
        hot.replaceChildren(...rows.map(({ node, self, best }) => {
            const color = categoryColor(node) ?? theme.faint;
            const pick = () => {
                setMode('flame');
                zoomTo(best.parent);
            };
            const row = el('li', {
                tabindex: '0',
                title: `${node.label} in ${node.target}: ${group(self)} blocks`,
                onMouseenter: () => setHighlight(node),
                onMouseleave: () => setHighlight(null),
                onFocus: () => setHighlight(node),
                onBlur: () => setHighlight(null),
                onClick: pick,
                onKeydown: event => { if (event.key === 'Enter') pick(); },
            },
            el('span', { class: 'swatch', style: `background: ${color}` }),
            el('span', { class: 'what' }, node.label, el('span', { class: 'who' }, node.target)),
            el('span', { class: 'pct' }, share(self, shown.totalOps)));
            row.style.setProperty('--share', `${Math.max(2, (100 * self) / top)}%`);
            row.style.setProperty('--tint', color);
            return row;
        }));
        if (!rows.length) hot.replaceChildren(el('li', { class: 'pv-empty' }, 'No blocks ran.'));
    };

    const renderView = () => {
        if (mode === 'flame') {
            renderCrumbs();
            renderFlame();
        } else {
            renderThreads();
        }
    };

    const setHighlight = node => {
        highlight = node ? { target: node.target, key: node.block ?? node.label } : null;
        if (shown && mode === 'flame') renderFlame();
    };

    const zoomTo = id => {
        zoom = shown.nodes[id] ? id : 0;
        renderCrumbs();
        renderFlame();
    };

    const setMode = next => {
        mode = next;
        element.dataset.mode = next;
        flameButton.setAttribute('aria-pressed', String(next === 'flame'));
        threadButton.setAttribute('aria-pressed', String(next === 'threads'));
        hideTip();
        if (shown) renderView();
        onModeChange?.(next);
    };

    let onModeChange = null;

    const useShown = next => {
        shown = next;
        children = childrenOf(shown.nodes);
        if (!shown.nodes[zoom]) zoom = 0;
        renderStrip();
        renderView();
        renderHot();
    };

    const fetchRange = async () => {
        if (!range) return useShown(base);
        const token = ++rangeToken;
        const next = loadRange ? await loadRange(range.from, range.to) : aggregateFrames(base, range.from, range.to);
        if (token !== rangeToken || !next) return undefined;
        return useShown(next);
    };

    const setRange = next => {
        range = next;
        fetchRange();
    };

    const hideTip = () => tip.removeAttribute('data-on');

    const placeTip = (clientX, clientY) => {
        const box = views.getBoundingClientRect();
        tip.setAttribute('data-on', '');
        const left = Math.min(Math.max(4, clientX - box.left + 12), box.width - tip.offsetWidth - 4);
        tip.style.left = `${left}px`;
        tip.style.top = `${clientY - box.top + 14}px`;
    };

    const tipRows = rows => el('dl', {}, rows.filter(Boolean).flatMap(([term, value]) => [el('dt', {}, term), el('dd', {}, value)]));

    const showNodeTip = (node, clientX, clientY) => {
        if (!node) return hideTip();
        const total = shown.totalOps;
        const counted = node.calls !== null && node.calls !== undefined;
        tip.replaceChildren(
            el('strong', {}, node.label),
            where(shown.nodes, node) ? el('span', { class: 'where' }, where(shown.nodes, node)) : null,
            tipRows([
                ['self', `${group(node.self)} (${share(node.self, total)})`],
                node.kind !== 'block' ? ['with everything above', `${group(node.total)} (${share(node.total, total)})`] : null,
                node.kind === 'block' && counted ? ['ran', `${group(node.calls)} time${node.calls === 1 ? '' : 's'}`] : null,
                node.kind === 'call' && counted ? ['called', `${group(node.calls)} time${node.calls === 1 ? '' : 's'}`] : null,
            ]));
        return placeTip(clientX, clientY);
    };

    const hit = event => {
        const rect = flameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (let i = rects.length - 1; i >= 0; i--) {
            const cell = rects[i];
            if (x >= cell.x && x < cell.x + cell.w && y >= cell.y && y < cell.y + ROW) return cell.node;
        }
        return null;
    };

    flameCanvas.addEventListener('pointermove', event => {
        const node = hit(event);
        if (node !== hover) {
            hover = node;
            renderFlame();
        }
        showNodeTip(node, event.clientX, event.clientY);
    });
    flameCanvas.addEventListener('pointerleave', () => {
        hover = null;
        hideTip();
        if (shown) renderFlame();
    });
    flameCanvas.addEventListener('click', event => {
        const node = hit(event);
        if (node) zoomTo(node.id === zoom ? Math.max(0, node.parent) : node.id);
    });

    const threadHit = event => {
        if (!threadLayout) return null;
        const rect = threadCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const column = Math.floor((x - threadLayout.gutter) / threadLayout.columnWidth);
        if (column < 0 || column >= threadLayout.columns) return null;
        const row = y >= threadLayout.top ? Math.floor((y - threadLayout.top) / LANE) : -1;
        return { column, row: row < threadLayout.lanes.length ? row : -1 };
    };

    const columnFrames = column => {
        const numbers = base.timeline.frameNumbers;
        const start = column * threadLayout.perColumn;
        const end = Math.min(numbers.length - 1, start + threadLayout.perColumn - 1);
        return { start, end, from: numbers[start], to: numbers[end] };
    };

    threadCanvas.addEventListener('pointermove', event => {
        const found = threadHit(event);
        if (found?.column !== threadHover?.column || found?.row !== threadHover?.row) {
            threadHover = found;
            renderThreads();
        }
        if (!found) return hideTip();
        const timeline = base.timeline;
        const { start, end, from, to } = columnFrames(found.column);
        const sum = values => values.slice(start, end + 1).reduce((total, value) => total + value, 0);
        const most = values => Math.max(...values.slice(start, end + 1));
        if (found.row < 0) {
            tip.replaceChildren(el('strong', {}, framesText(from, to)), tipRows([
                ['threads', group(most(timeline.threads))],
                ['clones', group(most(timeline.clones))],
                ['blocks', group(sum(timeline.ops))],
            ]));
            return placeTip(event.clientX, event.clientY);
        }
        const lane = threadLayout.lanes[found.row];
        const node = base.nodes[lane.script];
        const at = lane.at.slice(start, end + 1).reverse().find(index => index >= 0);
        tip.replaceChildren(
            el('strong', {}, node?.label ?? 'script'),
            el('span', { class: 'where' }, `${node?.target ?? ''}, ${framesText(from, to)}`),
            tipRows([
                ['threads', group(most(lane.alive))],
                ['blocks', group(sum(lane.ops))],
                at !== undefined ? ['at', timeline.labels[at]] : null,
            ]));
        return placeTip(event.clientX, event.clientY);
    });
    threadCanvas.addEventListener('pointerleave', () => {
        threadHover = null;
        hideTip();
        if (base) renderThreads();
    });
    threadCanvas.addEventListener('click', event => {
        const found = threadHit(event);
        if (!found || !canRange()) return;
        const { from, to } = columnFrames(found.column);
        setRange({ from, to });
        setMode('flame');
    });

    find.addEventListener('input', () => {
        query = find.value.trim().toLowerCase();
        if (shown) renderFlame();
    });
    find.addEventListener('keydown', event => {
        event.stopPropagation();
        if (event.key === 'Escape') {
            find.value = '';
            query = '';
            if (shown) renderFlame();
        }
    });

    stripCanvas.addEventListener('pointerdown', event => {
        if (!base?.frameOps.length || !canRange()) return;
        stripCanvas.setPointerCapture(event.pointerId);
        const { frame } = stripFrameAt(event.clientX);
        dragging = { anchor: frame, from: frame, to: frame };
        renderStrip();
    });
    stripCanvas.addEventListener('pointermove', event => {
        if (!base?.frameOps.length) return;
        const { index, frame, perBar } = stripFrameAt(event.clientX);
        if (dragging) {
            const end = frame + perBar - 1;
            dragging.from = Math.min(dragging.anchor, frame);
            dragging.to = Math.max(dragging.anchor, end);
            renderStrip();
            return;
        }
        const value = base.frameOps[index];
        stripCanvas.title = perBar > 1
            ? `${framesText(frame, frame + perBar - 1)}, busiest ${group(Math.max(...base.frameOps.slice(index, index + perBar)))} blocks`
            : `frame ${group(frame)}: ${group(value)} blocks`;
    });
    const endDrag = () => {
        if (!dragging) return;
        const picked = { from: dragging.from, to: dragging.to };
        dragging = null;
        setRange(picked);
    };
    stripCanvas.addEventListener('pointerup', endDrag);
    stripCanvas.addEventListener('pointercancel', () => {
        dragging = null;
        renderStrip();
    });
    element.addEventListener('keydown', event => {
        if (event.key === 'Escape' && range && event.target !== find) setRange(null);
    });

    const renderAll = () => {
        if (!base || !element.isConnected) return;
        readTheme();
        renderFigures();
        if (range) fetchRange();
        else useShown(base);
    };

    const resize = new ResizeObserver(() => {
        if (shown) {
            renderStrip();
            renderView();
        }
    });
    resize.observe(element);
    const scheme = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onScheme = () => renderAll();
    scheme?.addEventListener?.('change', onScheme);

    return {
        element,
        render(next) {
            base = next && next.nodes?.length ? next : null;
            if (!base) {
                element.setAttribute('data-empty', '');
                shown = null;
                return;
            }
            element.removeAttribute('data-empty');
            renderAll();
        },
        get mode() {
            return mode;
        },
        get range() {
            return range;
        },
        onModeChange(fn) {
            onModeChange = fn;
        },
        setEmptyText(text) {
            empty.textContent = text;
        },
        setFlameMaxHeight(css) {
            if (css) element.style.setProperty('--pv-flame-max', css);
            else if (flameMaxHeight) element.style.setProperty('--pv-flame-max', `${flameMaxHeight}px`);
            else element.style.removeProperty('--pv-flame-max');
        },
        dispose() {
            resize.disconnect();
            scheme?.removeEventListener?.('change', onScheme);
        },
    };
}
