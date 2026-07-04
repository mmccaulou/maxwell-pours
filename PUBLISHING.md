# Publishing SOP — Maxwell Pours

## Writing a new post

1. Open maxwellpours.com/admin and log in with GitHub.
2. Click **Blog Posts → New Blog Post**.
3. Fill in Title, Description, Publish Date, Hero Image, and Category.
4. Write the body in the rich text editor.
5. When you are ready to place a photo, click the **<>** button in the editor toolbar to switch to code view.
6. Paste the image block you need (see layouts below), then click **<>** again to return to normal editing.
7. When finished, set **Draft** to off and click **Publish**.

---

## Placing photos in the body

Every photo needs two things:
- **src** — the file path, always starting with `/images/` (e.g. `/images/my-photo.jpg`)
- **alt** — a plain-English description of what is in the photo (used by screen readers and search engines)

Both are required. Everything else is optional.

---

### INSET — default, fills the text column

Use this for most photos. It sits cleanly in the flow of the text.

```
<Figure src="/images/my-photo.jpg" alt="what is in the photo" />
```

With a caption:

```
<Figure
  src="/images/my-photo.jpg"
  alt="what is in the photo"
  label="SHORT LABEL"
  caption="One sentence describing the image."
/>
```

`label` appears in hot pink above the caption. `caption` appears in grey below it. Both are optional — use one, both, or neither.

---

### FULL-BLEED — wide, breaks past the column edges

Use this for a big atmospheric image — a landscape, a cellar, a wide table shot. Reserve it for moments that deserve space.

```
<Figure
  src="/images/my-photo.jpg"
  alt="what is in the photo"
  layout="full-bleed"
  caption="Optional caption."
/>
```

---

### FLOAT LEFT — photo on the left, text runs beside it

Use this for a detail shot or portrait that doesn't need to be large. The reader's eye takes in the photo and the text at the same time. Works best when the surrounding paragraph is at least three or four lines long.

```
<Figure
  src="/images/my-photo.jpg"
  alt="what is in the photo"
  layout="float-left"
  caption="Optional caption."
/>
```

### FLOAT RIGHT — photo on the right, text runs beside it

Same as float left, mirrored.

```
<Figure
  src="/images/my-photo.jpg"
  alt="what is in the photo"
  layout="float-right"
  caption="Optional caption."
/>
```

On a phone, floats automatically go full-width — you don't need to do anything differently.

---

### TWO-UP — two photos side by side, one shared caption

Use this when two images belong together as a pair. They share a single caption. On a phone they stack vertically.

```
<TwoUp
  src1="/images/first-photo.jpg"
  alt1="what is in the first photo"
  src2="/images/second-photo.jpg"
  alt2="what is in the second photo"
  label="SHORT LABEL"
  caption="One sentence covering both photos."
/>
```

---

## How to choose a layout

| Situation | Layout |
|---|---|
| Most photos | INSET |
| A wide landscape, cellar, or room shot | FULL-BLEED |
| A detail, label, or portrait alongside a long paragraph | FLOAT LEFT or FLOAT RIGHT |
| Two shots that are a matched pair | TWO-UP |

When in doubt, use INSET. It's always clean.
