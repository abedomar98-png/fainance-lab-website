"use client";

import { useCaptureModal } from "@/components/modal/CaptureModal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { MailIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";

/**
 * Newsletter CTA.
 *
 * No subscriber count is claimed — there is no real number to show yet, and a
 * fabricated one is fabricated social proof.
 */
export function NewsletterSection() {
  const { dict } = useLocale();
  const copy = dict.home.newsletter;
  const { open } = useCaptureModal();

  return (
    <Section className="bg-white">
      <Container>
        <div className="relative overflow-hidden rounded-panel bg-ink px-7 py-14 sm:px-12 sm:py-16">
          {/* Signature gradient as a single diagonal sweep across the panel —
              blue to green, never gold. */}
          <div
            aria-hidden
            className="bg-signature pointer-events-none absolute inset-0 opacity-25"
            style={{
              maskImage:
                "radial-gradient(90% 120% at 100% 0%, #000 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(90% 120% at 100% 0%, #000 0%, transparent 70%)",
            }}
          />

          <RevealGroup
            stagger={0.09}
            className="relative flex flex-col items-start gap-5"
          >
            <Reveal variant="rise">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-brand-gold uppercase">
                <MailIcon className="size-4" />
                {copy.eyebrow}
              </span>
            </Reveal>

            <Reveal
              as="h2"
              variant="rise"
              className="max-w-2xl text-3xl leading-tight font-bold text-white sm:text-4xl"
            >
              {copy.title}
            </Reveal>

            <Reveal
              as="p"
              variant="rise"
              className="max-w-xl text-[1.05rem] leading-relaxed text-neutral-300"
            >
              {copy.description}
            </Reveal>

            <Reveal variant="rise">
              <Button
                variant="onDark"
                size="lg"
                onClick={() => open({ intent: "newsletter" })}
              >
                {copy.cta}
              </Button>
            </Reveal>

            <Reveal variant="rise">
              <Slogan />
            </Reveal>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
