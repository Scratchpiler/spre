import { loadProject } from '../src/node.js';

export { default as test } from 'node:test';
export { default as assert } from 'node:assert/strict';

let nextId = 0;
const freshId = prefix => `${prefix}${nextId++}`;

const hexId = text => [...text].map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0')).join('').padEnd(32, '0').slice(0, 32);

const SVG_SHAPE = ({ size, fill, shape }) => {
    const body = !fill ? ''
        : shape === 'circle' ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${fill}"/>`
            : `<rect width="${size}" height="${size}" fill="${fill}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${body}</svg>`;
};

export const op = (opcode, inputs = {}, fields = {}) => ({ opcode, inputs, fields });
export const menu = (opcode, field, value) => ({ opcode, inputs: {}, fields: { [field]: value }, shadow: true });
export const variable = name => ({ variable: name });
export const broadcast = name => ({ broadcast: name });

function emit(blocks, node, parent, topLevel, scope) {
    const id = freshId('b');
    const block = {
        opcode: node.opcode,
        next: null,
        parent,
        inputs: {},
        fields: {},
        shadow: Boolean(node.shadow),
        topLevel,
    };
    if (topLevel) Object.assign(block, { x: 0, y: 0 });
    blocks[id] = block;
    for (const [name, value] of Object.entries(node.fields ?? {})) {
        if (value && typeof value === 'object' && 'variable' in value) {
            const ref = scope.lookup(value.variable);
            block.fields[name] = [value.variable, ref.id];
        } else if (value && typeof value === 'object' && 'broadcast' in value) {
            block.fields[name] = [value.broadcast, scope.broadcast(value.broadcast)];
        } else {
            block.fields[name] = [String(value), null];
        }
    }
    for (const [name, value] of Object.entries(node.inputs ?? {})) {
        if (Array.isArray(value)) {
            const first = emitStack(blocks, value, id, scope);
            block.inputs[name] = [2, first];
        } else if (value && typeof value === 'object' && 'variable' in value) {
            const ref = scope.lookup(value.variable);
            block.inputs[name] = [3, [ref.list ? 13 : 12, value.variable, ref.id], [10, '']];
        } else if (value && typeof value === 'object' && 'broadcast' in value) {
            block.inputs[name] = [1, [11, value.broadcast, scope.broadcast(value.broadcast)]];
        } else if (value && typeof value === 'object' && value.opcode) {
            const child = emit(blocks, value, id, false, scope);
            block.inputs[name] = value.shadow ? [1, child] : [3, child, [10, '']];
        } else if (typeof value === 'number') {
            block.inputs[name] = [1, [4, String(value)]];
        } else if (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) {
            block.inputs[name] = [1, [9, value]];
        } else {
            block.inputs[name] = [1, [10, String(value)]];
        }
    }
    if (node.mutation) block.mutation = node.mutation;
    return id;
}

function emitStack(blocks, nodes, parent, scope) {
    let first = null;
    let previous = null;
    for (const node of nodes) {
        const id = emit(blocks, node, previous ?? parent, false, scope);
        if (previous) blocks[previous].next = id; else first = id;
        previous = id;
    }
    return first;
}

function emitScript(blocks, [hat, ...body], scope) {
    const hatId = emit(blocks, hat, null, true, scope);
    if (body.length) {
        const first = emitStack(blocks, body, hatId, scope);
        blocks[hatId].next = first;
    }
    return hatId;
}

