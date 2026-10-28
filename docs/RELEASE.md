# v6 Engineering release report

## Audit outcome
The previous v5 repository mixed overlapping master skills, 86 duplicated short style files, 86 long director prompts, 46 format recipes, nine near-empty templates, repeated setup docs and duplicate style metadata. Most of those files were guidance, **not executable animation engines**.

## What was simplified
- One canonical master skill, mirrored solely where different agents actually discover it: `.agents/skills` for Codex/Antigravity and `.claude/skills` for Claude Code.
- Keep 86 complete style-specific `PROMPT.md` files and 46 optional video-format `SKILL.md` recipes. Delete duplicated 86 short `STYLE.md` files and the competing second master skill.
- One source of style metadata: `assets/atlas/styles.json`. Remove redundant `data.js` and make gallery load JSON.
- Remove placeholder templates and scattered outdated docs; consolidate into `docs/INSTALL.md` and `docs/WORKFLOW.md`.
- Rewrite README as a simple project map, with the original 86 linked reference posters in an expandable gallery.
- Add automated browser smoke tests for the actual rendering/audio stack, not just syntax/metadata checks.

## Tested scope
Continuous integration tests catalog completeness, YAML skill metadata, Node motion tests, Python speech tests, contact-sheet PNG creation, H.264 video rendering, SFX WAV, AAC audio mux and ffprobe stream checks. A passing CI run proves the **sample demo** runs in that environment, not that every one of 132 possible style/format combinations has been artistically implemented.

## Product compatibility
An agent skill is progressive instructions and optionally executable resources, NOT a hosted video model. Installing one can teach Codex, Claude Code or Antigravity to call the engine in an environment with Node, FFmpeg and Chromium. In ordinary ChatGPT a pasted prompt instructs the conversation; it does not activate a shell, install dependencies or promise MP4 output. For native ChatGPT Skills, use the product's supported skill import/install capability, when available.

## Known limitations
- The demo is intentionally short and illustrates the deterministic render/FFmpeg mechanism rather than all 86 looks.
- The repository does not ship a transcription model or third-party footage.
- Word alignment requires external tools, unmatched words are estimated, and RMS mouth animation is not phoneme-quality lip sync.
- Third-party Futurepedia posters and clips are linked, not bundled; they are not licensed for redistribution.
