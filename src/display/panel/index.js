import { h, replaceChildren } from './dom.js';
import { ICONS } from './icons.js';
import { createInputsTab } from './inputs.js';
import { createMemoryTab } from './memory.js';
import { createScanTab } from './scan.js';
import { createStatesTab } from './states.js';
import { PANEL_CSS } from './styles.js';

const SPEEDS = [[0.25, '¼'], [0.5, '½'], [1, '1×'], [2, '2×'], [4, '4×'], [Infinity, '∞']];
const PREFS_KEY = 'spre.panel';

const readPrefs = () => {
    try {
        return JSON.parse(localStorage.getItem(PREFS_KEY)) ?? {};
    } catch {
        return {};
    }
};

const writePrefs = prefs => {
    try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {}
};

const formatTime = ms => {
    const total = Math.max(0, ms) / 1000;
    const minutes = Math.floor(total / 60);
    const seconds = total - (minutes * 60);
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
};

const groupDigits = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const iconButton = (name, label, onClick, extra = '') => h('button', { class: `icon-button ${extra}`, 'aria-label': label, title: label, onClick, html: ICONS[name] });

export function createPanel({ client, mount = document.body, open = true, hotkey = 'S', inline = false } = {}) {
    const host = h('div', { 'data-spre-panel': '' });
    const shadow = host.attachShadow({ mode: 'open' });
    const prefs = { width: 384, height: 500, ...readPrefs() };
    let status = null;
    let busySeek = null;
    let queuedSeek = null;

    const playButton = iconButton('play', 'Play', () => client.call(status?.running ? 'time.pause' : 'time.resume'), 'primary');
    const backButton = iconButton('stepBack', 'Back one frame', () => seek((status?.frame ?? 1) - 1));
    const forwardButton = iconButton('stepForward', 'Forward one frame', () => client.call('time.step', 1));
    const frameText = h('span', { class: 'frame' }, '0');
    const timeText = h('span', { class: 'time' }, '00:00.00');
    const speedButtons = SPEEDS.map(([value, label]) => h('button', {
        'aria-pressed': 'false',
        title: Number.isFinite(value) ? `Run at ${label}` : 'Run as fast as possible',
        onClick: () => client.call('time.speed', value),
    }, label));

    const recordButton = iconButton('record', 'Record the timeline', () => client.call(status?.timeline?.recording ? 'timeline.stop' : 'timeline.start'), 'small');
    const recorded = h('div', { class: 'recorded' });
    const keys = h('div');
    const marks = h('div');
    const playhead = h('div', { class: 'playhead' });
    const tape = h('div', { class: 'tape', role: 'slider', tabindex: '0', 'aria-label': 'Timeline', 'aria-valuemin': '0' }, recorded, keys, marks, playhead);
    const span = h('span', { class: 'tape-span' }, '');

    const tabs = [
        ['Memory', createMemoryTab({ client })],
        ['Scan', createScanTab({ client })],
        ['Savestates', createStatesTab({ client })],
        ['Inputs', createInputsTab({ client })],
    ];
    const indicator = h('span', { class: 'indicator' });
    const tabButtons = tabs.map(([label], i) => h('button', { role: 'tab', 'aria-selected': 'false', onClick: () => selectTab(i) }, label));
    const body = h('div', { class: 'body', role: 'tabpanel' });
    const tabBar = h('div', { class: 'tabs', role: 'tablist' }, tabButtons, indicator,
        h('span', { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' } },
            iconButton('flag', 'Green flag', () => client.call('project.flag'), 'small'),
            iconButton('stop', 'Stop all', () => client.call('project.stop'), 'small'),
            inline ? null : iconButton('close', 'Hide panel (Alt+Shift+' + hotkey + ')', () => setOpen(false), 'small')));

    const head = h('div', { class: 'head' },
        h('div', { class: 'island' }, backButton, playButton, forwardButton),
        h('div', { class: 'clock' }, frameText, timeText),
        h('div', { class: 'speeds', role: 'group', 'aria-label': 'Speed' }, speedButtons));

    const resize = h('div', { class: 'resize', 'aria-hidden': 'true' });
    const shell = h('div', { class: `shell${inline ? ' inline' : ''}`, role: inline ? 'region' : 'dialog', 'aria-label': 'SPRE' },
        h('div', { class: 'core' }, head, h('div', { class: 'tape-row' }, recordButton, tape, span), tabBar, body), inline ? null : resize);
    const launcherFrame = h('span', { class: 'frame' }, '0');
    const launcher = h('button', { class: 'launcher', 'aria-label': 'Open SPRE', onClick: () => setOpen(true) },
        h('span', { class: 'badge', html: ICONS.play }), launcherFrame);

    shadow.append(h('style', {}, PANEL_CSS), shell, launcher);
    mount.append(host);

    const place = () => {
        if (inline) return;
        const width = Math.min(prefs.width, innerWidth - 16);
        const height = Math.min(prefs.height, innerHeight - 16);
        const left = Math.min(Math.max(8, prefs.left ?? innerWidth - width - 18), innerWidth - width - 8);
        const top = Math.min(Math.max(8, prefs.top ?? innerHeight - height - 18), innerHeight - height - 8);
        Object.assign(shell.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
    };

    let activeTab = Math.min(prefs.tab ?? 0, tabs.length - 1);
    const selectTab = index => {
        tabs[activeTab][1].hide?.();
        activeTab = index;
        prefs.tab = index;
        writePrefs(prefs);
        tabButtons.forEach((button, i) => button.setAttribute('aria-selected', String(i === index)));
        replaceChildren(body, tabs[index][1].element);
        tabs[index][1].show?.(status);
        requestAnimationFrame(() => {
            const button = tabButtons[index];
            indicator.style.width = `${button.offsetWidth - 16}px`;
            indicator.style.transform = `translateX(${button.offsetLeft + 8}px)`;
        });
    };

    const setOpen = requested => {
        const value = inline || requested;
        shell.hidden = !value;
        launcher.hidden = value;
        prefs.open = value;
        writePrefs(prefs);
        if (value) {
            place();
            selectTab(activeTab);
        } else {
            tabs[activeTab][1].hide?.();
        }
    };

    const frameOf = clientX => {
        const range = status?.timeline;
        if (!range || range.start === null) return null;
        const rect = tape.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return Math.round(range.start + (ratio * (range.end - range.start)));
    };

    const seek = async frame => {
        if (frame === null || frame < 0) return;
        if (busySeek) {
            queuedSeek = frame;
            return;
        }
        busySeek = client.call('timeline.seek', frame).catch(() => null);
        await busySeek;
        busySeek = null;
        if (queuedSeek !== null) {
            const next = queuedSeek;
            queuedSeek = null;
            seek(next);
        }
    };

    let scrubbing = null;
    tape.addEventListener('pointerdown', event => {
        if (status?.timeline?.start === null) return;
        tape.setPointerCapture(event.pointerId);
        scrubbing = { resume: status?.running };
        if (status?.running) client.call('time.pause');
        seek(frameOf(event.clientX));
    });
    tape.addEventListener('pointermove', event => {
        if (scrubbing) seek(frameOf(event.clientX));
    });
    tape.addEventListener('pointerup', async () => {
        if (!scrubbing) return;
        const { resume } = scrubbing;
        scrubbing = null;
        await busySeek;
        if (resume) client.call('time.resume');
    });
    tape.addEventListener('keydown', event => {
        const step = event.shiftKey ? 30 : 1;
        if (event.key === 'ArrowLeft') seek((status?.frame ?? 0) - step);
        else if (event.key === 'ArrowRight') seek((status?.frame ?? 0) + step);
        else return;
        event.preventDefault();
    });

    const startDrag = (event, apply) => {
        if (event.button !== 0 || event.target.closest('button')) return;
        const startX = event.clientX;
        const startY = event.clientY;
        const rect = shell.getBoundingClientRect();
        const move = moveEvent => {
            apply(rect, moveEvent.clientX - startX, moveEvent.clientY - startY);
            place();
        };
        const up = () => {
            removeEventListener('pointermove', move);
            removeEventListener('pointerup', up);
            writePrefs(prefs);
        };
        addEventListener('pointermove', move);
        addEventListener('pointerup', up);
    };
    if (!inline) head.addEventListener('pointerdown', event => startDrag(event, (rect, dx, dy) => {
        prefs.left = rect.left + dx;
        prefs.top = rect.top + dy;
    }));
    resize.addEventListener('pointerdown', event => startDrag(event, (rect, dx, dy) => {
        prefs.left = rect.left;
        prefs.top = rect.top;
        prefs.width = Math.max(320, rect.width + dx);
        prefs.height = Math.max(300, rect.height + dy);
    }));

    const renderTape = () => {
        const range = status.timeline;
        const active = range && range.start !== null;
        tape.setAttribute('aria-disabled', String(!active));
        recordButton.classList.toggle('is-on', Boolean(range?.recording));
        recordButton.title = range?.recording ? 'Stop recording the timeline' : 'Record the timeline';
        if (!active) {
            recorded.style.transform = 'scaleX(0)';
            playhead.style.transform = 'translateX(-10px)';
            span.textContent = range?.error ? 'cannot record' : 'not recording';
            backButton.disabled = true;
            return;
        }
        const length = Math.max(1, range.end - range.start);
        const width = tape.clientWidth;
        const x = frame => ((frame - range.start) / length) * width;
        recorded.style.width = `${width}px`;
        recorded.style.transform = `scaleX(${Math.min(1, Math.max(0, (status.frame - range.start) / length))})`;
        playhead.style.transform = `translateX(${x(status.frame)}px)`;
        if (keys.dataset.signature !== `${range.keyframes.length}:${range.start}:${range.end}:${width}`) {
            keys.dataset.signature = `${range.keyframes.length}:${range.start}:${range.end}:${width}`;
            replaceChildren(keys, range.keyframes.map(frame => h('span', { class: 'key', style: { left: `${x(frame)}px` } })));
        }
        tape.setAttribute('aria-valuemin', String(range.start));
        tape.setAttribute('aria-valuemax', String(range.end));
        tape.setAttribute('aria-valuenow', String(status.frame));
        span.textContent = groupDigits(range.end);
        backButton.disabled = status.frame - 1 < range.start;
    };

    const renderInputMarks = frames => {
        const range = status?.timeline;
        if (!range || range.start === null) return replaceChildren(marks);
        const length = Math.max(1, range.end - range.start);
        const width = tape.clientWidth;
        const seen = new Set();
        replaceChildren(marks, frames.filter(frame => frame >= range.start).map(frame => Math.round(((frame - range.start) / length) * width))
            .filter(px => !seen.has(px) && seen.add(px)).map(px => h('span', { class: 'input-mark', style: { left: `${px}px` } })));
    };

    client.on('status', next => {
        status = next;
        frameText.textContent = groupDigits(next.frame);
        launcherFrame.textContent = groupDigits(next.frame);
        timeText.textContent = formatTime(next.time);
        playButton.innerHTML = next.running ? ICONS.pause : ICONS.play;
        playButton.setAttribute('aria-label', next.running ? 'Pause' : 'Play');
        playButton.title = next.running ? 'Pause' : 'Play';
        forwardButton.disabled = next.running;
        speedButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(SPEEDS[i][0] === next.speed)));
        if (!shell.hidden) {
            renderTape();
            tabs[activeTab][1].update?.(next);
        }
    });

    const marksTimer = setInterval(async () => {
        if (shell.hidden || !status?.timeline?.recording) return;
        try {
            const movie = await client.call('spre.movie');
            renderInputMarks(movie.events.map(event => event.frame));
        } catch {}
    }, 2000);

    const onKey = event => {
        if (event.altKey && event.shiftKey && event.code === `Key${hotkey}`) {
            event.preventDefault();
            setOpen(shell.hidden);
        }
    };
    addEventListener('keydown', onKey, true);
    addEventListener('resize', place);

    setOpen(prefs.open ?? open);

    return {
        host,
        setOpen,
        get open() {
            return !shell.hidden;
        },
        dispose() {
            clearInterval(marksTimer);
            removeEventListener('keydown', onKey, true);
            removeEventListener('resize', place);
            tabs.forEach(([, tab]) => tab.dispose?.());
            host.remove();
        },
    };
}
