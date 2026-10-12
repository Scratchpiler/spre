import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { buildBundles } from '../build.js';
import { FONT_FILES } from './display/assets.js';
import { loadProject } from './node.js';
import { attachWebSocketServer } from './protocol/ws-node.js';
import { createBackend } from './remote/backend.js';
import { fromServerConnection } from './remote/transport.js';

const require = createRequire(import.meta.url);

const TYPES = { html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', wasm: 'application/wasm', ttf: 'font/ttf', otf: 'font/otf' };

export async function serve(project, { port = 8642, host = '127.0.0.1', flag = true, play = true, ...options } = {}) {
    const [{ vm, spre }, bundles] = await Promise.all([loadProject(project, options), buildBundles()]);
    const backend = createBackend({ spre, vm, name: typeof project === 'string' ? basename(project).replace(/\.sb3$/i, '') : 'project' });
    const fontDir = join(dirname(require.resolve('scratch-render-fonts/package.json')), 'src');
    const files = new Map([
        ['/', { type: TYPES.html, body: bundles.html }],
        ['/index.html', { type: TYPES.html, body: bundles.html }],
        ['/app.js', { type: TYPES.js, body: bundles.app }],
        ['/assets/resvg.wasm', { type: TYPES.wasm, path: require.resolve('@resvg/resvg-wasm/index_bg.wasm') }],
        ...FONT_FILES.map(name => [`/assets/fonts/${name}`, { type: TYPES[name.split('.').pop()], path: join(fontDir, name) }]),
    ]);
    const server = createServer(async (request, response) => {
        const file = files.get(new URL(request.url, 'http://localhost').pathname);
        if (!file || request.method !== 'GET') {
            response.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
            return;
        }
        const body = file.body ?? await readFile(file.path);
        response.writeHead(200, { 'content-type': file.type, 'cache-control': 'no-cache' }).end(body);
    });
    const sockets = attachWebSocketServer(server, { path: '/spre', onConnection: connection => backend.connect(fromServerConnection(connection)) });
    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, host, resolve);
    });
    backend.call('timeline.start');
    if (flag) spre.greenFlag();
    if (play) backend.start();
    const address = server.address();
    return {
        url: `http://${address.address.includes(':') ? `[${address.address}]` : address.address}:${address.port}/`,
        spre,
        vm,
        backend,
        async close() {
            backend.stop();
            sockets.close();
            await new Promise(resolve => server.close(resolve));
        },
    };
}
