/**
 * Locale configuration.
 *
 * Arabic is the PRIMARY locale for Fainance Lab — `/` redirects to `/ar`,
 * and English is the secondary translation.
 */
export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

/** Label each locale in its own language, for the language switcher. */
export const localeLabel: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

/** Short code shown in the compact switcher. */
export const localeShortLabel: Record<Locale, string> = {
  ar: "ع",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The opposite locale — the switcher only ever toggles between two. */
export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}
