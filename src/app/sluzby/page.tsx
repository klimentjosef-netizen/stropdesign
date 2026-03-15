import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { surfaces } from "@/data/products";

export const metadata: Metadata = {
  title: "Co nabízíme | StropDesign",
  description:
    "Napínané stropy v různých provedeních: matné, saténové, lesklé, metalické, průsvitné a s vlastním potiskem. Vyberte si povrch pro váš interiér.",
};

export default function SluzbyPage() {
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
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border">
              <Image
                src="/images/hero-kitchen.jpg"
                alt="Moderní kuchyně s napínaným stropem a LED osvětlením"
                fill
                className="object-cover"
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
              <div className="bg-white border border-border p-8 flex flex-col h-full group hover:border-accent/30 transition-colors duration-300 rounded-sm">
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
                  href="/kontakt"
                  className="text-center border border-accent/30 text-accent text-[10px] font-medium tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-accent hover:text-white transition-all duration-200 rounded-sm"
                >
                  Poptat tento povrch
                </Link>
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
