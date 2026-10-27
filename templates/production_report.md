# Motion Graphics Studio — Post-Render QA Report

## Brief and approved storyboard
Project / source:
Intent / desired viewer feeling:
Aspect ratio / platform / duration / fps:
Chosen one of 86 styles:
Chosen one of 46 format workflows:
Brand data & verified sources:

| Time in | Time out | What viewer sees | Exact "read" (min 1s, ~0.3s/word) | Camera / transition out | Music, speech or SFX cue |
|---:|---:|---|---|---|---|
| 0.0 | 1.0 | Immediate meaningful hook | | | |
| ... | ... | | | | |
| final-1.0 | final | Closing payoff held 0.8–1.2s | | | |

## Numerical art direction
Colors (hex), typeface, spacing, 5% safe margins and vertical middle 80%:
Timing/easing curves, staggers and grid sizes:
Textures/medium-specific transitions:
Excluded generic effects:

## Render and evidence
- [ ] `window.renderAt(t)` deterministic, `window.seek(t)` alias optional
- [ ] RAF preview uses `performance.now()`; no real clock leaks into render
- [ ] Font loading completes before snapshots; phone-scale text legible
- [ ] Contact sheet PNG produced and **visually inspected**
- [ ] Half-resolution MP4 draft produced and inspected
- [ ] Full-resolution MP4 and optional AAC audio mux produced
- [ ] FFprobe verified H.264/AAC as required
- [ ] Narration matches actual measured word alignment (or estimated flags noted)
- [ ] Music edits/snaps anchored to measured BPM or beat markers

Files delivered (paths; do not invent):
Contact sheet:
Draft:
Final MP4:
Scene source and sound cues:

## Two weakest moments, based on actual review
1. Timestamp: ; defect observed: ; next-round solution:
2. Timestamp: ; defect observed: ; next-round solution:

## Honest limitations and credits
Name checks that were not run, unavailable dependencies, rights of input media, and third-party inspirations.

*Original core rules provided by the user, credited to awesomeclaude.ai and supplemented by ChatGPT Motion Studio workflow conventions.*
