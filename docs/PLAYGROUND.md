# PLAYGROUND.md — Music playground

A bilingual collection of small practice tools that work without reading an article first. The
playground is an entry point for experimentation, not a replacement for the authored lessons.

## 1. Why

The site currently has no articles, so new visitors need something useful they can start in one
click. The playground offers focused tools with an immediate action, visible or audible feedback,
and one learning objective each.

**Pitch:** pick a tool, touch one control, and learn by hearing or seeing the result.

Non-goals: accounts, saved progress, competitive scoring, microphone input, MIDI hardware, a full
DAW, or a general-purpose notation editor.

## 2. Information architecture

```text
/{lang}/playground/                    tool catalogue
/{lang}/playground/beat-lab/           pulse and meter practice
/{lang}/playground/fretboard-map/      guitar note discovery
/{lang}/playground/chord-recipe/       chord construction
/{lang}/playground/strum-grid/         strumming and subdivision
/{lang}/playground/interval-ear/       interval recognition
/{lang}/playground/mini-jam/           simple layered music creation

src/components/playground/             React tool islands
src/data/playground/                    sourced music data and provenance
src/pages/[lang]/playground/            static Astro routes
```

Add one `Playground` / `Майданчик` link to `Nav.astro`. The hub shows six cards with a localized
title, one-sentence learning goal, topic tag, and a clear start action. Tool routes preserve the
site-wide language toggle behavior.

## 3. Experience principles

- **Immediate start:** no setup form; each route loads a safe default state and one primary action.
- **Focused tools first:** each foundational tool teaches one concept; Mini Jam combines them as a capstone.
- **Practice before testing:** every tool opens in explore mode; quiz/challenge modes are optional.
- **Visible state:** audio always has synchronized visual feedback and a textual status.
- **Local only:** preferences may use `localStorage`; no user data leaves the browser.
- **Mobile first:** primary controls fit at 375px without horizontal page scrolling.
- **Quiet by default:** Web Audio starts only after an explicit user gesture and has a stop control.

## 4. Initial tools

### Beat Lab

Start/stop a steady pulse, change tempo, choose a small beat grouping, accent the first beat, and tap
to estimate tempo. A beat strip and count label move with the sound. The learning goal is to connect
tempo, pulse, and the recurring first beat of a measure.

### Fretboard Map

Tap a string and fret to reveal its note, highlight every occurrence of a selected pitch class, or
hide labels for a short locate-the-note challenge. The learning goal is to see how notes repeat
across standard-tuned guitar strings and the first twelve frets.

### Chord Recipe

Choose a root and a bounded chord quality, then see the scale-degree recipe, note names, and a simple
keyboard visualization. A compare action changes only the quality while keeping the root fixed. The
learning goal is to understand that chord names describe a root plus an interval recipe.

### Strum Grid

Build one bar by setting each subdivision to downstroke, upstroke, rest, or accent, then play it as a
loop with a visible playhead. Include a few named starter patterns only when their provenance is
recorded. The learning goal is to connect counting subdivisions with physical strum direction.

### Interval Ear

Hear two generated notes, choose an interval answer from a deliberately small set, replay, and reveal
the result with a visual distance display. Explore mode lets the learner choose an interval first;
challenge mode generates a prompt. The learning goal is to connect pitch distance with an interval
name by ear.

### Mini Jam Builder

Start from a playable four-bar loop and configure three layers: choose one sourced beat pattern,
choose one guitar chord for each bar, and place piano notes on a compact step grid. Global controls
set tempo and playback; each layer has mute and reset controls. The piano note palette is deliberately
small and displays how its notes relate to the selected harmonic context. The learning goal is to
hear how rhythm, harmony, and melody combine without presenting a full production interface.

MVP boundaries: one fixed meter, four bars, a small sourced beat library, a bounded chord set, one
guitar voicing per supported chord, one piano timbre, and no recording, waveform editing, effects,
automation, accounts, sharing, MIDI, or audio export. The initial state must play immediately after
one explicit user action; configuration is optional.

## 5. Data and sourcing

No article-derived data exists yet. Before a tool ships, its task must add a provenance record for
every musical convention or dataset it uses. Suitable source classes are open music-theory textbooks,
standards documents, and established instrument references. Each data module should include source
URLs and a short note identifying which values they support.

Required source coverage:

- Beat Lab: tempo terminology, meter/beat grouping labels, and tap-tempo calculation behavior.
- Fretboard Map: standard six-string tuning, chromatic pitch order, and octave repetition.
- Chord Recipe: supported chord formulas and note spelling policy.
- Strum Grid: subdivision count labels and any bundled starter pattern.
- Interval Ear: interval names, semitone distances, and playback reference/tuning model.
- Mini Jam Builder: beat presets, chord formulas and guitar voicings, piano note palette, meter,
  subdivision, tuning/reference model, and any bundled default progression or melody.

Do not silently treat enharmonic spelling as trivial. Define and document the MVP spelling policy;
unsupported theoretical spelling must be a visible limitation or `TODO(owner)`.

## 6. Shared technical contract

- Tool island props: `{ lang: 'en' | 'uk' }`; no internal language switcher.
- All chrome strings live in `src/i18n/ui.ts` under `playground.*` or the tool namespace.
- Bulky bilingual labels/data live beside the tool or in `src/data/playground/`.
- Use native controls and topic CSS variables; no hardcoded colors.
- Honor `prefers-reduced-motion`; audio timing must not depend on CSS animation.
- Suspend and dispose Web Audio resources when stopped or when the page is hidden/unmounted.
- Provide keyboard operation, bilingual aria text, a textual live status, and a mute/stop path.
- A tool must remain educational when audio is unavailable: show its current count, notes, pattern,
  or interval visually.

## 7. Delivery plan

1. `400-feature-playground-foundation` — routes, hub, nav, localization, and shared contracts.
2. `410-playground-beat-lab` — pulse, meter, tap tempo, and visual count.
3. `420-playground-fretboard-map` — note map, highlighting, and locate challenge.
4. `430-playground-chord-recipe` — formulas, note derivation, and keyboard view.
5. `440-playground-strum-grid` — editable subdivision loop and playhead.
6. `450-playground-interval-ear` — explore and challenge listening modes.
7. `460-playground-mini-jam` — four-bar beat, guitar chord, and piano loop builder.

The six tool tasks depend only on the foundation task and can be implemented in parallel. Mini Jam
should reuse shared transport, synthesis, or sourced data modules from completed tools when available,
but those tools are not hard dependencies.
