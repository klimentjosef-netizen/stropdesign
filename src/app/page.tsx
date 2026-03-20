import Hero from "@/components/Hero";
import References from "@/components/References";
import Calculator from "@/components/Calculator";
import Surfaces from "@/components/Surfaces";
import FaqAndTestimonials from "@/components/FaqAndTestimonials";
import ContactSection from "@/components/ContactSection";
import { getSurfaces, getReferences, getAddons, getTestimonials, getFaqs } from "@/lib/keystatic";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "StropDesign",
  "description": "Montáž napínaných stropů po celé České republice",
  "url": "https://stropdesign.vercel.app",
  "telephone": "+420739457794",
  "email": "info@stropdesign.cz",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ostrava",
    "addressCountry": "CZ",
  },
  "areaServed": { "@type": "Country", "name": "Czech Republic" },
  "priceRange": "600–1200 Kč/m²",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    // TODO: doplnit skutečný počet recenzí z Google
    "reviewCount": "6",
  },
};

export default async function Home() {
  const [surfaces, references, addons, testimonials, faqs] = await Promise.all([
    getSurfaces("cs"),
    getReferences("cs"),
    getAddons(),
    getTestimonials("cs"),
    getFaqs("cs"),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <Surfaces surfaces={surfaces} />
      <Calculator surfaces={surfaces} addons={addons} />
      <References references={references} />
      <FaqAndTestimonials testimonials={testimonials} faqs={faqs} />
      <ContactSection />
    </>
  );
}
