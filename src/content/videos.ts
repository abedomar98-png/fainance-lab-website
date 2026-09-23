import type { Video } from "./types";

/**
 * Videos library.
 *
 * Deliberately empty: Abed hasn't chosen the videos yet, and placeholder
 * videos must not be invented. The page renders a clean "coming soon" state
 * until entries are added here.
 *
 * To add one:
 *   {
 *     slug: "short-kebab-slug",
 *     youtubeId: "xxxxxxxxxxx",        // the part after watch?v=
 *     title: { ar: "…", en: "…" },
 *     description: { ar: "…", en: "…" },
 *     tag: "aiTools",                   // any blog topic id
 *     creator: "Channel name",
 *     summaryAr: "…",                   // ORIGINAL 2–3 sentence Arabic summary
 *     captionsAr: "/captions/slug.vtt", // optional — enables synced captions
 *   }
 *
 * A synced Arabic caption file of another creator's speech is a derivative
 * of their work — get their permission before adding `captionsAr`.
 */
export const videos: Video[] = [];
