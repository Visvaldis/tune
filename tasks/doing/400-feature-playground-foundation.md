---
id: 400-feature-playground-foundation
title: Build the playground foundation
area: feature
component: playground
article:
depends_on: []
order: 400
---

# Build the playground foundation

**Goal:** add the bilingual playground hub, tool routes, navigation entry, and shared implementation contracts.

**Context:** spec → `docs/PLAYGROUND.md` · product → `AGENTS.md` · tech → `CONVENTIONS.md`.

## Steps

1. Add the localized playground hub and six static tool routes.
2. Add the playground nav link and all shared EN/UK strings to `src/i18n/ui.ts`.
3. Build reusable card, tool-shell, status, and unavailable-audio UI primitives.
4. Define `src/data/playground/` provenance types and a documented note-spelling policy.
5. Add placeholders on each route that describe the learning goal without pretending the tool is built.
6. Verify base-path-safe links, language switching, keyboard focus order, and 375px layout.

## Acceptance

- [ ] `/{lang}/playground/` lists all six tools with localized names and learning goals.
- [ ] Every tool route builds statically and preserves the site-wide language toggle behavior.
- [ ] The nav exposes the playground on desktop and mobile layouts.
- [ ] Shared UI primitives use topic variables and contain no hardcoded user-facing strings.
- [ ] Provenance records can identify a value, source URL, and support note.
- [ ] `npm run build` completes with zero errors.

## Notes

- Do not build tool behavior in this task; create stable shells for parallel implementation.
- Keep tool cards useful before articles exist; do not invent lesson counts or progress state.
