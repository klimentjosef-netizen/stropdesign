"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const languages = [
  { code: "cs", label: "CZ", flag: "🇨🇿" },
  { code: "en", label: "EN", flag: "🇬🇧" },
] as const;

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // Determine current locale from pathname
  const isEnglish = pathname.startsWith("/en");
  const currentLocale = isEnglish ? "en" : "cs";

  function getPathForLocale(targetLocale: string) {
    // Strip current locale prefix if present
    let cleanPath = pathname;
    if (pathname.startsWith("/en")) {
      cleanPath = pathname.slice(3) || "/";
    }

    // For Czech (default), no prefix needed
    if (targetLocale === "cs") return cleanPath;

    // For English, add /en prefix
    return `/en${cleanPath}`;
  }

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={getPathForLocale(lang.code)}
          className={`text-[11px] font-medium tracking-wide px-2 py-1 transition-colors duration-200 ${
            currentLocale === lang.code
              ? "text-accent"
              : "text-muted hover:text-heading"
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
