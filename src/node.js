import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { attach } from './index.js';
import { applyCostumeGeometry, createNullRenderer } from './null-renderer.js';
import { skinAllCostumes } from './render/costumes.js';
import { CpuRenderer } from './render/cpu-renderer.js';
import { createSvgRasterizer, initSvgRasterizer } from './render/raster/svg.js';

const require = createRequire(import.meta.url);

let VirtualMachine = null;
let vmRequire = null;

const loadScratchVM = () => {
    if (VirtualMachine) return VirtualMachine;
    try {
        VirtualMachine = require('scratch-vm');
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') throw new Error('spre/node needs the scratch-vm package (npm install scratch-vm)');
        throw error;
    }
    vmRequire = createRequire(require.resolve('scratch-vm'));
    return VirtualMachine;
};

const quietly = async (quiet, work) => {
    if (!quiet) return work();
    vmRequire('minilog').disable();
    const warn = console.warn;
    console.warn = (...args) => {
        if (typeof args[0] === 'string' && args[0].startsWith('Translation for ')) return;
        warn(...args);
    };
    try {
        return await work();
    } finally {
        console.warn = warn;
    }
};

const FONT_FILES = [
    'NotoSans-Medium.ttf', 'SourceSerifPro-Regular.otf', 'handlee-regular.ttf', 'Knewave.ttf',
    'Griffy-Regular.ttf', 'Grand9K-Pixel.ttf', 'Scratch.ttf',
];

let assetsReady = null;
let rasterizerReady = null;

export function nodeRasterizerAssets() {
    assetsReady ??= (async () => {
        const wasm = new Uint8Array(await readFile(require.resolve('@resvg/resvg-wasm/index_bg.wasm')));
        const fontDir = join(dirname(require.resolve('scratch-render-fonts/package.json')), 'src');
        const fonts = await Promise.all(FONT_FILES.map(async name => new Uint8Array(await readFile(join(fontDir, name)))));
        return { wasm, fonts };
    })();
    return assetsReady;
}

export function nodeRasterizer() {
    rasterizerReady ??= (async () => {
        const { wasm, fonts } = await nodeRasterizerAssets();
        await initSvgRasterizer(wasm);
        return createSvgRasterizer({ fonts });
    })();
    return rasterizerReady;
}

export async function createCpuRenderer() {
    return new CpuRenderer({ rasterizer: await nodeRasterizer() });
}

const readSource = async source => {
    if (typeof source !== 'string') return source;
    if (source.trimStart().startsWith('{')) return source;
    return readFile(source);
};

const isZip = data => data instanceof Uint8Array && data[0] === 0x50 && data[1] === 0x4b;

const zipAssets = async data => {
    const JSZip = vmRequire('jszip');
    const zip = await JSZip.loadAsync(data);
    const files = new Map();
    await Promise.all(Object.values(zip.files).map(async file => {
        if (!file.dir) files.set(file.name.split('/').pop(), await file.async('uint8array'));
    }));
    return costume => files.get(costume.md5) ?? files.get(`${costume.assetId}.${costume.dataFormat}`);
};

const SILENT_AUDIO_ENGINE = { decodeSoundPlayer: () => new Promise(() => {}) };

const keepExtensionsFromRejecting = vm => {
    const install = vm.installTargets;
    vm.installTargets = function (...args) {
        const { runtime } = this;
        if (runtime.audioEngine) return install.apply(this, args);
        runtime.audioEngine = SILENT_AUDIO_ENGINE;
        try {
            return install.apply(this, args);
        } finally {
            runtime.audioEngine = null;
        }
    };
};

const rendererFor = async choice => {
    if (choice === 'cpu') return createCpuRenderer();
    if (choice === 'null') return createNullRenderer();
    return choice || null;
};

export async function createVM(source, { quiet = true, renderer = 'cpu' } = {}) {
    const VM = loadScratchVM();
    const vm = new VM();
    keepExtensionsFromRejecting(vm);
    const attached = await rendererFor(renderer);
    if (attached) vm.attachRenderer(attached);
    vm.geometry = { resolved: 0, missing: 0 };
    if (source === undefined) return vm;
    const data = await readSource(source);
    await quietly(quiet, () => vm.loadProject(data));
    const assets = isZip(data) ? await zipAssets(data) : () => undefined;
    if (attached?.isCpuRenderer) vm.geometry = skinAllCostumes(vm.runtime, assets);
    else if (attached?.isNullRenderer) vm.geometry = applyCostumeGeometry(vm.runtime, assets);
    return vm;
}

export async function loadProject(source, { quiet = true, renderer = 'cpu', ...options } = {}) {
    const vm = await createVM(source, { quiet, renderer });
    return { vm, spre: attach(vm, { origin: 'load', ...options }) };
}

export { attach, createNullRenderer };
