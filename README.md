# SPRE

**S**cratchpiler **R**untime **E**nvironment: a deterministic harness around scratch-vm.

Scratch projects are pretty deterministic as long as you ignore the clock, the random number generator, the keyboard, the mouse, the microphone, the speed of your computer and when the browser feels like firing a timer. SPRE takes all of those away. Same project, same seed, same inputs: same world, bit for bit, every time, on every machine. You can save the entire world mid-glide, mid-question or mid-`broadcast and wait`, load it into a different process and carry on as if nothing happened.

SPRE wraps a live VM; it does not fork it. It patches what it can reach from the instance (block primitives, the sequencer's timer, the runtime's millisecond clock) and swaps `Math.random`, `Date`, `performance.now` and the timer functions only for the duration of each frame, so it works with the scratch-vm from npm and should work with the one bundled into scratch.mit.edu. The Node harness comes first. A browser adapter is planned.

## Quick start

```sh
npm install
npm test
node bin/spre.js "../test-projects/2D Physics Engine.sb3" --frames 300 --seed 42
```

```js
import { loadProject } from 'spre/node';

const { vm, spre } = await loadProject('game.sb3', { seed: 'speedrun', fps: 30 });
spre.greenFlag();
spre.input.at(30, { type: 'key', key: 'space', down: true });
spre.input.at(32, { type: 'key', key: 'space', down: false });
spre.step(60);

const save = spre.snapshot();          // plain JSON
spre.step(600);
const ending = spre.hash();

spre.restore(save);                     // back to frame 60
spre.step(600);
spre.hash() === ending;                 // true
```

