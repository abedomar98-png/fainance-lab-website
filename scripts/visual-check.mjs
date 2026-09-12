/**
 * Visual + motion check.
 *
 * A passing `next build` says nothing about whether the page looks right or
 * whether the animations actually fire, so this drives a real browser: it
 * loads both locales, waits out the signature arrow draw, scrolls to trigger
 * the staggered reveals, hovers cards, and opens the capture modal — capturing
 * a screenshot at each step.
 *
 * Usage:
 *   npm run dev           # in one terminal
 *   node scripts/visual-check.mjs
 *
 * Screenshots land in .visual-check/ (gitignored).
 */
import { mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../.visual-check");
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Walk the page top to bottom so every scroll reveal fires. */
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo({ top }), y);
    await wait(260);
  }
  await wait(900);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const findings = [];

function note(label, ok, detail) {
  findings.push({ label, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
}

for (const locale of ["ar", "en"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });

  /* --- direction + logo integrity ------------------------------------- */
  const dir = await page.evaluate(() => document.documentElement.dir);
  note(
    `[${locale}] document dir`,
    dir === (locale === "ar" ? "rtl" : "ltr"),
    dir,
  );

  const logoTransform = await page
    .locator("header img")
    .first()
    .evaluate((el) => getComputedStyle(el).transform);
  // A mirrored logo would carry a negative x scale (matrix(-1, ...)).
  note(
    `[${locale}] logo not mirrored`,
    logoTransform === "none" || !logoTransform.startsWith("matrix(-"),
    logoTransform,
  );

  /* --- signature arrow draw-on ---------------------------------------- */
  await wait(300);
  await page.screenshot({ path: `${outDir}/${locale}-01-hero-early.png` });

  const midDraw = await page
    .locator("[data-arrow]")
    .evaluate((el) => getComputedStyle(el).strokeDashoffset);

  await wait(2600);
  await page.screenshot({ path: `${outDir}/${locale}-02-hero-settled.png` });

  const endDraw = await page
    .locator("[data-arrow]")
    .evaluate((el) => getComputedStyle(el).strokeDashoffset);

  note(
    `[${locale}] gold arrow draws on`,
    parseFloat(midDraw) > 1 && parseFloat(endDraw) < 1,
    `dashoffset ${midDraw} -> ${endDraw}`,
  );

  /* --- staggered scroll reveals ---------------------------------------- */
  const pillars = page.locator("section:has(ul) li").first();
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "smooth" }));
  await wait(400);
  await page.screenshot({ path: `${outDir}/${locale}-03-pillars-entering.png` });
  await wait(1400);
  await page.screenshot({ path: `${outDir}/${locale}-04-pillars-settled.png` });

  const pillarOpacity = await pillars.evaluate(
    (el) => getComputedStyle(el).opacity,
  );
  note(`[${locale}] pillar reveal completes`, pillarOpacity === "1", pillarOpacity);

  /* --- hover lift ------------------------------------------------------ */
  await page.evaluate(() => window.scrollTo({ top: 1750, behavior: "smooth" }));
  await wait(1200);
  const card = page.locator("article").first();
  await card.scrollIntoViewIfNeeded();
  await wait(600);
  // Tailwind v4 emits the standalone `translate` property, not `transform`,
  // so read both — and the box position, which is what a user actually sees.
  const probe = (el) => {
    const s = getComputedStyle(el);
    return `${s.translate} | ${s.transform} | ${Math.round(el.getBoundingClientRect().top)}`;
  };
  const rest = await card.evaluate(probe);
  await card.hover();
  await wait(500);
  const hovered = await card.evaluate(probe);
  await page.screenshot({ path: `${outDir}/${locale}-05-card-hover.png` });
  note(
    `[${locale}] card lifts on hover`,
    rest !== hovered,
    `${rest}  ->  ${hovered}`,
  );

  /* --- capture modal --------------------------------------------------- */
  const downloadButton = page.getByRole("button", {
    name: locale === "ar" ? "تحميل" : "Download",
  });
  if (await downloadButton.first().isVisible()) {
    await downloadButton.first().click();
    await wait(700);
    await page.screenshot({ path: `${outDir}/${locale}-06-modal.png` });
    const dialog = page.getByRole("dialog");
    note(`[${locale}] capture modal opens`, await dialog.isVisible());
    await page.keyboard.press("Escape");
    // AnimatePresence plays a ~0.4s exit before unmounting.
    await dialog.waitFor({ state: "detached", timeout: 3000 }).catch(() => {});
    note(`[${locale}] modal closes on Escape`, (await dialog.count()) === 0);
  } else {
    note(`[${locale}] capture modal opens`, false, "download button not found");
  }

  /* --- header condense ------------------------------------------------- */
  const headerHeight = await page
    .locator("header > div")
    .first()
    .evaluate((el) => el.getBoundingClientRect().height);
  note(
    `[${locale}] header condenses on scroll`,
    Math.round(headerHeight) === 64,
    `${Math.round(headerHeight)}px`,
  );

  /* --- full page, both locales -----------------------------------------
     Scroll the whole page first so every scroll-triggered reveal has fired;
     a fullPage screenshot does not itself trip an IntersectionObserver, so
     without this pass the lower sections capture mid-animation at opacity 0. */
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await wait(900);
  await page.screenshot({
    path: `${outDir}/${locale}-07-full.png`,
    fullPage: true,
  });

  /* --- inner pages ------------------------------------------------------ */
  for (const route of ["about", "courses", "resources", "blog", "contact"]) {
    await page.goto(`${BASE}/${locale}/${route}`, { waitUntil: "networkidle" });
    await scrollThrough(page);
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await wait(600);
    await page.screenshot({
      path: `${outDir}/${locale}-page-${route}.png`,
      fullPage: true,
    });
  }

  note(
    `[${locale}] no console errors`,
    consoleErrors.length === 0,
    consoleErrors.slice(0, 3).join(" | "),
  );

  await context.close();
}

/* --- mobile ------------------------------------------------------------ */
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const mpage = await mobile.newPage();
await mpage.goto(`${BASE}/ar`, { waitUntil: "networkidle" });
await wait(2200);
await scrollThrough(mpage);
await mpage.evaluate(() => window.scrollTo({ top: 0 }));
await wait(600);
await mpage.screenshot({ path: `${outDir}/mobile-ar-home.png`, fullPage: true });

// Mobile nav drawer
await mpage.getByRole("button", { name: "فتح القائمة" }).click();
await wait(700);
await mpage.screenshot({ path: `${outDir}/mobile-ar-menu.png` });
await mobile.close();

await browser.close();

const failed = findings.filter((f) => !f.ok);
console.log(
  `\n${findings.length - failed.length}/${findings.length} checks passed. Screenshots: ${outDir}`,
);
process.exit(failed.length > 0 ? 1 : 0);
