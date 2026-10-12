import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { fixupSvgString } from './svg-fixup.js';
import { svgViewBox } from '../../geometry.js';

export const SCRATCH_FONT_FAMILIES = {
    'Sans Serif': 'Noto Sans',
    Serif: 'Source Serif Pro',
    Handwriting: 'Handlee',
    Marker: 'Knewave',
    Curly: 'Griffy',
    Pixel: 'Grand9K Pixel',
    Scratch: 'ScratchFont',
};

const FONT_ATTRIBUTE = /(font-family\s*=\s*)(["'])([^"']*)\2/g;
const FONT_STYLE = /(font-family\s*:\s*)([^;"']+)/g;

const renameFamilies = list => list.split(',').map(name => {
    const bare = name.trim().replace(/^['"]|['"]$/g, '');
    return SCRATCH_FONT_FAMILIES[bare] ? `'${SCRATCH_FONT_FAMILIES[bare]}'` : name.trim();
}).join(', ');

const largestStrokeWidth = svg => {
    let largest = 0;
    for (const match of svg.matchAll(/\sstroke(-width)?\s*=\s*["']([^"']*)["']/g)) {
        largest = Math.max(largest, match[1] ? Number(match[2]) || 0 : 1);
    }
    return largest;
};

const setRootAttributes = (svg, attributes) => {
    const tag = /<svg\b[^>]*>/i.exec(svg)[0];
    let next = tag;
    for (const [name, value] of Object.entries(attributes)) {
        const pattern = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*')`, 'i');
        next = pattern.test(next) ? next.replace(pattern, ` ${name}="${value}"`) : next.replace(/^<svg\b/i, `<svg ${name}="${value}"`);
    }
    return svg.replace(tag, next);
};

let wasmReady = null;

export function initSvgRasterizer(wasm) {
    wasmReady ??= initWasm(wasm);
    return wasmReady;
}

export function createSvgRasterizer({ fonts = [] } = {}) {
    const fontOptions = {
        fontBuffers: fonts,
        loadSystemFonts: false,
        defaultFontFamily: 'Noto Sans',
        sansSerifFamily: 'Noto Sans',
        serifFamily: 'Source Serif Pro',
    };

    const prepare = svg => fixupSvgString(String(svg))
        .replace(FONT_ATTRIBUTE, (_, prefix, quote, list) => `${prefix}${quote}${renameFamilies(list).replaceAll(quote, quote === '"' ? "'" : '"')}${quote}`)
        .replace(FONT_STYLE, (_, prefix, list) => `${prefix}${renameFamilies(list)}`);

    const measure = svg => {
        try {
            const resvg = new Resvg(svg, { font: fontOptions });
            const bbox = resvg.getBBox();
            const box = bbox ? { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height } : null;
            bbox?.free?.();
            resvg.free?.();
            return box ?? { x: 0, y: 0, width: 0, height: 0 };
        } catch {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
    };

    const normalize = svgIn => {
        const svg = prepare(svgIn);
        const tag = /<svg\b[^>]*>/i.exec(svg)?.[0];
        if (!tag) return svg;
        const hasViewBox = /\sviewBox\s*=/i.test(tag);
        if (hasViewBox) {
            if (/\swidth\s*=/i.test(tag) && /\sheight\s*=/i.test(tag)) return svg;
            const box = svgViewBox(svg);
            return box ? setRootAttributes(svg, { width: box.width, height: box.height }) : svg;
        }
        const box = measure(svg);
        const half = box.width === 0 || box.height === 0 ? 0 : largestStrokeWidth(svg) / 2;
        const width = box.width + (half * 2);
        const height = box.height + (half * 2);
        return setRootAttributes(svg, { width, height, viewBox: `${box.x - half} ${box.y - half} ${width} ${height}` });
    };

    const svg = (source, viewBox, scale, width, height) => {
        const out = new Uint8ClampedArray(width * height * 4);
        let resvg;
        let image;
        try {
            resvg = new Resvg(source, { fitTo: { mode: 'zoom', value: scale }, font: fontOptions });
            image = resvg.render();
        } catch {
            resvg?.free?.();
            return out;
        }
        const pixels = image.pixels;
        const copyWidth = Math.min(width, image.width);
        const copyHeight = Math.min(height, image.height);
        for (let row = 0; row < copyHeight; row++) {
            let from = row * image.width * 4;
            let to = row * width * 4;
            for (let column = 0; column < copyWidth; column++, from += 4, to += 4) {
                const alpha = pixels[from + 3];
                if (alpha === 0) continue;
                out[to + 3] = alpha;
                if (alpha === 255) {
                    out[to] = pixels[from];
                    out[to + 1] = pixels[from + 1];
                    out[to + 2] = pixels[from + 2];
                } else {
                    out[to] = (pixels[from] * 255) / alpha;
                    out[to + 1] = (pixels[from + 1] * 255) / alpha;
                    out[to + 2] = (pixels[from + 2] * 255) / alpha;
                }
            }
        }
        image.free?.();
        resvg.free?.();
        return out;
    };

    return { normalize, svg };
}
