"use client";

import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const { dict } = useLocale();
  const copy = dict.home.testimonials;

  return (
    <Section className="bg-neutral-50">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />

        {/* `swing` gives these a different entrance from the resource cards —
            a slight rotation that resolves, rather than a repeat of the same
            fade-up used elsewhere on the page. */}
        <RevealGroup
          as="ul"
          stagger={0.12}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((testimonial) => (
            <Reveal as="li" key={testimonial.id} variant="swing">
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
