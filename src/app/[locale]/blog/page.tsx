import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogIndex } from "@/components/blog/BlogIndex";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/blog",
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
  });
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.title}
        subtitle={dict.blog.subtitle}
      />

      <Section className="bg-neutral-50">
        <Container>
          <BlogIndex />
        </Container>
      </Section>
    </>
  );
}
