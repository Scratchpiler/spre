import hull from 'hull.js';
import { Drawable, localPositionOf } from './drawable.js';
import { EFFECT_INFO, transformColor, transformPoint } from './effects.js';
import { Rectangle } from './rectangle.js';
import { packPixels, unpackPixels } from './pixels.js';
import { BitmapSkin, PenSkin, SvgSkin, TextSkin } from './skins.js';
import { v3 } from './twgl.js';

const FENCE_WIDTH = 15;
const MAX_TOUCH_SIZE = [3, 3];
const touchingPoint = v3.create();
const candidatesBounds = new Rectangle();
const fenceBounds = new Rectangle();
const touchingColor = new Uint8ClampedArray(4);
const blendColor = new Uint8ClampedArray(4);
const stampColor = new Uint8ClampedArray(4);

const maskMatches = (a, b) => (
    a[3] > 0
    && (a[0] & 0b11111100) === (b[0] & 0b11111100)
    && (a[1] & 0b11111100) === (b[1] & 0b11111100)
    && (a[2] & 0b11111100) === (b[2] & 0b11111100)
);

const colorMatches = (a, b, offset) => (
    (a[0] & 0b11111000) === (b[offset + 0] & 0b11111000)
    && (a[1] & 0b11111000) === (b[offset + 1] & 0b11111000)
    && (a[2] & 0b11110000) === (b[offset + 2] & 0b11110000)
);

const determinant = (A, B, C) => ((B[0] - A[0]) * (C[1] - A[1])) - ((B[1] - A[1]) * (C[0] - A[0]));

export function sampleColor3b(vec, candidates, dst = new Uint8ClampedArray(3)) {
    dst.fill(0);
    let blendAlpha = 1;
    for (let index = 0; blendAlpha !== 0 && index < candidates.length; index++) {
        candidates[index].drawable.sampleColor4b(vec, blendColor);
        dst[0] += blendColor[0] * blendAlpha;
        dst[1] += blendColor[1] * blendAlpha;
        dst[2] += blendColor[2] * blendAlpha;
        blendAlpha *= 1 - (blendColor[3] / 255);
    }
    dst[0] += blendAlpha * 255;
    dst[1] += blendAlpha * 255;
    dst[2] += blendAlpha * 255;
    return dst;
}

const toImageData = bitmap => {
    if (bitmap?.data && bitmap.width !== undefined) return bitmap;
    if (bitmap && typeof bitmap.getContext === 'function') {
        if (!bitmap.width || !bitmap.height) return { width: 0, height: 0, data: new Uint8ClampedArray(0) };
        return bitmap.getContext('2d').getImageData(0, 0, bitmap.width, bitmap.height);
    }
    return { width: bitmap?.width ?? 0, height: bitmap?.height ?? 0, data: new Uint8ClampedArray(0) };
};

export class CpuRenderer {
    constructor({ rasterizer, nativeSize = [480, 360] } = {}) {
        this.rasterizer = rasterizer;
        this.nativeSize = [...nativeSize];
        this.xLeft = -nativeSize[0] / 2;
        this.xRight = nativeSize[0] / 2;
        this.yBottom = -nativeSize[1] / 2;
        this.yTop = nativeSize[1] / 2;
        this.groupOrdering = [];
        this.layerGroups = {};
        this.drawList = [];
        this.allDrawables = [];
        this.allSkins = [];
        this.nextDrawableId = 0;
        this.nextSkinId = 0;
        this.backgroundColor3b = new Uint8ClampedArray([255, 255, 255]);
        this.frames = 0;
    }

    get isCpuRenderer() {
        return true;
    }

    setBackgroundColor(red, green, blue) {
        this.backgroundColor3b[0] = red * 255;
        this.backgroundColor3b[1] = green * 255;
        this.backgroundColor3b[2] = blue * 255;
    }

    getNativeSize() {
        return [...this.nativeSize];
    }

