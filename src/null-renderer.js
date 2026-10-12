import { costumeGeometry, svgViewBox } from './geometry.js';

const FENCE_WIDTH = 15;
const STAGE_WIDTH = 480;
const STAGE_HEIGHT = 360;
const X_RIGHT = STAGE_WIDTH / 2;
const Y_TOP = STAGE_HEIGHT / 2;
const UNKNOWN_SKIN_SIZE = [100, 100];
const fenceBounds = { left: 0, right: 0, top: 0, bottom: 0 };

class Drawable {
    constructor(id, group) {
        this.id = id;
        this.group = group;
        this.skinId = null;
        this.visible = true;
        this.direction = 90;
        this.scale = new Float32Array([100, 100, 0]);
        this.position = new Float32Array(3);
        this.effects = {};
        this.rotationMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        this.rotationAdjusted = new Float32Array(3);
        this.skinScale = new Float32Array(3);
        this.model = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        this.rotationDirty = true;
        this.skinDirty = true;
        this.transformDirty = true;
    }

    transform(skin) {
        if (!this.transformDirty) return this.model;
        if (this.rotationDirty) {
            const rotation = (270 - this.direction) * Math.PI / 180;
            const c = Math.cos(rotation);
            const s = Math.sin(rotation);
            this.rotationMatrix[0] = c;
            this.rotationMatrix[1] = s;
            this.rotationMatrix[4] = -s;
            this.rotationMatrix[5] = c;
            this.rotationDirty = false;
        }
        if (this.skinDirty && skin) {
            this.rotationAdjusted[0] = (skin.rotationCenter[0] - (skin.size[0] / 2)) * this.scale[0] / 100;
            this.rotationAdjusted[1] = ((skin.rotationCenter[1] - (skin.size[1] / 2)) * this.scale[1] / 100) * -1;
            this.skinScale[0] = skin.size[0] * this.scale[0] / 100;
            this.skinScale[1] = skin.size[1] * this.scale[1] / 100;
            this.skinDirty = false;
        }
        const r = this.rotationMatrix;
        const m = this.model;
        m[0] = this.skinScale[0] * r[0];
        m[1] = this.skinScale[0] * r[1];
        m[4] = this.skinScale[1] * r[4];
        m[5] = this.skinScale[1] * r[5];
        m[12] = (r[0] * this.rotationAdjusted[0]) + (r[4] * this.rotationAdjusted[1]) + this.position[0];
        m[13] = (r[1] * this.rotationAdjusted[0]) + (r[5] * this.rotationAdjusted[1]) + this.position[1];
        this.transformDirty = false;
        return m;
    }

    aabb(skin, out) {
        const m = this.transform(skin);
        const x = Math.abs(0.5 * m[0]) + Math.abs(0.5 * m[4]);
        const y = Math.abs(0.5 * m[1]) + Math.abs(0.5 * m[5]);
        out.left = -x + m[12];
        out.right = x + m[12];
        out.top = y + m[13];
        out.bottom = -y + m[13];
        return out;
    }

    save() {
        return {
            id: this.id,
            group: this.group,
            skinId: this.skinId,
            visible: this.visible,
            direction: this.direction,
            scale: [this.scale[0], this.scale[1]],
            position: [this.position[0], this.position[1]],
            effects: { ...this.effects },
        };
    }

    static load(saved) {
        const drawable = new Drawable(saved.id, saved.group);
        drawable.skinId = saved.skinId;
        drawable.visible = saved.visible;
        drawable.direction = saved.direction;
        drawable.scale[0] = saved.scale[0];
        drawable.scale[1] = saved.scale[1];
        drawable.position[0] = saved.position[0];
        drawable.position[1] = saved.position[1];
        drawable.effects = { ...saved.effects };
        return drawable;
    }
}

