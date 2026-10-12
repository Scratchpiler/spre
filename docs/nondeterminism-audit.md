# Nondeterminism and async audit: scratch-vm 5.0.300

Source: `/root/scratchpiler/spre/node_modules/scratch-vm/src`. All paths below are relative to that directory. Line numbers were read from the code.

Categories: `promise`, `setTimeout`, `random`, `wallclock`, `stackTimer` (runtime.currentMSecs), `audio`, `renderer`, `network`, `hardware`.

## 1. Block primitives

Blocks in `blocks/*.js` are listed first, then non-hardware extensions. `core_example`, `procedures`, and `sound_volume` have no entries because they have no category. Yield-only waits (`control_wait_until`, `event_broadcastandwait`, `looks_switchbackdroptoandwait`) are scheduler-based and are noted below the table.

| Opcode | Location | Categories | Behaviour |
|---|---|---|---|
| `looks_say` | `blocks/scratch3_looks.js:330-333`; listener `_updateBubble` 273-279; `_renderBubble` 218-240 | random, renderer | Emits SAY_OR_THINK; `_updateBubble` sets `usageId = uid()` (277) and creates or updates a renderer text skin and drawable. |
| `looks_think` | `blocks/scratch3_looks.js:351-353` (same path as `looks_say`) | random, renderer | Same as `looks_say` with type `think`. |
| `looks_sayforsecs` | `blocks/scratch3_looks.js:335-349` | promise, setTimeout, random, renderer | Says, then returns a Promise resolved by `setTimeout(1000*SECS)` (339-347); clears the bubble only if `usageId` is unchanged. |
| `looks_thinkforsecs` | `blocks/scratch3_looks.js:355-369` | promise, setTimeout, random, renderer | Same as `looks_sayforsecs` with `think`; timeout at 360, Promise at 359. |
| `looks_show` | `blocks/scratch3_looks.js:371-374` | renderer | Sets visible and calls `_renderBubble`, which uses the renderer when present (219). |
| `looks_hide` | `blocks/scratch3_looks.js:376-379` | renderer | Same as `looks_show` with visible=false. |
| `looks_switchbackdropto` | `blocks/scratch3_looks.js:474-476` via `_setBackdrop` 423-462 | random | For `random backdrop`, picks via `MathUtil.inclusiveRandIntWithout` (446) so the current backdrop is excluded. |
| `looks_switchbackdroptoandwait` | `blocks/scratch3_looks.js:478-515` via `_setBackdrop` 423-462 | random | Same random pick as above (446), then yields until the started hat threads finish. It is not a Promise. |
| `motion_goto` | `blocks/scratch3_motion.js:99-104` via `getTargetXY` 78-98 | random | `_random_` sets X and Y to `Math.round(stage*(Math.random()-0.5))` (87-88); `_mouse_` reads io mouse. |
| `motion_glideto` | `blocks/scratch3_motion.js:179-184` via `getTargetXY` and `glide` | random, wallclock | Resolves the target via `getTargetXY` (random for `_random_`, 87-88), then runs `glide`. |
| `motion_glidesecstoxy` | `blocks/scratch3_motion.js:144-178` | wallclock | First call creates `new Timer()` (163) with the default `Date`-based nowObj and interpolates each frame from `timeElapsed()` (146). |
| `motion_pointtowards` | `blocks/scratch3_motion.js:121-142` | random | `_random_` sets direction to `Math.round(Math.random()*360)-180` (128). |
| `motion_ifonedgebounce` | `blocks/scratch3_motion.js:186-241` | renderer | Reads `target.getBounds()` (187), which is renderer-dependent. |
| `operator_random` | `blocks/scratch3_operators.js:80-91` | random | Returns an integer via `Math.floor(Math.random()*…)` (88) when both args are ints, otherwise a float (90). |
| `data_deleteoflist` | `blocks/scratch3_data.js:135-148` via `Cast.toListIndex` at 138 | random | `INDEX` = random or any picks an index via `Math.random` (`util/cast.js:205`). |
| `data_insertatlist` | `blocks/scratch3_data.js:156-173` via `toListIndex` at 160 | random | Same, with length `list.length+1` so the random index can be one past the end. |
| `data_replaceitemoflist` | `blocks/scratch3_data.js:175-186` via `toListIndex` at 179 | random | Same as `data_deleteoflist`. |
| `data_itemoflist` | `blocks/scratch3_data.js:187-195` via `toListIndex` at 190 | random | Same as `data_deleteoflist`. |
| `sound_play` | `blocks/scratch3_sound.js:155-158`; `_playSound` 164-179 (`soundBank.playSound` at 176) | audio | Starts the sound on `sprite.soundBank`; the returned promise is discarded. |
| `sound_playuntildone` | `blocks/scratch3_sound.js:160-162`; `_playSound` 164-179 | promise, audio | Returns the `soundBank.playSound` Promise (176), which resolves when playback ends. |
| `sound_stopallsounds` | `blocks/scratch3_sound.js:229-235` via `_stopAllSoundsForTarget` 237-244 | audio | Calls `soundBank.stopAllSounds` for each target. |
| `sound_seteffectto` | `blocks/scratch3_sound.js:257-259`; `_updateEffect` 265-284 | promise, audio | Sets the effect, calls `soundBank.setEffects` (281 to 290), and returns `Promise.resolve()` (283). Returns undefined for unknown effects (270). |
| `sound_changeeffectby` | `blocks/scratch3_sound.js:261-263`; `_updateEffect` 265-284 | promise, audio | Same as `sound_seteffectto` with `+=`. |
| `sound_cleareffects` | `blocks/scratch3_sound.js:293-295`; `_clearEffectsForTarget` 297-304 | audio | Zeros effects and calls `soundBank.setEffects` (303, 290). |
| `sound_setvolumeto` | `blocks/scratch3_sound.js:314-317`; `_updateVolume` 324-331 | promise, audio | Clamps and sets `target.volume`, syncs to `soundBank` (327), returns `Promise.resolve()` (330). |
| `sound_changevolumeby` | `blocks/scratch3_sound.js:319-322`; `_updateVolume` 324-331 | promise, audio | Same as `sound_setvolumeto` with `+=`. |
| `control_wait` | `blocks/scratch3_control.js:112-122` | stackTimer | `util.stackTimerNeedsInit()` (113), `util.startStackTimer(ms)` (116), and `util.stackTimerFinished()` (119) drive a per-frame yield. |
| `event_whentouchingobject` | `blocks/scratch3_event.js:65-67` | renderer | Edge-activated hat that calls `target.isTouchingObject` (66). |
| `event_whengreaterthan` | `blocks/scratch3_event.js:69-79` | stackTimer, audio | TIMER option reads `ioQuery('clock','projectTimer')` (74). LOUDNESS calls `runtime.audioEngine.getLoudness()` directly (76), with no per-step cache. |
| `sensing_touchingobject` | `blocks/scratch3_sensing.js:171-173` | renderer | Calls `target.isTouchingObject`. |
| `sensing_touchingcolor` | `blocks/scratch3_sensing.js:175-178` | renderer | Calls `target.isTouchingColor`. |
| `sensing_coloristouchingcolor` | `blocks/scratch3_sensing.js:180-184` | renderer | Calls `target.colorIsTouchingColor`. |
| `sensing_timer` | `blocks/scratch3_sensing.js:213-215` → `io/clock.js:16-21` | stackTimer | Returns the project timer, which is a Timer over `runtime.currentMSecs` (clock.js:5). |
| `sensing_resettimer` | `blocks/scratch3_sensing.js:217-219` → `io/clock.js:34-37` | stackTimer | Calls `Timer.start()` on the clock's currentMSecs-based timer. |
| `sensing_current` | `blocks/scratch3_sensing.js:233-251` | wallclock | Reads parts of `new Date()` (235). |
| `sensing_dayssince2000` | `blocks/scratch3_sensing.js:252-260` | wallclock | Uses `new Date()` (254-255) and a DST adjustment. |
| `sensing_loudness` | `blocks/scratch3_sensing.js:262-275` | audio, wallclock | Returns -1 if no audioEngine (263). Caches per step using `this._timer` (a default wallclock Timer, 267 and 272) and calls `audioEngine.getLoudness()` (273). |
| `sensing_loud` | `blocks/scratch3_sensing.js:277-279` | audio, wallclock | Returns `getLoudness() > 10`, which inherits the loudness path above. |
| `sensing_askandwait` | `blocks/scratch3_sensing.js:156-165`; resolves in `_onAnswer` 99-111 (`resolve()` at 108) | promise | Returns a Promise that resolves when the user submits an answer. |
| `pen_clear` | `extensions/scratch3_pen/index.js:500-511` via `_getPenLayerID` 132-141 | renderer | Calls `renderer.penClear` (503), creating the pen skin if missing (134-136). |
| `pen_stamp` | `extensions/scratch3_pen/index.js:513-525` | renderer | Calls `renderer.penStamp(…, target.drawableID)` (517). |
| `pen_penDown` | `extensions/scratch3_pen/index.js:527-546` | renderer | Calls `renderer.penPoint` (538). Also installs `_onTargetMoved` (182-196), which calls `penLine` (188). |
| `music_playDrumForBeats` | `extensions/scratch3_music/index.js:933-935` → `_playDrumForBeats` 963-982 | audio, wallclock | Plays a drum via `_playDrumNum` (984-1025; audioEngine checks 985, `audioContext` 1004, `currentTime` 1006). Timing uses a hand-rolled `new Timer()` (`_startStackTimer` 1227-1231, `_checkStackTimer` 1239-1244), not the runtime clock. |
| `music_midiPlayDrumForBeats` | `extensions/scratch3_music/index.js:944-956` → `_playDrumForBeats` 963-982 | audio, wallclock | Same as `music_playDrumForBeats`, mapping MIDI drum numbers first. |
| `music_restForBeats` | `extensions/scratch3_music/index.js:1027-1036` | wallclock | Uses the music-local `Timer` (1228) for `60/tempo*beats` seconds. |
| `music_playNoteForBeats` | `extensions/scratch3_music/index.js:1045-1064` → `_playNote` 1084-1168 | audio, wallclock | Plays an instrument note (audioEngine checks 1085, `audioContext` 1126, `currentTime` 1128), with the music-local Timer as above. Silent for 0 beats. |
| `makeymakey_whenMakeyKeyPressed` | `extensions/scratch3_makeymakey/index.js:302-316` | setTimeout | Returns `isDown && frameToggle`. `frameToggle` is flipped by `setInterval` (82-84) at `currentStepTime`. Key state comes from io keyboard. |
| `makeymakey_whenCodePressed` | `extensions/scratch3_makeymakey/index.js:385-393` | setTimeout | Returns `sequences[s].completed`. `keyPressed` (318-357) sets it, and `setTimeout` (350) clears it after `SEQUENCE_HAT_TIMEOUT` = 100 ms (line 23). |
| `videoSensing_whenMotionGreaterThan` | `extensions/scratch3_video_sensing/index.js:556-561` | hardware, renderer | Runs `analyzeFrame` on the latest camera frame and reads sprite motion through `_analyzeLocalMotion` (518-522, which reads `renderer._allDrawables` at 519). |
| `videoSensing_videoOn` | `extensions/scratch3_video_sensing/index.js:533-545` | hardware, renderer | Stage motion from camera frames. Sprite subject also uses `_analyzeLocalMotion` (renderer). |
| `videoSensing_videoToggle` | `extensions/scratch3_video_sensing/index.js:568-580` | hardware | Calls `ioDevices.video.enableVideo` / `disableVideo`. |
| `videoSensing_setVideoTransparency` | `extensions/scratch3_video_sensing/index.js:587-592` | hardware | Calls `ioDevices.video.setPreviewGhost`. |
| `translate_getTranslate` | `extensions/scratch3_translate/index.js:249-283` | promise, network, setTimeout, random | Digits-only input returns `Promise.resolve` (252). Otherwise `fetchWithTimeout` to the translate server (268, timeout 10 s via `util/fetch-with-timeout.js:42`). Cached results return a plain value (257), not a Promise. The default language menu value is chosen randomly in `getInfo` (100-101). |
| `text2speech_speakAndWait` | `extensions/scratch3_text2speech/index.js:690-…` | promise, network, audio, setTimeout | `fetchWithTimeout` to the synth server (725, timeout via fetch-with-timeout 42), then `audioEngine.decodeSoundPlayer` (740), `play()` (753), and a Promise resolved on the player's `stop` event (754-756). |
| `speech2text_listenAndWait` | `extensions/scratch3_speech2text/index.js:669-680` | promise, network, hardware, setTimeout | Pushes a resolver and starts listening (`_startListening` 447-453). Sets a 10 s block timeout (451), calls `getUserMedia` (486), and opens a WebSocket (511, 531). `_stopTranscription` (282-290) adds a 3 s timeout (288). Resolution happens in `_resolveSpeechPromises` (268-274). |
| `speech2text_whenIHearHat` | `extensions/scratch3_speech2text/index.js:688-690` | network | Fuzzy-matches PHRASE against `_utteranceForEdgeTrigger`, which is set by server results (395). No timer of its own. |
| `speech2text_getSpeech` | `extensions/scratch3_speech2text/index.js:696-698` | network | Returns `_currentUtterance`, which is set by server results (393). |