    setLayerGroupOrdering(ordering) {
        this.groupOrdering = [...ordering];
        this.layerGroups = {};
        this.groupOrdering.forEach((name, groupIndex) => {
            this.layerGroups[name] = { groupIndex, drawListOffset: 0 };
        });
    }

    endIndexForKnownLayerGroup(group) {
        if (group.groupIndex === this.groupOrdering.length - 1) return this.drawList.length;
        return this.layerGroups[this.groupOrdering[group.groupIndex + 1]].drawListOffset;
    }

    updateOffsets(delta, groupIndex) {
        for (let i = groupIndex + 1; i < this.groupOrdering.length; i++) {
            this.layerGroups[this.groupOrdering[i]].drawListOffset += delta;
        }
    }

    createDrawable(group) {
        const layerGroup = this.layerGroups[group];
        if (!layerGroup) return undefined;
        const id = this.nextDrawableId++;
        const drawable = new Drawable(id, group);
        drawable.skin = null;
        this.allDrawables[id] = drawable;
        this.drawList.splice(this.endIndexForKnownLayerGroup(layerGroup), 0, id);
        this.updateOffsets(1, layerGroup.groupIndex);
        return id;
    }

    destroyDrawable(id, group) {
        const layerGroup = this.layerGroups[group];
        const drawable = this.allDrawables[id];
        if (!layerGroup || !drawable) return;
        drawable.dispose();
        delete this.allDrawables[id];
        const end = this.endIndexForKnownLayerGroup(layerGroup);
        for (let index = layerGroup.drawListOffset; index < end; index++) {
            if (this.drawList[index] !== id) continue;
            this.drawList.splice(index, 1);
            this.updateOffsets(-1, layerGroup.groupIndex);
            return;
        }
    }

    getDrawableOrder(id) {
        return this.drawList.indexOf(id);
    }

    setDrawableOrder(id, order, group, isRelative, min) {
        const layerGroup = this.layerGroups[group];
        if (!layerGroup) return undefined;
        const start = layerGroup.drawListOffset;
        const end = this.endIndexForKnownLayerGroup(layerGroup);
        let oldIndex = start;
        while (oldIndex < end && this.drawList[oldIndex] !== id) oldIndex++;
        if (oldIndex >= end) return null;
        if (order === 0) return oldIndex;
        this.drawList.splice(oldIndex, 1);
        let newIndex = isRelative ? order + oldIndex : order;
        const possibleMin = (min || 0) + start;
        newIndex = Math.max(newIndex, possibleMin >= start && possibleMin < end ? possibleMin : start);
        newIndex = Math.min(newIndex, end);
        this.drawList.splice(newIndex, 0, id);
        return newIndex;
    }

    get visibleDrawList() {
        return this.drawList.filter(id => this.allDrawables[id].visible);
    }

    addSkin(skin) {
        this.allSkins[skin.id] = skin;
        return skin.id;
    }

    reskin(skinId, newSkin) {
        const oldSkin = this.allSkins[skinId];
        this.allSkins[skinId] = newSkin;
        for (const drawable of this.allDrawables) {
            if (drawable && drawable.skin === oldSkin) drawable.skin = newSkin;
        }
        oldSkin?.dispose();
    }

    createSVGSkin(svg, rotationCenter) {
        const skin = new SvgSkin(this.nextSkinId++, this.rasterizer);
        skin.setSVG(svg, rotationCenter);
        return this.addSkin(skin);
    }

    updateSVGSkin(skinId, svg, rotationCenter) {
        const existing = this.allSkins[skinId];
        if (existing instanceof SvgSkin) {
            existing.setSVG(svg, rotationCenter);
            return;
        }
        const skin = new SvgSkin(skinId, this.rasterizer);
        skin.setSVG(svg, rotationCenter);
        this.reskin(skinId, skin);
    }

