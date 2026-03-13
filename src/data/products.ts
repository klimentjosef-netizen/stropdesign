export interface Surface {
  name: string;
  slug: string;
  color: string;
  accent: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
}

export const surfaces: Surface[] = [
  {
    name: "Matný",
    slug: "matny",
    color: "#E8E8E8",
    accent: "#C5A55A",
    price: 600,
    priceLabel: "od 600 Kč/m²",
    description:
      "Tradiční vzhled dokonale natřeného povrchu. Matný strop nepřitahuje pozornost, ale dodává místnosti čistý a klidný pocit. Žádné odlesky, žádné odrazy. Ideální do ložnic, kanceláří i obývacích pokojů.",
    features: [
      "Bez odlesků a odrazů",
      "Snadná údržba",
      "Vhodný do všech prostor",
    ],
  },
  {
    name: "Saténový",
    slug: "satenovy",
    color: "#E0E0EA",
    accent: "#5B8DEF",
    price: 680,
    priceLabel: "od 680 Kč/m²",
    description:
      "Širší volba jemných pastelových tónů s hedvábným leskem. Kombinuje výhody matného a lesklého provedení. Perleťový efekt dodává prostoru hloubku a eleganci bez přílišné dramatičnosti.",
    features: [
      "Jemný perleťový lesk",
      "Široká paleta pastelových tónů",
      "Oblíbený do obýváků a ložnic",
    ],
  },
  {
    name: "Lesklý",
    slug: "leskly",
    color: "#EDE8D8",
    accent: "#C9A84C",
    price: 750,
    priceLabel: "od 750 Kč/m²",
    description:
      "Zrcadlový efekt pro vizuální zvětšení prostoru. Vysoce lesklý povrch odráží světlo i interiér a opticky zdvojnásobuje výšku místnosti. Tmavé odstíny odrážejí až 90 % světla.",
    features: [
      "Zrcadlový odraz až 90 %",
      "Optické zvětšení prostoru",
      "Moderní luxusní vzhled",
    ],
  },
  {
    name: "Metalický",
    slug: "metalicky",
    color: "#D8D8D8",
    accent: "#C0C0C0",
    price: 820,
    priceLabel: "od 820 Kč/m²",
    description:
      "Kovový vzhled pro moderní interiéry. Metalický povrch simuluje broušený nebo leštěný kov v odstínech stříbra, zlata i mědi. Prémiový industriální styl bez hmotnosti skutečného kovu.",
    features: [
      "Efekt broušeného kovu",
      "Odstíny stříbra, zlata, mědi",
      "Prémiový industriální styl",
    ],
  },
  {
    name: "Průsvitný",
    slug: "prusvitny",
    color: "#E0E0F0",
    accent: "#7B68EE",
    price: 900,
    priceLabel: "od 900 Kč/m²",
    description:
      "Jedinečný světelný efekt s jemným rozptylem světla. Průsvitná fólie propouští LED podsvícení umístěné za stropem a promění celý strop v jeden rovnoměrný světelný zdroj. Žádná viditelná svítidla.",
    features: [
      "Celý strop jako světelný zdroj",
      "Rovnoměrný rozptyl světla",
      "Možnost RGB pro změnu barev",
    ],
  },
  {
    name: "Vlastní tisk",
    slug: "vlastni-tisk",
    color: "#EAE0EA",
    accent: "#FF6B9D",
    price: 1200,
    priceLabel: "od 1 200 Kč/m²",
    description:
      "Originální designový prvek s kvalitou materiálu a jednoduchou instalací. Fotografie, vzory nebo grafika v HD rozlišení přímo na stropě. Oblíbené motivy: obloha, hvězdná noc, příroda i firemní branding.",
    features: [
      "HD tisk libovolného motivu",
      "UV odolné barvy",
      "Kombinace s podsvícením pro lightbox efekt",
    ],
  },
  {
    name: "Perforovaný",
    slug: "perforovany",
    color: "#E5E5E0",
    accent: "#E67E22",
    price: 950,
    priceLabel: "od 950 Kč/m²",
    description:
      "Atypický dekorativní vzhled do prostoru. Perforovaná fólie s přesně řezanými otvory vytváří vizuální hru světla a stínu. Dvouvrstvý systém s kontrastní spodní vrstvou dodává 3D hloubku.",
    features: [
      "Dekorativní vzory otvorů",
      "Efekt hvězdné oblohy s podsvícením",
      "Dvouvrstvý systém pro 3D efekt",
    ],
  },
  {
    name: "Akustický",
    slug: "akusticky",
    color: "#E0E8E8",
    accent: "#3498DB",
    price: 1100,
    priceLabel: "od 1 100 Kč/m²",
    description:
      "Fólie s mikroskopickými otvory (0,1-0,5 mm), které efektivně pohlcují zvuk. Vizuálně nerozeznatelný od matného povrchu, ale výrazně zlepšuje akustiku prostoru. Snižuje ozvěnu a dobu dozvuku.",
    features: [
      "Pohlcování zvuku bez viditelných panelů",
      "Čistý vzhled jako matný povrch",
      "Ideální pro kanceláře, restaurace a kina",
    ],
  },
];
