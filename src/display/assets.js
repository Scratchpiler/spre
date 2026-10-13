export const FONT_FILES = [
    'NotoSans-Medium.ttf', 'SourceSerifPro-Regular.otf', 'handlee-regular.ttf', 'Knewave.ttf',
    'Griffy-Regular.ttf', 'Grand9K-Pixel.ttf', 'Scratch.ttf',
];

export async function fetchAssets(base) {
    const bytes = async path => new Uint8Array(await (await fetch(new URL(path, base))).arrayBuffer());
    const [wasm, ...fonts] = await Promise.all([bytes('resvg.wasm'), ...FONT_FILES.map(name => bytes(`fonts/${name}`))]);
    return { wasm, fonts };
}
