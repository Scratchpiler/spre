import { normalizeDelay } from './scope.js';

const ORIGINAL = Symbol('spre.original');
const COUNTED_IMPL = Symbol('spre.countedImpl');
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const Y2K = Date.UTC(2000, 0, 1);

const toNumber = value => {
    if (typeof value === 'number') return Number.isNaN(value) ? 0 : value;
    const n = Number(value);
    return Number.isNaN(n) ? 0 : n;
};

const wrapClamp = (n, min, max) => {
    const range = (max - min) + 1;
    return n - (Math.floor((n - min) / range) * range);
};

export const RANDOM_STREAMS = {
    operator_random: 'operator',
    motion_goto: 'motion',
    motion_glideto: 'motion',
    motion_pointtowards: 'motion',
    looks_switchcostumeto: 'looks',
    looks_switchbackdropto: 'looks',
    looks_switchbackdroptoandwait: 'looks',
    looks_say: 'looks',
    looks_think: 'looks',
    looks_sayforsecs: 'looks',
    looks_thinkforsecs: 'looks',
    data_itemoflist: 'data',
    data_deleteoflist: 'data',
    data_insertatlist: 'data',
    data_replaceitemoflist: 'data',
    control_create_clone_of: 'control',
    sensing_askandwait: 'sensing',
};

const soundIndex = (soundName, target) => {
    const sounds = target.sprite.sounds;
    if (sounds.length === 0) return -1;
    const byName = sounds.findIndex(sound => sound.name === soundName);
    if (byName !== -1) return byName;
    const oneIndexed = parseInt(soundName, 10);
    return Number.isNaN(oneIndexed) ? -1 : wrapClamp(oneIndexed - 1, 0, sounds.length - 1);
};

const soundDurationMs = (sound, target) => {
    if (!(sound.rate > 0) || !(sound.sampleCount > 0)) return null;
    const pitch = target.getCustomState('Scratch.sound')?.effects?.pitch ?? 0;
    return (1000 * sound.sampleCount / sound.rate) / Math.pow(2, pitch / 120);
};

const isThenable = value => value !== null && typeof value === 'object' && typeof value.then === 'function';

const silence = result => {
    if (isThenable(result)) result.then(() => {}, () => {});
};

