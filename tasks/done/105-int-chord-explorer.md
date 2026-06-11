---
id: 105-int-chord-explorer
title: Build chord-explorer interactive
area: interactive
component: chord-explorer
article: basic-chords
depends_on: [000-scaffold]
order: 105
---

# Build chord-explorer interactive

**Goal:** Chord diagram viewer with fingering display and audio strum/arpeggio playback.

**Context:** spec → `CLAUDE.md` › `chord-explorer` · article → `content/{en,uk}/basic-chords.md` ·
tech → `CONVENTIONS.md` · topic accent → `harmony`.

## Steps

1. Create `src/components/interactive/ChordExplorer.tsx` — chord selector + diagram + audio.
2. Create `src/components/interactive/chordExplorer.data.ts` — chord shapes, fingerings, and notes.
3. Add `chordExplorer.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Grid of 7 chord buttons (Em, Am, C, G, D, E, A).
6. Chord diagram with 6 strings, fret dots, finger numbers, X/O markers.
7. Strum and string-by-string playback modes.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] All 7 chords display correct fingering diagrams
- [x] Strum plays all chord notes simultaneously
- [x] String-by-string mode plays notes in sequence
- [x] X/O markers show muted/open strings
- [x] Finger numbers display on fret dots

## Done — 2025-06-10

Shipped ChordExplorer interactive with 7 beginner chords, SVG chord diagrams with fingering,
X/O string markers, strum and string-by-string playback. Files: `ChordExplorer.tsx`,
`chordExplorer.data.ts`, `content/{en,uk}/basic-chords.md`, UI strings in `ui.ts`.
`npm run build` → 0 errors.
