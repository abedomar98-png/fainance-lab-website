import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutFainance } from "@/components/home/AboutFainance";
import { Hero } from "@/components/home/Hero";
import { PillarStrip } from "@/components/home/PillarStrip";
import { ResourceGrid } from "@/components/home/ResourceGrid";
import { TrustedBy } from "@/components/home/TrustedBy";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { WhyFainance } from "@/components/home/WhyFainance";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";
import { findPublicAsset } from "@/lib/public-assets";

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

  // Supplied by hand via source-assets/ — see scripts/sync-source-assets.mjs.
  const aboutAssets = {
    video: findPublicAsset("assets/video", "about-fainance"),
    poster: findPublicAsset("assets/video", "about-fainance-poster"),
    logoAnatomy: {
      ar: findPublicAsset("assets/brand", "logo-anatomy-ar"),
      en: findPublicAsset("assets/brand", "logo-anatomy-en"),
    },
  };

  return (
    <>
      <Hero />
      <AboutFainance assets={aboutAssets} />
      <WhyFainance />
      {/* "What you'll learn" */}
      <PillarStrip />
      <WhoItsFor />
      {/* Renders nothing until Abed confirms which logos may appear. */}
      <TrustedBy />
      <ResourceGrid />
      {/*
        Paused, not deleted — re-enable by rendering them again here:
        <NewsletterSection />  (@/components/home/NewsletterSection)
        <Testimonials />       (@/components/home/Testimonials)
        <BlogPreview />        (@/components/home/BlogPreview)
      */}
    </>
  );
}
