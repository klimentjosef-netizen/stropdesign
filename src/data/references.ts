export interface Reference {
  title: string;
  meta: string;
  tag: string;
  gradient: string;
  image?: string;
  description?: string;
  featured?: boolean;
}

export const references: Reference[] = [
  {
    title: "HHSpa — hvězdná obloha",
    meta: "Wellness · kompletní stropy",
    tag: "Hvězdná obloha + LED",
    gradient: "from-[#0a0a1a] to-[#050510]",
    description:
      "Kompletní stropy s hvězdnou oblohou a podsvícením pro wellness centrum HHSpa. Unikátní atmosféra, která přenáší hosty pod noční oblohu.",
    featured: true,
  },
  {
    title: "Makronkárna Ostrava",
    meta: "Kavárna · atypické tvary",
    tag: "Vlastní tisk + podsvícení",
    gradient: "from-[#1a0e14] to-[#120a0e]",
    description:
      "Atypické tvary stropu s potiskem a LED podsvícením. Originální design, který podtrhuje jedinečný koncept kavárny.",
    featured: true,
  },
  {
    title: "Smuteční síň Slavkov u Opavy",
    meta: "Veřejný prostor · dvouúrovňový strop",
    tag: "Dvouúrovňový + LED",
    gradient: "from-[#0d0d12] to-[#08080d]",
    description:
      "Dvouúrovňový strop s LED podsvícením pro důstojný a klidný prostor smuteční síně. Citlivé řešení s důrazem na atmosféru.",
    featured: true,
  },
  {
    title: "Moderní kuchyně s LED",
    meta: "Kuchyně · 18 m²",
    tag: "Matný + LED",
    gradient: "from-[#1a1a2e] to-[#12121f]",
    image: "/images/ref-kitchen-led.jpg",
    description:
      "Matný strop s integrovaným LED páskem v moderní kuchyni. Čistý design a funkční osvětlení pracovní plochy.",
  },
  {
    title: "Designové LED linie",
    meta: "Chodba · 22 m²",
    tag: "Matný + LED linie",
    gradient: "from-[#0f1208] to-[#141a0a]",
    image: "/images/ref-hallway-led.jpg",
    description:
      "Geometrické LED linie v chodbě vytvářejí moderní industriální atmosféru. Napínaný strop s integrovaným osvětlením.",
  },
  {
    title: "Strop s vlastním tiskem",
    meta: "Koupelna · 8 m²",
    tag: "Vlastní tisk + podsvícení",
    gradient: "from-[#1a0e08] to-[#120a06]",
    image: "/images/ref-bathroom-sky.jpg",
    description:
      "Průsvitný strop s potiskem oblohy v koupelně. Vodotěsné řešení, které přináší pocit otevřeného prostoru.",
  },
  {
    title: "Průsvitný strop se zlatým vzorem",
    meta: "Hala · 15 m²",
    tag: "Průsvitný + tisk",
    gradient: "from-[#0a1212] to-[#081010]",
    image: "/images/ref-print-gold.jpg",
    description:
      "Průsvitný strop s designovým potiskem zlatých vln a LED podsvícením. Luxusní prvek v reprezentativním prostoru.",
  },
  {
    title: "LED kosočtverec v ložnici",
    meta: "Ložnice · 20 m²",
    tag: "Matný + LED design",
    gradient: "from-[#100d1a] to-[#0e0b16]",
    image: "/images/led-design-pattern.jpg",
    description:
      "Kreativní LED vzor z překrývajících se kosočtverců. Unikátní řešení, které slouží jako hlavní osvětlení i designový prvek.",
  },
  {
    title: "Rodinný dům Ostrava",
    meta: "Obývací pokoj · 28 m²",
    tag: "Lesklý povrch",
    gradient: "from-[#1a1008] to-[#14100a]",
    image: "/images/ref-kitchen-modern.jpg",
    description:
      "Kompletní stropní řešení pro moderní obývací pokoj. Lesklý povrch opticky zvětšil prostor a dodal místnosti vzdušnost.",
  },
  {
    title: "Wellness centrum",
    meta: "Recepce · 40 m²",
    tag: "Saténový",
    gradient: "from-[#0d1218] to-[#080d12]",
    image: "/images/ref-print-abstract.jpg",
    description:
      "Saténový povrch pro recepci wellness centra. Jemný lesk dodává prostoru eleganci a profesionalitu.",
  },
  {
    title: "Hotel Ostrava",
    meta: "Lobby · 85 m²",
    tag: "Průsvitný",
    gradient: "from-[#12100d] to-[#0d0b08]",
    image: "/images/ref-hallway-lines.jpg",
    description:
      "Průsvitný strop s podsvícením v hotelové lobby. Reprezentativní řešení pro prémiové prostory.",
  },
  {
    title: "Lékařská ordinace",
    meta: "Čekárna · 22 m²",
    tag: "Matný",
    gradient: "from-[#0d0d14] to-[#08080f]",
    image: "/images/ref-bedroom-rect.jpg",
    description:
      "Matný strop pro čekárnu lékařské ordinace. Čistý a profesionální vzhled s integrovaným osvětlením.",
  },
];
