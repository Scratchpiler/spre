const STATS = ['max', 'p99', 'p95', 'p75', 'p50', 'p25', 'p1', 'min'];

const CSS = `
:host { all: initial; display: block; }
.line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 14px;
    color: var(--ink, #1d2230);
    font: 500 12.5px/1.4 ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", "Noto Sans", sans-serif;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}
.now b { font-weight: 650; }
.now[data-tone="slow"] b { color: #c27400; }
.now[data-tone="stalled"] b { color: var(--live, #e5484d); }
span span, .now span { color: var(--muted, #6b7286); font-weight: 400; }
@media (prefers-color-scheme: dark) { .now[data-tone="slow"] b { color: #ffb547; } }
`;

export const formatFps = value => {
    if (value === null || value === undefined || !Number.isFinite(value)) return '–';
    if (value >= 100) return Math.round(value).toLocaleString('en-US');
    return value.toFixed(1);
};

const pair = (label, valueElement) => {
    const wrap = document.createElement('span');
    const name = document.createElement('span');
    name.textContent = `${label} `;
    wrap.append(name, valueElement);
    return wrap;
};

export function createFpsMeter({ client }) {
    const host = document.createElement('div');
    host.setAttribute('data-spre-fps', '');
    const shadow = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    const line = document.createElement('div');
    line.className = 'line';
    line.setAttribute('role', 'status');
    const now = document.createElement('span');
    now.className = 'now';
    const nowValue = document.createElement('b');
    const nowUnit = document.createElement('span');
    now.append(nowValue, nowUnit);
    const cells = new Map(STATS.map(key => [key, document.createElement('span')]));
    line.append(now, ...[...cells].map(([key, value]) => pair(key, value)));
    shadow.append(style, line);

    const update = status => {
        const rate = status?.frameRate;
        const running = Boolean(status?.running);
        const current = rate?.current ?? 0;
        nowValue.textContent = running ? formatFps(current) : '–';
        nowUnit.textContent = running ? ' fps' : ' fps, paused';
        const target = status?.targetFps;
        now.dataset.tone = !running || !target || current >= target * 0.95 ? 'ok' : current >= target * 0.5 ? 'slow' : 'stalled';
        for (const [key, cell] of cells) cell.textContent = formatFps(rate?.[key]);
    };
    update(null);

    const off = client.on('status', update);

    return {
        element: host,
        update,
        dispose() {
            off?.();
            host.remove();
        },
    };
}
