# Open items

Everything still missing or unconfirmed before launch. Updated at the end of Phase 3 (Nov 2026).

## Blocks launch

| # | What's missing | Where it shows | How to fix |
|---|---|---|---|
| 1 | **Web3Forms access key** | Nothing visible: without a key the form runs in demo mode (validates, then shows /thank-you/, sends nothing). | Create a key at web3forms.com with the inbox that should receive quotes (info@rightclean.ca), put it in `site.json` → `web3formsKey`. |
| 2 | **Reply time** ("within 1 business day") | Thank-you page says "We'll be in touch soon" until confirmed | Confirm with the family. In `site.json` → `replyTime`, remove the `TODO: ` prefix (or change the wording). |
| 3 | **Privacy policy review** | Not shown on the page (removed for the demo) | Family reads the policy before launch. |
| 4 | **Test quote submission** | — | After #1, submit a real test and confirm it arrives with all fields and lands on /thank-you/. |

## Content to confirm with the family (not shown as placeholders)

| # | Item | Where |
|---|---|---|
| 5 | "What's included" checklists for each service are generic industry scope, written by us | `src/_data/services.json` → `includes` (Services page) |
| 6 | Service descriptions (`longText`) were written by us from the old site's one-liners | `src/_data/services.json` (Services page) |
| 7 | "…and, above all, a lover of God" kept from Gbemisola's old About text | `src/about.ejs` |
| 8 | Insured badge shows. The answer "YES" covered insured / WCB / bonded together; WCB and bonded aren't mentioned on the site | `site.json` → `insured` |
| 9 | Opening hours are set as `Mo-Fr 08:00-17:00`, so Saturday and Sunday show as **Closed** in the hours table and open/closed status. Confirm weekends are really closed (and whether evening work is offered) | `site.json` → `openingHoursSchema` (keep in sync with `hours`) |
| 9a | Home page copy written by us: "How it works" steps and "Before you ask" answers (prices quoted per space, area, hours, insured) | `src/index.ejs` |

## Images and branding (temporary)

| # | Item | Where |
|---|---|---|
| 10a | **Stock photos (Unsplash) are used throughout** and show other people, not their team. Replace with real photos of the team, uniforms and work as they arrive | Every page. List in `src/assets/images/CREDITS.md` |
| 10 | Logo is the AI-generated one from the old site. Need the original file (SVG or transparent PNG). Then regenerate `logo-wide.jpg`, favicons in `src/assets/icons/` and `og-image.jpg` | Header, footer, favicons, share image |
| 13 | No reviews yet (no Google reviews). Reviews section stays hidden until `reviews.json` has entries | Home page |

## At launch (Phase 4)

| # | Item |
|---|---|
| 14 | `site.json` → `preview: false` (removes noindex, "Preview built by" footer line, and opens robots.txt) |
| 15 | `site.json` → `url: "https://therightcleancanada.com"` (canonical URLs, sitemap, form redirect, share image all use it) |

## Optional improvements

- Lighthouse mobile after the redesign: Performance 97–100, Accessibility 100, Best Practices 100, SEO 100 with `preview: false`. No further work needed.
