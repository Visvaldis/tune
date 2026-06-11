---
id: 011-feature-plan-mini-jam
title: Add the Mini Jam Builder roadmap
area: feature
component: mini-jam
article:
depends_on: []
order: 11
---

# Add the Mini Jam Builder roadmap

**Goal:** specify and queue a simple configurable music-making playground tool.

**Context:** playground spec → `docs/PLAYGROUND.md` · product → `AGENTS.md` · tech → `CONVENTIONS.md`.

## Steps

1. Define a bounded beat, guitar chord, and piano workflow.
2. Add the route and data requirements to the playground specification.
3. Create an implementation-ready task with accessibility and sourcing criteria.
4. Update foundation scope, task index, and progress notes.
5. Validate ids, dependencies, and documentation consistency.

## Acceptance

- [x] The tool starts with a playable default loop.
- [x] Configuration is useful without becoming a full DAW.
- [x] Beat, chord, voicing, and piano data require explicit provenance.
- [x] The implementation task covers audio lifecycle, mobile, keyboard, and localization.

## Notes

- Prefer a four-bar capstone tool that combines concepts from the focused playground tools.

## Done — 2026-06-11

Added the Mini Jam Builder to the playground specification, foundation scope, task index, and
progress notes. Created `460-playground-mini-jam` with a bounded four-bar MVP and explicit sourcing,
audio lifecycle, localization, accessibility, and mobile requirements. No product code was changed.
