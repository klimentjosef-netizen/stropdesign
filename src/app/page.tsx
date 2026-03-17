import Hero from "@/components/Hero";
import About from "@/components/About";
import Surfaces from "@/components/Surfaces";
import Calculator from "@/components/Calculator";
import References from "@/components/References";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Surfaces />
      <Calculator />
      <References />
      <Testimonials />
      <Faq />
      <ContactSection />
    </>
  );
}
