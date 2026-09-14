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
| Animation | `motion` (scroll reveals, gestures), Lenis (smooth scroll) |
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
```

`npm run check:visual` needs the dev server running in another terminal. It
loads both locales, follows the hero intro from full-width window to its docked panel, scrolls to trigger
the staggered reveals, hovers cards, opens the capture modal, and writes
screenshots to `.visual-check/`. A green `npm run build` says nothing about
whether the page *looks* right — this is the check that does.

## Structure

```
src/
├── app/[locale]/          # every page; `[locale]` is "ar" or "en"
├── app/api/               # subscribe + contact endpoints (placeholders)
├── components/
│   ├── cards/             # resource / course / post / testimonial cards
│   ├── grids/             # the card grids those cards sit in
│   ├── home/              # home page sections, in render order
│   ├── hero/              # HeroVideo — the brand intro video
│   ├── layout/            # header, promo bar, footer, page masthead
│   ├── modal/             # one capture modal, three content variants
│   ├── providers/         # locale context, Lenis smooth scroll
│   └── ui/                # Button, Tag, TileBadge, Reveal, Section, Slogan
├── content/               # all site content as typed data (bilingual)
├── i18n/                  # locale config + ar/en dictionaries
├── lib/                   # utils, metadata builder
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
| Hero stats — currently `[TBD]` | `src/i18n/dictionaries/*` |
| Trusted-by logos — section renders nothing until confirmed | `src/components/home/TrustedBy.tsx` |
| WhatsApp number | `src/content/site.ts` |
| Final legal copy | `src/i18n/dictionaries/*` (`legal`) |

### A note on email

Namecheap is a domain registrar and mailbox host — it cannot run double opt-in,
automated lead-magnet delivery, or campaign sends. Both API routes currently
validate and log server-side only; **no email is sent and no address is
stored.** An ESP has to be wired in before launch.
