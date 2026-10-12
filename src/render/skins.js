import { DISTORTION_MASK } from './effects.js';
import { Silhouette } from './silhouette.js';
import { svgViewBox } from '../geometry.js';
import { v3 } from './twgl.js';

const MAX_TEXTURE_DIMENSION = 2048;
const INDEX_OFFSET = 8;

export function mipScaleFor(scale, maxTextureScale) {
    const scaleMax = scale ? Math.max(Math.abs(scale[0]), Math.abs(scale[1])) : 100;
    const requestedScale = Math.min(scaleMax / 100, maxTextureScale);
    const mipLevel = Math.max(Math.ceil(Math.log2(requestedScale)) + INDEX_OFFSET, 0);
    return { mipLevel, mipScale: Math.pow(2, mipLevel - INDEX_OFFSET) };
}
const EMPTY_TEXTURE = Object.freeze({ empty: true });
const PRESENT_TEXTURE = Object.freeze({ empty: false });

class Skin {
    constructor(id) {
        this.id = id;
        this.rotationCenter = v3.create(0, 0);
        this.silhouette = new Silhouette();
        this.emptyTexture = undefined;
        this.drawables = new Set();
    }

    get size() {
        return [0, 0];
    }

    useNearest() {
        return true;
    }

    calculateRotationCenter() {
        return [this.size[0] / 2, this.size[1] / 2];
    }

    getTexture() {
        return this.emptyTexture;
    }

    updateSilhouette() {}

    setEmptyImageData() {
        this.emptyTexture = EMPTY_TEXTURE;
        this.rotationCenter[0] = 0;
        this.rotationCenter[1] = 0;
        this.silhouette.update(1, 1, new Uint8ClampedArray(4));
        this.altered();
    }

    isTouchingNearest(vec) {
        return this.silhouette.isTouchingNearest(vec);
    }

    isTouchingLinear(vec) {
        return this.silhouette.isTouchingLinear(vec);
    }

    altered() {
        for (const drawable of this.drawables) drawable.skinWasAltered();
    }

    dispose() {
        this.id = -1;
    }
}

export class SvgSkin extends Skin {
    constructor(id, rasterizer) {
        super(id);
        this.kind = 'svg';
        this.rasterizer = rasterizer;
        this.svg = null;
        this.viewBox = null;
        this.svgSize = [0, 0];
        this.mips = [];
        this.largestMIPScale = 0;
        this.maxTextureScale = 1;
        this.loaded = false;
        this.version = 0;
    }

    get size() {
        return [this.svgSize[0], this.svgSize[1]];
    }

    useNearest(scale, drawable) {
        if ((drawable.enabledEffects & DISTORTION_MASK) !== 0) return false;
        if (drawable.direction % 90 !== 0) return false;
        return Math.abs(scale[0]) > 99 && Math.abs(scale[0]) < 101 && Math.abs(scale[1]) > 99 && Math.abs(scale[1]) < 101;
    }

    createMIP(scale) {
        const width = Math.floor(this.svgSize[0] * scale);
        const height = Math.floor(this.svgSize[1] * scale);
        if (width <= 0 || height <= 0) return super.getTexture();
        const raster = this.takePrefetched(scale, width, height) ?? this.rasterizer.svg(this.svg, this.viewBox, scale, width, height);
        if (this.largestMIPScale < scale) {
            this.silhouette.update(width, height, raster);
            this.largestMIPScale = scale;
        }
        return PRESENT_TEXTURE;
    }

    takePrefetched(scale, width, height) {
        const raster = this.prefetched?.get(scale);
        if (!raster) return null;
        this.prefetched.delete(scale);
        return raster.length === width * height * 4 ? raster : null;
    }

    updateSilhouette(scale = [100, 100]) {
        this.getTexture(scale);
    }

    mipScaleFor(scale) {
        return mipScaleFor(scale, this.maxTextureScale);
    }

    getTexture(scale) {
        const { mipLevel, mipScale } = this.mipScaleFor(scale);
        if (this.loaded && !this.mips[mipLevel]) this.mips[mipLevel] = this.createMIP(mipScale);
        return this.mips[mipLevel] || super.getTexture();
    }

    resetMIPs() {
        this.mips.length = 0;
        this.largestMIPScale = 0;
    }

    setSVG(svgIn, rotationCenter) {
        const svg = this.rasterizer?.normalize ? this.rasterizer.normalize(svgIn) : svgIn;
        this.svg = svg;
        this.prefetched = null;
        this.loaded = false;
        const box = svgViewBox(svg) ?? { x: 0, y: 0, width: 0, height: 0 };
        this.viewBox = box;
        this.svgSize[0] = box.width;
        this.svgSize[1] = box.height;
        if (box.width === 0 || box.height === 0) {
            this.setEmptyImageData();
            return;
        }
        const maxDimension = Math.ceil(Math.max(box.width, box.height));
        for (let testScale = 2; maxDimension * testScale <= MAX_TEXTURE_DIMENSION; testScale *= 2) {
            this.maxTextureScale = testScale;
        }
        this.resetMIPs();
        const center = rotationCenter ?? this.calculateRotationCenter();
        this.rotationCenter[0] = center[0] - box.x;
        this.rotationCenter[1] = center[1] - box.y;
        this.loaded = true;
        this.altered();
    }