export function createNullRenderer() {
    let groupOrdering = [];
    let groups = {};
    let drawList = [];
    let drawables = new Map();
    let skins = new Map();
    let nextDrawableId = 0;
    let nextSkinId = 0;
    let frames = 0;

    const endIndexOf = group => (group.index === groupOrdering.length - 1
        ? drawList.length
        : groups[groupOrdering[group.index + 1]].offset);

    const shiftLaterGroups = (index, delta) => {
        for (let i = index + 1; i < groupOrdering.length; i++) groups[groupOrdering[i]].offset += delta;
    };

    const addSkin = (size, rotationCenter) => {
        const id = nextSkinId++;
        skins.set(id, { size: [...size], rotationCenter: [...rotationCenter] });
        return id;
    };

    const setSkin = (id, size, rotationCenter) => {
        skins.set(id, { size: [...size], rotationCenter: [...rotationCenter] });
        for (const drawable of drawables.values()) {
            if (drawable.skinId === id) {
                drawable.skinDirty = true;
                drawable.transformDirty = true;
            }
        }
    };

    const svgSkinGeometry = (svg, rotationCenter) => {
        const box = svgViewBox(String(svg));
        if (!box) return { size: [0, 0], rotationCenter: [0, 0] };
        const center = rotationCenter ?? [box.width / 2, box.height / 2];
        return { size: [box.width, box.height], rotationCenter: [center[0] - box.x, center[1] - box.y] };
    };

    const bitmapSkinGeometry = (bitmap, resolution = 2, rotationCenter) => {
        const size = [(bitmap?.width ?? 0) / resolution, (bitmap?.height ?? 0) / resolution];
        return { size, rotationCenter: rotationCenter ?? [size[0] / 2, size[1] / 2] };
    };

    const drawableOf = id => drawables.get(id);
    const skinOf = drawable => (drawable && drawable.skinId !== null ? skins.get(drawable.skinId) : undefined);

    const touch = (id, change) => {
        const drawable = drawables.get(id);
        if (!drawable) return;
        change(drawable);
    };

    return {
        isNullRenderer: true,

        setLayerGroupOrdering(ordering) {
            groupOrdering = [...ordering];
            groups = Object.fromEntries(groupOrdering.map((name, index) => [name, { index, offset: 0 }]));
        },

        createDrawable(groupName) {
            const group = groups[groupName];
            if (!group) return undefined;
            const id = nextDrawableId++;
            drawables.set(id, new Drawable(id, groupName));
            drawList.splice(endIndexOf(group), 0, id);
            shiftLaterGroups(group.index, 1);
            return id;
        },

        destroyDrawable(id, groupName) {
            const group = groups[groupName];
            if (!group || !drawables.has(id)) return;
            drawables.delete(id);
            const end = endIndexOf(group);
            for (let i = group.offset; i < end; i++) {
                if (drawList[i] !== id) continue;
                drawList.splice(i, 1);
                shiftLaterGroups(group.index, -1);
                return;
            }
        },

        getDrawableOrder: id => drawList.indexOf(id),

        setDrawableOrder(id, order, groupName, isRelative, min) {
            const group = groups[groupName];
            if (!group) return undefined;
            const start = group.offset;
            const end = endIndexOf(group);
            let oldIndex = start;
            while (oldIndex < end && drawList[oldIndex] !== id) oldIndex++;
            if (oldIndex >= end) return null;
            if (order === 0) return oldIndex;
            drawList.splice(oldIndex, 1);
            let newIndex = isRelative ? order + oldIndex : order;
            const possibleMin = (min || 0) + start;
            newIndex = Math.max(newIndex, possibleMin >= start && possibleMin < end ? possibleMin : start);
            newIndex = Math.min(newIndex, end);
            drawList.splice(newIndex, 0, id);
            return newIndex;
        },

        updateDrawableSkinId: (id, skinId) => touch(id, drawable => {
            if (drawable.skinId === (skinId ?? null)) return;
            drawable.skinId = skinId ?? null;
            drawable.skinDirty = true;
            drawable.transformDirty = true;
        }),

        updateDrawablePosition: (id, position) => touch(id, drawable => {
            if (drawable.position[0] === position[0] && drawable.position[1] === position[1]) return;
            drawable.position[0] = Math.round(position[0]);
            drawable.position[1] = Math.round(position[1]);
            drawable.transformDirty = true;
        }),

        updateDrawableDirectionScale: (id, direction, scale) => touch(id, drawable => {
            if (drawable.direction !== direction) {
                drawable.direction = direction;
                drawable.rotationDirty = true;
                drawable.transformDirty = true;
            }
            if (drawable.scale[0] !== scale[0] || drawable.scale[1] !== scale[1]) {
                drawable.scale[0] = scale[0];
                drawable.scale[1] = scale[1];
                drawable.skinDirty = true;
                drawable.transformDirty = true;
            }
        }),

        updateDrawableVisible: (id, visible) => touch(id, drawable => { drawable.visible = visible; }),
        updateDrawableEffect: (id, name, value) => touch(id, drawable => { drawable.effects[name] = value; }),

        updateDrawableProperties(id, properties) {
            if (properties.skinId !== undefined) this.updateDrawableSkinId(id, properties.skinId);
            if (properties.position) this.updateDrawablePosition(id, properties.position);
            if (properties.direction !== undefined || properties.scale) {
                const drawable = drawableOf(id);
                if (drawable) {
                    this.updateDrawableDirectionScale(id, properties.direction ?? drawable.direction, properties.scale ?? drawable.scale);
                }
            }
            if (properties.visible !== undefined) this.updateDrawableVisible(id, properties.visible);
        },

        getFencedPositionOfDrawable(id, position) {
            let x = position[0];
            let y = position[1];
            const drawable = drawableOf(id);
            if (!drawable) return [x, y];
            const dx = x - drawable.position[0];
            const dy = y - drawable.position[1];
            const aabb = drawable.aabb(skinOf(drawable), fenceBounds);
            const inset = Math.floor(Math.min(Math.abs(aabb.left - aabb.right), Math.abs(aabb.top - aabb.bottom)) / 2);
            const sx = X_RIGHT - Math.min(FENCE_WIDTH, inset);
            if (aabb.right + dx < -sx) x = Math.ceil(drawable.position[0] - (sx + aabb.right));
            else if (aabb.left + dx > sx) x = Math.floor(drawable.position[0] + (sx - aabb.left));
            const sy = Y_TOP - Math.min(FENCE_WIDTH, inset);
            if (aabb.top + dy < -sy) y = Math.ceil(drawable.position[1] - (sy + aabb.top));
            else if (aabb.bottom + dy > sy) y = Math.floor(drawable.position[1] + (sy - aabb.bottom));
            return [x, y];
        },

        getBounds(id) {
            const drawable = drawableOf(id);
            if (!drawable) return null;
            return drawable.aabb(skinOf(drawable), {});
        },

        getBoundsForBubble(id) {
            return this.getBounds(id);
        },

        getCurrentSkinSize(id) {
            const skin = skinOf(drawableOf(id));
            return skin && (skin.size[0] || skin.size[1]) ? [...skin.size] : [...UNKNOWN_SKIN_SIZE];
        },

        getSkinSize: skinId => [...(skins.get(skinId)?.size ?? [0, 0])],
        getSkinRotationCenter: skinId => [...(skins.get(skinId)?.rotationCenter ?? [0, 0])],
        getNativeSize: () => [STAGE_WIDTH, STAGE_HEIGHT],

        createGeometrySkin: ({ size, rotationCenter }) => addSkin(size, rotationCenter),
        createSVGSkin(svg, rotationCenter) {
            const geometry = svgSkinGeometry(svg, rotationCenter);
            return addSkin(geometry.size, geometry.rotationCenter);
        },
        updateSVGSkin(skinId, svg, rotationCenter) {
            const geometry = svgSkinGeometry(svg, rotationCenter);
            setSkin(skinId, geometry.size, geometry.rotationCenter);
        },
        createBitmapSkin(bitmap, resolution, rotationCenter) {
            const geometry = bitmapSkinGeometry(bitmap, resolution, rotationCenter);
            return addSkin(geometry.size, geometry.rotationCenter);
        },
        updateBitmapSkin(skinId, bitmap, resolution, rotationCenter) {
            const geometry = bitmapSkinGeometry(bitmap, resolution, rotationCenter);
            setSkin(skinId, geometry.size, geometry.rotationCenter);
        },
        createTextSkin: () => addSkin([0, 0], [0, 0]),
        updateTextSkin() {},
        createPenSkin: () => addSkin([STAGE_WIDTH, STAGE_HEIGHT], [X_RIGHT, Y_TOP]),
        destroySkin: skinId => { skins.delete(skinId); },

        pick: () => -1,
        drawableTouching: () => false,
        isTouchingDrawables: () => false,
        isTouchingColor: () => false,

        penClear() {},
        penPoint() {},
        penLine() {},
        penStamp() {},

        draw() { frames++; },
        get frames() { return frames; },

        save() {
            return {
                groups: groupOrdering.map(name => groups[name].offset),
                drawList: [...drawList],
                drawables: [...drawables.values()].map(drawable => drawable.save()),
                skins: [...skins].map(([id, skin]) => ({ id, size: [...skin.size], rotationCenter: [...skin.rotationCenter] })),
                nextDrawableId,
                nextSkinId,
            };
        },

        load(saved) {
            saved.groups.forEach((offset, i) => { groups[groupOrdering[i]].offset = offset; });
            drawList = [...saved.drawList];
            drawables = new Map(saved.drawables.map(entry => [entry.id, Drawable.load(entry)]));
            skins = new Map(saved.skins.map(skin => [skin.id, { size: [...skin.size], rotationCenter: [...skin.rotationCenter] }]));
            nextDrawableId = saved.nextDrawableId;
            nextSkinId = saved.nextSkinId;
        },
    };
}

export function applyCostumeGeometry(runtime, assetBytes) {
    const renderer = runtime.renderer;
    let resolved = 0;
    let missing = 0;
    const seen = new Set();
    for (const target of runtime.targets) {
        if (seen.has(target.sprite)) continue;
        seen.add(target.sprite);
        for (const costume of target.sprite.costumes) {
            const bytes = assetBytes(costume);
            const geometry = bytes ? costumeGeometry(costume, bytes) : null;
            if (!geometry) {
                missing++;
                continue;
            }
            costume.skinId = renderer.createGeometrySkin(geometry);
            costume.size = String(costume.dataFormat).toLowerCase() === 'svg'
                ? [...geometry.size]
                : [geometry.size[0] * 2, geometry.size[1] * 2];
            resolved++;
        }
    }
    for (const target of runtime.targets) target.updateAllDrawableProperties();
    return { resolved, missing };
}
