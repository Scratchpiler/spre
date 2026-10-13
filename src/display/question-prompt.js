const CSS = `
:host { all: initial; position: absolute; left: 18px; right: 18px; bottom: 18px; z-index: 3; }
:host([hidden]) { display: none; }
.prompt {
    display: grid;
    gap: 6px;
    padding: 8px;
    border-radius: 14px;
    background: var(--card, #ffffff);
    box-shadow: 0 14px 30px -18px rgba(0, 0, 0, 0.55), inset 0 0 0 1px var(--hair-strong, rgba(29, 34, 48, 0.14));
    color: var(--ink, #1d2230);
    font: 500 13px/1.35 ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", "Noto Sans", sans-serif;
    animation: rise 320ms cubic-bezier(0.32, 0.72, 0, 1) both;
}
.label { padding: 2px 6px 0; font-weight: 650; overflow-wrap: anywhere; }
form { display: flex; align-items: center; gap: 6px; margin: 0; }
input {
    flex: 1;
    min-width: 0;
    height: 32px;
    padding: 0 14px;
    border: 0;
    border-radius: 999px;
    background: var(--paper, #eef0f4);
    box-shadow: inset 0 0 0 1px var(--hair, rgba(29, 34, 48, 0.08));
    color: inherit;
    font: inherit;
    font-weight: 400;
}
input:focus { outline: 2px solid var(--accent, #007aff); outline-offset: 0; }
button {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: var(--accent, #007aff);
    color: #ffffff;
    cursor: pointer;
    transition: transform 240ms cubic-bezier(0.32, 0.72, 0, 1);
}
button:active { transform: scale(0.92); }
button:focus-visible { outline: 2px solid var(--accent, #007aff); outline-offset: 2px; }
@keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .prompt { animation: none; } button { transition: none; } }
`;

const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

export function createQuestionPrompt({ client }) {
    const host = document.createElement('div');
    host.setAttribute('data-spre-question', '');
    host.hidden = true;
    const shadow = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    const prompt = document.createElement('div');
    prompt.className = 'prompt';
    prompt.setAttribute('role', 'dialog');
    const label = document.createElement('div');
    label.className = 'label';
    label.id = 'question';
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.setAttribute('aria-labelledby', 'question');
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.title = 'Answer';
    submit.setAttribute('aria-label', 'Answer');
    submit.innerHTML = CHECK;
    form.append(input, submit);
    prompt.append(label, form);
    shadow.append(style, prompt);

    let asking = null;
    let answeredAt = null;
    let lastFrame = 0;

    const stopKeys = event => event.stopPropagation();
    input.addEventListener('keydown', stopKeys);
    input.addEventListener('keyup', stopKeys);

    const hide = () => {
        host.hidden = true;
        asking = null;
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (asking === null) return;
        client.input({ type: 'answer', text: input.value });
        answeredAt = lastFrame;
        input.value = '';
        hide();
    });

    const update = status => {
        if (!status) return;
        lastFrame = status.frame;
        if (status.question === null || status.question === undefined) {
            answeredAt = null;
            if (asking !== null) hide();
            return;
        }
        if (answeredAt !== null && status.frame <= answeredAt + 1) return;
        answeredAt = null;
        const text = status.questionInBubble ? '' : status.question;
        label.textContent = text;
        label.hidden = text === '';
        if (asking === null) {
            input.value = '';
            host.hidden = false;
            input.focus({ preventScroll: true });
        }
        asking = status.question;
    };

    const off = client.on('status', update);

    return {
        element: host,
        update,
        dispose() {
            off?.();
            host.remove();
        },
    };
}
