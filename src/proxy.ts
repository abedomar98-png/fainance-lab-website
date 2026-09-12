import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/i18n/config";

/**
 * Locale routing.
 *
 * Every page lives under `/[locale]`, so any path without a locale prefix is
 * redirected to one. Arabic is the default; English is only chosen when the
 * browser clearly asks for it, since Arabic-first is a brand decision rather
 * than a preference to be negotiated.
 *
 * (In Next.js 16 this file is `proxy.ts`, not `middleware.ts`.)
 */
function resolveLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // Parse "en-GB,en;q=0.9,ar;q=0.8" into tags ordered by quality.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("ar")) return "ar";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API routes, and anything with a file extension
  // (assets in /public).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
