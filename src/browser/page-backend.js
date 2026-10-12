import { attach } from '../index.js';
import { createSvgRasterizer, initSvgRasterizer } from '../render/raster/svg.js';
import { createBackend } from '../remote/backend.js';
import { installRenderer, mirrorPageRenderer } from './adopt.js';

const toScratchPoint = data => ({
    x: data.x !== undefined && data.canvasWidth ? (480 * (data.x / data.canvasWidth)) - 240 : undefined,
    y: data.y !== undefined && data.canvasHeight ? 180 - (360 * (data.y / data.canvasHeight)) : undefined,
});

function routeGuiInput(vm, spre) {
    const runtime = vm.runtime;
    const originals = {
        postIOData: vm.postIOData,
        greenFlag: vm.greenFlag,
        stopAll: vm.stopAll,
        setTurboMode: vm.setTurboMode,
        start: runtime.start,
    };
    vm.postIOData = function (device, data) {
        switch (device) {
        case 'keyboard':
            if (data.key) spre.input.send({ type: 'key', key: data.key, down: data.isDown !== false });
            return;
        case 'mouse': {
            const event = { type: 'mouse', ...toScratchPoint(data) };
            if (data.isDown !== undefined) event.down = data.isDown;
            if (data.wasDragged) event.wasDragged = true;
            spre.input.send(event);
            return;
        }
        case 'mouseWheel':
            spre.input.send({ type: 'wheel', deltaY: data.deltaY });
            return;
        case 'userData':
            spre.input.send({ type: 'username', name: data.username ?? '' });
            return;
        case 'cloud':
            if (data.varUpdate) spre.input.send({ type: 'cloud', name: data.varUpdate.name, value: data.varUpdate.value });
            return;
        default:
            originals.postIOData.call(this, device, data);
        }
    };
    vm.greenFlag = () => spre.greenFlag();
    vm.stopAll = () => spre.stopAll();
    vm.setTurboMode = on => {
        spre.turbo(Boolean(on));
        vm.emit(on ? 'TURBO_MODE_ON' : 'TURBO_MODE_OFF');
    };
    runtime.start = () => {};
    const onAnswer = text => spre.input.send({ type: 'answer', text: String(text ?? '') });
    runtime.on('ANSWER', onAnswer);
    return () => {
        Object.assign(vm, { postIOData: originals.postIOData, greenFlag: originals.greenFlag, stopAll: originals.stopAll, setTurboMode: originals.setTurboMode });
        runtime.start = originals.start;
        runtime.removeListener('ANSWER', onAnswer);
    };
}

export async function adoptPageVM(vm, { assets, seed = Date.now(), keepCloud = false, ...options } = {}) {
    const runtime = vm.runtime;
    const page = vm.renderer;
    if (!page?._allSkins) throw new Error('this page has no scratch-render renderer to take over');
    await initSvgRasterizer(assets.wasm);
    const rasterizer = createSvgRasterizer({ fonts: assets.fonts });
    if (runtime._steppingInterval) {
        clearInterval(runtime._steppingInterval);
        runtime._steppingInterval = null;
    }
    const { cpu, skipped } = mirrorPageRenderer(page, runtime, rasterizer);
    installRenderer(vm, cpu);
    const cloud = runtime.ioDevices.cloud;
    const cloudProvider = cloud.provider;
    if (!keepCloud) cloud.provider = null;
    const spre = attach(vm, { seed, ...options });
    const unroute = routeGuiInput(vm, spre);
    const backend = createBackend({ spre, vm, name: document.title });
    return {
        spre,
        backend,
        cpu,
        pageRenderer: page,
        skipped,
        detach() {
            backend.stop();
            unroute();
            spre.detach();
            cloud.provider = cloudProvider;
            installRenderer(vm, page);
            vm.runtime.start();
        },
    };
}
