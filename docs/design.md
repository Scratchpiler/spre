# SPRE design

What SPRE does is in the [README](../README.md). This file is about why. Code comments stay minimal, so the reasoning lives here.

## Wrap, don't fork

The npm `dist` build of scratch-vm hides `Timer`, `Thread`, `execute` and friends inside webpack closures, and so does the copy bundled into scratch.mit.edu. A fork could patch them directly, but it could never attach to the site's own VM, and it would leave us carrying an AGPL fork. So SPRE only touches what an instance exposes:

- `runtime._primitives`: every block function gets wrapped, and some are replaced.
- `runtime.sequencer.timer.nowObj`: the frame work budget.
- `runtime.sequencer.stepThread`, as an instance property: one unit of work per thread step, so no loop can spin without charging the clock.
- `runtime.updateCurrentMSecs`, as an instance property: the frame clock.
- Classes reached through instances (`internals.js`): `Timer` from the sequencer's timer, `Thread` and `StackFrame` from a probe thread pushed and immediately removed, `Variable` from any variable.

Execution caches hold the block functions they first saw, so wrapping (and `detach`) resets every block container's cache. Extensions loaded later are wrapped on `EXTENSION_ADDED`.

## Time

There is one virtual clock (`clock.js`):

```
now = epoch + frameStart + ops × opCostMs
```

`ops` counts executed primitives and thread steps since the frame began. Everything that reads time is pointed at that clock:

