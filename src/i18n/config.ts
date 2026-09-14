/**
 * Locale configuration.
 *
 * Arabic is the PRIMARY locale for Fainance Lab — `/` redirects to `/ar`,
 * and English is the secondary translation.
 */
export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/**
 * Remembers a visitor's explicit language choice. Set only by the language
 * switcher, and read by the proxy when a visitor arrives without a locale in
 * the URL — so a first visit always opens in Arabic, and someone who chose
 * English isn't sent back to Arabic every time they return.
 */
export const LOCALE_COOKIE = "fainance-locale";

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
