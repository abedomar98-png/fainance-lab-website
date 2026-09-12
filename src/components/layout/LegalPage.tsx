"use client";

import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";

/**
 * Stub legal page.
 *
 * TODO(abed): both Privacy and Terms carry a visible draft notice until real
 * legal copy is reviewed. Don't remove the notice before the copy is final.
 */
export function LegalPage({
  title,
  notice,
  body,
}: {
  title: string;
  notice: string;
  body: string;
}) {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl">
        <RevealGroup stagger={0.08} className="flex flex-col gap-6">
          <Reveal
            as="h1"
            variant="rise"
            className="text-3xl font-extrabold sm:text-4xl"
          >
            {title}
          </Reveal>

          <Reveal
            variant="rise"
            className="rounded-card border border-brand-gold/50 bg-brand-gold/10 px-4 py-3"
          >
            <p className="font-mono text-xs leading-relaxed text-ink">
              {notice}
            </p>
          </Reveal>

          <Reveal
            as="p"
            variant="rise"
            className="leading-relaxed text-neutral-600"
          >
            {body}
          </Reveal>
        </RevealGroup>
      </Container>
    </Section>
  );
}
