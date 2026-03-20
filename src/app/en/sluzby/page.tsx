import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { surfacesEn } from "@/data/products-en";

export const metadata: Metadata = {
  title: "Stretch Ceiling Types | Matte, Glossy, Translucent | StropDesign",
  description:
    "Overview of all stretch ceiling types — from matte to custom print. Prices from 600 CZK/m². We operate across the Czech Republic.",
  alternates: {
    canonical: "/en/sluzby",
    languages: { cs: "/sluzby", en: "/en/sluzby" },
  },
};

export default function ServicesPageEN() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <SectionEyebrow text="Our services" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Stretch ceilings
              <br />
              for every <em className="italic text-accent">interior</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              A wide selection of surfaces and colors. Each type has specific
              properties and visual effect. We&apos;ll help you choose the perfect match.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <Image
                src="/images/hero-kitchen.jpg"
                alt="Modern kitchen with stretch ceiling and LED lighting"
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
          {surfacesEn.map((product, i) => (
            <RevealOnScroll key={product.name} delay={i * 80}>
              <div className="bg-white border border-border p-8 flex flex-col h-full group hover:border-accent/30 transition-colors duration-300 rounded-2xl">
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
                  href="/en/kontakt"
                  className="text-center border border-accent/30 text-accent text-[10px] font-medium tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-accent hover:text-white transition-all duration-200 rounded-full"
                >
                  Request this surface
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
              Not sure which surface to choose?
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              We&apos;ll advise you based on your room, lighting and requirements.
              Just send us a message or give us a call.
            </p>
            <Link
              href="/en/kontakt"
              className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
            >
              Free enquiry
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
