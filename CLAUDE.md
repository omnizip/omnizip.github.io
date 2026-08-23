# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/documentation website for the Omnizip suite of pure Ruby compression libraries (Omnizip, Cabriolet, Excavate). Static Vue 3 SPA deployed to GitHub Pages at https://www.omnizip.org.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build to dist/
npm run preview  # Preview the production build
```

There are no tests or lint configuration in this repo.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`: `npm ci` → `vite build` → writes `dist/CNAME` (www.omnizip.org) → deploy to GitHub Pages. Every push to main goes live.

## Architecture

Vue 3 (`<script setup>`) + vue-router 4 + Tailwind CSS 3 + Vite 6. `@` is aliased to `src/`.

**Content lives in three places:**

- `src/config.js` — single source of truth for all external URLs (docs sites, GitHub repos, RubyGems, crates.io). Product pages and the header/footer link through this; update it rather than hardcoding URLs.
- `src/views/` — one file per route. `Home.vue` composes organism sections; `OmnizipPage.vue` and `CabrioletPage.vue` are self-contained product pages with inline data arrays (features, code samples, formats); `RustPage.vue` describes the omnizip-rs crate family (sibling repo `../omnizip-rs`); `src/views/blog/` holds long-form posts.
- `src/components/` — atomic design: `atoms/` (Logo, ThemeToggle, badges, buttons), `molecules/` (cards, code blocks), `organisms/` (TheHeader, TheFooter, page sections like HeroSection).

The omnizip-rs pages should stay in sync with the sibling repos: crate list, benchmark numbers (run `omnizip-bench` in `../omnizip-rs`), and published versions on crates.io.

**Routes** (`src/router/index.js`): `/` (Home), `/omnizip`, `/cabriolet`, `/rust` (omnizip-rs product page), `/blog/omnizip-rs-announcement` (blog post). Product docs for the Ruby gems live on external sites (linked via config), not as routes here. Note: in production, `www.omnizip.org/<repo>/` paths are served by the org's other GitHub Pages sites (e.g. `/omnizip/` is the Ruby gem's just-the-docs site), so this SPA's deep routes rely on `public/404.html` redirecting to `/?path=<route>` (restored in `src/main.js`). Scroll behavior restores saved position, smooth-scrolls to hashes, otherwise resets to top.

**Theming** — class-based dark mode (`darkMode: 'class'` in tailwind.config.js). `useTheme` composable reads `localStorage.theme` or `prefers-color-scheme` and toggles the `dark` class on `<html>`. Because it's module-level state, all consumers share the same ref. Every visible element needs both light and dark classes (e.g. `text-light-text dark:text-dark-text`).

**Scroll animations** — elements with the `section-reveal` class start hidden and reveal via `useScrollAnimation` (IntersectionObserver adds `.visible`). Pages must call `initScrollAnimation()` in `onMounted`; Home.vue and the product pages show the pattern.

**Styling conventions:**

- Semantic color tokens in tailwind.config.js: `brand-primary` (red `#c5505c`), `accent-*`, and paired `light-*` / `dark-*` surface/text tokens. Use these, not raw Tailwind palette colors.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code), loaded from Google Fonts in `index.html`.
- Reusable composite classes are defined with `@apply` in `@layer components` in `src/assets/styles/main.css` (`container-narrow`, `container-wide`, `section-padding`, `glass-card`, `interactive-card`, `gradient-text`, `section-reveal`). Custom keyframe animations live in tailwind.config.js.
