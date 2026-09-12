"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared card chrome for resources, courses and posts.
 *
 * The Home resources grid, the Courses "coming soon" grid and the Blog list
 * all use this, so a change to card elevation or hover behaviour lands in one
 * place. Hover follows the playbook: the card lifts and its shadow grows,
 * while the cover image scales very slightly behind a fixed frame.
 */
export function CardShell({
  cover,
  coverAlt,
  coverFallback,
  children,
  className,
  coverClassName,
  priority = false,
}: {
  /** Omit and pass `coverFallback` for content with no artwork (courses). */
  cover?: string;
  coverAlt?: string;
  coverFallback?: ReactNode;
  children: ReactNode;
  className?: string;
  coverClassName?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        // `relative` anchors PostCard's stretched link over the whole card.
        "interactive group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-neutral-100 bg-white shadow-card",
        "hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-neutral-100">
        {cover ? (
          <Image
            src={cover}
            alt={coverAlt ?? ""}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className={cn(
              "object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]",
              coverClassName,
            )}
          />
        ) : (
          coverFallback
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">{children}</div>
    </article>
  );
}

/** Title + one-line description block, shared by every card type. */
export function CardBody({
  title,
  description,
}: {
  title: ReactNode;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <h3 className="text-lg leading-snug font-bold text-balance">{title}</h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}
