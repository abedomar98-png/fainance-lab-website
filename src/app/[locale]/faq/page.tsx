import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { faq } from "@/content/faq";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/faq",
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getDictionary(locale).faq;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <Section className="bg-neutral-50">
        <Container className="max-w-4xl">
          <FaqAccordion items={faq} />
        </Container>
      </Section>
    </>
  );
}
