import { decodeBitmap, upscaleNearest2x } from './raster/bitmap.js';

const decodeText = bytes => (typeof bytes === 'string' ? bytes : new TextDecoder().decode(bytes));

export function skinCostume(renderer, costume, bytes) {
    const format = String(costume.dataFormat).toLowerCase();
    const hasCenter = typeof costume.rotationCenterX === 'number' && !Number.isNaN(costume.rotationCenterX)
        && typeof costume.rotationCenterY === 'number' && !Number.isNaN(costume.rotationCenterY);
    if (format === 'svg') {
        const skinId = renderer.createSVGSkin(decodeText(bytes), hasCenter ? [costume.rotationCenterX, costume.rotationCenterY] : undefined);
        costume.skinId = skinId;
        costume.size = renderer.getSkinSize(skinId);
        if (!hasCenter) {
            [costume.rotationCenterX, costume.rotationCenterY] = renderer.getSkinRotationCenter(skinId);
            costume.bitmapResolution = 1;
        }
        return skinId;
    }
    let bitmap = decodeBitmap(bytes, format);
    const scale = costume.bitmapResolution === 1 ? 2 : 1;
    if (scale === 2) bitmap = upscaleNearest2x(bitmap);
    let center;
    if (hasCenter) {
        costume.rotationCenterX *= scale;
        costume.rotationCenterY *= scale;
        center = [costume.rotationCenterX / 2, costume.rotationCenterY / 2];
    }
    costume.bitmapResolution = 2;
    const skinId = renderer.createBitmapSkin(bitmap, 2, center);
    costume.skinId = skinId;
    const size = renderer.getSkinSize(skinId);
    costume.size = [size[0] * 2, size[1] * 2];
    if (!hasCenter) {
        const rotation = renderer.getSkinRotationCenter(skinId);
        costume.rotationCenterX = rotation[0] * 2;
        costume.rotationCenterY = rotation[1] * 2;
    }
    return skinId;
}

export function skinAllCostumes(runtime, assetBytes) {
    const renderer = runtime.renderer;
    const report = { resolved: 0, missing: 0, failed: [] };
    const seen = new Set();
    for (const target of runtime.targets) {
        if (seen.has(target.sprite)) continue;
        seen.add(target.sprite);
        for (const costume of target.sprite.costumes) {
            const bytes = assetBytes(costume);
            if (!bytes) {
                report.missing++;
                continue;
            }
            try {
                skinCostume(renderer, costume, bytes);
                report.resolved++;
            } catch (error) {
                report.failed.push(`${target.sprite.name}/${costume.name}: ${error.message}`);
            }
        }
    }
    for (const target of runtime.targets) target.updateAllDrawableProperties();
    return report;
}
