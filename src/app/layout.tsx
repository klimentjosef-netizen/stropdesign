import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

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
  title: "StropDesign | Napínané stropy Ostrava",
  description:
    "Designové stropní podhledy formou napínaných stropů v Ostravě a okolí. Precizní montáž, široký výběr povrchů a dlouhá životnost.",
  keywords: [
    "napínané stropy",
    "napínané stropy Ostrava",
    "stropní podhledy",
    "napínané stropy cena",
    "StropDesign",
    "Derbau",
  ],
  openGraph: {
    title: "StropDesign | Napínané stropy Ostrava",
    description:
      "Designové stropní podhledy formou napínaných stropů v Ostravě a okolí.",
    locale: "cs_CZ",
    type: "website",
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
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
