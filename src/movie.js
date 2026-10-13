import { canonicalBlockId } from './block-ids.js';
import { hashValue } from './encode.js';

export const MOVIE_VERSION = 2;

const blockShape = (container, block) => [
    canonicalBlockId(container, block.id),
    block.opcode,
    canonicalBlockId(container, block.next),
    canonicalBlockId(container, block.parent),
    Object.entries(block.inputs ?? {}).map(([name, input]) => [name, canonicalBlockId(container, input.block), canonicalBlockId(container, input.shadow)]),
    Object.entries(block.fields ?? {}).map(([name, field]) => [name, field.value, field.id ?? null]),
    block.mutation ? JSON.stringify(block.mutation) : null,
];

export function projectFingerprint(runtime) {
    const targets = runtime.targets.filter(target => target.isOriginal).map(target => {
        const container = target.blocks;
        const blocks = Object.values(container._blocks).map(block => blockShape(container, block));
        blocks.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
        return {
            name: target.isStage ? '' : target.sprite.name,
            stage: target.isStage,
            costumes: target.getCostumes().map(costume => [costume.name, costume.assetId, costume.rotationCenterX, costume.rotationCenterY]),
            sounds: target.getSounds().map(sound => [sound.name, sound.assetId]),
            variables: Object.values(target.variables).map(variable => [variable.id, variable.name, variable.type]).sort(),
            blocks,
        };
    });
    targets.sort((a, b) => Number(b.stage) - Number(a.stage) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    return hashValue(targets);
}

export const rendererKind = renderer => {
    if (!renderer) return 'none';
    if (renderer.isCpuRenderer) return 'cpu';
    if (renderer.isNullRenderer) return 'null';
    return 'other';
};

export const withoutHistory = ({ history, ...snapshot }) => snapshot;
