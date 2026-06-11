---
id: 104-int-scale-builder
title: Build scale-builder interactive
area: interactive
component: scale-builder
article: major-scale
depends_on: [000-scaffold]
order: 104
---

# Build scale-builder interactive

**Goal:** Piano keyboard where users pick notes to build a major scale and check against W-W-H-W-W-W-H.

**Context:** spec → `CLAUDE.md` › `scale-builder` · article → `content/{en,uk}/major-scale.md` ·
tech → `CONVENTIONS.md` · topic accent → `theory`.

## Steps

1. Create `src/components/interactive/ScaleBuilder.tsx` — 2-octave SVG piano keyboard.
2. Create `src/components/interactive/scaleBuilder.data.ts` — scale patterns and note data.
3. Add `scaleBuilder.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Root note selector, click keys to build scale.
6. Check button validates against W-W-H-W-W-W-H pattern.
7. Guide mode highlights next correct key.
8. Play button for completed scale.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] Piano keys are clickable to select notes
- [x] Validation checks against correct major scale pattern
- [x] Guide mode shows next expected key
- [x] Play scale button works with audio
- [x] Root note selector changes the target scale

## Done — 2025-06-10

Shipped ScaleBuilder interactive with 2-octave piano keyboard, root note selector, click-to-build
scale construction, W-W-H-W-W-W-H validation, guide mode, and scale playback. Files:
`ScaleBuilder.tsx`, `scaleBuilder.data.ts`, `content/{en,uk}/major-scale.md`, UI strings in `ui.ts`.
`npm run build` → 0 errors.
