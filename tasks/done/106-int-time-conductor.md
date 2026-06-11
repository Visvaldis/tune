---
id: 106-int-time-conductor
title: Build time-conductor interactive
area: interactive
component: time-conductor
article: time-signatures
depends_on: [000-scaffold]
order: 106
---

# Build time-conductor interactive

**Goal:** Visual metronome for different time signatures with accent patterns and BPM control.

**Context:** spec → `CLAUDE.md` › `time-conductor` · article → `content/{en,uk}/time-signatures.md` ·
tech → `CONVENTIONS.md` · topic accent → `rhythm`.

## Steps

1. Create `src/components/interactive/TimeConductor.tsx` — time signature selector + metronome.
2. Create `src/components/interactive/timeConductor.data.ts` — time signature definitions.
3. Add `timeConductor.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Time signature picker: 2/4, 3/4, 4/4, 6/8.
6. Visual metronome with strong/weak beat indicators.
7. BPM slider, play/stop controls.
8. Beat counter adapts to selected time signature.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] All 4 time signatures selectable
- [x] Accent patterns correct (strong vs weak beats)
- [x] Visual beat indicator syncs with audio clicks
- [x] BPM slider adjusts tempo in real time
- [x] 6/8 compound time handled correctly

## Done — 2025-06-10

Shipped TimeConductor interactive with 4 time signatures, visual metronome with accent patterns,
BPM control, and beat counter. Files: `TimeConductor.tsx`, `timeConductor.data.ts`,
`content/{en,uk}/time-signatures.md`, UI strings in `ui.ts`. `npm run build` → 0 errors.
