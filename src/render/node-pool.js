import { availableParallelism } from 'node:os';
import { Worker } from 'node:worker_threads';
import { nodeRasterizer, nodeRasterizerAssets } from '../node.js';
import { createCompositorPool } from './pool.js';

export const defaultThreads = () => Math.max(1, Math.min(8, availableParallelism() - 1));

export async function createNodeCompositorPool({ threads = defaultThreads() } = {}) {
    const rasterizer = await nodeRasterizer();
    const workerInit = threads > 0 ? await nodeRasterizerAssets() : null;
    return createCompositorPool({
        threads,
        rasterizer,
        workerInit,
        spawn: () => new Worker(new URL('./compositor-worker.js', import.meta.url)),
    });
}