    createBitmapSkin(bitmap, resolution, rotationCenter) {
        const skin = new BitmapSkin(this.nextSkinId++);
        skin.setBitmap(toImageData(bitmap), resolution, rotationCenter);
        return this.addSkin(skin);
    }

    updateBitmapSkin(skinId, bitmap, resolution, rotationCenter) {
        const existing = this.allSkins[skinId];
        if (existing instanceof BitmapSkin) {
            existing.setBitmap(toImageData(bitmap), resolution, rotationCenter);
            return;
        }
        const skin = new BitmapSkin(skinId);
        skin.setBitmap(toImageData(bitmap), resolution, rotationCenter);
        this.reskin(skinId, skin);
    }

    createPenSkin() {
        return this.addSkin(new PenSkin(this.nextSkinId++, this.nativeSize));
    }

    createTextSkin(type, text, pointsLeft) {
        const skin = new TextSkin(this.nextSkinId++);
        skin.setTextAndType(type, text, pointsLeft);
        return this.addSkin(skin);
    }

    updateTextSkin(skinId, type, text, pointsLeft) {
        const existing = this.allSkins[skinId];
        if (existing instanceof TextSkin) {
            existing.setTextAndType(type, text, pointsLeft);
            return;
        }
        const skin = new TextSkin(skinId);
        skin.setTextAndType(type, text, pointsLeft);
        this.reskin(skinId, skin);
    }

    destroySkin(skinId) {
        this.allSkins[skinId]?.dispose();
        delete this.allSkins[skinId];
    }

    updateDrawableSkinId(id, skinId) {
        const drawable = this.allDrawables[id];
        if (drawable) drawable.skin = this.allSkins[skinId] ?? null;
    }

    updateDrawablePosition(id, position) {
        this.allDrawables[id]?.updatePosition(position);
    }

    updateDrawableDirection(id, direction) {
        this.allDrawables[id]?.updateDirection(direction);
    }

    updateDrawableScale(id, scale) {
        this.allDrawables[id]?.updateScale(scale);
    }

    updateDrawableDirectionScale(id, direction, scale) {
        const drawable = this.allDrawables[id];
        if (!drawable) return;
        drawable.updateDirection(direction);
        drawable.updateScale(scale);
    }

    updateDrawableVisible(id, visible) {
        this.allDrawables[id]?.updateVisible(visible);
    }

    updateDrawableEffect(id, name, value) {
        this.allDrawables[id]?.updateEffect(name, value);
    }

    updateDrawableProperties(id, properties) {
        const drawable = this.allDrawables[id];
        if (!drawable) return;
        if ('skinId' in properties) this.updateDrawableSkinId(id, properties.skinId);
        if ('position' in properties) drawable.updatePosition(properties.position);
        if ('direction' in properties) drawable.updateDirection(properties.direction);
        if ('scale' in properties) drawable.updateScale(properties.scale);
        if ('visible' in properties) drawable.updateVisible(properties.visible);
        for (const name of Object.keys(EFFECT_INFO)) {
            if (name in properties) drawable.updateEffect(name, properties[name]);
        }
    }

    getCurrentSkinSize(id) {
        const skin = this.allDrawables[id]?.skin;
        return skin ? skin.size : [100, 100];
    }

    getSkinSize(skinId) {
        return this.allSkins[skinId]?.size ?? [0, 0];
    }

    getSkinRotationCenter(skinId) {
        return this.allSkins[skinId]?.calculateRotationCenter() ?? [0, 0];
    }

    getFencedPositionOfDrawable(id, position) {
        let x = position[0];
        let y = position[1];
        const drawable = this.allDrawables[id];
        if (!drawable) return [x, y];
        const dx = x - drawable.position[0];
        const dy = y - drawable.position[1];
        const aabb = drawable.getAABB(fenceBounds);
        const inset = Math.floor(Math.min(aabb.width, aabb.height) / 2);
        const sx = this.xRight - Math.min(FENCE_WIDTH, inset);
        if (aabb.right + dx < -sx) x = Math.ceil(drawable.position[0] - (sx + aabb.right));
        else if (aabb.left + dx > sx) x = Math.floor(drawable.position[0] + (sx - aabb.left));
        const sy = this.yTop - Math.min(FENCE_WIDTH, inset);
        if (aabb.top + dy < -sy) y = Math.ceil(drawable.position[1] - (sy + aabb.top));
        else if (aabb.bottom + dy > sy) y = Math.floor(drawable.position[1] + (sy - aabb.bottom));
        return [x, y];
    }

