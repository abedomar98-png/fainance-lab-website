# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev               # dev server on :3000
npm run build             # production build
npm run typecheck         # next typegen && tsc --noEmit
npm run lint              # eslint (next lint was removed in Next 16)
npm run check:visual      # browser check — needs `npm run dev` running
npm run make:placeholders # regenerate stub download PDFs
```

There is no unit test suite. `npm run check:visual` is the real verification
step: it drives Chromium through both locales and asserts the things a build
cannot — that `dir` flips to RTL, that the logo is *not* mirrored, that the
hero intro opens full width and docks into its panel level with the headline, that scroll reveals settle
at opacity 1, that cards lift on hover, and that the modal opens and closes on
Escape. It writes screenshots to `.visual-check/`. Run it after any change to
layout, motion or RTL behaviour.

To check a single concern, edit the `note(...)` calls in
`scripts/visual-check.mjs` — it is a plain script, not a test framework.

## Next.js 16 specifics that bite

- `params` is a **Promise**: `const { locale } = await params`.
- Route props use the generated `PageProps<"/[locale]/blog/[slug]">` and
  `LayoutProps<"/[locale]">` globals. After adding or moving a route, run
  `npx next typegen` or the types go stale and `tsc` reports phantom errors
  about routes that no longer exist.
- Locale routing lives in **`src/proxy.ts`**, not `middleware.ts` — Next 16
  renamed the convention and the exported function must be called `proxy`.
- Tailwind is **v4**: tokens are declared in the `@theme` block in
  `src/app/globals.css`, not a `tailwind.config.js`. Custom utilities use
  `@utility`. Note that v4 emits the standalone `translate` CSS property for
  `-translate-y-*`, so anything inspecting computed styles must read
  `translate`, not `transform`.

## Architecture

### Locale
Arabic is the primary locale and the `x-default`; English is secondary. Every
page lives under `src/app/[locale]/`, which is also the root layout (there is
no `src/app/layout.tsx`). `src/proxy.ts` redirects un-prefixed paths.

A first visit to `/` (or any un-prefixed path) **always opens Arabic** — the
proxy deliberately ignores the browser's Accept-Language, since most browsers
in the region send English. Don't reintroduce language negotiation. The only
override is the `fainance-locale` cookie, written when the visitor clicks the
language switcher. It is set on click, not in the proxy, because Next prefetches
the switcher link and a request-based cookie would flip the language unasked.

Server Components read copy with `getDictionary(locale)`. Client Components
read it from `useLocale()`, which `LocaleProvider` supplies at the layout
level along with `dir` and `flip` (+1 LTR / −1 RTL) — multiply any horizontal
motion offset by `flip` so animations mirror correctly.

`src/i18n/dictionaries/en.ts` defines the `Dictionary` type via `typeof en`, so
a key missing from `ar.ts` is a compile error rather than a silent fallback.

### Content vs. copy
Two separate places, on purpose:
- **`src/content/`** — the things (resources, courses, posts, testimonials,
  pillars, site constants). Each carries its own `{ ar, en }` strings.
- **`src/i18n/dictionaries/`** — the chrome (nav, headings, form labels,
  metadata).

Adding a blog post or a resource means editing one file in `src/content/` and
nothing else.

### Motion
Two libraries with non-overlapping jobs, plus the hero video:
- **`motion`** — all scroll reveals and gestures. `RevealGroup` orchestrates a
  stagger; `Reveal` is one child. There are five entrance variants (`rise`,
  `settle`, `swing`, `grow`, `fade`) because applying one fade-in-up to
  everything is the clearest tell of a templated build — vary them by element
  kind.
- **Lenis** — site-wide smooth scroll. It owns the scroll position, so the
  header reads scroll via `useLenis`, and the modal must call `lenis.stop()`
  (`overflow:hidden` alone does not stop it).
- **Hero intro video** (`HeroVideo.tsx`) — on load it plays as a window across
  the hero's full width while the copy is held back, then at `DOCK_AT_SECONDS`
  (the video's static logo hold) shrinks into its panel and calls `onReveal`,
  which staggers the copy in. Things that are load-bearing:
  - It is **one node, never remounted** — absolutely positioned out past its
    panel slot during the intro, animated back, then every inline style is
    cleared. The docked layout is plain CSS; remounting would restart the video.
  - It **re-measures every frame while the intro shows**, because the promo bar
    slides in after hydration and pushes the hero down; a stale measurement puts
    the window's bottom edge and its controls below the fold.
  - **Sound is attempted on**, but browsers refuse unmuted autoplay on a first
    visit. It then plays muted and unmutes on the first pointer or key event —
    the earliest moment a browser allows. Don't "fix" this by forcing muted.
  - Playback starts from an effect, not `autoPlay`, so reduced-motion
    visitors skip the intro and get the poster (the finished logo). Start and
    safety timeouts dock it if the video never plays, so the copy is never
    stuck hidden.
  - The panel's top aligns with the headline's first line of glyphs via
    `TITLE_INK_OFFSET` in `Hero.tsx` — measured per locale. Re-measure it if
    the headline's size, leading or font changes; `check:visual` asserts it.

Reveals render their hidden state into the SSR HTML, so a `<noscript>` block in
the layout forces `[data-reveal]` visible without JS. Any new animated wrapper
must carry `data-reveal` or it will be invisible to non-JS visitors.

### Modal
One component, three variants (`lead` / `newsletter` / `notify`) plus a shared
success state, opened via `useCaptureModal().open({ intent, ... })`. Adding a
Phase 2 `register` variant means extending `ModalIntent` and the `copy` map —
no structural change.

## Brand constraints (non-negotiable)

Tokens are defined once in `src/app/globals.css`. Never hard-code a hex value
in a component.

- Signal Gold `#FBB215` is an **accent only** — never a section background,
  never behind white text (gold surfaces take Ink Navy `#0C1A2B`).
- The signature gradient is `120deg, #0A6FEE → #04A544`. Gold never appears in
  a gradient.
- No `0px` corners on containers.
- **The logo is never mirrored, recoloured, or stretched.** In RTL it moves to
  the right by layout; the artwork is untouched. Never mirror the hero
  video either — it contains the logo.
- The CTA slogan is the **last line** of a CTA surface, **once per surface**.
  Use `<Slogan />`; do not retype the string.
- `/ar` uses Arabic-Indic numerals (٠–٩) everywhere. Hard-coded Arabic strings
  already use them; dynamic numbers go through `formatNumber(value, locale)`.

## Integrity rules for this project

The brief is explicit that nothing may be invented, and the code reflects it.
Do not "fill in" any of the following — they are unfinished on purpose and
each is marked `TODO(abed)`:

- Hero stats are `[TBD]`. Do not estimate years, headcounts or countries.
- Testimonials are placeholders with `isPlaceholder: true`, which renders a
  visible badge. Never write a plausible-sounding quote or name.
- `TrustedBy` returns `null` and must stay that way until Abed confirms which
  organisations may be shown and that their marks are cleared.
- Blog intros have `introIsPlaceholder: true`, which renders a draft banner.
- No star ratings, review counts, subscriber counts or download counts
  anywhere — there is no real data behind any of them.
- `site.whatsapp` is `null`; the Contact page renders a disabled placeholder
  rather than a link. An invented number would reach a real stranger.
- Both API routes only validate and log. They send no email and store nothing.
