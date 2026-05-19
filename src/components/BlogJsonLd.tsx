interface Props {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  locale: "cs" | "en";
}

const BASE = "https://www.stropdesign.cz";

export default function BlogJsonLd({
  slug,
  title,
  description,
  date,
  author,
  image,
  tags,
  locale,
}: Props) {
  const blogPath = locale === "en" ? `/en/blog/${slug}` : `/blog/${slug}`;
  const blogListPath = locale === "en" ? "/en/blog" : "/blog";
  const homePath = locale === "en" ? "/en" : "/";
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${BASE}${image}`
    : `${BASE}/images/hero-kitchen.jpg`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${blogPath}` },
    headline: title,
    description,
    image: [ogImage],
    datePublished: date,
    dateModified: date,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "StropDesign",
      logo: { "@type": "ImageObject", url: `${BASE}/images/logo.png` },
    },
    keywords: tags.join(", "),
    inLanguage: locale === "en" ? "en" : "cs",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "Domů",
        item: `${BASE}${homePath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE}${blogListPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${BASE}${blogPath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
