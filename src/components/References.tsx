import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { references } from "@/data/references";

export default function References() {
  const shown = references.slice(0, 6);

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-10">
              <SectionEyebrow text="Reference" />
              <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] text-heading">
                Realizace, na které jsme hrdí
              </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((ref, i) => (
            <RevealOnScroll key={ref.title} delay={i * 100}>
              <div className="card-hover bg-white border border-border rounded-2xl overflow-hidden cursor-pointer group hover:border-accent/30">
                <div
                  className={`h-44 relative overflow-hidden flex items-end p-3.5 ${ref.image ? "" : `bg-gradient-to-br ${ref.gradient}`}`}
                >
                  {ref.image && (
                    <Image
                      src={ref.image}
                      alt={ref.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                  <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 text-accent text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium rounded-full">
                    {ref.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[15px] font-medium text-heading mb-1 group-hover:text-accent transition-colors duration-300">
                    {ref.title}
                  </h3>
                  <p className="text-muted text-[11px] tracking-[0.04em]">
                    {ref.meta}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={300}>
          <div className="flex justify-center mt-10">
            <Link
              href="/reference"
              className="bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-8 py-3 hover:bg-accent-hover transition-all duration-200 rounded-full"
            >
              Zobrazit vše
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
