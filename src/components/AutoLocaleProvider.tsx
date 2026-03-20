"use client";

import { usePathname } from "next/navigation";
import { LocaleProvider } from "@/i18n/LocaleContext";

export default function AutoLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "cs";

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
