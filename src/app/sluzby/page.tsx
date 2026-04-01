import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { getSurfaces } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Typy napínaných stropů | Matný, lesklý, průsvitný | StropDesign",
  description:
    "Přehled všech typů napínaných stropů — od matného po vlastní tisk. Ceny od 600 Kč/m². Realizujeme po celé ČR.",
  alternates: {
    canonical: "/sluzby",
    languages: { cs: "/sluzby", en: "/en/sluzby" },
  },
};

export default async function SluzbyPage() {
  const surfaces = await getSurfaces("cs");
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <SectionEyebrow text="Co nabízíme" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Napínané stropy
              <br />
              pro každý <em className="italic text-accent">interiér</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Široký výběr povrchů a barev. Každý typ má specifické vlastnosti
              a vizuální efekt. Poradíme vám s výběrem na míru.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <Image
                src="/images/hero-kitchen.jpg"
                alt="Wellness s napínaným stropem s efektem hvězdné oblohy a LED podsvícením"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {surfaces.map((product, i) => (
            <RevealOnScroll key={product.name} delay={i * 80}>
              <div className="bg-white border border-border flex flex-col h-full group hover:border-accent/30 transition-colors duration-300 rounded-2xl overflow-hidden">
                {product.image && (
                  <div className="h-32 relative overflow-hidden" style={{ background: product.color }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-grow">
                <div className="text-accent text-[10px] tracking-[0.12em] uppercase font-medium mb-4">
                  {product.priceLabel}
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 text-heading group-hover:text-accent transition-colors">
                  {product.name}
                </h3>

                <p className="text-body text-sm leading-[1.7] font-light mb-6 flex-grow">
                  {product.description}
                </p>

                <ul className="flex flex-col gap-2 mb-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[12px] text-body">
                      <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/kontakt#kontakt-formular"
                  className="text-center border border-accent/30 text-accent text-[10px] font-medium tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-accent hover:text-white transition-all duration-200 rounded-full"
                >
                  Poptat tento povrch
                </Link>
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
              Nevíte, jaký povrch zvolit?
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              Poradíme vám na základě vaší místnosti, osvětlení a požadavků.
              Stačí nám napsat nebo zavolat.
            </p>
            <Link
              href="/kontakt#kontakt-formular"
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
