"use client";

import { ResourceCard } from "@/components/cards/ResourceCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { resources } from "@/content/resources";
import { localeHref } from "@/lib/utils";

export function ResourceGrid() {
  const { dict, locale } = useLocale();
  const copy = dict.home.resources;

  return (
    <Section className="bg-neutral-50">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
          />
          <Reveal variant="rise" className="shrink-0">
            <Button href={localeHref(locale, "/resources")} variant="outline">
              {copy.cta}
              <ArrowIcon className="size-4 rtl:-scale-x-100" />
            </Button>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resources.map((resource) => (
            <Reveal as="li" key={resource.slug} variant="settle">
              <ResourceCard resource={resource} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
