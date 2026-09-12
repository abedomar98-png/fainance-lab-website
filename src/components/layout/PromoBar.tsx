"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icon";
import { localeHref } from "@/lib/utils";

/**
 * Dismissible announcement bar promoting the flagship free resource.
 *
 * No countdown, no fake scarcity. Dismissal is stored in `sessionStorage`, so
 * it stays closed for the rest of the visit and returns on the next one.
 *
 * `sessionStorage` is browser state React doesn't own, so it's read through
 * `useSyncExternalStore` rather than an effect. The server snapshot reports
 * "dismissed", which keeps the server HTML and the first client paint
 * identical; the bar then animates in if the visit hasn't dismissed it.
 */
const STORAGE_KEY = "fainance:promo-dismissed";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private browsing or blocked storage — show the bar rather than fail.
    return false;
  }
}

/** Server has no session — render as dismissed so hydration matches. */
function getServerSnapshot() {
  return true;
}

function dismiss() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Non-fatal: it simply reappears on the next navigation.
  }
  for (const listener of listeners) listener();
}

export function PromoBar() {
  const { dict, locale } = useLocale();
  const dismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const visible = !dismissed;

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden bg-ink text-white"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-2.5 sm:px-8">
            <Link
              href={localeHref(locale, "/resources")}
              className="interactive group flex min-w-0 flex-1 items-center justify-center gap-2 text-center text-[0.82rem] font-semibold hover:text-brand-gold sm:text-sm"
            >
              <span className="truncate">{dict.promo.text}</span>
              <span className="hidden shrink-0 items-center gap-1 text-brand-gold sm:inline-flex">
                {dict.promo.cta}
                <ArrowIcon className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>

            <button
              type="button"
              onClick={dismiss}
              aria-label={dict.promo.dismiss}
              className="interactive -me-1 shrink-0 rounded-chip p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
