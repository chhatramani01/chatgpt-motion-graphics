---
name: motion-graphics
description: Make motion graphics and short videos as code (Canvas, SVG, Three.js) and render them to MP4 frame by frame. Use when the user asks for a video, animation, motion graphic, logo reveal, launch spot, explainer, lyric video or social clip.
---

# Motion graphics as code

You make videos by writing code that draws every frame, then rendering it frame by frame to MP4.
There is no video model. The quality comes from planning, timing and review.

## 1. Ask once, then work

If any of these are missing, ask for all of them in one message, then do not ask again:
- What should the viewer understand or feel by the end?
- Duration, aspect ratio (16:9, 9:16, 1:1, 4:5) and where it will play.
- Real facts, copy, brand colours, logo SVG, product UI or data. Never invent features, numbers or quotes.
- Audio: none, a track the user supplies (get the BPM), generated music, or voiceover.
- Style: one named style. If none is given, pick one and say why in one line.

## 2. Storyboard before code

Write a shot list and show it to the user before writing animation code:
- One row per shot: start time, end time, what is on screen, what the viewer must read, the transition out.
- List every "read" (a thing the viewer must notice) and give each its own slot. Fast actions, slow meanings.
- A hook inside the first second. Something happens in every shot. Hold the final frame 0.8 to 1.2 s.
- If there is music, put cuts and key hits on the beat grid. Not every beat gets a hit.

## 3. Build rules

- One `scene.html` that draws any moment on request. Expose `window.renderAt(t)` and also run a normal
  requestAnimationFrame preview loop that reads `performance.now()`.
- Every frame is a pure function of time. No counters that increment per frame, no unseeded `Math.random()`,
  no physics integrated step by step, no CSS transitions triggered by timers. Seed all randomness.
- `await document.fonts.ready` before the first frame. Load fonts locally or from a stable CDN.
- Write the style as numbers: hex colours, cubic-bezier curves, frame counts for staggers, grid margins.
- Keep text inside a 5% safe margin (middle 80% for vertical social video).
- Default avoid list unless the style asks for it: particle bursts, lens flares, neon glow, RGB split, glitch,
  bouncy easing on everything, decorative gradients, text that repeats what the picture shows.

## 4. Review before the full render

- Render a contact sheet: one frame per second (or per beat) tiled into one PNG. Open it and look.
- Check for: overlapping or clipped text, text on screen too short to read (about 0.3 s per word, minimum 1 s),
  dead time, fallback fonts, elements too small to see at phone size, black frames.
- Fix what you find, then render a half-resolution draft, then the final.

## 5. Render

Use a virtual clock: replace `performance.now`, `Date.now` and `requestAnimationFrame`, advance time by exactly
1/fps per frame, screenshot each frame, pipe the PNGs into ffmpeg. Reference script:
https://awesomeclaude.ai/claude-video-render.mjs

```bash
node claude-video-render.mjs scene.html out.mp4 15 60 1920 1080
ffmpeg -i out.mp4 -i track.mp3 -c:v copy -c:a aac -b:a 192k -shortest final.mp4
```

Never record audio from the browser. Mux the track with ffmpeg so sync is exact.

## 6. Report

Deliver the MP4 path, the storyboard as built, the style rules you followed, and the two weakest moments
with how you would fix them in another round.

---
Made by awesomeclaude.ai. Styles with copy-paste rules: https://awesomeclaude.ai/claude-motion-graphics

## 7. Studio extension: 86 source-specific style prompts + 46 format agents

**This is the authoritative top-level skill.** For each project select one creative format from `skills/<format>/SKILL.md` and one visual language from `styles/atlas/<style-id>/PROMPT.md`. The 86 prompts contain the original user-supplied detailed `data.js` visual, movement and explainer descriptions. Read the entire selected prompt before drawing. Use the *medium itself* for arrows, typography, diagram transitions and texture; do not recolor generic cards.

For direct ChatGPT conversation usage, paste `prompts/PASTE_IN_CHATGPT.md`. An instructional prompt does not install terminal tools. For filesystem-capable coding agents, this SKILL.md should live under the agent's recognized project skills directory. Direct ChatGPT users may need to attach the selected style and format files; a URL alone does not guarantee they have been read.

## 8. Audio and talking-character requirements

Audio and video use the same absolute seconds. When narration is supplied, first measure duration with `ffprobe`; acquire measured word start/end timestamps (e.g., Whisper) before scheduling captions, and clearly mark any estimated words. Preserve the user's exact transcript for text. For Hindi/Nepali use complete Devanagari fonts and prevent matra breaks. When music is supplied, analyze its BPM or exact beat locations; do not approximate a grid when usable audio tools exist. Only cue select hits; voiceover must remain intelligible. An RMS mouth-envelope is **approximate mouth motion**, not phoneme-accurate lip-sync. Use `ffmpeg` to combine generated SFX, licensed track and narration and validate audio/video with `ffprobe`.

## 9. Production gates and honesty

Create the shot list first. If the user explicitly requests approval, wait for their OK; otherwise show the plan and continue when the environment supports it. A shot is not accepted if its words are unreadable (at least 1 s and roughly 0.3 s per word), color contrast fails, or content is invented. Actually inspect contact-sheet pixels when tools permit; otherwise state that inspection was not possible. Render half-resolution draft then full resolution. Produce source scene, contact sheet and MP4 when tools permit; when they do not, give ready-to-run code and make no claims of a finished rendered file. The two weakest moments in the report must be real observations, not fabricated critique.

## 10. Local repository helpers

```bash
npm install
npx playwright install chromium
node scripts/contact-sheet.mjs examples/kinetic-typography/scene.html output/contact.png 8
node scripts/render.mjs examples/kinetic-typography/scene.html output/draft.mp4 8 30 640 360
node scripts/render.mjs examples/kinetic-typography/scene.html output/silent.mp4 8 60 1280 720
node scripts/sfx.mjs output/effects.wav
ffmpeg -y -i output/silent.mp4 -i output/effects.wav -c:v copy -c:a aac -b:a 192k -shortest output/final.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name -of json output/final.mp4
```

The repository's `scripts/render.mjs` accepts either `window.renderAt(t)` or legacy `window.seek(t)` and drives each frame by exact timeline position. Its render mode disables preview RAF callbacks; it does **not** rely on a wall-clock for captures. For compatibility it also provides `claude-video-render.mjs` with the requested 6-position CLI interface.
