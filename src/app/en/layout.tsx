import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StropDesign | Stretch Ceilings Czech Republic",
  description:
    "Designer stretch ceiling solutions across the Czech Republic. Precise installation, wide selection of finishes, and lasting quality.",
  openGraph: {
    title: "StropDesign | Stretch Ceilings Czech Republic",
    description: "Designer stretch ceiling solutions across the Czech Republic.",
    locale: "en_US",
    type: "website",
    url: "https://www.stropdesign.cz/en",
    siteName: "StropDesign",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "StropDesign – stretch ceilings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StropDesign | Stretch Ceilings Czech Republic",
    description: "Designer stretch ceiling solutions across the Czech Republic.",
    images: ["/images/hero-kitchen.jpg"],
  },
  alternates: {
    canonical: "/en",
    languages: { cs: "/", en: "/en", "x-default": "/" },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
