import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import HtmlLang from "@/components/HtmlLang";

export const metadata: Metadata = {
  title: "StropDesign | Stretch Ceilings Czech Republic",
  description:
    "Designer stretch ceiling solutions across the Czech Republic. Precise installation, wide selection of finishes, and lasting quality.",
  openGraph: {
    title: "StropDesign | Stretch Ceilings Czech Republic",
    description:
      "Designer stretch ceiling solutions across the Czech Republic.",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/en",
    languages: { cs: "/", en: "/en" },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale="en">
      <HtmlLang lang="en" />
      {children}
    </LocaleProvider>
  );
}
