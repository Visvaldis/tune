---
id: 012-infra-sync-claude-rules
title: Sync task workflow rules into CLAUDE spec
area: infra
component:
article:
depends_on: [000-scaffold]
order: 12
---

# Sync task workflow rules into CLAUDE spec

**Goal:** Mirror the task-claiming and task-only commit rules in the project `CLAUDE.md` spec.

**Context:** spec -> `CLAUDE.md` · tech -> `CONVENTIONS.md` · board -> `tasks/README.md`.

## Steps

1. Add the task intake and claiming rule to `CLAUDE.md`.
2. Add the task-only commit rule to `CLAUDE.md`.
3. Append a Done note and move the task to `tasks/done/`.

## Acceptance

- [ ] `CLAUDE.md` includes the task verification/creation/claiming rule.
- [ ] `CLAUDE.md` includes the task-only commit rule.
- [ ] Task file moved to `tasks/done/` with a `## Done` note.

## Notes

- This is a team workflow alignment change.

## Done - 2026-06-11
Updated CLAUDE.md with task verification, creation, claiming, and task-only commit rules. Files touched: CLAUDE.md, 	asks/doing/012-infra-sync-claude-rules.md. TODO(owner): none. Follow-up tasks created: none.
