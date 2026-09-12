import type { Metadata } from "next";

import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n/config";

/**
 * Builds per-page, per-locale metadata including the hreflang alternates that
 * link the `/ar` and `/en` versions of the same page.
 *
 * `path` is the route WITHOUT the locale prefix, e.g. "/resources" or "".
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = `${site.url}/${locale}${path}`;

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${site.url}/${l}${path}`]),
  );

  const ogImage = image ?? "/opengraph-image.png";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        // Arabic is the primary locale, so it is also the x-default.
        "x-default": `${site.url}/ar${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
