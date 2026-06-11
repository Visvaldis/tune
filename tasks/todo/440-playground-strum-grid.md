---
id: 440-playground-strum-grid
title: Build the Strum Grid
area: feature
component: strum-grid
article:
depends_on: [400-feature-playground-foundation]
order: 440
---

# Build the Strum Grid

**Goal:** let learners construct and hear one bar of subdivision-based strumming.

**Context:** spec → `docs/PLAYGROUND.md` › `Strum Grid` · tech → `CONVENTIONS.md`.

## Steps

1. Source and record the supported subdivision count labels and stroke terminology.
2. Render one bar as an editable sequence of downstroke, upstroke, rest, and accent states.
3. Add keyboard and tap editing with undo-clear or reset behavior.
4. Add tempo, play/stop, count-in, looping, and a synchronized textual/visual playhead.
5. Synthesize clearly distinct stroke/accent sounds without shipping large audio assets.
6. Add starter patterns only if each pattern has a recorded source; otherwise ship a blank/default bar.

## Acceptance

- [ ] Every step exposes its count and stroke state as text, not icon or color alone.
- [ ] Editing remains usable without drag gestures and at 375px.
- [ ] Playback begins on explicit action, loops cleanly, and stops on unmount/page hide.
- [ ] The playhead has a reduced-motion-safe state and does not steal keyboard focus.
- [ ] Any bundled pattern and all notation labels have provenance records.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- Keep the MVP to one bar and one subdivision scheme.
- Do not add recording, microphone input, or waveform export.
