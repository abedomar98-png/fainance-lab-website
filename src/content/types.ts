import type { Locale } from "@/i18n/config";

/** A string that exists in both locales. */
export type Localized = Record<Locale, string>;

export function pick(value: Localized, locale: Locale): string {
  return value[locale];
}

/** The five content pillars every piece of content belongs to. */
export type PillarId =
  | "accounting"
  | "finance"
  | "externalAudit"
  | "internalAudit"
  | "grc";

/** Blog topics for the tag cloud. Supersets the pillars. */
export type CategoryId =
  | PillarId
  | "aiTools"
  | "templates"
  | "career"
  | "tips";

export type Resource = {
  slug: string;
  title: Localized;
  description: Localized;
  /** Path under /public. */
  cover: string;
  /** Path under /public that the modal unlocks. */
  file: string;
  pillar: PillarId;
  /**
   * `ready`      — the real, final file is in place.
   * `placeholder`— the download flow works but the file is a stub Abed will swap.
   */
  status: "ready" | "placeholder";
  /** Shown on placeholder cards so nothing looks more finished than it is. */
  note?: Localized;
};

export type Course = {
  slug: string;
  title: Localized;
  description: Localized;
  pillar: PillarId;
  /** Phase 1 has no live courses — everything is `coming-soon`. */
  status: "coming-soon";
};

export type Post = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  cover: string;
  /** Alt text for the infographic, which carries the post's real content. */
  coverAlt: Localized;
  categories: CategoryId[];
  date: string;
  /** Intro paragraphs shown above the infographic. */
  intro: Localized[];
  /** True while `intro` is unapproved placeholder copy. */
  introIsPlaceholder: boolean;
};

export type Testimonial = {
  id: string;
  quote: Localized;
  name: Localized;
  title: Localized;
  /** Null until Abed supplies a real, permission-confirmed headshot. */
  avatar: string | null;
  isPlaceholder: boolean;
};
