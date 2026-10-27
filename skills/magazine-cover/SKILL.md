---
name: magazine-cover
description: Make magazine editorial reel from original portrait or footage with word-timed captions, deterministic animation and checked audio.
---

# Magazine editorial reel — complete ChatGPT production skill

**Input:** original portrait or footage. Trigger in plain English: "Make a Magazine editorial reel" or select `/magazine-cover` in a compatible agent interface.

## Creative treatment
Oversized editorial headlines and art-directed crops. This is a format workflow; use `styles/atlas/<style-id>/PROMPT.md` for ONE of 86 visual appearances. Never treat these as 86 prebuilt renderers.

## Stage 1: Source and format preflight
Inspect uploaded media and verify permission. Use `ffprobe` for actual source duration and video/audio streams. Keep all source footage, narration, metrics and on-screen claims faithful. Choose 9:16 for social reels, 16:9 for landscape lessons, unless specified otherwise.

## Stage 2: Exact narration and storyboard
For real voice, obtain word-level speech timestamps from Whisper or another actual recognizer; align supplied exact transcript with the timestamps, marking unmatched words estimated. Make a storyboard with 6–10 beats for short clips (more for long inputs); every row specifies in/out, visual metaphor, carry-over/transition, exact text, anchored spoken word, sound event and asset. Wait for approval if requested.

## Stage 3: Visual design and captions
Oversized editorial headlines and art-directed crops. Lock colors, typography, shapes, camera behavior, safe areas and banned cliches in one style guide. Highlight only the currently spoken word. Caption groups should have 2–5 words, be visible at phone width and avoid the platform bottom chrome, speaker faces and logos. Hindi/Nepali need fonts covering Devanagari; keep glyph clusters intact.

## Stage 4: Deterministic video and audio
Build a scene with `window.seek(t)` (plus `window.renderAt(t)` alias), pure functions and seeded noise. Use measured words for reveals, plus sparse Foley/clicks/impacts at exact matching timestamps. If a cartoon presenter is needed, derive an audio-RMS mouth-open envelope and disclose that it is approximate, not phoneme-accurate lip sync. Preserve the original audio; mix any music/SFX below dialogue. Render H.264/yuv420p + AAC.

## Stage 5: Video-director quality gate
Check first 2 seconds, one frame per beat, before/after every transition, phone readability, caption overlap, source claim accuracy and final payoff. Verify final audio/video with ffprobe. Report any missed word matches; only claim successful MP4 delivery after actual output exists.

## Deliverables
Shotlist, full original HTML/JS source, style bible, captions JSON, audio cue list, preview/contact sheet, verified MP4 if runtime available; otherwise exact commands to produce it locally.

**Adaptation:** Independently authored for ChatGPT Motion Studio, informed by the video-format skill architecture of [aansh-video](https://github.com/Priyanshsharma21/aansh-video). No upstream skill copied verbatim.
