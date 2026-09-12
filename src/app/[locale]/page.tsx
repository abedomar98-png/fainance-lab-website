import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPreview } from "@/components/home/BlogPreview";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PillarStrip } from "@/components/home/PillarStrip";
import { ResourceGrid } from "@/components/home/ResourceGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustedBy } from "@/components/home/TrustedBy";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero />
      {/* Renders nothing until Abed confirms which logos may appear. */}
      <TrustedBy />
      <PillarStrip />
      <ResourceGrid />
      <NewsletterSection />
      <Testimonials />
      <BlogPreview />
    </>
  );
}
