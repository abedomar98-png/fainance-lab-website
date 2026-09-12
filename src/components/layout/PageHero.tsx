"use client";

import type { ReactNode } from "react";

import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

/** Shared masthead for the inner pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-100 bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D8E1EC 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, #000, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 85%)",
        }}
      />

      <Container className="relative py-16 sm:py-20">
        <RevealGroup stagger={0.08} className="flex flex-col items-start gap-5">
          <Reveal variant="rise" className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase">
              {eyebrow}
            </span>
            <span className="rule-gold h-px w-10 shrink-0 rtl:rotate-180" />
          </Reveal>

          <Reveal
            as="h1"
            variant="rise"
            className="max-w-3xl text-4xl leading-[1.15] font-extrabold text-balance sm:text-5xl"
          >
            {title}
          </Reveal>

          {subtitle ? (
            <Reveal
              as="p"
              variant="rise"
              className="max-w-2xl text-[1.05rem] leading-relaxed text-neutral-500"
            >
              {subtitle}
            </Reveal>
          ) : null}

          {children ? <Reveal variant="rise">{children}</Reveal> : null}
        </RevealGroup>
      </Container>
    </section>
  );
}
