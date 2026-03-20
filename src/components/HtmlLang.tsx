"use client";

import { useEffect } from "react";

export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "cs";
    };
  }, [lang]);

  return null;
}