Yield-only waits, which depend on scheduler timing but have no category above: `control_wait_until` (`blocks/scratch3_control.js:101-106`), `event_broadcastandwait` (`blocks/scratch3_event.js:92-134`, uses `util.yield` and `yieldTick`), and `looks_switchbackdroptoandwait` (478-515).

Hardware extensions, one line each (only the methods that use Promise or timers):
- Boost (`scratch3_boost`): `motorOnFor`, `motorOnForRotation`, `motorOn`, `motorOff`, `setMotorPower`, `setMotorDirection`, `setLightHue` use Promise plus `setTimeout` and `Date.now` (lines 1737-1910, 2092-2106). `_setNewDurationTimeout` (625) is also timer-based.
- EV3 (`scratch3_ev3`): `beep`, `motorTurnClockwise`, `motorTurnCounterClockwise`, `coastAfter` return setTimeout-based Promises (1156-1190, 1270-1285, 358-366). `send()` returns a Promise (663-669).
- GDX-FOR (`scratch3_gdx_for`): no opcode returns a Promise. It uses `setInterval` polling in `_onConnect` (256-276) and `_onSensorValueChanged` (292-320).
- micro:bit (`scratch3_microbit`): `displaySymbol`, `displayText`, `displayClear` return setTimeout-based Promises (842-900). Busy and timeout handles use `setTimeout` at 288, 313, and 344.
- WeDo 2 (`scratch3_wedo2`): `motorOnFor`, `motorOn`, `motorOff`, `startMotorPower`, `setMotorDirection`, `setLightHue`, `playNoteFor` use Promise plus `setTimeout` and `Date.now` (1305-1477). `_setNewTimeout` (353) is also timer-based.

