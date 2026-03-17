import type { Locale } from "./config";
import type { Dictionary } from "./cs";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  cs: () => import("./cs").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
