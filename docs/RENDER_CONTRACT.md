# Rendering architecture and conformance — v5.1

## Source of main skill
The user supplied the six-stage **Motion graphics as code** skill credited to [awesomeclaude.ai](https://awesomeclaude.ai/claude-motion-graphics). It is reproduced as the top-level agent contract, with separately labeled ChatGPT Studio extensions. The original text is sourced to the user, not presented as proprietary production code.

## Main agent behavior
1. Ask one consolidated question when required; preserve exact supplied facts.
2. Write and show a per-shot storyboard prior to authoring code; wait for explicit approval if requested.
3. Encode medium-specific style in literal design tokens. Render pure frames from `window.renderAt(t)`. Preview with RAF + `performance.now()`. Seed all randomness and load fonts before captures.
4. Visually inspect a second-by-second or per-beat contact sheet. Each read lasts at least 1 second and about 0.3 sec/word; final frame 0.8–1.2 sec. Check black frames, low contrast and phone-size read.
5. Render half-size draft, then full-resolution MP4 by fixed-timestep Playwright screenshots streamed to FFmpeg. Mux separate audio through FFmpeg and validate streams.
6. Report paths, used style rules, actually observed two weak spots and possible fixes.

## Current renderer implementation
`scripts/render.mjs` and the compatibility CLI `claude-video-render.mjs` accept `scene.html output.mp4 duration fps width height`. Each sample time is an exact `i/fps` and the page is placed in a render mode that disables the live-preview RAF loop and substitutes fixed performance/date times. It calls `window.renderAt(t)`, falling back to legacy `window.seek(t)`. This is a deterministic-render contract: individual scenes must not start unscripted timers, WebGL animations or asynchronous effects.

The contact sheet script uses exact time jumps. `ffmpeg` is needed for tiling screenshots into PNG. Neither renderer records browser audio. External narration/music must be muxed separately.

## Remaining limitations
- ChatGPT standard conversations cannot install external runtime packages by pasting instructions alone.
- Output is one frame-at-a-time rendering, not generative AI video.
- Automated tests do not verify aesthetics; a human or vision-based review of final contact sheets is needed.
- The original reference CLI URL is for inspiration; this repo supplies its own independently implemented executable wrapper.
