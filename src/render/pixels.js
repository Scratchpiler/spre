const BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const toBase64 = bytes => {
    let out = '';
    let i = 0;
    for (; i + 2 < bytes.length; i += 3) {
        const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        out += BASE64[n >> 18] + BASE64[(n >> 12) & 63] + BASE64[(n >> 6) & 63] + BASE64[n & 63];
    }
    if (i < bytes.length) {
        const n = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8);
        out += BASE64[n >> 18] + BASE64[(n >> 12) & 63] + (i + 1 < bytes.length ? BASE64[(n >> 6) & 63] : '=') + '=';
    }
    return out;
};

const fromBase64 = text => {
    const clean = text.replace(/=+$/, '');
    const bytes = new Uint8Array(Math.floor(clean.length * 3 / 4));
    let at = 0;
    for (let i = 0; i < clean.length; i += 4) {
        const n = (BASE64.indexOf(clean[i]) << 18) | (BASE64.indexOf(clean[i + 1]) << 12)
            | ((BASE64.indexOf(clean[i + 2] ?? 'A') & 63) << 6) | (BASE64.indexOf(clean[i + 3] ?? 'A') & 63);
        if (at < bytes.length) bytes[at++] = n >> 16;
        if (at < bytes.length) bytes[at++] = (n >> 8) & 255;
        if (at < bytes.length) bytes[at++] = n & 255;
    }
    return bytes;
};

export function packPixels(pixels) {
    const words = new Uint32Array(pixels.buffer, pixels.byteOffset, pixels.length / 4);
    const runs = [];
    let i = 0;
    while (i < words.length) {
        const word = words[i];
        let end = i + 1;
        while (end < words.length && words[end] === word && end - i < 0xffffffff) end++;
        runs.push(end - i, word);
        i = end;
    }
    return toBase64(new Uint8Array(new Uint32Array(runs).buffer));
}

export function unpackPixels(text, into) {
    const bytes = fromBase64(text);
    const runs = new Uint32Array(bytes.buffer, 0, bytes.length / 4);
    const words = new Uint32Array(into.buffer, into.byteOffset, into.length / 4);
    let at = 0;
    for (let i = 0; i < runs.length; i += 2) {
        words.fill(runs[i + 1], at, at + runs[i]);
        at += runs[i];
    }
    if (at !== words.length) throw new Error(`pixel data covers ${at} of ${words.length} pixels`);
    return into;
}
