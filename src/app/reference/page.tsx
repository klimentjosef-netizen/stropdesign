import { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import ReferenceGrid from "@/components/ReferenceGrid";
import { getReferences } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Reference a realizace napínaných stropů | StropDesign",
  description:
    "Prohlédněte si dokončené realizace napínaných stropů — kuchyně, ložnice, koupelny, komerční prostory. Celá ČR.",
  alternates: {
    canonical: "/reference",
    languages: { cs: "/reference", en: "/en/reference" },
  },
};

export default async function ReferencePage() {
  const references = await getReferences("cs");
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
        <ReferenceGrid references={references} />
      </section>

    </>
  );
}
