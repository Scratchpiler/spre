import { createBrowserPool } from '../display/browser-pool.js';
import { registerPixelFont } from '../display/assets.js';
import { createPanel } from '../display/panel/index.js';
import { createStageView } from '../display/stage-view.js';
import { connectClient } from '../remote/client.js';
import { createLoopback } from '../remote/transport.js';
import { loadPageAssets } from './assets.js';
import { adoptPageVM } from './page-backend.js';
import { bfsFindVM, fiberRoot, isValidVM } from './vm-lookup.js';
import { h } from '../display/panel/dom.js';
import { PANEL_CSS } from '../display/panel/styles.js';

const page = typeof unsafeWindow === 'undefined' ? globalThis : unsafeWindow;

const findVM = () => {
    if (isValidVM(page.vm)) return page.vm;
    const root = fiberRoot();
    return root ? bfsFindVM(root) : null;
};

const projectReady = vm => vm && vm.runtime.targets.length > 0 && vm.renderer?._allSkins;

function overlayFor(pageCanvas) {
    const overlay = h('canvas', { 'data-spre-stage': '', style: { position: 'fixed', pointerEvents: 'none', zIndex: '2147482000', imageRendering: 'auto' } });
    document.body.append(overlay);
    const sync = () => {
        const rect = pageCanvas.getBoundingClientRect();
        const left = rect.left + pageCanvas.clientLeft;
        const top = rect.top + pageCanvas.clientTop;
        Object.assign(overlay.style, { left: `${left}px`, top: `${top}px`, width: `${pageCanvas.clientWidth}px`, height: `${pageCanvas.clientHeight}px`, display: rect.width ? 'block' : 'none' });
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(pageCanvas);
    addEventListener('scroll', sync, true);
    addEventListener('resize', sync);
    const timer = setInterval(sync, 500);
    return {
        overlay,
        dispose() {
            observer.disconnect();
            removeEventListener('scroll', sync, true);
            removeEventListener('resize', sync);
            clearInterval(timer);
            overlay.remove();
        },
    };
}

async function start(vm, setLabel) {
    setLabel('Loading the renderer…');
    const assets = await loadPageAssets();
    await registerPixelFont(assets).catch(() => false);
    const pageCanvas = vm.renderer.canvas;
    const session = await adoptPageVM(vm, { assets });
    const pool = await createBrowserPool({ assets });
    const [backendPort, displayPort] = createLoopback();
    session.backend.connect(backendPort);
    const client = connectClient(displayPort, { scene: true });
    const { overlay, dispose: disposeOverlay } = overlayFor(pageCanvas);
    const stage = createStageView({ client, pool, canvas: overlay, interactive: false });
    session.cpu.snapshotProvider = callback => callback(overlay.toDataURL('image/png'));
    const panel = createPanel({ client });
    await client.ready;
    await client.call('timeline.start');
    session.backend.start();
    page.spre = {
        ...session,
        client,
        stop() {
            panel.dispose();
            stage.dispose();
            disposeOverlay();
            pool.terminate();
            session.detach();
            delete page.spre;
        },
    };
    return page.spre;
}

function offer(vm) {
    const host = h('div', { 'data-spre-offer': '' });
    const shadow = host.attachShadow({ mode: 'open' });
    const label = h('span', {}, 'Run with SPRE');
    const button = h('button', { class: 'launcher', title: 'Take over this project with the deterministic SPRE runtime (Alt+Shift+S)' }, h('span', { class: 'badge', html: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7.5 5.2v13.6a.6.6 0 0 0 .9.5l10.8-6.8a.6.6 0 0 0 0-1L8.4 4.7a.6.6 0 0 0-.9.5Z"/></svg>' }), label);
    shadow.append(h('style', {}, PANEL_CSS), button);
    document.body.append(host);
    let starting = false;
    const go = async () => {
        if (starting) return;
        starting = true;
        try {
            await start(vm, text => { label.textContent = text; });
            host.remove();
        } catch (error) {
            label.textContent = `SPRE could not start: ${error.message}`;
            starting = false;
            console.error('[SPRE]', error);
        }
    };
    button.addEventListener('click', go);
    addEventListener('keydown', event => {
        if (event.altKey && event.shiftKey && event.code === 'KeyS' && !page.spre) {
            event.preventDefault();
            go();
        }
    }, true);
}

const waitForProject = () => {
    const vm = findVM();
    if (projectReady(vm)) offer(vm);
    else setTimeout(waitForProject, 500);
};

waitForProject();
