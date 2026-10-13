import { h, replaceChildren } from './dom.js';
import { ICONS } from './icons.js';

const download = (filename, text) => {
    const link = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: filename });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

export function createStatesTab({ client }) {
    const name = h('input', { class: 'field', placeholder: 'Name this savestate', 'aria-label': 'Savestate name' });
    name.addEventListener('keydown', event => {
        event.stopPropagation();
        if (event.key === 'Enter') save();
    });
    const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
    const list = h('ul', { class: 'rows' });
    const note = h('div', { class: 'note' });
    const element = h('div', {},
        h('div', { class: 'toolbar' },
            name,
            h('button', { class: 'pill strong', onClick: () => save() }, h('span', { html: ICONS.save }), 'Save'),
            h('button', { class: 'pill', onClick: () => file.click() }, h('span', { html: ICONS.upload }), 'Import'),
            file),
        list, note);

    const render = async () => {
        const states = await client.call('states.list');
        note.textContent = states.length ? '' : 'A savestate holds the whole world: every sprite, clone, script and pen line. Load one to jump straight back.';
        replaceChildren(list, states.slice().reverse().map(state => h('li', { class: 'row' },
            h('span', { class: 'marker', style: { background: 'var(--accent)' }, 'aria-hidden': 'true' }),
            h('span', { class: 'name' }, state.name),
            h('span', { class: 'value', style: { color: 'var(--muted)' } }, `frame ${state.frame}`),
            h('span', { class: 'actions' },
                h('button', { class: 'icon-button small', title: `Load ${state.name}`, 'aria-label': `Load ${state.name}`, html: ICONS.restore, onClick: () => client.call('states.load', state.name) }),
                h('button', {
                    class: 'icon-button small', title: `Export ${state.name}`, 'aria-label': `Export ${state.name}`, html: ICONS.download,
                    onClick: async () => download(`${state.name}.spre.json`, await client.call('states.export', state.name)),
                }),
                h('button', {
                    class: 'icon-button small', title: `Delete ${state.name}`, 'aria-label': `Delete ${state.name}`, html: ICONS.trash,
                    onClick: async () => { await client.call('states.drop', state.name); render(); },
                })))));
    };

    const save = async () => {
        await client.call('states.save', name.value.trim() || undefined);
        name.value = '';
        render();
    };

    file.addEventListener('change', async () => {
        const [chosen] = file.files;
        if (!chosen) return;
        try {
            await client.call('states.import', await chosen.text());
            note.textContent = '';
        } catch (error) {
            note.textContent = `That file is not a SPRE savestate: ${error.message}`;
        }
        file.value = '';
        render();
    });

    return { element, show: render };
}
