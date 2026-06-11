---
id: 103-int-interval-trainer
title: Build interval-trainer interactive
area: interactive
component: interval-trainer
article: intervals
depends_on: [000-scaffold]
order: 103
---

# Build interval-trainer interactive

**Goal:** Ear training tool with quiz and practice modes for musical intervals.

**Context:** spec → `CLAUDE.md` › `interval-trainer` · article → `content/{en,uk}/intervals.md` ·
tech → `CONVENTIONS.md` · topic accent → `ear`.

## Steps

1. Create `src/components/interactive/IntervalTrainer.tsx` — quiz + practice modes.
2. Create `src/components/interactive/intervalTrainer.data.ts` — interval data with reference songs.
3. Add `intervalTrainer.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Quiz mode: play 2 notes, user picks interval, scoring.
6. Practice mode: pick an interval, hear it, see reference song.
7. Covers: m2, M2, m3, M3, P4, P5, octave.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] Quiz mode plays intervals and scores answers
- [x] Practice mode lets user explore each interval
- [x] Reference songs display in correct language
- [x] Score tracking works correctly
- [x] All 7 intervals covered with correct semitone counts

## Done — 2025-06-10

Shipped IntervalTrainer interactive with quiz mode (random interval → guess → score) and practice
mode (select interval → hear → see reference). Covers m2 through octave with bilingual reference
songs. Files: `IntervalTrainer.tsx`, `intervalTrainer.data.ts`, `content/{en,uk}/intervals.md`,
UI strings in `ui.ts`. `npm run build` → 0 errors.
