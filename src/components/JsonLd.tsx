export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "StropDesign",
    alternateName: "Derbau s.r.o.",
    description:
      "Designové stropní podhledy formou napínaných stropů v Ostravě a okolí. Precizní montáž, široký výběr povrchů a dlouhá životnost.",
    url: "https://www.stropdesign.cz",
    telephone: "+420739457794",
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
    areaServed: [
      { "@type": "City", name: "Ostrava" },
      { "@type": "City", name: "Frýdek-Místek" },
      { "@type": "City", name: "Opava" },
      { "@type": "City", name: "Havířov" },
      { "@type": "City", name: "Karviná" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "200",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-18:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
