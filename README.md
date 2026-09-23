# Fainance Lab — Website (Phase 1)

Bilingual (Arabic-first) marketing and free-resources site for **Fainance Lab** —
making AI genuinely useful for everyday accounting, finance, external audit,
internal audit and GRC work.

- Production domain (not yet connected): `www.fainance-lab.com`
- Instagram: [@fainance.lab](https://www.instagram.com/fainance.lab/)
- Contact: `abedlatif@fainance-lab.com`

## Phase 1 scope

Informational site, free digital products, and email capture. **No auth, no
payments, no gated SaaS** — those are Phase 2. Nothing here blocks adding them.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation | `motion` (scroll reveals, gestures), Lenis (smooth scroll), GSAP (the hero's gold-arrow draw-on) |
| Deploy target | Vercel — **not yet deployed; no domain connected** |

## Commands

```bash
npm install
npm run dev              # http://localhost:3000 (redirects to /ar)
npm run build            # production build
npm run typecheck        # regenerate route types + tsc --noEmit
npm run lint             # eslint
npm run check:visual     # drive a real browser: motion, RTL, hover, modal
npm run make:placeholders # regenerate the stub download PDFs
npm run sync:assets      # copy hand-supplied assets from source-assets/ (also runs before dev/build)
```

`npm run check:visual` needs the dev server running in another terminal. It
loads both locales, watches the hero's gold arrow draw on, scrolls to trigger
the staggered reveals, hovers cards, opens the capture modal, checks the nav
fits one row at 1024/1280/1440px, and exercises the FAQ accordion, glossary
search and the event download gate — writing screenshots to `.visual-check/`.
A green `npm run build` says nothing about whether the page *looks* right —
this is the check that does.

## Hand-supplied assets

Some files are dropped in by hand rather than committed from design work.
Put them in `source-assets/` (kept out of git); `scripts/sync-source-assets.mjs`
copies them into `public/` under the names the site looks for, before every
`dev` and `build`. Until a file exists, its slot shows a placeholder.

| Asset | Put it in `source-assets/` as | Served as |
|---|---|---|
| About Fainance video | `about-fainance-video/<any>.mp4` or `about-fainance-video.mp4` | `/assets/video/about-fainance.mp4` |
| Its poster (optional) | an image in `about-fainance-video/`, or `about-fainance-poster.jpg` | `/assets/video/about-fainance-poster.*` |
| Logo anatomy, Arabic | `logo-anatomy/<name>-ar.png` or `logo-anatomy-ar.png` | `/assets/brand/logo-anatomy-ar.png` |
| Logo anatomy, English | `logo-anatomy/<name>-en.png` or `logo-anatomy-en.png` | `/assets/brand/logo-anatomy-en.png` |

A file saved without an extension is identified from its contents.

## Structure

```
src/
├── app/[locale]/          # every page; `[locale]` is "ar" or "en"
├── app/api/               # subscribe + contact endpoints (placeholders)
├── components/
│   ├── cards/             # resource / course / post / testimonial cards
│   ├── events/            # event card, listing, slide lightbox, download gate
│   ├── faq/               # FAQ accordion
│   ├── glossary/          # bilingual glossary table with live search
│   ├── grids/             # the card grids those cards sit in
│   ├── home/              # home page sections
│   ├── hero/              # SignatureMark — the gold-arrow draw-on (GSAP)
│   ├── layout/            # header (+ "More" menu), promo bar, footer, masthead
│   ├── modal/             # capture modal (three variants) + shared dialog hook
│   ├── providers/         # locale context, Lenis smooth scroll
│   ├── videos/            # video grid + YouTube player with Arabic caption box
│   └── ui/                # Button, Tag, TileBadge, Reveal, Section, Slogan, FilterBar
├── content/               # all site content as typed data (bilingual)
├── i18n/                  # locale config + ar/en dictionaries
├── lib/                   # utils, metadata, search, WebVTT parser, YouTube loader
└── proxy.ts               # locale routing (Next 16 renamed middleware → proxy)
```

**Content lives in `src/content/`, copy lives in `src/i18n/dictionaries/`.**
Neither requires touching a component.

## Brand

All design tokens are defined once, in the `@theme` block at the top of
[`src/app/globals.css`](src/app/globals.css) — colours, the neutral scale, the
type stack, radii, elevation and the motion easing. Reference the generated
utilities (`bg-brand-blue`, `text-ink`, `rounded-panel`); never hard-code a hex
value in a component.

Rules enforced throughout:

- Signal Gold is an **accent** — it is never a section background and never
  carries white text (gold surfaces take Ink Navy).
- The signature gradient is blue → green at 120°. **Gold never appears in it.**
- No sharp 0px corners on containers.
- The logo is never mirrored, recoloured or stretched. In RTL it moves to the
  right-hand side; the artwork itself is untouched.
- `/ar` uses Arabic-Indic numerals (٠–٩) throughout. `formatNumber()` in
  `src/lib/utils.ts` handles dynamic values.

## What is deliberately unfinished

Every item below is marked with a `TODO(abed)` in the code and, where it is
user-visible, renders with a placeholder badge so nothing reads as more
finished than it is.

| Item | Where |
|---|---|
| ESP choice (ConvertKit / Beehiiv / Mailchimp) | `src/app/api/subscribe/route.ts` |
| Transactional sender for the contact form | `src/app/api/contact/route.ts` |
| Real file for "20 Actions Claude Can Do in Excel" | `src/content/resources.ts` |
| Resources #2 and #3 — final topics + files | `src/content/resources.ts` |
| About Me copy approval | `src/i18n/dictionaries/*` + `src/app/[locale]/about/page.tsx` |
| Blog intro paragraphs for both posts | `src/content/posts.ts` |
| Real testimonials (with permission) | `src/content/testimonials.ts` |
| Trusted-by logos — section renders nothing until confirmed | `src/components/home/TrustedBy.tsx` |
| WhatsApp number (and adding it back to the FAQ contact answer) | `src/content/site.ts`, `src/content/faq.ts` |
| "What you'll learn" pillar copy — approved as a draft | `src/i18n/dictionaries/*` (`home.pillars.items`) |
| Videos — the list is empty until videos are chosen | `src/content/videos.ts` |
| Final legal copy | `src/i18n/dictionaries/*` (`legal`) |

### A note on email

Namecheap is a domain registrar and mailbox host — it cannot run double opt-in,
automated lead-magnet delivery, or campaign sends. Both API routes currently
validate and log server-side only; **no email is sent and no address is
stored.** An ESP has to be wired in before launch.
