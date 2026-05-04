# Valley Joint Pain Center — Brand Guidelines

**Version 1.0** · The hinge identity system

---

## 1. Brand at a glance

**Name:** Valley Joint Pain Center
**Domain:** valleyjointpain.com
**Tagline (primary):** "Knee pain relief, without the surgery."
**Voice:** Refined clinical confidence. Editorial-medical. Patient-forward without being saccharine.

The brand draws from one central metaphor: **the hinge**. A joint is a place where two parts meet and pivot. Our work is to keep that meeting smooth.

---

## 2. The mark

Two arcs meet at a precise pivot point. The amber dot is the moment of motion.

### Construction

- The mark is built on an 8x stroke grid
- Stroke width = 0.125 of total height
- Pivot dot radius = 0.165 of total height
- The dot sits slightly forward of center (asymmetric on purpose — it implies motion, not symmetry)

### Approved variants

| File | Use |
|------|-----|
| `01-mark-only-primary.svg` | Default mark on bone background |
| `02-mark-only-reversed.svg` | On deep teal backgrounds only |
| `03-mark-only-mono.svg` | Single-color print, fax, embossing |

### Lockups

| File | Use |
|------|-----|
| `04-horizontal-primary.svg` | Two-line horizontal · letterhead, spacious headers |
| `05-horizontal-reversed.svg` | **valleyjointpain.com** footer · formal dark layouts, ads |
| `06-stacked-primary.svg` | Square spaces, instagram avatar, doorplate |
| `07-stacked-reversed.svg` | Stacked on dark backgrounds |
| `08-horizontal-single-line-primary.svg` | **valleyjointpain.com** nav & compact light headers; email signatures |
| `09-horizontal-single-line-reversed.svg` | Single-line on dark backgrounds (e.g. compact UI, email) |

### Clear space

Always leave space equal to **one full mark width** around any logo lockup. Do not crowd it with other elements.

### Minimum sizes

- Horizontal lockup: 120px wide minimum on screen, 1 inch in print
- Mark only: 24px minimum on screen, 0.25 inch in print
- Below 16px (favicon territory): use the favicon SVG, not a scaled-down mark

---

## 3. Color

### The 60-25-8-5-2 ratio

A restrained system. Two anchors, three supports.

| Role | Color | Hex | Target % |
|------|-------|-----|----------|
| Surface (default bg) | Bone | `#FAF8F3` | 60% |
| Anchor (nav, footer, hero) | Deep Teal | `#0A3D42` | 25% |
| CTA & accents only | Amber | `#C8780A` | 8% |
| Section variation | Cloud | `#F5F3EE` | 5% |
| Body text | Ink | `#15201F` | 2% |

### Extended palette (for components & UI)

| Token | Hex | Where it appears |
|-------|-----|------------------|
| `--vjp-teal-700` | `#0D5C63` | Italic accents, hover states |
| `--vjp-teal-500` | `#1A8A93` | Lighter strokes, illustrations |
| `--vjp-teal-100` | `#D6EBED` | Soft fills in illustrations |
| `--vjp-teal-50` | `#ECF5F5` | Hero visual backgrounds |
| `--vjp-amber-soft` | `#E8A043` | Reversed accent on dark |
| `--vjp-line` | `#D8D3C7` | Hairline borders |
| `--vjp-line-soft` | `#EBE7DC` | Even subtler dividers |
| `--vjp-ink-soft` | `#4A5957` | Secondary/muted text |

The full system is in `colors/colors.css` — copy directly into any project.

### Color rules

- **Amber is precious.** Use it only for CTAs, the dot in the mark, and key accent moments. Its scarcity is what makes it earn attention.
- **No new colors.** If you find yourself reaching for red, green, or blue, you don't need them. Use Ink for warnings, the existing teal for success, and stay disciplined.
- **No gradients on brand surfaces.** Flat colors only. The only acceptable gradient is the subtle paper-textured background of the brand reference materials.

---

## 4. Typography

A serif + sans pairing already proven in editorial medical contexts. Both Google Fonts. Both free.

### Lora (Serif)

- Used for: headlines, hero copy, doctor name, testimonials, large numerical stats
- Weights used: 400 regular, 500 medium, italic
- The italic does emotional and editorial work — it carries the "Joint Pain" in the wordmark and emphatic words in headlines like "without"

### DM Sans (Sans-serif)

- Used for: body text, navigation, buttons, forms, labels, all UI
- Weights used: 300 light, 400 regular, 500 medium

### Type scale

| Level | Size | Family |
|-------|------|--------|
| H1 | clamp(2.5rem → 4rem) | Lora 500 |
| H2 | clamp(2rem → 3.25rem) | Lora 500 |
| H3 | 1.5rem | Lora 500 |
| Body large | 1.125rem | DM Sans 400 |
| Body | 1rem | DM Sans 400 |
| Eyebrow | 0.8125rem uppercase | DM Sans 500 |

