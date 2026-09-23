import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventsIndex } from "@/components/events/EventsIndex";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { events } from "@/content/events";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/events",
    title: dict.meta.events.title,
    description: dict.meta.events.description,
  });
}

export default async function EventsPage({ params }: PageProps<"/[locale]/events">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getDictionary(locale).events;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <Section className="bg-neutral-50">
        <Container>
          <EventsIndex events={events} />
        </Container>
      </Section>
    </>
  );
}
