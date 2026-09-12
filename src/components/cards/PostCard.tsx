"use client";

import Link from "next/link";

import { CardBody, CardShell } from "@/components/cards/CardShell";
import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowIcon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { Post } from "@/content/types";
import { formatDate, localeHref } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { dict, locale } = useLocale();
  const href = localeHref(locale, `/blog/${post.slug}`);

  return (
    <CardShell cover={post.cover} coverAlt={post.coverAlt[locale]}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="topic">{dict.blog.categories[post.categories[0]]}</Tag>
        <time
          dateTime={post.date}
          className="font-mono text-[0.7rem] text-neutral-400"
        >
          {formatDate(post.date, locale)}
        </time>
      </div>

      <CardBody
        title={
          <Link href={href} className="interactive hover:text-brand-blue-deep">
            {/* Stretched link — the whole card is the hit target. */}
            <span className="absolute inset-0" aria-hidden />
            {post.title[locale]}
          </Link>
        }
        description={post.excerpt[locale]}
      />

      <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
        {dict.common.readMore}
        <ArrowIcon className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </span>
    </CardShell>
  );
}
