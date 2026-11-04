# CLAUDE.md — The Right Clean website

This file is the project brief for Claude Code. Read it fully before doing any work, and follow the current phase file (`PHASE-1` to `PHASE-4`). Only do the work in the phase you're asked to do.

## The project

- **Client:** The Right Clean, a cleaning company owned by Gbemisola Famade (7+ years in the cleaning industry). Family member of the developer.
- **Developer:** Samuel Olabode, web developer in Edmonton.
- **Goal:** A 4-page site (plus a privacy page) that replaces their current website. It should be good enough that they want it as their real site.
- **Current site:** https://therightcleancanada.com (Hostinger AI Builder). Use it as the content source only. Don't copy its layout.

## Tech stack (decided)

| Part | Choice |
|---|---|
| Static site generator | Eleventy (11ty) v3, ESM config (`eleventy.config.js`) |
| Templates | EJS via `@11ty/eleventy-plugin-ejs` (EJS was moved out of Eleventy core in v3) |
| CSS | Bootstrap 5 (npm) + one custom stylesheet `src/assets/css/main.css` |
| JS | Vanilla JavaScript, no frameworks. Bootstrap bundle JS for the navbar collapse only |
| Form | Web3Forms (free, no server). Access key goes in site data, never hard-coded in many places |
| Hosting | Vercel (static output from `_site`) |
| Code | GitHub repo |

No server, no database, no build-time secrets. `npm run build` must produce plain static files in `_site/`.

### EJS include syntax in Eleventy
- `<%- include('/partials/header') %>` loads `src/_includes/partials/header.ejs` (leading slash = from `_includes`).
- Pass data: `<%- include('/partials/service-card', { service }) %>`.
- Included files don't process front matter.

## Folder structure

```
src/
  _data/
    site.json        # business info: name, phone, email, area, hours, socials, form key, preview flag
    services.json    # the 6 services (single source for Home cards + Services page)
    reviews.json     # real reviews only; empty array hides the section
  _includes/
    layouts/base.ejs
    partials/        # head, header, footer, mobile-cta-bar, quote-cta, service-card, etc.
  assets/
    css/main.css
    js/main.js
    images/          # downloaded images, renamed descriptively
  index.ejs          # Home
  services.ejs
  about.ejs
  quote.ejs          # Get a Free Quote (form)
  thank-you.ejs
  privacy.ejs
  404.ejs
eleventy.config.js
package.json
vercel.json
```

## Rules

1. **The business name is "The Right Clean" everywhere.** Never use "BrightShine" (a leftover from the old builder).
2. **No fake content.** Don't invent reviews, phone numbers, addresses, stats, certifications, years in business or client names. Use `TODO:` values in `site.json`. Anything that isn't confirmed shows as a clearly styled placeholder (e.g. a dashed yellow box saying "Add phone number"), except where Samuel has asked for a clean demo (Web3Forms key, reply time, privacy review): those are tracked in `docs/OPEN-ITEMS.md` instead of shown on the page.
3. **Don't copy the current site's reviews.** They look like template placeholders: one mentions "Body Sculpting & Firming Ritual at Mirela beauty salon", another says "BrightShine transformed my apartment". `reviews.json` starts empty and the reviews section hides itself when empty.
4. **All business info comes from `src/_data/site.json`.** Never hard-code the phone, email, area or hours in templates.
5. **Preview mode:** while `site.preview` is `true`, every page has `<meta name="robots" content="noindex, nofollow">` and robots.txt blocks crawlers. (Samuel removed the visible "Preview built by" footer credit in Nov 2026 so the demo reads as the real business site.)
6. **Accessibility:** every image has meaningful alt text (or `alt=""` if decorative), colour contrast meets WCAG AA, pinch-zoom is never disabled, forms have labels and work by keyboard.
7. **Mobile first.** Design and test at 375px wide first, then tablet and desktop.
8. **Performance:** images are resized and served as WebP/JPG with width/height set, `loading="lazy"` below the fold. Target Lighthouse 90+ in all four categories.
9. **Keep it simple.** No extra libraries unless a phase file asks for one. Ask Samuel before adding a dependency.
10. **Commit after each finished task** with a clear message.

## Design system (practical redesign, Nov 2026)

Match Samuel's other demo sites: each business gets its own personality, and the site is full of concrete, useful content rather than decoration.

