---
name: motion-graphics
description: Create premium code-rendered motion graphics with a library of 86 visual styles, deterministic timing, storyboard review, and synchronized audio.
---

# ChatGPT Motion Studio

## Activation
Follow this guide when the user asks for explainers, kinetic typography, product launch spots, UI morphs, title animations, data stories, logo reveals or motion films.

## Direct ChatGPT workflow
Work from a plain-English request. Defaults: 12 seconds, 16:9, 30 fps, suitable original style, original procedural SFX. Ask only essential questions; do not ask for answers already given. If the user explicitly requests storyboard-first, create a visual storyboard and wait for approval before animating. Never claim a skill was installed globally just because instructions were pasted.

## Style selection
Choose exactly one primary style from `styles/atlas/<id>/STYLE.md`; read its physical medium, textures, typography, motion grammar, camera movements and transitions. Apply those design rules to the user's own content. Style metadata is a reference, not a ready-made renderer. Never substitute generic glows and centered gradient titles for an intentional art direction.

## Storyboard
Create 6–10 time-coded beats or as appropriate; include shot framing, motion and continuity, exact on-screen words, voiceover or SRT alignment, and audio cue timestamps. Use genuine brand assets and metrics only when provided or verified.

## Deterministic render contract
- Produce `window.seek(t)` and `window.DURATION`. Calling seek with identical time must yield identical pixels.
- No `Math.random()`, timer-driven transitions or simulation of previous frames. Use seeded noise and pure-time closed-form springs.
- Await fonts/assets before screenshot capture. Design for 16:9, 9:16 and 1:1 through responsive layout, not blunt cropping.
- Hook within the first 2s, new meaningful visual event roughly every 2–4s, legible at phone width.
- Examine contact sheets, opening/transition/closing frames, motion strips and loop seam before delivery. Fix weak shots and verify output.

## Audio
Map narration words and SRT to a single BEATS timeline. Cue sparse whooshes, marker strokes, clicks and impacts on exact visual actions. Keep narration clear; duck music and SFX beneath speech. Audio must be rendered offline as WAV and muxed into MP4 by FFmpeg; preview audio alone does not prove output contains sound. When not given narration, propose a script and use licensed or generated speech only when supported. Check final A/V streams and sync.

## Honest output
When tools are available, render and validate MP4 plus poster/contact sheet. Otherwise create fully runnable files and give local commands; explain that a rendered video could not be produced inside the chat.
