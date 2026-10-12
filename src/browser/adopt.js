import { skinCostume } from '../render/costumes.js';
import { CpuRenderer } from '../render/cpu-renderer.js';
import { Drawable } from '../render/drawable.js';
import { decodeBitmap, upscaleNearest2x } from '../render/raster/bitmap.js';
import { PenSkin, TextSkin } from '../render/skins.js';

const LAYER_GROUPS = ['background', 'video', 'pen', 'sprite'];

const costumesBySkin = runtime => {
    const map = new Map();
    for (const target of runtime.targets) {
        for (const costume of target.sprite.costumes) if (costume.skinId !== undefined) map.set(costume.skinId, costume);
    }
    return map;
};

const kindOf = skin => {
    if (!skin) return null;
    if ('_framebuffer' in skin && '_lineShader' in skin) return 'pen';
    if ('_bubbleType' in skin) return 'text';
    if ('_svgImage' in skin) return 'svg';
    if ('_textureSize' in skin) return 'bitmap';
    return null;
};

const bitmapOfCostume = costume => {
    let bitmap = decodeBitmap(costume.asset.data, costume.dataFormat);
    if (costume.size && costume.size[0] === bitmap.width * 2) bitmap = upscaleNearest2x(bitmap);
    return bitmap;
};

function readPenPixels(page, skin) {
    const gl = page._gl;
    const [width, height] = skin._size;
    const pixels = new Uint8Array(width * height * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, skin._framebuffer.framebuffer);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return pixels;
}

function groupOfIndex(page, index) {
    const order = page._groupOrdering;
    for (let i = order.length - 1; i >= 0; i--) {
        if (index >= page._layerGroups[order[i]].drawListOffset) return order[i];
    }
    return order[0];
}

export function mirrorPageRenderer(page, runtime, rasterizer) {
    const cpu = new CpuRenderer({ rasterizer });
    cpu.setLayerGroupOrdering(page._groupOrdering ?? LAYER_GROUPS);
    const costumes = costumesBySkin(runtime);
    const skipped = [];

    page._allSkins.forEach((skin, id) => {
        const kind = kindOf(skin);
        if (!kind) return;
        if (kind === 'pen') {
            const pen = new PenSkin(id, cpu.nativeSize);
            try {
                pen.pixels.set(readPenPixels(page, skin));
            } catch (error) {
                skipped.push(`pen layer pixels: ${error.message}`);
            }
            pen.touched();
            cpu.allSkins[id] = pen;
            return;
        }
        if (kind === 'text') {
            const text = new TextSkin(id);
            text.setTextAndType(skin._bubbleType || 'say', skin._text ?? '', Boolean(skin._pointsLeft));
            cpu.allSkins[id] = text;
            return;
        }
        const costume = costumes.get(id);
        if (!costume?.asset?.data) {
            skipped.push(`skin ${id} has no costume asset`);
            return;
        }
        try {
            if (kind === 'svg') {
                cpu.nextSkinId = id;
                skinCostume(cpu, { ...costume, dataFormat: 'svg' }, costume.asset.data);
            } else {
                cpu.nextSkinId = id;
                cpu.createBitmapSkin(bitmapOfCostume(costume), 2, [costume.rotationCenterX / 2, costume.rotationCenterY / 2]);
            }
        } catch (error) {
            skipped.push(`${costume.name}: ${error.message}`);
        }
    });

    page._drawList.forEach((id, index) => {
        const source = page._allDrawables[id];
        if (!source) return;
        const drawable = new Drawable(id, groupOfIndex(page, index));
        drawable.skin = source._skin ? cpu.allSkins[source._skin.id] ?? null : null;
        drawable.updatePosition([source._position[0], source._position[1]]);
        drawable.updateDirection(source._direction);
        drawable.updateScale([source._scale[0], source._scale[1]]);
        drawable.updateVisible(source._visible);
        cpu.allDrawables[id] = drawable;
    });
    cpu.drawList = [...page._drawList];
    for (const name of cpu.groupOrdering) cpu.layerGroups[name].drawListOffset = page._layerGroups[name]?.drawListOffset ?? 0;
    cpu.nextSkinId = page._nextSkinId;
    cpu.nextDrawableId = page._nextDrawableId;
    cpu.setBackgroundColor(...page._backgroundColor4f.slice(0, 3));
    return { cpu, skipped };
}

export function installRenderer(vm, cpu) {
    vm.renderer = cpu;
    vm.runtime.renderer = cpu;
    for (const target of vm.runtime.targets) {
        target.renderer = cpu;
        target.updateAllDrawableProperties();
    }
}
