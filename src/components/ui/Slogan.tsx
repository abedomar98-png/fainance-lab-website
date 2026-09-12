"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * The brand CTA slogan.
 *
 * Playbook rule: it is the LAST line of a CTA surface, and appears at most
 * ONCE per surface. Rendered as the gold pill used in the brand's own social
 * artwork — ink-navy text on gold, never white on gold.
 *
 * The rising arrow echoes the logo's gold arrow.
 */
export function Slogan({ className }: { className?: string }) {
  const { dict } = useLocale();

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-pill bg-brand-gold px-4 py-2 font-display text-sm font-bold text-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 rtl:-scale-x-100"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 16.5c3.5 0 5-7 9.5-7" />
        <path d="M19.5 9.5h-4m4 0v4" />
      </svg>
      <span>{dict.common.slogan}</span>
    </p>
  );
}
