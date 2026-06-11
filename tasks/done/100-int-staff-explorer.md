---
id: 100-int-staff-explorer
title: Build staff-explorer interactive
area: interactive
component: staff-explorer
article: notes-and-staff
depends_on: [000-scaffold]
order: 100
---

# Build staff-explorer interactive

**Goal:** Draggable note on a 5-line treble clef staff that shows note names and plays pitches.

**Context:** spec → `CLAUDE.md` › `staff-explorer` · article → `content/{en,uk}/notes-and-staff.md` ·
tech → `CONVENTIONS.md` · topic accent → `theory`.

## Steps

1. Create `src/components/interactive/StaffExplorer.tsx` — SVG treble clef staff with draggable note.
2. Create `src/components/interactive/staffExplorer.data.ts` — note position/name mappings.
3. Add `staffExplorer.*` UI strings to `src/i18n/ui.ts` (EN + UK).
4. Register in `Interactive.astro` (import, BUILT set, conditional render).
5. Wire audio playback via shared `audio.utils.ts`.
6. Mobile fallback: tap-to-place instead of drag.
7. Keyboard: Arrow up/down to move note, Space to play.

## Acceptance

- See the standard checklist in `CONVENTIONS.md`, plus:
- [x] Note snaps to staff lines and spaces
- [x] Note name label updates in current language
- [x] Audio plays correct pitch for each position
- [x] Tap fallback works on mobile (375px)
- [x] Arrow keys move note, Space plays tone

## Done — 2025-06-10

Shipped StaffExplorer interactive with full SVG treble clef, draggable/tappable note, pitch playback,
bilingual note names, and keyboard navigation. Files: `StaffExplorer.tsx`, `staffExplorer.data.ts`,
`content/{en,uk}/notes-and-staff.md`, UI strings in `ui.ts`. `npm run build` → 0 errors.
