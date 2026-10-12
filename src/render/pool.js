import { compositeBand, compositeRegion, createRasterStore, layerBox } from './compositor.js';

const onMessage = (endpoint, handler) => {
    if (typeof endpoint.on === 'function') endpoint.on('message', handler);
    else endpoint.addEventListener('message', event => handler(event.data));
};

const copyEntry = entry => (entry.patch
    ? { ...entry, patch: { ...entry.patch, data: entry.patch.data.slice() } }
    : { ...entry, data: entry.data.slice() });

const bufferOf = entry => (entry.patch ? entry.patch.data.buffer : entry.data.buffer);

const regionBytes = region => (region.x1 - region.x0) * (region.y1 - region.y0) * 4;

const touches = (box, region) => box.left < region.x1 && box.right >= region.x0 && box.top < region.y1 && box.bottom >= region.y0;

function planRegions(scene, regions, workerCount) {
    const boxes = scene.layers.map(layer => layerBox(layer, scene.width, scene.height));
    const cost = regions.map(region => 1 + boxes.reduce((n, box) => n + (touches(box, region) ? 1 : 0), 0));
    const loads = new Array(workerCount).fill(0);
    const plans = Array.from({ length: workerCount }, () => ({ indices: [] }));
    const order = regions.map((_, i) => i).sort((a, b) => cost[b] - cost[a] || a - b);
    for (const index of order) {
        let target = 0;
        for (let w = 1; w < workerCount; w++) if (loads[w] < loads[target]) target = w;
        loads[target] += cost[index];
        plans[target].indices.push(index);
    }
    return plans.filter(plan => plan.indices.length).map(plan => {
        const assigned = plan.indices.map(index => regions[index]);
        const layers = scene.layers.filter((_, i) => assigned.some(region => touches(boxes[i], region)));
        return { indices: plan.indices, regions: assigned, scene: { ...scene, layers } };
    });
}

function compositeRegionsLocally(scene, rasters, regions) {
    return regions.map(region => compositeRegion(scene, rasters, region, new Uint8ClampedArray(regionBytes(region))));
}

export function createCompositorPool({ threads = 0, spawn, rasterizer = null, workerInit = null } = {}) {
    const local = createRasterStore();
    const workers = [];
    const pending = new Map();
    let nextJob = 1;
    let nextRasterWorker = 0;

    for (let i = 0; i < threads; i++) {
        const worker = spawn();
        onMessage(worker, message => {
            const resolve = pending.get(message.job);
            if (!resolve) return;
            pending.delete(message.job);
            resolve(message);
        });
        if (workerInit) worker.postMessage({ type: 'init', ...workerInit });
        workers.push(worker);
    }

    const call = (worker, message, transfer = []) => new Promise(resolve => {
        const job = nextJob++;
        pending.set(job, resolve);
        worker.postMessage({ ...message, job }, transfer);
    });

    return {
        get threads() {
            return workers.length;
        },

        upload(entries) {
            if (!entries.length) return;
            if (!workers.length) {
                local.apply(entries, []);
                return;
            }
            for (const worker of workers) {
                const copies = entries.map(copyEntry);
                worker.postMessage({ type: 'rasters', rasters: copies, dropped: [] }, copies.map(bufferOf));
            }
        },

        drop(keys) {
            if (!keys.length) return;
            if (!workers.length) {
                local.apply([], keys);
                return;
            }
            for (const worker of workers) worker.postMessage({ type: 'rasters', rasters: [], dropped: keys });
        },

        async rasterize(request) {
            if (!workers.length || !workerInit) {
                if (!rasterizer) throw new Error('this pool has no SVG rasterizer');
                return rasterizer.svg(request.svg, null, request.scale, request.width, request.height);
            }
            const worker = workers[nextRasterWorker++ % workers.length];
            const reply = await call(worker, { type: 'rasterize', ...request });
            return new Uint8ClampedArray(reply.pixels);
        },

        async composite(scene) {
            const out = new Uint8ClampedArray(scene.width * scene.height * 4);
            if (!workers.length) {
                compositeBand(scene, local.rasters, 0, scene.height, out);
                return { width: scene.width, height: scene.height, data: out };
            }
            const bandHeight = Math.ceil(scene.height / workers.length);
            await Promise.all(workers.map(async (worker, i) => {
                const rowStart = i * bandHeight;
                const rowEnd = Math.min(scene.height, rowStart + bandHeight);
                if (rowStart >= rowEnd) return;
                const reply = await call(worker, { type: 'band', scene, rowStart, rowEnd });
                out.set(new Uint8ClampedArray(reply.pixels), rowStart * scene.width * 4);
            }));
            return { width: scene.width, height: scene.height, data: out };
        },

        async compositeRegions(scene, regions) {
            if (!workers.length) return compositeRegionsLocally(scene, local.rasters, regions);
            const results = new Array(regions.length);
            await Promise.all(planRegions(scene, regions, workers.length).map(async (plan, i) => {
                const reply = await call(workers[i], { type: 'regions', scene: plan.scene, regions: plan.regions });
                const packed = new Uint8ClampedArray(reply.pixels);
                let offset = 0;
                for (const index of plan.indices) {
                    const bytes = regionBytes(regions[index]);
                    results[index] = packed.subarray(offset, offset + bytes);
                    offset += bytes;
                }
            }));
            return results;
        },

        terminate() {
            for (const worker of workers) worker.terminate();
            workers.length = 0;
        },
    };
}

export function serveCompositor(port, { loadRasterizer } = {}) {
    const store = createRasterStore();
    let rasterizer = null;
    const reply = (job, pixels) => port.postMessage({ job, pixels: pixels.buffer }, [pixels.buffer]);
    const handle = async message => {
        switch (message.type) {
        case 'init':
            rasterizer = loadRasterizer(message);
            break;
        case 'rasters':
            store.apply(message.rasters, message.dropped);
            break;
        case 'band': {
            const { scene, rowStart, rowEnd, job } = message;
            const out = new Uint8ClampedArray((rowEnd - rowStart) * scene.width * 4);
            compositeBand(scene, store.rasters, rowStart, rowEnd, out);
            reply(job, out);
            break;
        }
        case 'regions': {
            const { scene, regions, job } = message;
            const out = new Uint8ClampedArray(regions.reduce((sum, region) => sum + regionBytes(region), 0));
            let offset = 0;
            for (const region of regions) {
                const bytes = regionBytes(region);
                compositeRegion(scene, store.rasters, region, out.subarray(offset, offset + bytes));
                offset += bytes;
            }
            reply(job, out);
            break;
        }
        case 'rasterize': {
            const svg = await rasterizer;
            reply(message.job, svg.svg(message.svg, null, message.scale, message.width, message.height));
            break;
        }
        }
    };
    onMessage(port, handle);
}
