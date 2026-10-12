import { localPositionOf } from './drawable.js';
import { DISTORTION_MASK, EFFECT_INFO, transformColor } from './effects.js';
import { Silhouette } from './silhouette.js';

const NATIVE_WIDTH = 480;
const NATIVE_HEIGHT = 360;

if (new Uint8Array(new Uint32Array([1]).buffer)[0] !== 1) throw new Error('the compositor needs a little-endian platform');

export function createRasterStore() {
    const rasters = new Map();
    return {
        rasters,
        apply(updates = [], dropped = []) {
            for (const key of dropped) rasters.delete(key);
            for (const update of updates) {
                if (update.patch) {
                    const raster = rasters.get(update.key);
                    if (!raster) continue;
                    const { x, y, width, height, data } = update.patch;
                    for (let row = 0; row < height; row++) {
                        const from = row * width * 4;
                        raster.data.set(data.subarray(from, from + (width * 4)), (((y + row) * raster.width) + x) * 4);
                    }
                    continue;
                }
                const silhouette = new Silhouette();
                silhouette.update(update.width, update.height, update.data, update.premultiplied);
                rasters.set(update.key, { width: update.width, height: update.height, data: update.data, premultiplied: update.premultiplied, silhouette });
            }
        },
    };
}

const views = new WeakMap();

function layerView(layer) {
    let view = views.get(layer);
    if (!view) {
        view = {
            inverseMatrix: layer.inverse,
            enabledEffects: layer.enabledEffects,
            ghostOnly: layer.enabledEffects === EFFECT_INFO.ghost.mask,
            uniforms: layer.uniforms,
            skin: { size: layer.skinSize, getTexture() {} },
        };
        views.set(layer, view);
    }
    return view;
}

const sample = new Uint8ClampedArray(4);
const point = new Float32Array(3);
const COLOR_EFFECTS_MASK = EFFECT_INFO.color.mask | EFFECT_INFO.brightness.mask | EFFECT_INFO.ghost.mask;

const words = raster => raster.words ?? (raster.words = new Uint32Array(raster.data.buffer, raster.data.byteOffset, raster.data.length >> 2));

const OPAQUE = 0xff000000;

function blendInto(out32, i, r, g, b, a) {
    if (a >= 255) {
        out32[i] = (r + 0.5) | ((g + 0.5) << 8) | ((b + 0.5) << 16) | OPAQUE;
        return;
    }
    const keep = 1 - (a / 255);
    const dst = out32[i];
    const nr = r + ((dst & 255) * keep);
    const ng = g + (((dst >>> 8) & 255) * keep);
    const nb = b + (((dst >>> 16) & 255) * keep);
    out32[i] = Math.min(255, (nr + 0.5) | 0) | (Math.min(255, (ng + 0.5) | 0) << 8) | (Math.min(255, (nb + 0.5) | 0) << 16) | OPAQUE;
}

function finishPixel(layer, view, out32, i, r, g, b, a) {
    if (view === null) {
        blendInto(out32, i, r, g, b, a);
        return;
    }
    if (view.ghostOnly) {
        const ghost = view.uniforms.u_ghost;
        if (ghost !== 0) blendInto(out32, i, r * ghost, g * ghost, b * ghost, a * ghost);
        return;
    }
    const color = sample;
    color[0] = r;
    color[1] = g;
    color[2] = b;
    color[3] = a;
    transformColor(view, color);
    if (color[3] !== 0) blendInto(out32, i, color[0], color[1], color[2], color[3]);
}

const SHEAR_EPSILON = 1e-9;

const separable = m => Math.abs(m[1]) < SHEAR_EPSILON && Math.abs(m[4]) < SHEAR_EPSILON;

const tables = { sourceColumns: new Int32Array(0), sourceRows: new Int32Array(0), columnFraction: new Float64Array(0), rowFraction: new Float64Array(0), nextColumns: new Int32Array(0), nextRows: new Int32Array(0) };

function grown(name, length) {
    if (tables[name].length < length) tables[name] = new tables[name].constructor(length * 2);
    return tables[name];
}

function axisTable(first, last, base, step, max, indices, nextIndices, fractions) {
    for (let k = 0, at = first; at <= last; k++, at++) {
        const t = base + (at * step);
        if (t < 0 || t > 1) {
            indices[k] = -1;
            continue;
        }
        const scaled = t * max;
        const floor = Math.floor(scaled);
        indices[k] = floor < 0 ? 0 : floor > max ? max : floor;
        if (fractions) {
            nextIndices[k] = floor + 1 > max ? max : floor + 1 < 0 ? 0 : floor + 1;
            fractions[k] = scaled - floor;
        }
    }
}

