---
name: motion-graphics
description: Create original cinematic explainers, podcast cartoon videos, voice-based social reels, ads and animated motion graphics using 46 production workflows and 86 visual style prompts. Align narration and sound effects to exact word timestamps and render verified MP4.
---

# ChatGPT Motion Graphics Studio — full agent workflow

## Trigger and route
Use this skill for motion graphics, narrated explainers, captioned shorts, kinetic typography, promotional reels and animated stories. Read the selected video workflow `skills/<name>/SKILL.md` and chosen visual style `styles/atlas/<id>/PROMPT.md`. Style selection must match the user's number/name, otherwise choose what best serves the brief. The **46 video skills** describe the type of film; the **86 visual prompts** describe how it looks and moves.

## Working inside normal ChatGPT
Pasting `prompts/PASTE_IN_CHATGPT.md` activates instructions in that conversation or appropriate Project/custom GPT instruction field. It does not install a native account-level skill, a browser or FFmpeg. When runtime is unavailable, deliver runnable code + instructions, and do not claim a rendered video exists. If GitHub browsing is unavailable, tell the user to attach the relevant style/workflow file.

## Production checklist
1. **Preflight**: determine topic, audience, 16:9/9:16/1:1, duration, existing footage, music, captions/language, source facts, ownership and brand materials. Defaults: 12 seconds, 16:9, 30fps, no loop. A supplied voice file sets the real film length (measure with ffprobe), not a guessed default.
2. **Style bible**: the selected atlas PROMPT.md defines physical materials, texture, scene architecture, arrows, numbers, camera grammar and transitions. Write actual palette hexes, fonts, safe margins, shot language, easing and a ban list. Avoid generic center-on-gradient/fade-everything visuals.
3. **Storyboard**: provide beat timestamps (for short work typically 6–10), illustration/key frame, precise words, camera and continuity, what carries over vs changes, pronunciation/voice cues, timing of music beats and SFX. If user requires storyboard approval, render/illustrate *stills only* and wait for approval.
4. **Speech**: for attached audio, run actual word transcription and align to a supplied exact script; do not invent timing. Mark unmatched words as estimated. Preserve Hindi/Nepali Devanagari glyphs and right language. Captions: 2–5 words with on-word highlight; test the start/middle/end against actual audio.
5. **Talking host**: keep a single original cartoon model, a consistent costume and a changing mouth. Offline audio-energy RMS can control *approximate* mouth opening; it is not phoneme-level lip synchronization. Don't claim perfect lip sync without a phoneme/viseme alignment tool.
6. **Animation contract**: use `window.seek(t)` with optional `window.renderAt(t)` alias; pure-time spring curves and seeded texture; no Math.random() in render, wall-clock timers or dependence on prior frames. Await fonts and assets before snapshots.
7. **Sound**: synchronize speech, cue SFX and score on the same zero-based timeline. Use sparse material-matched effects only for visual actions. Duck music and effects under dialogue, prevent digital clipping, mux proper AAC with MP4. Verify output streams via ffprobe.
8. **QC**: inspect one frame per beat, 3–5 stills per shot, fast-action strips and phone-size contact sheet. Hunt caption overlap, word timing drift, stutters, fake data, poor contrast, visual style drift and cut seams. Fix the 3 most serious issues before final. For loops compare first frame with wrapped end-equivalent frame.
9. **Delivery**: final H.264/yuv420p MP4 + AAC audio when genuinely rendered, poster, contact sheet, source, caption JSON and audio cue sheet. State truthfully what passed tests and what remains unverified.

## Useful files
- `prompts/PASTE_IN_CHATGPT.md` — one long instruction prompt for ChatGPT
- `docs/INSTALL_CHATGPT.md` — direct use, Project and coding agent installation
- `skills/README.md` — all 46 original format workflows
- `styles/atlas/<style>/PROMPT.md` — all 86 complete source-derived prompts
- `tools/align.py`, `tools/mouth.py`, `tools/transcribe.sh` — optional local speech processing

