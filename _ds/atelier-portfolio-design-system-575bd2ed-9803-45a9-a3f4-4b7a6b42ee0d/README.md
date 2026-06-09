# Atelier Portfolio — Design System

A warm, editorial, type-led identity for a single-author creative portfolio
(scenographer / communication designer). Extracted verbatim from a self-contained
portfolio HTML page. The whole system is built on **one typeface, one accent color,
a cream ground, and hairline structure** — nothing decorative, everything editorial.

> **Working name:** the project was initialized as "Figma" but that was a placeholder.
> This system has no relationship to Figma the product — it is the portfolio's own identity.

---

## Sources

- **Single source of truth:** a self-contained `Portfolio.html` page pasted into the
  project brief. It embedded:
  - Founders Grotesk (Klim Type Foundry) as base64 `@font-face` data URIs — Regular 400,
    Italic 400, Bold 700, Bold Italic 700.
  - A full CSS layout system (cream/orange palette, 860px content column, hairline tables).
  - JS-driven SPA navigation between Home → Projects → Project Detail → About / Contact.
  - A base64 PNG portrait used as both the home "logo" and the header mark.

No codebase, Figma file, or additional brand assets were provided. Everything here is
derived from that one file.

---

## Content Fundamentals

**Voice:** quiet, curatorial, lowercase-leaning. The site speaks in the third person about
the *work*, and in a plain first person only in About ("I'm a scenographer…"). It never sells.

- **Casing:** Navigation and filters are **all-lowercase** (`projects`, `about`, `contact`,
  `selected projects`, `scenography`, `communication design`). Project *titles* use Title Case
  ("Translated into Socialism", "Let Us Go Back to the Beginning"). Section headings use Title
  Case ("About", "Contact").
