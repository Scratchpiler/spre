import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { RESOURCE_NAMES, RESOURCE_URLS } from './src/browser/assets.js';

const require = createRequire(import.meta.url);
const root = new URL('./', import.meta.url);

const loadEsbuild = () => require('esbuild');
const TWGL_ALIAS = { 'twgl.js': require.resolve('twgl.js') };

async function bundleWorker(esbuild) {
    const result = await esbuild.build({
        entryPoints: [new URL('src/render/compositor-worker.js', root).pathname],
        bundle: true,
        write: false,
        format: 'esm',
        platform: 'browser',
        external: ['node:*'],
        alias: TWGL_ALIAS,
        minify: true,
    });
    return result.outputFiles[0].text;
}

const workerPlugin = workerSource => ({
    name: 'spre-worker-source',
    setup(build) {
        build.onResolve({ filter: /^spre:compositor-worker$/ }, args => ({ path: args.path, namespace: 'spre-worker' }));
        build.onLoad({ filter: /.*/, namespace: 'spre-worker' }, () => ({ contents: `export default ${JSON.stringify(workerSource)};`, loader: 'js' }));
    },
});

export async function buildBundles({ minify = true } = {}) {
    const esbuild = loadEsbuild();
    const workerSource = await bundleWorker(esbuild);
    const common = { bundle: true, write: false, platform: 'browser', external: ['node:*'], alias: TWGL_ALIAS, plugins: [workerPlugin(workerSource)], minify, legalComments: 'none' };
    const [app, userscript] = await Promise.all([
        esbuild.build({ ...common, entryPoints: [new URL('src/display/app.js', root).pathname], format: 'esm' }),
        esbuild.build({ ...common, entryPoints: [new URL('src/browser/userscript.js', root).pathname], format: 'iife', minify: false }),
    ]);
    const [meta, pkg, html] = await Promise.all([
        readFile(new URL('src/browser/meta.js', root), 'utf8'),
        readFile(new URL('package.json', root), 'utf8'),
        readFile(new URL('src/display/app.html', root), 'utf8'),
    ]);
    const resources = RESOURCE_NAMES.map((name, i) => `// @resource     ${name} ${RESOURCE_URLS[i]}`).join('\n');
    const banner = meta.replace(/(@version\s+)\S+/, `$1${JSON.parse(pkg).version}`).replace('//@@RESOURCES@@', resources).trimEnd();
    return {
        app: app.outputFiles[0].text,
        html,
        userscript: `${banner}\n${userscript.outputFiles[0].text}`,
    };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const bundles = await buildBundles();
    await mkdir(new URL('dist/', root), { recursive: true });
    await Promise.all([
        writeFile(new URL('dist/spre.user.js', root), bundles.userscript),
        writeFile(new URL('dist/app.js', root), bundles.app),
        writeFile(new URL('dist/index.html', root), bundles.html),
    ]);
    console.log(`Built dist/spre.user.js (${Math.round(bundles.userscript.length / 1024)} KiB) and dist/app.js (${Math.round(bundles.app.length / 1024)} KiB).`);
}
