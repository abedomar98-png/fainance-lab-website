/**
 * Search normalisation for bilingual (Arabic + English) live filtering.
 *
 * Arabic text varies in ways a reader treats as the same word, so a literal
 * substring match misses obvious hits. Before comparing, both the query and
 * the haystack are folded:
 *   - case-insensitive (Latin)
 *   - tashkeel (diacritics) and tatweel removed — «مُحاسَبة» matches «محاسبة»
 *   - alef forms unified — أ إ آ ٱ → ا
 *   - taa marbuta → haa, alef maqsura → yaa — «موازنة» matches «موازنه»
 */
const DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;

export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(DIACRITICS, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when every word of `query` appears somewhere in `fields`. */
export function matchesQuery(query: string, fields: string[]): boolean {
  const q = normalizeSearch(query);
  if (!q) return true;
  const haystack = normalizeSearch(fields.join(" "));
  return q.split(" ").every((word) => haystack.includes(word));
}
