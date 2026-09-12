"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { pillarIcons } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { TileBadge } from "@/components/ui/TileBadge";
import { pillars } from "@/content/pillars";

/**
 * The five content pillars.
 *
 * Each card carries a tile badge whose colour cycles blue → green → gold, and
 * a distinct line icon — not the same icon-in-a-circle five times over.
 * Entrances are staggered so the row assembles rather than appearing at once.
 */
export function PillarStrip() {
  const { dict } = useLocale();
  const copy = dict.home.pillars;

  return (
    <Section className="bg-white">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <RevealGroup
          as="ul"
          stagger={0.08}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.icon];
            const item = copy.items[pillar.id];

            return (
              <Reveal
                as="li"
                key={pillar.id}
                variant="settle"
                className="interactive group flex flex-col gap-4 rounded-card border border-neutral-100 bg-neutral-50 p-5 hover:-translate-y-1 hover:border-neutral-200 hover:bg-white hover:shadow-lift"
              >
                <TileBadge
                  icon={Icon}
                  tone={pillar.tone}
                  className="group-hover:scale-105"
                />
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
