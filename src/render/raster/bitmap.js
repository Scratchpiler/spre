import { convertIndexedToRgb, decode as decodePng } from 'fast-png';
import jpeg from 'jpeg-js';

const toRgba = decoded => {
    const { width, height } = decoded;
    const pixels = width * height;
    const out = new Uint8ClampedArray(pixels * 4);
    if (decoded.palette) {
        const rgb = convertIndexedToRgb(decoded);
        const channels = rgb.length / pixels;
        for (let i = 0; i < pixels; i++) {
            out[i * 4] = rgb[i * channels];
            out[(i * 4) + 1] = rgb[(i * channels) + 1];
            out[(i * 4) + 2] = rgb[(i * channels) + 2];
            out[(i * 4) + 3] = channels === 4 ? rgb[(i * channels) + 3] : 255;
        }
        return out;
    }
    const { data, channels, depth } = decoded;
    const shift = depth === 16 ? 8 : 0;
    const scaleLow = depth < 8 ? 255 / ((1 << depth) - 1) : 1;
    const read = index => (shift ? data[index] >> shift : data[index] * scaleLow);
    for (let i = 0; i < pixels; i++) {
        const at = i * channels;
        if (channels <= 2) {
            const gray = read(at);
            out[i * 4] = gray;
            out[(i * 4) + 1] = gray;
            out[(i * 4) + 2] = gray;
            out[(i * 4) + 3] = channels === 2 ? read(at + 1) : 255;
        } else {
            out[i * 4] = read(at);
            out[(i * 4) + 1] = read(at + 1);
            out[(i * 4) + 2] = read(at + 2);
            out[(i * 4) + 3] = channels === 4 ? read(at + 3) : 255;
        }
    }
    return out;
};

export function decodeBitmap(bytes, format) {
    const kind = String(format).toLowerCase();
    if (kind === 'png') {
        const decoded = decodePng(bytes);
        return { width: decoded.width, height: decoded.height, data: toRgba(decoded) };
    }
    if (kind === 'jpg' || kind === 'jpeg') {
        const decoded = jpeg.decode(bytes, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 1024 });
        return { width: decoded.width, height: decoded.height, data: new Uint8ClampedArray(decoded.data) };
    }
    throw new Error(`unsupported bitmap format ${format}`);
}

export function upscaleNearest2x({ width, height, data }) {
    const out = new Uint8ClampedArray(width * height * 16);
    const source = new Uint32Array(data.buffer, data.byteOffset, width * height);
    const target = new Uint32Array(out.buffer);
    const outWidth = width * 2;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixel = source[(y * width) + x];
            const at = (y * 2 * outWidth) + (x * 2);
            target[at] = pixel;
            target[at + 1] = pixel;
            target[at + outWidth] = pixel;
            target[at + outWidth + 1] = pixel;
        }
    }
    return { width: outWidth, height: height * 2, data: out };
}
