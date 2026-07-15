# Brand Guide — Maxwell Pours

## Voice

Maxwell Pours is a wine publication written by Maxwell McCaulou. The publication name is always "Maxwell Pours." The author's name is always "Maxwell McCaulou" in full — except inside the author bio card at the foot of articles, where first name only ("Maxwell") is used.

---

## Color Palette

| Name | Hex | Role |
|---|---|---|
| Petrol | `#0E6E70` | Masthead, nav, CTA bands, favicon background |
| Persimmon | `#E2542A` | Article headlines, active nav, link hover, The Bottle title |
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

## Duotone — Optional Artistic Treatment

> **Current status: not in use.** All hero images run full-color. Duotone is available as a deliberate per-article choice for artistic effect.

The homepage card hover also has a built-in color-reveal: if a `-cherry` version is referenced in `heroImage`, the card fades from duotone to full color on hover. This is inert when full-color images are used.

### Approved settings

| Parameter | Value |
|---|---|
| Shadow color | `#400B15` (dark cherry, halfway between near-black and full cherry) |
| Highlight color | `#FAF3E5` (Lifted Cream) |
| Effect | Grayscale base → shadow mapped to dark tones, highlight mapped to light tones |

### The spectrum (reference)

| Name | Shadow hex | Character |
|---|---|---|
| Subtle | `#1A0408` | Warm monochrome, cherry barely perceptible |
| **Approved** | `#400B15` | Cherry present, photo detail intact |
| Mid | `#651122` | Clearly cherry, slightly washed |
| Bold | `#B11E3C` | Full cherry flood |

### How it works

The effect is baked directly into the image file using Node + sharp — pixel by pixel. Each pixel is converted to grayscale, then linearly interpolated between the shadow color (dark tones) and the highlight color (light tones). The result is a JPEG saved alongside the original. No CSS filters are used anywhere.

CSS blend mode approaches were tried and rejected — they produced oversaturated color and incorrect highlights compared to the baked result.

### How to apply to an article

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

### Baked files on disk (not currently in use)

| Original | Baked version |
|---|---|
| `PSG-crosswalk-paris.jpeg` | `PSG-cherry-final.jpeg` |
| `bar-etna-at-open.jpeg` | `bar-etna-at-open-cherry.jpeg` |
| `meunier-at-bubble-bliss.jpeg` | `meunier-at-bubble-bliss-cherry.jpeg` |
| `squating-in-field.jpeg` | `squating-in-field-cherry.jpeg` |

---

## Layout

| Token | Value | Use |
|---|---|---|
| `--content-width` | `72rem` | Max page width |
| `--prose-width` | `44rem` | Article column base width (expands on desktop via clamp) |
| `--gap` | `1.5rem` | Base column gap |

---

## Corner Radius

A consistent `6px` radius is used across most UI elements: category tags, newsletter input, newsletter button. Favicon uses `~22%` of its pixel size as the corner radius.

**Exception — The Bottle block** (`src/components/Bottle.astro`) uses a `1.25rem` (20px) card radius and a full pill (`999px`) for its price tag. This is a deliberate departure, not an inconsistency — the larger radius and pill shape read as a distinct "callout" register against the sharper-edged tags used elsewhere. `.bottle { clear: both; }` is also load-bearing — since the block can land anywhere in an article, including right after a floated image, it must always force itself onto a fresh line rather than trusting the surrounding content to clear its own floats.

---

## The Bottle Block

An inline raised card used within article body content (via `<Bottle ... />` in the MDX source, alongside `<Figure>` and `<TwoUp>`) to call out a specific bottle.

| Element | Treatment |
|---|---|
| Card | Deep Cream surface, `35%` petrol border, `1.25rem` radius, always clears floats |
| Eyebrow label | "THE BOTTLE," small caps, petrol |
| Price tag | Hot-pink pill, top-right — shows the price BAND (e.g. "About $22 · weeknight"), not a score or a verdict. Write the approximation as a word ("About"), never a symbol (`~`/`≈`) — stacked against the `$` it reads as visual clutter. For the occasion word, use wine-writing shorthand like "weeknight" or "special occasion" — avoid "everyday," which reads like retail/discount copy. This is the card's one loud element on purpose: it's Maxwell being upfront about cost and use-occasion, which is the actual value being offered to the reader. |
| Bottle name | Fraunces 700, persimmon, moderate size — the color and serif carry the distinction, not scale |
| Meta line | Region · grape, muted ink, one line (price lives in the tag above, not here) |
| "Pour it with" | Two-column row — petrol label (vertically centered against however many lines the pairing text wraps to), pairing text in a color between ink and muted-ink |
| Footer | Hairline rule, then "Find a bottle →" link (petrol) and a small affiliate disclosure line, split left/right |

**Rule: no numeric scores or points, ever.** There is no field for one — this is enforced by the component's props, not just convention.
