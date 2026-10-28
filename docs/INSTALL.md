# Install and use Motion Studio

## ChatGPT in the app or browser

**Option A — ordinary conversation, no installation needed:** open [the master prompt](../prompts/PASTE_IN_CHATGPT.md), copy it into a chat, and describe your film. For a named visual style, paste/upload the corresponding `styles/atlas/<id>/PROMPT.md` (for example [Whiteboard](../styles/atlas/whiteboard/PROMPT.md)) if ChatGPT cannot open the GitHub file.

**Option B — native skill support:** If your account/workspace provides the Skills interface, use its installation or import mechanism with the folder containing `SKILL.md`, and invoke the skill when appropriate. An ordinary GitHub URL is **not** a one-click installation and cannot grant FFmpeg or shell access. Where supported, use ChatGPT's skill selector or an uploaded skill package.

**Option C — ChatGPT Project instructions:** paste the master prompt into Project instructions and supply the selected style and workflow files. Treat this as instructions, not an executable plugin.

## Codex and Antigravity (workspace installation)

```bash
git clone https://github.com/chhatramani01/chatgpt-motion-graphics.git
cd chatgpt-motion-graphics
npm install
npx playwright install chromium
```

Open the directory as a workspace. Codex and current Antigravity discover `.agents/skills/motion-graphics/SKILL.md` automatically when the workspace is in scope. Say: **"Use motion-graphics to make a whiteboard 15s 9:16 explainer; storyboard first."**

For a skill installed to *another* project, copy the `motion-graphics` skill folder to that project's `.agents/skills/`, **and** copy the desired style/recipe references or keep a checkout of this repo available. A stand-alone SKILL.md without referenced files cannot load the whole catalog.

## Claude Code

Open the cloned repository in Claude Code. The skill is at `.claude/skills/motion-graphics/SKILL.md`. Ask for a film or use the agent's available skill invocation mechanism.

To put the skill in another project:

```bash
mkdir -p other-project/.claude/skills
cp -r .claude/skills/motion-graphics other-project/.claude/skills/
```

Again, also provide the relevant `styles/`, `skills/`, `scripts/` resources if you expect a full render pipeline.

## Render requirements and troubleshooting

**Required:** Node.js 22+, FFmpeg/ffprobe, Python 3 if using the speech helpers, Playwright Chromium.

```bash
npm install
npx playwright install chromium
npm run check
npm test
npm run demo
```

If Chromium is missing, run `npx playwright install chromium`; on Linux install its OS dependencies per Playwright's output. If FFmpeg is missing, install it through your OS package manager. If word timestamps are needed, install Whisper separately and set `WHISPER_MODEL` to a local licensed model file. No model is bundled.

The skills can plan and write code without local dependencies, but **video and sound outputs require execution**. Source videos, trademarked product UI and music must be supplied with rights cleared.