function separableTables(layer, raster, rows, columns, frame, linear) {
    const { xScale, yScale } = frame;
    const m = layer.inverse;
    const columnCount = columns[1] - columns[0] + 1;
    const rowCount = rows[1] - rows[0] + 1;
    const sourceColumns = grown('sourceColumns', columnCount);
    const sourceRows = grown('sourceRows', rowCount);
    const x0 = (0.5 * xScale) - (NATIVE_WIDTH / 2);
    const uBase = 0.5 - ((x0 * m[0]) + m[12]);
    if (linear) {
        axisTable(columns[0], columns[1], uBase, -m[0] * xScale, raster.width - 1, sourceColumns, grown('nextColumns', columnCount), grown('columnFraction', columnCount));
    } else {
        axisTable(columns[0], columns[1], uBase, -m[0] * xScale, raster.width - 1, sourceColumns, null, null);
    }
    const maxY = raster.height - 1;
    const nextRows = linear ? grown('nextRows', rowCount) : null;
    const rowFraction = linear ? grown('rowFraction', rowCount) : null;
    for (let k = 0, row = rows[0]; row <= rows[1]; k++, row++) {
        const t = ((((NATIVE_HEIGHT / 2) - ((row + 0.5) * yScale)) * m[5]) + m[13]) + 0.5;
        if (t < 0 || t > 1) {
            sourceRows[k] = -1;
            continue;
        }
        const scaled = t * maxY;
        const floor = Math.floor(scaled);
        sourceRows[k] = floor < 0 ? 0 : floor > maxY ? maxY : floor;
        if (linear) {
            nextRows[k] = floor + 1 > maxY ? maxY : floor + 1 < 0 ? 0 : floor + 1;
            rowFraction[k] = scaled - floor;
        }
    }
}

function separableNearest(layer, raster, rows, columns, frame, view) {
    const { out32, originX, originY, stride } = frame;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    const plain = view === null;
    separableTables(layer, raster, rows, columns, frame, false);
    const { sourceColumns, sourceRows } = tables;
    for (let row = rows[0]; row <= rows[1]; row++) {
        const sourceRow = sourceRows[row - rows[0]];
        if (sourceRow < 0) continue;
        const base = sourceRow * width;
        let i = ((row - originY) * stride) + columns[0] - originX;
        for (let k = 0, column = columns[0]; column <= columns[1]; k++, column++, i++) {
            const x = sourceColumns[k];
            if (x < 0) continue;
            const p = src[base + x];
            const a = p >>> 24;
            if (a === 0) continue;
            if (a === 255 && plain) {
                out32[i] = p;
                continue;
            }
            const f = premultiplied ? 1 : a / 255;
            finishPixel(layer, view, out32, i, (p & 255) * f, ((p >>> 8) & 255) * f, ((p >>> 16) & 255) * f, a);
        }
    }
}

function shadeLinear(layer, view, out32, i, premultiplied, p00, p10, p01, p11, x1D, y1D) {
    const a00 = p00 >>> 24;
    const a10 = p10 >>> 24;
    const a01 = p01 >>> 24;
    const a11 = p11 >>> 24;
    if ((a00 | a10 | a01 | a11) === 0) return;
    const w00 = (1 - x1D) * (1 - y1D);
    const w10 = x1D * (1 - y1D);
    const w01 = (1 - x1D) * y1D;
    const w11 = x1D * y1D;
    const f00 = premultiplied ? w00 : w00 * a00 / 255;
    const f10 = premultiplied ? w10 : w10 * a10 / 255;
    const f01 = premultiplied ? w01 : w01 * a01 / 255;
    const f11 = premultiplied ? w11 : w11 * a11 / 255;
    finishPixel(layer, view, out32, i,
        ((p00 & 255) * f00) + ((p10 & 255) * f10) + ((p01 & 255) * f01) + ((p11 & 255) * f11),
        (((p00 >>> 8) & 255) * f00) + (((p10 >>> 8) & 255) * f10) + (((p01 >>> 8) & 255) * f01) + (((p11 >>> 8) & 255) * f11),
        (((p00 >>> 16) & 255) * f00) + (((p10 >>> 16) & 255) * f10) + (((p01 >>> 16) & 255) * f01) + (((p11 >>> 16) & 255) * f11),
        (a00 * w00) + (a10 * w10) + (a01 * w01) + (a11 * w11));
}

