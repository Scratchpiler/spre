import { v3 } from './twgl.js';

export const EFFECT_INFO = {
    color: { uniformName: 'u_color', mask: 1 << 0, converter: x => (x / 200) % 1, shapeChanges: false },
    fisheye: { uniformName: 'u_fisheye', mask: 1 << 1, converter: x => Math.max(0, (x + 100) / 100), shapeChanges: true },
    whirl: { uniformName: 'u_whirl', mask: 1 << 2, converter: x => -x * Math.PI / 180, shapeChanges: true },
    pixelate: { uniformName: 'u_pixelate', mask: 1 << 3, converter: x => Math.abs(x) / 10, shapeChanges: true },
    mosaic: {
        uniformName: 'u_mosaic',
        mask: 1 << 4,
        converter: x => Math.max(1, Math.min(Math.round((Math.abs(x) + 10) / 10), 512)),
        shapeChanges: true,
    },
    brightness: { uniformName: 'u_brightness', mask: 1 << 5, converter: x => Math.max(-100, Math.min(x, 100)) / 100, shapeChanges: false },
    ghost: { uniformName: 'u_ghost', mask: 1 << 6, converter: x => 1 - (Math.max(0, Math.min(x, 100)) / 100), shapeChanges: false },
};

export const EFFECTS = Object.keys(EFFECT_INFO);

export const DISTORTION_MASK = EFFECT_INFO.fisheye.mask | EFFECT_INFO.whirl.mask | EFFECT_INFO.pixelate.mask | EFFECT_INFO.mosaic.mask;

const CENTER_X = 0.5;
const CENTER_Y = 0.5;
const hsvScratch = [0, 0, 0];

export function rgbToHsv([red, green, blue], dst) {
    let K = 0.0;
    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;
    let tmp = 0;
    if (g < b) {
        tmp = g;
        g = b;
        b = tmp;
        K = -1;
    }
    if (r < g) {
        tmp = r;
        r = g;
        g = tmp;
        K = (-2 / 6) - K;
    }
    const chroma = r - Math.min(g, b);
    dst[0] = Math.abs(K + ((g - b) / ((6 * chroma) + Number.EPSILON)));
    dst[1] = chroma / (r + Number.EPSILON);
    dst[2] = r;
    return dst;
}

export function hsvToRgb([hue, s, v], dst) {
    if (s === 0) {
        dst[0] = dst[1] = dst[2] = (v * 255) + 0.5;
        return dst;
    }
    const h = hue % 1;
    const i = (h * 6) | 0;
    const f = (h * 6) - i;
    const p = v * (1 - s);
    const q = v * (1 - (s * f));
    const t = v * (1 - (s * (1 - f)));
    let r = 0;
    let g = 0;
    let b = 0;
    switch (i) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    }
    dst[0] = (r * 255) + 0.5;
    dst[1] = (g * 255) + 0.5;
    dst[2] = (b * 255) + 0.5;
    return dst;
}

export function transformColor(drawable, inOutColor, effectMask) {
    if (inOutColor[3] === 0) return inOutColor;
    let effects = drawable.enabledEffects;
    if (typeof effectMask === 'number') effects &= effectMask;
    const uniforms = drawable.uniforms;
    const enableColor = (effects & EFFECT_INFO.color.mask) !== 0;
    const enableBrightness = (effects & EFFECT_INFO.brightness.mask) !== 0;
    if (enableColor || enableBrightness) {
        const alpha = inOutColor[3] / 255;
        inOutColor[0] /= alpha;
        inOutColor[1] /= alpha;
        inOutColor[2] /= alpha;
        if (enableColor) {
            const hsv = rgbToHsv(inOutColor, hsvScratch);
            const minV = 0.11 / 2.0;
            const minS = 0.09;
            if (hsv[2] < minV) {
                hsv[0] = 0;
                hsv[1] = 1;
                hsv[2] = minV;
            } else if (hsv[1] < minS) {
                hsv[0] = 0;
                hsv[1] = minS;
            }
            hsv[0] = uniforms.u_color + hsv[0] + 1;
            hsvToRgb(hsv, inOutColor);
        }
        if (enableBrightness) {
            const brightness = uniforms.u_brightness * 255;
            inOutColor[0] += brightness;
            inOutColor[1] += brightness;
            inOutColor[2] += brightness;
        }
        inOutColor[0] *= alpha;
        inOutColor[1] *= alpha;
        inOutColor[2] *= alpha;
    }
    if ((effects & EFFECT_INFO.ghost.mask) !== 0) {
        inOutColor[0] *= uniforms.u_ghost;
        inOutColor[1] *= uniforms.u_ghost;
        inOutColor[2] *= uniforms.u_ghost;
        inOutColor[3] *= uniforms.u_ghost;
    }
    return inOutColor;
}

export function transformPoint(drawable, vec, dst) {
    v3.copy(vec, dst);
    const effects = drawable.enabledEffects;
    const uniforms = drawable.uniforms;
    if ((effects & EFFECT_INFO.mosaic.mask) !== 0) {
        dst[0] = uniforms.u_mosaic * dst[0] % 1;
        dst[1] = uniforms.u_mosaic * dst[1] % 1;
    }
    if ((effects & EFFECT_INFO.pixelate.mask) !== 0) {
        drawable.skin.getTexture();
        const skinSize = drawable.skin.size;
        const texelX = skinSize[0] / uniforms.u_pixelate;
        const texelY = skinSize[1] / uniforms.u_pixelate;
        dst[0] = (Math.floor(dst[0] * texelX) + CENTER_X) / texelX;
        dst[1] = (Math.floor(dst[1] * texelY) + CENTER_Y) / texelY;
    }
    if ((effects & EFFECT_INFO.whirl.mask) !== 0) {
        const RADIUS = 0.5;
        const offsetX = dst[0] - CENTER_X;
        const offsetY = dst[1] - CENTER_Y;
        const offsetMagnitude = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
        const whirlFactor = Math.max(1.0 - (offsetMagnitude / RADIUS), 0.0);
        const whirlActual = uniforms.u_whirl * whirlFactor * whirlFactor;
        const sinWhirl = Math.sin(whirlActual);
        const cosWhirl = Math.cos(whirlActual);
        dst[0] = (cosWhirl * offsetX) + (sinWhirl * offsetY) + CENTER_X;
        dst[1] = (-sinWhirl * offsetX) + (cosWhirl * offsetY) + CENTER_Y;
    }
    if ((effects & EFFECT_INFO.fisheye.mask) !== 0) {
        const vX = (dst[0] - CENTER_X) / CENTER_X;
        const vY = (dst[1] - CENTER_Y) / CENTER_Y;
        const vLength = Math.sqrt((vX * vX) + (vY * vY));
        const r = Math.pow(Math.min(vLength, 1), uniforms.u_fisheye) * Math.max(1, vLength);
        const unitX = vX / vLength;
        const unitY = vY / vLength;
        dst[0] = CENTER_X + (r * unitX * CENTER_X);
        dst[1] = CENTER_Y + (r * unitY * CENTER_Y);
    }
    return dst;
}
