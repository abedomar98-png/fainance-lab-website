import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseGrid } from "@/components/grids/CourseGrid";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

/*
 * Phase 1: no live courses, no prices, no ratings, no payment logic.
 * Every card's only action is "Notify Me", which opens the capture modal.
 */

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/courses",
    title: dict.meta.courses.title,
    description: dict.meta.courses.description,
  });
}

export default async function CoursesPage({
  params,
}: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const copy = dict.courses;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <Section className="bg-neutral-50">
        <Container className="flex flex-col gap-10">
          <CourseGrid />

          <Reveal
            variant="rise"
            className="flex flex-col items-start gap-4 border-t border-neutral-200 pt-8"
          >
            <p className="font-mono text-xs text-neutral-500">
              {copy.notifyNote}
            </p>
            <Slogan />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