function separableLinear(layer, raster, rows, columns, frame, view) {
    const { out32, originX, originY, stride } = frame;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    separableTables(layer, raster, rows, columns, frame, true);
    const { sourceColumns, sourceRows, nextColumns, nextRows, columnFraction, rowFraction } = tables;
    for (let row = rows[0]; row <= rows[1]; row++) {
        const r = row - rows[0];
        const top = sourceRows[r];
        if (top < 0) continue;
        const yt = top * width;
        const yb = nextRows[r] * width;
        const y1D = rowFraction[r];
        let i = ((row - originY) * stride) + columns[0] - originX;
        for (let k = 0, column = columns[0]; column <= columns[1]; k++, column++, i++) {
            const xl = sourceColumns[k];
            if (xl < 0) continue;
            const xr = nextColumns[k];
            shadeLinear(layer, view, out32, i, premultiplied, src[yt + xl], src[yt + xr], src[yb + xl], src[yb + xr], columnFraction[k], y1D);
        }
    }
}

function affineNearest(layer, raster, rows, columns, frame, view) {
    const { out32, originX, originY, stride, xScale, yScale } = frame;
    const m = layer.inverse;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    const maxX = width - 1;
    const maxY = raster.height - 1;
    const du = -m[0] * xScale;
    const dv = m[1] * xScale;
    const plain = view === null;
    for (let row = rows[0]; row <= rows[1]; row++) {
        const y = (NATIVE_HEIGHT / 2) - ((row + 0.5) * yScale);
        const x0 = (0.5 * xScale) - (NATIVE_WIDTH / 2);
        const u0 = 0.5 - ((x0 * m[0]) + (y * m[4]) + m[12]);
        const v0 = ((x0 * m[1]) + (y * m[5]) + m[13]) + 0.5;
        let i = ((row - originY) * stride) + columns[0] - originX;
        for (let column = columns[0]; column <= columns[1]; column++, i++) {
            const u = u0 + (column * du);
            const v = v0 + (column * dv);
            if (u < 0 || v < 0 || u > 1 || v > 1) continue;
            let x = Math.floor(u * maxX);
            let yy = Math.floor(v * maxY);
            x = x < 0 ? 0 : x > maxX ? maxX : x;
            yy = yy < 0 ? 0 : yy > maxY ? maxY : yy;
            const p = src[(yy * width) + x];
            const a = p >>> 24;
            if (a === 0) continue;
            if (a === 255 && plain) {
                out32[i] = p;
                continue;
            }
            const f = premultiplied ? 1 : a / 255;
            finishPixel(layer, view, out32, i, (p & 255) * f, ((p >>> 8) & 255) * f, ((p >>> 16) & 255) * f, a);
        }
    }
}

function affineLinear(layer, raster, rows, columns, frame, view) {
    const { out32, originX, originY, stride, xScale, yScale } = frame;
    const m = layer.inverse;
    const width = raster.width;
    const premultiplied = raster.premultiplied;
    const src = words(raster);
    const maxX = width - 1;
    const maxY = raster.height - 1;
    const du = -m[0] * xScale;
    const dv = m[1] * xScale;
    for (let row = rows[0]; row <= rows[1]; row++) {
        const y = (NATIVE_HEIGHT / 2) - ((row + 0.5) * yScale);
        const x0 = (0.5 * xScale) - (NATIVE_WIDTH / 2);
        const u0 = 0.5 - ((x0 * m[0]) + (y * m[4]) + m[12]);
        const v0 = ((x0 * m[1]) + (y * m[5]) + m[13]) + 0.5;
        let i = ((row - originY) * stride) + columns[0] - originX;
        for (let column = columns[0]; column <= columns[1]; column++, i++) {
            const u = u0 + (column * du);
            const v = v0 + (column * dv);
            if (u < 0 || v < 0 || u > 1 || v > 1) continue;
            const fx = u * maxX;
            const fy = v * maxY;
            const xa = Math.floor(fx);
            const ya = Math.floor(fy);
            const xl = xa < 0 ? 0 : xa > maxX ? maxX : xa;
            const xr = xa + 1 > maxX ? maxX : xa + 1 < 0 ? 0 : xa + 1;
            const yt = (ya < 0 ? 0 : ya > maxY ? maxY : ya) * width;
            const yb = (ya + 1 > maxY ? maxY : ya + 1 < 0 ? 0 : ya + 1) * width;
            shadeLinear(layer, view, out32, i, premultiplied, src[yt + xl], src[yt + xr], src[yb + xl], src[yb + xr], fx - xa, fy - ya);
        }
    }
}

