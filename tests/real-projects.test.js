import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { loadProject } from '../src/node.js';
import { assert, test } from './helpers.js';

const PROJECTS = [
    ['Paper Minecraft v11.7 (Minecraft 2D).sb3', 240],
    ['2D Physics Engine.sb3', 40],
];

for (const [name, frames] of PROJECTS) {
    const path = new URL(`../../test-projects/${name}`, import.meta.url);
    test(`${name}: fresh loads agree and restore+replay matches`, { skip: !existsSync(path) && 'test project not present' }, async () => {
        const data = await readFile(path);
        const run = async () => {
            const { vm, spre } = await loadProject(data, { seed: 11 });
            assert.equal(vm.geometry.missing, 0);
            spre.greenFlag();
            spre.input.at(Math.floor(frames / 3), { type: 'mouse', x: 10, y: 20, down: true });
            spre.input.at(Math.floor(frames / 3) + 2, { type: 'mouse', down: false });
            spre.step(Math.floor(frames / 2));
            const snapshot = JSON.parse(JSON.stringify(spre.snapshot()));
            spre.step(frames - Math.floor(frames / 2));
            return { spre, snapshot, hash: spre.hash() };
        };
        const a = await run();
        const b = await run();
        assert.equal(a.hash, b.hash);
        a.spre.restore(b.snapshot);
        a.spre.step(frames - Math.floor(frames / 2));
        assert.equal(a.spre.hash(), b.hash);
    });
}