Full implementation in `typography/typography.css`.

### The italic rule

The italic in Lora is reserved for **emphasis moments** — never for entire paragraphs. Use it for:
- "Joint Pain" in the wordmark
- The italicized accent word in headlines ("Knee pain relief, *without* the surgery")
- Direct quotations and testimonials
- Place names and proper nouns when they need to feel particular

---

## 5. Voice & tone

### What we sound like

- **Honest.** Patients have heard a lot of marketing. We don't oversell.
- **Plain.** "Genicular Artery Embolization" can be explained in one sentence. Use it.
- **Warm but not folksy.** No "Hey there!" — but also no "Pursuant to your inquiry."
- **Confident, not boastful.** "Board-certified" is enough. We don't need superlatives.

### What we never sound like

- Never use "we strive to" or "passionate about" — empty professional-services language
- Never say "miracle," "cure," "guaranteed," or any superlative about outcomes
- Never use stock-photo language: no "your wellness journey," no "a path to vitality"

### Example — same idea, three voices

| Wrong: too clinical | Wrong: too marketing | Right |
|---------------------|----------------------|-------|
| "GAE is a transcatheter embolic procedure for genicular vasculature in osteoarthritic knee patients." | "Reclaim your active life with our revolutionary knee pain solution!" | "An outpatient procedure that calms the inflammation in your knee — without the recovery of surgery." |

---

## 6. Photography & illustration

### Photography (when added later)

- Documentary, candid feel — never staged
- The doctor with patients in conversation, not posed
- Real Valley locations as background — Hamlin St, Van Nuys Civic Center, etc.
- Lighting: warm, natural, slightly desaturated
- **Avoid:** Stock photography of generic doctors, white-coat-and-folded-arms poses, smiling-stock-elderly-couple imagery

### Illustration

- Anatomical line drawings in the style of the hero illustration
- Only the brand teal + amber accent, plus bone for fills
- Treat as editorial figures (the "fig. 01" treatment) rather than infographic clip art

---

## 7. Three things to never do

1. **Never recolor the mark.** Only the three approved combinations: default, reversed, mono.
2. **Never put the mark on patterns or busy backgrounds.** Solid flat colors only.
3. **Never distort.** No skew, stretch, rotation beyond 90°, or non-uniform scaling.

---

## 8. Asset inventory

```
brand/
├── logos/
│   ├── 01-mark-only-primary.svg
│   ├── 02-mark-only-reversed.svg
│   ├── 03-mark-only-mono.svg
│   ├── 04-horizontal-primary.svg
│   ├── 05-horizontal-reversed.svg
│   ├── 06-stacked-primary.svg
│   ├── 07-stacked-reversed.svg
│   ├── 08-horizontal-single-line-primary.svg
│   └── 09-horizontal-single-line-reversed.svg
├── favicons/
│   ├── favicon.svg                      (32x32, browser tab)
│   └── apple-touch-icon.svg             (180x180, iOS home screen)
├── colors/
│   └── colors.css                       (CSS variables, ready to copy)
├── typography/
│   └── typography.css                   (font imports + type scale)
├── templates/
│   ├── og-image.svg                     (1200x630, social share card)
│   ├── business-card-front.svg
│   ├── business-card-back.svg
│   └── letterhead.svg                   (US Letter, 8.5x11)
└── docs/
    └── brand-guidelines.md              (this file)
```

### File format notes

- **All logos are SVG.** SVGs scale infinitely without quality loss — they look perfect at favicon size and at 8-foot lobby sign size from a single file.
- **For PNG/JPG versions:** Open any SVG in your browser, screenshot at the size you need, or convert at [cloudconvert.com](https://cloudconvert.com/svg-to-png) (free).
- **For print files:** Send your printer the SVGs. Modern printers handle SVG natively. If they ask for PDF, your designer can convert in 30 seconds in Illustrator or Affinity.

---

## 9. Future expansion

When the practice expands to PAE (prostate), UFE (fibroid), or vein services per the multi-brand strategy, each sister site uses the **same hinge mark and identical color/type system** — only the wordmark and tagline change:

- `valleyprostatehealth.com` → "Valley *Prostate Health* · Center"
- `valleyfibroidcare.com` → "Valley *Fibroid Care* · Center"
- `valleyveincare.com` → "Valley *Vein Care* · Center"

The hinge works as a metaphor across all of these (a hinge is precision, motion, the meeting of two things — applies equally well to vascular work as to joint work). The color and type system stays identical. This is what makes the multi-brand strategy operationally easy: one brand toolkit, multiple patient-facing presences.

---

*Last updated: 2026 · Brand v1.0*