    restoreSilhouette(largestMIPScale) {
        if (!this.loaded || largestMIPScale <= this.largestMIPScale) return;
        this.createMIP(largestMIPScale);
    }
}

export class BitmapSkin extends Skin {
    constructor(id) {
        super(id);
        this.kind = 'bitmap';
        this.costumeResolution = 1;
        this.textureSize = [0, 0];
        this.texture = null;
        this.bitmap = null;
        this.version = 0;
    }

    get size() {
        return [this.textureSize[0] / this.costumeResolution, this.textureSize[1] / this.costumeResolution];
    }

    getTexture() {
        return this.texture || super.getTexture();
    }

    setBitmap(bitmap, costumeResolution, rotationCenter) {
        if (!bitmap.width || !bitmap.height) {
            this.setEmptyImageData();
            return;
        }
        this.bitmap = bitmap;
        this.version++;
        this.texture = PRESENT_TEXTURE;
        this.silhouette.update(bitmap.width, bitmap.height, bitmap.data);
        this.costumeResolution = costumeResolution || 2;
        this.textureSize = [bitmap.width, bitmap.height];
        const center = rotationCenter ?? this.calculateRotationCenter();
        this.rotationCenter[0] = center[0];
        this.rotationCenter[1] = center[1];
        this.altered();
    }
}

const SQRT2 = 1.4142135623730951;
const LINE_EPSILON = 1e-3;
const DEFAULT_PEN = { color4f: [0, 0, 1, 1], diameter: 1 };

export class PenSkin extends Skin {
    constructor(id, nativeSize) {
        super(id);
        this.kind = 'pen';
        this.penSize = [...nativeSize];
        this.rotationCenter[0] = nativeSize[0] / 2;
        this.rotationCenter[1] = nativeSize[1] / 2;
        this.pixels = new Uint8ClampedArray(nativeSize[0] * nativeSize[1] * 4);
        this.silhouettePixels = new Uint8ClampedArray(this.pixels.length);
        this.silhouetteDirty = true;
        this.version = 0;
        this.pending = null;
        this.history = [];
    }

    markDirty(left, top, right, bottom) {
        const rect = this.pending;
        if (!rect) this.pending = { left, top, right, bottom };
        else {
            rect.left = Math.min(rect.left, left);
            rect.top = Math.min(rect.top, top);
            rect.right = Math.max(rect.right, right);
            rect.bottom = Math.max(rect.bottom, bottom);
        }
    }

    changesSince(version) {
        if (version === this.version) return null;
        const oldest = this.history[0];
        if (version < 0 || !oldest || oldest.version > version + 1) return { left: 0, top: 0, right: this.penSize[0] - 1, bottom: this.penSize[1] - 1 };
        let rect = null;
        for (const entry of this.history) {
            if (entry.version <= version) continue;
            rect = rect
                ? { left: Math.min(rect.left, entry.left), top: Math.min(rect.top, entry.top), right: Math.max(rect.right, entry.right), bottom: Math.max(rect.bottom, entry.bottom) }
                : { ...entry };
        }
        return rect;
    }

    get size() {
        return this.penSize;
    }

    useNearest(scale) {
        return Math.max(scale[0], scale[1]) >= 100;
    }

    getTexture() {
        return PRESENT_TEXTURE;
    }

