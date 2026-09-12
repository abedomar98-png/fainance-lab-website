"use client";

import Image from "next/image";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Tag } from "@/components/ui/Tag";
import type { Testimonial } from "@/content/types";

/**
 * A testimonial card.
 *
 * Placeholder entries render a visible "placeholder" tag and a neutral avatar
 * silhouette, so an unfinished card can never be mistaken for a real
 * endorsement by a real person.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { dict, locale } = useLocale();

  return (
    <figure className="interactive flex h-full flex-col gap-5 rounded-panel border border-neutral-100 bg-white p-6 shadow-card hover:-translate-y-1 hover:shadow-lift sm:p-7">
      {testimonial.isPlaceholder ? (
        <Tag tone="placeholder" className="self-start">
          {dict.common.placeholderBadge}
        </Tag>
      ) : null}

      {/* Opening quote mark in gold — accent, not fill. */}
      <svg
        viewBox="0 0 24 24"
        className="size-7 shrink-0 text-brand-gold rtl:-scale-x-100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9.4 5.2C6 6.9 4 9.9 4 13.6c0 3.1 1.8 5.2 4.4 5.2 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.9 2-3.6 4.2-4.6l-2.8-2Zm9.6 0c-3.4 1.7-5.4 4.7-5.4 8.4 0 3.1 1.8 5.2 4.4 5.2 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.9 2-3.6 4.2-4.6l-2.8-2Z" />
      </svg>

      <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-neutral-600">
        {testimonial.quote[locale]}
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-neutral-100 pt-5">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-300"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <circle cx="12" cy="9" r="3.5" />
              <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
            </svg>
          </span>
        )}

        <div className="flex flex-col">
          <span className="font-display text-sm font-bold">
            {testimonial.name[locale]}
          </span>
          <span className="text-xs text-neutral-500">
            {testimonial.title[locale]}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
