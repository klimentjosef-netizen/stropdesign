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
                  {ref.image ? (
                    <Image
                      src={ref.image}
                      alt={ref.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                      </svg>
                      <span className="text-white/40 text-[10px] tracking-[0.1em] uppercase font-medium">
                        Foto připravujeme
                      </span>
                    </div>
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
