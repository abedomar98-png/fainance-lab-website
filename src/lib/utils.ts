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

/**
 * Format a date range ("27–30 July 2026" / «٢٧–٣٠ يوليو ٢٠٢٦»), collapsing the
 * shared month and year.
 *
 * Assembled by hand rather than with `Intl.DateTimeFormat#formatRange`: Node
 * and browsers ship different ICU data, which space the dash differently, and
 * the server/client mismatch breaks hydration. Only month names come from
 * Intl. Dates are ISO days, so they are read in UTC — otherwise a visitor west
 * of Greenwich sees every date a day early.
 */
export function formatDateRange(
  startIso: string,
  endIso: string | undefined,
  locale: Locale,
): string {
  const monthName = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  const parts = (iso: string) => {
    const date = new Date(iso);
    return {
      day: date.getUTCDate(),
      month: monthName.format(date),
      year: date.getUTCFullYear(),
    };
  };

  const start = parts(startIso);
  const end = endIso ? parts(endIso) : start;
  let text: string;
  if (!endIso || endIso === startIso) {
    text = `${start.day} ${start.month} ${start.year}`;
  } else if (start.year !== end.year) {
    text = `${start.day} ${start.month} ${start.year} – ${end.day} ${end.month} ${end.year}`;
  } else if (start.month !== end.month) {
    text = `${start.day} ${start.month} – ${end.day} ${end.month} ${end.year}`;
  } else {
    text = `${start.day}–${end.day} ${start.month} ${start.year}`;
  }
  return formatNumber(text, locale);
}
