"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/components/providers/LocaleProvider";
import { InstagramIcon, MailIcon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { formatNumber, localeHref } from "@/lib/utils";

export function Footer() {
  const { dict, locale } = useLocale();
  const year = formatNumber(new Date().getFullYear(), locale);

  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/courses", label: dict.nav.courses },
    { href: "/resources", label: dict.nav.resources },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <footer className="bg-ink text-neutral-300">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href={localeHref(locale, "/")}
              aria-label={site.name}
              className="interactive w-fit hover:-translate-y-[2px]"
            >
              <Image
                src={site.logos.primaryStacked}
                alt={site.name}
                width={776}
                height={616}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Navigate */}
          <nav className="flex flex-col gap-3">
            <h2 className="font-mono text-[0.7rem] tracking-[0.16em] text-brand-gold uppercase">
              {dict.footer.navTitle}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localeHref(locale, item.href)}
                    className="interactive text-sm text-neutral-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect + legal */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[0.7rem] tracking-[0.16em] text-brand-gold uppercase">
                {dict.footer.connectTitle}
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="interactive flex items-center gap-2 text-sm break-all text-neutral-300 hover:text-white"
              >
                <MailIcon className="size-4 shrink-0" />
                <span dir="ltr">{site.email}</span>
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="interactive flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
              >
                <InstagramIcon className="size-4 shrink-0" />
                <span dir="ltr">{site.instagramHandle}</span>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[0.7rem] tracking-[0.16em] text-brand-gold uppercase">
                {dict.footer.legalTitle}
              </h2>
              <Link
                href={localeHref(locale, "/privacy")}
                className="interactive text-sm text-neutral-300 hover:text-white"
              >
                {dict.footer.privacy}
              </Link>
              <Link
                href={localeHref(locale, "/terms")}
                className="interactive text-sm text-neutral-300 hover:text-white"
              >
                {dict.footer.terms}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="font-mono">{dict.footer.builtIn}</p>
        </div>
      </div>
    </footer>
  );
}
