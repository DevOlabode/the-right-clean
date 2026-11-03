# Phase 4 — Present, revise and launch

**Goal:** Show the preview to the family, make their changes, swap in real content, then put the site live on therightcleancanada.com and hand it over.

**Time estimate:** 1 session for the presentation, 1 for revisions, 1 for launch.

---

## Part A: Present (Samuel)

- [ ] Open the Vercel preview on your phone and laptop and click through every page once more.
- [ ] Walk the family through it on a call or in person: Home → Services → About → submit a test quote together and show it arriving.
- [ ] Point out what's placeholder (photos, phone, area, reviews) and why.
- [ ] Agree on: price (your $750 package), what's included (hosting setup, domain connection, a round of changes), how future edits work (see Part D), and the timeline.
- [ ] Write their feedback into `docs/FEEDBACK.md` as a numbered list.

## Part B: Revisions (Claude Code)

**Prompt to paste:**
> Read `CLAUDE.md` and `docs/FEEDBACK.md`. Make each change in the feedback list, one commit per item, and tick it off in FEEDBACK.md. Then update `docs/OPEN-ITEMS.md`.

Samuel also does:
- [ ] Replace temporary images with their real photos and logo (update `CREDITS.md`).
- [ ] Fill every TODO in `site.json` with confirmed info. Set `emailConfirmed: true` only after you've emailed info@rightclean.ca and got a reply.
- [ ] Add real reviews to `reviews.json`.
- [ ] Have Gbemisola read every page for accuracy, especially the service checklists and the Privacy page.

## Part C: Launch

**Prompt to paste (after Samuel confirms all TODOs are filled):**
> Read `CLAUDE.md`. We're launching. Set `site.preview` to false and `site.url` to https://therightcleancanada.com, confirm no TODO placeholders remain anywhere (list any you find and stop if there are some), check robots.txt now allows indexing and links the sitemap, check the noindex tag and preview footer are gone, rebuild, and commit.

Samuel does:
- [ ] Switch the Web3Forms key to one registered with the business's confirmed email. Send a test quote and confirm it arrives.
- [ ] In Vercel: add the domain `therightcleancanada.com` and `www`.
- [ ] In Hostinger (family's login): point the domain's DNS to Vercel using the records Vercel shows. Cancel or downgrade the Hostinger website builder plan only after the new site is live (keep the domain registration).
- [ ] Wait for DNS (minutes to a few hours), then check HTTPS works on both `therightcleancanada.com` and `www`.
- [ ] Turn on Vercel Analytics (free).
- [ ] Submit the sitemap in Google Search Console (verify via DNS).
- [ ] Set up or update their Google Business Profile with the website link, phone, area and hours. This matters more for local search than anything on the site.
- [ ] Update the website link on their Facebook and Instagram.

## Part D: Handover

- [ ] Give the family a one-page "Your website" note: the URL, where quote requests arrive, what to do if they stop arriving, and how to ask for changes.
- [ ] Decide how edits work. Simplest: they send you changes and you update the site. Optional upsell: a small monthly care plan (updates, checks, form monitoring).
- [ ] Ask for a review/testimonial and permission to show the site in your portfolio, so it can be the example you show the other five businesses.

## Done when

- [ ] therightcleancanada.com shows the new site over HTTPS, with and without www.
- [ ] A real quote request reaches the business's inbox.
- [ ] No "Preview" footer, no noindex, no TODO placeholders.
- [ ] Sitemap submitted in Search Console, Google Business Profile links to the site.
- [ ] Family has the handover note.