export function project({ stage = {}, sprites = {}, extensions = [] } = {}) {
    nextId = 0;
    const assets = new Map();
    const costume = spec => {
        const svg = SVG_SHAPE(spec);
        const name = `${spec.shape ?? 'box'}${spec.size}${spec.fill ?? ''}`;
        const assetId = hexId(name);
        assets.set(`${assetId}.svg`, svg);
        return { name, assetId, md5ext: `${assetId}.svg`, dataFormat: 'svg', rotationCenterX: spec.size / 2, rotationCenterY: spec.size / 2 };
    };
    const stageVars = {};
    const stageLists = {};
    const broadcasts = {};
    const declare = (owner, lists, vars) => {
        const scope = {};
        for (const [name, value] of Object.entries(vars ?? {})) {
            const id = freshId('v');
            owner[id] = [name, value];
            scope[name] = { id, list: false };
        }
        for (const [name, value] of Object.entries(lists ?? {})) {
            const id = freshId('l');
            owner.__lists[id] = [name, value];
            scope[name] = { id, list: true };
        }
        return scope;
    };
    const stageOwner = Object.assign(stageVars, { __lists: stageLists });
    const stageScope = declare(stageOwner, stage.lists, stage.variables);
    const broadcastIds = new Map();
    const scopeFor = local => ({
        broadcast(name) {
            if (!broadcastIds.has(name)) throw new Error(`test project has no broadcast ${name}`);
            return broadcastIds.get(name);
        },
        lookup(name) {
            const ref = local[name] ?? stageScope[name];
            if (!ref) throw new Error(`test project has no variable ${name}`);
            return ref;
        },
    });
    for (const name of stage.broadcasts ?? []) {
        const id = freshId('m');
        broadcasts[id] = name;
        broadcastIds.set(name, id);
    }

    const targetJSON = (name, spec, isStage, layerOrder, scope, varsOwner) => {
        const blocks = {};
        for (const script of spec.scripts ?? []) emitScript(blocks, script, scope);
        const { __lists: lists, ...variables } = varsOwner;
        return {
            isStage,
            name,
            variables,
            lists,
            broadcasts: isStage ? broadcasts : {},
            blocks,
            comments: {},
            currentCostume: 0,
            costumes: (spec.costumes ?? [{ size: spec.costumeSize ?? (isStage ? 2 : 50), fill: spec.fill, shape: spec.shape }]).map(costume),
            sounds: (spec.sounds ?? []).map(sound => ({
                name: sound.name, assetId: hexId(sound.name), dataFormat: 'wav', md5ext: `${hexId(sound.name)}.wav`, rate: sound.rate ?? 48000, sampleCount: sound.sampleCount,
            })),
            volume: 100,
            layerOrder,
            ...(isStage
                ? { tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null }
                : {
                    visible: spec.visible ?? true,
                    x: spec.x ?? 0,
                    y: spec.y ?? 0,
                    size: spec.size ?? 100,
                    direction: spec.direction ?? 90,
                    draggable: spec.draggable ?? false,
                    rotationStyle: 'all around',
                }),
        };
    };

    const targets = [targetJSON('Stage', stage, true, 0, scopeFor({}), stageOwner)];
    let layer = 1;
    for (const [name, spec] of Object.entries(sprites)) {
        const owner = { __lists: {} };
        const scope = declare(owner, spec.lists, spec.variables);
        targets.push(targetJSON(name, spec, false, layer++, scopeFor(scope), owner));
    }
    return { json: { targets, monitors: [], extensions, meta: { semver: '3.0.0', vm: '0.2.0', agent: 'spre-tests' } }, assets };
}

export async function zipProject(built) {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const JSZip = createRequire(require.resolve('scratch-vm'))('jszip');
    const zip = new JSZip();
    zip.file('project.json', JSON.stringify(built.json));
    for (const [name, data] of built.assets) zip.file(name, data);
    return zip.generateAsync({ type: 'uint8array' });
}

export async function boot(spec, options = {}) {
    const built = project(spec);
    const data = await zipProject(built);
    const loaded = await loadProject(data, options);
    return { ...loaded, data };
}

export const stageVar = (vm, name) => Object.values(vm.runtime.getTargetForStage().variables).find(v => v.name === name)?.value;
export const sprite = (vm, name) => vm.runtime.getSpriteTargetByName(name);
export const spriteVar = (vm, spriteName, name) => Object.values(sprite(vm, spriteName).variables).find(v => v.name === name)?.value;

export const flag = () => op('event_whenflagclicked');
export const setVar = (name, value) => op('data_setvariableto', { VALUE: value }, { VARIABLE: variable(name) });
export const changeVar = (name, by) => op('data_changevariableby', { VALUE: by }, { VARIABLE: variable(name) });
export const forever = body => op('control_forever', { SUBSTACK: body });
export const repeat = (times, body) => op('control_repeat', { TIMES: times, SUBSTACK: body });
export const wait = secs => op('control_wait', { DURATION: secs });
export const addToList = (name, item) => op('data_addtolist', { ITEM: item }, { LIST: variable(name) });

export const procedure = ({ code, names, defaults = names.map(() => ''), warp = false }) => {
    const ids = names.map(name => `${code}:${name}`);
    return {
        ids,
        mutation: { tagName: 'mutation', children: [], proccode: code, argumentids: JSON.stringify(ids), argumentnames: JSON.stringify(names), argumentdefaults: JSON.stringify(defaults), warp: String(warp) },
    };
};

export const define = (spec, body) => [
    op('procedures_definition', { custom_block: { ...op('procedures_prototype', {}, {}), shadow: true, mutation: spec.mutation } }),
    ...body,
];

export const call = (spec, ...args) => ({
    ...op('procedures_call', Object.fromEntries(spec.ids.map((id, i) => [id, args[i] ?? ''])), {}),
    mutation: spec.mutation,
});

export const param = name => op('argument_reporter_string_number', {}, { VALUE: name });
