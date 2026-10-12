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
| `spre.movie()` | `{ spre, seed, fps, events }`: everything that was input, frame-stamped. |
| `spre.status()` | Frame, time, thread/clone/wait counts, the open question. |
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

`restore` disposes the current clones, rebuilds the saved ones with their saved ids, and puts everything back. Originals are matched by sprite name, so a snapshot loads into any VM with the same project, whatever ids that VM happened to generate. Restoring also rewinds the input log to the snapshot's frame, so a movie recorded after a restore matches what happened since.

In strict mode (the default), `snapshot()` throws `SnapshotError` rather than save something it couldn't restore exactly. That covers a thread waiting on a promise SPRE doesn't control (an extension's), a `setTimeout` pending inside the VM, a timer reading a clock SPRE doesn't own, or a renderer that can't save its state. `{ strict: false }` saves anyway and lists the `problems`.

### CLI

```
spre <project.sb3> [--frames N] [--seed S] [--fps N] [--op-cost MS] [--epoch ISO]
                   [--no-flag] [--no-fast] [--movie FILE] [--answers A,B] [--restore FILE]
                   [--snapshot FILE] [--record FILE] [--every N]
```

It prints a JSON status line with the final hash. `--every N` prints the hash every N frames, which is the fastest way to find where two runs part ways.

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

Known gaps, by design for now:

- **No pixels.** `touching`, `touching color`, `color is touching` and `pick` (click detection without an explicit `target`) report nothing. Edge bounce and touching-edge use the costume's full rectangle, where scratch-render would use its opaque pixels. A deterministic CPU silhouette renderer is the planned fix.
- **Pen** state is tracked but nothing is drawn.
- **Extensions** with real promises or timers (music, text-to-speech, translate, video sensing, hardware) run, but snapshots refuse them in strict mode. [docs/nondeterminism-audit.md](docs/nondeterminism-audit.md) lists every nondeterministic path in scratch-vm 5.0.300.
- **Block ids from load.** scratch-vm gives inline variable and list reporters (the ones dragged straight into an input) a random id with `uid()` when it loads an sb3, and that load happens before SPRE seeds anything. The id shows up in a snapshot only while a thread is waiting on a promise with a computed input (`say (join …) for 2 secs`, `ask`, `play until done`), in `frame.reported[].opCached`. Two fresh loads of the same project then hash differently in those frames, although each run still replays and restores exactly. Hash comparisons between separate loads are safe for projects whose waiting blocks take literal or non-variable inputs; otherwise compare within one load (snapshot, restore, replay).
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
src/encode.js         tagged JSON encoding, canonical JSON, hash
src/internals.js      Timer/Thread/StackFrame/Variable classes found through the instance
src/null-renderer.js  headless renderer: draw list, AABB geometry, no pixels
src/geometry.js       costume sizes from PNG/JPEG/SVG bytes
src/node.js           loadProject / createVM for Node
bin/spre.js           CLI
```

[docs/design.md](docs/design.md) explains why things are the way they are.
