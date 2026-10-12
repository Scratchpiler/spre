export function discoverInternals(runtime) {
    let threadClasses = null;
    let VariableClass = null;

    const probeThreadClasses = () => {
        if (threadClasses) return threadClasses;
        const target = runtime.targets[0];
        if (!target) throw new Error('cannot discover the Thread class: the runtime has no targets');
        const probe = runtime._pushThread(null, target);
        runtime.threads.splice(runtime.threads.indexOf(probe), 1);
        threadClasses = { Thread: probe.constructor, StackFrame: probe.stackFrames[0].constructor };
        return threadClasses;
    };

    return {
        Timer: runtime.sequencer.timer.constructor,
        get Thread() { return probeThreadClasses().Thread; },
        get StackFrame() { return probeThreadClasses().StackFrame; },

        get Variable() {
            if (VariableClass) return VariableClass;
            for (const target of runtime.targets) {
                const variable = Object.values(target.variables)[0];
                if (variable) return (VariableClass = variable.constructor);
            }
            return null;
        },

        status: {
            RUNNING: 0,
            PROMISE_WAIT: 1,
            YIELD: 2,
            YIELD_TICK: 3,
            DONE: 4,
        },
    };
}
