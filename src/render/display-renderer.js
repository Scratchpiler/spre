import { layerBox } from './compositor.js';
import { mipScaleFor } from './skins.js';

const NATIVE_WIDTH = 480;
const NATIVE_HEIGHT = 360;
const TILE = 64;
const MAX_INTERNED = 20000;

const SHEAR_TOLERANCE = 1e-6;

const axisAligned = inverse => Math.abs(inverse[1]) < SHEAR_TOLERANCE && Math.abs(inverse[4]) < SHEAR_TOLERANCE && inverse[3] === 0 && inverse[7] === 0 && inverse[15] === 1;

export function createDisplayRenderer({ pool }) {
    const skins = new Map();
    const inFlight = new Set();
    let current = { scene: { background: [255, 255, 255], layers: [] }, bubbles: [] };
    let patches = [];
    let tail = Promise.resolve();
    const interned = new Map();
    let target = null;

    const intern = text => {
        let id = interned.get(text);
        if (id === undefined) {
            id = interned.size;
            interned.set(text, id);
        }
        return id;
    };

    const layerSignature = layer => intern(`${layer.raster}|${layer.enabledEffects}|${layer.nearest}|${layer.inverse.join()}|${JSON.stringify(layer.uniforms)}|${layer.skinSize}|${layer.bounds.left},${layer.bounds.right},${layer.bounds.bottom},${layer.bounds.top}`);

    const newTarget = (width, height) => {
        const columns = Math.ceil(width / TILE);
        const rows = Math.ceil(height / TILE);
        return { width, height, columns, rows, data: new Uint8ClampedArray(width * height * 4), signatures: new Array(columns * rows).fill(null), fresh: true };
    };

    const patchedTiles = (resolved, width, height, columns) => {
        const forced = new Set();
        const patchedKeys = new Map();
        for (const patch of patches) patchedKeys.set(patch.key, [...(patchedKeys.get(patch.key) ?? []), patch]);
        patches = [];
        if (!patchedKeys.size) return forced;
        const xScale = NATIVE_WIDTH / width;
        const yScale = NATIVE_HEIGHT / height;
        const mark = box => {
            for (let row = Math.floor(box.top / TILE); row <= Math.floor(box.bottom / TILE); row++) {
                for (let column = Math.floor(box.left / TILE); column <= Math.floor(box.right / TILE); column++) forced.add((row * columns) + column);
            }
        };
        for (const layer of resolved) {
            for (const patch of patchedKeys.get(layer.raster) ?? []) { 
                const box = layerBox(layer, width, height);
                if (!axisAligned(layer.inverse)) {
                    mark(box);
                    continue;
                }
                const spanX = (layer.bounds.right - layer.bounds.left) / layer.skinSize[0];
                const spanY = (layer.bounds.top - layer.bounds.bottom) / layer.skinSize[1];
                const left = layer.bounds.left + (patch.x * spanX);
                const right = layer.bounds.left + ((patch.x + patch.width) * spanX);
                const top = layer.bounds.top - (patch.y * spanY);
                const bottom = layer.bounds.top - ((patch.y + patch.height) * spanY);
                mark({
                    left: Math.max(box.left, Math.floor((left + (NATIVE_WIDTH / 2)) / xScale) - 1),
                    right: Math.min(box.right, Math.ceil((right + (NATIVE_WIDTH / 2)) / xScale) + 1),
                    top: Math.max(box.top, Math.floor(((NATIVE_HEIGHT / 2) - top) / yScale) - 1),
                    bottom: Math.min(box.bottom, Math.ceil(((NATIVE_HEIGHT / 2) - bottom) / yScale) + 1),
                });
            }
        }
        return forced;
    };

    const paintFrame = async (scene, resolved) => {
        const { width, height } = scene;
        if (interned.size > MAX_INTERNED) {
            interned.clear();
            target = null;
        }
        if (!target || target.width !== width || target.height !== height) target = newTarget(width, height);
        const forced = patchedTiles(resolved, width, height, target.columns);
        const everything = target.fresh;
        const ids = resolved.map(layerSignature);
        const boxes = resolved.map(layer => layerBox(layer, width, height));
        const backdrop = intern(`background:${scene.background.join()}`);
        const dirty = [];
        const signatures = [];
        for (let row = 0; row < target.rows; row++) {
            for (let column = 0; column < target.columns; column++) {
                const index = (row * target.columns) + column;
                const region = { x0: column * TILE, y0: row * TILE, x1: Math.min(width, (column + 1) * TILE), y1: Math.min(height, (row + 1) * TILE) };
                const signature = [backdrop];
                for (let i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    if (box.left < region.x1 && box.right >= region.x0 && box.top < region.y1 && box.bottom >= region.y0) signature.push(ids[i]);
                }
                signatures[index] = signature;
                const previous = target.signatures[index];
                const same = previous && previous.length === signature.length && previous.every((id, i) => id === signature[i]);
                if (everything || forced.has(index) || !same) dirty.push({ index, ...region });
            }
        }
        const rects = [];
        if (dirty.length) {
            const pixels = await pool.compositeRegions({ ...scene, layers: resolved }, dirty.map(({ x0, y0, x1, y1 }) => ({ x0, y0, x1, y1 })));
            dirty.forEach((region, i) => {
                const rowBytes = (region.x1 - region.x0) * 4;
                for (let row = region.y0; row < region.y1; row++) {
                    const from = (row - region.y0) * rowBytes;
                    target.data.set(pixels[i].subarray(from, from + rowBytes), ((row * width) + region.x0) * 4);
                }
                target.signatures[region.index] = signatures[region.index];
                rects.push({ x: region.x0, y: region.y0, width: region.x1 - region.x0, height: region.y1 - region.y0 });
            });
        }
        const full = target.fresh;
        target.fresh = false;
        return { width, height, data: target.data, dirty: full ? [{ x: 0, y: 0, width, height }] : rects };
    };

    const rasterKeysOf = (key, skin) => (skin.kind === 'svg' ? [...skin.ready.values()] : [key]);

    const request = (key, skin, mipScale) => {
        if (skin.pending.has(mipScale)) return;
        const width = Math.floor(skin.size[0] * mipScale);
        const height = Math.floor(skin.size[1] * mipScale);
        if (width <= 0 || height <= 0) return;
        skin.pending.add(mipScale);
        const job = pool.rasterize({ svg: skin.svg, scale: mipScale, width, height }).then(data => {
            skin.pending.delete(mipScale);
            if (skins.get(key) !== skin) return;
            const rasterKey = `${key}@${mipScale}`;
            pool.upload([{ key: rasterKey, width, height, data, premultiplied: false }]);
            skin.ready.set(mipScale, rasterKey);
        });
        inFlight.add(job);
        job.finally(() => inFlight.delete(job));
    };

    const bestReady = (skin, mipScale) => {
        let best = null;
        let bestDistance = Infinity;
        for (const [scale, rasterKey] of skin.ready) {
            const distance = Math.abs(Math.log2(scale / mipScale));
            if (distance < bestDistance) {
                best = rasterKey;
                bestDistance = distance;
            }
        }
        return best;
    };

    return {
        apply(update) {
            const uploads = [];
            const dropped = [];
            for (const key of update.dropped ?? []) {
                const skin = skins.get(key);
                if (!skin) continue;
                dropped.push(...rasterKeysOf(key, skin));
                skins.delete(key);
            }
            for (const entry of update.skins ?? []) {
                if (entry.patch) {
                    uploads.push(entry);
                    patches.push({ key: entry.key, x: entry.patch.x, y: entry.patch.y, width: entry.patch.width, height: entry.patch.height });
                } else if (entry.kind === 'svg') {
                    skins.set(entry.key, { kind: 'svg', svg: entry.svg, size: entry.size, maxTextureScale: entry.maxTextureScale, ready: new Map(), pending: new Set() });
                } else {
                    skins.set(entry.key, { kind: 'raster' });
                    uploads.push({ key: entry.key, width: entry.width, height: entry.height, data: entry.data, premultiplied: entry.premultiplied });
                }
            }
            pool.drop(dropped);
            pool.upload(uploads);
            current = { scene: update.scene, bubbles: update.bubbles ?? [] };
        },

        get bubbles() {
            return current.bubbles;
        },

        render({ width = NATIVE_WIDTH, height = (width * 3) / 4 } = {}) {
            const displayScale = width / NATIVE_WIDTH;
            const layers = [];
            for (const layer of current.scene.layers) {
                const skin = skins.get(layer.skin);
                if (!skin) continue;
                if (skin.kind !== 'svg') {
                    layers.push({ ...layer, raster: layer.skin });
                    continue;
                }
                const { mipScale } = mipScaleFor([layer.scale[0] * displayScale, layer.scale[1] * displayScale], skin.maxTextureScale);
                const exact = skin.ready.get(mipScale);
                if (!exact) request(layer.skin, skin, mipScale);
                const raster = exact ?? bestReady(skin, mipScale);
                if (raster) layers.push({ ...layer, raster });
            }
            const background = current.scene.background;
            const run = tail.then(() => paintFrame({ width, height, background, layers: [] }, layers));
            tail = run.catch(() => {});
            return run;
        },

        get busy() {
            return inFlight.size > 0;
        },

        async settle() {
            while (inFlight.size) await Promise.all([...inFlight]);
        },
    };
}
