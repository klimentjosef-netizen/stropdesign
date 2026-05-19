import type { Metadata } from "next";
import Hero from "@/components/Hero";
import References from "@/components/References";
import Calculator from "@/components/Calculator";
import Surfaces from "@/components/Surfaces";
import FaqAndTestimonials from "@/components/FaqAndTestimonials";
import ContactSection from "@/components/ContactSection";
import { getSurfaces, getReferences, getAddons, getTestimonials, getFaqs } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Napínané stropy — designové stropní podhledy po celé ČR",
  description:
    "Napínané stropy po celé ČR. Bezprašná montáž za 1 den, 12 let záruka, 200+ realizací. Nezávazná poptávka s ocenou na míru.",
  alternates: {
    canonical: "/",
    languages: { cs: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Napínané stropy — designové stropní podhledy po celé ČR",
    description:
      "Napínané stropy po celé ČR. Bezprašná montáž za 1 den, 12 let záruka, 200+ realizací.",
    url: "https://www.stropdesign.cz",
    locale: "cs_CZ",
    type: "website",
    images: ["/images/hero-kitchen.jpg"],
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
      <Hero />
      <Surfaces surfaces={surfaces} />
      <Calculator surfaces={surfaces} addons={addons} />
      <References references={references} />
      <FaqAndTestimonials testimonials={testimonials} faqs={faqs} />
      <ContactSection />
    </>
  );
}