## 2. Non-primitive paths (engine, io, sprites, util)

| Path | Location | Source | Used for |
|---|---|---|---|
| Default Timer clock | `util/timer.js:16-27`; `Timer.nowObj` 54-63 (`Date.now` 57-58); `legacyDateCode` 43-47 (`new Date`) | Date | Default clock for every `new Timer()`. Used by sequencer, glide, music, sensing loudness, rateLimiter, and taskQueue. `USE_PERFORMANCE` is false (35-37), so `performance.now` is not used by default. |
| Timer setTimeout wrapper | `util/timer.js:89-99` | setTimeout | Only consumer is `util/task-queue.js` (196). |
| List random index | `util/cast.js:193-215`; random at 203-206 (`Math.random` 205) | random | `toListIndex` for `random`/`any`. Used by data blocks. |
| Random backdrop | `util/math-util.js:93-105` (`Math.random` 99) | random | `inclusiveRandIntWithout` for `random backdrop` (looks 446). |
| Random IDs | `util/uid.js:19-27` (`Math.random` 24) | random | `uid()` for: `engine/target.js:41`, `engine/variable.js:18`, `engine/comment.js:21`, `engine/adapter.js:16`, `engine/runtime.js:2806`, `util/new-block-ids.js:13`, bubble `usageId` in `blocks/scratch3_looks.js:277`. |
| Clone spawn position | `sprites/rendered-target.js:982-988` (`Math.random` 987-988) | random | Duplicating a sprite places the copy at a random position. Promise from `sprite.duplicate()` at 982. |
| Task queue | `util/task-queue.js:28-31`, `115`, `176`, `196` | wallclock, setTimeout | Token-bucket dispatcher. Has no consumers in `src/` (dead code). |
| Rate limiter | `util/rateLimiter.js:32-33`, `39-51` | wallclock | Token bucket for hardware sends. Consumers: EV3, Boost, WeDo 2. |
| Fetch with timeout | `util/fetch-with-timeout.js:30-48` (`setTimeout` 42-45) | setTimeout, network | `Promise.race` of fetch and a timeout. Used by translate, text2speech, and `engine/runtime.js:21`. |
| Link socket connect timeout | `util/scratch-link-websocket.js:61-82` | setTimeout, network | Connection timeout for the Scratch Link socket. |
| Project clock (sensing timer) | `io/clock.js:5`, `16-21`, `23-26`, `28-33`, `34-37` | stackTimer | `Timer` over `runtime.currentMSecs` (5). Backs `sensing_timer`, `sensing_resettimer`, and the timer hat. |
| Video preview loop | `io/video.js:163-168` | setTimeout | Re-renders the preview frame each `currentStepTime`. |
| BLE and BT discover timeouts | `io/ble.js:45-47` and `io/bt.js:47-49` | setTimeout | 15 s device discovery timeout (hardware). |
| Runtime clock | `engine/runtime.js:2894-2896` (`Date.now` 2895); called from `engine/runtime.js:323` and `engine/sequencer.js:76` | Date | Sets `runtime.currentMSecs`, which backs stack timers and the project clock. Updated once per `stepThreads`. |
| Step interval | `engine/runtime.js:2855-2858` (`setInterval`); constants 717-726; cleared at 2408 and 2867 | setInterval | Drives `_step` at 1000/60 ms (717-719) or 1000/30 ms in compatibility mode (724-726). |
| Sequencer work budget | `engine/sequencer.js:47` (Timer), `72` (`WORK_TIME = 0.75*currentStepTime`), `78`, `90` | wallclock | Limits how long one frame runs threads. Makes the amount of work per frame depend on machine speed. |
| Warp timer | `engine/sequencer.js:62-64` (`WARP_TIME` = 500), `194-198`, `221`, `257`, `323` | wallclock | Limits how long warp-mode threads run before yielding. Depends on machine speed. |
| Stack timer | `engine/block-utility.js:25-27` (nowObj on `runtime.currentMSecs`), `51-55`, `74-80` (`stackTimerFinished`), `86-88` (`stackTimerNeedsInit`), `94-99` (`startStackTimer`) | stackTimer | Used by `control_wait`. Falls back to a default wallclock Timer when there is no runtime (98). |
| Profiler | `engine/profiler.js:190`, `197` (`performance.now`) | dev only | Profiling records only. |

