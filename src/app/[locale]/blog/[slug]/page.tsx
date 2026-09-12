import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { Tag } from "@/components/ui/Tag";
import { getPost, posts } from "@/content/posts";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";
import { formatDate, localeHref } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPost(slug);
  if (!post) notFound();

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: `${post.title[locale]} — Fainance Lab`,
    description: post.excerpt[locale],
    image: post.cover,
  });
}

/**
 * Infographic-led post template.
 *
 * The uploaded image IS the article — so it is the centrepiece, shown at full
 * width and unmasked, with a short context intro above it. The intro is
 * placeholder copy until Abed approves it, and says so visibly.
 */
export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);

  return (
    <article className="bg-white">
      {/* Head */}
      <header className="border-b border-neutral-100">
        <Container className="py-14 sm:py-16">
          <RevealGroup stagger={0.08} className="flex flex-col gap-5">
            <Reveal variant="rise">
              <Link
                href={localeHref(locale, "/blog")}
                className="interactive group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-neutral-500 uppercase hover:text-brand-blue-deep"
              >
                <ArrowIcon className="size-4 -scale-x-100 rtl:scale-x-100" />
                {dict.common.backToBlog}
              </Link>
            </Reveal>

            <Reveal variant="rise" className="flex flex-wrap items-center gap-2">
              {post.categories.map((category) => (
                <Tag key={category} tone="topic">
                  {dict.blog.categories[category]}
                </Tag>
              ))}
              <time
                dateTime={post.date}
                className="font-mono text-xs text-neutral-400"
              >
                {formatDate(post.date, locale)}
              </time>
            </Reveal>

            <Reveal
              as="h1"
              variant="rise"
              className="max-w-3xl text-3xl leading-[1.18] font-extrabold text-balance sm:text-4xl"
            >
              {post.title[locale]}
            </Reveal>
          </RevealGroup>
        </Container>
      </header>

      <Section className="py-14 sm:py-16">
        <Container className="flex max-w-3xl flex-col gap-10">
          {/* Intro — context for the infographic below it. */}
          <RevealGroup stagger={0.08} className="flex flex-col gap-5">
            {post.introIsPlaceholder ? (
              <Reveal
                variant="rise"
                className="rounded-card border border-brand-gold/50 bg-brand-gold/10 px-4 py-3"
              >
                <p className="font-mono text-xs leading-relaxed text-ink">
                  {locale === "ar"
                    ? "[مسودة] نص المقدمة أدناه مؤقت وينتظر مراجعة عبداللطيف واعتماده."
                    : "[DRAFT] The intro copy below is placeholder text awaiting Abed's review and approval."}
                </p>
              </Reveal>
            ) : null}

            {post.intro.map((paragraph) => (
              <Reveal
                as="p"
                key={paragraph[locale].slice(0, 32)}
                variant="rise"
                className="text-[1.05rem] leading-relaxed text-neutral-600"
              >
                {paragraph[locale]}
              </Reveal>
            ))}
          </RevealGroup>

          {/* The infographic — the centrepiece. */}
          <Reveal variant="fade">
            <figure className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-panel border border-neutral-100 bg-neutral-50 shadow-card">
                <Image
                  src={post.cover}
                  alt={post.coverAlt[locale]}
                  width={1080}
                  height={1350}
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="text-center font-mono text-xs text-neutral-400">
                {post.coverAlt[locale]}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal variant="rise" className="border-t border-neutral-200 pt-8">
            <Slogan />
          </Reveal>
        </Container>
      </Section>
    </article>
  );
}
