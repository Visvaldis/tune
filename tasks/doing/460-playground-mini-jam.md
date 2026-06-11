---
id: 460-playground-mini-jam
title: Build the Mini Jam Builder
area: feature
component: mini-jam
article:
depends_on: [400-feature-playground-foundation]
order: 460
---

# Build the Mini Jam Builder

**Goal:** let learners create a simple four-bar loop by configuring beat, guitar chords, and piano notes.

**Context:** spec → `docs/PLAYGROUND.md` › `Mini Jam Builder` · tech → `CONVENTIONS.md`.

## Steps

1. Source and record the fixed meter, subdivision, beat presets, chord formulas, guitar voicings, piano note palette, and playback tuning model.
2. Create a four-bar transport with tempo, play/stop, current-bar display, layer mute, and reset controls.
3. Add a beat selector with a small sourced preset set and a readable subdivision preview.
4. Add four guitar chord slots, one per bar, using a bounded chord set and one documented voicing per chord.
5. Add a compact piano step grid whose available notes are clearly labeled and related to the selected harmonic context.
6. Ship a sourced playable default loop, plus per-layer clear/reset actions so configuration remains optional.
7. Schedule all layers from one audio clock and cleanly stop or suspend playback on page hide and unmount.
8. Reuse shared transport, synthesis, chord, or provenance modules from other playground tools when available without copying divergent data.

## Acceptance

- [ ] One explicit play action starts a coherent default loop without requiring setup.
- [ ] Users can change the beat, each bar's guitar chord, piano steps, tempo, and layer mute state.
- [ ] The editor is bounded to four bars and does not expose recording, effects, automation, MIDI, sharing, or export.
- [ ] Beat steps, chord names, guitar voicings, piano notes, current bar, and mute state are all available as text.
- [ ] Audio layers stay synchronized through repeated edits, loops, rapid play/stop, and tempo changes.
- [ ] Editing never requires dragging and remains usable without audio or animation.
- [ ] Every bundled preset, progression, voicing, note set, and tuning assumption has a provenance record.
- [ ] The UI explains the relationship between rhythm, chords, and piano notes without unsourced theory claims.
- [ ] Works in EN/UK, dark/light, reduced motion, keyboard-only, and at 375px.
- [ ] `npm run build` completes with zero errors.

## Notes

- Prefer synthesized sounds and a small data footprint over recorded sample packs.
- If theoretically correct chord spelling or voice leading exceeds the MVP policy, expose the limitation and add `TODO(owner)` rather than faking it.
- Follow-up candidates: local save/load, more bars, alternate meters, and export. Do not include them in the MVP.
