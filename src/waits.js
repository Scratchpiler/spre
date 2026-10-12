const PENDING = Object.freeze({ then() {} });

const byDueThenSeq = (a, b) => (a.due - b.due) || (a.seq - b.seq);

export function createWaits(ctx) {
    const { runtime, clock } = ctx;
    let entries = [];
    let questions = [];
    let answer = '';
    let seq = 0;

    const say = (target, type, text) => {
        const updateBubble = runtime.listeners('SAY').find(fn => fn.name === 'bound _updateBubble');
        if (updateBubble) updateBubble(target, type, text);
        else runtime.emit('SAY', target, type, text);
    };

    const resume = (thread, blockId) => {
        if (!thread || !runtime.threads.includes(thread)) return;
        thread.pushReportedValue(undefined);
        thread.status = ctx.internals.status.RUNNING;
        let stackFrame;
        let nextBlockId;
        do {
            const popped = thread.popStack();
            if (popped === null) return;
            nextBlockId = thread.target.blocks.getNextBlock(popped);
            if (nextBlockId !== null) break;
            stackFrame = thread.peekStackFrame();
        } while (stackFrame !== null && !stackFrame.isLoop);
        thread.pushStack(nextBlockId);
    };

    const finish = entry => {
        if (entry.kind === 'bubble') {
            const usageId = entry.target.getCustomState('Scratch.looks')?.usageId ?? null;
            if (usageId === entry.usageId) say(entry.target, entry.type, '');
        }
        resume(entry.thread, entry.block);
    };

    const remove = predicate => {
        const removed = entries.filter(predicate);
        if (removed.length) entries = entries.filter(entry => !removed.includes(entry));
        return removed;
    };

    const showNextQuestion = () => {
        const question = questions[0];
        if (!question) return;
        if (question.wasVisible && !question.wasStage) {
            say(question.target, 'say', question.text);
            runtime.emit('QUESTION', '');
        } else {
            runtime.emit('QUESTION', question.text);
        }
    };

    return {
        add(thread, entry) {
            entries.push({ seq: seq++, thread, block: thread.peekStack(), ...entry });
            return PENDING;
        },

        resolveDue(now) {
            const ready = remove(entry => entry.due !== null && entry.due <= now).sort(byDueThenSeq);
            for (const entry of ready) finish(entry);
        },

        stopSound(target, soundId) {
            const now = clock.now();
            for (const entry of entries) {
                if (entry.kind !== 'sound') continue;
                if (target !== null && (entry.target !== target || entry.soundId !== soundId)) continue;
                entry.due = Math.min(entry.due, now);
            }
        },

        ask(text, target, thread) {
            const wasAsking = questions.length > 0;
            const wait = { seq: seq++, kind: 'question', due: null, thread, block: thread.peekStack() };
            entries.push(wait);
            questions.push({ text, target, wasVisible: target.visible, wasStage: target.isStage, wait });
            if (!wasAsking) showNextQuestion();
            return PENDING;
        },

        get answer() { return answer; },
        get question() { return questions[0] ?? null; },

        submit(text) {
            answer = text;
            const question = questions.shift();
            if (!question) return false;
            if (question.wasVisible && !question.wasStage) say(question.target, 'say', '');
            remove(entry => entry === question.wait);
            resume(question.wait.thread, question.wait.block);
            showNextQuestion();
            return true;
        },

        onProjectStart() {
            answer = '';
        },

        onStopAll() {
            entries = [];
            questions = [];
        },

        onStopForTarget(target) {
            const currentlyAsking = questions.length > 0 && questions[0].target === target;
            const dropped = questions.filter(question => question.target === target);
            if (!dropped.length) return;
            questions = questions.filter(question => question.target !== target);
            remove(entry => dropped.some(question => question.wait === entry));
            if (!currentlyAsking) return;
            say(target, 'say', '');
            if (questions.length) showNextQuestion();
            else runtime.emit('QUESTION', null);
        },

        get pending() { return entries.length; },

        save() {
            return {
                seq,
                answer,
                entries: entries.map(entry => ({ ...entry })),
                questions: questions.map(question => ({ ...question, wait: entries.indexOf(question.wait) })),
            };
        },

        load(saved) {
            seq = saved.seq;
            answer = saved.answer;
            entries = saved.entries.map(entry => ({ ...entry }));
            questions = saved.questions.map(question => ({ ...question, wait: entries[question.wait] }));
        },

        replayQuestionPrompt() {
            const question = questions[0];
            if (!question) runtime.emit('QUESTION', null);
            else runtime.emit('QUESTION', question.wasVisible && !question.wasStage ? '' : question.text);
        },
    };
}
