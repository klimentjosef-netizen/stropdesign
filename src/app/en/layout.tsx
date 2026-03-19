import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/LocaleContext";

export const metadata: Metadata = {
  title: "StropDesign | Stretch Ceilings Ostrava",
  description:
    "Designer stretch ceiling solutions in Ostrava and surroundings. Precise installation, wide selection of finishes, and lasting quality.",
  openGraph: {
    title: "StropDesign | Stretch Ceilings Ostrava",
    description:
      "Designer stretch ceiling solutions in Ostrava and surroundings.",
    locale: "en_US",
    type: "website",
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleProvider locale="en">{children}</LocaleProvider>;
}
