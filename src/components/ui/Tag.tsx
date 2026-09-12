import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TagTone =
  | "free" // a real, downloadable file
  | "soon" // not built yet
  | "placeholder" // visibly unfinished — must never read as finished
  | "topic"; // blog category

const toneStyles: Record<TagTone, string> = {
  free: "bg-brand-green/10 text-brand-green-deep border-brand-green/25",
  soon: "bg-neutral-100 text-neutral-600 border-neutral-300",
  // Gold as a hairline accent, not a fill — and never with white text.
  placeholder: "bg-brand-gold/12 text-ink border-brand-gold/50",
  topic: "bg-white text-neutral-600 border-neutral-200 hover:border-brand-blue hover:text-brand-blue-deep",
};

export function Tag({
  tone = "topic",
  children,
  className,
}: {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "interactive inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[0.7rem] tracking-wide uppercase",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
