import { formatValue, h, replaceChildren } from './dom.js';
import { ICONS } from './icons.js';

const POLL_MS = 350;
const NUMBER = /^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

export const parseValue = text => (NUMBER.test(text.trim()) && String(Number(text)) === text.trim() ? Number(text) : text);

const editable = ({ value, held, onCommit, label }) => {
    const input = h('input', { class: `value${held ? ' held' : ''}`, value: formatValue(value), 'aria-label': label, spellcheck: 'false' });
    input.dataset.committed = input.value;
    const commit = () => {
        if (input.value === input.dataset.committed) return;
        input.dataset.committed = input.value;
        onCommit(parseValue(input.value));
    };
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') input.blur();
        if (event.key === 'Escape') {
            input.value = input.dataset.committed;
            input.blur();
        }
        event.stopPropagation();
    });
    input.addEventListener('keyup', event => event.stopPropagation());
    input.addEventListener('blur', commit);
    return input;
};

const refreshInput = (input, value, held) => {
    input.classList.toggle('held', held);
    if (input.matches(':focus')) return;
    const text = formatValue(value);
    if (input.value !== text) input.value = text;
    input.dataset.committed = text;
};

export function createMemoryTab({ client }) {
    const filter = h('input', { class: 'field', type: 'search', placeholder: 'Filter by name or /regex/', 'aria-label': 'Filter' });
    const scope = h('select', { class: 'field', 'aria-label': 'Sprite' }, h('option', { value: '' }, 'All sprites'));
    const kind = h('select', { class: 'field', 'aria-label': 'Kind' },
        h('option', { value: 'any' }, 'Variables and lists'), h('option', { value: 'var' }, 'Variables'), h('option', { value: 'list' }, 'Lists'));
    const counter = h('span', { class: 'counter' });
    const list = h('ul', { class: 'rows' });
    const message = h('div', { class: 'note' });
    const element = h('div', {}, h('div', { class: 'toolbar' }, filter, scope, kind), list, message);
    const rows = new Map();
    const open = new Set();
    let timer = null;
    let refreshing = false;

    for (const control of [filter, scope, kind]) control.addEventListener('input', () => refresh());
    for (const control of [filter]) control.addEventListener('keydown', event => event.stopPropagation());

    const toggleHold = (row, selection) => {
        if (row.held) client.call('holds.release', selection);
        else client.call('holds.set', { ...selection, mode: 'freeze' });
    };

    const listItems = async (row, drawer) => {
        const holds = await client.call('holds.list');
        const heldIndexes = new Set(holds.filter(hold => hold.target === row.data.target && hold.variable === row.data.id && hold.index !== undefined).map(hold => hold.index));
        const data = await client.call('vars.get', row.data.target, row.data.id, { limit: 200 });
        const selection = { target: row.data.target, variable: row.data.id };
        replaceChildren(drawer,
            data.items.map((item, i) => {
                const index = i + 1;
                const held = heldIndexes.has(index);
                return h('div', { class: 'item' },
                    h('span', { class: 'index' }, index),
                    editable({ value: item, held, label: `${row.data.name} item ${index}`, onCommit: value => client.call('lists.edit', row.data.target, row.data.id, 'set', { index, value }) }),
                    h('button', {
                        class: `icon-button small${held ? ' held' : ''}`,
                        title: held ? 'Release this item' : 'Hold this item',
                        'aria-label': held ? 'Release this item' : 'Hold this item',
                        html: ICONS.snow,
                        onClick: async () => {
                            await client.call(held ? 'holds.release' : 'holds.set', held ? { ...selection, index } : { ...selection, index, mode: 'freeze' });
                            listItems(row, drawer);
                        },
                    }));
            }),
            data.length > data.items.length ? h('div', { class: 'note' }, `Showing ${data.items.length} of ${data.length} items`) : null,
            h('div', { style: { display: 'flex', gap: '6px', padding: '6px 4px 2px' } },
                h('button', { class: 'pill', onClick: async () => { await client.call('lists.edit', row.data.target, row.data.id, 'push', { value: '' }); listItems(row, drawer); } }, 'Add item'),
                h('button', { class: 'pill', onClick: async () => { await client.call('lists.edit', row.data.target, row.data.id, 'wipe'); listItems(row, drawer); } }, 'Blank every item'),
                h('button', { class: 'pill', onClick: async () => { await client.call('lists.edit', row.data.target, row.data.id, 'clear'); listItems(row, drawer); } }, 'Remove all')));
    };

    const holdDrawer = (row, drawer) => {
        const selection = { target: row.data.target, variable: row.data.id };
        const low = h('input', { class: 'field', style: { flex: '0 1 64px' }, value: '1', 'aria-label': 'Lowest value' });
        const high = h('input', { class: 'field', style: { flex: '0 1 64px' }, value: '10', 'aria-label': 'Highest value' });
        for (const field of [low, high]) field.addEventListener('keydown', event => event.stopPropagation());
        replaceChildren(drawer, h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '4px' } },
            h('button', { class: 'pill', onClick: () => client.call('holds.set', { ...selection, mode: 'freeze' }) }, 'Freeze here'),
            h('button', { class: 'pill', onClick: () => client.call('holds.set', { ...selection, mode: 'blank' }) }, 'Keep blank'),
            h('button', { class: 'pill', onClick: () => client.call('holds.set', { ...selection, mode: 'random', low: parseValue(low.value), high: parseValue(high.value) }) }, 'Randomize'),
            low, high,
            h('button', { class: 'pill', onClick: () => client.call('holds.release', selection) }, 'Release')));
    };

    const createRow = data => {
        const key = `${data.target}|${data.id}`;
        const row = { data, held: data.held };
        const marker = h('span', { class: `marker${data.kind === 'list' ? ' list' : ''}`, 'aria-hidden': 'true' });
        const name = h('button', { class: 'name', style: { textAlign: 'left' }, 'aria-expanded': 'false', title: data.kind === 'list' ? 'Show items' : 'Hold options' },
            data.name, h('span', { class: 'owner' }, data.clone ? `${data.targetName} clone` : data.targetName));
        const value = data.kind === 'list'
            ? h('button', { class: 'value list', onClick: () => name.click() }, formatValue(data.value))
            : editable({ value: data.value, held: data.held, label: data.name, onCommit: next => client.call('vars.set', data.target, data.id, next) });
        const freeze = h('button', { class: `icon-button small${data.held ? ' held' : ''}`, html: ICONS.snow, onClick: () => toggleHold(row, { target: data.target, variable: data.id }) });
        const drawer = h('div', { class: 'items', hidden: true });
        const item = h('li', {}, h('div', { class: 'row' }, marker, name, value, h('span', { class: 'actions' }, freeze)), drawer);
        name.addEventListener('click', () => {
            const expanded = drawer.hidden;
            drawer.hidden = !expanded;
            name.setAttribute('aria-expanded', String(expanded));
            if (expanded) {
                open.add(key);
                if (data.kind === 'list') listItems(row, drawer);
                else holdDrawer(row, drawer);
            } else {
                open.delete(key);
            }
        });
        row.update = next => {
            row.data = next;
            row.held = next.held;
            freeze.classList.toggle('held', next.held);
            const label = next.held ? `Release ${next.name}` : `Freeze ${next.name}`;
            freeze.title = label;
            freeze.setAttribute('aria-label', label);
            if (next.kind === 'list') {
                value.textContent = formatValue(next.value);
                value.classList.toggle('held', next.held);
            } else {
                refreshInput(value, next.value, next.held);
            }
        };
        row.element = item;
        row.update(data);
        return row;
    };

    const refreshScope = async () => {
        const targets = await client.call('targets.list');
        const chosen = scope.value;
        replaceChildren(scope, h('option', { value: '' }, 'All sprites'),
            targets.filter(target => !target.clone).map(target => h('option', { value: target.target }, target.name)));
        scope.value = chosen;
    };

    const refresh = async () => {
        if (refreshing) return;
        refreshing = true;
        try {
            const result = await client.call('vars.list', { target: scope.value || undefined, kind: kind.value, filter: filter.value.trim(), limit: 300 });
            const seen = new Set();
            const ordered = result.rows.map(data => {
                const key = `${data.target}|${data.id}`;
                seen.add(key);
                let row = rows.get(key);
                if (row) row.update(data);
                else rows.set(key, row = createRow(data));
                return row.element;
            });
            for (const key of [...rows.keys()]) if (!seen.has(key)) rows.delete(key);
            const current = [...list.children];
            if (current.length !== ordered.length || current.some((child, i) => child !== ordered[i])) replaceChildren(list, ordered);
            message.textContent = result.total === 0
                ? (filter.value ? 'Nothing matches that filter.' : 'This project has no variables or lists here.')
                : result.total > result.rows.length ? `Showing ${result.rows.length} of ${result.total}. Narrow the filter to see the rest.` : '';
            counter.textContent = String(result.total);
        } catch (error) {
            message.textContent = error.message;
        } finally {
            refreshing = false;
        }
    };

    return {
        element,
        show() {
            refreshScope();
            refresh();
            clearInterval(timer);
            timer = setInterval(refresh, POLL_MS);
        },
        hide() {
            clearInterval(timer);
            timer = null;
        },
        dispose() {
            clearInterval(timer);
        },
    };
}
