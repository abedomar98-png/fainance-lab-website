"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useState, type ReactNode } from "react";

import { HeroVideo } from "@/components/hero/HeroVideo";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { cn, localeHref } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Hero.
 *
 * Deliberately asymmetric and left-aligned rather than a centred column over a
 * gradient blob. The brand intro video sits opposite the copy.
 *
 * Load sequence: the video plays as a window spanning the hero's full width
 * while the copy is held back; as the logo settles it shrinks into its panel
 * and the copy reveals in a stagger. HeroVideo decides when, via `onReveal`.
 * The resting layout is identical whether or not the intro ran.
 *
 * The video panel shares the headline's grid row, so its top edge lines up
 * with the top of the headline's first line of letters.
 */

/**
 * Distance from the top of the headline box to the top of its first line of
 * glyphs, measured in the browser at the lg breakpoint (text-5xl, 1.12 line
 * height). Poppins sits below the box top; Cairo's alef and lam rise above
 * it. Re-measure if the headline size, leading or font changes.
 */
const TITLE_INK_OFFSET = { en: "lg:mt-[3px]", ar: "lg:-mt-[3px]" } as const;

export function Hero() {
  const { dict, locale } = useLocale();
  const { hero } = dict.home;
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);

  // Split the headline so the key phrase can carry the signature gradient.
  // If a translation reworded the accent phrase out of the title, fall back to
  // the plain headline rather than rendering the phrase twice.
  const hasAccent = hero.title.includes(hero.titleAccent);
  const [before, after] = hasAccent
    ? hero.title.split(hero.titleAccent)
    : [hero.title, ""];

  return (
    <section className="relative overflow-hidden border-b border-neutral-100 bg-neutral-50">
      {/* Ground texture: a fine dot grid, fading out. Not a blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #BCC8D6 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 78%)",
        }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        {/* Rows at lg: the eyebrow sits alone above; the headline and the video
            panel share the next row so their tops align. */}
        <motion.div
          initial="hidden"
          animate={revealed ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
          }}
          className="grid items-start gap-y-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-16"
        >
          <Item className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2.5 rounded-pill border border-neutral-200 bg-white px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-neutral-600 uppercase shadow-card">
              <span className="size-1.5 rounded-full bg-brand-gold" />
              {hero.eyebrow}
            </span>
          </Item>

          {/* Copy. Inert to the pointer while it is still hidden. */}
          <div
            className={cn(
              "flex flex-col items-start gap-6 lg:col-start-1 lg:row-start-2",
              !revealed && "pointer-events-none",
            )}
          >
            <Item>
              <h1 className="max-w-xl text-4xl leading-[1.12] font-extrabold text-balance sm:text-5xl">
                {before}
                {hasAccent ? (
                  <span className="text-signature">{hero.titleAccent}</span>
                ) : null}
                {after}
              </h1>
            </Item>

            <Item>
              <p className="max-w-xl text-[1.05rem] leading-relaxed text-neutral-500">
                {hero.story}
              </p>
            </Item>

            {/* Stats. Values are [TBD] placeholders — no figure is invented. */}
            <Item>
              <dl className="flex flex-wrap gap-x-10 gap-y-5 border-y border-neutral-200 py-5">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="order-2 max-w-[11rem] text-xs leading-snug text-neutral-500">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-display text-2xl font-extrabold text-ink">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Item>

            <Item>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href={localeHref(locale, "/resources")}
                  variant="signature"
                  size="lg"
                >
                  {hero.cta}
                  <ArrowIcon className="size-5 rtl:-scale-x-100" />
                </Button>
                <Button
                  href={localeHref(locale, "/about")}
                  variant="outline"
                  size="lg"
                >
                  {hero.secondaryCta}
                </Button>
              </div>
            </Item>

            {/* Slogan closes the hero — last line, once per surface. */}
            <Item>
              <Slogan />
            </Item>
          </div>

          {/* Video panel — the slot the intro window docks into. */}
          <div
            className={cn(
              "relative mx-auto mt-6 aspect-video w-full max-w-md lg:col-start-2 lg:row-start-2 lg:mx-0 lg:max-w-none",
              TITLE_INK_OFFSET[locale],
            )}
          >
            <HeroVideo onReveal={reveal} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * One staggered child of the hero's entrance.
 *
 * data-reveal: the SSR HTML carries the hidden state, so the layout's
 * noscript rule needs this to show the copy without JavaScript.
 */
function Item({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: reducedMotion ? 0 : 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
