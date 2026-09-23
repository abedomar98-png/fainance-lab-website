import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlossaryTable } from "@/components/glossary/GlossaryTable";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { glossary } from "@/content/glossary";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/glossary">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/glossary",
    title: dict.meta.glossary.title,
    description: dict.meta.glossary.description,
  });
}

export default async function GlossaryPage({
  params,
}: PageProps<"/[locale]/glossary">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getDictionary(locale).glossary;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <Section className="bg-neutral-50">
        <Container className="max-w-4xl">
          <GlossaryTable terms={glossary} />
        </Container>
      </Section>
    </>
  );
}
