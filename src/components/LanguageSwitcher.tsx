"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  // Build the target path for the other language
  let targetPath: string;
  if (isEnglish) {
    // Switch to Czech: strip /en prefix
    targetPath = pathname.slice(3) || "/";
  } else {
    // Switch to English: add /en prefix
    targetPath = `/en${pathname}`;
  }

  const currentLabel = isEnglish ? "EN" : "CZ";
  const targetLabel = isEnglish ? "CZ" : "EN";

  return (
    <Link
      href={targetPath}
      className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/5 transition-all duration-200"
    >
      <span className="text-accent">{currentLabel}</span>
      <span className="text-muted/40">/</span>
      <span className="text-muted">{targetLabel}</span>
    </Link>
  );
}
