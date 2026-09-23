/**
 * Visual + motion check.
 *
 * A passing `next build` says nothing about whether the page looks right or
 * whether the animations actually fire, so this drives a real browser: it
 * loads both locales, watches the gold arrow draw on, scrolls to trigger the
 * staggered reveals, hovers cards, opens the capture modal, and exercises the
 * newer pages (nav fit and "More" menu, FAQ accordion, glossary search, the
 * event download gate) — capturing a screenshot at each step.
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

  /* --- home section order ------------------------------------------------
     Hero, About Fainance, Why Fainance, What you'll learn, Who it's for,
     Resources — and nothing after it (newsletter, testimonials and blog
     preview are paused; Trusted-by renders nothing). */
  const sectionCount = await page.locator("main > section").count();
  note(`[${locale}] home renders 6 sections`, sectionCount === 6, `${sectionCount}`);
  if (locale === "en") {
    const titles = await page.locator("main > section h2").allTextContents();
    const expected = [
      "AI + Finance = Growth",
      "Fluent in both languages: accounting and AI",
      "Five practice areas, one practical lens",
      "The full finance function",
      "Start with something you can use today",
    ];
    note(
      "[en] home sections in order",
      expected.every((t, i) => titles[i]?.trim() === t),
      titles.join(" | "),
    );
  }

  /* --- About Fainance media ------------------------------------------- */
  const about = await page.evaluate(() => {
    const video = document.querySelector("main video");
    const anatomy = [...document.images].find((i) =>
      decodeURIComponent(i.currentSrc || i.src).includes("logo-anatomy"),
    );
    return {
      video: video?.getAttribute("src") ?? null,
      anatomy: anatomy ? decodeURIComponent(anatomy.currentSrc || anatomy.src) : null,
      anatomyTransform: anatomy ? getComputedStyle(anatomy).transform : null,
    };
  });
  note(`[${locale}] about video present`, !!about.video, about.video ?? "placeholder");
  note(
    `[${locale}] logo anatomy in this locale, not mirrored`,
    !!about.anatomy &&
      about.anatomy.includes(`logo-anatomy-${locale}`) &&
      !String(about.anatomyTransform).startsWith("matrix(-"),
    about.anatomy ?? "placeholder",
  );

  /* --- staggered scroll reveals ---------------------------------------- */
  const pillars = page.locator("section:has(ul li svg) li").first();
  await pillars.scrollIntoViewIfNeeded();
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
  for (const route of [
    "about",
    "courses",
    "resources",
    "blog",
    "contact",
    "videos",
    "events",
    "events/forum-accountants-financiers-2026",
    "faq",
    "glossary",
    "terms",
  ]) {
    await page.goto(`${BASE}/${locale}/${route}`, { waitUntil: "networkidle" });
    await scrollThrough(page);
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await wait(600);
    await page.screenshot({
      path: `${outDir}/${locale}-page-${route.replaceAll("/", "_")}.png`,
      fullPage: true,
    });
  }

  /* --- nav: one row at every desktop width, "More" menu -------------- */
  for (const width of [1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${BASE}/${locale}/faq`, { waitUntil: "networkidle" });
    const fit = await page.evaluate(() => {
      const nav = document.querySelector("header nav");
      const items = [...nav.children].map((el) => el.getBoundingClientRect());
      const bar = nav.parentElement.getBoundingClientRect();
      const tools = [...nav.parentElement.children].map((el) => el.getBoundingClientRect());
      const cta = [...document.querySelectorAll("header a")].find(
        (a) => !a.closest("nav") && a.getAttribute("href")?.endsWith("/resources"),
      );
      const ctaBox = cta?.getBoundingClientRect();
      return {
        oneRow: items.every((r) => Math.abs(r.top - items[0].top) < 2),
        inside: tools.every((r) => r.left >= bar.left - 1 && r.right <= bar.right + 1),
        noOverlap: tools.every((r, i) => i === 0 || tools[i - 1].right <= r.left + 1 || tools[i - 1].left >= r.right - 1),
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        ctaVisible: !!ctaBox && ctaBox.width > 0,
        barHeight: Math.round(bar.height),
      };
    });
    note(
      `[${locale}] nav fits one row at ${width}px`,
      fit.oneRow && fit.inside && fit.noOverlap && !fit.overflow && fit.ctaVisible,
      JSON.stringify(fit),
    );
    await page.screenshot({
      path: `${outDir}/${locale}-nav-${width}.png`,
      clip: { x: 0, y: 0, width, height: 90 },
    });
  }
  await page.setViewportSize({ width: 1440, height: 900 });

  const more = page.locator("header nav button[aria-haspopup]");
  await more.click();
  await wait(400);
  const menuLinks = await page.locator("header nav ul a").allTextContents();
  await page.screenshot({
    path: `${outDir}/${locale}-nav-more.png`,
    clip: { x: 0, y: 0, width: 1440, height: 260 },
  });
  note(`[${locale}] More menu lists FAQ + Glossary`, menuLinks.length === 2, menuLinks.join(", "));
  await page.keyboard.press("Escape");
  await wait(400);
  note(
    `[${locale}] More menu closes on Escape`,
    (await page.locator("header nav ul").count()) === 0,
  );

  /* --- FAQ accordion ---------------------------------------------------- */
  const faqCount = await page.locator("[data-faq-item]").count();
  note(`[${locale}] FAQ has 9 questions`, faqCount === 9, `${faqCount}`);
  const firstQ = page.locator("[data-faq-item] button").first();
  await firstQ.click();
  await wait(500);
  const opened = await firstQ.getAttribute("aria-expanded");
  const answerVisible = await page.locator("[data-faq-item] [role=region]").first().isVisible();
  await firstQ.click();
  await wait(500);
  const closed = await firstQ.getAttribute("aria-expanded");
  note(
    `[${locale}] FAQ answer opens and closes`,
    opened === "true" && answerVisible && closed === "false",
  );

  /* --- glossary search -------------------------------------------------- */
  await page.goto(`${BASE}/${locale}/glossary`, { waitUntil: "networkidle" });
  const rows = page.locator("[data-glossary-row]");
  const total = await rows.count();
  const tableVisible = await page.evaluate(() => {
    let el = document.querySelector("[data-glossary]");
    let opacity = 1;
    for (; el; el = el.parentElement) opacity *= parseFloat(getComputedStyle(el).opacity);
    return opacity;
  });
  note(`[${locale}] glossary table visible`, tableVisible === 1, `opacity=${tableVisible}`);
  const search = page.locator("input[type=search]");
  const countFor = async (q) => {
    await search.fill(q);
    await wait(150);
    return rows.count();
  };
  const lower = await countFor("audit");
  const upper = await countFor("AUDIT");
  const partial = await countFor("prom");
  const arabic = await countFor("تدقيق");
  const none = await countFor("zzqx");
  await page.screenshot({ path: `${outDir}/${locale}-glossary-no-results.png` });
  const noResults = await page.locator("p.border-dashed").isVisible();
  await search.fill("");
  note(
    `[${locale}] glossary search (partial, case-insensitive, both languages)`,
    total > 30 && lower > 0 && lower < total && upper === lower && partial > 0 && arabic > 0 && none === 0,
    `total=${total} audit=${lower} AUDIT=${upper} prom=${partial} تدقيق=${arabic} zzqx=${none}`,
  );
  note(`[${locale}] glossary no-results state`, noResults);

  /* --- event download gate: one registration unlocks both -------------- */
  await page.goto(`${BASE}/${locale}/events`, { waitUntil: "networkidle" });
  note(
    `[${locale}] events: no search bar under 4 events`,
    (await page.locator("[role=search]").count()) === 0,
  );
  await page.goto(`${BASE}/${locale}/events/forum-accountants-financiers-2026`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  const slideCount = await page.locator("main button img[src*='slide-']").count();
  note(`[${locale}] event shows exactly 3 teaser slides`, slideCount === 3, `${slideCount}`);
  const gate = page.locator("[data-event-downloads]");
  await gate.scrollIntoViewIfNeeded();
  await wait(800);
  const lockedState = await gate.getAttribute("data-event-downloads");
  await page.locator("[data-event-register]").click();
  await wait(600);
  const dialog2 = page.getByRole("dialog");
  await dialog2.locator("input").nth(0).fill("Visual Check");
  await dialog2.locator("input").nth(1).fill("check@example.com");
  await dialog2.locator("button[type=submit]").click();
  await wait(1200);
  const offered = await dialog2.locator("a[download]").count();
  await page.screenshot({ path: `${outDir}/${locale}-event-unlocked-modal.png` });
  await page.keyboard.press("Escape");
  await dialog2.waitFor({ state: "detached", timeout: 3000 }).catch(() => {});
  const direct = await gate.locator("a[download]").count();
  await page.screenshot({ path: `${outDir}/${locale}-event-unlocked-page.png` });
  await page.reload({ waitUntil: "networkidle" });
  await wait(500);
  const persisted = await page.locator("[data-event-downloads]").getAttribute("data-event-downloads");
  note(
    `[${locale}] one registration unlocks both event files`,
    lockedState === "locked" && offered === 2 && direct === 2 && persisted === "unlocked",
    `before=${lockedState} modal=${offered} page=${direct} afterReload=${persisted}`,
  );

  /* --- terms: data-security paragraph ----------------------------------- */
  await page.goto(`${BASE}/${locale}/terms`, { waitUntil: "networkidle" });
  const termsParas = await page.locator("main section p").count();
  note(
    `[${locale}] terms carries the data-security paragraph`,
    termsParas >= 3,
    `${termsParas} paragraphs`,
  );

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
const drawerLinks = await mpage.locator("header nav a").allTextContents();
note(
  "[mobile] drawer lists Videos, Events, FAQ and Glossary",
  ["الفيديوهات", "الفعاليات", "الأسئلة الشائعة", "المصطلحات"].every((t) =>
    drawerLinks.some((l) => l.includes(t)),
  ),
  drawerLinks.join(", "),
);
await mobile.close();

await browser.close();

const failed = findings.filter((f) => !f.ok);
console.log(
  `\n${findings.length - failed.length}/${findings.length} checks passed. Screenshots: ${outDir}`,
);
process.exit(failed.length > 0 ? 1 : 0);
