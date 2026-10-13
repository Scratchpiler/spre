import { toSpeedscope } from '../../profile.js';
import { createProfileView } from '../profile-view.js';
import { h } from './dom.js';
import { ICONS } from './icons.js';

const POLL_MS = 1000;
const THREAD_FRAMES = 300;

const download = (filename, text) => {
    const link = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: filename });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

export function createProfileTab({ client, portal = null }) {
    const view = createProfileView({
        emptyText: 'Record a profile to see which sprites, scripts and blocks the project spends its frames on. It counts blocks run, not milliseconds, so the numbers are the same on every computer.',
        flameMaxHeight: 300,
        loadRange: async (from, to) => (await client.call('profile.report', { from, to })).report,
    });
    view.onModeChange(() => refresh());
    const toggleLabel = h('span', {}, 'Record');
    const toggle = h('button', { class: 'pill strong', onClick: () => toggleRecording() }, h('span', { html: ICONS.record }), toggleLabel);
    const clear = h('button', { class: 'pill', onClick: () => client.call('profile.clear').then(refresh) }, h('span', { html: ICONS.trash }), 'Clear');
    const exporter = h('button', {
        class: 'pill',
        title: 'Download for speedscope.app',
        onClick: () => latest && download('spre-profile.speedscope.json', JSON.stringify(toSpeedscope(latest))),
    }, h('span', { html: ICONS.download }), 'Speedscope');
    const expandLabel = h('span', {}, 'Expand');
    const expandIcon = h('span', { html: ICONS.expand });
    const expander = h('button', {
        class: 'pill push',
        title: 'Open the profiler full size',
        'aria-expanded': 'false',
        onClick: () => setExpanded(!expanded),
    }, expandIcon, expandLabel);
    const toolbar = h('div', { class: 'toolbar' }, toggle, clear, exporter, portal ? expander : null);
    const content = h('div', { class: 'profile-content' }, toolbar, view.element);
    const element = h('div', {}, content);

    const sheetBody = h('div', { class: 'sheet-body' });
    const sheet = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Profiler' },
        h('div', { class: 'sheet-core' }, sheetBody));
    const backdrop = h('div', { class: 'sheet-backdrop', hidden: true }, sheet);
    backdrop.addEventListener('pointerdown', event => {
        if (event.target === backdrop) setExpanded(false);
    });
    backdrop.addEventListener('keydown', event => {
        event.stopPropagation();
        if (event.key === 'Escape') setExpanded(false);
    });
    portal?.append(backdrop);

    let expanded = false;
    function setExpanded(next) {
        if (next === expanded || !portal) return;
        expanded = next;
        (expanded ? sheetBody : element).append(content);
        backdrop.hidden = !expanded;
        expander.setAttribute('aria-expanded', String(expanded));
        expander.title = expanded ? 'Put the profiler back in the panel (Esc)' : 'Open the profiler full size';
        expandLabel.textContent = expanded ? 'Collapse' : 'Expand';
        expandIcon.innerHTML = expanded ? ICONS.collapse : ICONS.expand;
        view.setFlameMaxHeight(expanded ? 'max(240px, calc(100dvh - 380px))' : null);
        if (expanded) expander.focus({ preventScroll: true });
    }

    let running = false;
    let latest = null;
    let visible = false;
    let timer = null;

    const paint = () => {
        toggleLabel.textContent = running ? 'Stop' : latest ? 'Resume' : 'Record';
        toggle.querySelector('span').innerHTML = running ? ICONS.stop : ICONS.record;
        clear.disabled = !latest;
        exporter.disabled = !latest;
    };

    const schedule = () => {
        clearTimeout(timer);
        timer = visible && running ? setTimeout(refresh, POLL_MS) : null;
    };

    async function refresh() {
        try {
            const answer = await client.call('profile.report', { timelineFrames: view.mode === 'threads' ? THREAD_FRAMES : 0 });
            running = answer.running;
            latest = answer.report;
            view.render(latest);
            paint();
        } finally {
            schedule();
        }
    }

    async function toggleRecording() {
        await client.call(running ? 'profile.stop' : 'profile.start');
        await refresh();
    }

    paint();

    return {
        element,
        show() {
            visible = true;
            refresh();
        },
        hide() {
            setExpanded(false);
            visible = false;
            schedule();
        },
        dispose() {
            setExpanded(false);
            backdrop.remove();
            visible = false;
            clearTimeout(timer);
            view.dispose();
        },
    };
}
