const VOLATILE = new Set([
    'math_number', 'math_positive_number', 'math_whole_number', 'math_integer', 'math_angle',
    'colour_picker', 'text', 'event_broadcast_menu', 'data_variable', 'data_listcontents',
]);

const MARK = '$';

const slotOf = (parent, id) => {
    for (const [name, input] of Object.entries(parent.inputs)) {
        if (input.block === id) return [name, false];
        if (input.shadow === id) return [name, true];
    }
    return null;
};

const looseKey = block => [block.opcode, block.x ?? null, block.y ?? null, ...Object.values(block.fields ?? {}).map(field => field.value)];

const sameKey = (a, b) => a.length === b.length && a.every((value, i) => value === b[i]);

const looseOrdinal = (container, block) => {
    const key = looseKey(block);
    let ordinal = 0;
    for (const id of container.getScripts()) {
        if (id === block.id) return ordinal;
        const other = container.getBlock(id);
        if (other && sameKey(looseKey(other), key)) ordinal++;
    }
    return ordinal;
};

export function canonicalBlockId(container, id) {
    if (typeof id !== 'string') return id;
    const block = container?.getBlock(id);
    if (block && VOLATILE.has(block.opcode)) {
        if (block.parent) {
            const parent = container.getBlock(block.parent);
            const slot = parent && slotOf(parent, id);
            if (slot) return MARK + JSON.stringify(slot[1] ? [block.parent, slot[0], 'shadow'] : [block.parent, slot[0]]);
        } else if (block.topLevel) {
            return MARK + JSON.stringify(['~', ...looseKey(block), looseOrdinal(container, block)]);
        }
    }
    return id.startsWith(MARK) ? MARK + JSON.stringify(id) : id;
}

export function realBlockId(container, id) {
    if (typeof id !== 'string' || !id.startsWith(MARK)) return id;
    const decoded = JSON.parse(id.slice(MARK.length));
    if (typeof decoded === 'string') return decoded;
    if (decoded[0] === '~') {
        const key = decoded.slice(1, -1);
        let ordinal = decoded.at(-1);
        for (const candidate of container?.getScripts() ?? []) {
            const block = container.getBlock(candidate);
            if (!block || !sameKey(looseKey(block), key)) continue;
            if (ordinal-- === 0) return candidate;
        }
        return id;
    }
    const [parentId, name, shadow] = decoded;
    const input = container?.getBlock(parentId)?.inputs[name];
    return (shadow ? input?.shadow : input?.block) ?? id;
}
