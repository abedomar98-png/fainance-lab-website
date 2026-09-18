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
 * Copy on this page comes from "AbedLatif Al Omar - CV 2026 - Detailed.docx".
 * Every fact is stated in that CV: the certifications and their issuing bodies,
 * the roles, the eight territories, the industries, and the CPA/CFA/CIA/CCGO
 * instructing. Nothing is rounded up — the CV says "over 25 years", so the page
 * says 25+, even though the earliest role it lists is 1996.
 *
 * Present in the CV but deliberately left out:
 * - the client named on the Deloitte engagement (client confidentiality)
 * - abedlatif-alomar.com, which is a separate personal brand
 *
 * Still worth Abed's read-through before launch — it is his biography.
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
