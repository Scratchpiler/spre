import { createDisplayRenderer } from '../render/display-renderer.js';

const NATIVE_WIDTH = 480;
const NATIVE_HEIGHT = 360;

const KEY_NAMES = { ' ': 'space', ArrowLeft: 'left arrow', ArrowRight: 'right arrow', ArrowUp: 'up arrow', ArrowDown: 'down arrow', Enter: 'enter' };

const isEditable = node => node instanceof Element
    && (node.isContentEditable || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT');

const scratchKey = event => {
    if (KEY_NAMES[event.key]) return KEY_NAMES[event.key];
    return event.key.length === 1 ? event.key : null;
};

function drawBubble(ctx, bubble, scale) {
    const x = (bubble.x + (NATIVE_WIDTH / 2)) * scale;
    const y = ((NATIVE_HEIGHT / 2) - bubble.y) * scale;
    const width = bubble.width * scale;
    const height = (bubble.height - 12) * scale;
    const radius = 16 * scale;
    ctx.save();
    ctx.translate(x + (2 * scale), y + (2 * scale));
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(width - (4 * scale), 0, width - (4 * scale), height, radius);
    ctx.arcTo(width - (4 * scale), height, 0, height, radius);
    ctx.arcTo(0, height, 0, 0, radius);
    ctx.arcTo(0, 0, width, 0, radius);
    ctx.closePath();
    const tailX = bubble.pointsLeft ? 24 * scale : width - (40 * scale);
    if (bubble.type === 'say') {
        ctx.moveTo(tailX, height);
        ctx.lineTo(tailX + (8 * scale), height + (10 * scale));
        ctx.lineTo(tailX + (16 * scale), height);
    } else {
        ctx.moveTo(tailX + (8 * scale) + (4 * scale), height + (7 * scale));
        ctx.arc(tailX + (8 * scale), height + (7 * scale), 4 * scale, 0, Math.PI * 2);
    }
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 4 * scale;
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = '#575E75';
    ctx.font = `${14 * scale}px "Helvetica Neue", Helvetica, sans-serif`;
    ctx.textBaseline = 'top';
    String(bubble.text).split('\n').forEach((line, i) => ctx.fillText(line, 10 * scale, (10 + (16 * i)) * scale, width - (20 * scale)));
    ctx.restore();
}

function bubbleRect(bubble, scale, frame) {
    const margin = 8 * scale;
    const left = Math.max(0, Math.floor(((bubble.x + (NATIVE_WIDTH / 2)) * scale) - margin));
    const top = Math.max(0, Math.floor((((NATIVE_HEIGHT / 2) - bubble.y) * scale) - margin));
    const right = Math.min(frame.width, Math.ceil(((bubble.x + (NATIVE_WIDTH / 2) + bubble.width) * scale) + margin));
    const bottom = Math.min(frame.height, Math.ceil((((NATIVE_HEIGHT / 2) - bubble.y + bubble.height) * scale) + margin));
    return { x: left, y: top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}

export function createStageView({ client, pool, canvas, interactive = true, keyboardTarget = canvas }) {
    const display = createDisplayRenderer({ pool });
    const ctx = canvas.getContext('2d');
    let dirty = false;
    let rendering = false;
    let frameRequest = null;
    let lastFrame = null;
    let image = null;
    let drawnBubbles = [];
    let drawnSignature = '';
    const cleanups = [];

    const sizeCanvas = () => {
        const ratio = globalThis.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(NATIVE_WIDTH, Math.round(rect.width * ratio));
        const height = Math.round(width * NATIVE_HEIGHT / NATIVE_WIDTH);
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            dirty = true;
        }
    };

    const presentFrame = frame => {
        const scale = canvas.width / NATIVE_WIDTH;
        const bubbles = display.bubbles;
        const signature = JSON.stringify(bubbles);
        if (!frame.dirty.length && signature === drawnSignature) return;
        if (image?.data !== frame.data) image = new ImageData(frame.data, frame.width, frame.height);
        for (const rect of [...frame.dirty, ...drawnBubbles]) {
            ctx.putImageData(image, 0, 0, rect.x, rect.y, rect.width, rect.height);
        }
        drawnBubbles = bubbles.map(bubble => bubbleRect(bubble, scale, frame));
        for (const bubble of bubbles) drawBubble(ctx, bubble, scale);
        drawnSignature = signature;
    };

    const paint = async () => {
        frameRequest = null;
        if (rendering || !dirty) return;
        rendering = true;
        dirty = false;
        try {
            sizeCanvas();
            const frame = await display.render({ width: canvas.width, height: canvas.height });
            lastFrame = frame;
            presentFrame(frame);
        } finally {
            rendering = false;
        }
        if (display.busy) display.settle().then(() => invalidate());
        if (dirty) invalidate();
    };

    const invalidate = () => {
        dirty = true;
        if (frameRequest === null) frameRequest = requestAnimationFrame(paint);
    };

    cleanups.push(client.on('frame', message => {
        display.apply(message.scene);
        invalidate();
    }));

    const toScratch = event => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: ((event.clientX - rect.left) / rect.width * NATIVE_WIDTH) - (NATIVE_WIDTH / 2),
            y: (NATIVE_HEIGHT / 2) - ((event.clientY - rect.top) / rect.height * NATIVE_HEIGHT),
        };
    };

    const listen = (target, type, handler, options) => {
        target.addEventListener(type, handler, options);
        cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    if (interactive) {
        listen(canvas, 'pointermove', event => client.input({ type: 'mouse', ...toScratch(event) }));
        listen(canvas, 'pointerdown', event => {
            canvas.setPointerCapture?.(event.pointerId);
            keyboardTarget.focus?.({ preventScroll: true });
            client.input({ type: 'mouse', ...toScratch(event), down: true });
        });
        listen(canvas, 'pointerup', event => client.input({ type: 'mouse', ...toScratch(event), down: false }));
        listen(canvas, 'wheel', event => {
            event.preventDefault();
            client.input({ type: 'wheel', deltaY: event.deltaY });
        }, { passive: false });
        const pressed = new Set();
        const onKey = down => event => {
            const key = scratchKey(event);
            if (!key || event.repeat) return;
            if (down) {
                if (isEditable(event.composedPath?.()[0] ?? event.target)) return;
                pressed.add(key);
            } else if (!pressed.delete(key)) {
                return;
            }
            event.preventDefault();
            client.input({ type: 'key', key, down });
        };
        listen(keyboardTarget, 'keydown', onKey(true));
        listen(keyboardTarget, 'keyup', onKey(false));
        listen(globalThis, 'blur', () => {
            for (const key of pressed) client.input({ type: 'key', key, down: false });
            pressed.clear();
        });
    }

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => invalidate());
    resizeObserver?.observe(canvas);

    return {
        display,
        get lastFrame() {
            return lastFrame;
        },
        invalidate,
        dispose() {
            for (const cleanup of cleanups) cleanup();
            resizeObserver?.disconnect();
        },
    };
}
