const TAG = '$spre';

export class SnapshotError extends Error {
    constructor(message, path) {
        super(path ? `${message} at ${path}` : message);
        this.name = 'SnapshotError';
        this.path = path;
    }
}

const isPlainObject = value => {
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
};

const isPlainItem = item => typeof item === 'string' || typeof item === 'boolean' || item === null
    || (typeof item === 'number' && Number.isFinite(item) && !Object.is(item, -0));

const isPlainList = list => {
    for (let i = 0; i < list.length; i++) if (!isPlainItem(list[i])) return false;
    return true;
};

export function encodeValue(value, refs = {}, path = '$') {
    if (value === undefined) return { [TAG]: 'undefined' };
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
    if (typeof value === 'number') {
        if (Number.isNaN(value)) return { [TAG]: 'NaN' };
        if (value === Infinity) return { [TAG]: 'Infinity' };
        if (value === -Infinity) return { [TAG]: '-Infinity' };
        if (Object.is(value, -0)) return { [TAG]: '-0' };
        return value;
    }
    if (typeof value === 'bigint') return { [TAG]: 'bigint', v: String(value) };
    if (typeof value !== 'object') throw new SnapshotError(`cannot encode a ${typeof value}`, path);
    if (Array.isArray(value)) {
        if (isPlainList(value)) return value.slice();
        return value.map((item, i) => encodeValue(item, refs, `${path}[${i}]`));
    }
    const special = refs.encode?.(value, path);
    if (special !== undefined) return { [TAG]: special.kind, ...special.data };
    if (!isPlainObject(value)) {
        throw new SnapshotError(`cannot encode an instance of ${value.constructor?.name ?? 'an unknown class'}`, path);
    }
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = encodeValue(item, refs, `${path}.${key}`);
    if (Object.hasOwn(value, TAG)) return { [TAG]: 'object', v: out };
    return out;
}

export function decodeValue(value, refs = {}, path = '$') {
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) {
        if (isPlainList(value)) return value.slice();
        return value.map((item, i) => decodeValue(item, refs, `${path}[${i}]`));
    }
    if (Object.hasOwn(value, TAG)) {
        switch (value[TAG]) {
        case 'undefined': return undefined;
        case 'NaN': return NaN;
        case 'Infinity': return Infinity;
        case '-Infinity': return -Infinity;
        case '-0': return -0;
        case 'bigint': return BigInt(value.v);
        case 'object': {
            const out = {};
            for (const [key, item] of Object.entries(value.v)) out[key] = decodeValue(item, refs, `${path}.${key}`);
            return out;
        }
        default: {
            const decoded = refs.decode?.(value[TAG], value, path);
            if (decoded === undefined) throw new SnapshotError(`unknown tag "${value[TAG]}"`, path);
            return decoded.value;
        }
        }
    }
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = decodeValue(item, refs, `${path}.${key}`);
    return out;
}

const floatView = new Float64Array(1);
const wordView = new Uint32Array(floatView.buffer);

export function createHasher() {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    const word = n => {
        h1 = Math.imul(h1 ^ n, 2654435761);
        h2 = Math.imul(h2 ^ n, 1597334677);
    };
    const text = value => {
        word(value.length);
        for (let i = 0; i < value.length; i++) word(value.charCodeAt(i));
    };
    const visit = value => {
        if (value === null) return word(1);
        switch (typeof value) {
        case 'undefined': return word(2);
        case 'boolean': return word(value ? 3 : 4);
        case 'number':
            floatView[0] = value;
            word(5);
            word(wordView[0]);
            return word(wordView[1]);
        case 'string':
            word(6);
            return text(value);
        default:
            break;
        }
        if (Array.isArray(value)) {
            word(7);
            word(value.length);
            for (let i = 0; i < value.length; i++) visit(value[i]);
            return undefined;
        }
        const keys = Object.keys(value).filter(key => value[key] !== undefined).sort();
        word(8);
        word(keys.length);
        for (const key of keys) {
            text(key);
            visit(value[key]);
        }
        return undefined;
    };
    return {
        add: visit,
        digest() {
            let a = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            const b = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909);
            a >>>= 0;
            return (b >>> 0).toString(16).padStart(8, '0') + a.toString(16).padStart(8, '0');
        },
    };
}

export function hashValue(value) {
    const hasher = createHasher();
    hasher.add(value);
    return hasher.digest();
}
