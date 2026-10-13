import { readFile } from 'node:fs/promises';

const escapeHTML = text => String(text).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const scriptSafe = text => text.replace(/<\/(script)/gi, '<\\/$1').replace(/<!--/g, '<\\!--');
const jsonSafe = value => JSON.stringify(value).replace(/</g, '\\u003c');
const group = n => Math.round(n).toLocaleString('en-US');

const PAGE_CSS = `
:root {
    --paper: #eef0f4;
    --card: #ffffff;
    --card-raised: #f7f8fa;
    --ink: #1d2230;
    --muted: #6b7286;
    --faint: #9aa1b2;
    --hair: rgba(29, 34, 48, 0.08);
    --hair-strong: rgba(29, 34, 48, 0.14);
    --accent: #007aff;
    --live: #e5484d;
    --shell: rgba(29, 34, 48, 0.05);
    --spring: cubic-bezier(0.32, 0.72, 0, 1);
    --snap: cubic-bezier(0.2, 0.9, 0.1, 1);
    --ui: ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", "Noto Sans", sans-serif;
    color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
    :root {
        --paper: #16181e;
        --card: #1f222a;
        --card-raised: #252933;
        --ink: #e9ebf1;
        --muted: #9097a8;
        --faint: #6c7387;
        --hair: rgba(233, 235, 241, 0.08);
        --hair-strong: rgba(233, 235, 241, 0.14);
        --accent: #0a84ff;
        --shell: rgba(233, 235, 241, 0.05);
    }
}
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100dvh; background: var(--paper); color: var(--ink); font: 400 14px/1.5 var(--ui); }
main { width: min(1280px, 100% - 32px); margin: 0 auto; padding: 40px 0 56px; }
header { display: grid; gap: 6px; margin-bottom: 22px; }
h1 { margin: 0; font-size: clamp(22px, 3.4vw, 32px); font-weight: 650; letter-spacing: -0.018em; line-height: 1.15; overflow-wrap: anywhere; }
header p { margin: 0; color: var(--muted); max-width: 72ch; }
.shell { padding: 6px; border-radius: 22px; background: var(--shell); outline: 1px solid var(--hair); outline-offset: -1px; box-shadow: 0 40px 80px -52px rgba(29, 34, 48, 0.5); }
.core { border-radius: 16px; background: var(--card); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 0 0 1px var(--hair); }
.core > .pv { padding: 16px; gap: 14px; }
footer { margin-top: 18px; color: var(--muted); font-size: 13px; max-width: 72ch; }
kbd { font: inherit; padding: 0 5px; border-radius: 5px; background: var(--card); box-shadow: inset 0 0 0 1px var(--hair); }
@media (max-width: 640px) { main { padding-top: 24px; } .core > .pv { padding: 10px; } }
`;

export async function profileReportHTML(profile, { title = profile.project ?? 'SPRE profile' } = {}) {
    const viewSource = await readFile(new URL('./display/profile-view.js', import.meta.url), 'utf8');
    const summary = `${group(profile.frames)} frames from frame ${group(profile.firstFrame)} at ${Math.round(profile.fps)} fps, measured in blocks run.`
        + ` One block costs ${profile.opCostMs} virtual ms, so a frame's budget is ${group(profile.budgetOps)} blocks.`;
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHTML(title)} profile</title>
<style>${PAGE_CSS}</style>
</head>
<body>
<main>
    <header>
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(summary)}</p>
    </header>
    <div class="shell"><div class="core" data-view></div></div>
    <footer>Each bar is as wide as the blocks it ran, including everything it called, and takes the colour of its Scratch category. Click a bar to zoom in and click it again to zoom out. Hover a hot block to find it in the graph.</footer>
</main>
<script type="application/json" id="spre-profile">${jsonSafe(profile)}</script>
<script type="text/plain" id="spre-view">${scriptSafe(viewSource)}</script>
<script type="module">
const source = document.getElementById('spre-view').textContent;
const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
const { createProfileView, PROFILE_CSS } = await import(url);
const style = document.createElement('style');
style.textContent = PROFILE_CSS;
document.head.append(style);
const view = createProfileView({ flameMaxHeight: 640 });
document.querySelector('[data-view]').append(view.element);
view.render(JSON.parse(document.getElementById('spre-profile').textContent));
</script>
</body>
</html>
`;
}
