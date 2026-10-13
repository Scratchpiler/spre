const RUNNING = 0;
const PROMISE_WAIT = 1;
const YIELD = 2;
const YIELD_TICK = 3;
const DONE = 4;
const COMPILE_AFTER_RUNS = 4;

const hasOwn = Object.prototype.hasOwnProperty;

const toNumber = value => {
    if (typeof value === 'number') return value !== value ? 0 : value;
    const n = Number(value);
    return n !== n ? 0 : n;
};

const toBoolean = value => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return !(value === '' || value === '0' || value.toLowerCase() === 'false');
    return Boolean(value);
};

const listIndex = (index, length) => {
    const floored = Math.floor(toNumber(index));
    return floored < 1 || floored > length ? 0 : floored;
};

const cacheable = name => typeof name === 'string' && !(name in Object.prototype);

const isPromise = value => value !== null && typeof value === 'object' && typeof value.then === 'function';

const VARIABLE_HIT = (field, target) =>
    `(${field}.cacheTarget === ${target} && (${field}.cacheOwner === ${target} || ${target}.variables[${field}.id] === undefined) && ${field}.cacheOwner.variables[${field}.id] === ${field}.cacheVariable)`;

const literal = n => (Object.is(n, -0) ? '(-0)' : n < 0 ? `(${n})` : String(n));

const staticOf = (statics, op, key) => {
    if (statics.fed.get(op._argValues)?.has(key) || !(key in op._argValues)) return undefined;
    const value = op._argValues[key];
    return typeof value === 'number' || typeof value === 'string' ? value : undefined;
};

const operand = (i, key, statics, op) => {
    const value = staticOf(statics, op, key);
    return value === undefined ? `tn(a${i}.${key})` : literal(toNumber(value));
};

const comparable = (value) => {
    if (typeof value === 'number') return value === value ? value : undefined;
    if (typeof value !== 'string' || value.trim() === '') return undefined;
    const n = Number(value);
    return n === n ? n : undefined;
};

const arithmetic = operator => (i, op, statics) => `work.ops++; r = ${operand(i, 'NUM1', statics, op)} ${operator} ${operand(i, 'NUM2', statics, op)};`;

const comparison = operator => (i, op, statics) => {
    const sides = ['OPERAND1', 'OPERAND2'].map((key, index) => {
        const folded = comparable(staticOf(statics, op, key));
        return folded === undefined
            ? { expr: index === 0 ? 'x' : 'y', load: `const ${index === 0 ? 'x' : 'y'} = a${i}.${key};`, check: `typeof ${index === 0 ? 'x' : 'y'} === 'number' && ${index === 0 ? 'x' : 'y'} === ${index === 0 ? 'x' : 'y'}` }
            : { expr: literal(folded), load: '', check: 'true' };
    });
    return `{ ${sides[0].load} ${sides[1].load} if (${sides[0].check} && ${sides[1].check}) { work.ops++; r = ${sides[0].expr} ${operator} ${sides[1].expr}; } else r = f${i}(a${i}, util); }`;
};

const resolved = (i, field, list) => `const fld = a${i}.${field}, t = thread.target; const v = ${VARIABLE_HIT('fld', 't')} ? fld.cacheVariable : lookup(fld, t, ${list});`;

const parameter = (i, op) => {
    const name = op._argValues.VALUE;
    if (!cacheable(name)) return null;
    const key = JSON.stringify(name);
    return `work.ops++; r = 0; for (let j = thread.stackFrames.length - 1; j >= 0; j--) { const ps = thread.stackFrames[j].params; if (ps === null) continue; const pv = ps[${key}]; if (pv !== undefined) r = pv === null ? 0 : pv; else if (hasOwn.call(ps, ${key})) r = undefined; break; }`;
};

