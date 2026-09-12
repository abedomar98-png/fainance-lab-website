"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

type LocaleContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  /** +1 in LTR, -1 in RTL — multiply any horizontal motion offset by this. */
  flip: 1 | -1;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Makes locale, direction and copy available to Client Components without
 * prop-drilling through every layout. The dictionary is static text that ends
 * up in the HTML regardless, so shipping it to the client costs nothing extra
 * in practice and keeps the header, footer and modals simple.
 */
export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <LocaleContext.Provider
      value={{ locale, dir, flip: dir === "rtl" ? -1 : 1, dict }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