- **Feel:** crisp, practical, trustworthy. Plain direct headings ("What we clean", "What's included", "Before you ask"). No template tells: no italic accent words in headings, no small labels above every heading, no tickers, floating badges, scroll fade-ins or stacked dark slogan blocks. The footer is the only dark block.
- **Colours (`:root` in `main.css`, from the logo):** `--rc-ink #0B1B33` (headings, footer, info strip), `--rc-blue #1E4FD8` (buttons, links; 6.6:1 on white), `--rc-blue-dark #1740B3` (hover), `--rc-mist #EDF2FB` and `--rc-paper #F7F7F4` (section backgrounds), `--rc-text #1A2233`, `--rc-muted #556079`, `--rc-line #DDE2EA`.
- **Font:** "Schibsted Grotesk" (variable 400–800), self-hosted in `src/assets/fonts/`, preloaded. One family for everything.
- **Components:** 8px-radius buttons, 10px photos, bordered photo service cards, "What's included" tabs (checklists from `services.json`), info strip with live open/closed status, hours table with today highlighted (both from `site.openingHoursSchema` via `helpers.weekHours`), owner note card, numbered steps, "Before you ask" FAQ (confirmed facts only), light quote + hours block.
- **Icons:** Bootstrap Icons SVGs inlined at build time with `helpers.icon('name')`. No icon font.
- **Images:** `partials/picture.ejs` (WebP + JPG; stock photos have `-800` versions, pass `sizes`). Stock photos are temporary, see `src/assets/images/CREDITS.md`.
- **Header:** logo, links (Home, Services, About, Contact), "Call or text" link and "Get a free quote" button. Sticky. Hamburger on mobile.
- **Mobile sticky bottom bar** (under 768px): "Call" and "Get a quote". Hide "Call" if the phone is TODO.
- **Phones:** use `g-4 g-lg-5` row gutters; plain `g-5` causes horizontal scroll.
- **Quote form demo mode:** while `web3formsKey` is TODO the form validates and goes to /thank-you/ without sending anything, and shows no warning.

## Content inventory (from the current site, Nov 2026)

**Brand line:** "The Right Clean. Every Time." / "Experience the Peace of Mind That Comes with The Right Clean, Every Time."

**Hero:** "Professional Cleaning you can trust." Intro: The Right Clean does more than clean; it helps clients create spaces that leave lasting impressions, with tailored cleaning for offices, medical facilities, new buildings and move-in/move-out properties.

**Services (6):**
1. Commercial Cleaning — "Impress clients and boost productivity with a clean workspace."
2. Move-In / Move-Out Cleaning — "Start fresh or leave on a high note."
3. Post Construction Cleaning — "From Construction Dust to Move-In Ready Perfection. We handle the final clean, so you can focus on the final reveal."
4. Floor Care — "Spotless, well-maintained floors are the foundation of a beautiful and welcoming space."
5. Carpet Cleaning
6. Specialty Cleaning (medical and dental) — "Maintain a clean, safe, and hygienic environment with detailed cleaning suited for medical and dental spaces." Banner line: "A Higher Standard of Clean for Spaces Dedicated to Care."

The current site also mentions routine and deep cleaning in its description.

**About:** Owner Gbemisola Famade, 7+ years in the cleaning industry, starting with homes, offices and commercial spaces. Focus on client trust, consistent quality and peace of mind. Team: trained, insured, quality-checked, with specialists in deep cleaning, office cleaning and floor care. Values: teamwork, reliability, attention to detail. Closing idea: cleaning is about "the confidence, comfort, and peace of mind we create." (Rewrite in plain, warm language; keep the meaning. Confirm "insured" with Samuel before showing it as a badge.)

**Contact:** Email `info@rightclean.ca` (not yet confirmed working; the domain differs from the website domain). Facebook: facebook.com/THERIGHTCLEANCANADA. Instagram: instagram.com/therightcleancanada. Phone, service area and hours: unknown (TODO).

**Images on the current site (temporary; Samuel will replace them):**
- Hero/banner: https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/JBkifMk3YfEMXD73/carlos-torres-mhnjebeltgw-unsplash-Yg24XwbRBguBWaMD.jpg
- Woman cleaning a table (AI-generated): https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1045,fit=crop/JBkifMk3YfEMXD73/generated/generated-i2mpVikIWdU8UeP3.png
- Logo (AI-generated, alt text currently says "BrightShine logo"): https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/JBkifMk3YfEMXD73/chatgpt-image-apr-29-2026-12_21_17-pm-ywPPukgKiqYHVuPv.png
- Reviewer photos (stock, don't use for reviews): aleksandrina-andreeva…, hannah-popowski… on the same CDN
- Owner portrait on the About page ("confident-corporate-portrait", saved as `portrait-placeholder`) is confirmed to be Gbemisola (Nov 2026). OK to label it as her.
- Other images on the About page (eliabe-costa…) can be pulled from https://therightcleancanada.com/cleaning-team if needed.

Download images into `src/assets/images/` with descriptive names. Don't hot-link the old site.
