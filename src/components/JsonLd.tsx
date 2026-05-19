export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": "https://www.stropdesign.cz/#business",
    name: "StropDesign",
    alternateName: "Derbau s.r.o.",
    description:
      "Designové stropní podhledy formou napínaných stropů po celé České republice. Precizní montáž, široký výběr povrchů a dlouhá životnost.",
    url: "https://www.stropdesign.cz",
    telephone: "+420739457794",
    email: "info@stropdesign.cz",
    image: "https://www.stropdesign.cz/images/hero-kitchen.jpg",
    logo: "https://www.stropdesign.cz/images/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ostrava",
      addressRegion: "Moravskoslezský kraj",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.8209,
      longitude: 18.2625,
    },
    areaServed: {
      "@type": "Country",
      name: "Czech Republic",
    },
    priceRange: "600–1200 Kč/m²",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "6",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61582534764580",
      "https://www.instagram.com/strop_design/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
