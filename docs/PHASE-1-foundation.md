# Phase 1 — Foundation

**Goal:** A working Eleventy + EJS + Bootstrap project with the design system, shared layout (header, footer, mobile bar), site data and images in place, deployed to a Vercel preview URL. By the end, every page exists as an empty shell that looks on-brand.

**Time estimate:** 1 session.

---

## Samuel: before you start

- [ ] Create an empty GitHub repo, e.g. `the-right-clean-site`.
- [ ] Put `CLAUDE.md` in the repo root, and the `PHASE-*.md` files in a `/docs` folder.
- [ ] Have Node 20+ installed (`node -v`).
- [ ] Send the family these questions now so answers arrive by Phase 2:
  1. Phone number, and can it receive texts?
  2. Which cities or areas do you serve?
  3. Business hours? Evenings and weekends?
  4. Are you insured? WCB coverage? Bonded?
  5. Does info@rightclean.ca receive mail? Who should get quote requests?
  6. Logo file (best quality you have) and any brand colours you like
  7. Real photos of your work, team, uniforms, vehicle
  8. 2–3 real reviews (first name + last initial), or a link to your Google reviews
  9. Is the photo on your About page really Gbemisola?
  10. Who has the Hostinger login for therightcleancanada.com?

## Claude Code: prompt to paste

> Read `CLAUDE.md`, then do Phase 1 from `docs/PHASE-1-foundation.md`. Work through the tasks in order and commit after each one. Stop at the end of Phase 1 and give me a summary, the local run command, and anything you need from me.

## Claude Code: tasks

### 1.1 Project setup
- `npm init`, then install `@11ty/eleventy`, `@11ty/eleventy-plugin-ejs`, `bootstrap`, `bootstrap-icons`.
- `eleventy.config.js` (ESM): add the EJS plugin; input `src`, output `_site`; passthrough copy `src/assets`; copy Bootstrap CSS/JS bundle and Bootstrap Icons font files from `node_modules` into `_site/assets/vendor/`.
- Scripts: `npm start` (serve with live reload), `npm run build`.
- `.gitignore`: `node_modules`, `_site`.
- `vercel.json`: build command `npm run build`, output directory `_site`, `cleanUrls: true`.

### 1.2 Site data
- `src/_data/site.json` with: `name` ("The Right Clean"), `tagline` ("The Right Clean. Every Time."), `phone` ("TODO"), `phoneCanText` (null), `email` ("info@rightclean.ca"), `emailConfirmed` (false), `serviceArea` ("TODO"), `hours` ("TODO"), `owner` ("Gbemisola Famade"), `yearsExperience` (7), `insured` (null), `socials` (Facebook, Instagram URLs from CLAUDE.md), `web3formsKey` ("TODO"), `url` (preview URL, update later), `preview` (true).
- `src/_data/services.json`: the 6 services from CLAUDE.md, each with `slug`, `title`, `shortText`, `icon` (Bootstrap Icons name), `image`, and an empty `includes` array (filled in Phase 2).
- `src/_data/reviews.json`: `[]`.
- A small helper (EJS partial or Eleventy filter) `isTodo(value)` so templates can show placeholders for unconfirmed info.

### 1.3 Images
- Download the images listed in CLAUDE.md into `src/assets/images/` with descriptive names (`hero-cleaning.jpg`, `cleaner-wiping-table.png`, `logo.png`, etc.).
- Resize: hero max 1920px wide, others max 1200px. Save WebP versions alongside. Write a short `src/assets/images/CREDITS.md` noting the source of each image (Unsplash, AI-generated, from old site) so Samuel knows what to replace.

### 1.4 Design system
- `src/assets/css/main.css`: CSS variables from CLAUDE.md, Google Fonts (Plus Jakarta Sans + Inter), base typography scale, buttons (primary pill, outline), section spacing, cards, badges, the TODO placeholder style (dashed yellow box), focus styles.
- Override Bootstrap's primary colour via CSS variables so Bootstrap components match.

### 1.5 Layout and shared partials
- `layouts/base.ejs`: `<head>` partial (charset, viewport without zoom limits, title from front matter + site name, meta description, preview `noindex` when `site.preview`, fonts preconnect, CSS), header, `<main>`, footer, mobile CTA bar, scripts.
- `partials/header.ejs`: sticky navbar, logo, links Home / Services / About / Contact (Contact points to `/quote/`), "Get a Free Quote" button. Active link state. Hamburger on mobile.
- `partials/footer.ejs`: logo + tagline, quick links, contact info from `site.json` (placeholders if TODO), socials, Privacy link, copyright with the current year (computed at build), and "Preview built by Samuel Olabode" when `site.preview`.
- `partials/mobile-cta-bar.ejs`: fixed bottom bar under 768px with "Call" (`tel:`) and "Get a Quote". Hide "Call" if phone is TODO. Add bottom padding to `body` on mobile so the bar doesn't cover content.
- `partials/quote-cta.ejs`: reusable "Ready for The Right Clean?" band with a button to `/quote/`.

### 1.6 Page shells
- Create `index.ejs`, `services.ejs`, `about.ejs`, `quote.ejs`, `thank-you.ejs`, `privacy.ejs`, `404.ejs` with front matter (title, description, permalink) and a heading, using the base layout.

### 1.7 JS
- `src/assets/js/main.js`: close mobile menu after a link is clicked, add a "scrolled" class to the header for a shadow, and nothing else yet.

### 1.8 Deploy
- Push to GitHub. Give Samuel the steps to import the repo on Vercel (Samuel does the Vercel login part).

## Done when

- [ ] `npm start` runs, and all 7 pages load with header, footer and mobile bar.
- [ ] No "BrightShine" anywhere (`grep -ri brightshine src` returns nothing).
- [ ] Looks right at 375px, 768px and 1280px wide.
- [ ] Preview `noindex` tag is present in the page source.
- [ ] Vercel preview URL works, and `site.url` is updated to it.
