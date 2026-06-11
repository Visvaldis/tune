---
id: 102-int-guitar-anatomy
title: Build guitar-anatomy interactive
area: interactive
component: guitar-anatomy
article: anatomy-of-guitar
depends_on: [000-scaffold]
order: 102
---

# Build guitar-anatomy interactive

**Goal:** Interactive SVG guitar with hoverable/tappable regions showing part names and descriptions.

**Context:** spec → `CLAUDE.md` › `guitar-anatomy` · article → `content/{en,uk}/anatomy-of-guitar.md` ·
tech → `CONVENTIONS.md` · topic accent → `guitar`.

## Steps

1. Create `src/components/interactive/GuitarAnatomy.tsx` — full acoustic guitar SVG with 10-12 regions.
2. Create `src/components/interactive/guitarAnatomy.data.ts` — part names and descriptions (EN + UK).
3. Add `guitarAnatomy.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Hover highlights part, tap selects on mobile.
6. Info panel shows part name + 1-sentence description in current language.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] All guitar parts are hoverable/tappable
- [x] Part names display in correct language
- [x] Descriptions are bilingual and article-sourced
- [x] SVG renders cleanly at 375px
- [x] Keyboard navigation between parts

## Done — 2025-06-10

Shipped GuitarAnatomy interactive with full SVG acoustic guitar, 10+ hoverable/tappable regions,
bilingual part names and descriptions, and keyboard navigation. Files: `GuitarAnatomy.tsx`,
`guitarAnatomy.data.ts`, `content/{en,uk}/anatomy-of-guitar.md`, UI strings in `ui.ts`.
`npm run build` → 0 errors.
