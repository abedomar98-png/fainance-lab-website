"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/providers/LocaleProvider";
import { GlobeIcon } from "@/components/ui/Icon";
import { locales, otherLocale, localeShortLabel } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Swaps the locale segment of the current path, so the visitor stays on the
 * page they were reading rather than being dropped on the home page.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname() ?? "/";
  const target = otherLocale(locale);

  const segments = pathname.split("/");
  // segments[0] is "" — segments[1] is the locale when one is present.
  if (locales.includes(segments[1] as (typeof locales)[number])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  const href = segments.join("/") || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={dict.nav.switchLanguage}
      className={cn(
        "interactive inline-flex items-center gap-1.5 rounded-pill border border-neutral-200 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-600",
        "hover:border-brand-blue hover:text-brand-blue-deep hover:-translate-y-[2px] hover:shadow-card active:translate-y-px active:shadow-none",
        className,
      )}
    >
      {/* Label the DESTINATION, not the current locale — a bidirectional
          arrow between the two reads backwards in one of the directions. */}
      <GlobeIcon className="size-3.5 text-neutral-400" />
      <span>{localeShortLabel[target]}</span>
    </Link>
  );
}
