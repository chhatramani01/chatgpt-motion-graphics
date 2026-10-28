# Motion Studio

**Code-rendered motion graphics for ChatGPT, Codex, Antigravity and Claude Code.**

[![CI](https://github.com/chhatramani01/chatgpt-motion-graphics/actions/workflows/validate.yml/badge.svg)](https://github.com/chhatramani01/chatgpt-motion-graphics/actions/workflows/validate.yml)
![Styles](https://img.shields.io/badge/visual%20styles-86-blue)
![Recipes](https://img.shields.io/badge/video%20recipes-46-orange)
![Node](https://img.shields.io/badge/node-22%2B-brightgreen)

**Start here:** [ChatGPT paste-ready prompt](prompts/PASTE_IN_CHATGPT.md) · [Install on your agent](docs/INSTALL.md) · [Production and render guide](docs/WORKFLOW.md) · [Interactive style gallery](gallery/index.html)

> The skill is a set of production instructions and a sample code-rendering harness. It is **not** a video-generation model and it does not grant ChatGPT a terminal. Only claim MP4 output after actually running FFmpeg. All 86 styles are *detailed creative prompts*, not 86 individual executable engines.

## What you can make

Write: **"Make a 15s 9:16 whiteboard explainer about linear regression. Storyboard first. After approval, add marker foley and word-synced captions."**

The agent follows one coherent workflow:

**Brief → timed storyboard → original deterministic `renderAt(t)` → contact sheet → half-resolution draft → final H.264 MP4 → audio mux → QA report.**

Choose **one** of the 86 visual looks, and optionally one of the 46 specialist video recipes. We keep these as on-demand reference files to avoid filling the agent's context with hundreds of unnecessary skill descriptions.

## Install & use

| Environment | How it discovers the skill | Result |
|---|---|---|
| **ChatGPT chat** | Paste [the ChatGPT prompt](prompts/PASTE_IN_CHATGPT.md) or attach the skill/reference files; a native skill must be installed through the supported product UI | Storyboarding, creative direction and code; MP4 only if execution tools are available |
| **Codex** | Open this repository; reads `.agents/skills/motion-graphics/SKILL.md` | Agent can run local scripts when execution is authorized |
| **Antigravity** | Open this workspace; also uses `.agents/skills/motion-graphics/SKILL.md` | Agent can run the same local workflow |
| **Claude Code** | Open this repository; reads `.claude/skills/motion-graphics/SKILL.md` | Agent can follow the same pipeline |

No global copying is needed when using the full repository as a project. For standalone install, see [installation instructions](docs/INSTALL.md).

## Render the demo locally

Requires **Node.js 22+**, **FFmpeg/ffprobe**, and **Playwright Chromium**.

```bash
git clone https://github.com/chhatramani01/chatgpt-motion-graphics.git
cd chatgpt-motion-graphics
npm install
npx playwright install chromium
npm run check
npm test
npm run demo
```

The demo creates `output/demo.mp4` (H.264 + AAC sound). To generate the review contact sheet and a quick low-res draft:

```bash
npm run sheet
node scripts/render.mjs examples/demo/scene.html output/draft.mp4 8 30 640 360
```

The video engine supports `window.renderAt(t)` with a real browser preview and deterministic frame-by-frame export. Captions and voiceover workflows are optional, with honest limits for estimated timings and approximate RMS mouth animation.

## Why there are files

```text
.agents/skills/motion-graphics/SKILL.md   # Main entry for Codex / Antigravity
.claude/skills/motion-graphics/SKILL.md   # Same skill for Claude Code
prompts/PASTE_IN_CHATGPT.md               # Direct plain-chat instructions
styles/atlas/<id>/PROMPT.md              # 86 detailed visual references
skills/<id>/SKILL.md                     # 46 optional video-format recipes
assets/atlas/styles.json                 # One source of metadata and image links
gallery/index.html                       # Searchable gallery
examples/demo/scene.html                 # Working example
scripts/                                  # Deterministic renderer, contact sheet, SFX, checks
tools/                                    # Optional audio transcription/alignment/mouth
docs/                                     # Platform setup, workflow and release notes
```

Files have different purposes. Only **one main skill** is active in each agent environment; style/recipe files are selected on demand. No third-party images or videos are included in the repository. External posters below remain hosted by their rights holders.

## 86 visual references

<details>
<summary><strong>Expand complete visual style gallery (86 posters, guides and motion clips)</strong></summary>

| # | Style director prompt | Category | Poster | Reference clip |
|---:|---|---|---|---|
| 1 | [Flat-Vector Science](styles/atlas/flat-space/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T17-53-08.519Z-iKhLKA7PdonZWchY1Ix-ZsPYOQTNMUmoo.jpg" width="170" alt="Flat-Vector Science preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T17-53-11.439Z-CvJAHQUhvJN9KWLCiSn4KPEN5v_dhFwrZ.mp4) |
| 2 | [Watercolor Wash](styles/atlas/watercolor/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T17-53-17.050Z-8S6H9IkjMdwoXrf_K1X8M8ELfnrPU6jEH.jpg" width="170" alt="Watercolor Wash preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T17-53-18.619Z-WPCQ-tn4C1bLZBKUhEWawWHANEibu20rQ.mp4) |
| 3 | [Shadow Puppet Theatre](styles/atlas/shadow-puppet/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T17-53-21.873Z-ZciYbkN0vXDvvkkwp-tg0i62_3aji1JvY.jpg" width="170" alt="Shadow Puppet Theatre preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T17-53-22.899Z-AGhnmeCSaxQPZ-NM3vBI-G_nwCqw_D5qW.mp4) |
| 4 | [Whiteboard Explainer](styles/atlas/whiteboard/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T17-53-26.558Z-GJPCWRQpkzIbYGsIq1GYDSyGZPyJcQquP.jpg" width="170" alt="Whiteboard Explainer preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T17-53-26.970Z-UaduH1TrhJ4kKpuF6o2bJ1ge_Ctg0k4O4.mp4) |
| 5 | [Psychedelic Poster](styles/atlas/psychedelic/PROMPT.md) | Cosmic & Psychedelic | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-02.956Z-AlI0ZCs8eH4H3UEKi4O1spmpE4apy0TAk.jpg" width="170" alt="Psychedelic Poster preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-04.266Z-mG1jHow54j6UXMjRr7R6ny1ANG1ZcNZQk.mp4) |
| 6 | [Tech Glow Explainer](styles/atlas/tech-glow/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-10.856Z-pHfRcqeubhlhkT2P-Ra4bTCB1YJZwClTO.jpg" width="170" alt="Tech Glow Explainer preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-11.734Z-cQ0e8i8GfdaEQ05mMQEV5F7k51ApFDJd5.mp4) |
| 7 | [Papercraft Models](styles/atlas/papercraft/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-14.844Z-lu1tBs7cSTGmLc881MFWbSeHQHS3w9YsT.jpg" width="170" alt="Papercraft Models preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-15.133Z-AThjundZ1pWvpPg_6iL-ijOlooowzGasK.mp4) |
| 8 | [1940s Film Noir](styles/atlas/film-noir/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-18.443Z-4mMn6gmnz43ovxg49xXsIC61JYnI6zW1G.jpg" width="170" alt="1940s Film Noir preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-18.782Z-EeRbajg_aFZwKxPC5HOOq2HGYD_pCnPE2.mp4) |
| 9 | [Manim-Style Math](styles/atlas/math-anim/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-22.496Z-4EaGwT4BPxquRqJrIqugxaJxk8DCoBB4U.jpg" width="170" alt="Manim-Style Math preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-22.860Z-K4CtoOXK48NBdoixjF4bZIecZJGjuW7dK.mp4) |
| 10 | [Illuminated Manuscript](styles/atlas/illuminated/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-25.398Z-DIqbTmCuiPzXuA9f7tjVt5DtUzF_ORYDg.jpg" width="170" alt="Illuminated Manuscript preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-25.719Z-XTGpp65sMkJauJ21rfMm-thLeKFGicRk2.mp4) |
| 11 | [Editorial Essay Collage](styles/atlas/editorial-collage/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-29.036Z-e1rUhDLSMZek43GbGTWXKO25lqTQXfYn_.jpg" width="170" alt="Editorial Essay Collage preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-29.360Z-U8VTLilp9Ju5dz6nLp84lhiAwXw65C359.mp4) |
| 12 | [Bioluminescent Deep Sea](styles/atlas/deep-sea/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-32.270Z-LwlBzDVnX8d0NmrDMooBuX8aO5kkLJLQ4.jpg" width="170" alt="Bioluminescent Deep Sea preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-32.557Z-A7zfzwUIr0LXxY10m8M76uNpb_exQ0zB0.mp4) |
| 13 | [Product Launch Reveal](styles/atlas/product-launch/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-35.412Z-tJ7otiELc-RyPkKjAmqts0BkrN-ofxaCh.jpg" width="170" alt="Product Launch Reveal preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-35.697Z-7R0-hd95tRc4uk852KYQLDHjsVbz0ffsT.mp4) |
| 14 | [Halftone Pop Panel](styles/atlas/halftone-pop/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-38.458Z-k7IBGVwqRoAcdvOqL1o5hOivkNjoQueCl.jpg" width="170" alt="Halftone Pop Panel preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-38.789Z-Csvk1F-OLUyvJj84j6n48HGImfZciSjql.mp4) |
| 15 | [Isometric Pastel](styles/atlas/isometric/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-41.521Z-0zhdWtHJe4zUQH2BRaaMWguBxwX51lWxm.jpg" width="170" alt="Isometric Pastel preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-41.805Z-19tf6Sqc0wT2rBtxZg4uKesRsD0fIKGCQ.mp4) |
| 16 | [Oscilloscope Vector Art](styles/atlas/oscilloscope/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-45.496Z-0dpx6Y3d7Z5hHILrFP1lVG0IAqwTKCRIz.jpg" width="170" alt="Oscilloscope Vector Art preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-45.801Z-GFh7jjuUrZ_qRyobWbJceRwGysAzWb5O6.mp4) |
| 17 | [Risograph Zine](styles/atlas/risograph/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-48.581Z-P7q5W6QKKa3NLIYa4a5dZZunYjHGYa4eR.jpg" width="170" alt="Risograph Zine preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-48.870Z-j8-kjoPVn-MlhFcd8-XeaR6raVq4Z_Vby.mp4) |
| 18 | [Claymation Set](styles/atlas/claymation/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-51.776Z-D7BP4aXq6kwj6T0W_TMY1orQ9vLVImyJi.jpg" width="170" alt="Claymation Set preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-52.140Z-NJ0EccxTIVLGs5gfUNf9ARu84b991Xa1U.mp4) |
| 19 | [Neon Sign at Night](styles/atlas/neon-sign/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-54.610Z-UUe_XvwOffOV8TH3rZFRjD5mgL3P-lr52.jpg" width="170" alt="Neon Sign at Night preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-54.926Z-ytEaNR8_zS4yro7vQZTWjFKD2s8AR2o2R.mp4) |
| 20 | [Kawaii Anime](styles/atlas/kawaii/PROMPT.md) | Popular Explainer Looks | <img src="https://cdn.futurepedia.io/2026-10-14T18-15-57.660Z---Du4Zm4cBUwtGysnrY44PPI_gYAprmKX.jpg" width="170" alt="Kawaii Anime preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-15-57.949Z-DnA67G7oMtCOIf5yy1qSYbwxNUbPK71gi.mp4) |
| 21 | [Ukiyo-e Woodblock](styles/atlas/ukiyo-e/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-00.674Z-ucsEI8aPiD-7dbY_fwZUrg7kyO-2SgeYl.jpg" width="170" alt="Ukiyo-e Woodblock preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-00.983Z-3h7D5bjlxSTZB5vybZv0aODt_JLu8_YXC.mp4) |
| 22 | [16-Bit Pixel Odyssey](styles/atlas/pixel-16bit/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-03.691Z-0m8IEK4DXmaeiWyWEKS9wZxA1DO_WPs8_.jpg" width="170" alt="16-Bit Pixel Odyssey preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-04.044Z-E3CbodjYQkQvEBL6nzqpmt6WY7GiYeQFg.mp4) |
| 23 | [Chalkboard Lesson](styles/atlas/chalkboard/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-06.763Z-V-YGv7tusHhjuJX5G196ArNeQD0l5EIuk.jpg" width="170" alt="Chalkboard Lesson preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-07.043Z-EjoFyOTr_xwN5Iyxn5qq2GJBAW2zLYAtI.mp4) |
| 24 | [Cut-Paper Diorama](styles/atlas/cut-paper/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-09.941Z-n42A4w4HvxLSpK3oYckFf3BIHgWNCZbMR.jpg" width="170" alt="Cut-Paper Diorama preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-10.228Z-SttAA70B40EGLz08V_O5iKhh6R6O59gQ3.mp4) |
| 25 | [Cathedral Glass](styles/atlas/stained-glass/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-12.789Z-38gvyMItXbjqtiaZs2Ytt6VdD7sVrUAZF.jpg" width="170" alt="Cathedral Glass preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-13.063Z-z7rqkw9xP8R-sgn0y4Y_zreMnB4_4yiYY.mp4) |
| 26 | [Editorial Chart](styles/atlas/editorial-chart/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-15.841Z-Pw8Jag0ynf-IFMVbFUcb7TgugkZjp_PVY.jpg" width="170" alt="Editorial Chart preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-16.121Z-eyvDgonQhnQIw-64pz-kVXB_x4XHx4maB.mp4) |
| 27 | [Synthwave Outrun](styles/atlas/synthwave/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-18.877Z-jQW70VJTWnMW1jakjqgDOXHH5ckjgOtdz.jpg" width="170" alt="Synthwave Outrun preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-19.192Z-r9Y-mxoggoOePI7OEKMagvkRxW4VH3FaH.mp4) |
| 28 | [Origami Studio](styles/atlas/origami/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-21.908Z-aGt7Thz8N3IG2ZC-WPFnBxxbIgFqmjBBa.jpg" width="170" alt="Origami Studio preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-22.158Z-7xgHvc_XCPjPD0kuxrV7Vo2Yxt7LengZw.mp4) |
| 29 | [Linocut Relief Print](styles/atlas/linocut/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-24.941Z-nBeKyLyMn9kx5h311yagWhiIj6RX_fpkp.jpg" width="170" alt="Linocut Relief Print preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-25.242Z-6gH9gsSlNU1JVMililvOJR7jOeVEyxvVG.mp4) |
| 30 | [Holographic Foil Card](styles/atlas/holographic-foil/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-28.052Z-iCmtUKkZQmzA691vXR4FD_CfkmvooinWk.jpg" width="170" alt="Holographic Foil Card preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-28.320Z-m1YM-eCVeXRkf5VBPaWbuoAK_S6f4aauE.mp4) |
| 31 | [Voxel Diorama](styles/atlas/voxel/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-31.016Z-IVSbKO1OpMh4pSSKP6BzXTYA3Ebtg48vK.jpg" width="170" alt="Voxel Diorama preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-31.282Z-yhNi79jsp7gZaHEJDbt2goFiKXAOqH6uf.mp4) |
| 32 | [Sumi-e Ink Wash](styles/atlas/sumi-e/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-34.054Z-t8z_GUBvfk9IX6roXRoYnh0arXWFAnuhZ.jpg" width="170" alt="Sumi-e Ink Wash preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-34.318Z-1q5aRcXcIGCto5zLIM0e4cRoAst3dcQQf.mp4) |
| 33 | [Etch A Sketch Toy](styles/atlas/etch-sketch/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-37.266Z-KfoxXwNa-5Fb2J4Vj5l7lr3X5rMvDJRlL.jpg" width="170" alt="Etch A Sketch Toy preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-37.621Z-9JRHYveqleD6iZIf8X8wXDgflU9CXtEP_.mp4) |
| 34 | [Cosmic Star Chart](styles/atlas/cosmic/PROMPT.md) | Cosmic & Psychedelic | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-40.132Z-aUHxEQDCLX2v09WB9Y4MFJLqHEuy6Q1eL.jpg" width="170" alt="Cosmic Star Chart preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-40.401Z-wS2OIfKrtbjZ10tGM1_fl8vUSIoeegGJu.mp4) |
| 35 | [Punk Zine Collage](styles/atlas/collage-zine/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-43.134Z-gbtocxaMYyBZV1MEHPPwxIIJyJd378zd4.jpg" width="170" alt="Punk Zine Collage preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-43.420Z-clNIgw36RdyZUWJseqEWWlhREeSB3Tr7O.mp4) |
| 36 | [Thermal Camera](styles/atlas/thermal-camera/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-46.298Z-6z2fdGR-NYNAZUflSDC04gQeb3xf8c-mQ.jpg" width="170" alt="Thermal Camera preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-46.787Z-30jW4VWlge1UfbZh_E1iijEhDwh9q-U3r.mp4) |
| 37 | [Engineering Blueprint](styles/atlas/blueprint/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-49.237Z-cXbKaiCZgYEB3a4L2VypmzZ-I272G0jq7.jpg" width="170" alt="Engineering Blueprint preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-49.541Z-yygNR7hSxStDDfQ_j8WIGq5i_BuJw1D8B.mp4) |
| 38 | [Impasto Night](styles/atlas/impasto-oil/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-52.236Z-yHmtLw_nBm2jNEzb-7-fGqpWe7BNSmpkn.jpg" width="170" alt="Impasto Night preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-52.530Z-n_TntdwjR-jk3mkAeqM7nxDZr7dR82pwc.mp4) |
| 39 | [Win95 Desktop](styles/atlas/win95/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-55.245Z-Twg1Klss4JYtnxPCFaNQ-oALZ7JLUHksY.jpg" width="170" alt="Win95 Desktop preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-55.524Z-iJe5X9PDXtZeaSmJSPAHXhN4MomWnETcE.mp4) |
| 40 | [Low-Poly Faceted](styles/atlas/low-poly/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-16-58.291Z-g5qzTInNHPbIkgPHokcc8tPFKedarxMyE.jpg" width="170" alt="Low-Poly Faceted preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-16-58.562Z-oEd5HSBhJz4Wa5sEfBvspN_wymLVxAn8C.mp4) |
| 41 | [Manga Page](styles/atlas/manga-panel/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-01.350Z-GxJVMmAiSceqb5A1gx_Dv-cA0TPqoIR_Y.jpg" width="170" alt="Manga Page preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-01.676Z-jNk0RuWnmgxkNZKstjQW0zY52o9mBErFL.mp4) |
| 42 | [Wood Type Letterpress](styles/atlas/letterpress/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-04.382Z-nSu3mxc33EceLeIN67FQ4Si_jZ3dGvimS.jpg" width="170" alt="Wood Type Letterpress preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-04.668Z-97peS_0g5PvxADnN9B3DqlzKJ5D-TufyX.mp4) |
| 43 | [Light Painting](styles/atlas/light-painting/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-08.294Z-7Pm_6sphUawxYIMKuU3Ny4xgj-27ND_hb.jpg" width="170" alt="Light Painting preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-08.574Z-YwTniTOHGahL2UUt6-cLAHtkhDqpwjciP.mp4) |
| 44 | [Felt & Patchwork](styles/atlas/felt-quilt/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-11.517Z-a_du0wcmZzbRjH0KHVnMz2LxpmqcYVjX7.jpg" width="170" alt="Felt & Patchwork preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-11.815Z-1YiChScowk9Gily8o6L2rwHudPZkaZH0e.mp4) |
| 45 | [Phosphor Terminal](styles/atlas/crt-terminal/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-14.736Z-xJWE5tFKYvyY-LhFCtd5tuK2l_JC2rTUr.jpg" width="170" alt="Phosphor Terminal preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-15.007Z-IjKI2ywm76p4Ay6t5Mhixc7hT2GTw-xo9.mp4) |
| 46 | [Glassmorphism UI](styles/atlas/glassmorphism/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-17.550Z--gh39TPFIkRoBqLGrnsgh4yVFamTvtZdw.jpg" width="170" alt="Glassmorphism UI preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-17.822Z-M1kPDdCxE1uoxEUTeTeIL0ENjhtamsctr.mp4) |
| 47 | [Tarot Card](styles/atlas/tarot-card/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-20.585Z-gIdaelO2AZHJrtk0HmaUT3Ht8d5TfOjl6.jpg" width="170" alt="Tarot Card preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-20.914Z-dJorHOtK1jN1NDKCUDxozzta8dQayNmoG.mp4) |
| 48 | [Transit Map](styles/atlas/transit-map/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-23.687Z-IS3P2ydo1NCtQBVrqiNyBcdhWS7s-KSYq.jpg" width="170" alt="Transit Map preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-23.963Z-YdS7tZr-pu9H8XlMZ8K3qFzWgW0ZF48y8.mp4) |
| 49 | [Gouache Travel Poster](styles/atlas/gouache-poster/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-26.645Z-XqoKfnSy5z3AXpfQZhGMlLk8bESTCq_sL.jpg" width="170" alt="Gouache Travel Poster preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-26.943Z-PoVAe7O2SxkU5G5xtQuplHVMa_3AGbYWC.mp4) |
| 50 | [Napkin Sketch](styles/atlas/napkin-sketch/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-29.674Z-_7RbqQ-zruSIWQaKtA99e7Et4xo3rTCW8.jpg" width="170" alt="Napkin Sketch preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-29.960Z-6U7AdxVUZiLh5mP7aKaU7dtdQncjl5rNz.mp4) |
| 51 | [Art Deco Foil](styles/atlas/art-deco/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-32.718Z-23liY10-TDIDMg2V-mUdBBBLThXFHE8xT.jpg" width="170" alt="Art Deco Foil preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-33.002Z-etbADtcwGJI2Gdn_OAbF8xUEleQk1EnRP.mp4) |
| 52 | [Radiograph on Lightbox](styles/atlas/x-ray/PROMPT.md) | Light & Imaging | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-35.757Z-YdeSH0KSvf-wRGY4yLJIShap2XDKAH-6D.jpg" width="170" alt="Radiograph on Lightbox preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-36.055Z-RJnyuSAJoJDx2I11qmDd0q_AIhwQyuvNN.mp4) |
| 53 | [Vaporwave](styles/atlas/vaporwave/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-38.752Z-GBVHWJ6Ylq3stDmwufplGdKkdJ26BwAhy.jpg" width="170" alt="Vaporwave preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-39.025Z-2-XxyVGSvMGWIAA37Izc_OouFzQYf2gaC.mp4) |
| 54 | [Ebru Paper Marbling](styles/atlas/paper-marbling/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-41.800Z-fh_Jbf8R15WqzFkAjSQV6iVzPHqy8eanB.jpg" width="170" alt="Ebru Paper Marbling preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-42.089Z-Kgbbjyl083dYW1z8RghFEkh0Nm0otY_QL.mp4) |
| 55 | [ISOTYPE Pictograms](styles/atlas/isotype/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-44.828Z-fapoH9_8DS-ZlUQ2cbgsOWSk_vSAMdgjA.jpg" width="170" alt="ISOTYPE Pictograms preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-45.103Z-BoQBR-ZPGpNJdpjPH2TPtdVSxPXYOz7ms.mp4) |
| 56 | [Soft 3D Clay](styles/atlas/soft-3d/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-48.872Z-1rYJJ41bKoysttMnzd4OayoFeqK_lquVj.jpg" width="170" alt="Soft 3D Clay preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-49.130Z-badX3NJZwK65EurrKsLs-SWin9i9OAkeq.mp4) |
| 57 | [Cross-Stitch Sampler](styles/atlas/cross-stitch/PROMPT.md) | Paper & Craft | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-52.136Z-b27x4BKiWTeEyGW4qBQq0IIgyvQeuReKI.jpg" width="170" alt="Cross-Stitch Sampler preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-52.426Z-QcEQE4k5NfP2mGAtgSNQy7vFSgmc60OaK.mp4) |
| 58 | [Constructivist Propaganda](styles/atlas/constructivist/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-54.998Z-w6-EdGBpfXLcW3fw5P_juk7gqJukI_VXW.jpg" width="170" alt="Constructivist Propaganda preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-55.280Z-uGpAUT1qoE9qtsib6XP7XongW7xdQACuT.mp4) |
| 59 | [Pocket Monochrome](styles/atlas/gameboy/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-17-58.003Z-JG1BisnKbZsB5iMNwhhXVpvoIrZAEP8tv.jpg" width="170" alt="Pocket Monochrome preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-17-58.286Z-JqhDq7U9tMHiiYdRjkIMZKQ0M4a3ocUnC.mp4) |
| 60 | [Botanical Plate](styles/atlas/botanical-plate/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-00.984Z-jHX4BA7h-iOlmPdK15pOg0y1ttpFcZZMu.jpg" width="170" alt="Botanical Plate preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-01.262Z-5zqb4-30b_p5Ctk-saxCrELghSGdpPwe-.mp4) |
| 61 | [Kinetic Type](styles/atlas/kinetic-type/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-04.083Z-TRYyDyn_sh-Wn7uwYUV09jxuYtYg6y0IH.jpg" width="170" alt="Kinetic Type preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-04.370Z-muX_wXYTsj9nUThwzvi8ZEfVYZ0Wrw_hj.mp4) |
| 62 | [Byzantine Mosaic](styles/atlas/mosaic/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-07.074Z-i37eF1ZRTfhgvYaULGRfS_f4X_w1CjGIt.jpg" width="170" alt="Byzantine Mosaic preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-07.365Z-So1TVPt4reiUg4pOOEyOv8PaMiz61XLP8.mp4) |
| 63 | [Y2K Liquid Chrome](styles/atlas/y2k-chrome/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-10.116Z-aDZmcYJ2qDyLOeNi7rD7EDE9IusLpjgqx.jpg" width="170" alt="Y2K Liquid Chrome preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-10.476Z-abOYFFEHYZPghDwarXYgIHFCjfCqJdA8g.mp4) |
| 64 | [Sticky-Note Wall](styles/atlas/sticky-notes/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-13.142Z-XRGR5p5W16fzWL21uFQ7tOHIy9Y3SK9SL.jpg" width="170" alt="Sticky-Note Wall preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-13.436Z-GHqCs4lHZtdgXoEOPnKW86IGtlMvl4rln.mp4) |
| 65 | [Vintage Newsprint](styles/atlas/newsprint/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-16.158Z-f-fQHvix0WRXa0hvOJJOU_GHojVSzHPy4.jpg" width="170" alt="Vintage Newsprint preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-16.462Z-VkO9ixALR0r_o4HVYtJ3vc7Zsp2lQeYaU.mp4) |
| 66 | [Hidden-Line Wireframe](styles/atlas/wireframe-terrain/PROMPT.md) | Dimensional | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-19.257Z-xjg3a8o0PfXxzkey2ejm-rwiO4IY_kmZn.jpg" width="170" alt="Hidden-Line Wireframe preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-19.645Z-tkewIZn6nx1HFH9mkemLohNlWeIfWCfAT.mp4) |
| 67 | [Memphis Group](styles/atlas/memphis/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-23.461Z-LXZnvukM-TOwSSxZaMVa0KAAH63fukuXY.jpg" width="170" alt="Memphis Group preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-23.741Z-HGlp1mXGkXBY74CPKuAhivvlq_izO-c3H.mp4) |
| 68 | [Ballpoint Notebook](styles/atlas/ballpoint-notebook/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-26.343Z-tj3yzOpd1mylP0XYlv-r81swx_DgiUyo4.jpg" width="170" alt="Ballpoint Notebook preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-26.600Z-xHe4S-B7zjPcIS-dP42JidfaqX6Sdavv1.mp4) |
| 69 | [Op Art Sphere](styles/atlas/op-art/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-29.390Z-ZUZXhkWOL-J_VGo9AH6f9cJ_ZnMPCzsbi.jpg" width="170" alt="Op Art Sphere preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-29.685Z--AZ1nEKx1RH_yUtFvNbpacbg6bQqljWoW.mp4) |
| 70 | [Topographic Survey](styles/atlas/topographic/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-32.410Z-3UGbjfMTejNEmsX0-kUi8diN6lKE2Wzrz.jpg" width="170" alt="Topographic Survey preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-32.716Z-ZN6WaMSQFCtamSaUaeCPBDGnQPaEaV68y.mp4) |
| 71 | [Pointillist Afternoon](styles/atlas/pointillism/PROMPT.md) | Painterly | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-35.576Z-WOPFIDVZunnHiZ2OeOVU1jp8lsW3vdeZV.jpg" width="170" alt="Pointillist Afternoon preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-35.904Z-GafvKHWyWEOs3X8xb9R_abahfU2BxF21I.mp4) |
| 72 | [Vector Arcade 1980](styles/atlas/vector-arcade/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-38.556Z-6ibhROZz7rBXcH02Y5rLkkcS46Awyw-lr.jpg" width="170" alt="Vector Arcade 1980 preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-38.820Z-IYgzCiQFaPAPfrD6iDGGh6mKUF5sgxVFz.mp4) |
| 73 | [Patent Drawing](styles/atlas/patent-drawing/PROMPT.md) | Illustration | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-41.578Z-0JEwEDUQ-OHyp4gy6pHnymEjQ1nahF2Uw.jpg" width="170" alt="Patent Drawing preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-41.865Z-nI5fYV_GR0hJLFqaJGV7RghycoXkplwA2.mp4) |
| 74 | [Bauhaus Poster](styles/atlas/bauhaus/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-44.690Z-Lt1fZYB0xxlNZBgso-3_OBl3WrlCHddKZ.jpg" width="170" alt="Bauhaus Poster preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-44.965Z-hKa9q2qc2yiXU_SYKPZyOUfbph6GwFg4i.mp4) |
| 75 | [Bitmap Paint Doodle](styles/atlas/ms-paint/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-47.752Z-BF4XeGoOOo7I-0fTzElEnngHPIBMtVbft.jpg" width="170" alt="Bitmap Paint Doodle preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-48.026Z-2EXjlh9GQ72bI2iWsH4rPJkc3jUEVyRrd.mp4) |
| 76 | [Nail & Thread String Art](styles/atlas/string-art/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-50.788Z-WzZ01Up6q-dZZFZ9usJXiF2PMtRU7nMmb.jpg" width="170" alt="Nail & Thread String Art preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-51.057Z-RvLP9zuMPpfAwoOCAcYxkkanxyQVDMbYI.mp4) |
| 77 | [Ridgeline](styles/atlas/ridgeline/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-54.074Z-gU5JzfplyP7Y-SsfPnyah86kCL4I_VaK2.jpg" width="170" alt="Ridgeline preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-54.415Z-SZEnHTbXAckfTd9BqLEJ9KKRoXEFVeIhS.mp4) |
| 78 | [Sketchbook Graphite](styles/atlas/sketchbook-pencil/PROMPT.md) | Hand-Drawn | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-56.803Z-H5VACMb-8ow5UvXDbX4qzev0Y_nrLVsy5.jpg" width="170" alt="Sketchbook Graphite preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-18-57.080Z-y0w_7fbb6AcvlKQ6cSCP5r_uW1VYcvfad.mp4) |
| 79 | [Teletext Page](styles/atlas/teletext/PROMPT.md) | Retro UI & Neon | <img src="https://cdn.futurepedia.io/2026-10-14T18-18-59.835Z-AvU0jfajPgtA2RrowAmoRfMXdwBSZSgRO.jpg" width="170" alt="Teletext Page preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-00.122Z-gpehupM30exzAEEilrn3fDjy9qhvVbTKk.mp4) |
| 80 | [Silkscreen Grid](styles/atlas/screenprint-grid/PROMPT.md) | Print | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-02.893Z-gZVaAZe0DJgMB-dzen8spfAmQhBvhJXEr.jpg" width="170" alt="Silkscreen Grid preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-03.163Z-HGN3z1JMEeTfZ8BSc2wv2XJSFdZg4Au23.mp4) |
| 81 | [Guilloché Security Print](styles/atlas/spirograph/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-06.015Z--eW-sLDmNGRksAmgJRXYmQOCRNN5SKTNW.jpg" width="170" alt="Guilloché Security Print preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-06.370Z-5NsLbJxX6bTKvlvftSdKLTRHFcUw-Fp3q.mp4) |
| 82 | [ASCII Demoscene](styles/atlas/ascii-render/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-09.031Z-76oPcZ-If0sJNHo-cQlMMA-ZDYI9s5-Hh.jpg" width="170" alt="ASCII Demoscene preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-09.302Z-WYchEhhmg5_qhmyzfjgTyUtJ30bmZL1Dz.mp4) |
| 83 | [International Typographic Style](styles/atlas/swiss-grid/PROMPT.md) | Art & Design Movements | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-11.994Z-YpLmf2nXhER7DY49FabkMs7qzRQiqcbSX.jpg" width="170" alt="International Typographic Style preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-12.283Z-lSuJTAsRgYl1SbHgI9nX4ELPfwePo5U5H.mp4) |
| 84 | [Flow Field](styles/atlas/flow-field/PROMPT.md) | Data & Information | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-14.963Z-zPF-Y_-5kVjKxVkRF10bTiybwIbQ32cWT.jpg" width="170" alt="Flow Field preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-15.239Z-T7Ku13MGAzKG02Re80ujXsSRKt1oJaJuD.mp4) |
| 85 | [MacPaint 1984](styles/atlas/mac-1bit/PROMPT.md) | Retro Digital | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-18.017Z-e_ZOSKgsdcC-RPb_1Mw_P17_ktQCdOOvR.jpg" width="170" alt="MacPaint 1984 preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-18.339Z-BZgA_ktvyk78H9iRnHyunVz1esfXmTCvC.mp4) |
| 86 | [Multi-scale Truchet](styles/atlas/truchet/PROMPT.md) | Generative & Type | <img src="https://cdn.futurepedia.io/2026-10-14T18-19-21.112Z-h5OOS8widOyReUUVy23Gz1Smtx2fZu8Iz.jpg" width="170" alt="Multi-scale Truchet preview"> | [Example video](https://cdn.futurepedia.io/2026-10-14T18-19-21.416Z-qCKPCukrULY_gEdLzJsN-I3d1f0x3vDAe.mp4) |

</details>

## Credits and legal scope

- Main six-phase motion-graphics production specification supplied by the project owner and credited to [awesomeclaude.ai](https://awesomeclaude.ai/claude-motion-graphics).
- Specialist video format concepts inspired by [aansh-video](https://github.com/Priyanshsharma21/aansh-video), adapted to an original repository workflow.
- Visual descriptions, posters and source clip links supplied by the user from [Futurepedia Style Atlas](https://www.futurepedia.io/resources/ai-style-atlas/view). They are linked as reference media, **not** redistributed or licensed for use in finished films.
- Source code: [MIT](LICENSE). External media has separate rights.
