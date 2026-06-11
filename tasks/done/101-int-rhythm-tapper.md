---
id: 101-int-rhythm-tapper
title: Build rhythm-tapper interactive
area: interactive
component: rhythm-tapper
article: what-is-rhythm
depends_on: [000-scaffold]
order: 101
---

# Build rhythm-tapper interactive

**Goal:** Visual metronome with tap recording — user taps to record a rhythm and plays it back.

**Context:** spec → `CLAUDE.md` › `rhythm-tapper` · article → `content/{en,uk}/what-is-rhythm.md` ·
tech → `CONVENTIONS.md` · topic accent → `rhythm`.

## Steps

1. Create `src/components/interactive/RhythmTapper.tsx` — metronome + tap recorder with beat grid.
2. Create `src/components/interactive/rhythmTapper.data.ts` — preset rhythm patterns.
3. Add `rhythmTapper.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. BPM slider (60–180), record/stop/playback/clear controls.
6. Beat grid visualization of recorded taps.
7. Preset patterns (on-beat, syncopated, etc.).

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] Tap recording via spacebar and click
- [x] Beat grid shows recorded taps visually
- [x] Playback reproduces recorded rhythm
- [x] BPM slider adjusts tempo
- [x] Preset patterns load correctly

## Done — 2025-06-10

Shipped RhythmTapper interactive with metronome, tap recording, beat grid visualization, playback,
BPM control, and preset patterns. Files: `RhythmTapper.tsx`, `rhythmTapper.data.ts`,
`content/{en,uk}/what-is-rhythm.md`, UI strings in `ui.ts`. `npm run build` → 0 errors.