| Reader | Sees |
|---|---|
| `runtime.currentMSecs` (project timer, `wait`, `timer >` hat) | `epoch + frameStart`, set once per frame like the stock `Date.now()` call |
| sequencer budget (75% of a frame) | `now`, so non-drawing loops get `0.75 × frameMs / opCostMs` blocks per frame |
| warp timers (500 ms), glide timers, anything using `new Timer()` | `now`, through `VirtualDate` (Timer's default clock is the global `Date` it finds at construction) |
| `Date`, `performance.now` inside a frame | `now` |

The next frame starts at `frameStart + max(frameMs, work)`. A frame that spends 500 ms in a warp loop delays the next one, exactly as a browser's `setInterval` would. Leaving that out would make the project timer drift away from the work done.

Counting blocks instead of measuring CPU is the whole point: on a fast or slow machine, in Node or a browser, a warp loop gets exactly the same number of iterations per frame. `opCostMs` is the knob for "how fast is the imaginary computer". The default (1 µs per block) is a modest machine.

## Globals, only during frames

`Math.random`, `Date`, `performance.now` and the `setTimeout` family are swapped by `scope.js` only around the synchronous work of a frame: timers, waits, inputs and `runtime._step()`. Between frames the real globals are back, so the host process, test runner or web page is untouched. The swap is restored in a `finally`, so a throwing block can't leak it.

Timers set up inside a frame go into a virtual queue that fires at frame start, in `(due, sequence)` order. They hold closures, so strict snapshots refuse to save while any are pending.

## Randomness

Streams are per consumer, not per call site, so that spoofing one thing can't silently shift another. In particular, forcing a pick-random doesn't change where a `go to random position` lands. Only the opcodes that actually draw randomness (`RANDOM_STREAMS` in `primitives.js`) switch the active stream. Every other primitive gets the cheapest wrapper, a counter increment. Both routes are deterministic. The split exists for speed (see [Performance](#performance)).

Clone ids come from `uid()`, which reads `Math.random` 20 times. They draw from the `control` stream, so clone ids are deterministic and appear in hashes.

Forced pick results skip the stock block entirely, so they consume no draws: forcing three picks leaves the rest of the sequence where it was.

## Waits instead of promises

A stock block that returns a promise parks its thread in `PROMISE_WAIT`, and a closure inside `execute.js` resumes it on a microtask. A closure can't be saved, and a microtask doesn't run inside a synchronous `step(n)` loop. So for the core blocks that do this, SPRE returns an inert thenable and records a **wait** instead:

| Kind | From | Resolves |
|---|---|---|
| `bubble` | say/think for secs | at `now + 1000 × SECS` (setTimeout's clamping: NaN/negative → 0, over 2³¹−1 → 1), clearing the bubble if its usage id is unchanged, like the stock timeout |
| `sound` | play sound until done | after `sampleCount / rate / 2^(pitch/120)` seconds, or at the next frame if the same sound restarts or sounds are stopped |
| `question` | ask and wait | when an `answer` input arrives |
| `speech` | text to speech `speak and wait` | at `now + speechMs`; the stock block fetches audio from a server and waits for a player's `stop` event, neither of which can be reproduced |
| `tick` | sound effect/volume blocks, which return `Promise.resolve()` "to yield until the next tick" | at the next frame boundary |

Resolution happens at frame start, in `(due, sequence)` order, and resumes the thread with a copy of the stock continuation (`resume` in `waits.js` mirrors `handlePromise`). That's where the browser would resume it too: microtasks run after `_step` returns and before the next frame. Since live and restored runs use the same continuation, restore-and-replay can't diverge from the uninterrupted run.

`translate_getTranslate` is not a wait: the stock block returns a fetch promise, so SPRE answers synchronously from the `translate` option instead.

The music extension's constructor decodes its sample set at load and rejects with `No Audio Context Detected` when the runtime has no audio engine, which crashes Node with an unhandled rejection. `createVM` therefore gives the runtime an engine whose decodes never finish for the duration of `installTargets` (the only time extension constructors run during a load) and takes it away again. Sprites and sounds are already built by then, so the sound blocks still see no engine. The sample players stay undefined, which the note and drum blocks already treat as "not loaded".

The question queue reimplements the stock sensing block's (prompt via bubble for visible sprites, answer clears it, next question shown, cleared on stop/stop-for-target). The stock instance can't be reached, since primitives are bound functions.

## The null renderer

Without a renderer, scratch-vm skips `requestRedraw()` in `setXY`, `setSize`, `show` and friends, so a non-warp `forever { move 1 }` never yields and runs a whole frame's budget at once. That's deterministic but nothing like the browser, which is why the Node harness attaches `null-renderer.js`.

- The draw list and layer groups are a port of scratch-render's (`createDrawable`, `setDrawableOrder`, `destroyDrawable`).
- Drawable transforms are ported with `Float32Array` storage, as in the WebGL matrices, so `getFencedPositionOfDrawable` gives the same integer as scratch-render. Scratch-render fences with the skin quad's AABB, never the pixel hull, which makes this exact.
- Skin geometry: SVG skins are the viewBox, with the rotation centre shifted by the viewBox origin; bitmap skins are pixels ÷ `bitmapResolution`. That matches `SVGSkin.setSVG`, `BitmapSkin.setBitmap` and `load-costume.js`. `loadProject` reads the sizes from the sb3's own asset headers, so there's no image decoding and no storage module.
- `getBounds` returns that same AABB. Scratch-render would return the tight hull of opaque pixels, so edge bounce and touching-edge are approximate for costumes with transparent margins.
- Everything pixel-based (`touching`, colours, `pick`) answers "no". The renderer interface is the seam where a CPU silhouette renderer will go.

The renderer saves and restores its own state (drawables, skins, draw list, id counters), and targets save their `drawableID`. A restored world therefore keeps the same drawable ids as the uninterrupted run, which keeps the speech bubble drawable ids in custom state, and the hashes, identical.

## Display compositing

The stage the browser shows is composited on the CPU by `src/render/display-renderer.js` into a persistent frame buffer, split into 64 px tiles. A tile is repainted only when its signature changes. The signature is the background plus the ordered ids of every layer whose pixel box touches the tile; a layer's id interns its raster key, matrix, effects, uniforms, skin size and bounds, so any visible change to a layer changes the tiles it covers, and nothing else does. Pen patches force the tiles under the patched rectangle, because a layer's signature doesn't see its own pixels change. `render()` returns the shared buffer plus `dirty` rectangles, so the stage view uploads only those to the canvas and skips the frame when nothing changed.

Dirty tiles are the unit of parallel work. `pool.compositeRegions` assigns them to workers by how many layers touch each one, sends each worker one message holding only the layers it needs, and gets back one packed buffer. Pixels depend only on the scene, never on the tile grid, the region or the thread count: source coordinates are computed per pixel (or per column and row for unrotated layers) instead of accumulated from the region's first column.

The scene channel sends pen changes as 16 px blocks that actually differ from what the client already has, not as the rectangle the pen touched. A project that clears and redraws the pen every frame while changing 1% of the pixels sends and repaints about 1%.

A full-stage layer that changes every frame, like a fade, still repaints everything.

## Snapshots

Snapshots are only taken between frames. Mid-frame there's an active thread half-way through `execute`, with state on the JS stack.

Keys: originals are `stage` / `sprite:<name>` because their ids are random per load. Clones keep their real ids, which are deterministic. Monitor ids embed original target ids, so those are rewritten to `@sprite:<name>` and back.

Block ids have the same problem in a narrower place. sb3 stores literals and inline variable/list reporters as compact arrays without ids, and `deserializeInputDesc` gives each one a fresh `uid()` at load, before SPRE has seeded anything. Every other block keeps the id saved in the project. Those generated ids reach a snapshot through thread stacks and, mostly, `frame.reported[].opCached` (the half-evaluated inputs of a block waiting on a promise). `block-ids.js` names such a block by where it sits, `$["parentId","INPUT"]` (with `"shadow"` for an obscured shadow), and resolves the name back through the parent's input on restore. It only rewrites primitive opcodes with a parent, so ordinary ids stay readable, and it needs no table: both directions are one lookup. An id that really starts with `$` is escaped as `$"…"`. The format bumped `SNAPSHOT_VERSION` to 2; version 1 snapshots still load, since their ids pass through unchanged.

Encoding (`encode.js`) is tagged JSON: `{"$spre": "NaN"}` and so on for values JSON can't hold, plus `timer`, `thread`, `target` and `variable` references inside block state. `broadcast and wait` keeps the started threads and the broadcast variable in its stack frame, so those need references. Timers record their start and which clock they read (`clock` or `frame`). An unknown class is a strict-mode error naming the path.

Things deliberately left out:

- `StackFrame.reporting` when `reported` is null. Pooled frames keep stale values there that are never read, and including them would make identical worlds hash differently.
- Monitor values. They're recomputed every frame, and they're output only.
- Glow flags are included: they're cheap and deterministic.

Restore order matters. Variables are rebuilt before any value is decoded, so variable references resolve. Threads are created before their frames are decoded, so thread references resolve. The renderer is loaded wholesale instead of being driven through `updateAllDrawableProperties`. That is also why clones are rebuilt with `sprite.createClone()` and never `initDrawable()`: the latter would start "when I start as a clone" scripts.

## Performance

The primitive wrapper runs on every block, so it's the one hot path SPRE adds. Profiling the 2D Physics Engine (about 6 M blocks/s here) showed the first version, which switched the RNG stream around every primitive in a `try/finally`, at 13% self time. With stream switching limited to `RANDOM_STREAMS` and a bare `work.ops++` wrapper for the rest, V8 inlines the wrapper into `execute`, and SPRE's remaining cost is about 2% (the `stepThread` hook). Other choices made for speed:

- The input schedule is a sorted array with a cursor and binary insertion: no re-sort per event, no slicing per frame.
- Snapshot capture computes the set of SPRE-controlled waiters once, not once per thread, and canonicalises monitor ids with one regex.
- The fence computation reuses one bounds object.

What did not matter, measured on the 2D Physics Engine's heavy frames (about 520 k blocks per frame): V8 flags (`--max-inlined-bytecode-size-cumulative`, `--no-maglev`, `--always-sparkplug`, a larger semi-space) were within noise, and removing the SPRE primitive wrapper entirely was too. The cost is scratch-vm's dispatch, which is what [fast execution](#fast-execution) removes. Benchmark by timing a fixed frame range after warm-up (`step(150)`, then time `step(40)`), several runs alternating the two variants: single runs on a shared box vary by 5-10%, which is as large as most micro-optimisations here.

On Paper Minecraft (383 monitors, 748 costumes, 7 clones) a snapshot takes about 3 ms to capture and 8 ms to restore.

## Fast execution

scratch-vm's interpreter spends most of its time on dispatch, not on blocks: `execute` loops over a block's flattened operation list, calls each primitive through one megamorphic call site, and stores each result into its parent's argument object through one megamorphic keyed store. `src/fastexec.js` replaces `sequencer.stepThread` with a copy of the stock one that calls its own `execute`, a copy of scratch-vm's with its `BlockCached` and `BlockUtility`, so nothing in the bundle's private modules is touched. After a block has run four times, its operation list is compiled with `new Function` into straight-line code:

- every primitive is a monomorphic call to a constant function, and every result goes to its parent through a store with a constant key. `work.ops++` is inlined and the SPRE wrapper skipped, for primitives that don't switch RNG streams;
- the hottest opcodes are emitted inline instead of called: arithmetic, comparisons, `and`/`or`/`not`, `mod`, `round`, `if`, `if/else`, `repeat`, `forever`, variable get/set/change, list item/replace/length, procedure arguments and procedure calls. Static shadow operands are folded to numbers at compile time;
- anything unusual falls back to the stock primitive: non-number comparisons and list indices, cloud variables, NaN. A fallback calls the counted wrapper, so `work.ops` is charged exactly once either way.

Variable and list lookups are cached on the field object (`cacheTarget`, `cacheOwner`, `cacheVariable`) and revalidated on every use: the owner's dictionary must still map the id to the same variable, and for a global read from a sprite the sprite's own dictionary must still lack it. That makes deleting a variable, replacing one on snapshot restore or shadowing a global behave exactly like the stock two-step lookup, with no invalidation hooks.

Procedure calls cache the parameter names, definition id and warp flag per call site. Both live as long as the block cache, which scratch-vm resets on any edit.

Promises (extension blocks that SPRE doesn't turn into waits) leave the compiled code through the same `frame.reported` bookkeeping as stock, so snapshots taken mid-wait have the same shape. A thread whose frame is resuming from a promise, a running profiler, or a failed `new Function` (a page CSP) uses the generic path, which is a line-for-line copy of the stock loop.

The contract is bit-identity: `tests/fastexec.test.js` runs a procedure/operator/list/clone world, a promise-heavy world and the 2D Physics Engine with `fastExecute` on and off and compares the state hash every few frames. On the 2D Physics Engine (about 520 k blocks per frame once it warms up) a frame went from about 80 ms to 45 ms; the Linux-on-Scratch project is 1.85x faster.

## Movies

A movie has to rebuild the whole session, not just list inputs. Three things made the old `{ seed, fps, events }` drift:

- Settings: the epoch, time zone and block cost change what `current year`, `days since 2000` and every warp loop do, so the movie records all the settings attach started with, plus the renderer kind.
- Branches: a timeline seek or savestate load used to keep the current log up to the snapshot's frame, which is wrong when the snapshot came from another branch. Snapshots now carry `history: { origin, log }`, and `restore` swaps in the snapshot's log. `origin` names where the session started: `load:` plus a hash of the project fingerprint and settings for a fresh load, or `snapshot:` plus the hash of the starting snapshot. A snapshot whose origin is not this session's becomes the new start, with an empty log. `hash()` leaves `history` out, so identical worlds reached by different routes still hash equal.
- Changes outside the input queue: `clock.configure` and `rng.reseed` / `force` / `queue` are logged as `clock` and `rng` events and applied at once, between frames. On replay they apply at the start of that frame, after due timers and waits resolve. Neither of those reads the RNG or depends on fps or block cost, so the order makes no difference. Callbacks (`onPick`, `override`) can't be serialised and are listed in `unrecorded`.

`attach` defaults to `origin: 'snapshot'` and captures the world on attach (non-strict), because a VM attached mid-run has a state no fresh load reproduces. `loadProject` passes `origin: 'load'`.

## Probes

`ctx.probes.current` is either `null` or an object with `step(thread)` and `block(thread, blockId, run)`. The fast `stepThread` reads it once per thread step: with no probe it calls `execute` as before (one null check per statement), otherwise it calls `probe.block(thread, blockId, execute)` and the probe must call `run(thread)` exactly once. The stock path calls `block(thread, null, run)` around the whole prototype `stepThread`, so stock-mode probes see threads, not statements. `withProbe` composes with a probe that is already attached (the profiler), wrapping it rather than replacing it. Probes may read anything but must not change state; both the profiler and the diff blame only read.

Frame hooks (`ctx.frameHooks`) are called after each frame with the frame number and its op count.

## Profiler

Every op the clock charges is attributed, so `totalOps` equals the sum of `frameOps` and the root's `self` is normally 0. The probe measures `work.ops` before and after each statement, which includes the statement's reporters, so a block's `self` is its full cost and nothing is sampled.

The tree is sprite, script (keyed by top block, so clones share their sprite's nodes), procedure call (keyed by proccode under its caller, so call sites in one script merge), block. Finding the procedure path means walking `thread.stack` for `procedures_call` entries, which was 3.5x the run time on the Linux emulator when done per statement. Each thread now caches its last stack and the node reached at each depth (`thread[PATH]`), and only walks the part of the stack that changed; nodes keep children in one `Map` keyed by block id or `call\0proccode`. That brought the cost to about 1.5x. A `procedures_call` statement charges its procedure's node, and the `procedures_definition` hat charges its caller, so a procedure shows once in the tree.

Per frame the probe also adds each charge to a dense `frameSelf` array and remembers which node ids it touched; the frame hook turns that into a sparse `[id, ops, …]` record, resets the touched slots, and counts live threads per script (with the block the first one is on). Records go into a bounded history, which feeds the thread graph's lanes (node ops summed by each node's `script` id) and range reports (`aggregateFrames`, which lives in `profile-view.js` so the HTML report can run it without a server). That kept the profiler at about 1.5x.

The frame budget is `0.75 * frameMs / opCostMs` blocks, the sequencer's 75% work time expressed in ops. A frame at or over it is one where the sequencer ran out of time; in turbo or warp-heavy projects that is most of them.

## Diff

`diffRuns` steps both worlds `every` frames at a time and compares fingerprints: `spre.hash()` in world mode, or a hash of `observe()` in state mode. After each agreeing chunk it snapshots both (non-strict); on a mismatch it restores the last agreeing snapshots and steps one frame at a time, so finding frame N costs at most N + `every` frames and one snapshot per chunk. If a snapshot has problems (an uncontrolled promise), it falls back to comparing every frame without rewinding, and skips blame.

Blame replays the diverging frame on each side with a probe that, around every statement, reads each differing value (a variable, a sprite property, or the one list item that differs) and logs a write whenever it changed. Each difference's writes are then aligned by index between A and B; the first index where the values disagree is that difference's mismatch. To pick one origin across all differences, both sides' writes are merged in execution order and the two streams are walked together: the first point where they disagree names the origin, and if one side has an extra write (the other side's next write matches) the extra write wins. Comparing statement counters across sides would be wrong, since different code paths run different numbers of statements. Labels and call paths are rendered only for the writes that are reported.

Observations key clones by sprite and creation order rather than id, since clone ids differ between two different projects even when they behave the same.

## Testing

`npm test` runs against the real headless scratch-vm. `tests/helpers.js` builds sb3 zips from a small block DSL, with real SVG assets so costume geometry is exercised. The checks that matter most:

- `restore then replay reproduces the uninterrupted run at every point`: one busy project (glides to random spots, say-for-secs, play-until-done, ask, clones, broadcast-and-wait, NaN/±Infinity/-0 values) is snapshotted at eight frames, and each snapshot is restored and replayed to the same final hash.
- A snapshot restored into a freshly loaded VM in the same process gives the same hash as the live run.
- A recorded movie replays to the same hash.
- `tests/real-projects.test.js` loads the projects in `../test-projects` twice, checks the hashes agree, and checks restore+replay. It skips when they're absent.
