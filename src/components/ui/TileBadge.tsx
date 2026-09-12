import type { ComponentType, SVGProps } from "react";

import type { BadgeTone } from "@/content/pillars";
import { cn } from "@/lib/utils";

/**
 * The playbook's tile badge: a rounded colour tile carrying a white line icon.
 *
 * Gold tiles take INK text/icon, never white — white on gold is an explicit
 * brand prohibition and fails contrast besides.
 */
const toneStyles: Record<BadgeTone, string> = {
  blue: "bg-brand-blue text-white",
  green: "bg-brand-green text-white",
  gold: "bg-brand-gold text-ink",
};

const sizeStyles = {
  md: "size-12 rounded-chip [&>svg]:size-6",
  lg: "size-14 rounded-[14px] [&>svg]:size-7",
} as const;

export function TileBadge({
  icon: Icon,
  tone,
  size = "md",
  className,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: BadgeTone;
  size?: keyof typeof sizeStyles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "interactive inline-flex shrink-0 items-center justify-center",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
    >
      <Icon />
    </span>
  );
}
