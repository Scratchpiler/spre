import { formatValue, h, replaceChildren } from './dom.js';
import { ICONS } from './icons.js';
import { parseValue } from './memory.js';

export function createScanTab({ client }) {
    const value = h('input', { class: 'field', placeholder: 'Value to look for, e.g. your score', 'aria-label': 'Value' });
    value.addEventListener('keydown', event => {
        event.stopPropagation();
        if (event.key === 'Enter') start();
    });
    const summary = h('div', { class: 'note' });
    const list = h('ul', { class: 'rows' });
    const narrowButtons = [
        ['equals', 'Still equals'],
        ['changed', 'Changed'],
        ['unchanged', 'Unchanged'],
        ['increased', 'Went up'],
        ['decreased', 'Went down'],
    ].map(([mode, label]) => h('button', { class: 'pill', disabled: true, onClick: () => narrow(mode) }, label));
    const element = h('div', {},
        h('div', { class: 'toolbar' },
            value,
            h('button', { class: 'pill strong', onClick: () => start() }, h('span', { html: ICONS.search }), 'Find'),
            h('button', { class: 'pill', title: 'Start from every variable, then narrow by how they change', onClick: () => start(true) }, 'Take all'),
            narrowButtons,
            h('button', { class: 'pill', onClick: () => reset() }, 'Reset')),
        summary, list);
    let timer = null;
    let active = false;

    const describe = count => {
        if (!active) return 'Type a value you can see in the game, then press Find. Change it in the game and narrow the results until one variable is left.';
        if (count === 0) return 'No variables match. Reset and try a different value.';
        return count === 1 ? '1 variable matches.' : `${count} variables match.`;
    };

    const render = async () => {
        const result = await client.call('scan.results', { limit: 200 });
        summary.textContent = describe(result.count);
        narrowButtons.forEach(button => { button.disabled = !active; });
        replaceChildren(list, result.rows.map(row => h('li', { class: 'row' },
            h('span', { class: 'marker', 'aria-hidden': 'true' }),
            h('span', { class: 'name' }, row.name, h('span', { class: 'owner' }, row.targetName)),
            h('span', { class: 'value', title: `was ${formatValue(row.previous)}` }, formatValue(row.value)),
            h('span', { class: 'actions' }, h('button', {
                class: 'icon-button small', title: `Freeze ${row.name}`, 'aria-label': `Freeze ${row.name}`, html: ICONS.snow,
                onClick: () => client.call('holds.set', { target: row.target, variable: row.id, mode: 'freeze' }),
            })))));
    };

    const start = async (everything = false) => {
        const text = value.value.trim();
        if (!everything && text === '') {
            value.focus();
            return;
        }
        await client.call('scan.start', everything ? undefined : parseValue(text));
        active = true;
        render();
    };

    const narrow = async mode => {
        await client.call('scan.narrow', mode, parseValue(value.value.trim()));
        render();
    };

    const reset = async () => {
        await client.call('scan.reset');
        active = false;
        render();
    };

    return {
        element,
        show() {
            render();
            clearInterval(timer);
            timer = setInterval(() => active && render(), 500);
        },
        hide() {
            clearInterval(timer);
        },
        dispose() {
            clearInterval(timer);
        },
    };
}
