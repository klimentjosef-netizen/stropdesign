import { config, fields, collection } from "@keystatic/core";

// Production edits go through GitHub (commit → Vercel redeploy). Enabled by
// NEXT_PUBLIC_KEYSTATIC_STORAGE=github together with the GitHub App vars
// KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET
// and NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG. Without it: local file storage
// (dev only, Vercel's filesystem is read-only).
const isGithubMode = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

const storage = isGithubMode
  ? ({
      kind: "github",
      repo:
        (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`) ??
        "klimentjosef-netizen/stropdesign",
    } as const)
  : ({ kind: "local" } as const);

// The CMS is used by the client, so every label is in Czech and technical
// fields are marked as such. Field keys stay unchanged (the site reads them).
const LANG = { cs: "čeština", en: "angličtina" } as const;
const ORDER_HINT = "Nižší číslo se zobrazí výš.";

// ── Blog ──
function blogCollection(locale: "cs" | "en") {
  return collection({
    label: `Blog (${LANG[locale]})`,
    slugField: "title",
    path: `content/blog-${locale}/*`,
    format: { contentField: "content" },
    entryLayout: "content",
    columns: ["date"],
    schema: {
      title: fields.slug({
        name: { label: "Nadpis článku" },
        slug: {
          label: "Adresa článku",
          description: "Vyplní se sama z nadpisu. Po zveřejnění ji neměňte.",
        },
      }),
      description: fields.text({
        label: "Krátký popis",
        description: "1 až 2 věty. Zobrazí se ve výpisu článků a ve vyhledávání Google.",
        multiline: true,
      }),
      date: fields.date({ label: "Datum zveřejnění", defaultValue: { kind: "today" } }),
      author: fields.text({ label: "Autor", defaultValue: "StropDesign" }),
      image: fields.image({
        label: "Úvodní fotka",
        description: "Ideálně na šířku, alespoň 1600 px.",
        directory: "public/images/blog",
        publicPath: "/images/blog/",
      }),
      tags: fields.array(fields.text({ label: "Štítek" }), {
        label: "Štítky",
        itemLabel: (props) => props.value,
      }),
      content: fields.mdx({ label: "Text článku" }),
    },
  });
}

// Photos live only in the Czech entry (see getReferences in src/lib/keystatic.ts).
function referencePhotos() {
  return {
    image: fields.image({
      label: "Hlavní fotka",
      description: "Zobrazí se na kartě reference.",
      directory: "public/images/references",
      publicPath: "/images/references/",
    }),
    images: fields.array(
      fields.image({
        label: "Fotka",
        directory: "public/images/references",
        publicPath: "/images/references/",
      }),
      {
        label: "Galerie fotek",
        description: "Tlačítkem Přidat nahrajete další fotku. Pořadí změníte přetažením.",
        itemLabel: (props) => props.value?.filename ?? "Fotka",
      }
    ),
  };
}

// ── Reference (realizace) ──
function referencesCollection(locale: "cs" | "en") {
  return collection({
    label: `Reference (${LANG[locale]})`,
    slugField: "title",
    path: `content/references-${locale}/*`,
    format: { data: "json" },
    columns: ["meta", "sortOrder"],
    schema: {
      title: fields.slug({
        name: { label: "Název realizace", description: "Např. Byt ve Frýdku-Místku" },
        slug: {
          label: "Adresa",
          description:
            locale === "cs"
              ? "Vyplní se sama z názvu."
              : "Musí být stejná jako u české verze, podle ní se převezmou fotky.",
        },
      }),
      meta: fields.text({
        label: "Typ a místo",
        description: "Např. Byt · Ostrava nebo Kuchyně · 18 m²",
      }),
      tag: fields.text({
        label: "Použitý povrch",
        description: "Např. Matný + LED pásek",
      }),
      ...(locale === "cs" ? referencePhotos() : {}),
      description: fields.text({ label: "Popis realizace", multiline: true }),
      featured: fields.checkbox({
        label: "Zvýraznit na hlavní stránce",
        defaultValue: false,
      }),
      sortOrder: fields.integer({ label: "Pořadí", description: ORDER_HINT, defaultValue: 0 }),
      gradient: fields.text({
        label: "Barva pozadí karty (technické, neměnit)",
        defaultValue: "from-[#1a1a2e] to-[#12121f]",
      }),
    },
  });
}

// ── Povrchy a ceník kalkulačky ──
function surfacesCollection(locale: "cs" | "en") {
  return collection({
    label: `Povrchy a ceny (${LANG[locale]})`,
    slugField: "name",
    path: `content/surfaces-${locale}/*`,
    format: { data: "json" },
    columns: ["price", "sortOrder"],
    schema: {
      name: fields.slug({
        name: { label: "Název povrchu" },
        slug: { label: "Adresa", description: "Vyplní se sama z názvu." },
      }),
      price: fields.integer({
        label: "Cena za m² (Kč)",
        description: "Číslo, se kterým počítá kalkulačka.",
      }),
      priceLabel: fields.text({
        label: "Cena jako text",
        description: "Jak se cena zobrazí na webu, např. od 600 Kč/m²",
      }),
      description: fields.text({ label: "Popis", multiline: true }),
      features: fields.array(fields.text({ label: "Výhoda" }), {
        label: "Výhody (odrážky)",
        itemLabel: (props) => props.value,
      }),
      image: fields.text({
        label: "Náhled povrchu (technické, neměnit)",
        description: "Cesta k obrázku textury, např. /images/surfaces/matny.svg",
      }),
      sortOrder: fields.integer({ label: "Pořadí", description: ORDER_HINT, defaultValue: 0 }),
      color: fields.text({
        label: "Barva náhledu (technické, kód #RRGGBB)",
        defaultValue: "#E8E8E8",
      }),
      accent: fields.text({
        label: "Doplňková barva (technické, kód #RRGGBB)",
        defaultValue: "#847631",
      }),
    },
  });
}

// ── Časté dotazy ──
function faqCollection(locale: "cs" | "en") {
  return collection({
    label: `Časté dotazy (${LANG[locale]})`,
    slugField: "question",
    path: `content/faq-${locale}/*`,
    format: { data: "json" },
    columns: ["sortOrder"],
    schema: {
      question: fields.slug({
        name: { label: "Otázka" },
        slug: { label: "Adresa", description: "Vyplní se sama z otázky." },
      }),
      answer: fields.text({ label: "Odpověď", multiline: true }),
      sortOrder: fields.integer({ label: "Pořadí", description: ORDER_HINT, defaultValue: 0 }),
    },
  });
}

// ── Recenze zákazníků ──
function testimonialsCollection(locale: "cs" | "en") {
  return collection({
    label: `Recenze (${LANG[locale]})`,
    slugField: "name",
    path: `content/testimonials-${locale}/*`,
    format: { data: "json" },
    columns: ["rating", "sortOrder"],
    schema: {
      name: fields.slug({
        name: { label: "Jméno zákazníka" },
        slug: { label: "Adresa", description: "Vyplní se sama ze jména." },
      }),
      text: fields.text({ label: "Text recenze", multiline: true }),
      rating: fields.integer({
        label: "Počet hvězdiček (1 až 5)",
        defaultValue: 5,
        validation: { min: 1, max: 5 },
      }),
      sortOrder: fields.integer({ label: "Pořadí", description: ORDER_HINT, defaultValue: 0 }),
    },
  });
}

export default config({
  storage,
  locale: "cs-CZ",
  ui: {
    brand: { name: "StropDesign" },
    navigation: {
      "Realizace a recenze": ["referencesCs", "testimonialsCs"],
      Články: ["blogCs"],
      "Ceník kalkulačky": ["surfacesCs", "addons"],
      "Časté dotazy": ["faqCs"],
      "Anglická verze webu": [
        "referencesEn",
        "testimonialsEn",
        "blogEn",
        "surfacesEn",
        "faqEn",
      ],
    },
  },
  collections: {
    blogCs: blogCollection("cs"),
    blogEn: blogCollection("en"),
    referencesCs: referencesCollection("cs"),
    referencesEn: referencesCollection("en"),
    surfacesCs: surfacesCollection("cs"),
    surfacesEn: surfacesCollection("en"),
    faqCs: faqCollection("cs"),
    faqEn: faqCollection("en"),
    testimonialsCs: testimonialsCollection("cs"),
    testimonialsEn: testimonialsCollection("en"),
    addons: collection({
      label: "Doplňky (světla, technika)",
      slugField: "nameCz",
      path: "content/addons/*",
      format: { data: "json" },
      columns: ["price", "category"],
      schema: {
        nameCz: fields.slug({
          name: { label: "Název česky" },
          slug: { label: "Adresa", description: "Vyplní se sama z názvu." },
        }),
        nameEn: fields.text({ label: "Název anglicky" }),
        price: fields.integer({ label: "Cena (Kč)" }),
        unit: fields.select({
          label: "Jednotka",
          options: [
            { label: "Za kus (ks)", value: "ks" },
            { label: "Za běžný metr (bm)", value: "bm" },
          ],
          defaultValue: "ks",
        }),
        category: fields.select({
          label: "Kategorie",
          options: [
            { label: "Osvětlení", value: "lighting" },
            { label: "Technika", value: "tech" },
            { label: "Ostatní", value: "other" },
          ],
          defaultValue: "lighting",
        }),
        icon: fields.text({ label: "Ikona (emoji)", defaultValue: "💡" }),
        sortOrder: fields.integer({ label: "Pořadí", description: ORDER_HINT, defaultValue: 0 }),
      },
    }),
  },
});