    convexHullPointsOf(id) {
        const drawable = this.allDrawables[id];
        const [width, height] = drawable.skin.size;
        if (!drawable.visible || width === 0 || height === 0) return [];
        drawable.updateCPURenderAttributes();
        const leftHull = [];
        const rightHull = [];
        let leftEnd = -1;
        let rightEnd = -1;
        const pixel = v3.create();
        const effected = v3.create();
        let current;
        for (let y = 0; y < height; y++) {
            pixel[1] = y / height;
            let x = 0;
            for (; x < width; x++) {
                pixel[0] = x / width;
                transformPoint(drawable, pixel, effected);
                if (drawable.skin.isTouchingLinear(effected)) {
                    current = [x, y];
                    break;
                }
            }
            if (x >= width) continue;
            while (leftEnd > 0 && !(determinant(leftHull[leftEnd], leftHull[leftEnd - 1], current) > 0)) --leftEnd;
            leftHull[++leftEnd] = current;
            for (x = width - 1; x >= 0; x--) {
                pixel[0] = x / width;
                transformPoint(drawable, pixel, effected);
                if (drawable.skin.isTouchingLinear(effected)) {
                    current = [x, y];
                    break;
                }
            }
            while (rightEnd > 0 && !(determinant(rightHull[rightEnd], rightHull[rightEnd - 1], current) < 0)) --rightEnd;
            rightHull[++rightEnd] = current;
        }
        const points = leftHull;
        points.length = leftEnd + 1;
        for (let j = rightEnd; j >= 0; --j) points.push(rightHull[j]);
        return hull(points, Infinity);
    }

    ensureHull(drawable) {
        if (drawable.needsConvexHullPoints()) drawable.setConvexHullPoints(this.convexHullPointsOf(drawable.id));
    }

    getBounds(id) {
        const drawable = this.allDrawables[id];
        if (!drawable?.skin) return null;
        this.ensureHull(drawable);
        return drawable.getFastBounds();
    }

    getBoundsForBubble(id) {
        const drawable = this.allDrawables[id];
        if (!drawable?.skin) return null;
        this.ensureHull(drawable);
        return drawable.getBoundsForBubble();
    }

    touchingBounds(id) {
        const drawable = this.allDrawables[id];
        if (!drawable.skin || !drawable.skin.getTexture([100, 100])) return null;
        const bounds = drawable.getFastBounds();
        bounds.clamp(this.xLeft, this.xRight, this.yBottom, this.yTop);
        bounds.snapToInt();
        if (bounds.width === 0 || bounds.height === 0) return null;
        return bounds;
    }

    candidatesTouching(id, candidateIds) {
        const bounds = this.touchingBounds(id);
        const result = [];
        if (bounds === null) return result;
        for (let index = candidateIds.length - 1; index >= 0; index--) {
            const candidateId = candidateIds[index];
            if (candidateId === id) continue;
            const drawable = this.allDrawables[candidateId];
            if (drawable.skin instanceof TextSkin) continue;
            if (!drawable.skin || !drawable.visible) continue;
            drawable.updateCPURenderAttributes();
            const candidateBounds = drawable.getFastBounds();
            candidateBounds.snapToInt();
            if (bounds.intersects(candidateBounds)) {
                result.push({ id: candidateId, drawable, intersection: Rectangle.intersect(bounds, candidateBounds) });
            }
        }
        return result;
    }

