"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./cs";
import cs from "./cs";
import en from "./en";

type Locale = "cs" | "en";

const dictionaries: Record<Locale, Dictionary> = { cs, en };

const LocaleContext = createContext<Locale>("cs");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDict(): Dictionary {
  const locale = useContext(LocaleContext);
  return dictionaries[locale];
}

export function useLocalePath(path: string): string {
  const locale = useContext(LocaleContext);
  if (locale === "en") return `/en${path}`;
  return path;
}
