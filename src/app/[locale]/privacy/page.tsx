import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/layout/LegalPage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/privacy",
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  return (
    <LegalPage
      title={dict.footer.privacy}
      notice={dict.legal.draftNotice}
      body={dict.legal.privacyBody}
    />
  );
}
