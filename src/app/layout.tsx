import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AutoLocaleProvider from "@/components/AutoLocaleProvider";
import ChatWidget from "@/components/ChatWidget";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "StropDesign | Napínané stropy",
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
    title: "StropDesign | Napínané stropy",
    description:
      "Designové stropní podhledy formou napínaných stropů po celé České republice.",
    locale: "cs_CZ",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: { cs: "/", en: "/en" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-light text-heading">
        <AutoLocaleProvider>
          <JsonLd />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AutoLocaleProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
