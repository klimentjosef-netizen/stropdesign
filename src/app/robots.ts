import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/keystatic/", "/en/keystatic/"],
      },
    ],
    sitemap: "https://www.stropdesign.cz/sitemap.xml",
    host: "https://www.stropdesign.cz",
  };
}
