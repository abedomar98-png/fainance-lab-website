"use client";

import { motion } from "motion/react";

import { SignatureMark } from "@/components/hero/SignatureMark";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { localeHref } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Hero.
 *
 * Deliberately asymmetric and left-aligned rather than a centred column over a
 * gradient blob. The signature mark sits opposite the copy and carries the
 * brand's one scripted motion moment (the gold arrow drawing on).
 *
 * Entrance is time-based rather than scroll-based — this is above the fold, so
 * there is nothing to scroll into view.
 */
export function Hero() {
  const { dict, locale } = useLocale();
  const { hero } = dict.home;

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
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09 } },
            }}
            className="flex flex-col items-start gap-6"
          >
            <Item>
              <span className="inline-flex items-center gap-2.5 rounded-pill border border-neutral-200 bg-white px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-neutral-600 uppercase shadow-card">
                <span className="size-1.5 rounded-full bg-brand-gold" />
                {hero.eyebrow}
              </span>
            </Item>

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

            {/* Stats. Sourced from the CV — see the dictionary for provenance. */}
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
          </motion.div>

          {/* Signature mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="rounded-panel border border-neutral-100 bg-white/70 p-8 shadow-card backdrop-blur-sm sm:p-10">
              <SignatureMark className="h-auto w-full" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * One staggered child of the hero's entrance. data-reveal lets the layout's
 * noscript rule show it without JavaScript (the SSR HTML carries the hidden
 * state).
 */
function Item({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-reveal
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