function overridesFor(ctx) {
    const { clock, rng, waits, input, services } = ctx;

    const bubbleFor = type => original => (args, util) => {
        ctx.original(`looks_${type}`)(args, util);
        const target = util.target;
        const usageId = target.getCustomState('Scratch.looks')?.usageId ?? null;
        const delay = normalizeDelay(1000 * args.SECS);
        return waits.add(util.thread, { kind: 'bubble', due: clock.now() + delay, target, type, usageId });
    };

    const nextFrameInsteadOfPromise = original => (args, util) => {
        const result = original(args, util);
        if (!isThenable(result)) return result;
        silence(result);
        return waits.add(util.thread, { kind: 'tick', due: clock.now() });
    };

    return {
        sound_seteffectto: nextFrameInsteadOfPromise,
        sound_changeeffectby: nextFrameInsteadOfPromise,
        sound_setvolumeto: nextFrameInsteadOfPromise,
        sound_changevolumeby: nextFrameInsteadOfPromise,

        operator_random: original => (args, util) => {
            const forced = rng.takePick({ from: args.FROM, to: args.TO, target: util.target.getName() });
            return forced ? forced.value : original(args, util);
        },

        looks_sayforsecs: bubbleFor('say'),
        looks_thinkforsecs: bubbleFor('think'),

        sensing_askandwait: () => (args, util) => waits.ask(String(args.QUESTION), util.target, util.thread),
        sensing_answer: () => () => waits.answer,
        sensing_loudness: () => () => input.loudness,
        sensing_loud: () => () => input.loudness > 10,
        sensing_current: () => args => {
            const parts = clock.localParts();
            const option = String(args.CURRENTMENU).toLowerCase();
            return Object.hasOwn(parts, option) ? parts[option] : 0;
        },
        sensing_dayssince2000: () => () => (Math.trunc(clock.now()) - Y2K) / MS_PER_DAY,

        event_whengreaterthan: original => (args, util) => {
            if (String(args.WHENGREATERTHANMENU).toLowerCase() === 'loudness') {
                return input.loudness > toNumber(args.VALUE);
            }
            return original(args, util);
        },

        translate_getTranslate: () => args => {
            const words = String(args.WORDS);
            if (/^\d+$/.test(words)) return words;
            return String(services.translate({ words, language: String(args.LANGUAGE) }) ?? '');
        },

        text2speech_speakAndWait: () => (args, util) => {
            const words = String(args.WORDS).substring(0, 128);
            const state = util.target.getCustomState('Scratch.text2speech');
            const duration = Number(services.speechMs({ words, voice: state?.voiceId ?? null, sprite: util.target.getName() }));
            return waits.add(util.thread, { kind: 'speech', due: clock.now() + normalizeDelay(duration) });
        },

        sound_play: original => (args, util) => {
            const index = soundIndex(args.SOUND_MENU, util.target);
            if (index >= 0) waits.stopSound(util.target, util.target.sprite.sounds[index].soundId);
            return original(args, util);
        },

        sound_playuntildone: original => (args, util) => {
            const target = util.target;
            const index = soundIndex(args.SOUND_MENU, target);
            if (index >= 0) waits.stopSound(target, target.sprite.sounds[index].soundId);
            silence(original(args, util));
            if (index < 0) return undefined;
            const sound = target.sprite.sounds[index];
            const duration = soundDurationMs(sound, target);
            if (duration === null) return undefined;
            return waits.add(util.thread, { kind: 'sound', due: clock.now() + duration, target, soundId: sound.soundId });
        },

        sound_stopallsounds: original => (args, util) => {
            waits.stopSound(null, null);
            return original(args, util);
        },
    };
}

export function createPrimitives(ctx) {
    const { runtime } = ctx;
    const work = ctx.clock.work;
    const overrides = overridesFor(ctx);

    const resetCaches = () => {
        for (const target of runtime.targets) target.blocks.resetCache();
        runtime.flyoutBlocks?.resetCache();
        runtime.monitorBlocks?.resetCache();
    };

    const counted = impl => function (args, util) {
        work.ops++;
        return impl(args, util);
    };

    const streamed = (impl, stream) => function (args, util) {
        work.ops++;
        const previous = ctx.stream;
        ctx.stream = stream;
        const result = impl(args, util);
        ctx.stream = previous;
        return result;
    };

    const wrap = (opcode, original) => {
        const impl = overrides[opcode] ? overrides[opcode](original) : original;
        const stream = RANDOM_STREAMS[opcode];
        const wrapped = stream ? streamed(impl, stream) : counted(impl);
        wrapped[ORIGINAL] = original;
        if (!stream) wrapped[COUNTED_IMPL] = impl;
        return wrapped;
    };

    return {
        install() {
            let changed = false;
            for (const [opcode, fn] of Object.entries(runtime._primitives)) {
                if (typeof fn !== 'function' || fn[ORIGINAL]) continue;
                runtime._primitives[opcode] = wrap(opcode, fn);
                changed = true;
            }
            if (changed) resetCaches();
        },

        uninstall() {
            for (const [opcode, fn] of Object.entries(runtime._primitives)) {
                if (fn?.[ORIGINAL]) runtime._primitives[opcode] = fn[ORIGINAL];
            }
            resetCaches();
        },

        countedImpl: fn => fn?.[COUNTED_IMPL] ?? null,

        isStock: op => op._blockFunction?.[ORIGINAL] !== undefined && !Object.hasOwn(overrides, op.opcode),

        original(opcode) {
            const fn = runtime._primitives[opcode];
            return fn?.[ORIGINAL] ?? fn;
        },

        overridden: Object.keys(overrides),
    };
}
