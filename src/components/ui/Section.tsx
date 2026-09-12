import type { ElementType, ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Page-width container. One place to change the site's measure. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={cn("py-20 sm:py-24", className)}>
      {children}
    </Tag>
  );
}

/**
 * Eyebrow + title + optional subtitle.
 *
 * The eyebrow sits in IBM Plex Mono with a gold hairline beside it — the
 * playbook's label treatment, and the only place gold appears as a rule.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "start" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal
          variant="rise"
          className="flex items-center gap-3"
          style={{ ["--reveal-origin" as string]: "inline-start" }}
        >
          <span
            className={cn(
              "font-mono text-xs tracking-[0.16em] uppercase",
              onDark ? "text-brand-gold" : "text-brand-blue",
            )}
          >
            {eyebrow}
          </span>
          <span className="rule-gold h-px w-10 shrink-0 rtl:rotate-180" />
        </Reveal>
      ) : null}

      <Reveal
        as="h2"
        variant="rise"
        className={cn(
          "max-w-2xl text-3xl leading-tight font-bold sm:text-4xl",
          onDark && "text-white",
        )}
      >
        {title}
      </Reveal>

      {subtitle ? (
        <Reveal
          as="p"
          variant="rise"
          className={cn(
            "max-w-2xl text-[1.05rem] leading-relaxed",
            onDark ? "text-neutral-200" : "text-neutral-500",
          )}
        >
          {subtitle}
        </Reveal>
      ) : null}
    </div>
  );
}