- **Person:** Work descriptions are third-person and descriptive ("*Translated into Socialism*
  presents the little-known history of…"). Bio copy is first-person singular ("I'm a
  scenographer and communication designer…", "I hold an MA in Scenography…").
- **Punctuation as structure:** project metadata is joined by spaced pipes —
  `2024 | Salt Galata, Istanbul, Turkey | scenography, production, visual communication`.
  External links are prefixed with a double-slash: `// saltonline.org`, `// lumbardhi.org`.
- **Emphasis:** project names are set in *italics* inside running copy.
- **Discipline tags** are lowercase, comma-separated: `scenography, production, communication design`.
- **No emoji. No exclamation. No marketing adjectives.** Tone is restrained, institutional,
  gallery-wall. Copy is sparse — a single paragraph per project, two-to-three short lines per page.

**Vibe in one line:** a printed exhibition catalogue translated to the web — generous white
(cream) space, confident type, zero ornament.

---

## Visual Foundations

**Palette.** A two-color system on a warm ground.
- Ground: cream `#f5f0eb`.
- Accent / nearly-all-text: vermilion `#e84a1a` — used for nav, filters, the logo,
  links, and table copy.
- Heading & emphasis ink: near-black `#1a1a1a` (detail titles, page headings, body copy).
- Structure: dusty-rose hairline `#e0c4b8` for every divider and border.
- Imagery placeholders: light peach `#f0d8cc`.
There are **no gradients, no shadows, no second accent.** Color does the work through contrast
of vermilion-on-cream and black-on-cream.

**Type.** Founders Grotesk only — Regular and Bold, plus their italics. It is a neo-grotesque
with humanist warmth; the design leans on **Bold (700) for almost everything structural**
(table cells, metadata, body copy) and Regular (400) for nav, filter, and prose paragraphs.
Display titles run 40px / 1.1 / `-0.01em`. Body copy is 16px at 1.7–1.8 line-height. Italics
are reserved for project names in prose.

**Layout.** A single centered **860px content column** with 24px gutters. Everything — header,
nav, tables, detail views — lives inside this measure. The home screen is the exception: a
centered logo over a centered nav over a tall **rounded (14px) outlined box** that frames empty
space like a gallery vitrine. Generous vertical rhythm; nothing is dense.

**Backgrounds.** Flat cream, full-bleed. No images behind content, no textures, no patterns,
no protection gradients. Imagery only appears as **flat peach placeholder blocks** (4:3 inline,
16:6 wide) inside project detail pages — outlined or filled, never photographic in the base file.

**Borders & structure.** Hairlines everywhere: `1px solid #e0c4b8`. Tables use `border-bottom`
hairlines per row (no verticals, no zebra). The home box and wide detail image use a `1.5px`
outline. Corner radii: 14px (home box), 10px (wide image), 8px (inline image). Most UI is
**square-cornered** — radii are reserved for the framed image/box moments.

**Shadows.** None. Elevation is communicated purely by hairlines and spacing.

**Hover states.** Uniform and gentle. Interactive text fades to `opacity: 0.6` on hover
(nav, logo). Table rows fade to `opacity: 0.6`. Secondary links invert their resting
`opacity: 0.55 → 1` on hover. No color change, no movement, no underline-on-hover (active
nav gets a persistent underline instead).

**Press / active states.** Active *filter* = switches Regular → **Bold** + full opacity. Active
*home nav* = a `1.5px` vermilion outline box around the label. Active *header nav* = underline,
3px offset. There is no shrink/scale press feedback.

**Motion.** One animation: `fadeUp` — `opacity 0 → 1` with `translateY(10px) → 0` over `0.35s`
`ease`, applied on view changes. Hover transitions are `0.12s` (rows/links) to `0.15s`
(nav/buttons). No bounces, no spring, no parallax.

**Transparency & blur.** None beyond the muted-body alpha (`#1a1a1a` at ~80%). No backdrop blur,
no glass.

**Cards.** There is no "card" pattern. Content sits directly on cream, separated by hairlines.
The closest things to cards are the outlined home vitrine box and the peach image blocks.

---

## Iconography

This brand is **deliberately icon-free.** The source file contains **zero SVG icons, no icon
font, and no PNG icon set.** The only "icon-like" elements are:

- **Unicode glyphs used as micro-controls:**
  - `←` (U+2190) for the back button (`&#8592;`)
  - `⌄` (U+2304) as a dropdown caret on the filter label (`&#8964;`)
  - `|` spaced pipes as metadata separators
  - `//` double-slash as a link prefix
- **The portrait mark.** A single photographic portrait (embedded PNG) functions as the logo —
  64px in the header, 110px on the home screen. It is the brand's only "logo." It is a generic
  placeholder portrait in the source; **replace `assets/portrait.png` with the real portrait.**

**Guidance:** do not introduce an icon library. If a UI affordance is unavoidable, prefer a
Unicode arrow/caret in the accent color over any drawn or imported icon. No emoji, ever.

> ⚠️ Asset note: I could not extract the embedded base64 portrait or the four embedded `.otf`
> font binaries into standalone files without re-emitting hundreds of KB of base64 (which would
> corrupt the build). The CSS references the correct production filenames; previews render with
> **Space Grotesk** (a free Founders Grotesk derivative) and a CSS-drawn placeholder portrait.
> See the **Action items** at the bottom.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography. |
| `colors_and_type.css` | All color + type tokens (base + semantic) and element classes. |
| `fonts/fonts.css` | `@font-face` rules for Founders Grotesk (+ Space Grotesk preview fallback). |
| `fonts/` | Drop the licensed `FoundersGrotesk-*.otf` files here. |
| `assets/` | Brand imagery. Drop the real `portrait.png` here. |
| `preview/` | Design-system spec cards (rendered in the Design System tab). |
| `ui_kits/portfolio/` | High-fidelity recreation of the portfolio website. `index.html` + JSX. |
| `SKILL.md` | Makes this folder usable as a downloadable Agent Skill. |

---

## Action items for you

1. **Upload the licensed font files** to `fonts/` with the exact names in `fonts/fonts.css`.
   Until then everything renders in Space Grotesk.
2. **Upload the real portrait** as `assets/portrait.png` (square; used at 64px and 110px).
3. Confirm the vermilion `#e84a1a` and cream `#f5f0eb` are the intended exact brand values.