    static candidatesBounds(candidates) {
        return candidates.reduce((memo, { intersection }) => (memo ? Rectangle.union(memo, intersection, candidatesBounds) : intersection), null);
    }

    isTouchingColor(id, color3b, mask3b) {
        const candidates = this.candidatesTouching(id, this.visibleDrawList);
        let bounds;
        if (colorMatches(color3b, this.backgroundColor3b, 0)) {
            bounds = this.touchingBounds(id);
            if (bounds === null) return false;
        } else if (candidates.length === 0) {
            return false;
        } else {
            bounds = CpuRenderer.candidatesBounds(candidates);
        }
        const drawable = this.allDrawables[id];
        const point = touchingPoint;
        const color = touchingColor;
        const hasMask = Boolean(mask3b);
        drawable.updateCPURenderAttributes();
        const effectMask = ~EFFECT_INFO.ghost.mask;
        for (let y = bounds.bottom; y <= bounds.top; y++) {
            for (let x = bounds.left; x <= bounds.right; x++) {
                point[1] = y;
                point[0] = x;
                const inside = hasMask ? maskMatches(drawable.sampleColor4b(point, color, effectMask), mask3b) : drawable.isTouching(point);
                if (inside) {
                    sampleColor3b(point, candidates, color);
                    if (colorMatches(color, color3b, 0)) return true;
                }
            }
        }
        return false;
    }

    isTouchingDrawables(id, candidateIds = this.drawList) {
        const candidates = this.candidatesTouching(id, candidateIds.filter(candidateId => this.allDrawables[candidateId]?.visible));
        if (candidates.length === 0 || !this.allDrawables[id].visible) return false;
        const bounds = CpuRenderer.candidatesBounds(candidates);
        const drawable = this.allDrawables[id];
        const point = touchingPoint;
        drawable.updateCPURenderAttributes();
        for (let x = bounds.left; x <= bounds.right; x++) {
            point[0] = x;
            for (let y = bounds.bottom; y <= bounds.top; y++) {
                point[1] = y;
                if (drawable.isTouching(point)) {
                    for (let index = 0; index < candidates.length; index++) {
                        if (candidates[index].drawable.isTouching(point)) return true;
                    }
                }
            }
        }
        return false;
    }

    clientSpaceToScratchBounds(centerX, centerY, widthIn = 1, heightIn = 1) {
        const width = Math.max(1, Math.min(Math.round(widthIn), MAX_TOUCH_SIZE[0]));
        const height = Math.max(1, Math.min(Math.round(heightIn), MAX_TOUCH_SIZE[1]));
        const x = centerX - ((width - 1) / 2);
        const y = centerY + ((height - 1) / 2);
        const xOfs = width % 2 ? 0 : -0.5;
        const yOfs = height % 2 ? 0 : -0.5;
        return new Rectangle().initFromBounds(
            Math.floor(this.xLeft + x + xOfs),
            Math.floor(this.xLeft + x + xOfs + width - 1),
            Math.ceil(this.yTop - y + yOfs),
            Math.ceil(this.yTop - y + yOfs + height - 1),
        );
    }

    drawableTouching(id, centerX, centerY, touchWidth, touchHeight) {
        const drawable = this.allDrawables[id];
        if (!drawable) return false;
        const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
        const position = v3.create();
        drawable.updateCPURenderAttributes();
        for (position[1] = bounds.bottom; position[1] <= bounds.top; position[1]++) {
            for (position[0] = bounds.left; position[0] <= bounds.right; position[0]++) {
                if (drawable.isTouching(position)) return true;
            }
        }
        return false;
    }