## 3. Notes

- Inconsistent clocks. `control_wait` and `sensing_timer` run on `runtime.currentMSecs`, which changes once per step. `motion_glidesecstoxy`, `motion_glideto`, and the music rest/note blocks run on a wallclock `Timer` (`motion` 163, `music` 1228). Music timing therefore does not follow the runtime clock.
- Sequencer and warp limits are wallclock (`engine/sequencer.js:72`, `90`, `197-198`, `221`, `257`, `323`). Frame work and warp yields depend on the speed of the machine.
- Only one `_bubbleTimeout` is kept per module (`looks_sayforsecs` 340 and `looks_thinkforsecs` 360 both write it). `_onResetBubbles` (`looks` 150) clears only the latest one. Earlier timers still fire, but their `resolve()` is harmless because of the `usageId` check.
- Random IDs use `Math.random` through `util/uid.js:24`. Re-saved projects can therefore get new IDs each time. The same happens on every load: `serialization/sb3.js` creates a fresh id for each inline variable/list reporter, before SPRE attaches. These ids end up in a snapshot as `frame.reported[].opCached` while a thread waits on a promise with a computed input, so two loads of one sb3 hash differently in those frames (found with `say (join …) for secs`; `tests/fastexec.test.js` avoids it by using operator inputs). Fix idea: seed `Math.random` around `vm.loadProject` in `loadProject`, or rewrite `opCached` to the block's path in the stack.
- `speech2text` has two no-op `bind` calls, so the audio context is never suspended or resumed: `scratch3_speech2text/index.js:251` (`this._context.suspend.bind(this._context)`) and `459` (`this._context.resume.bind(this._context)`). The calls return a bound function and do nothing.
- `translate_getTranslate` returns a plain cached value (257) on cache hit but a Promise otherwise (252, 268). Callers get mixed return types.
- `translate` re-randomises `_randomLanguageCode` on every `getInfo()` call (101), so the default menu value changes whenever `getInfo()` runs.
- `text2speech_speakAndWait` resolves only on the player's `stop` event (754-756). If playback never emits `stop`, the block never finishes. Fetch and decode errors are logged and resolve with `undefined` (`.catch`).
- `makeymakey`: `setInterval(…, this.runtime.currentStepTime)` (82-84) runs before the runtime starts if the extension is loaded before `vm.start()`, because `currentStepTime` is `null` until `start()` (`engine/runtime.js:320`, `2855`). The interval is never cleared.
- Non-primitive extension timers: `videoSensing._loop` (`extensions/scratch3_video_sensing/index.js:231-237`) runs a self-rescheduling `setTimeout` from the constructor (110), samples the camera with `Date.now`, and is cleared only by `_stopLoop` (256-258). `music._loadAllSounds` (96-118) and `_storeSound` (124-138) return decode Promises.
- `util/task-queue.js` has no consumers in `src/`.
- User-input reads (mouse, keyboard, username, `getKeyIsDown`, `getMouseX`, and similar) are nondeterministic but outside the category set, so they are not listed above.
- `text2speech` and `translate` read `navigator.language` through `getViewerLanguageCode`, which is environment-dependent but outside the category set.
