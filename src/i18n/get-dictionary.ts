import type { Locale } from "./config";
import ar from "./dictionaries/ar";
import en, { type Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

/**
 * Dictionaries are plain modules rather than dynamic imports: the whole site
 * is statically rendered for both locales, so there is no request-time cost,
 * and Server Components mean none of this reaches the client bundle.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
