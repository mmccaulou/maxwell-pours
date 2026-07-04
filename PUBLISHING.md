# Image Placement SOP — Maxwell Pours

## Before you start

Photos live in the `/images/` folder. Every time you upload a photo through the CMS, it lands there automatically. When you reference a photo in an article, you always write its path as `/images/filename.jpg`.

---

## Step 1 — Upload the photo

1. Open the CMS and go to **Media** (top nav).
2. Click **Upload** and choose your file.
3. Note the filename exactly as it appears after upload — you'll need it in Step 3.

You can also upload directly from the image field inside a post, but the Media library keeps everything in one place and is easier to manage.

---

## Step 2 — Switch to code view in the editor

1. Open or create your post in the CMS.
2. Click inside the **Body** field.
3. Click the **`<>`** button in the editor toolbar. The text you've written will now appear as plain code.
4. Put your cursor where you want the photo to appear — click between two paragraphs, or at the start of a new line.
5. Paste the image block (see layouts below).
6. Click **`<>`** again to return to normal editing.

---

## Step 3 — Choose a layout and paste the block

Replace `/images/YOURPHOTO.jpg` with the actual filename. Replace the `alt` text with a plain description of what is in the photo — this is required.

---

### INSET
**When to use:** Most photos. Sits in the flow of the text at text-column width. Clean and editorial.

```
<Figure src="/images/YOURPHOTO.jpg" alt="what is in the photo" />
```

---

### FULL-BLEED
**When to use:** A wide, atmospheric image — a landscape, a cellar, a room, a vineyard. Use sparingly. One per article is usually enough.

```
<Figure src="/images/YOURPHOTO.jpg" alt="what is in the photo" layout="full-bleed" />
```

---

### FLOAT LEFT
**When to use:** A detail shot, label, or portrait you want sitting alongside a paragraph. The text wraps to the right. The surrounding paragraph should be at least three or four lines long, otherwise the text looks awkward.

```
<Figure src="/images/YOURPHOTO.jpg" alt="what is in the photo" layout="float-left" />
```

---

### FLOAT RIGHT
**When to use:** Same as float left, but the photo sits on the right and text wraps to the left.

```
<Figure src="/images/YOURPHOTO.jpg" alt="what is in the photo" layout="float-right" />
```

---

### TWO-UP
**When to use:** Two photos that belong together as a matched pair — two angles of the same place, a before-and-after, or two bottles from the same flight. They share one caption.

```
<TwoUp
  src1="/images/FIRSTPHOTO.jpg" alt1="what is in the first photo"
  src2="/images/SECONDPHOTO.jpg" alt2="what is in the second photo"
/>
```

---

## Optional: Captions

Any layout except TwoUp can take a `label` and a `caption`. TwoUp can also take both.

- **`label`** — appears in hot pink, all caps, above the caption. Use it like a category or location tag: `BURGUNDY`, `THE CELLAR`, `VINTAGE 2019`.
- **`caption`** — appears in grey below the label. One sentence.

You can use one, both, or neither.

```
<Figure
  src="/images/YOURPHOTO.jpg"
  alt="what is in the photo"
  label="THE CELLAR"
  caption="Barrel aging in Meursault. Two years, no rush."
/>
```

```
<TwoUp
  src1="/images/FIRSTPHOTO.jpg" alt1="what is in the first photo"
  src2="/images/SECONDPHOTO.jpg" alt2="what is in the second photo"
  label="TWO ANGLES"
  caption="Neither shot tells the whole story on its own."
/>
```

---

## Optional: Crop ratio

By default, every photo displays at its natural shape — whatever proportions the file has. If you want to force a specific crop, add `aspect` to any Figure block. The crop is always centered.

| Value | Shape | Good for |
|---|---|---|
| `aspect="16/9"` | Wide cinematic | Landscapes, rooms, long tables |
| `aspect="4/3"` | Standard horizontal | Most food and wine shots |
| `aspect="1/1"` | Square | Portraits, bottle shots, detail close-ups |
| `aspect="3/4"` | Vertical | Standing portraits, tall bottle labels |

```
<Figure src="/images/YOURPHOTO.jpg" alt="what is in the photo" aspect="16/9" />
```

TwoUp always crops both photos to `4/3` — this is fixed so the pair stays aligned.

---

## Quick-reference: which layout to choose

| Situation | Layout |
|---|---|
| Most photos | INSET |
| A wide landscape, cellar, or establishing shot | FULL-BLEED |
| A detail or portrait alongside a long paragraph | FLOAT LEFT or FLOAT RIGHT |
| Two shots that are a matched pair | TWO-UP |
| You want a specific crop shape | Add `aspect="…"` to any Figure |

When in doubt, use INSET. It's always clean.

---

## Mobile

You don't need to do anything differently for mobile. Every layout adapts automatically:
- Floats go full-width and stack above the paragraph.
- Two-up pairs stack into a single column.
- Full-bleed pulls back to the screen edge.

---

## Full example with everything

```
<Figure
  src="/images/the-cellar.jpg"
  alt="Rows of barrels in a stone cave, lit by a single hanging bulb"
  layout="full-bleed"
  aspect="16/9"
  label="MEURSAULT"
  caption="The cave where the 2021 sat for eighteen months."
/>
```
