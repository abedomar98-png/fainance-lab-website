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

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
  /** Optional in-site link rendered after the answer (e.g. /terms). */
  link?: { href: string; label: Localized };
};

export type GlossaryGroup = "ai" | "finance" | "claude" | "credential";

export type GlossaryTerm = {
  /** The English term, as displayed in the first column. */
  term: string;
  /** The Arabic meaning — a translation, or the term itself where it is a
   *  product name with no translation. */
  ar: string;
  /** One line on what the term means / is used for. */
  description: Localized;
  group: GlossaryGroup;
};

export type Video = {
  slug: string;
  /** The id after `watch?v=` in a YouTube URL. */
  youtubeId: string;
  title: Localized;
  /** One line for the card. */
  description: Localized;
  tag: CategoryId;
  /** Channel name, credited on the card and in the player. */
  creator: string;
  /** ORIGINAL Arabic summary, 2–3 sentences — written fresh, not a
   *  translated transcript. Shown in the caption box by default. */
  summaryAr: string;
  /** Optional path (under /public) to a synced Arabic .vtt file. When set,
   *  the caption box renders synced captions instead of the summary. */
  captionsAr?: string;
};

export type EventDownload = {
  label: Localized;
  /** Path under /public. */
  file: string;
  format: "PDF" | "DOCX" | "PPTX";
  /** Human-readable size, e.g. "13.8 MB". */
  size: string;
};

export type EventEntry = {
  slug: string;
  name: Localized;
  /** The talk given at the event, when it's a speaking slot. */
  sessionTitle?: Localized;
  /** Theme of the event as a whole, if it has one. */
  theme?: Localized;
  /** ISO date. Upcoming vs past is derived from the dates, never stored. */
  startDate: string;
  endDate?: string;
  location: Localized;
  organizer: string;
  /** One or two lines for the card. */
  teaser: Localized;
  /** Detail-page paragraphs — drawn only from the event's own materials. */
  intro: Localized[];
  outline?: Localized[];
  hero: { src: string; alt: Localized };
  /** Public teaser slides. */
  slides: { src: string; alt: Localized }[];
  /** Gated behind the lead-capture modal. One registration unlocks all. */
  downloads: EventDownload[];
};
