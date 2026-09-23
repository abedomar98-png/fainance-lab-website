import "server-only";

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Finds an optional asset in /public by base name, whatever its extension.
 *
 * Used for files Abed drops in later (the About Fainance video, the logo
 * anatomy images): `scripts/sync-source-assets.mjs` copies them from
 * `source-assets/` into /public, and the page renders a placeholder until
 * they exist. Runs on the server only — at build time for static pages, per
 * request in dev.
 *
 * @example findPublicAsset("assets/video", "about-fainance") // "/assets/video/about-fainance.mp4" | null
 */
export function findPublicAsset(dir: string, basename: string): string | null {
  const abs = join(process.cwd(), "public", dir);
  if (!existsSync(abs)) return null;
  const hit = readdirSync(abs).find(
    (file) => file.replace(/\.[^.]+$/, "") === basename,
  );
  return hit ? `/${dir}/${hit}` : null;
}
