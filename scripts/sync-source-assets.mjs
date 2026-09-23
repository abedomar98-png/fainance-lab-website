/**
 * Copies the assets Abed supplies by hand from `source-assets/` into
 * `public/`, under the fixed names the site looks for.
 *
 *   About Fainance video → public/assets/video/about-fainance.<ext>
 *     source-assets/about-fainance-video/<any video>, or
 *     source-assets/about-fainance-video.<ext>
 *   Optional poster      → public/assets/video/about-fainance-poster.<ext>
 *     source-assets/about-fainance-video/<any image>, or
 *     source-assets/about-fainance-poster.<ext>
 *   Logo anatomy         → public/assets/brand/logo-anatomy-{ar,en}.<ext>
 *     source-assets/logo-anatomy/<anything>-ar.<ext> / -en.<ext>, or
 *     source-assets/logo-anatomy-ar[.<ext>] / logo-anatomy-en[.<ext>]
 *
 * A file saved without an extension is identified by its first bytes, so
 * `logo-anatomy-ar` (a PNG) still lands as `logo-anatomy-ar.png`.
 *
 * Runs before `dev` and `build` (predev / prebuild), or on its own with
 * `npm run sync:assets`. A missing folder or file is not an error — the page
 * shows a placeholder for anything that hasn't been supplied yet.
 */
import {
  closeSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  openSync,
  readSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const srcRoot = join(root, "source-assets");
const pub = (...p) => join(root, "public", ...p);

const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

/** The file's real extension: its own, or sniffed from the header if it has none. */
function realExt(path) {
  const own = extname(path).toLowerCase();
  if (own) return own === ".jpeg" ? ".jpg" : own;

  const head = Buffer.alloc(12);
  const fd = openSync(path, "r");
  readSync(fd, head, 0, 12, 0);
  closeSync(fd);
  if (head.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return ".png";
  if (head[0] === 0xff && head[1] === 0xd8) return ".jpg";
  if (head.toString("latin1", 0, 4) === "RIFF" && head.toString("latin1", 8, 12) === "WEBP") return ".webp";
  if (head.toString("latin1", 4, 8) === "ftyp") return ".mp4";
  return "";
}

/** Files in a folder with their real extensions, newest first so a replacement wins. */
function listFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .map((name) => ({ name, path: join(dir, name) }))
    .filter((f) => statSync(f.path).isFile())
    .map((f) => ({ ...f, stem: f.name.replace(/\.[^.]+$/, "").toLowerCase(), ext: realExt(f.path) }))
    .sort((a, b) => statSync(b.path).mtimeMs - statSync(a.path).mtimeMs);
}

/**
 * Copy `file` to `<destDir>/<basename><ext>`, first removing any copy under a
 * different extension so the site never finds two candidates. Skips the copy
 * when an identical-size, newer-or-equal file is already in place.
 */
function place(file, destDir, basename) {
  mkdirSync(destDir, { recursive: true });
  const target = join(destDir, basename + file.ext);
  for (const existing of readdirSync(destDir)) {
    const path = join(destDir, existing);
    if (existing.replace(/\.[^.]+$/, "") === basename && path !== target) rmSync(path);
  }
  const rel = `public/${target.slice(pub().length + 1).replaceAll("\\", "/")}`;
  if (existsSync(target)) {
    const [a, b] = [statSync(file.path), statSync(target)];
    if (a.size === b.size && b.mtimeMs >= a.mtimeMs) {
      console.log(`  ${rel} is up to date`);
      return;
    }
  }
  copyFileSync(file.path, target);
  console.log(`  ${file.name} → ${rel}`);
}

const rootFiles = listFiles(srcRoot);
const videoDir = listFiles(join(srcRoot, "about-fainance-video"));
const logoDir = listFiles(join(srcRoot, "logo-anatomy"));

const video =
  videoDir.find((f) => VIDEO_EXT.has(f.ext)) ??
  rootFiles.find((f) => f.stem === "about-fainance-video" && VIDEO_EXT.has(f.ext));
const poster =
  videoDir.find((f) => IMAGE_EXT.has(f.ext)) ??
  rootFiles.find((f) => f.stem === "about-fainance-poster" && IMAGE_EXT.has(f.ext));

const jobs = [];
if (video) jobs.push(() => place(video, pub("assets", "video"), "about-fainance"));
if (poster) jobs.push(() => place(poster, pub("assets", "video"), "about-fainance-poster"));

for (const locale of ["ar", "en"]) {
  const logo =
    logoDir.find((f) => f.stem.endsWith(`-${locale}`) && IMAGE_EXT.has(f.ext)) ??
    rootFiles.find((f) => f.stem === `logo-anatomy-${locale}` && IMAGE_EXT.has(f.ext));
  if (logo) jobs.push(() => place(logo, pub("assets", "brand"), `logo-anatomy-${locale}`));
}

if (jobs.length === 0) {
  console.log("sync-source-assets: nothing in source-assets/ yet — placeholders will show.");
} else {
  console.log("sync-source-assets:");
  for (const run of jobs) run();
}
