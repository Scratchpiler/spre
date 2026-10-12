const holdKey = ({ target, variable, index }) => `${target}|${variable}|${index ?? ''}`;

const isIntLike = value => typeof value === 'number' ? Number.isInteger(value) : !String(value).includes('.');

export function createMemory(ctx) {
    const { runtime } = ctx;
    const holds = new Map();

    const targetOf = ref => {
        if (ref === 'stage') return runtime.getTargetForStage();
        if (ref.startsWith('sprite:')) return runtime.targets.find(t => t.isOriginal && !t.isStage && t.sprite.name === ref.slice(7));
        if (ref.startsWith('clone:')) return runtime.targets.find(t => !t.isOriginal && t.id === ref.slice(6));
        return undefined;
    };

    const variableOf = (ref, id) => targetOf(ref)?.variables[id];

    const requireVariable = (ref, id) => {
        const variable = variableOf(ref, id);
        if (!variable) throw new Error(`no variable ${id} on ${ref}`);
        return variable;
    };

    const randomBetween = (low, high) => {
        const from = Number(low) || 0;
        const to = Number(high) || 0;
        const lo = Math.min(from, to);
        const hi = Math.max(from, to);
        const draw = ctx.rng.next('debugger');
        if (isIntLike(low) && isIntLike(high)) return lo + Math.floor(draw * ((hi + 1) - lo));
        return (draw * (hi - lo)) + lo;
    };

    const applyHold = hold => {
        const variable = variableOf(hold.target, hold.variable);
        if (!variable) return;
        const value = hold.mode === 'random' ? randomBetween(hold.low, hold.high) : hold.mode === 'blank' ? '' : hold.value;
        if (variable.type === 'list') {
            if (hold.index === undefined) {
                if (hold.mode === 'blank') variable.value = [];
                else if (Array.isArray(hold.value)) variable.value = [...hold.value];
                return;
            }
            if (hold.index >= 1 && hold.index <= variable.value.length) variable.value[hold.index - 1] = value;
            return;
        }
        variable.value = value;
    };

    const editList = (variable, { op, index, value, values }) => {
        const list = variable.value;
        switch (op) {
        case 'push': list.push(value); break;
        case 'insert': list.splice(Math.max(0, index - 1), 0, value); break;
        case 'set': if (index >= 1 && index <= list.length) list[index - 1] = value; break;
        case 'remove': if (index >= 1 && index <= list.length) list.splice(index - 1, 1); break;
        case 'clear': list.length = 0; break;
        case 'wipe': list.fill(''); break;
        case 'replace': variable.value = [...values]; break;
        default: throw new Error(`unknown list operation ${op}`);
        }
    };

    return {
        targetOf,
        variableOf,

        apply(event) {
            switch (event.type) {
            case 'poke':
                requireVariable(event.target, event.variable).value = event.value;
                break;
            case 'list':
                editList(requireVariable(event.target, event.variable), event);
                break;
            case 'hold': {
                const hold = { target: event.target, variable: event.variable, index: event.index, mode: event.mode ?? 'freeze', value: event.value, low: event.low, high: event.high };
                holds.delete(holdKey(hold));
                holds.set(holdKey(hold), hold);
                applyHold(hold);
                break;
            }
            case 'release':
                if (event.target === undefined) holds.clear();
                else {
                    for (const [key, hold] of holds) {
                        if (hold.target !== event.target) continue;
                        if (event.variable !== undefined && hold.variable !== event.variable) continue;
                        if (event.index !== undefined && hold.index !== event.index) continue;
                        holds.delete(key);
                    }
                }
                break;
            }
        },

        applyHolds() {
            for (const hold of holds.values()) applyHold(hold);
        },

        holds: () => [...holds.values()].map(hold => ({ ...hold })),
        save: () => [...holds.values()].map(hold => ({ ...hold })),
        load(saved) {
            holds.clear();
            for (const hold of saved) holds.set(holdKey(hold), { ...hold });
        },
    };
}
