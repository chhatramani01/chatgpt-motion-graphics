# Production workflow and rendering contract

## 1. Inputs → director's brief
Record audience/goal, duration, FPS, aspect/platform, supplied factual copy or brand assets, music/voice and selected style. Choose one `styles/atlas/<id>/PROMPT.md` and optionally one `skills/<workflow>/SKILL.md`. These references are not compiled shaders; an agent writes a new scene in code.

## 2. Storyboard before animation
Each shot has beginning/end in seconds, framing, action, exact text, what the viewer must notice, transition, corresponding spoken word/beat, and audio cue. Hook in first second, final hold 0.8–1.2 seconds. For explicit storyboard-first requests, **wait for approval**.

## 3. Code scene contract
A scene is a `scene.html` with **one canvas** and `window.renderAt(t)` (optional `seek` alias) that draws the entire requested frame from time `t` in seconds. It also has `window.DURATION`. Run RAF preview based on wall-clock time **only in preview mode**. Never use CSS animation, unseeded randomness, accumulated simulation state or `Date.now()` inside `renderAt`. Renderer awaits fonts/images and calls this function at i/FPS.

Renderer CLI:
```bash
node scripts/render.mjs <scene.html> <out.mp4> <duration-seconds> <fps> <width> <height>
```

**Resolution:** Scene must lay itself out for each aspect. Merely changing the output width/height cannot turn a widescreen design into a professional vertical one. The example scene intentionally demonstrates responsive re-layout.

## 4. Visual QA before full render
```bash
node scripts/contact-sheet.mjs examples/demo/scene.html output/contact.png 8
node scripts/render.mjs examples/demo/scene.html output/draft.mp4 8 30 640 360
```
Open and inspect the contact sheet; fix clipped text, font fallback, dead spots, tiny phone text, excessive easing and bad visual continuity before final.

## 5. Audio handling
Record measured word start/end timestamps when voice audio is supplied. `tools/transcribe.sh` uses externally installed Whisper; `tools/align.py` marks unmatched captions as estimated. The `tools/mouth.py` amplitude envelope is only rough mouth opening, not genuine phoneme-based lip sync. Mix/mux sound *offline* with FFmpeg. Do not record browser audio.

```bash
ffmpeg -y -i output/silent.mp4 -i track.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest output/final.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name -of json output/final.mp4
```

## 6. Deliver and report
Show storyboard as built, artistic rules, verified video/audio output, QC results and two genuinely observed weak moments. If the runtime cannot render, provide executable source and honest instructions; never invent an MP4 or claim to have watched a film that has not been inspected.

## Platform behavior
The same single core instruction is mirrored in `.agents/skills` and `.claude/skills` because of host discovery conventions. Ordinary ChatGPT can use the paste-ready prompt. Skill installation and shell execution must be granted by the hosting product.
