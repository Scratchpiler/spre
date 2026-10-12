import { fetchAssets, registerPixelFont } from './assets.js';
import { createBrowserPool } from './browser-pool.js';
import { createPanel } from './panel/index.js';
import { createStageView } from './stage-view.js';
import { connectClient } from '../remote/client.js';
import { fromWebSocket } from '../remote/transport.js';

const status = document.querySelector('[data-connection]');
const title = document.querySelector('[data-title]');
const canvas = document.querySelector('[data-stage]');
const dock = document.querySelector('[data-panel]');

const say = text => { status.textContent = text; };

const connect = () => new Promise((resolve, reject) => {
    const socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/spre`);
    socket.addEventListener('open', () => resolve(socket), { once: true });
    socket.addEventListener('error', () => reject(new Error('the backend did not answer')), { once: true });
});

try {
    say('Loading the renderer');
    const assets = await fetchAssets(new URL('assets/', location.href));
    await registerPixelFont(assets).catch(() => false);
    const pool = await createBrowserPool({ assets });
    say('Connecting');
    const socket = await connect();
    const client = connectClient(fromWebSocket(socket), { scene: true });
    const welcome = await client.ready;
    title.textContent = welcome.name;
    document.title = `${welcome.name} · SPRE`;
    say('Connected');
    const stage = createStageView({ client, pool, canvas, keyboardTarget: window });
    const panel = createPanel({ client, mount: dock, inline: true });
    client.on('close', () => say('Disconnected. Restart spre serve, then reload this page.'));
    client.on('error', message => say(`Backend error: ${message}`));
    globalThis.spre = { client, stage, panel, pool };
} catch (error) {
    say(`Could not start: ${error.message}`);
    throw error;
}
