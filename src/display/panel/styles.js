export const PANEL_CSS = `
:host {
    all: initial;
    --paper: #eef0f4;
    --card: #ffffff;
    --card-raised: #f7f8fa;
    --ink: #1d2230;
    --muted: #6b7286;
    --faint: #9aa1b2;
    --hair: rgba(29, 34, 48, 0.08);
    --hair-strong: rgba(29, 34, 48, 0.14);
    --violet: #6a4df5;
    --violet-soft: rgba(106, 77, 245, 0.12);
    --ice: #1ba7c4;
    --ice-soft: rgba(27, 167, 196, 0.13);
    --data: #ff8c1a;
    --list: #ff661a;
    --event: #ffbf00;
    --live: #e5484d;
    --shell: rgba(29, 34, 48, 0.05);
    --shadow: 0 34px 70px -34px rgba(29, 34, 48, 0.42), 0 3px 10px -4px rgba(29, 34, 48, 0.14);
    --highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --spring: cubic-bezier(0.32, 0.72, 0, 1);
    --snap: cubic-bezier(0.2, 0.9, 0.1, 1);
    --ui: ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", "Noto Sans", sans-serif;
    --pixel: "SPRE Pixel", ui-sans-serif, system-ui, sans-serif;
    font: 400 12.5px/1.4 var(--ui);
    color: var(--ink);
    font-variant-numeric: tabular-nums;
}

@media (prefers-color-scheme: dark) {
    :host {
        --paper: #16181e;
        --card: #1f222a;
        --card-raised: #252933;
        --ink: #e9ebf1;
        --muted: #9097a8;
        --faint: #6c7387;
        --hair: rgba(233, 235, 241, 0.08);
        --hair-strong: rgba(233, 235, 241, 0.14);
        --violet: #8b74ff;
        --violet-soft: rgba(139, 116, 255, 0.16);
        --ice: #3cc3df;
        --ice-soft: rgba(60, 195, 223, 0.15);
        --shell: rgba(233, 235, 241, 0.05);
        --shadow: 0 34px 70px -30px rgba(0, 0, 0, 0.7), 0 3px 10px -4px rgba(0, 0, 0, 0.5);
        --highlight: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
}

* { box-sizing: border-box; }

[hidden] { display: none !important; }

button, input, select { font: inherit; color: inherit; }

button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

button:focus-visible, input:focus-visible, select:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid var(--violet);
    outline-offset: 2px;
}

.shell {
    position: fixed;
    z-index: 2147483000;
    padding: 5px;
    border-radius: 20px;
    background: var(--shell);
    box-shadow: var(--shadow);
    outline: 1px solid var(--hair);
    outline-offset: -1px;
    transform-origin: 100% 100%;
    animation: open 520ms var(--spring) both;
}

.shell.inline {
    position: relative;
    inset: auto;
    width: 100%;
    height: 100%;
    z-index: auto;
    animation: none;
}

.shell.inline .head { cursor: default; }

@keyframes open {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to { opacity: 1; transform: none; }
}

.core {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    background: var(--card);
    box-shadow: var(--highlight);
}

.head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 10px 10px 8px 10px;
    cursor: grab;
    user-select: none;
    touch-action: none;
}

.head:active { cursor: grabbing; }

.island {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 3px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
}

.icon-button {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    color: var(--ink);
    transition: transform 260ms var(--spring), background-color 200ms var(--snap), color 200ms var(--snap);
}

.icon-button:hover { background: var(--hair); }
.icon-button:active { transform: scale(0.92); }
.icon-button[disabled] { opacity: 0.35; pointer-events: none; }
.icon-button.primary { background: var(--violet); color: #fff; }
.icon-button.primary:hover { background: var(--violet); transform: scale(1.04); }
.icon-button.small { width: 24px; height: 24px; }
.icon-button.is-on { color: var(--live); }
.icon-button.is-on svg circle { fill: currentColor; }
.icon-button.held { color: var(--ice); background: var(--ice-soft); }

.clock {
    display: grid;
    justify-items: start;
    min-width: 0;
    line-height: 1;
}

.frame {
    font-family: var(--pixel);
    font-size: 22px;
    letter-spacing: 0.02em;
    color: var(--ink);
    white-space: nowrap;
}

.time {
    margin-top: 4px;
    font-family: var(--pixel);
    font-size: 10px;
    color: var(--muted);
    white-space: nowrap;
}

.speeds {
    display: flex;
    padding: 2px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
}

.speeds button {
    min-width: 24px;
    height: 22px;
    padding: 0 6px;
    border-radius: 999px;
    color: var(--muted);
    font-size: 11.5px;
    transition: background-color 220ms var(--snap), color 220ms var(--snap);
}

.speeds button[aria-pressed="true"] {
    background: var(--card);
    color: var(--ink);
    box-shadow: 0 1px 2px rgba(29, 34, 48, 0.12), inset 0 0 0 1px var(--hair);
}

.tape-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 0 10px 10px 10px;
}

.tape {
    position: relative;
    height: 30px;
    border-radius: 9px;
    background:
        repeating-linear-gradient(90deg, transparent 0 7px, var(--hair) 7px 8px) 0 100% / 100% 6px no-repeat,
        var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    cursor: ew-resize;
    touch-action: none;
    overflow: hidden;
}

.tape[aria-disabled="true"] { cursor: default; }

.tape .recorded {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--violet-soft);
    transform-origin: 0 50%;
}

.tape .key {
    position: absolute;
    top: 7px;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background: var(--violet);
    opacity: 0.55;
    transform: rotate(45deg);
}

.tape .input-mark {
    position: absolute;
    bottom: 3px;
    width: 3px;
    height: 3px;
    margin-left: -1.5px;
    border-radius: 999px;
    background: var(--event);
}

.tape .playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--violet);
    transition: transform 140ms var(--snap);
}

.tape .playhead::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -4px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--violet);
    box-shadow: 0 0 0 2px var(--card);
}

.tape-span {
    font-family: var(--pixel);
    font-size: 10px;
    color: var(--faint);
    white-space: nowrap;
}

.tabs {
    position: relative;
    display: flex;
    gap: 2px;
    padding: 0 8px;
    border-bottom: 1px solid var(--hair);
}

.tabs button {
    position: relative;
    padding: 8px 8px 9px;
    color: var(--muted);
    transition: color 200ms var(--snap);
}

.tabs button[aria-selected="true"] { color: var(--ink); }

.tabs .indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--violet);
    transition: transform 420ms var(--spring), width 420ms var(--spring);
}

.body {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
}

.toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 10px;
    background: var(--card);
    border-bottom: 1px solid var(--hair);
}

.field {
    flex: 1 1 120px;
    min-width: 0;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    outline-offset: 0;
}

.field::placeholder { color: var(--faint); }

select.field { flex: 0 1 auto; padding-right: 6px; }

.pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--hair);
    color: var(--ink);
    white-space: nowrap;
    transition: transform 240ms var(--spring), background-color 200ms var(--snap);
}

.pill:hover { background: var(--card-raised); }
.pill:active { transform: scale(0.96); }
.pill.strong { background: var(--violet); color: #fff; box-shadow: none; }
.pill[disabled] { opacity: 0.4; pointer-events: none; }

.rows { list-style: none; margin: 0; padding: 4px 0; }

.row {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) minmax(0, 1.1fr) auto;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    padding: 2px 8px 2px 12px;
}

.row + .row { box-shadow: inset 0 1px 0 var(--hair); }
.row:hover { background: var(--card-raised); }

.marker { width: 8px; height: 8px; border-radius: 3px; background: var(--data); }
.marker.list { background: var(--list); border-radius: 1px; }

.name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.owner { color: var(--faint); margin-left: 4px; }

.value {
    min-width: 0;
    height: 24px;
    padding: 0 8px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background-color 200ms var(--snap);
}

.value:hover, .value:focus { background: var(--paper); }
.value.held { color: var(--ice); background: var(--ice-soft); }
.value.list { color: var(--muted); text-align: right; }

.actions { display: flex; gap: 2px; }

.items { margin: 0 8px 6px 28px; padding: 4px; border-radius: 10px; background: var(--paper); }
.item { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 6px; min-height: 26px; }
.item .index { color: var(--faint); text-align: right; font-size: 11px; }
.item .value { text-align: left; }

.note { padding: 12px 14px; color: var(--muted); }
.note strong { color: var(--ink); font-weight: 600; }
.error { color: var(--live); }

.counter { margin-left: auto; align-self: center; color: var(--muted); }

.launcher {
    position: fixed;
    z-index: 2147483000;
    right: 18px;
    bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    padding: 0 14px 0 6px;
    border-radius: 999px;
    background: var(--card);
    box-shadow: var(--shadow);
    outline: 1px solid var(--hair);
    color: var(--ink);
    transition: transform 300ms var(--spring);
}

.launcher:hover { transform: translateY(-1px); }
.launcher .badge { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 999px; background: var(--violet); color: #fff; }
.launcher .frame { font-size: 14px; }

.resize {
    position: absolute;
    right: 2px;
    bottom: 2px;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
    touch-action: none;
}

@media (prefers-reduced-motion: reduce) {
    *, .shell { animation: none !important; transition: none !important; }
}
`;
