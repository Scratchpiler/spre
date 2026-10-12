export const FONT_FILES = [
    'NotoSans-Medium.ttf', 'SourceSerifPro-Regular.otf', 'handlee-regular.ttf', 'Knewave.ttf',
    'Griffy-Regular.ttf', 'Grand9K-Pixel.ttf', 'Scratch.ttf',
];

export const PIXEL_FONT_INDEX = FONT_FILES.indexOf('Grand9K-Pixel.ttf');

export async function fetchAssets(base) {
    const bytes = async path => new Uint8Array(await (await fetch(new URL(path, base))).arrayBuffer());
    const [wasm, ...fonts] = await Promise.all([bytes('resvg.wasm'), ...FONT_FILES.map(name => bytes(`fonts/${name}`))]);
    return { wasm, fonts };
}

export async function registerPixelFont(assets, family = 'SPRE Pixel') {
    if (typeof FontFace === 'undefined') return false;
    const face = new FontFace(family, assets.fonts[PIXEL_FONT_INDEX]);
    await face.load();
    document.fonts.add(face);
    return true;
}
