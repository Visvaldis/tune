# Progress — Лад / Tune

_Last updated: 2026-06-10_

Narrative status. `CLAUDE.md` is the product spec; `README.md` is setup/deploy; the **live, actionable
backlog lives in [`tasks/`](tasks/README.md)** — one file per task, status tracked by folder
(`todo/` → `doing/` → `done/`). To advance the build, tell an agent *"do the next task"*. This file is
the high-level summary; append a dated note after each working session.

Legend: ✅ done · 🟡 placeholder/partial · ⬜ not started

---

## ✅ Done — base structure (deployable shell)

- **Scaffold** — Astro 5 + `@astrojs/react` + `marked`, strict TS. `npm run build` → 0 errors.
- **Content layer** — `content/<lang>/<slug>.md` with path-based ids so EN/UK don't collide; Zod schema.
- **Bilingual system** — `src/i18n/ui.ts` (every UI string EN+UK) + `utils.ts` (lang detection,
  `useTranslations`, `withBase`, `localizedPath`). Top-right toggle on every page; persists; restores scroll.
- **Pages** — root redirect, home (hero + card grid + topic filter), `[lang]/[slug]`, about, 404.
- **Article rendering** — body split at `<!-- INTERACTIVE -->`; large pull-quotes; reading-progress
  bar; "Explore further" sources panel; prev/next nav.
- **Interactive registry** — `Interactive.astro` mounts built islands; unbuilt ids show a topic-styled
  placeholder.
- **Design** — light/dark via `prefers-color-scheme`, per-topic accents, reduced-motion honored, mobile-first.
- **Deploy** — GitHub Pages workflow + `.nojekyll`; base-path-safe links.

## ⬜ To do — next (see [`tasks/`](tasks/README.md) for the live backlog)

1. **Author articles** + fill the interactive catalogue in `CLAUDE.md`.
2. **Build interactives** (`1xx`) — one island per article.
3. **Aggregating features** (`3xx`) — learning path / index, each spec'd in `docs/`.
4. **Polish & ship** (`9xx`) — a11y + Lighthouse ≥ 90, self-host fonts, deploy.

### Current content snapshot
- **0 articles** — shell is rethemed and ready; articles to be authored.

---

## Notes / decisions

- **Base path.** Every internal link goes through `withBase()` / `localizedPath()` or it 404s under
  the deploy subpath. Local dev serves under the same base.
- **Loader gotcha.** The glob loader uses frontmatter `slug` as the id by default, collapsing EN+UK;
  `generateId` forces path-based ids. See the comment in `src/content.config.ts`.
- **No backend / CMS / search / analytics** unless a `docs/<FEATURE>.md` explicitly adds one.

<!-- Append dated session notes below, newest last. -->

### 2026-06-10 — Bootstrap & retheme

Scaffolded from the starter kit. Rethemed to **Лад / Tune** (music & guitar basics).
Topics: theory, rhythm, guitar, harmony, ear — each with light/dark accent colors.
Removed demo content and SampleToy island. 0 articles; shell builds green with 0 errors.
Task board seeded (empty — no article tasks yet).
