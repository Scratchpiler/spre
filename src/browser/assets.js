import { FONT_FILES } from '../display/assets.js';

const CDN = {
    wasm: 'https://cdn.jsdelivr.net/npm/@resvg/resvg-wasm@2.6.2/index_bg.wasm',
    font: name => `https://cdn.jsdelivr.net/npm/scratch-render-fonts@1.0.252/src/${name}`,
};

export const RESOURCE_NAMES = ['resvg', ...FONT_FILES.map((_, i) => `font${i}`)];
export const RESOURCE_URLS = [CDN.wasm, ...FONT_FILES.map(CDN.font)];

const decodeDataUrl = url => {
    const comma = url.indexOf(',');
    const binary = atob(url.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
};

const fromResource = async name => {
    const getUrl = globalThis.GM_getResourceURL ?? globalThis.GM?.getResourceUrl;
    if (typeof getUrl !== 'function') return null;
    const url = await getUrl(name);
    if (!url) return null;
    if (url.startsWith('data:')) return decodeDataUrl(url);
    return new Uint8Array(await (await fetch(url)).arrayBuffer());
};

const fromNetwork = async url => new Uint8Array(await (await fetch(url)).arrayBuffer());

export async function loadPageAssets() {
    const bytes = await Promise.all(RESOURCE_NAMES.map(async (name, i) => (await fromResource(name).catch(() => null)) ?? fromNetwork(RESOURCE_URLS[i])));
    const [wasm, ...fonts] = bytes;
    return { wasm, fonts };
}
