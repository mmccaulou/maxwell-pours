# Brand Guide — Maxwell Pours

## Voice

Maxwell Pours is a wine publication written by Maxwell McCaulou. The publication name is always "Maxwell Pours." The author's name is always "Maxwell McCaulou" in full — except inside the author bio card at the foot of articles, where first name only ("Maxwell") is used.

---

## Color Palette

| Name | Hex | Role |
|---|---|---|
| Petrol | `#0E6E70` | Masthead, nav, CTA bands, favicon background |
| Cherry | `#B11E3C` | Article headlines, active nav, pull-quote marks, hero duotone |
| Hot Pink | `#E84A8A` | Category tags, buttons, captions, tagline |
| Lifted Cream | `#FAF3E5` | Page background, font on dark surfaces |
| Deep Cream | `#F4E9D2` | Borders, hairlines, raised surfaces |
| Ink | `#211318` | Body text and headlines on light backgrounds |
| Muted Ink | `#5A4A48` | Captions, metadata, secondary text |

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headlines | Fraunces | 700–800 |
| Body / UI | DM Sans | 300–700 |

Fraunces is loaded from Google Fonts. The variable font (wght axis + opsz axis) is installed locally at `~/Library/Fonts/Fraunces-Variable.ttf` and used for favicon generation.

---

## Favicon

- **Shape:** Rounded square, ~22% corner radius on all sizes
- **Background:** Petrol (`#0E6E70`)
- **Monogram:** "MP" in Fraunces 800, Lifted Cream (`#FAF3E5`)
- **Font settings:** `font-variation-settings: 'wght' 800, 'opsz' 144` (large display optical size)
- **Letter spacing:** small positive gap so M and P don't crowd
- Generation script: `/tmp/gen-favicons.cjs` (requires sharp + Fraunces TTF installed at path above)

---

## Duotone — Hero Images

Duotone is applied by baking it into the image file at build time using sharp (pixel-level, no CSS filter). It is used on hero images only. Body images are always full-color.

### Current settings (homepage hero)

| Parameter | Value |
|---|---|
| Shadow color | `#400B15` (dark cherry, halfway between near-black and full cherry) |
| Highlight color | `#FAF3E5` (Lifted Cream) |
| Effect | Grayscale base → shadow mapped to dark tones, highlight mapped to light tones |

### The spectrum (reference)

| Name | Shadow hex | Character |
|---|---|---|
| Subtle | `#1A0408` | Warm monochrome, cherry barely perceptible |
| **Current** | `#400B15` | Cherry present, photo detail intact |
| Mid | `#651122` | Clearly cherry, slightly washed |
| Bold | `#B11E3C` | Full cherry flood |

### How it works

The effect is baked directly into the image file using Node + sharp — pixel by pixel. Each pixel is converted to grayscale, then linearly interpolated between the shadow color (dark tones) and the highlight color (light tones). The result is a JPEG saved alongside the original. No CSS filters are used anywhere; the `<img>` tag just references the baked file.

CSS blend mode approaches were tried and rejected — they produced oversaturated color and incorrect highlights compared to the baked result.

### Workflow for new hero images

1. Upload the original photo via the CMS as normal. It lands in `public/images/`.
2. Tell Claude the filename. Claude runs the bake script and produces `filename-cherry.jpeg` in the same folder.
3. Update the post's `heroImage` frontmatter to reference the `-cherry` version.
4. The original file is kept untouched as a source.

### Bake script (run from the repo root)

Save as any `.cjs` file and run with `node`:

```js
const sharp = require('./node_modules/sharp');
const fs    = require('fs');
const path  = require('path');

const INPUT  = './public/images/YOUR-PHOTO.jpeg';
const OUTPUT = './public/images/YOUR-PHOTO-cherry.jpeg';

const shadow    = [64, 11, 21];        // #400B15 — approved cherry shadow
const highlight = [0xFA, 0xF3, 0xE5]; // #FAF3E5 — Lifted Cream

async function run() {
  const { data, info } = await sharp(INPUT).greyscale().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const g = data[i] / 255;
    out[i * 3]     = Math.round(shadow[0] + (highlight[0] - shadow[0]) * g);
    out[i * 3 + 1] = Math.round(shadow[1] + (highlight[1] - shadow[1]) * g);
    out[i * 3 + 2] = Math.round(shadow[2] + (highlight[2] - shadow[2]) * g);
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
    .jpeg({ quality: 90 }).toFile(OUTPUT);
  console.log('Done →', OUTPUT);
}

run().catch(console.error);
```

### Existing baked hero images

| Original | Baked version | Used in |
|---|---|---|
| `PSG-crosswalk-paris.jpeg` | `PSG-cherry-final.jpeg` | Homepage hero |
| `bar-etna-at-open.jpeg` | `bar-etna-at-open-cherry.jpeg` | Wine Bar Hunting in Paris |
| `meunier-at-bubble-bliss.jpeg` | `meunier-at-bubble-bliss-cherry.jpeg` | Chardonnay demo post |

---

## Layout

| Token | Value | Use |
|---|---|---|
| `--content-width` | `72rem` | Max page width |
| `--prose-width` | `44rem` | Article column base width (expands on desktop via clamp) |
| `--gap` | `1.5rem` | Base column gap |

---

## Corner Radius

A consistent `6px` radius is used across all UI elements: category tags, newsletter input, newsletter button. Favicon uses `~22%` of its pixel size as the corner radius.