    pick(centerX, centerY, touchWidth, touchHeight, candidateIdsIn) {
        const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
        if (bounds.left === -Infinity || bounds.bottom === -Infinity) return false;
        const candidateIds = (candidateIdsIn || this.drawList).filter(id => {
            const drawable = this.allDrawables[id];
            if (!drawable.visible || drawable.uniforms.u_ghost === 0) return false;
            if (!bounds.intersects(drawable.getFastBounds())) return false;
            drawable.updateCPURenderAttributes();
            return true;
        });
        if (candidateIds.length === 0) return false;
        const hits = [];
        const position = v3.create(0, 0, 0);
        for (position[1] = bounds.bottom; position[1] <= bounds.top; position[1]++) {
            for (position[0] = bounds.left; position[0] <= bounds.right; position[0]++) {
                for (let d = candidateIds.length - 1; d >= 0; d--) {
                    const id = candidateIds[d];
                    if (this.allDrawables[id].isTouching(position)) {
                        hits[id] = (hits[id] || 0) + 1;
                        break;
                    }
                }
            }
        }
        hits[-1] = 0;
        let hit = -1;
        for (const hitId in hits) {
            if (Object.hasOwn(hits, hitId) && hits[hitId] > hits[hit]) hit = hitId;
        }
        return Number(hit);
    }

    penClear(penSkinId) {
        this.allSkins[penSkinId]?.clear();
    }

    penPoint(penSkinId, attributes, x, y) {
        this.allSkins[penSkinId]?.drawPoint(attributes, x, y);
    }

    penLine(penSkinId, attributes, x0, y0, x1, y1) {
        this.allSkins[penSkinId]?.drawLine(attributes, x0, y0, x1, y1);
    }

