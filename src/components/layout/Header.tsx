"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { cn, localeHref } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Header() {
  const { dict, locale } = useLocale();
  const pathname = usePathname() ?? "";
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense the header once the visitor has committed to scrolling.
  useLenis(({ scroll }) => setCondensed(scroll > 24));

  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/courses", label: dict.nav.courses },
    { href: "/resources", label: dict.nav.resources },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contact", label: dict.nav.contact },
  ];

  function isActive(href: string) {
    const full = localeHref(locale, href);
    return href === "/" ? pathname === full : pathname.startsWith(full);
  }

  return (
    <header
      className={cn(
        "interactive sticky top-0 z-50 border-b",
        condensed
          ? "border-neutral-200 bg-white/85 shadow-card backdrop-blur-md"
          : "border-transparent bg-neutral-50",
      )}
    >
      <div
        className={cn(
          "interactive mx-auto flex w-full max-w-6xl items-center gap-4 px-5 sm:px-8",
          condensed ? "h-16" : "h-20",
        )}
      >
        {/* Logo — positioned by direction, but NEVER mirrored. */}
        <Link
          href={localeHref(locale, "/")}
          className="interactive shrink-0 hover:-translate-y-[2px]"
          aria-label={site.name}
        >
          <Image
            src={site.logos.horizontalTransparent}
            alt={site.name}
            width={1429}
            height={384}
            priority
            className={cn(
              "interactive w-auto object-contain",
              condensed ? "h-8" : "h-10",
            )}
          />
        </Link>

        <nav
          aria-label={dict.nav.home}
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localeHref(locale, item.href)}
              className={cn(
                "interactive relative rounded-pill px-3.5 py-2 text-[0.9rem] font-semibold",
                isActive(item.href)
                  ? "text-brand-blue-deep"
                  : "text-neutral-600 hover:text-ink",
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-pill bg-brand-gold"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={dict.nav.instagram}
            className="interactive hidden rounded-chip p-2 text-neutral-500 hover:-translate-y-[2px] hover:bg-neutral-100 hover:text-brand-blue-deep sm:inline-flex"
          >
            <InstagramIcon className="size-5" />
          </a>

          <LanguageSwitcher className="hidden sm:inline-flex" />

          {/* Primary CTA. A second CTA (e.g. "Join Waitlist") lands beside
              this one in Phase 2 — the row is sized to take it. */}
          <Button
            href={localeHref(locale, "/resources")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.nav.primaryCta}
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
            className="interactive rounded-chip p-2 text-ink hover:bg-neutral-100 lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-neutral-200 bg-white lg:hidden"
          >
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  // Dismiss the drawer on tap rather than reacting to the
                  // route change in an effect.
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "interactive rounded-chip px-3 py-2.5 text-base font-semibold",
                    isActive(item.href)
                      ? "bg-brand-blue/8 text-brand-blue-deep"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-4">
                <Button
                  href={localeHref(locale, "/resources")}
                  size="sm"
                  className="flex-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {dict.nav.primaryCta}
                </Button>
                <LanguageSwitcher />
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={dict.nav.instagram}
                  className="interactive rounded-chip p-2 text-neutral-500 hover:bg-neutral-100 hover:text-brand-blue-deep"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
