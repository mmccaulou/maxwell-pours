# Brand Guide — Maxwell Pours

## Voice

Maxwell Pours is a wine publication written by Maxwell McCaulou. The publication name is always "Maxwell Pours." The author's name is always "Maxwell McCaulou" in full — except inside the author bio card at the foot of articles, where first name only ("Maxwell") is used.

### Periods in headings and subtitles

Punctuate sentences; don't punctuate labels.

- **Sentence-style lines end with a period.** Any heading, subtitle, or tagline that says something in Maxwell's voice gets a period, including short fragments: "Let's get into wine worth drinking.", "Start with a review.", "For restaurateurs in search of the right list."
- **Labels get no period.** Headings that simply name a section, category, or service: "How It Works", "Selected Work", "Recent Pours", "Restaurants & Wine Bars", "On the Floor", "Wine Program Revival".
- **Exception: article titles get no period**, even when they read as a sentence, following standard publication practice.
- Buttons and links never take a period ("Request my review").

---

## Color Palette

The system is locked. Don't add base colors; hover and wash shades are derived from the colors below.

| Tier | Name | Hex | Role |
|---|---|---|---|
| Primary | Petrol | `#0E6E70` | Identity and structure: masthead, nav, links, rules, CTA bands, The Bottle name, favicon background |
| Primary | Hot Pink | `#E84A8A` | Small pops: category tags, buttons, captions, tagline, active-nav underline, "Free" card title |
| Tertiary (rare) | Plum | `#8E1E54` | Rare accent only: link and "read more" hovers, small highlights, form error message, Work With Me achievements banner (text and dividers), Work With Me "How It Works" step circles (cream numbers on plum) and the dashed arrow connectors between them (plum at 45%). Use it only where petrol or hot pink can't do the job |
| Foundation | Lifted Cream | `#FAF3E5` | Page background, text on dark surfaces (including on plum and pink) |
| Foundation | Deep Cream | `#F4E9D2` | Borders, hairlines, raised surfaces |
| Foundation | Ink | `#211318` | Body text and all page headlines on light backgrounds (article titles, Work With Me) |
| Supporting | Muted Ink | `#5A4A48` | Captions, metadata, secondary text |

**Derived states** (in `src/styles/tokens.css`): `--petrol-hover #0a5254`, `--petrol-wash`, `--hot-pink-hover #d03878`, `--plum-hover #701843`, `--plum-wash`.

**Rules**
- No pure white (`#fff`) anywhere. Use Lifted Cream instead.
- Text on plum is Lifted Cream (7.7:1 contrast). Never put plum text on hot-pink tags, or pink text on plum.
- Don't use plum on the petrol masthead: at 1.4:1 contrast it can't be read there. Active nav is marked with a hot-pink underline instead.
- **Persimmon (`#E2542A`) was removed in October 2026.** Its old uses moved to ink (headlines), petrol (Bottle name), plum (link hovers) or hot pink (small pops). Don't bring it back, or any orange or terracotta.
- **Cherry (`#B11E3C`) is not a UI color.** It survives only in the dormant duotone system below.

---

## Buttons

Pink buttons (`.btn` in `src/styles/global.css`) come in two sizes:

- **Medium (default):** every pink button on the site, including the review buttons under the service cards, the service page buttons and the form's "Request my review".
- **Large (`.btn--large`):** only the two hero buttons at the top of Work With Me. Don't use large anywhere else.

Styles: solid (hot pink fill, Lifted Cream text) or outline (hot pink border and text). Both darken to hot-pink-hover on hover.

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

> **Current status: not in use.** All hero images run full-color. The cherry tones below are used only for duotone image color. They aren't UI colors, so don't use them for text, borders or buttons. Duotone is available as a deliberate per-article choice for artistic effect.

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
| Bottle name | Fraunces 700, petrol, moderate size — the color and serif carry the distinction, not scale |
| Meta line | Region · grape, muted ink, one line (price lives in the tag above, not here) |
| "Pour it with" | Two-column row — petrol label (vertically centered against however many lines the pairing text wraps to), pairing text in a color between ink and muted-ink |
| Footer | Hairline rule, then "Find a bottle →" link (petrol, plum on hover) and a small affiliate disclosure line, split left/right |

**Rule: no numeric scores or points, ever.** There is no field for one — this is enforced by the component's props, not just convention.
