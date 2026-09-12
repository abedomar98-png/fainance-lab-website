"use client";

import { useState } from "react";

import { PostCard } from "@/components/cards/PostCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { sortedPosts } from "@/content/posts";
import type { CategoryId } from "@/content/types";
import { cn, formatNumber } from "@/lib/utils";

/** Tag-cloud order, matching the brief. */
const CATEGORY_ORDER: CategoryId[] = [
  "accounting",
  "finance",
  "externalAudit",
  "internalAudit",
  "grc",
  "aiTools",
  "templates",
  "career",
  "tips",
];

export function BlogIndex() {
  const { dict } = useLocale();
  const [active, setActive] = useState<CategoryId | null>(null);

  const visible = active
    ? sortedPosts.filter((post) => post.categories.includes(active))
    : sortedPosts;

  return (
    <div className="flex flex-col gap-16">
      {visible.length > 0 ? (
        <RevealGroup
          as="ul"
          stagger={0.1}
          // Re-keying on the filter replays the stagger, so switching topics
          // reads as a new set arriving rather than a silent swap.
          key={active ?? "all"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((post) => (
            <Reveal as="li" key={post.slug} variant="settle">
              <PostCard post={post} />
            </Reveal>
          ))}
        </RevealGroup>
      ) : (
        <p className="rounded-panel border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-500">
          {dict.blog.noPosts}
        </p>
      )}

      {/* Category tag cloud */}
      <section className="flex flex-col gap-5 border-t border-neutral-200 pt-10">
        <h2 className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase">
          {dict.blog.categoriesTitle}
        </h2>

        <RevealGroup
          as="ul"
          stagger={0.04}
          className="flex flex-wrap items-center gap-2.5"
        >
          <Reveal as="li" variant="settle">
            <TagButton
              active={active === null}
              onClick={() => setActive(null)}
              count={sortedPosts.length}
            >
              {dict.blog.allPosts}
            </TagButton>
          </Reveal>

          {CATEGORY_ORDER.map((category) => {
            const count = sortedPosts.filter((post) =>
              post.categories.includes(category),
            ).length;

            return (
              <Reveal as="li" key={category} variant="settle">
                <TagButton
                  active={active === category}
                  onClick={() =>
                    setActive((current) =>
                      current === category ? null : category,
                    )
                  }
                  count={count}
                >
                  {dict.blog.categories[category]}
                </TagButton>
              </Reveal>
            );
          })}
        </RevealGroup>
      </section>
    </div>
  );
}

function TagButton({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { locale } = useLocale();
  const empty = count === 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "interactive inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-sm font-semibold",
        active
          ? "border-brand-blue bg-brand-blue text-white shadow-card"
          : "border-neutral-200 bg-white text-neutral-600 hover:-translate-y-[2px] hover:border-brand-blue hover:text-brand-blue-deep hover:shadow-card",
        // Topics with nothing in them are still shown, but visibly quiet —
        // the tag cloud reflects the taxonomy, not just what's published.
        empty && !active && "opacity-55",
      )}
    >
      {children}
      <span
        className={cn(
          "font-mono text-[0.65rem]",
          active ? "text-white/70" : "text-neutral-400",
        )}
      >
        {formatNumber(count, locale)}
      </span>
    </button>
  );
}
