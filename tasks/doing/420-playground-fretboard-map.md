---
id: 420-playground-fretboard-map
title: Build the Fretboard Map
area: feature
component: fretboard-map
article:
depends_on: [400-feature-playground-foundation]
order: 420
---

# Build the Fretboard Map

**Goal:** make standard guitar note locations discoverable through tapping, highlighting, and a small challenge mode.

**Context:** spec → `docs/PLAYGROUND.md` › `Fretboard Map` · tech → `CONVENTIONS.md`.

## Steps

1. Source and record standard six-string tuning, pitch order, and octave repetition.
2. Render six strings and frets zero through twelve as a semantic, responsive control grid.
3. Let users select a position to reveal its note and select a pitch class to highlight all matches.
4. Add explore and locate-the-note modes with reveal, next, and reset controls.
5. Define a documented sharp/flat display policy and avoid unsupported theoretical spellings.
6. Provide a compact 375px presentation with tap navigation and no page-level horizontal overflow.

## Acceptance

- [ ] Every displayed position is derived from sourced tuning data rather than handwritten labels.
- [ ] Open strings and the twelfth fret are represented and visually distinguishable.
- [ ] Every fret position is reachable and understandable by keyboard and screen reader.
- [ ] Challenge prompts never request notes outside the rendered range.
- [ ] The spelling policy is visible in code/data notes and localized where exposed to users.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- Prefer buttons or a roving-tabindex grid over pointer-only SVG interaction.
- Do not add alternate tunings in the MVP.
