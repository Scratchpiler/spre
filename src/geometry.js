const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const readU32 = (bytes, at) => ((bytes[at] << 24) | (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3]) >>> 0;
const readU16 = (bytes, at) => (bytes[at] << 8) | bytes[at + 1];

export function pngSize(bytes) {
    if (bytes.length < 24 || PNG_SIGNATURE.some((b, i) => bytes[i] !== b)) return null;
    return [readU32(bytes, 16), readU32(bytes, 20)];
}

export function jpegSize(bytes) {
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
    let at = 2;
    while (at + 9 < bytes.length) {
        if (bytes[at] !== 0xff) return null;
        const marker = bytes[at + 1];
        if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
            at += 2;
            continue;
        }
        const length = readU16(bytes, at + 2);
        const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
        if (isStartOfFrame) return [readU16(bytes, at + 7), readU16(bytes, at + 5)];
        at += 2 + length;
    }
    return null;
}

const svgLength = text => {
    if (text === undefined) return null;
    const match = /^\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)\s*(px)?\s*$/i.exec(text);
    return match ? Number(match[1]) : null;
};

const svgAttribute = (tag, name) => {
    const match = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag);
    return match ? (match[2] ?? match[3]) : undefined;
};

export function svgViewBox(text) {
    const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
    if (!tag) return null;
    const viewBox = svgAttribute(tag, 'viewBox');
    if (viewBox !== undefined) {
        const parts = viewBox.trim().split(/[\s,]+/).map(Number);
        if (parts.length === 4 && parts.every(Number.isFinite)) {
            return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
        }
    }
    const width = svgLength(svgAttribute(tag, 'width'));
    const height = svgLength(svgAttribute(tag, 'height'));
    if (width === null || height === null) return null;
    return { x: 0, y: 0, width, height };
}

const decodeText = bytes => (typeof bytes === 'string' ? bytes : new TextDecoder().decode(bytes));

export function costumeGeometry(costume, bytes) {
    const format = String(costume.dataFormat ?? '').toLowerCase();
    const center = [costume.rotationCenterX, costume.rotationCenterY];
    const hasCenter = center.every(n => typeof n === 'number' && !Number.isNaN(n));
    if (format === 'svg') {
        const box = svgViewBox(decodeText(bytes));
        if (!box) return null;
        const rotationCenter = hasCenter ? center : [box.width / 2, box.height / 2];
        return {
            size: [box.width, box.height],
            rotationCenter: [rotationCenter[0] - box.x, rotationCenter[1] - box.y],
        };
    }
    const pixels = format === 'png' ? pngSize(bytes) : format === 'jpg' || format === 'jpeg' ? jpegSize(bytes) : null;
    if (!pixels) return null;
    const resolution = costume.bitmapResolution || 1;
    const size = [pixels[0] / resolution, pixels[1] / resolution];
    return {
        size,
        rotationCenter: hasCenter ? [center[0] / resolution, center[1] / resolution] : [size[0] / 2, size[1] / 2],
    };
}
