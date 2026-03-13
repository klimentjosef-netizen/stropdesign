import Hero from "@/components/Hero";
import Surfaces from "@/components/Surfaces";
import About from "@/components/About";
import Comparison from "@/components/Comparison";
import Calculator from "@/components/Calculator";
import References from "@/components/References";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Surfaces />
      <About />
      <Comparison />
      <Calculator />
      <References />
      <ContactSection />
    </>
  );
}
