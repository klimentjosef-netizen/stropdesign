import Hero from "@/components/Hero";
import Surfaces from "@/components/Surfaces";
import Calculator from "@/components/Calculator";
import References from "@/components/References";
import FaqAndTestimonials from "@/components/FaqAndTestimonials";
import ContactSection from "@/components/ContactSection";
import { getSurfaces, getReferences, getAddons, getTestimonials, getFaqs } from "@/lib/keystatic";

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
