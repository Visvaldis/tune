---
id: 450-playground-interval-ear
title: Build the Interval Ear Trainer
area: feature
component: interval-ear
article:
depends_on: [400-feature-playground-foundation]
order: 450
---

# Build the Interval Ear Trainer

**Goal:** connect interval names with audible pitch distance through explore and low-pressure challenge modes.

**Context:** spec → `docs/PLAYGROUND.md` › `Interval Ear` · tech → `CONVENTIONS.md`.

## Steps

1. Choose a small interval set and source each interval name and semitone distance.
2. Define and source the playback tuning/reference model used to generate pitches.
3. Implement explore mode where selecting an interval plays and visualizes it.
4. Implement challenge mode with play, replay, answer choices, reveal, and next controls.
5. Keep generated notes within a documented comfortable playback range and avoid clipping.
6. Add text feedback that states the starting note, ending note, distance, and answer after reveal.

## Acceptance

- [ ] Audio starts only after user action and can be replayed or stopped predictably.
- [ ] Challenge generation uses only the documented interval set and playback range.
- [ ] Correctness feedback is available to screen readers and does not rely on color or sound alone.
- [ ] Explore mode remains fully useful when challenge mode is ignored.
- [ ] Interval data, pitch generation, and tuning assumptions have provenance records.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- No streaks, leaderboards, or punitive scoring in the MVP.
- Harmonic intervals and descending playback may be follow-up tasks after the ascending mode is solid.
