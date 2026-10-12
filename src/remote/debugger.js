const LIST_PREVIEW = 8;

const preview = value => (Array.isArray(value) ? { length: value.length, items: value.slice(0, LIST_PREVIEW) } : value);

const looseEquals = (a, b) => {
    if (String(a) === String(b)) return true;
    const x = Number(a);
    const y = Number(b);
    return String(a).trim() !== '' && String(b).trim() !== '' && !Number.isNaN(x) && x === y;
};

const matcher = filter => {
    if (!filter) return () => true;
    if (filter.startsWith('/') && filter.lastIndexOf('/') > 0) {
        const cut = filter.lastIndexOf('/');
        const pattern = new RegExp(filter.slice(1, cut), filter.slice(cut + 1));
        return name => pattern.test(name);
    }
    const needle = filter.toLowerCase();
    return name => name.toLowerCase().includes(needle);
};

export function createDebugger({ spre, vm }) {
    const runtime = vm.runtime;
    const states = new Map();
    let scanHits = null;
    let stateCounter = 0;

    const refOf = target => spre.refOf(target);
    const nameOf = target => (target.isStage ? 'Stage' : target.sprite.name);

    const heldKeys = () => {
        const keys = new Set();
        for (const hold of spre.memory.holds()) keys.add(`${hold.target}|${hold.variable}`);
        return keys;
    };

    const eachVariable = function* ({ target, kind = 'any', clones = false } = {}) {
        for (const owner of runtime.targets) {
            if (!clones && !owner.isOriginal) continue;
            const ref = refOf(owner);
            if (target && ref !== target) continue;
            for (const variable of Object.values(owner.variables)) {
                if (variable.type === 'broadcast_msg') continue;
                const isList = variable.type === 'list';
                if (kind === 'var' && isList) continue;
                if (kind === 'list' && !isList) continue;
                yield { owner, ref, variable };
            }
        }
    };

    const row = ({ owner, ref, variable }, held) => ({
        target: ref,
        targetName: nameOf(owner),
        clone: !owner.isOriginal,
        id: variable.id,
        name: variable.name,
        kind: variable.type === 'list' ? 'list' : 'var',
        cloud: Boolean(variable.isCloud),
        value: preview(variable.value),
        held: held.has(`${ref}|${variable.id}`),
    });

    const requireVariable = (target, id) => {
        const variable = spre.memory.variableOf(target, id);
        if (!variable) throw new Error(`no variable ${id} on ${target}`);
        return variable;
    };

    const scanRows = () => scanHits.map(hit => {
        const variable = spre.memory.variableOf(hit.target, hit.variable);
        const target = spre.memory.targetOf(hit.target);
        return { target: hit.target, targetName: target ? nameOf(target) : hit.target, id: hit.variable, name: hit.name, value: variable?.value, previous: hit.value };
    });

    return {
        'targets.list'() {
            return runtime.targets.map(target => ({
                target: refOf(target),
                name: nameOf(target),
                isStage: target.isStage,
                clone: !target.isOriginal,
                x: target.x,
                y: target.y,
                direction: target.direction,
                size: target.size,
                visible: target.visible,
                costume: target.getCostumes()[target.currentCostume]?.name ?? null,
            }));
        },

        'vars.list'({ target, kind = 'any', filter = '', clones = false, offset = 0, limit = 200 } = {}) {
            const accept = matcher(filter);
            const held = heldKeys();
            const rows = [];
            let total = 0;
            for (const entry of eachVariable({ target, kind, clones })) {
                if (!accept(entry.variable.name)) continue;
                if (total >= offset && rows.length < limit) rows.push(row(entry, held));
                total++;
            }
            return { total, rows };
        },

        'vars.get'(target, id, { offset = 0, limit = 1000 } = {}) {
            const variable = requireVariable(target, id);
            if (!Array.isArray(variable.value)) return variable.value;
            return { length: variable.value.length, offset, items: variable.value.slice(offset, offset + limit) };
        },

        'vars.set'(target, id, value) {
            requireVariable(target, id);
            spre.input.send({ type: 'poke', target, variable: id, value });
            return true;
        },

        'lists.edit'(target, id, op, { index, value, values } = {}) {
            requireVariable(target, id);
            spre.input.send({ type: 'list', target, variable: id, op, index, value, values });
            return true;
        },

        'holds.set'(hold) {
            const variable = requireVariable(hold.target, hold.variable);
            const filled = { ...hold };
            if ((filled.mode ?? 'freeze') === 'freeze' && filled.value === undefined) {
                const current = filled.index === undefined ? variable.value : variable.value[filled.index - 1];
                filled.value = Array.isArray(current) ? [...current] : current;
            }
            spre.input.send({ type: 'hold', ...filled });
            return true;
        },

        'holds.release'(selection = {}) {
            spre.input.send({ type: 'release', ...selection });
            return true;
        },

        'holds.list'() {
            return spre.memory.holds();
        },

        'scan.start'(value) {
            scanHits = [];
            for (const { ref, variable } of eachVariable({ kind: 'var', clones: true })) {
                if (value === undefined || looseEquals(variable.value, value)) scanHits.push({ target: ref, variable: variable.id, name: variable.name, value: variable.value });
            }
            return { count: scanHits.length };
        },

        'scan.narrow'(mode, value) {
            if (!scanHits) throw new Error('start a scan first');
            const keep = {
                equals: (now) => looseEquals(now, value),
                changed: (now, before) => !looseEquals(now, before),
                unchanged: (now, before) => looseEquals(now, before),
                increased: (now, before) => Number(now) > Number(before),
                decreased: (now, before) => Number(now) < Number(before),
            }[mode];
            if (!keep) throw new Error(`unknown scan mode ${mode}`);
            scanHits = scanHits.flatMap(hit => {
                const variable = spre.memory.variableOf(hit.target, hit.variable);
                if (!variable || !keep(variable.value, hit.value)) return [];
                return [{ ...hit, value: variable.value }];
            });
            return { count: scanHits.length };
        },

        'scan.results'({ offset = 0, limit = 200 } = {}) {
            if (!scanHits) return { count: 0, rows: [] };
            return { count: scanHits.length, rows: scanRows().slice(offset, offset + limit) };
        },

        'scan.reset'() {
            scanHits = null;
            return true;
        },

        'states.save'(name) {
            const label = name || `state ${++stateCounter}`;
            states.delete(label);
            states.set(label, { name: label, frame: spre.frame, savedAt: Date.now(), snapshot: spre.snapshot() });
            return { name: label, frame: spre.frame };
        },

        'states.load'(name) {
            const label = name ?? [...states.keys()].at(-1);
            const state = states.get(label);
            if (!state) throw new Error(`no savestate named "${label}"`);
            spre.restore(state.snapshot);
            return { name: label, frame: spre.frame };
        },

        'states.list'() {
            return [...states.values()].map(({ name, frame, savedAt }) => ({ name, frame, savedAt }));
        },

        'states.drop'(name) {
            return states.delete(name);
        },

        'states.export'(name) {
            const state = states.get(name);
            if (!state) throw new Error(`no savestate named "${name}"`);
            return JSON.stringify(state);
        },

        'states.import'(data, name) {
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            if (!parsed?.snapshot?.spre) throw new Error('not a SPRE savestate');
            const label = name || parsed.name || `state ${++stateCounter}`;
            states.set(label, { ...parsed, name: label });
            return { name: label, frame: parsed.frame };
        },

        'input.send'(event) {
            spre.input.send(event);
            return true;
        },

        'input.schedule'(events) {
            spre.input.schedule(events);
            return events.length;
        },

        'input.log'({ last = 200 } = {}) {
            const log = spre.input.log();
            return { total: log.length, events: log.slice(-last), pending: spre.input.pending().slice(0, last) };
        },

        'spre.hash'() {
            return spre.hash();
        },

        'spre.snapshot'() {
            return JSON.stringify(spre.snapshot());
        },

        'spre.movie'() {
            return spre.movie();
        },

        'project.flag'() {
            spre.greenFlag();
            return true;
        },

        'project.stop'() {
            spre.stopAll();
            return true;
        },

        'project.turbo'(on = true) {
            spre.turbo(on);
            return true;
        },
    };
}