    penStamp(penSkinId, stampId) {
        const stamp = this.allDrawables[stampId];
        const pen = this.allSkins[penSkinId];
        if (!stamp || !pen) return;
        const bounds = this.touchingBounds(stampId);
        if (!bounds) return;
        stamp.skin.getTexture(stamp.scaleVector);
        stamp.updateMatrix();
        const nearest = stamp.skin.useNearest(stamp.scaleVector, stamp);
        const [penWidth, penHeight] = pen.size;
        const pixels = pen.pixels;
        const point = v3.create();
        let wrote = false;
        let dirtyLeft = penWidth;
        let dirtyRight = -1;
        let dirtyTop = penHeight;
        let dirtyBottom = -1;
        for (let row = 0; row < bounds.height; row++) {
            const y = bounds.top - row - 0.5;
            const penRow = Math.floor((penHeight / 2) - y);
            if (penRow < 0 || penRow >= penHeight) continue;
            for (let column = 0; column < bounds.width; column++) {
                const x = bounds.left + column + 0.5;
                const penColumn = Math.floor(x + (penWidth / 2));
                if (penColumn < 0 || penColumn >= penWidth) continue;
                point[0] = x;
                point[1] = y;
                const local = localPositionOf(stamp, point);
                if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) continue;
                const color = nearest ? stamp.skin.silhouette.colorAtNearest(local, stampColor) : stamp.skin.silhouette.colorAtLinear(local, stampColor);
                if (stamp.enabledEffects !== 0) transformColor(stamp, color);
                if (color[3] === 0) continue;
                const index = ((penRow * penWidth) + penColumn) * 4;
                const keep = 1 - (color[3] / 255);
                pixels[index] = color[0] + (pixels[index] * keep);
                pixels[index + 1] = color[1] + (pixels[index + 1] * keep);
                pixels[index + 2] = color[2] + (pixels[index + 2] * keep);
                pixels[index + 3] = color[3] + (pixels[index + 3] * keep);
                wrote = true;
                if (penColumn < dirtyLeft) dirtyLeft = penColumn;
                if (penColumn > dirtyRight) dirtyRight = penColumn;
                if (penRow < dirtyTop) dirtyTop = penRow;
                if (penRow > dirtyBottom) dirtyBottom = penRow;
            }
        }
        if (wrote) {
            pen.markDirty(dirtyLeft, dirtyTop, dirtyRight, dirtyBottom);
            pen.touched();
        }
    }

    save() {
        return {
            background: [...this.backgroundColor3b],
            groups: this.groupOrdering.map(name => this.layerGroups[name].drawListOffset),
            drawList: [...this.drawList],
            nextDrawableId: this.nextDrawableId,
            nextSkinId: this.nextSkinId,
            drawables: this.allDrawables.filter(Boolean).map(drawable => ({
                id: drawable.id,
                group: drawable.group,
                skinId: drawable.skin ? drawable.skin.id : null,
                position: [drawable.position[0], drawable.position[1]],
                direction: drawable.direction,
                scale: drawable.scale,
                visible: drawable.visible,
                effects: { ...drawable.effectValues },
                hull: !drawable.needsConvexHullPoints(),
            })),
            skins: this.allSkins.filter(Boolean).map(skin => {
                const saved = { id: skin.id, kind: skin.kind ?? 'empty', size: skin.size };
                if (skin instanceof SvgSkin) saved.mip = skin.largestMIPScale;
                if (skin instanceof PenSkin) saved.pixels = packPixels(skin.pixels);
                if (skin instanceof TextSkin) saved.params = { ...skin.params };
                return saved;
            }),
        };
    }

    load(saved) {
        this.backgroundColor3b.set(saved.background);
        saved.groups.forEach((offset, i) => { this.layerGroups[this.groupOrdering[i]].drawListOffset = offset; });
        const keep = new Set(saved.skins.map(skin => skin.id));
        this.allSkins.forEach((skin, id) => { if (skin && !keep.has(id)) this.destroySkin(id); });
        for (const entry of saved.skins) {
            let skin = this.allSkins[entry.id];
            if (entry.kind === 'text') {
                if (!(skin instanceof TextSkin)) skin = this.allSkins[entry.id] = new TextSkin(entry.id);
                skin.setTextAndType(entry.params.type, entry.params.text, entry.params.pointsLeft);
            } else if (entry.kind === 'pen') {
                if (!(skin instanceof PenSkin)) skin = this.allSkins[entry.id] = new PenSkin(entry.id, this.nativeSize);
                unpackPixels(entry.pixels, skin.pixels);
                skin.markDirty(0, 0, skin.penSize[0] - 1, skin.penSize[1] - 1);
                skin.touched();
            } else if (!skin || (skin.kind ?? 'empty') !== entry.kind) {
                throw new Error(`renderer has no ${entry.kind} skin ${entry.id} to restore; is this the same project?`);
            }
            if (entry.kind === 'svg' && skin.largestMIPScale !== entry.mip) {
                skin.resetMIPs();
                if (entry.mip > 0) skin.restoreSilhouette(entry.mip);
            }
        }
        for (const drawable of this.allDrawables) drawable?.dispose();
        this.allDrawables = [];
        for (const entry of saved.drawables) {
            const drawable = new Drawable(entry.id, entry.group);
            drawable.skin = entry.skinId === null ? null : this.allSkins[entry.skinId] ?? null;
            drawable.updatePosition(entry.position);
            drawable.updateDirection(entry.direction);
            drawable.updateScale(entry.scale);
            drawable.updateVisible(entry.visible);
            for (const [name, value] of Object.entries(entry.effects)) drawable.updateEffect(name, value);
            this.allDrawables[entry.id] = drawable;
        }
        for (const entry of saved.drawables) {
            if (entry.hull) this.ensureHull(this.allDrawables[entry.id]);
        }
        this.drawList = [...saved.drawList];
        this.nextDrawableId = saved.nextDrawableId;
        this.nextSkinId = saved.nextSkinId;
    }

    resize() {}

    setStageSize() {}

    setUseGpuMode() {}

    setDebugCanvas() {}

    requestSnapshot(callback) {
        this.snapshotProvider?.(callback);
    }

    draw() {
        for (const id of this.drawList) {
            const drawable = this.allDrawables[id];
            if (drawable.visible && drawable.skin) drawable.skin.getTexture(drawable.scaleVector);
        }
        this.frames++;
    }
}
