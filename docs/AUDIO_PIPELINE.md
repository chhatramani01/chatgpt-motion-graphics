# Audio and sound design

All SFX timestamps must follow the visual beat sheet. Demo: `node scripts/sfx.mjs output/effects.wav`. With narration, normalize speech separately and duck effects underneath; sample FFmpeg command:

```bash
ffmpeg -i output/silent.mp4 -i narration.wav -i output/effects.wav -filter_complex "[1:a]loudnorm=I=-17:TP=-2[voice];[2:a]volume=0.4[fx];[voice][fx]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest output/final.mp4
```

This is a static low-level mix, not adaptive ducking; for production-quality adaptive ducking use `sidechaincompress` after normalizing sources, then measure integrated LUFS and inspect the timeline. When SRT or spoken-word timestamps are provided, tie visual appearances to actual spoken words, not estimated pacing. Verify both video and audio streams using ffprobe.