    touched() {
        this.silhouetteDirty = true;
        this.version++;
        const rect = this.pending ?? { left: 0, top: 0, right: this.penSize[0] - 1, bottom: this.penSize[1] - 1 };
        this.history.push({ version: this.version, left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
        if (this.history.length > 256) this.history.shift();
        this.pending = null;
    }

    clear() {
        this.pixels.fill(0);
        this.markDirty(0, 0, this.penSize[0] - 1, this.penSize[1] - 1);
        this.touched();
    }

    drawPoint(attributes, x, y) {
        this.drawLine(attributes, x, y, x, y);
    }

    drawLine(attributes, x0In, y0In, x1In, y1In) {
        const diameter = attributes.diameter || DEFAULT_PEN.diameter;
        const offset = diameter === 1 || diameter === 3 ? 0.5 : 0;
        const x0 = x0In + offset;
        const y0 = y0In + offset;
        const x1 = x1In + offset;
        const y1 = y1In + offset;
        const color = attributes.color4f || DEFAULT_PEN.color4f;
        const alpha = color[3];
        const red = color[0] * alpha;
        const green = color[1] * alpha;
        const blue = color[2] * alpha;
        const dx = x1 - x0;
        const dy = y1 - y0;
        const length = Math.sqrt((dx * dx) + (dy * dy));
        const pointDx = Math.abs(dx) < LINE_EPSILON && Math.abs(dy) < LINE_EPSILON ? LINE_EPSILON : dx;
        const nx = pointDx / Math.max(length, LINE_EPSILON);
        const ny = dy / Math.max(length, LINE_EPSILON);
        const reach = (diameter * 0.5) + SQRT2;
        const halfWidth = this.penSize[0] / 2;
        const halfHeight = this.penSize[1] / 2;
        const columnStart = Math.max(0, Math.floor(Math.min(x0, x1) - reach + halfWidth - 0.5));
        const columnEnd = Math.min(this.penSize[0] - 1, Math.ceil(Math.max(x0, x1) + reach + halfWidth - 0.5));
        const rowStart = Math.max(0, Math.floor(halfHeight - Math.max(y0, y1) - reach - 0.5));
        const rowEnd = Math.min(this.penSize[1] - 1, Math.ceil(halfHeight - Math.min(y0, y1) + reach - 0.5));
        const thicknessBias = (diameter - 1) * 0.5;
        const pixels = this.pixels;
        let wrote = false;
        for (let row = rowStart; row <= rowEnd; row++) {
            const sy = halfHeight - row - 0.5 - y0;
            let index = ((row * this.penSize[0]) + columnStart) * 4;
            for (let column = columnStart; column <= columnEnd; column++, index += 4) {
                const sx = column + 0.5 - halfWidth - x0;
                const along = (sx * nx) + (sy * ny);
                const across = (sy * nx) - (sx * ny);
                const outside = along - Math.min(Math.max(along, 0), length);
                const coverage = Math.min(Math.max(1 - (Math.sqrt((outside * outside) + (across * across)) - thicknessBias), 0), 1);
                if (coverage === 0) continue;
                const sourceAlpha = alpha * coverage;
                const keep = 1 - sourceAlpha;
                pixels[index] = (red * coverage * 255) + (pixels[index] * keep);
                pixels[index + 1] = (green * coverage * 255) + (pixels[index + 1] * keep);
                pixels[index + 2] = (blue * coverage * 255) + (pixels[index + 2] * keep);
                pixels[index + 3] = (sourceAlpha * 255) + (pixels[index + 3] * keep);
                wrote = true;
            }
        }
        if (wrote) {
            this.markDirty(columnStart, rowStart, columnEnd, rowEnd);
            this.touched();
        }
    }

    updateSilhouette() {
        if (!this.silhouetteDirty) return;
        this.silhouettePixels.set(this.pixels);
        this.silhouette.update(this.penSize[0], this.penSize[1], this.silhouettePixels, true);
        this.silhouetteDirty = false;
    }
}

const BUBBLE = { MAX_LINE_WIDTH: 170, MIN_WIDTH: 50, STROKE_WIDTH: 4, PADDING: 10, TAIL_HEIGHT: 12, FONT_SIZE: 14, LINE_HEIGHT: 16 };

const HELVETICA_WIDTHS = [
    278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
    556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
    1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
    667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
    333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
    556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];

export const measureBubbleText = text => {
    let units = 0;
    for (const ch of text) {
        const code = ch.codePointAt(0);
        units += code >= 32 && code <= 126 ? HELVETICA_WIDTHS[code - 32] : 556;
    }
    return units * BUBBLE.FONT_SIZE / 1000;
};

export function wrapBubbleText(text) {
    const lines = [];
    for (const paragraph of String(text).split('\n')) {
        let line = '';
        for (const word of paragraph.split(/(?<=\s)/)) {
            if (measureBubbleText(line + word) <= BUBBLE.MAX_LINE_WIDTH || line === '') {
                line += word;
                while (measureBubbleText(line) > BUBBLE.MAX_LINE_WIDTH && line.length > 1) {
                    let cut = line.length - 1;
                    while (cut > 1 && measureBubbleText(line.slice(0, cut)) > BUBBLE.MAX_LINE_WIDTH) cut--;
                    lines.push(line.slice(0, cut));
                    line = line.slice(cut);
                }
            } else {
                lines.push(line);
                line = word;
            }
        }
        lines.push(line);
    }
    return lines;
}

export class TextSkin extends Skin {
    constructor(id) {
        super(id);
        this.kind = 'text';
        this.textSize = [0, 0];
        this.params = { type: 'say', text: '', pointsLeft: false };
    }

    get size() {
        return this.textSize;
    }

    getTexture() {
        return PRESENT_TEXTURE;
    }

    setTextAndType(type, text, pointsLeft) {
        this.params = { type, text, pointsLeft };
        const lines = wrapBubbleText(text);
        const longest = lines.reduce((widest, line) => Math.max(widest, measureBubbleText(line)), 0);
        const paddedWidth = Math.max(longest, BUBBLE.MIN_WIDTH) + (BUBBLE.PADDING * 2);
        const paddedHeight = (BUBBLE.LINE_HEIGHT * lines.length) + (BUBBLE.PADDING * 2);
        this.textSize = [paddedWidth + BUBBLE.STROKE_WIDTH, paddedHeight + BUBBLE.STROKE_WIDTH + BUBBLE.TAIL_HEIGHT];
        this.altered();
    }
}