const emitters = {
    operator_add: arithmetic('+'),
    operator_subtract: arithmetic('-'),
    operator_multiply: arithmetic('*'),
    operator_divide: arithmetic('/'),
    operator_gt: comparison('>'),
    operator_lt: comparison('<'),
    operator_equals: comparison('==='),
    operator_and: i => `work.ops++; r = bool(a${i}.OPERAND1) && bool(a${i}.OPERAND2);`,
    operator_or: i => `work.ops++; r = bool(a${i}.OPERAND1) || bool(a${i}.OPERAND2);`,
    operator_not: i => `work.ops++; r = !bool(a${i}.OPERAND);`,
    operator_mod: (i, op, statics) => `work.ops++; { const n = ${operand(i, 'NUM1', statics, op)}, m = ${operand(i, 'NUM2', statics, op)}; r = n % m; if (r / m < 0) r += m; }`,
    operator_round: (i, op, statics) => `work.ops++; r = Math.round(${operand(i, 'NUM', statics, op)});`,
    control_if: i => `work.ops++; if (bool(a${i}.CONDITION)) sequencer.stepToBranch(thread, 1, false); r = undefined;`,
    control_if_else: i => `work.ops++; if (bool(a${i}.CONDITION)) sequencer.stepToBranch(thread, 1, false); else sequencer.stepToBranch(thread, 2, false); r = undefined;`,
    control_forever: () => 'work.ops++; sequencer.stepToBranch(thread, 1, true); r = undefined;',
    control_repeat: (i, op, statics) => `work.ops++; { const times = Math.round(${operand(i, 'TIMES', statics, op)}); const fr = thread.peekStackFrame(); const ec = fr.executionContext === null ? (fr.executionContext = {}) : fr.executionContext; if (ec.loopCounter === undefined) ec.loopCounter = times; ec.loopCounter--; if (ec.loopCounter >= 0) sequencer.stepToBranch(thread, 1, true); } r = undefined;`,
    data_lengthoflist: i => `work.ops++; { ${resolved(i, 'LIST', true)} r = v.value.length; }`,
    argument_reporter_string_number: parameter,
    argument_reporter_boolean: parameter,
    procedures_call: (i, op, statics, bind, helpers) => {
        const state = bind('c', i, helpers.procedureState(op));
        return `work.ops++; callProcedure(a${i}, util, thread, ${state}); r = undefined;`;
    },
    data_variable: i => `work.ops++; { ${resolved(i, 'VARIABLE', false)} r = v.value; }`,
    data_setvariableto: i => `work.ops++; { ${resolved(i, 'VARIABLE', false)} if (v.isCloud) { work.ops--; f${i}(a${i}, util); } else v.value = a${i}.VALUE; r = undefined; }`,
    data_changevariableby: i => `work.ops++; { ${resolved(i, 'VARIABLE', false)} if (v.isCloud) { work.ops--; f${i}(a${i}, util); } else v.value = tn(v.value) + tn(a${i}.VALUE); r = undefined; }`,
    data_itemoflist: i => `{ const idx = a${i}.INDEX; if (typeof idx !== 'number') r = f${i}(a${i}, util); else { work.ops++; ${resolved(i, 'LIST', true)} const k = listIndex(idx, v.value.length); r = k === 0 ? '' : v.value[k - 1]; } }`,
    data_replaceitemoflist: i => `{ const idx = a${i}.INDEX; if (typeof idx !== 'number') r = f${i}(a${i}, util); else { work.ops++; ${resolved(i, 'LIST', true)} const k = listIndex(idx, v.value.length); if (k !== 0) { v.value[k - 1] = a${i}.ITEM; v._monitorUpToDate = false; } r = undefined; } }`,
};

