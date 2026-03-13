export interface Reference {
  title: string;
  meta: string;
  tag: string;
  gradient: string;
  description?: string;
}

export const references: Reference[] = [
  {
    title: "Rodinný dům Ostrava",
    meta: "Obývací pokoj · 28 m²",
    tag: "Lesklý povrch",
    gradient: "from-[#1a1a2e] to-[#12121f]",
    description:
      "Kompletní stropní řešení pro moderní obývací pokoj. Lesklý povrch opticky zvětšil prostor a dodal místnosti vzdušnost.",
  },
  {
    title: "Kancelářský prostor",
    meta: "Open space · 120 m²",
    tag: "Průsvitný + LED",
    gradient: "from-[#0f1208] to-[#141a0a]",
    description:
      "Průsvitný strop s integrovaným LED podsvícením pro rovnoměrné osvětlení celého open space kancelářského prostoru.",
  },
  {
    title: "Restaurace Frýdek",
    meta: "Hlavní sál · 65 m²",
    tag: "Metalický",
    gradient: "from-[#1a0e08] to-[#120a06]",
    description:
      "Metalický strop v hlavním sálu restaurace. Prémiový dojem, který podtrhuje atmosféru celého prostoru.",
  },
  {
    title: "Bytový komplex",
    meta: "Chodba · 18 m²",
    tag: "Matný + tisk",
    gradient: "from-[#0a1212] to-[#081010]",
    description:
      "Matný strop s vlastním potiskem pro společné prostory bytového komplexu. Odolný a snadno udržovatelný.",
  },
  {
    title: "Wellness centrum",
    meta: "Recepce · 40 m²",
    tag: "Saténový",
    gradient: "from-[#100d1a] to-[#0e0b16]",
    description:
      "Saténový povrch pro recepci wellness centra. Jemný lesk dodává prostoru eleganci a profesionalitu.",
  },
  {
    title: "Prodejna Opava",
    meta: "Prodejní plocha · 55 m²",
    tag: "Vlastní potisk",
    gradient: "from-[#1a1008] to-[#14100a]",
    description:
      "Strop s vlastním potiskem loga a brandingu prodejny. Unikátní řešení pro komerční prostory.",
  },
  {
    title: "Rodinný dům Havířov",
    meta: "Koupelna · 12 m²",
    tag: "Lesklý + LED",
    gradient: "from-[#0d1218] to-[#080d12]",
    description:
      "Lesklý strop s LED bodovými světly v koupelně. Odolnost proti vlhkosti a moderní vzhled.",
  },
  {
    title: "Hotel Ostrava",
    meta: "Lobby · 85 m²",
    tag: "Průsvitný",
    gradient: "from-[#12100d] to-[#0d0b08]",
    description:
      "Průsvitný strop s podsvícením v hotelové lobby. Reprezentativní řešení pro prémiové prostory.",
  },
  {
    title: "Lékařská ordinace",
    meta: "Čekárna · 22 m²",
    tag: "Matný",
    gradient: "from-[#0d0d14] to-[#08080f]",
    description:
      "Matný strop pro čekárnu lékařské ordinace. Čistý a profesionální vzhled s integrovaným osvětlením.",
  },
];
