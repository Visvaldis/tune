---
id: 108-int-tuner-practice
title: Build tuner-practice interactive
area: interactive
component: tuner-practice
article: tuning-guitar
depends_on: [000-scaffold]
order: 108
---

# Build tuner-practice interactive

**Goal:** Reference tone player for each guitar string with pitch-matching challenge mode.

**Context:** spec → `CLAUDE.md` › `tuner-practice` · article → `content/{en,uk}/tuning-guitar.md` ·
tech → `CONVENTIONS.md` · topic accent → `guitar`.

## Steps

1. Create `src/components/interactive/TunerPractice.tsx` — 6 string buttons + challenge mode.
2. Create `src/components/interactive/tunerPractice.data.ts` — string frequencies and names.
3. Add `tunerPractice.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro`.
5. Six string buttons (E2, A2, D3, G3, B3, E4) play reference tones.
6. Challenge mode: detuned tone + up/down buttons to match pitch.
7. Visual feedback: too low / in tune / too high.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] All 6 strings play correct reference frequencies
- [x] Challenge mode generates detuned starting tone
- [x] Up/down buttons adjust pitch toward target
- [x] Visual indicator shows tuning status
- [x] String names display in correct language

## Done — 2025-06-10

Shipped TunerPractice interactive with 6 guitar string reference tones, pitch-matching challenge
mode with up/down controls, and visual tuning feedback. Files: `TunerPractice.tsx`,
`tunerPractice.data.ts`, `content/{en,uk}/tuning-guitar.md`, UI strings in `ui.ts`.
`npm run build` → 0 errors.
