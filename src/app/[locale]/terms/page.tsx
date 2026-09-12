import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/layout/LegalPage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/terms",
    title: dict.meta.terms.title,
    description: dict.meta.terms.description,
  });
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  return (
    <LegalPage
      title={dict.footer.terms}
      notice={dict.legal.draftNotice}
      body={dict.legal.termsBody}
    />
  );
}
