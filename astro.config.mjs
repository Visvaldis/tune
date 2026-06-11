// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// ---------------------------------------------------------------------------
// DEPLOY IDENTITY — change `site` + `base` to your repo, then nothing else.
// Deployed to GitHub Pages at  https://<owner>.github.io/<repo>/
// `site` + `base` make every generated URL resolve under the /<repo>/ subpath.
// Local dev also serves under the base, e.g. http://localhost:4321/storybook/
// ---------------------------------------------------------------------------
export default defineConfig({
  site: 'https://Visvaldis.github.io',
  base: '/tune',
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    // Article bodies are rendered manually with `marked` so the interactive
    // island can be injected at the <!-- INTERACTIVE --> marker. Keep GFM on.
    gfm: true,
  },
});
