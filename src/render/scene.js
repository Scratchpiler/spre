import { BitmapSkin, PenSkin, SvgSkin, TextSkin } from './skins.js';

const uniformsOf = drawable => {
    const { u_modelMatrix: ignored, ...rest } = drawable.uniforms;
    return rest;
};

function sourceFor(skin) {
    if (skin instanceof SvgSkin) {
        if (!skin.loaded) return null;
        return {
            key: `s${skin.id}.${skin.version}`,
            produce: () => ({ kind: 'svg', svg: skin.svg, size: skin.size, maxTextureScale: skin.maxTextureScale }),
        };
    }
    if (skin instanceof BitmapSkin) {
        if (!skin.bitmap) return null;
        return {
            key: `b${skin.id}.${skin.version}`,
            produce: () => ({ kind: 'raster', width: skin.bitmap.width, height: skin.bitmap.height, data: skin.bitmap.data.slice(), premultiplied: false }),
        };
    }
    if (skin instanceof PenSkin) {
        return {
            key: `p${skin.id}`,
            pen: skin,
            produce: () => ({ kind: 'raster', width: skin.penSize[0], height: skin.penSize[1], data: skin.pixels.slice(), premultiplied: true }),
        };
    }
    return null;
}

export function describeScene(renderer) {
    const layers = [];
    const bubbles = [];
    const sources = new Map();
    for (const id of renderer.drawList) {
        const drawable = renderer.allDrawables[id];
        const skin = drawable?.skin;
        if (!drawable.visible || !skin) continue;
        if (skin instanceof TextSkin) {
            bubbles.push({ id, ...skin.params, x: drawable.position[0], y: drawable.position[1], width: skin.size[0], height: skin.size[1] });
            continue;
        }
        const source = sourceFor(skin);
        if (!source) continue;
        drawable.updateMatrix();
        const aabb = drawable.getAABB();
        sources.set(source.key, source);
        layers.push({
            id,
            skin: source.key,
            scale: drawable.scale,
            inverse: Float32Array.from(drawable.inverseMatrix),
            enabledEffects: drawable.enabledEffects,
            uniforms: uniformsOf(drawable),
            skinSize: skin.size,
            nearest: skin.useNearest(drawable.scaleVector, drawable),
            bounds: { left: aabb.left, right: aabb.right, bottom: aabb.bottom, top: aabb.top },
        });
    }
    return { scene: { background: [...renderer.backgroundColor3b], layers }, bubbles, sources };
}

function penPatch(pen, rect) {
    const width = rect.right - rect.left + 1;
    const height = rect.bottom - rect.top + 1;
    const data = new Uint8ClampedArray(width * height * 4);
    for (let row = 0; row < height; row++) {
        const from = (((rect.top + row) * pen.penSize[0]) + rect.left) * 4;
        data.set(pen.pixels.subarray(from, from + (width * 4)), row * width * 4);
    }
    return { x: rect.left, y: rect.top, width, height, data };
}

const BLOCK = 16;
const MAX_PATCHES = 48;

function changedBlocks(pen, previous, rect) {
    const [width, height] = pen.penSize;
    const current = new Uint32Array(pen.pixels.buffer, pen.pixels.byteOffset, width * height);
    const firstColumn = Math.floor(rect.left / BLOCK);
    const lastColumn = Math.floor(rect.right / BLOCK);
    const rows = [];
    for (let blockRow = Math.floor(rect.top / BLOCK); blockRow <= Math.floor(rect.bottom / BLOCK); blockRow++) {
        const top = blockRow * BLOCK;
        const bottom = Math.min(height, top + BLOCK);
        const runs = [];
        let open = null;
        for (let blockColumn = firstColumn; blockColumn <= lastColumn; blockColumn++) {
            const left = blockColumn * BLOCK;
            const right = Math.min(width, left + BLOCK);
            let changed = false;
            for (let row = top; row < bottom && !changed; row++) {
                for (let i = (row * width) + left, end = (row * width) + right; i < end; i++) {
                    if (current[i] !== previous[i]) {
                        changed = true;
                        break;
                    }
                }
            }
            if (!changed) {
                open = null;
                continue;
            }
            for (let row = top; row < bottom; row++) previous.set(current.subarray((row * width) + left, (row * width) + right), (row * width) + left);
            if (open) open.right = right;
            else runs.push(open = { left, top, right, bottom });
        }
        rows.push(runs);
    }
    const merged = [];
    let above = [];
    for (const runs of rows) {
        const next = [];
        for (const run of runs) {
            const stacked = above.find(candidate => candidate.left === run.left && candidate.right === run.right);
            if (stacked) {
                stacked.bottom = run.bottom;
                next.push(stacked);
            } else {
                merged.push(run);
                next.push(run);
            }
        }
        above = next;
    }
    if (merged.length <= MAX_PATCHES) return merged;
    return [merged.reduce((box, run) => ({ left: Math.min(box.left, run.left), top: Math.min(box.top, run.top), right: Math.max(box.right, run.right), bottom: Math.max(box.bottom, run.bottom) }))];
}

export function createSceneChannel({ keepFrames = 300 } = {}) {
    const sent = new Map();
    let tick = 0;
    return {
        update({ scene, bubbles, sources }) {
            tick++;
            const skins = [];
            for (const [key, source] of sources) {
                const known = sent.get(key);
                if (source.pen) {
                    let mirror = known?.mirror;
                    if (known === undefined) {
                        skins.push({ key, ...source.produce() });
                        mirror = new Uint32Array(source.pen.pixels.slice().buffer);
                    } else {
                        const rect = source.pen.changesSince(known.version);
                        if (rect) {
                            for (const block of changedBlocks(source.pen, mirror, rect)) {
                                skins.push({ key, patch: penPatch(source.pen, { left: block.left, top: block.top, right: block.right - 1, bottom: block.bottom - 1 }) });
                            }
                        }
                    }
                    sent.set(key, { version: source.pen.version, used: tick, mirror });
                } else if (known) {
                    known.used = tick;
                } else {
                    skins.push({ key, ...source.produce() });
                    sent.set(key, { used: tick });
                }
            }
            const dropped = [];
            for (const [key, entry] of sent) {
                if (tick - entry.used > keepFrames) {
                    dropped.push(key);
                    sent.delete(key);
                }
            }
            return { scene, bubbles, skins, dropped };
        },
        reset() {
            sent.clear();
        },
    };
}
