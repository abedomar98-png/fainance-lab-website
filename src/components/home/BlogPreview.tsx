"use client";

import { PostCard } from "@/components/cards/PostCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { sortedPosts } from "@/content/posts";
import { localeHref } from "@/lib/utils";

export function BlogPreview() {
  const { dict, locale } = useLocale();
  const copy = dict.home.blog;
  const latest = sortedPosts.slice(0, 3);

  return (
    <Section className="bg-white">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
          <Reveal variant="rise" className="shrink-0">
            <Button href={localeHref(locale, "/blog")} variant="outline">
              {copy.cta}
              <ArrowIcon className="size-4 rtl:-scale-x-100" />
            </Button>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latest.map((post) => (
            <Reveal as="li" key={post.slug} variant="settle">
              <PostCard post={post} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
