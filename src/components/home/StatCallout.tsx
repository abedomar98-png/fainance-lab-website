"use client";

import { cn } from "@/lib/utils";

export type Stat = {
  figures: { value: string; label: string }[];
  /** Optional sentence that frames what the numbers mean. */
  framing?: string;
  source: string;
};

/**
 * A sourced statistic. Every figure on the site carries its publisher and
 * sample, and each was checked against the primary source before publishing.
 */
export function StatCallout({ stat, className }: { stat: Stat; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-5 rounded-panel border border-neutral-200 bg-white p-6 shadow-card sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap gap-x-8 gap-y-5">
        {stat.figures.map((figure, index) => (
          <div key={figure.value} className="flex min-w-[9rem] flex-1 flex-col gap-2">
            <span
              className={cn(
                "font-display text-4xl leading-none font-extrabold tracking-tight",
                index === 0 ? "text-brand-blue" : "text-ink",
              )}
            >
              {figure.value}
            </span>
            {/* Gold as a hairline accent, never a fill. */}
            <span aria-hidden className="h-0.5 w-8 rounded-pill bg-brand-gold" />
            <span className="text-sm leading-relaxed text-neutral-600">
              {figure.label}
            </span>
          </div>
        ))}
      </div>

      {stat.framing ? (
        <p className="border-t border-neutral-100 pt-4 text-[0.95rem] leading-relaxed font-semibold text-ink">
          {stat.framing}
        </p>
      ) : null}

      <figcaption className="mt-auto font-mono text-[0.7rem] leading-relaxed text-neutral-400">
        {stat.source}
      </figcaption>
    </figure>
  );
}
