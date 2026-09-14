import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Locale routing.
 *
 * Every page lives under `/[locale]`, so any path without a locale prefix is
 * redirected to one.
 *
 * Arabic-first is a brand decision, not a preference to negotiate: a first
 * visit always opens in Arabic, whatever language the browser is set to. The
 * browser's Accept-Language header is deliberately NOT consulted — most
 * browsers in the region send English, which would open the English site for
 * the majority of first-time visitors. The only thing that overrides Arabic is
 * the visitor's own earlier choice, recorded by the language switcher.
 *
 * (In Next.js 16 this file is `proxy.ts`, not `middleware.ts`.)
 */
function resolveLocale(request: NextRequest) {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  return chosen && isLocale(chosen) ? chosen : defaultLocale;
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