`attach(vm, options)` from `spre` does the same for a VM you built yourself. `loadProject` also attaches the [null renderer](#rendering) and reads costume sizes from the sb3, which you want headless. See [Fidelity](#fidelity).

### Building the browser bundles

The display app and the userscript are built from `src/` with esbuild. Nothing generated is checked in: `dist/` is ignored.

```sh
npm run build        # dist/spre.user.js and dist/app.js, minified
npm run build:dev    # readable, with inline source maps
npm run watch        # build:dev again on every change under src/
```

CI (`.github/workflows/ci.yml`) runs `npm test` and `npm run build` on Node 22, 24 and 26 for every push to `main` and every pull request, and attaches the built `dist/` to the Node 26 run as an artifact. The tests on `../test-projects` skip themselves there, since those projects aren't in the repo.

`spre serve` builds both bundles when it starts and also serves the userscript at `/spre.user.js`, so a userscript manager can install it straight from the running server.

## Options

| Option | Default | Meaning |
|---|---|---|
| `seed` | `0` | Seed for every RNG stream (any string or number). |
| `fps` | `30` | 30 is what scratch.mit.edu runs at (the VM's compatibility mode); 60 is the VM's other mode. |
| `epoch` | `2025-01-01T00:00:00Z` | Virtual wall-clock time at frame 0. |
| `utcOffsetMinutes` | `0` | The fixed time zone that `current hour` and the like report. |
| `opCostMs` | `0.001` | Virtual milliseconds one block costs. This sets how much a non-drawing loop, a warp ("run without screen refresh") procedure or turbo mode gets through per frame. |
| `fastExecute` | `true` | Run hot block stacks as compiled JavaScript (see [docs/design.md](docs/design.md#fast-execution)). Hashes, virtual time and snapshots are identical either way; `false` runs the stock interpreter. |
| `answers` | `null` | Answers for `ask and wait`: an array used in order, or `({ question, sprite, frame }) => string \| undefined`. |
| `translate` | `null` | Stands in for the Translate extension's server: `({ words, language }) => string`. By default the words come back unchanged. Digits-only text is never translated, as in the extension. |
| `speechMs` | `null` | How long `speak … and wait` lasts: `({ words, voice, sprite }) => ms`. By default `max(250, 60 × characters)`. |

`loadProject(source, options)` also takes `quiet` (default `true`, mutes scratch-vm's logging) and `renderer` (`'null'`, a renderer object, or `false`).

## API

| | |
|---|---|
| `spre.step(n = 1)` | Run `n` frames synchronously. Returns the frame number. |
| `spre.run({ frames, until, idle })` | Run until `until(spre)` is true, the frame limit is hit, or (`idle`) no threads remain. |
| `spre.runAsync(...)` | Same, but yields to the event loop between frames, for extensions that use real promises. |
| `spre.frame`, `spre.time`, `spre.now` | Frames run so far; virtual ms since frame 0; virtual epoch ms. |
| `spre.greenFlag()`, `spre.stopAll()`, `spre.turbo(on)` | Queued as input events for the next frame, so they show up in movies. |
| `spre.input.*` | See [Input](#input). |
| `spre.rng.*` | See [Randomness](#randomness). |
| `spre.snapshot({ strict = true })` | The whole world as plain JSON. See [Snapshots](#snapshots). |
| `spre.restore(snapshot)` | Load a snapshot into this VM (same project, any process). |
| `spre.hash()` | 64-bit hash of the canonical snapshot, to compare runs. |
| `spre.movie({ end = true })` | Everything needed to recreate the session. See [Movies](#movies). |
| `spre.status()` | Frame, time, thread/clone/wait counts, the open question. |
| `spre.profile.*` | See [Profiling](#profiling). |
| `spre.withProbe(probe, fn)` | Run `fn` with a statement probe attached; see [Profiling](#profiling). |
| `spre.clock.configure({ fps, opCostMs, utcOffsetMinutes })` | Change clock settings on the fly. |
| `spre.detach()` | Put the VM back the way it was. |

### Input

Inputs are events applied at the start of a frame, in the order they were scheduled. Everything applied is logged, and the log is a movie.

```js
spre.input.at(frame, event)       // schedule
spre.input.send(event)            // next frame
spre.input.schedule(movie.events) // bulk, [{ frame, ...event }]
spre.input.key('a')  /  spre.input.key('left arrow', false)
spre.input.tap('space', frames = 1)
spre.input.mouse({ x, y, down })  // Scratch coordinates
spre.input.click('Sprite1')       // press on the sprite, release next frame
spre.input.wheel(-1)
spre.input.answer('42')
spre.input.answers(['yes', 'no']) // or a function, as in the options
spre.input.setLoudness(80)
spre.input.username('griffpatch')
spre.input.cloud('☁ score', 10)
spre.input.state()  /  pending()  /  log()  /  clear()
```

Event types are `key {key, down}`, `mouse {x, y, down, target}`, `wheel {deltaY}`, `answer {text}`, `loudness {value}`, `username {name}`, `flag`, `stop`, `turbo {on}` and `cloud {name, value}`. A mouse `target` names the sprite that a press lands on. It's needed headless, where nothing can be picked by pixels.

### Randomness

Every random draw comes from a seeded [sfc32](https://pracrand.sourceforge.net/) stream. The blocks that consume randomness each get their own stream (`operator` for pick random, `motion`, `looks`, `data` for random list items, `control` for clone ids, `sensing`). Everything else draws from `engine`. Spoofing one stream never shifts another.

```js
spre.rng.force(6, 6, 6)            // the next three pick-randoms return these
spre.rng.onPick(({ from, to, target }) => (target === 'Dice' ? 6 : undefined))
spre.rng.queue('motion', 0.5, 0.5) // raw [0, 1) draws for one stream
spre.rng.override('looks', ({ draw }) => 0)
spre.rng.reseed('another run')
spre.rng.stream('operator')        // { name, draws, queued }
```

`force` and `queue` are part of snapshots. The `onPick` and `override` functions aren't.

### Snapshots

A snapshot is plain JSON (NaN, ±Infinity and -0 are tagged so they survive) holding:

- every target and clone: position, costume, effects, variables, lists, edge-triggered hat state and extension state (pen, bubbles, sound effects);
- every thread, mid-script: the block stack, loop and warp flags, procedure arguments, half-evaluated reporters, and the per-block state of glides, waits and `broadcast and wait` (timers, thread and variable references included);
- pending SPRE waits (say-for-secs, play-until-done, ask-and-wait, one-frame sound yields), the question queue and the last answer;
- the clock, every RNG stream, the input state and the input schedule;
- execution order, clone order, monitor visibility and the null renderer's drawables and layer order.

`restore` disposes the current clones, rebuilds the saved ones with their saved ids, and puts everything back. Originals are matched by sprite name, so a snapshot loads into any VM with the same project, whatever ids that VM happened to generate. The same goes for blocks: scratch-vm gives every literal and inline variable reporter a random id when it loads an sb3, so snapshots name those by their parent block and input (`$["parentId","STRING1"]`) instead, or, for a reporter lying loose in the scripting area, by its opcode, position and value. Two separate loads of a project hash the same at every frame, and a snapshot from one restores into the other. A snapshot also carries the session's input history, so after a restore the movie is the history that led to that snapshot, whichever branch it came from.

### Movies

`spre.movie()` returns plain JSON that recreates the session from its start:

| Field | |
|---|---|
| `spre` | Movie format version, 2. |
| `project` | Fingerprint of the project's blocks, costumes, sounds and variables, to catch replaying against the wrong project. |
| `seed`, `fps`, `opCostMs`, `epoch`, `utcOffsetMinutes` | The settings the session started with. |
| `renderer` | `cpu`, `null`, `other` or `none`. Touching and pick results depend on it. |
| `start` | `"load"` when the session began from a fresh load, otherwise the snapshot it began from (an attach to a VM that was already running, or a restored snapshot from another session). |
| `events` | Every input, frame-stamped, including memory edits, holds, `spre.clock.configure` and `spre.rng.reseed` / `force` / `queue`. |
| `end` | `{ frame, hash }` when the movie was taken. |
| `unrecorded` | Things that changed the run but cannot be saved: `rng.onPick` and `rng.override` callbacks. |

Timeline seeks and savestate loads keep the movie consistent: a snapshot restored from the same session brings back the input history that led to it, and one from elsewhere becomes the movie's new `start`. Pausing, speed changes and stepping one frame at a time don't change the world, so they aren't events.

`replayMovie(project, movie)` from `spre/replay` loads the project with the movie's settings, restores `start`, replays the events up to `end.frame`, and reports `{ hash, expected, matches, warnings }`. On the command line, `spre replay game.sb3 movie.json` exits 0 when the end hash matches and 1 when it doesn't. `spre game.sb3 --movie movie.json` and `spre diff --movie` use the same settings and start. Movies from before version 2 (`{ seed, fps, events }`) still replay; they just can't be checked.

In strict mode (the default), `snapshot()` throws `SnapshotError` rather than save something it couldn't restore exactly. That covers a thread waiting on a promise SPRE doesn't control (an extension's), a `setTimeout` pending inside the VM, a timer reading a clock SPRE doesn't own, or a renderer that can't save its state. `{ strict: false }` saves anyway and lists the `problems`.

### CLI

```
spre <project.sb3> [--frames N] [--seed S] [--fps N] [--op-cost MS] [--epoch ISO]
                   [--no-flag] [--no-fast] [--movie FILE] [--answers A,B] [--restore FILE]
                   [--snapshot FILE] [--record FILE] [--every N]
spre diff <a.sb3> [b.sb3] [...]          see Diffing
spre profile <project.sb3> [...]         see Profiling
spre serve <project.sb3> [--port N]      stage view and debugger panel in the browser
```

`spre serve` shows the stage with a frame rate line above it: frames the project actually ran per real second over the last second, and the max, p99, p95, p75, p50, p25, p1 and min over the last 10 seconds. Each backend tick is one sample, weighted by the frames it ran, so slow stretches pull the low percentiles down. Pauses, single steps and seeks aren't counted, and a hiccup the scheduler catches up on (up to 8 frames) doesn't show. The userscript puts the same line above the page's player, above Scratch's own green flag bar (or below the player when there is no room above).

When the project asks a question, an answer box opens at the bottom of the stage, as in Scratch, with the question text when the stage or a hidden sprite asked it. The answer is sent as an `answer` input event, so it lands in the movie. Typing in any text field on the page (this box or the panel's) never reaches the project as key presses, and a key the project saw go down always gets its key-up, even if the window loses focus.

A plain run prints a JSON status line with the final hash. `--every N` prints the hash every N frames. `spre --help` lists every option.

## Diffing

`spre diff` runs two worlds side by side and stops at the first frame where they differ. Use it to check a compiled or optimised build against the original, a refactor against the last version, or one seed against another.

```sh
spre diff game.sb3 game-o3.sb3 --frames 3000 --ignore '^__'
spre diff game.sb3 --b-no-fast                 # stock interpreter vs compiled stacks
spre diff game.sb3 --b-seed 7 --movie run.json  # same inputs, different luck
```

```
A game.sb3   B game-o3.sb3   mode state
diverged in frame 46 (after 47 frames)

first different write  Stage.var:score, 2nd write in the frame
  A no such write
  B Cat › when flag clicked › bump › change [score] 1 → 48

2 differences, earliest write first
  Stage.var:score     A 47  B 48  1 / 2 writes
  Stage.list:log[47]  A 47  B 48  1 / 1 writes
```

The two worlds step in lockstep and are compared every `--every` frames (default 30), with a snapshot kept at the last frame where they agreed. When a comparison fails, both rewind to that snapshot and replay one frame at a time, so the reported frame is exact. SPRE then replays the diverging frame once more with a probe on every block. It records each write to the values that ended up different, lines up the writes from both sides, and reports the first one that disagrees, with the sprite, script, procedure calls and block that made it.

| Option | Meaning |
|---|---|
| `--mode state` | Compare what a project shows: each sprite's and clone's position, direction, size, costume, layer, effects, bubble, variables and lists. The default for two different projects. |
| `--mode world` | Compare the whole snapshot hash, threads and timers included. The default when both sides are the same file with the same seed. |
| `--ignore REGEX` | Leave variables and lists whose names match out of the comparison, such as a compiler's hidden temporaries. |
| `--pen` | Also compare the pen layer's pixels (needs the CPU renderer, which `loadProject` attaches by default). |
| `--b-seed`, `--b-fps`, `--b-op-cost`, `--b-no-fast`, `--b-movie` | Settings for the second world only. |
| `--json FILE` | Write the full result, `-` for stdout. |
| `--verbose` | List the last writes to every difference, not just the first. |

The exit status is 0 when the runs agree for every frame and 1 when they diverge. Clones are matched by sprite and creation order (`Ball#3`), sprites with blank names are shown quoted (`" "`). From JavaScript:

```js
import { diffRuns } from 'spre/diff';

const result = diffRuns(a.spre, b.spre, { frames: 600, every: 30, mode: 'state', ignore: /^__/ });
result.diverged, result.frame, result.origin, result.differences
```

## Profiling

SPRE's clock counts blocks, so a profile counts blocks too. It comes out the same on every run and every machine, with no sampling noise, and it measures exactly what decides how much a project gets done per frame.

```sh
spre profile game.sb3 --warmup 60 --frames 600 --html profile.html --speedscope game.speedscope.json
```

The terminal summary gives blocks per frame, the busiest frame, how many frames used the whole budget, and the hottest blocks, procedures and scripts. `--html` writes a self-contained page with:

- a frame strip of blocks per frame against the budget line. Drag across it to pick frames, and the flame graph and hot list show only those frames;
- a **flame graph**: sprites at the bottom, then scripts, procedure calls and blocks stacked on top, each bar as wide as what it ran and coloured by its Scratch category. Click a bar to zoom in, click it again to zoom out, and type to find a block or sprite;
- a **thread graph**: one lane per script, one column per frame. A cell is shaded by how many blocks the script ran in that frame, and a thin line marks frames where it was alive but waiting. Lines above the lanes show how many threads and clones there were. Hover a cell to see where the thread was waiting, and click a column to see that frame's flame graph;
- the hottest blocks, for the whole run or the frames you picked. `--speedscope` writes a file for [speedscope.app](https://www.speedscope.app), `--folded` writes collapsed stacks for `flamegraph.pl` or inferno, and `--json` writes the raw profile. The Profile tab in `spre serve` shows the same view live.

```js
spre.profile.start();
spre.step(600);
const profile = spre.profile.stop();  // { totalOps, frameOps, budgetOps, peakOps, framesOverBudget, nodes, ... }
spre.profile.report();                 // the same, without stopping
spre.profile.report({ from: 120, to: 180 });   // the tree for those frames only
spre.profile.report({ timelineFrames: 300, detail: true });
spre.profile.clear();
```

Each report has a `timeline` covering the frames the profiler kept (the last 1800 by default, `start({ historyFrames })` to change it, `timelineFrames` to send fewer): `frameNumbers`, `ops`, `threads` and `clones` per frame, and `lanes`, one per script, each with `ops`, `alive` (live threads) and `at` (an index into `labels`, the block the first thread was on at the end of the frame) per frame. `detail: true` adds `frameNodes`, each frame's per-node block counts, which `aggregateFrames(profile, from, to)` turns into a tree for any range. The HTML report embeds them unless they would pass 3 million numbers, in which case picking frames is turned off.

`nodes` is a tree: sprite, then script (by its hat), then the procedure calls on the thread's stack, then the block that ran. A block's `self` is everything it cost, its reporters included; `total` adds everything below it. A procedure call block's own cost goes to the procedure's node, and a script's own cost is one per tick it got. `hottest(profile, { kind, by })`, `toSpeedscope` and `toFolded` live in `spre/profile`.

Profiling never changes the world: hashes are identical with it on. The probe sits between statements, so compiled stacks keep running, and it costs about 1.5x on block-heavy projects. With `fastExecute: false` it attributes whole thread steps to scripts (`granularity: 'script'`).

The probe hook is public. `spre.withProbe({ step(thread) {}, block(thread, blockId, run) { run(thread); } }, () => spre.step(1))` runs a frame with your probe called around every statement; `diff` uses it to find writers.

## Fidelity

SPRE tries to make the deterministic run look like a run on scratch.mit.edu, not just like *a* run.

| Behaviour | How |
|---|---|
| Frame timing | `currentStepTime` is 1000/fps. The project timer and `wait` read the start of the frame, glides and warp timers read frame start plus work done. |
| Work per frame | The sequencer's 75% budget and the 500 ms warp limit are measured in executed blocks × `opCostMs`. A frame that overruns pushes the next one back, just like a slow computer. |
| Redraws | The null renderer makes visible sprites request redraws, so `forever { move 1 }` moves 1 per frame. Without a renderer scratch-vm never yields such loops. |
| Fencing, size limits, edge bounce | Costume sizes come from the sb3's own PNG/JPEG headers and SVG viewBoxes. Fencing ports scratch-render's AABB rule (float32 and all), which is exact. |
| `say … for … secs`, `play sound until done`, `ask and wait`, sound effect/volume yields | Replaced with SPRE waits that resolve at a frame boundary, with the stock block's side effects (bubble clearing by usage id, question queue, prompts). Sound length is `sampleCount / rate`, adjusted for the pitch effect at start. |
| `current (year…second)`, `days since 2000` | Virtual wall clock in a fixed time zone. |
| Loudness, mouse, keys, username, cloud | Input state, settable per frame. |
| Translate, Text to Speech | No network. `translate` answers from the `translate` option, and `speak and wait` is a SPRE wait of `speechMs` milliseconds, so both snapshot. A function passed for either is listed in a movie's `unrecorded`. |
| Music | Note and drum blocks time themselves on the virtual clock. Nothing is played, since there is no audio engine. |

Known gaps, by design for now:

- **No pixels.** `touching`, `touching color`, `color is touching` and `pick` (click detection without an explicit `target`) report nothing. Edge bounce and touching-edge use the costume's full rectangle, where scratch-render would use its opaque pixels. A deterministic CPU silhouette renderer is the planned fix.
- **Pen** state is tracked but nothing is drawn.
- **Extensions** with real promises or timers (video sensing, hardware) run, but snapshots refuse them in strict mode. [docs/nondeterminism-audit.md](docs/nondeterminism-audit.md) lists every nondeterministic path in scratch-vm 5.0.300.
- **Attaching mid-run** (the future browser adapter) keeps the project timer's elapsed time, but glides started before attaching still read the real clock until they finish.

## Layout

```
src/index.js          attach(): wiring, frame loop, public API
src/clock.js          virtual clock, work accounting, VirtualDate
src/scope.js          per-frame global swaps, virtual setTimeout/setInterval
src/rng.js            seeded sfc32 streams, forcing and overrides
src/primitives.js     primitive wrapping and the deterministic overrides
src/fastexec.js       stock-equivalent execute/stepThread plus compiled block stacks
src/waits.js          frame-boundary waits, the question queue, thread resumption
src/input.js          input events, schedule, log, answer source
src/snapshot.js       capture / restore
src/block-ids.js      load-independent names for literal, inline and loose reporter blocks
src/movie.js          movie format, project fingerprint
src/replay.js         replayMovie and the settings a movie loads with (Node)
src/profile.js        block-counting profiler, speedscope and folded exports
src/diff.js           lockstep diff, observations, write blame
src/labels.js         readable names for blocks, scripts, sprites and procedures
src/report.js         terminal reports for diff and profile
src/profile-report.js self-contained HTML profile page
src/display/profile-view.js  flame graph, frame strip and hot list (panel and HTML report)
src/display/fps-meter.js     frame rate line above the stage
src/display/question-prompt.js  ask-and-wait answer box on the stage
src/remote/frame-rate.js     rolling frame rate window and weighted percentiles
src/encode.js         tagged JSON encoding, canonical JSON, hash
src/internals.js      Timer/Thread/StackFrame/Variable classes found through the instance
src/null-renderer.js  headless renderer: draw list, AABB geometry, no pixels
src/geometry.js       costume sizes from PNG/JPEG/SVG bytes
src/node.js           loadProject / createVM for Node
bin/spre.js           CLI
```

[docs/design.md](docs/design.md) explains why things are the way they are.
