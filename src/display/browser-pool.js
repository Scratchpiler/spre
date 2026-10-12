import workerSource from 'spre:compositor-worker';
import { createCompositorPool } from '../render/pool.js';
import { createSvgRasterizer, initSvgRasterizer } from '../render/raster/svg.js';

const defaultThreads = () => Math.max(1, Math.min(6, (globalThis.navigator?.hardwareConcurrency ?? 2) - 1));

const canSpawnWorkers = url => {
    try {
        new Worker(url, { type: 'module' }).terminate();
        return true;
    } catch {
        return false;
    }
};

export async function createBrowserPool({ assets, threads = defaultThreads() } = {}) {
    const url = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    if (threads > 0 && canSpawnWorkers(url)) {
        return createCompositorPool({ threads, spawn: () => new Worker(url, { type: 'module' }), workerInit: { wasm: assets.wasm, fonts: assets.fonts } });
    }
    await initSvgRasterizer(assets.wasm);
    return createCompositorPool({ threads: 0, rasterizer: createSvgRasterizer({ fonts: assets.fonts }) });
}