const compileOps = (blockCached, glow, helpers, handleReport, handlePromise) => {
    const { _ops: ops } = blockCached;
    const { work, countedImpl, isStock } = helpers;
    const names = [];
    const values = [];
    const bind = (prefix, index, value) => {
        const name = `${prefix}${index}`;
        names.push(name);
        values.push(value);
        return name;
    };
    const statics = { fed: new Map() };
    for (const op of ops) {
        if (op._parentValues === null) continue;
        if (!statics.fed.has(op._parentValues)) statics.fed.set(op._parentValues, new Set());
        statics.fed.get(op._parentValues).add(op._parentKey);
    }
    const lines = [];
    ops.forEach((op, i) => {
        const impl = countedImpl(op._blockFunction);
        const wrapper = bind('f', i, op._blockFunction);
        const args = bind('a', i, op._argValues);
        if (glow) lines.push('thread.requestScriptGlowInFrame = true;');
        const special = isStock(op) ? emitters[op.opcode]?.(i, op, statics, bind, helpers) : null;
        if (special) {
            lines.push(special);
        } else if (impl) {
            const direct = bind('m', i, impl);
            lines.push('work.ops++;', `r = ${direct}(${args}, util);`);
        } else {
            lines.push(`r = ${wrapper}(${args}, util);`);
        }
        lines.push(`if (r !== null && typeof r === 'object' && typeof r.then === 'function') return pending(sequencer, thread, frame, ${i}, r);`);
        if (i === ops.length - 1) {
            lines.push(`if (thread.status === 0) handleReport(r, sequencer, thread, op${i}, true);`);
            bind('op', i, op);
            return;
        }
        const parent = bind('p', i, op._parentValues);
        if (op._parentKey === 'BROADCAST_INPUT') {
            lines.push(`if (thread.status === 0) { ${parent}.BROADCAST_OPTION.id = null; ${parent}.BROADCAST_OPTION.name = String(r); }`);
        } else {
            lines.push(`if (thread.status === 0) ${parent}[${JSON.stringify(op._parentKey)}] = r;`);
        }
    });
    const pending = (sequencer, thread, frame, index, promise) => {
        const op = ops[index];
        handlePromise(promise, sequencer, thread, op, index === ops.length - 1);
        thread.justReported = null;
        frame.reporting = op.id;
        frame.reported = ops.slice(0, index).map(reported => {
            const inputName = reported._parentKey;
            const reportedValues = reported._parentValues;
            if (inputName === 'BROADCAST_INPUT') {
                return { opCached: reported.id, inputValue: reportedValues[inputName].BROADCAST_OPTION.name };
            }
            return { opCached: reported.id, inputValue: reportedValues[inputName] };
        });
    };
    const body = `return function (sequencer, thread, util, frame) {\nlet r;\n${lines.join('\n')}\n};`;
    return new Function('work', 'tn', 'bool', 'listIndex', 'hasOwn', 'lookup', 'callProcedure', 'handleReport', 'pending', ...names, body)(work, toNumber, toBoolean, listIndex, hasOwn, helpers.lookup, helpers.callProcedure, handleReport, pending, ...values);
};

