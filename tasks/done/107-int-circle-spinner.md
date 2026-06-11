---
id: 107-int-circle-spinner
title: Build circle-spinner interactive
area: interactive
component: circle-spinner
article: circle-of-fifths
depends_on: [000-scaffold]
order: 107
---

# Build circle-spinner interactive

**Goal:** SVG Circle of Fifths with clickable keys showing relatives, accidentals, and tonic chord.

**Context:** spec → `CLAUDE.md` › `circle-spinner` · article → `content/{en,uk}/circle-of-fifths.md` ·
tech → `CONVENTIONS.md` · topic accent → `harmony`.

## Steps

1. Create `src/components/interactive/CircleSpinner.tsx` — SVG circle with 12 major + minor keys.
2. Create `src/components/interactive/circleSpinner.data.ts` — key data with accidentals and relatives.
3. Add `circleSpinner.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Outer ring: 12 major keys. Inner ring: relative minors.
6. Click a key → highlight + neighbors, show accidentals count, relative minor/major.
7. Play tonic chord button.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] All 12 major keys displayed on outer ring
- [x] Relative minors on inner ring
- [x] Clicking a key highlights it and neighbors
- [x] Accidentals (sharps/flats) count displayed correctly
- [x] Tonic chord plays via audio

## Done — 2025-06-10

Shipped CircleSpinner interactive with SVG circle of fifths, 12 major keys + relative minors,
key selection with neighbor highlighting, accidentals display, and tonic chord playback. Files:
`CircleSpinner.tsx`, `circleSpinner.data.ts`, `content/{en,uk}/circle-of-fifths.md`,
UI strings in `ui.ts`. `npm run build` → 0 errors.
