"use client";

import { StatCallout } from "@/components/home/StatCallout";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Who it's for — the five Brand Playbook personas plus Board Members and
 * Entrepreneurs. Each card carries the role in one line and what that person
 * actually wants to hear, in their own voice.
 *
 * Seven cards sit four-then-three on a 12-column grid so both rows fill; the
 * CFA Institute stat follows full width, where its two figures sit side by side.
 */
export function WhoItsFor() {
  const { dict, locale } = useLocale();
  const [open, close] = locale === "ar" ? ["«", "»"] : ["“", "”"];
  const copy = dict.home.audience;

  return (
    <Section className="bg-ink">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
          onDark
        />

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          {copy.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              variant="settle"
              className={cn(
                "interactive flex flex-col gap-4 rounded-card border border-white/10 bg-white/[0.04] p-6 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]",
                index < 4 ? "lg:col-span-3" : "lg:col-span-4",
                // The odd card out at two columns spans the row.
                index === copy.items.length - 1 && "sm:col-span-2",
              )}
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-300">
                  {item.role}
                </p>
              </div>
              <blockquote className="mt-auto border-s-2 border-brand-gold ps-4 text-[0.95rem] leading-relaxed text-neutral-100">
                {open}
                {item.quote}
                {close}
              </blockquote>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal variant="settle">
          <StatCallout stat={copy.stat} />
        </Reveal>
      </Container>
    </Section>
  );
}
