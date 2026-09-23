"use client";

import { StatCallout } from "@/components/home/StatCallout";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Why Fainance — mission, vision, promise and positioning, then the two
 * sourced statistics that make the case.
 *
 * Positioning is a full sentence, not a tagline, so it spans the row as a
 * statement rather than being squeezed into a card the size of the others.
 */
export function WhyFainance() {
  const { dict } = useLocale();
  const copy = dict.home.why;
  const short = copy.items.slice(0, -1);
  const positioning = copy.items[copy.items.length - 1];

  return (
    <Section className="bg-neutral-50">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />

        <RevealGroup
          as="dl"
          stagger={0.08}
          className="grid gap-4 sm:grid-cols-3"
        >
          {short.map((item, index) => (
            <Reveal
              key={item.label}
              variant="settle"
              className="flex flex-col gap-3 rounded-card border border-neutral-100 bg-white p-6 shadow-card"
            >
              <dt
                className={cn(
                  "font-mono text-xs tracking-[0.14em] uppercase",
                  ["text-brand-blue", "text-brand-green-deep", "text-ink"][index % 3],
                )}
              >
                {item.label}
              </dt>
              <dd className="font-display text-lg leading-snug font-semibold text-ink">
                {item.text}
              </dd>
            </Reveal>
          ))}

          <Reveal
            variant="swing"
            className="flex flex-col gap-3 rounded-card bg-ink p-7 sm:col-span-3 sm:p-8"
          >
            <dt className="font-mono text-xs tracking-[0.14em] text-brand-gold uppercase">
              {positioning.label}
            </dt>
            <dd className="max-w-4xl text-lg leading-relaxed text-neutral-100 sm:text-xl">
              {positioning.text}
            </dd>
          </Reveal>
        </RevealGroup>

        <RevealGroup stagger={0.1} className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {copy.stats.map((stat) => (
            <Reveal key={stat.source} variant="settle">
              <StatCallout stat={stat} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
