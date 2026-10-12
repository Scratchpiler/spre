const TYPED = {
    Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array,
};
const MARK = '$bin';
const NUMBER_MARK = '$num';
const ALIGN = 8;

const extract = (value, blobs) => {
    if (value === null || typeof value !== 'object') {
        if (typeof value === 'number' && !Number.isFinite(value)) return { [NUMBER_MARK]: String(value) };
        return value;
    }
    if (ArrayBuffer.isView(value) && TYPED[value.constructor.name]) {
        blobs.push(value);
        return { [MARK]: blobs.length - 1, type: value.constructor.name, length: value.length };
    }
    if (Array.isArray(value)) return value.map(item => extract(item, blobs));
    const out = {};
    for (const [key, item] of Object.entries(value)) if (item !== undefined) out[key] = extract(item, blobs);
    return out;
};

const restore = (value, views) => {
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(item => restore(item, views));
    if (MARK in value && typeof value[MARK] === 'number') return views[value[MARK]];
    if (NUMBER_MARK in value && Object.keys(value).length === 1) return Number(value[NUMBER_MARK]);
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = restore(item, views);
    return out;
};

const padded = n => Math.ceil(n / ALIGN) * ALIGN;

export function encodeMessage(message) {
    const blobs = [];
    const json = new TextEncoder().encode(JSON.stringify({ message: extract(message, blobs), sizes: blobs.map(b => b.byteLength) }));
    let total = padded(4 + json.length);
    for (const blob of blobs) total += padded(blob.byteLength);
    const bytes = new Uint8Array(total);
    new DataView(bytes.buffer).setUint32(0, json.length, true);
    bytes.set(json, 4);
    let at = padded(4 + json.length);
    for (const blob of blobs) {
        bytes.set(new Uint8Array(blob.buffer, blob.byteOffset, blob.byteLength), at);
        at += padded(blob.byteLength);
    }
    return bytes;
}

export function decodeMessage(input) {
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    const owned = bytes.byteOffset % ALIGN === 0 ? bytes : bytes.slice();
    const jsonLength = new DataView(owned.buffer, owned.byteOffset).getUint32(0, true);
    const { message, sizes } = JSON.parse(new TextDecoder().decode(owned.subarray(4, 4 + jsonLength)));
    const kinds = [];
    const collect = value => {
        if (value === null || typeof value !== 'object') return;
        if (MARK in value && typeof value[MARK] === 'number') kinds[value[MARK]] = value;
        else for (const item of Object.values(value)) collect(item);
    };
    collect(message);
    const views = [];
    let at = padded(4 + jsonLength);
    sizes.forEach((size, i) => {
        const Type = TYPED[kinds[i].type];
        views[i] = new Type(owned.buffer, owned.byteOffset + at, size / Type.BYTES_PER_ELEMENT);
        at += padded(size);
    });
    return restore(message, views);
}
