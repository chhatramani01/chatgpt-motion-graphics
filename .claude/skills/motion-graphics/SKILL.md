---
name: motion-graphics
description: Create motion graphics, explainers, logo reveals, lyric videos and social clips as deterministic Canvas/SVG/Three.js code; storyboard, review frames and render MP4 with FFmpeg when runtime tools are available.
---

# Motion graphics as code

**Read this first.** You generate each frame through code, not an AI video generation model. A skill supplies instructions; it does not grant rendering tools, image/video rights, installed models or access to external media.

## 1. Ask once, then work

If essential information is missing, ask once for the goal or feeling, duration, aspect ratio and platform, required factual copy/brand assets, audio source and named visual style. Do not re-ask answered questions. If enough context exists to proceed, use reasonable defaults (12s, 16:9, 30fps, no music) and explain the chosen style in one line. Never invent performance figures, quotes or product UI.

## 2. Read references only when relevant

- Visual styles: `../../../styles/atlas/<style-id>/PROMPT.md` (86 distinct visual grammars; choose one).
- Format workflows: `../../../skills/<format>/SKILL.md` (46 optional specialist recipes).
- Rendering/QA instructions: `../../../docs/WORKFLOW.md`.
- Speech helpers: `../../../tools/` and `undefined`.
Use *one* primary style plus at most one format workflow. Do not load all 86 prompts into context. These are creative specifications, **not** 86 working animation engines. Refer to the repository root for paths if this skill was copied independently, and request the relevant companion files when absent.

## 3. Storyboard before code

Write a shot table with **start, end, camera/scene, precise on-screen text, required viewer read, transition, audio cue**. Put a hook in the first second and hold the finished final frame for 0.8–1.2 s. Allow at least 1s for a readable text group and approximately 0.3s per word; pace meanings more slowly than physical actions. For music, measure the actual BPM/beat grid and land *selected* cuts/hits on beats. **Show the storyboard first**. When user explicitly asks for approval, stop and wait; otherwise proceed with best effort in the same session.

## 4. Design and build

Build a self-contained `scene.html`, exposing `window.renderAt(t)` and optionally `window.seek(t)`. Preview in a normal browser with `requestAnimationFrame` driven by `performance.now()`. Every exported frame is a pure function of time: no history-dependent simulation, accumulating counters, unseeded `Math.random`, or CSS timer transitions. Await `document.fonts.ready` and loaded assets. Style rules must be explicit: hex colors, typography, grid/safe areas, easing, stagger frames, medium-specific material and shot transitions. Maintain 5% safe margins and avoid UI overlays at the top/bottom of vertical social video. Avoid default "AI slop": arbitrary particles, lens flare, RGB glitches, neon/glow, frequent identical fades and purposeless kinetic text. For 9:16 and square output, **re-layout** instead of stretching a 16:9 composition.

## 5. Review and render

Before final output, create and visually inspect a contact sheet (one frame per second or beat) and inspect motion around transitions. Catch clipped/missing text, wrong fonts, unsafe margins, unreadable phone-scale content, blank frames and dead holds. Fix observed issues. Render a **half-resolution draft first**, then a full-resolution H.264/yuv420p final. Use the local deterministic renderer and FFmpeg; do not screen-record the browser or claim the render occurred without file verification.

```bash
npm install
npx playwright install chromium
npm run check
npm test
node scripts/contact-sheet.mjs examples/demo/scene.html output/contact.png 8
node scripts/render.mjs examples/demo/scene.html output/draft.mp4 8 30 640 360
node scripts/render.mjs examples/demo/scene.html output/silent.mp4 8 30 1280 720
# User-supplied or independently cleared soundtrack; example:
ffmpeg -y -i output/silent.mp4 -i assets/voice.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest output/final.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name -of json output/final.mp4
```

The renderer advances time by exact `1/fps` steps; it never records browser audio. Audio must be mixed/muxed offline. Speech captions need real word timings; if unavailable, mark any timings estimated. Mouth-open RMS animation is *approximate*, not phoneme-level lip sync.

## 6. Report honestly

Give final MP4, contact sheet and source links **only for verified files**. Include the built storyboard, style rules, QA checks, and **two actual weak moments with proposed fixes** after reviewing the rendered clip. State clearly if browser rendering, contact-sheet inspection or audio verification was not possible.

## Compatibility

Codex / Antigravity workspace path: `.agents/skills/motion-graphics/SKILL.md`. Claude Code workspace path: `.claude/skills/motion-graphics/SKILL.md`. ChatGPT supports skills when explicitly installed through its supported UI; for ordinary chats without a connected skill, use `prompts/PASTE_IN_CHATGPT.md` as a paste-ready instruction set. **A GitHub URL by itself is not an installation.**

## Credit

Six-stage production workflow adapted from user-supplied [awesomeclaude.ai motion graphics skill](https://awesomeclaude.ai/claude-motion-graphics). Specialist-workflow architecture informed by [aansh-video](https://github.com/Priyanshsharma21/aansh-video). Style descriptions originate from the user-supplied Futurepedia-style dataset. Do not redistribute third-party reference media.
