const TARGET_MOVED = 'TARGET_MOVED';
const PEN_STATE = 'Scratch.pen';

const isPenMoveListener = fn => fn.name === 'bound _onTargetMoved';

export function ensurePenLayer(runtime) {
    const clear = runtime._primitives.pen_clear;
    const renderer = runtime.renderer;
    if (!clear || !renderer?.allSkins) return false;
    if (renderer.allSkins.some(skin => skin?.kind === 'pen')) return false;
    clear({}, null);
    return true;
}

export function reattachPenListeners(runtime) {
    const cloneHooks = runtime.listeners('targetWasCreated').filter(fn => fn.name === 'bound _onTargetCreated');
    for (const target of runtime.targets) {
        for (const listener of target.listeners(TARGET_MOVED).filter(isPenMoveListener)) target.removeListener(TARGET_MOVED, listener);
    }
    if (!cloneHooks.length) return;
    for (const target of runtime.targets) {
        const penState = target.getCustomState(PEN_STATE);
        if (!penState?.penDown) continue;
        const source = { getCustomState: key => (key === PEN_STATE ? { penDown: true } : undefined) };
        for (const hook of cloneHooks) hook(target, source);
        target._customState[PEN_STATE] = penState;
    }
}
