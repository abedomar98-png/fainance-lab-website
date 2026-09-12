import type { Metadata } from "next";
import { Cairo, IBM_Plex_Mono, Mulish, Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { ModalProvider } from "@/components/modal/CaptureModal";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";
import { isLocale, locales, localeDirection } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

/* Display face — headings and UI labels. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/* Body face — running Latin copy. */
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

/* Arabic face. Real Regular/Bold weights — Arabic is never faux-bolded. */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/* Labels, eyebrows and metadata. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    ...buildMetadata({
      locale,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = localeDirection[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${mulish.variable} ${cairo.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Scroll reveals render their hidden state into the SSR HTML, so
            without JavaScript the page would come up blank below the hero.
            Force every reveal visible when scripting is unavailable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;translate:none!important;scale:none!important;rotate:none!important}`}</style>
        </noscript>

        <LocaleProvider locale={locale} dict={dict}>
          <SmoothScroll>
            <ModalProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-chip focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow-lift"
              >
                {dict.common.skipToContent}
              </a>

              <PromoBar />
              <Header />

              <main id="main" className="flex-1">
                {children}
              </main>

              <Footer />
            </ModalProvider>
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
