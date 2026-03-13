import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { references } from "@/data/references";

export const metadata: Metadata = {
  title: "Reference | StropDesign",
  description:
    "Realizace napínaných stropů v Ostravě a okolí. Prohlédněte si naše dokončené projekty pro rodinné domy, kanceláře i restaurace.",
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
              v Ostravě a okolí.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {references.map((ref, i) => (
            <RevealOnScroll key={ref.title} delay={i * 80}>
              <div className="bg-white border border-border overflow-hidden group hover:border-accent/30 transition-colors duration-300 rounded-sm">
                <div
                  className={`h-48 relative overflow-hidden flex items-end p-4 bg-gradient-to-br ${ref.gradient}`}
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-white/20 text-accent text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium">
                    {ref.tag}
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                  <h3 className="font-display text-lg font-medium text-heading mb-1 group-hover:text-accent transition-colors">
                    {ref.title}
                  </h3>
                  <p className="text-muted text-[11px] tracking-[0.04em] mb-3">
                    {ref.meta}
                  </p>
                  <p className="text-body text-sm leading-[1.6] font-light">
                    {ref.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
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
              className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-sm"
            >
              Nezávazná poptávka
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
