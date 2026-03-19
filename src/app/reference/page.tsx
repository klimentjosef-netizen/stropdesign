import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import ReferenceGrid from "@/components/ReferenceGrid";

export const metadata: Metadata = {
  title: "Reference a realizace napínaných stropů | StropDesign",
  description:
    "Prohlédněte si dokončené realizace napínaných stropů — kuchyně, ložnice, koupelny, komerční prostory. Celá ČR.",
};

export default function ReferencePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Reference" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Realizace, na které
              <br />
              jsme <em className="italic text-accent">hrdí</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Každý projekt je originál. Podívejte se na naše dokončené realizace
              po celé ČR. Klikněte na fotku pro zvětšení.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid with Lightbox */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <ReferenceGrid />
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold mb-4 text-heading">
              Chcete podobný výsledek?
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              Každý strop děláme na míru. Ozvěte se a společně najdeme řešení pro váš prostor.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
            >
              Nezávazná poptávka
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
