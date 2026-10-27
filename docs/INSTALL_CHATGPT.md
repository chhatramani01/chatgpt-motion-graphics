# Use and install the Motion Studio skill — ChatGPT-first

## Method 1: Use now in regular ChatGPT
1. Open [complete ChatGPT master prompt](../prompts/PASTE_IN_CHATGPT.md).
2. Copy from **BEGIN PROMPT** through **END PROMPT** and paste into a fresh chat.
3. Ask: "Create a 15-second Vertical Whiteboard Explainer about how linear regression works, with timed sound effects. Storyboard first."
4. For best results include links/files to the selected [visual style prompt](../styles/atlas/whiteboard/PROMPT.md) and [video workflow](../skills/podcast-explainer/SKILL.md). ChatGPT may not automatically read all repository files; attach files when needed.

The instruction is active for that conversation, **not** an installable global native skill. For output as an MP4, your ChatGPT mode must have rendering/execution support; otherwise it provides runnable source.

## Method 2: ChatGPT Project or customized GPT
Put master prompt into project/custom GPT instructions (where supported). Include core skill, selected format and chosen style in files/knowledge; the GitHub URL alone is not guaranteed to fetch its code into the chat. Keeping the entire library in a Project may exceed attachment limits, so supply individual styles.

## Method 3: Terminal-based coding agent (full MP4)
```bash
git clone https://github.com/chhatramani01/chatgpt-motion-graphics.git
cd chatgpt-motion-graphics
npm install
npx playwright install chromium
npm run check
npm run test:motion
npm run demo
```

Prerequisites: Node.js 22+, Python 3.10+, FFmpeg/ffprobe. For optional voice transcription install whisper.cpp's `whisper-cli`, download an appropriate GGML model and set `WHISPER_MODEL=/path/to/model.bin`. For a basic timing workflow:
```bash
mkdir -p output
bash tools/transcribe.sh my-voice.mp3 en > output/whisper.json
python3 tools/align.py script.txt output/whisper.json output/words.json
python3 tools/mouth.py my-voice.mp3 output/mouth.json
```

For agents implementing the Agent Skills convention, put the `.agents/skills/motion-graphics` folder in the project's recognized skill discovery path. For tools specifically recognizing Claude-compatible folders, `.claude/skills/motion-graphics` is provided. Neither folder automatically installs a native in-app ChatGPT skill.

## Quick GitHub-aware installer prompt for ChatGPT
> Use my ChatGPT Motion Studio repository: https://github.com/chhatramani01/chatgpt-motion-graphics . Load `prompts/PASTE_IN_CHATGPT.md`, choose one `skills/<workflow>/SKILL.md`, then one `styles/atlas/<style-id>/PROMPT.md`. If inaccessible, say which files I should attach. Create a time-coded storyboard, deterministic seek(t) code, exact word-aligned captions when source audio exists, sparse SFX timed to actual actions, real audio mux and contact sheet review. Render only if tools permit; otherwise give complete runnable code. Storyboard-first requests require approval before animation.
