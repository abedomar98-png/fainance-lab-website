import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";
import { localeHref } from "@/lib/utils";

/*
 * ⚠️  DRAFT COPY — NEEDS ABED'S REVIEW BEFORE PUBLISHING.
 *
 * Everything on this page was written fresh for Fainance Lab from the
 * biographical facts supplied in the brief. It is NOT copied from
 * abedlatif-alomar.com, and it deliberately carries no named client
 * testimonials from that site: those were given in a different brand context
 * (personal consulting) and need the individuals' explicit confirmation before
 * they could be reused here.
 *
 * Unverified specifics (exact years, headcounts, named employers) are absent
 * rather than estimated.
 */

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const copy = dict.about;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title}>
        <p className="font-mono text-sm tracking-[0.12em] text-neutral-500">
          {copy.credentials}
        </p>
      </PageHero>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Portrait */}
            <Reveal variant="settle" className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-panel border border-neutral-100 shadow-card">
                <Image
                  src="/assets/portrait/abed-portrait.png"
                  alt="Abed-Latif Al-Omar"
                  width={1402}
                  height={1122}
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Story */}
            <RevealGroup stagger={0.09} className="flex flex-col gap-6">
              <Reveal
                as="p"
                variant="rise"
                className="text-lg leading-relaxed font-semibold text-ink"
              >
                {copy.intro}
              </Reveal>

              {copy.body.map((paragraph) => (
                <Reveal
                  as="p"
                  key={paragraph.slice(0, 32)}
                  variant="rise"
                  className="leading-relaxed text-neutral-500"
                >
                  {paragraph}
                </Reveal>
              ))}

              <Reveal
                variant="settle"
                className="mt-4 flex flex-col gap-4 rounded-panel border border-neutral-100 bg-neutral-50 p-6"
              >
                <h2 className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase">
                  {copy.highlightsTitle}
                </h2>
                <ul className="flex flex-col gap-3">
                  {copy.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green/12 text-brand-green">
                        <CheckIcon className="size-3.5" />
                      </span>
                      <span className="leading-relaxed text-neutral-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal variant="rise" className="mt-2 flex flex-col items-start gap-4">
                <Button href={localeHref(locale, "/resources")} size="lg">
                  {copy.cta}
                  <ArrowIcon className="size-5 rtl:-scale-x-100" />
                </Button>
                <Slogan />
              </Reveal>
            </RevealGroup>
          </div>
        </Container>
      </Section>
    </>
  );
}
