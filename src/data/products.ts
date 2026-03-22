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
    accent: "#847631",
    price: 800,
    priceLabel: "od 800 Kč/m²",
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
    price: 800,
    priceLabel: "od 800 Kč/m²",
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
    price: 900,
    priceLabel: "od 900 Kč/m²",
    description:
      "Lesklý povrch odráží světlo i interiér a opticky zvětšuje výšku místnosti. Elegantní volba pro moderní prostory.",
    features: [
      "Odraz světla a prostoru",
      "Optické zvětšení místnosti",
      "Moderní luxusní vzhled",
    ],
  },
  {
    name: "Metalický",
    slug: "metalicky",
    color: "#D8D8D8",
    accent: "#C0C0C0",
    price: 900,
    priceLabel: "od 900 Kč/m²",
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
    priceLabel: "od 900 Kč/m² (1 800 Kč/m² s ochrannou fólií)",
    description:
      "Jedinečný světelný efekt s jemným rozptylem světla. Průsvitná fólie propouští LED podsvícení umístěné za stropem a promění celý strop v jeden rovnoměrný světelný zdroj. Většinou se realizuje se dvěma stropy (průsvitný + čirá ochranná fólie).",
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
    price: 1130,
    priceLabel: "od 1 130 Kč/m² (800 povrch + 330 tisk)",
    description:
      "Originální designový prvek. Fotografie, vzory nebo grafika v HD rozlišení přímo na stropě. Tisk je doplněk k libovolnému typu povrchu. Oblíbené motivy: obloha, hvězdná noc, příroda i firemní branding.",
    features: [
      "HD tisk libovolného motivu",
      "UV odolné barvy",
      "Lze tisknout na všechny druhy povrchů",
    ],
  },
  {
    name: "Perforovaný",
    slug: "perforovany",
    color: "#E5E5E0",
    accent: "#E67E22",
    price: 2000,
    priceLabel: "od 2 000 Kč/m² (individuální nacenění)",
    description:
      "Atypický dekorativní vzhled do prostoru. Perforovaná fólie s přesně řezanými otvory vytváří vizuální hru světla a stínu. Dvouvrstvý systém s kontrastní spodní vrstvou dodává 3D hloubku. Cena závisí na počtu a velikosti výřezů.",
    features: [
      "Dekorativní vzory otvorů",
      "Efekt hvězdné oblohy s podsvícením",
      "Cena dle individuální kalkulace",
    ],
  },
  {
    name: "Akustický",
    slug: "akusticky",
    color: "#E0E8E8",
    accent: "#3498DB",
    price: 1200,
    priceLabel: "od 1 200 Kč/m²",
    description:
      "Fólie s mikroskopickými otvory (0,3 mm), které efektivně pohlcují zvuk. Vizuálně nerozeznatelný od matného povrchu, ale výrazně zlepšuje akustiku prostoru. Snižuje ozvěnu a dobu dozvuku.",
    features: [
      "Pohlcování zvuku bez viditelných panelů",
      "Čistý vzhled jako matný povrch",
      "Ideální pro kanceláře, restaurace a kina",
    ],
  },
  {
    name: "Zrcadlový",
    slug: "zrcadlovy",
    color: "#D0D0E0",
    accent: "#8888CC",
    price: 2300,
    priceLabel: "od 2 300 Kč/m²",
    description:
      "Vysoce lesklý povrch s efektem zrcadla, který opticky zvětšuje prostor a dodává interiéru výrazný, moderní vzhled. Odráží světlo i okolní prvky, čímž vytváří pocit vzdušnosti a luxusu.",
    features: [
      "Dokonalý zrcadlový efekt",
      "Optické zvětšení prostoru",
      "Ideální pro moderní a designové interiéry",
    ],
  },
  {
    name: "Protipožární",
    slug: "protipozarni",
    color: "#F0E0E0",
    accent: "#CC4444",
    price: 1000,
    priceLabel: "od 1 000 Kč/m²",
    description:
      "Protipožární napínaný strop s certifikací. Dostupný v matné, lesklé, saténové i průsvitné variantě. Splňuje požární předpisy pro komerční i veřejné prostory.",
    features: [
      "Certifikovaná požární odolnost",
      "Dostupný ve 4 variantách povrchu",
      "Vhodný pro komerční a veřejné prostory",
    ],
  },
];
