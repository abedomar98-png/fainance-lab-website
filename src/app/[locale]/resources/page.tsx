import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourceList } from "@/components/grids/ResourceList";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/resources",
    title: dict.meta.resources.title,
    description: dict.meta.resources.description,
  });
}

export default async function ResourcesPage({
  params,
}: PageProps<"/[locale]/resources">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const copy = dict.resources;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <Section className="bg-neutral-50">
        <Container className="flex flex-col gap-10">
          <ResourceList />

          <Reveal variant="rise" className="border-t border-neutral-200 pt-8">
            <Slogan />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
