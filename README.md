# The Right Clean website — build plan

Plan for rebuilding therightcleancanada.com as a 4-page static site (Home, Services, About, Get a Quote, plus Privacy), worked through in 4 phases by Samuel and Claude Code.

## Files

| File | What it is |
|---|---|
| `CLAUDE.md` | Project brief for Claude Code: tech stack, rules, design system, content inventory. Goes in the repo root. |
| `PHASE-1-foundation.md` | Project setup, design system, layout, images, Vercel preview |
| `PHASE-2-pages.md` | Home, Services, About, Privacy, 404 |
| `PHASE-3-quote-form-seo-quality.md` | Quote form (Web3Forms), thank-you page, SEO, accessibility and performance checks |
| `PHASE-4-preview-feedback-launch.md` | Present to the family, revisions, going live on the real domain, handover |

## How to use

1. Create the repo. Put `CLAUDE.md` in the root and the `PHASE-*.md` files in `docs/`.
2. For each phase: do the "Samuel: before you start" list, paste the prompt into Claude Code, then check the "Done when" list together.
3. Don't start the next phase until the current "Done when" list is all ticked.

## Decisions made

- **Stack:** Eleventy v3 + EJS (via `@11ty/eleventy-plugin-ejs`) + Bootstrap 5 + vanilla JS, hosted free on Vercel. Static output, no server.
- **"Book now":** becomes "Get a Free Quote" and opens a quote request form that emails the business (Web3Forms). Mobile also gets a sticky Call / Get a Quote bar.
- **Images:** current site images for now; Samuel swaps in real ones before launch.
- **Content:** no invented facts. Unknown info shows as visible placeholders until the family confirms it. The current site's reviews look like template placeholders and won't be reused.
