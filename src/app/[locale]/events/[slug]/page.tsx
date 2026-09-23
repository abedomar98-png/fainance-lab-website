import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventFacts } from "@/components/events/EventCard";
import { EventDownloads } from "@/components/events/EventDownloads";
import { SlideGallery } from "@/components/events/SlideGallery";
import { ArrowIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { events, getEvent } from "@/content/events";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";
import { formatNumber, localeHref } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => events.map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const event = getEvent(slug);
  if (!event) notFound();

  return buildMetadata({
    locale,
    path: `/events/${event.slug}`,
    title: `${event.name[locale]} — Fainance Lab`,
    description: event.teaser[locale],
    image: event.hero.src,
  });
}

/**
 * One event: photo and facts, the session, its outline, the public teaser
 * slides, then the gated downloads — one registration unlocks every file.
 */
export default async function EventPage({ params }: PageProps<"/[locale]/events/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const event = getEvent(slug);
  if (!event) notFound();

  const copy = getDictionary(locale).events;

  return (
    <article className="bg-white">
      {/* Masthead */}
      <Section className="border-b border-neutral-100 bg-neutral-50 py-12 sm:py-16">
        <Container className="flex flex-col gap-10">
          <Reveal variant="rise">
            <Link
              href={localeHref(locale, "/events")}
              className="interactive inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-brand-blue-deep"
            >
              <ArrowIcon className="size-4 rotate-180 rtl:rotate-0" />
              {copy.back}
            </Link>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <RevealGroup stagger={0.08} className="flex flex-col items-start gap-5">
              <Reveal variant="rise" className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase">
                  {copy.eyebrow}
                </span>
                <span className="rule-gold h-px w-10 shrink-0 rtl:rotate-180" />
              </Reveal>
              <Reveal
                as="h1"
                variant="rise"
                className="text-3xl leading-[1.2] font-extrabold text-balance sm:text-4xl"
              >
                {event.name[locale]}
              </Reveal>
              {event.theme ? (
                <Reveal as="p" variant="rise" className="text-[1.05rem] leading-relaxed text-neutral-500">
                  {event.theme[locale]}
                </Reveal>
              ) : null}
              <Reveal variant="rise" className="w-full">
                <EventFacts
                  event={event}
                  className="flex flex-col gap-2 rounded-card border border-neutral-200 bg-white p-5 text-[0.95rem] text-neutral-600 shadow-card"
                />
              </Reveal>
            </RevealGroup>

            <Reveal variant="fade">
              {/* Photos are never mirrored in RTL. */}
              <Image
                src={event.hero.src}
                alt={event.hero.alt[locale]}
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-auto w-full rounded-panel shadow-lift"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The session */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <RevealGroup stagger={0.08} className="flex flex-col gap-5">
            <Reveal variant="rise" className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase">
              {copy.session}
            </Reveal>
            {event.sessionTitle ? (
              <Reveal as="h2" variant="rise" className="text-2xl leading-snug font-bold sm:text-3xl">
                {event.sessionTitle[locale]}
              </Reveal>
            ) : null}
            {event.intro.map((paragraph) => (
              <Reveal as="p" key={paragraph.en} variant="rise" className="text-[1.05rem] leading-relaxed text-neutral-600">
                {paragraph[locale]}
              </Reveal>
            ))}
          </RevealGroup>

          {event.outline ? (
            <Reveal variant="settle" className="flex flex-col gap-4 self-start rounded-panel bg-ink p-7">
              <h3 className="font-display text-base font-bold text-white">{copy.outlineTitle}</h3>
              <ol className="flex flex-col gap-3">
                {event.outline.map((part, index) => (
                  <li key={part.en} className="flex gap-3.5 text-neutral-100">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-brand-gold/60 font-mono text-xs text-brand-gold">
                      {formatNumber(index + 1, locale)}
                    </span>
                    <span className="leading-relaxed">{part[locale]}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      {/* Teaser slides */}
      {event.slides.length > 0 ? (
        <Section className="bg-neutral-50">
          <Container className="flex flex-col gap-8">
            <Reveal as="h2" variant="rise" className="text-2xl font-bold sm:text-3xl">
              {copy.slidesTitle}
            </Reveal>
            <SlideGallery slides={event.slides} />
          </Container>
        </Section>
      ) : null}

      {/* Gated downloads — a CTA surface, so it ends on the slogan. */}
      {event.downloads.length > 0 ? (
        <Section>
          <Container className="flex max-w-3xl flex-col gap-8">
            <RevealGroup stagger={0.08} className="flex flex-col gap-3">
              <Reveal as="h2" variant="rise" className="text-2xl font-bold sm:text-3xl">
                {copy.downloadsTitle}
              </Reveal>
              <Reveal as="p" variant="rise" className="leading-relaxed text-neutral-500">
                {copy.downloadsIntro}
              </Reveal>
            </RevealGroup>
            <Reveal variant="settle">
              <EventDownloads event={event} />
            </Reveal>
            <Reveal variant="rise" className="border-t border-neutral-200 pt-8">
              <Slogan />
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}