export function installFastExecute(runtime, { work, countedImpl, isStock, probes = { current: null } }) {
    const sequencer = runtime.sequencer;
    const Timer = sequencer.timer.constructor;
    const WARP_TIME = sequencer.constructor.WARP_TIME;
    const stepThreadOfPrototype = Object.getPrototypeOf(sequencer).stepThread;
    const originalStepThread = sequencer.stepThread;

    const util = {
        sequencer,
        thread: null,
        _nowObj: { now: () => runtime.currentMSecs },
        get target() { return this.thread.target; },
        get runtime() { return this.sequencer.runtime; },
        get nowObj() { return this.runtime ? this._nowObj : null; },
        get stackFrame() {
            const frame = this.thread.peekStackFrame();
            if (frame.executionContext === null) frame.executionContext = {};
            return frame.executionContext;
        },
        stackTimerFinished() { return this.stackFrame.timer.timeElapsed() >= this.stackFrame.duration; },
        stackTimerNeedsInit() { return !this.stackFrame.timer; },
        startStackTimer(duration) {
            const frame = this.stackFrame;
            frame.timer = this.nowObj ? new Timer(this.nowObj) : new Timer();
            frame.timer.start();
            frame.duration = duration;
        },
        yield() { this.thread.status = YIELD; },
        yieldTick() { this.thread.status = YIELD_TICK; },
        startBranch(branchNum, isLoop) { this.sequencer.stepToBranch(this.thread, branchNum, isLoop); },
        stopAll() { this.sequencer.runtime.stopAll(); },
        stopOtherTargetThreads() { this.sequencer.runtime.stopForTarget(this.thread.target, this.thread); },
        stopThisScript() { this.thread.stopThisScript(); },
        startProcedure(procedureCode) { this.sequencer.stepToProcedure(this.thread, procedureCode); },
        getProcedureParamNamesAndIds(procedureCode) { return this.thread.target.blocks.getProcedureParamNamesAndIds(procedureCode); },
        getProcedureParamNamesIdsAndDefaults(procedureCode) { return this.thread.target.blocks.getProcedureParamNamesIdsAndDefaults(procedureCode); },
        initParams() { this.thread.initParams(); },
        pushParam(paramName, paramValue) { this.thread.pushParam(paramName, paramValue); },
        getParam(paramName) { return this.thread.getParam(paramName); },
        startHats(requestedHat, optMatchFields, optTarget) {
            const callerThread = this.thread;
            const callerSequencer = this.sequencer;
            const result = this.sequencer.runtime.startHats(requestedHat, optMatchFields, optTarget);
            this.thread = callerThread;
            this.sequencer = callerSequencer;
            return result;
        },
        ioQuery(device, func, args) {
            const ioDevices = this.sequencer.runtime.ioDevices;
            if (ioDevices[device] && ioDevices[device][func]) {
                const devObject = ioDevices[device];
                return devObject[func].apply(devObject, args);
            }
        },
    };

    const handleReport = (resolvedValue, sequencerArg, thread, blockCached, lastOperation) => {
        const currentBlockId = blockCached.id;
        const opcode = blockCached.opcode;
        thread.pushReportedValue(resolvedValue);
        if (blockCached._isHat) {
            if (sequencerArg.runtime.getIsEdgeActivatedHat(opcode)) {
                if (!thread.stackClick) {
                    const hasOldEdgeValue = thread.target.hasEdgeActivatedValue(currentBlockId);
                    const oldEdgeValue = thread.target.updateEdgeActivatedValue(currentBlockId, resolvedValue);
                    const edgeWasActivated = hasOldEdgeValue ? (!oldEdgeValue && resolvedValue) : resolvedValue;
                    if (!edgeWasActivated) sequencerArg.retireThread(thread);
                }
            } else if (!resolvedValue) {
                sequencerArg.retireThread(thread);
            }
            return;
        }
        if (lastOperation && typeof resolvedValue !== 'undefined' && thread.atStackTop()) {
            if (thread.stackClick) sequencerArg.runtime.visualReport(currentBlockId, resolvedValue);
            if (thread.updateMonitor) {
                const targetId = sequencerArg.runtime.monitorBlocks.getBlock(currentBlockId).targetId;
                if (targetId && !sequencerArg.runtime.getTargetById(targetId)) return;
                sequencerArg.runtime.requestUpdateMonitor(sequencerArg.runtime._monitorState.clear().merge({
                    id: currentBlockId,
                    spriteName: targetId ? sequencerArg.runtime.getTargetById(targetId).getName() : null,
                    value: resolvedValue,
                }));
            }
        }
        thread.status = RUNNING;
    };

    const handlePromise = (primitiveReportedValue, sequencerArg, thread, blockCached, lastOperation) => {
        if (thread.status === RUNNING) thread.status = PROMISE_WAIT;
        primitiveReportedValue.then(resolvedValue => {
            handleReport(resolvedValue, sequencerArg, thread, blockCached, lastOperation);
            if (lastOperation) {
                let nextBlockId;
                let stackFrame;
                do {
                    const popped = thread.popStack();
                    if (popped === null) return;
                    nextBlockId = thread.target.blocks.getNextBlock(popped);
                    if (nextBlockId !== null) break;
                    stackFrame = thread.peekStackFrame();
                } while (stackFrame !== null && !stackFrame.isLoop);
                thread.pushStack(nextBlockId);
            }
        }, rejectionReason => {
            console.warn('Primitive rejected promise: ', rejectionReason);
            thread.status = RUNNING;
            thread.popStack();
        });
    };

    class BlockCached {
        constructor(blockContainer, cached) {
            this.id = cached.id;
            this.opcode = cached.opcode;
            this.fields = cached.fields;
            this.inputs = cached.inputs;
            this.mutation = cached.mutation;
            this._profiler = null;
            this._profilerFrame = null;
            this._isHat = false;
            this._blockFunction = null;
            this._definedBlockFunction = false;
            this._isShadowBlock = false;
            this._shadowValue = null;
            this._fields = Object.assign({}, this.fields);
            this._inputs = Object.assign({}, this.inputs);
            this._argValues = { mutation: this.mutation };
            this._parentKey = null;
            this._parentValues = null;
            this._ops = [];
            this._glow = !blockContainer.forceNoGlow;
            this._container = blockContainer;
            this._runs = 0;
            this._compiled = null;

            const { opcode, fields, inputs } = this;
            this._isHat = runtime.getIsHat(opcode);
            this._blockFunction = runtime.getOpcodeFunction(opcode);
            this._definedBlockFunction = typeof this._blockFunction !== 'undefined';

            const fieldKeys = Object.keys(fields);
            this._isShadowBlock = !this._definedBlockFunction && fieldKeys.length === 1 && Object.keys(inputs).length === 0;
            this._shadowValue = this._isShadowBlock && fields[fieldKeys[0]].value;

            for (const fieldName in fields) {
                if (fieldName === 'VARIABLE' || fieldName === 'LIST' || fieldName === 'BROADCAST_OPTION') {
                    this._argValues[fieldName] = { id: fields[fieldName].id, name: fields[fieldName].value };
                    if (fieldName !== 'BROADCAST_OPTION') Object.assign(this._argValues[fieldName], { cacheTarget: null, cacheOwner: null, cacheVariable: null });
                } else {
                    this._argValues[fieldName] = fields[fieldName].value;
                }
            }

            delete this._inputs.custom_block;

            if ('BROADCAST_INPUT' in this._inputs) {
                this._argValues.BROADCAST_OPTION = { id: null, name: null };
                const broadcastInput = this._inputs.BROADCAST_INPUT;
                if (broadcastInput.block === broadcastInput.shadow) {
                    const shadow = blockContainer.getBlock(broadcastInput.shadow);
                    const broadcastField = shadow.fields.BROADCAST_OPTION;
                    this._argValues.BROADCAST_OPTION.id = broadcastField.id;
                    this._argValues.BROADCAST_OPTION.name = broadcastField.value;
                    delete this._inputs.BROADCAST_INPUT;
                }
            }

            for (const inputName in this._inputs) {
                const input = this._inputs[inputName];
                if (!input.block) continue;
                const inputCached = getCached(blockContainer, input.block);
                if (inputCached._isHat) continue;
                this._ops.push(...inputCached._ops);
                inputCached._parentKey = inputName;
                inputCached._parentValues = this._argValues;
                if (inputCached._isShadowBlock) this._argValues[inputName] = inputCached._shadowValue;
            }

            if (this._definedBlockFunction) this._ops.push(this);
        }
    }

    const lookup = (field, target, list) => {
        const variable = list
            ? target.lookupOrCreateList(field.id, field.name)
            : target.lookupOrCreateVariable(field.id, field.name);
        const id = field.id;
        if (target.variables[id] === variable) {
            field.cacheOwner = target;
        } else {
            const stage = runtime.getTargetForStage();
            if (target.isStage || !stage || target.variables[id] !== undefined || stage.variables[id] !== variable) return variable;
            field.cacheOwner = stage;
        }
        field.cacheTarget = target;
        field.cacheVariable = variable;
        return variable;
    };

    const procedureState = op => ({
        container: op._container,
        code: op._argValues.mutation.proccode,
        impl: countedImpl(op._blockFunction),
        info: undefined,
        definition: undefined,
        doWarp: false,
    });

    const loadProcedure = state => {
        const blocks = state.container;
        state.info = blocks.getProcedureParamNamesIdsAndDefaults(state.code);
        state.definition = blocks.getProcedureDefinition(state.code);
        const definitionBlock = state.definition ? blocks.getBlock(state.definition) : undefined;
        const innerBlock = definitionBlock ? blocks.getBlock(definitionBlock.inputs.custom_block.block) : undefined;
        const warp = innerBlock?.mutation?.warp;
        state.doWarp = typeof warp === 'boolean' ? warp : typeof warp === 'string' ? JSON.parse(warp) : false;
    };

    const callProcedure = (args, util, thread, state) => {
        if (thread.target.blocks !== state.container) {
            state.impl(args, util);
            return;
        }
        const frame = thread.peekStackFrame();
        if (frame.executionContext === null) frame.executionContext = {};
        if (frame.executionContext.executed) return;
        if (state.info === undefined) loadProcedure(state);
        const info = state.info;
        if (info === null) return;
        const [names, ids, defaults] = info;
        if (frame.params === null) frame.params = {};
        const params = frame.params;
        for (let i = 0; i < ids.length; i++) {
            params[names[i]] = hasOwn.call(args, ids[i]) ? args[ids[i]] : defaults[i];
        }
        frame.executionContext.executed = true;
        const definition = state.definition;
        if (!definition) return;
        const isRecursive = thread.isRecursiveCall(state.code);
        thread.pushStack(definition);
        const top = thread.peekStackFrame();
        if (top.warpMode && thread.warpTimer.timeElapsed() > WARP_TIME) {
            thread.status = YIELD;
        } else if (state.doWarp) {
            top.warpMode = true;
        } else if (isRecursive) {
            thread.status = YIELD;
        }
    };

    const getCached = (blocks, blockId) => {
        let cached = blocks._cache._executeCached[blockId];
        if (typeof cached !== 'undefined') return cached;
        const block = blocks.getBlock(blockId);
        if (typeof block === 'undefined') return null;
        cached = new BlockCached(blocks, {
            id: blockId,
            opcode: blocks.getOpcode(block),
            fields: blocks.getFields(block),
            inputs: blocks.getInputs(block),
            mutation: blocks.getMutation(block),
        });
        blocks._cache._executeCached[blockId] = cached;
        return cached;
    };

    const executeGeneric = (thread, currentStackFrame, blockCached, blockContainer) => {
        const ops = blockCached._ops;
        const length = ops.length;
        let i = 0;
        if (currentStackFrame.reported !== null) {
            const reported = currentStackFrame.reported;
            for (; i < reported.length; i++) {
                const { opCached: oldOpCached, inputValue } = reported[i];
                const opCached = ops.find(op => op.id === oldOpCached);
                if (!opCached) continue;
                const inputName = opCached._parentKey;
                const argValues = opCached._parentValues;
                if (inputName === 'BROADCAST_INPUT') {
                    argValues.BROADCAST_OPTION.id = null;
                    argValues.BROADCAST_OPTION.name = String(inputValue);
                } else {
                    argValues[inputName] = inputValue;
                }
            }
            if (reported.length > 0) {
                const lastExisting = reported.reverse().find(report => ops.find(op => op.id === report.opCached));
                i = lastExisting ? ops.findIndex(opCached => opCached.id === lastExisting.opCached) + 1 : 0;
            }
            if (thread.justReported !== null && ops[i] && ops[i].id === currentStackFrame.reporting) {
                const opCached = ops[i];
                const inputValue = thread.justReported;
                thread.justReported = null;
                const inputName = opCached._parentKey;
                const argValues = opCached._parentValues;
                if (inputName === 'BROADCAST_INPUT') {
                    argValues.BROADCAST_OPTION.id = null;
                    argValues.BROADCAST_OPTION.name = String(inputValue);
                } else {
                    argValues[inputName] = inputValue;
                }
                i += 1;
            }
            currentStackFrame.reporting = null;
            currentStackFrame.reported = null;
        }
        const start = i;
        for (; i < length; i++) {
            const lastOperation = i === length - 1;
            const opCached = ops[i];
            if (!blockContainer.forceNoGlow) thread.requestScriptGlowInFrame = true;
            const primitiveReportedValue = opCached._blockFunction(opCached._argValues, util);
            if (isPromise(primitiveReportedValue)) {
                handlePromise(primitiveReportedValue, sequencer, thread, opCached, lastOperation);
                thread.justReported = null;
                currentStackFrame.reporting = ops[i].id;
                currentStackFrame.reported = ops.slice(0, i).map(reportedCached => {
                    const inputName = reportedCached._parentKey;
                    const reportedValues = reportedCached._parentValues;
                    if (inputName === 'BROADCAST_INPUT') {
                        return { opCached: reportedCached.id, inputValue: reportedValues[inputName].BROADCAST_OPTION.name };
                    }
                    return { opCached: reportedCached.id, inputValue: reportedValues[inputName] };
                });
                break;
            } else if (thread.status === RUNNING) {
                if (lastOperation) {
                    handleReport(primitiveReportedValue, sequencer, thread, opCached, lastOperation);
                } else {
                    const inputName = opCached._parentKey;
                    const parentValues = opCached._parentValues;
                    if (inputName === 'BROADCAST_INPUT') {
                        parentValues.BROADCAST_OPTION.id = null;
                        parentValues.BROADCAST_OPTION.name = String(primitiveReportedValue);
                    } else {
                        parentValues[inputName] = primitiveReportedValue;
                    }
                }
            }
        }
        if (runtime.profiler !== null) {
            if (blockCached._profiler !== runtime.profiler) {
                blockCached._profiler = runtime.profiler;
                const frameId = runtime.profiler.idByName('blockFunction');
                for (const op of ops) op._profilerFrame = runtime.profiler.frame(frameId, op.opcode);
            }
            const end = Math.min(i + 1, length);
            for (let p = start; p < end; p++) ops[p]._profilerFrame.count += 1;
        }
    };

    const execute = thread => {
        util.sequencer = sequencer;
        util.thread = thread;
        const currentBlockId = thread.peekStack();
        const currentStackFrame = thread.peekStackFrame();
        let blockContainer = thread.blockContainer;
        let blockCached = getCached(blockContainer, currentBlockId);
        if (blockCached === null) {
            blockContainer = runtime.flyoutBlocks;
            blockCached = getCached(blockContainer, currentBlockId);
            if (blockCached === null) {
                sequencer.retireThread(thread);
                return;
            }
        }
        if (currentStackFrame.reported === null && runtime.profiler === null) {
            const compiled = blockCached._compiled;
            if (compiled !== null) {
                compiled(sequencer, thread, util, currentStackFrame);
                return;
            }
            if (!compileFailed && ++blockCached._runs >= COMPILE_AFTER_RUNS && blockCached._ops.length > 0) {
                try {
                    blockCached._compiled = compileOps(blockCached, blockCached._glow, { work, countedImpl, isStock, lookup, callProcedure, procedureState }, handleReport, handlePromise);
                    compiledBlocks++;
                } catch {
                    compileFailed = true;
                }
            }
        }
        executeGeneric(thread, currentStackFrame, blockCached, blockContainer);
    };

    let compiledBlocks = 0;
    let compileFailed = false;

    const stepThread = function (thread) {
        work.ops++;
        const probe = probes.current;
        if (probe !== null) probe.step(thread);
        let currentBlockId = thread.peekStack();
        if (!currentBlockId) {
            thread.popStack();
            if (thread.stack.length === 0) {
                thread.status = DONE;
                return;
            }
        }
        while (currentBlockId = thread.peekStack()) {
            let isWarpMode = thread.peekStackFrame().warpMode;
            if (isWarpMode && !thread.warpTimer) {
                thread.warpTimer = new Timer();
                thread.warpTimer.start();
            }
            if (thread.target === null) this.retireThread(thread);
            else if (probe === null) execute(thread);
            else probe.block(thread, currentBlockId, execute);
            thread.blockGlowInFrame = currentBlockId;
            if (thread.status === YIELD) {
                thread.status = RUNNING;
                if (isWarpMode && thread.warpTimer.timeElapsed() <= WARP_TIME) continue;
                return;
            } else if (thread.status === PROMISE_WAIT) {
                return;
            } else if (thread.status === YIELD_TICK) {
                return;
            }
            if (thread.peekStack() === currentBlockId) thread.goToNextBlock();
            while (!thread.peekStack()) {
                thread.popStack();
                if (thread.stack.length === 0) {
                    thread.status = DONE;
                    return;
                }
                const stackFrame = thread.peekStackFrame();
                isWarpMode = stackFrame.warpMode;
                if (stackFrame.isLoop) {
                    if (!isWarpMode || thread.warpTimer.timeElapsed() > WARP_TIME) return;
                    continue;
                } else if (stackFrame.waitingReporter) {
                    return;
                }
                thread.goToNextBlock();
            }
        }
    };

    return {
        stepThread,
        get compiledBlocks() { return compiledBlocks; },
        reset() {
            for (const target of runtime.targets) target.blocks.resetCache();
            runtime.flyoutBlocks?.resetCache();
            runtime.monitorBlocks?.resetCache();
        },
        originalStepThread,
        stepThreadOfPrototype,
    };
}
