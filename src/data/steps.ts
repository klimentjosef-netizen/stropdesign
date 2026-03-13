export interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Konzultace a zaměření",
    description:
      "Ozvěte se nám a domluvíme si nezávaznou schůzku. Přijedeme k vám, zaměříme místnost a projdeme možnosti povrchů, barev a osvětlení. Na základě toho připravíme přesnou nabídku s fixní cenou.",
    details: [
      "Bezplatná konzultace",
      "Zaměření místnosti na místě",
      "Výběr povrchu a barvy",
      "Přesná cenová nabídka do 24 hodin",
    ],
  },
  {
    number: "02",
    title: "Výroba a příprava",
    description:
      "Strop vyrobíme přesně na míru vaší místnosti. Materiál připravíme ve výrobě a na montáž přijedeme s kompletním vybavením. Nemusíte nic stěhovat ani připravovat.",
    details: [
      "Výroba na míru",
      "Příprava montážních profilů",
      "Koordinace termínu montáže",
      "Bez nutnosti přípravy z vaší strany",
    ],
  },
  {
    number: "03",
    title: "Montáž a předání",
    description:
      "Montáž trvá zpravidla jeden den. Pracujeme čistě, bez prachu a nepořádku. Po dokončení prostor uklidíme a předáme hotový strop připravený k užívání.",
    details: [
      "Montáž za 1 den",
      "Čistá práce bez prachu",
      "Instalace osvětlení",
      "Úklid a předání",
    ],
  },
];
