import { serveCompositor } from './pool.js';
import { createSvgRasterizer, initSvgRasterizer } from './raster/svg.js';

const loadRasterizer = async ({ wasm, fonts }) => {
    await initSvgRasterizer(wasm);
    return createSvgRasterizer({ fonts });
};

const port = typeof self !== 'undefined' && typeof self.postMessage === 'function'
    ? self
    : (await import('node:worker_threads')).parentPort;

serveCompositor(port, { loadRasterizer });
