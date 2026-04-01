import { config, fields, collection } from "@keystatic/core";

const isGithubMode =
  process.env.NODE_ENV !== "development" &&
  !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID;

const storage = isGithubMode
  ? ({
      kind: "github",
      repo:
        (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`) ??
        "klimentjosef-netizen/stropdesign",
    } as const)
  : ({ kind: "local" } as const);

// ── Helper: blog collection factory ──
function blogCollection(locale: "cs" | "en") {
  return collection({
    label: `Blog (${locale.toUpperCase()})`,
    slugField: "title",
    path: `content/blog-${locale}/*`,
    format: { contentField: "content" },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      description: fields.text({ label: "Description", multiline: true }),
      date: fields.date({ label: "Date" }),
      author: fields.text({ label: "Author", defaultValue: "StropDesign" }),
      image: fields.image({
        label: "Image",
        directory: "public/images/blog",
        publicPath: "/images/blog/",
      }),
      tags: fields.array(fields.text({ label: "Tag" }), {
        label: "Tags",
        itemLabel: (props) => props.value,
      }),
      content: fields.mdx({ label: "Content" }),
    },
  });
}

// ── Helper: references collection factory ──
function referencesCollection(locale: "cs" | "en") {
  return collection({
    label: `References (${locale.toUpperCase()})`,
    slugField: "title",
    path: `content/references-${locale}/*`,
    format: { data: "json" },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      meta: fields.text({ label: "Meta (e.g. Kitchen · 18 m²)" }),
      tag: fields.text({ label: "Tag (e.g. Matte + LED)" }),
      gradient: fields.text({
        label: "Gradient classes",
        defaultValue: "from-[#1a1a2e] to-[#12121f]",
      }),
      image: fields.image({
        label: "Image",
        directory: "public/images",
        publicPath: "/images/",
      }),
      description: fields.text({ label: "Description", multiline: true }),
      featured: fields.checkbox({ label: "Featured project", defaultValue: false }),
      images: fields.array(
        fields.text({ label: "Image path" }),
        { label: "Gallery images", itemLabel: (props) => props.value }
      ),
      sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
    },
  });
}

// ── Helper: surfaces/products collection factory ──
function surfacesCollection(locale: "cs" | "en") {
  return collection({
    label: `Surfaces / Pricing (${locale.toUpperCase()})`,
    slugField: "name",
    path: `content/surfaces-${locale}/*`,
    format: { data: "json" },
    schema: {
      name: fields.slug({ name: { label: "Name" } }),
      color: fields.text({ label: "Preview color (hex)", defaultValue: "#E8E8E8" }),
      accent: fields.text({ label: "Accent color (hex)", defaultValue: "#847631" }),
      price: fields.integer({ label: "Price (CZK/m²)" }),
      priceLabel: fields.text({ label: "Price label (e.g. od 600 Kč/m²)" }),
      description: fields.text({ label: "Description", multiline: true }),
      features: fields.array(fields.text({ label: "Feature" }), {
        label: "Features",
        itemLabel: (props) => props.value,
      }),
      sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      image: fields.text({ label: "Texture preview image path (e.g. /images/surfaces/matny.svg)" }),
    },
  });
}

// ── Helper: FAQ collection factory ──
function faqCollection(locale: "cs" | "en") {
  return collection({
    label: `FAQ (${locale.toUpperCase()})`,
    slugField: "question",
    path: `content/faq-${locale}/*`,
    format: { data: "json" },
    schema: {
      question: fields.slug({ name: { label: "Question" } }),
      answer: fields.text({ label: "Answer", multiline: true }),
      sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
    },
  });
}

// ── Helper: testimonials collection factory ──
function testimonialsCollection(locale: "cs" | "en") {
  return collection({
    label: `Testimonials (${locale.toUpperCase()})`,
    slugField: "name",
    path: `content/testimonials-${locale}/*`,
    format: { data: "json" },
    schema: {
      name: fields.slug({ name: { label: "Customer name" } }),
      text: fields.text({ label: "Review text", multiline: true }),
      rating: fields.integer({ label: "Rating (1-5)", defaultValue: 5 }),
      sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
    },
  });
}

export default config({
  storage,
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
      label: "Add-ons / Pricing",
      slugField: "nameCz",
      path: "content/addons/*",
      format: { data: "json" },
      schema: {
        nameCz: fields.slug({ name: { label: "Name (CZ)" } }),
        nameEn: fields.text({ label: "Name (EN)" }),
        price: fields.integer({ label: "Price (CZK)" }),
        unit: fields.select({
          label: "Unit",
          options: [
            { label: "Per piece (ks)", value: "ks" },
            { label: "Per running meter (bm)", value: "bm" },
          ],
          defaultValue: "ks",
        }),
        icon: fields.text({ label: "Icon (emoji)", defaultValue: "💡" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Lighting", value: "lighting" },
            { label: "Technology", value: "tech" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "lighting",
        }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      },
    }),
  },
});
