---
id: 410-playground-beat-lab
title: Build the Beat Lab
area: feature
component: beat-lab
article:
depends_on: [400-feature-playground-foundation]
order: 410
---

# Build the Beat Lab

**Goal:** create an immediate pulse-and-meter practice tool with audible and visible feedback.

**Context:** spec → `docs/PLAYGROUND.md` › `Beat Lab` · tech → `CONVENTIONS.md`.

## Steps

1. Source and record the supported tempo and beat-grouping terminology.
2. Implement start/stop, tempo range, beat grouping, and first-beat accent controls.
3. Add a tap-tempo button with a documented averaging/reset rule and manual tempo fallback.
4. Schedule short Web Audio clicks ahead of playback and keep a synchronized visual beat strip.
5. Show current tempo, beat number, and stopped/running state as localized text.
6. Handle tab hiding, unmounting, reduced motion, audio failure, and rapid start/stop safely.

## Acceptance

- [ ] Sound starts only after a user gesture and always has an obvious stop control.
- [ ] Tempo can be changed by keyboard-accessible controls and tap input.
- [ ] The first beat is distinguishable visually and audibly when accent is enabled.
- [ ] Timing does not drift noticeably during a two-minute manual check.
- [ ] The tool remains understandable with muted or unavailable audio.
- [ ] All displayed musical terms and calculation rules have provenance records.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- Avoid a long-lived global `AudioContext`; create/resume it from a user action and clean it up.
- Keep the MVP to pulse and recurring beat grouping, not a full drum machine.
