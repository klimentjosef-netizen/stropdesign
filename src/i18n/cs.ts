const cs = {
  nav: {
    about: "O nás",
    services: "Co nabízíme",
    process: "Jak to funguje",
    references: "Reference",
    blog: "Blog",
    contact: "Kontakt",
    cta: "Poptávka zdarma",
  },
  hero: {
    title1: "Napínané stropy,",
    title2: "které promění",
    title3: "váš interiér",
    eyebrow: "Realizujeme v celé ČR",
    subtitle:
      "Rychlá instalace bez prachu a nepořádku. Hladký bezešvý povrch, který nepraská a nepotřebuje údržbu.",
    cta: "Spočítat cenu",
    ctaSecondary: "Prohlédnout reference",
    scroll: "Prohlédnout",
    stat1: "150+",
    stat1Label: "realizací",
    stat2: "5.0",
    stat2Label: "Google hodnocení",
    stat3: "12 let",
    stat3Label: "záruka na barvu",
  },
  about: {
    eyebrow: "O nás",
    title: "Proč StropDesign?",
    features: [
      "Rychlá a čistá montáž bez prachu",
      "12 let záruka na barevnou stálost",
      "Stovky barev a povrchů na výběr",
      "Vodotěsné řešení pro vlhké prostory",
      "Integrované LED osvětlení",
      "Individuální přístup ke každému projektu",
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    title1: "Udělejte první krok",
    title2: "k dokonalému stropu.",
    subtitle:
      "Zavolejte nám nebo vyplňte formulář. Odpovídáme do 24 hodin a nabídku připravíme přesně na míru vašeho projektu.",
    name: "Jméno a příjmení",
    phone: "Telefon",
    room: "Typ místnosti a přibližná plocha",
    message: "Zpráva (nepovinné)",
    submit: "Odeslat poptávku",
    sending: "Odesílám…",
    success: "Děkujeme za poptávku!",
    successSub: "Ozveme se vám do 24 hodin s nabídkou na míru.",
    area: "Celá Česká republika",
  },
  testimonials: {
    eyebrow: "Hodnocení",
    title: "Co říkají naši zákazníci",
    googleRating: "Google hodnocení",
    projects: "Realizací",
    satisfaction: "Spokojených klientů",
    warranty: "Záruka na barvu",
  },
  references: {
    eyebrow: "Reference",
    title: "Realizace, na které jsme hrdí",
    showAll: "Zobrazit vše",
    heroTitle1: "Realizace, na které",
    heroTitle2: "jsme",
    heroTitle3: "hrdí",
    heroSubtitle:
      "Každý projekt je originál. Podívejte se na naše dokončené realizace po celé ČR. Klikněte na fotku pro zvětšení.",
    ctaTitle: "Chcete podobný výsledek?",
    ctaSubtitle:
      "Každý strop děláme na míru. Ozvěte se a společně najdeme řešení pro váš prostor.",
    ctaButton: "Nezávazná poptávka",
  },
  blog: {
    eyebrow: "Blog",
    title: "Novinky a",
    titleAccent: "inspirace",
    subtitle:
      "Praktické rady, trendy v interiérovém designu a vše, co potřebujete vědět o napínaných stropech.",
    empty: "Články se připravují. Navštivte nás znovu brzy!",
    back: "Zpět na blog",
    ctaTitle: "Zaujal vás napínaný strop?",
    ctaSubtitle:
      "Ozvěte se nám pro nezávaznou konzultaci a cenovou nabídku na míru.",
    ctaButton: "Nezávazná poptávka",
  },
  footer: {
    description:
      "Designové stropní podhledy formou napínaných stropů po celé České republice.",
    navigation: "Navigace",
    contact: "Kontakt",
    startToday: "Začněte ještě dnes",
    startTodaySub: "Nezávazná poptávka zdarma. Odpovídáme do 24 hodin.",
    ctaButton: "Nezávazná poptávka",
    copyright: "StropDesign / Derbau s.r.o. Ostrava",
    madeBy: "Web vytvořil",
  },
};

export default cs;

// Rekurzivní typ, který převede readonly literály na string
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends readonly string[]
    ? string[]
    : T[K] extends string
      ? string
      : T[K] extends object
        ? DeepStringify<T[K]>
        : T[K];
};

export type Dictionary = DeepStringify<typeof cs>;
