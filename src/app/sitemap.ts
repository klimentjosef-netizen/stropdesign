import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE = "https://www.stropdesign.cz";

const STATIC_ROUTES = [
  "",
  "/o-nas",
  "/sluzby",
  "/postup",
  "/reference",
  "/kontakt",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((r) => [
    {
      url: `${BASE}${r}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: r === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          cs: `${BASE}${r}`,
          en: `${BASE}/en${r}`,
          "x-default": `${BASE}${r}`,
        },
      },
    },
    {
      url: `${BASE}/en${r}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          cs: `${BASE}${r}`,
          en: `${BASE}/en${r}`,
          "x-default": `${BASE}${r}`,
        },
      },
    },
  ]);

  const csSlugs = getAllSlugs("cs");
  const enSlugs = getAllSlugs("en");

  const csPosts: MetadataRoute.Sitemap = csSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        cs: `${BASE}/blog/${slug}`,
        ...(enSlugs.includes(slug) ? { en: `${BASE}/en/blog/${slug}` } : {}),
        "x-default": `${BASE}/blog/${slug}`,
      },
    },
  }));

  const enPosts: MetadataRoute.Sitemap = enSlugs.map((slug) => ({
    url: `${BASE}/en/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        ...(csSlugs.includes(slug) ? { cs: `${BASE}/blog/${slug}` } : {}),
        en: `${BASE}/en/blog/${slug}`,
        "x-default": csSlugs.includes(slug)
          ? `${BASE}/blog/${slug}`
          : `${BASE}/en/blog/${slug}`,
      },
    },
  }));

  return [...staticEntries, ...csPosts, ...enPosts];
}
