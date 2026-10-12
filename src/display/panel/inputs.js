import { h, replaceChildren } from './dom.js';
import { ICONS } from './icons.js';

const download = (filename, text) => {
    const link = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: filename });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

const describe = event => {
    switch (event.type) {
    case 'key': return `${event.down === false ? 'Release' : 'Press'} ${event.key}`;
    case 'mouse': {
        const where = event.x !== undefined ? ` at ${Math.round(event.x)}, ${Math.round(event.y)}` : '';
        if (event.down === true) return `Mouse down${where}${event.target ? ` on ${event.target}` : ''}`;
        if (event.down === false) return `Mouse up${where}`;
        return `Mouse move${where}`;
    }
    case 'flag': return 'Green flag';
    case 'stop': return 'Stop all';
    case 'answer': return `Answer "${event.text}"`;
    case 'poke': return `Set variable to ${JSON.stringify(event.value)}`;
    case 'list': return `List ${event.op}`;
    case 'hold': return `Hold variable (${event.mode ?? 'freeze'})`;
    case 'release': return 'Release held values';
    case 'wheel': return `Scroll ${event.deltaY < 0 ? 'up' : 'down'}`;
    case 'turbo': return `Turbo ${event.on ? 'on' : 'off'}`;
    default: return event.type;
    }
};

export function createInputsTab({ client }) {
    const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
    const showMoves = h('input', { type: 'checkbox', id: 'spre-moves' });
    const list = h('ul', { class: 'rows' });
    const note = h('div', { class: 'note' });
    const cut = h('button', { class: 'pill', title: 'Forget recorded inputs after this frame so you can play them differently', onClick: () => client.call('timeline.cut') }, h('span', { html: ICONS.cut }), 'Cut here');
    const element = h('div', {},
        h('div', { class: 'toolbar' },
            cut,
            h('button', {
                class: 'pill',
                onClick: async () => download('spre-movie.json', JSON.stringify(await client.call('spre.movie'), null, 1)),
            }, h('span', { html: ICONS.download }), 'Export movie'),
            h('button', { class: 'pill', onClick: () => file.click() }, h('span', { html: ICONS.upload }), 'Play a movie'),
            h('label', { class: 'pill', for: 'spre-moves' }, showMoves, 'Mouse moves'),
            file),
        note, list);
    let timer = null;

    const render = async () => {
        const { total, events, pending } = await client.call('input.log', { last: 300 });
        const shown = events.filter(event => showMoves.checked || !(event.type === 'mouse' && event.down === undefined));
        note.textContent = total === 0
            ? 'Everything you do to the project lands here, frame by frame: keys, clicks, answers and every value you change. Export it as a movie to replay the run exactly.'
            : `${total} input${total === 1 ? '' : 's'} so far${pending.length ? `, ${pending.length} still to come` : ''}.`;
        replaceChildren(list, [
            ...pending.slice(0, 50).map(event => ({ ...event, upcoming: true })).reverse(),
            ...shown.slice().reverse(),
        ].map(event => h('li', { class: 'row', style: event.upcoming ? { opacity: 0.55 } : undefined },
            h('span', { class: 'marker', style: { background: 'var(--event)' }, 'aria-hidden': 'true' }),
            h('span', { class: 'name' }, describe(event)),
            h('span', { class: 'value', style: { color: 'var(--muted)', fontFamily: 'var(--pixel)', fontSize: '10px', lineHeight: '24px' } }, `${event.frame}`),
            h('span'))));
    };

    showMoves.addEventListener('change', render);
    file.addEventListener('change', async () => {
        const [chosen] = file.files;
        if (!chosen) return;
        try {
            const movie = JSON.parse(await chosen.text());
            if (!Array.isArray(movie.events)) throw new Error('it has no events');
            await client.call('input.schedule', movie.events);
        } catch (error) {
            note.textContent = `Could not play that movie: ${error.message}`;
        }
        file.value = '';
        render();
    });

    return {
        element,
        show() {
            render();
            clearInterval(timer);
            timer = setInterval(render, 700);
        },
        hide() {
            clearInterval(timer);
        },
        update(status) {
            cut.disabled = !status.timeline || status.timeline.start === null;
        },
        dispose() {
            clearInterval(timer);
        },
    };
}
