# Phase 2 — Pages and content

**Goal:** Build the Home, Services, About, Privacy and 404 pages with real layout and copy. The Quote page form comes in Phase 3 (leave its shell for now).

**Time estimate:** 1–2 sessions.

---

## Samuel: before you start

- [ ] Add any answers you've got from the family to `src/_data/site.json` (phone, area, hours, insured, etc.). Anything still unknown stays `"TODO"`.
- [ ] If you have their logo file or real photos, drop them in `src/assets/images/` and tell Claude Code the file names.
- [ ] If you have real reviews, add them to `src/_data/reviews.json` as `{ "name": "Kate L.", "text": "...", "service": "Office cleaning" }`.

## Claude Code: prompt to paste

> Read `CLAUDE.md` and do Phase 2 from `docs/PHASE-2-pages.md`. Build one page at a time, check it at 375px and 1280px, and commit after each page. Don't invent facts; use placeholders for anything that's TODO in site.json. Stop at the end of Phase 2 and summarise.

## Copy rules

- Plain, warm, confident. Short sentences. Speak to the customer ("your office", "your move-out").
- Keep the meaning of the current site's copy (see CLAUDE.md) but rewrite it so it reads well. No buzzwords like "elevate", "leverage", "world-class", "unparalleled".
- No made-up numbers, guarantees, certifications or client names.
- Every page ends with the quote CTA band.

## Claude Code: tasks

### 2.1 Services data
Fill `includes` in `services.json` with 4–6 sensible, generic checklist items per service (e.g. Move-out: "Inside cabinets and drawers", "Appliances wiped inside and out", "Baseboards and window sills", "Bathrooms scrubbed and disinfected", "Floors vacuumed and mopped"). Add a one-paragraph `longText` for each. Mark this content in a code comment as "standard industry scope — confirm with client".

### 2.2 Home page (`index.ejs`), sections in order
1. **Hero:** headline "Professional cleaning you can trust.", one-line intro (offices, medical spaces, new builds, move-in/move-out), buttons "Get a Free Quote" (primary) and "Our Services" (outline), hero image with a soft overlay. Mobile: text first, image below or as background.
2. **Trust strip:** 3–4 short points with icons: "7+ years' experience", "Trained, quality-checked team", "Free, no-obligation quotes", "Insured" (only if `site.insured` is true).
3. **Services grid:** 6 cards from `services.json` (icon, title, short text, link to `/services/#slug`).
4. **How it works:** 3 steps: "Tell us about your space" → "Get your quote" → "Enjoy The Right Clean".
5. **Specialty band:** "A higher standard of clean for spaces dedicated to care." Medical and dental cleaning, with a button to the quote page.
6. **About teaser:** short intro to Gbemisola and the team, image, link to About.
7. **Reviews:** only renders if `reviews.json` has items. Otherwise render nothing (no empty heading).
8. **Service area:** "Proudly serving {serviceArea}" (placeholder if TODO).
9. **Quote CTA band.**

### 2.3 Services page (`services.ejs`)
- Page header: "Our Services" + one-line intro.
- Sticky (desktop) or horizontal-scroll (mobile) list of anchor links to each service.
- One section per service, alternating image left/right: title, long text, "What's included" checklist, button "Get a quote for {service}" linking to `/quote/?service={slug}` (Phase 3 will pre-select it).
- "Not sure what you need?" box linking to the quote page.
- Quote CTA band.

### 2.4 About page (`about.ejs`)
- Page header: "About The Right Clean".
- Owner story: Gbemisola, 7+ years, started with homes, offices and commercial spaces; focus on trust, consistent quality, peace of mind. Photo placeholder labelled "Photo of Gbemisola" unless Samuel confirms the current image is her.
- Our team: trained, quality-checked, specialists in deep cleaning, office cleaning and floor care ("insured" only if confirmed).
- Values: Teamwork, Reliability, Attention to detail, each with an icon and one sentence.
- Closing line: "The Right Clean. Every Time."
- Quote CTA band.

### 2.5 Privacy page (`privacy.ejs`)
Plain-language privacy policy for a small Canadian business collecting quote-form data: what's collected (name, contact details, address, details and photos you send), why (to respond to your quote and provide service), who sees it (The Right Clean only; the form provider Web3Forms delivers it by email), how long it's kept, how to ask for access or deletion (email from site.json), and that it follows PIPEDA. Add a visible note "Template — have the business review before launch."

### 2.6 404 page
Friendly message, links to Home and Get a Quote.

## Done when

- [ ] All pages are complete and match the design system at 375px, 768px and 1280px.
- [ ] Every service card links to the right section on the Services page.
- [ ] No invented facts. Every TODO shows as a visible placeholder.
- [ ] Reviews section is hidden when `reviews.json` is empty and appears when it has items.
- [ ] All images have proper alt text, and below-the-fold images lazy-load.