function compositeAffine(layer, raster, rows, columns, frame) {
    const view = (layer.enabledEffects & COLOR_EFFECTS_MASK) !== 0 ? layerView(layer) : null;
    const flat = separable(layer.inverse);
    if (layer.nearest) (flat ? separableNearest : affineNearest)(layer, raster, rows, columns, frame, view);
    else (flat ? separableLinear : affineLinear)(layer, raster, rows, columns, frame, view);
}

function compositeDistorted(layer, raster, rows, columns, frame) {
    const { out32, originX, originY, stride, xScale, yScale } = frame;
    const view = layerView(layer);
    const silhouette = raster.silhouette;
    for (let row = rows[0]; row <= rows[1]; row++) {
        point[1] = (NATIVE_HEIGHT / 2) - ((row + 0.5) * yScale);
        let i = ((row - originY) * stride) + columns[0] - originX;
        for (let column = columns[0]; column <= columns[1]; column++, i++) {
            point[0] = ((column + 0.5) * xScale) - (NATIVE_WIDTH / 2);
            const local = localPositionOf(view, point);
            if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) continue;
            const color = layer.nearest ? silhouette.colorAtNearest(local, sample) : silhouette.colorAtLinear(local, sample);
            if (layer.enabledEffects !== 0) transformColor(view, color);
            if (color[3] === 0) continue;
            blendInto(out32, i, color[0], color[1], color[2], color[3]);
        }
    }
}

function compositeLayer(layer, raster, rows, columns, frame) {
    const m = layer.inverse;
    const affine = m[3] === 0 && m[7] === 0 && m[15] === 1 && (layer.enabledEffects & DISTORTION_MASK) === 0;
    if (affine) compositeAffine(layer, raster, rows, columns, frame);
    else compositeDistorted(layer, raster, rows, columns, frame);
}

export function layerBox(layer, width, height) {
    const xScale = NATIVE_WIDTH / width;
    const yScale = NATIVE_HEIGHT / height;
    return {
        left: Math.max(0, Math.floor((layer.bounds.left + (NATIVE_WIDTH / 2)) / xScale) - 1),
        right: Math.min(width - 1, Math.ceil((layer.bounds.right + (NATIVE_WIDTH / 2)) / xScale) + 1),
        top: Math.max(0, Math.floor(((NATIVE_HEIGHT / 2) - layer.bounds.top) / yScale) - 1),
        bottom: Math.min(height - 1, Math.ceil(((NATIVE_HEIGHT / 2) - layer.bounds.bottom) / yScale) + 1),
    };
}

export function compositeRegion(scene, rasters, region, out) {
    const { width, height, background } = scene;
    const { x0, y0, x1, y1 } = region;
    const stride = x1 - x0;
    const out32 = new Uint32Array(out.buffer, out.byteOffset, stride * (y1 - y0));
    out32.fill((background[0] | (background[1] << 8) | (background[2] << 16) | OPAQUE) >>> 0);
    const frame = { out32, originX: x0, originY: y0, stride, xScale: NATIVE_WIDTH / width, yScale: NATIVE_HEIGHT / height };
    for (const layer of scene.layers) {
        const raster = rasters.get(layer.raster);
        if (!raster) continue;
        const box = layerBox(layer, width, height);
        const columns = [Math.max(x0, box.left), Math.min(x1 - 1, box.right)];
        const rows = [Math.max(y0, box.top), Math.min(y1 - 1, box.bottom)];
        if (columns[0] > columns[1] || rows[0] > rows[1]) continue;
        compositeLayer(layer, raster, rows, columns, frame);
    }
    return out;
}

export function compositeBand(scene, rasters, rowStart, rowEnd, out) {
    return compositeRegion(scene, rasters, { x0: 0, y0: rowStart, x1: scene.width, y1: rowEnd }, out);
}

export function compositeFrame(scene, rasters) {
    const out = new Uint8ClampedArray(scene.width * scene.height * 4);
    compositeBand(scene, rasters, 0, scene.height, out);
    return { width: scene.width, height: scene.height, data: out };
}
