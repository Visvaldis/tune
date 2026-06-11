---
id: 430-playground-chord-recipe
title: Build the Chord Recipe
area: feature
component: chord-recipe
article:
depends_on: [400-feature-playground-foundation]
order: 430
---

# Build the Chord Recipe

**Goal:** show how a chord name maps to a root, interval formula, note names, and keyboard keys.

**Context:** spec → `docs/PLAYGROUND.md` › `Chord Recipe` · tech → `CONVENTIONS.md`.

## Steps

1. Select a deliberately small MVP quality set and source every interval formula.
2. Implement root and quality controls with one safe default chord.
3. Derive chord tones from the formula and render degree, interval, and note-name rows.
4. Add a one-octave keyboard visualization with active chord tones and text equivalents.
5. Add a compare-quality action that keeps the root fixed and explains changed tones.
6. Document the enharmonic spelling policy and mark unsupported cases explicitly.

## Acceptance

- [ ] Chord tones are calculated from sourced formulas, not stored as an exhaustive chord table.
- [ ] The selected root, quality, formula, and resulting notes are available as text.
- [ ] Keyboard highlighting is redundant with labels and does not rely on color alone.
- [ ] Compare mode identifies which chord tones changed without inventing explanatory facts.
- [ ] All supported qualities and spelling limitations are documented in provenance data.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- Start with a small source-supported set; breadth is less important than correct spelling.
- Guitar chord diagrams are out of scope for this task.
