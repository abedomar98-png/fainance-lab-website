import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Convert Western digits (0–9) to Arabic-Indic digits (٠–٩).
 *
 * The playbook requires Arabic-Indic numerals everywhere in `/ar` — including
 * stat figures, dates, list counters and reading times. Latin product names
 * that legitimately contain digits (e.g. "Excel 365", "GPT-4") should be
 * wrapped in `.latin` and passed through `toArabicDigits` only when the digit
 * is genuinely a number, not part of a name.
 */
export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)]);
}

/** Locale-aware numeral formatting: Arabic-Indic in `ar`, Western in `en`. */
export function formatNumber(value: string | number, locale: Locale): string {
  return locale === "ar" ? toArabicDigits(value) : String(value);
}

/** Build a locale-prefixed href: `path` should start with `/` or be empty. */
export function localeHref(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

/** Format an ISO date for display in the given locale. */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  const formatted = new Intl.DateTimeFormat(
    locale === "ar" ? "ar" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(date);
  return formatted;
}
