---
id: 000-scaffold
title: Bilingual static shell + shared island infra
area: infra
depends_on: []
order: 0
---

# Bilingual static shell + shared island infra

**Goal:** a deployable EN/UK shell where every article renders as an interactive page, with the
registry → island → i18n → topic-variable path proven end-to-end.

## Done — 2026-06-10

Scaffolded from the starter kit and rethemed to **Лад / Tune** (music & guitar basics).

Built: Astro 5 + React islands, `marked` body rendering, path-based content ids (EN/UK don't
collide), `src/i18n/{ui,utils}.ts`, `BaseLayout` + Nav/Footer/LanguageToggle/ArticleCard/
SourcesPanel/ReadingProgress, the `Interactive.astro` registry + `Placeholder`, `useReducedMotion`,
`global.css` (tokens, light/dark, per-topic accents, reduced-motion), pages (root redirect, home,
`[lang]/[slug]`, about, 404), GitHub Pages deploy workflow. Demo content and SampleToy island
removed. Topics: theory, rhythm, guitar, harmony, ear. `npm run build` → 0 errors.

Next: author articles, wire topics, build interactives (`1xx`).
