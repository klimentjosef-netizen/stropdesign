import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AutoLocaleProvider from "@/components/AutoLocaleProvider";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stropdesign.cz"),
  title: {
    default: "StropDesign | Napínané stropy po celé ČR",
    template: "%s | StropDesign",
  },
  description:
    "Designové stropní podhledy formou napínaných stropů po celé České republice. Precizní montáž, široký výběr povrchů a dlouhá životnost.",
  keywords: [
    "napínané stropy",
    "napínané stropy Ostrava",
    "stropní podhledy",
    "napínané stropy cena",
    "StropDesign",
    "Derbau",
  ],
  openGraph: {
    title: "StropDesign | Napínané stropy po celé ČR",
    description:
      "Designové stropní podhledy formou napínaných stropů po celé České republice.",
    locale: "cs_CZ",
    type: "website",
    url: "https://www.stropdesign.cz",
    siteName: "StropDesign",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "StropDesign, napínané stropy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StropDesign | Napínané stropy po celé ČR",
    description:
      "Designové stropní podhledy formou napínaných stropů po celé České republice.",
    images: ["/images/hero-kitchen.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: { cs: "/", en: "/en", "x-default": "/" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Keystatic CMS (/keystatic) gets a bare document: no navbar, footer,
  // chat, cookie banner or tracking over the editor.
  if (headers().get("x-cms") === "1") {
    return (
      <html lang="cs" className={ibmPlex.variable}>
        <body>{children}</body>
      </html>
    );
  }
  const lang = headers().get("x-locale") || "cs";
  const gaId = (process.env.NEXT_PUBLIC_GA_ID || "").trim();
  const adsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "").trim();
  return (
    <html lang={lang} className={ibmPlex.variable}>
      <head>
        {/* Google Consent Mode v2 + gtag init — native inline script so it
            runs verbatim before gtag.js, without next/script transforms. */}
        <script
          dangerouslySetInnerHTML={{
            __html: [
              "window.dataLayer = window.dataLayer || [];",
              "function gtag(){dataLayer.push(arguments);}",
              "window.gtag = gtag;",
              "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});",
              "gtag('set','url_passthrough',true);",
              "gtag('set','ads_data_redaction',true);",
              "gtag('js',new Date());",
              gaId ? `gtag('config','${gaId}');` : "",
              adsId ? `gtag('config','${adsId}');` : "",
            ].join(""),
          }}
        />
      </head>
      <body className="font-body bg-light text-heading">
        <Analytics />
        <AutoLocaleProvider>
          <JsonLd />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AutoLocaleProvider>
        <ChatWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
// rebuild trigger
