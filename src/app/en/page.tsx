import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Surfaces from "@/components/Surfaces";
import Calculator from "@/components/Calculator";
import References from "@/components/References";
import FaqAndTestimonials from "@/components/FaqAndTestimonials";
import ContactSection from "@/components/ContactSection";
import { getSurfaces, getReferences, getAddons, getTestimonials, getFaqs } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Stretch ceilings — designer ceiling solutions across Czechia",
  description:
    "Premium stretch ceilings nationwide. Dust-free 1-day installation, 12-year colour warranty, 200+ projects delivered. Free consultation and tailored quote.",
  alternates: {
    canonical: "/en",
    languages: { cs: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Stretch ceilings — designer ceiling solutions across Czechia",
    description:
      "Premium stretch ceilings nationwide. Dust-free 1-day installation, 12-year colour warranty.",
    url: "https://www.stropdesign.cz/en",
    locale: "en_US",
    type: "website",
    images: ["/images/hero-kitchen.jpg"],
  },
};

export default async function HomeEN() {
  const [surfaces, references, addons, testimonials, faqs] = await Promise.all([
    getSurfaces("en"),
    getReferences("en"),
    getAddons(),
    getTestimonials("en"),
    getFaqs("en"),
  ]);

  return (
    <>
      <Hero />
      <Surfaces surfaces={surfaces} />
      <Calculator surfaces={surfaces} addons={addons} />
      <References references={references} />
      <FaqAndTestimonials testimonials={testimonials} faqs={faqs} />
      <ContactSection />
    </>
  );
}
