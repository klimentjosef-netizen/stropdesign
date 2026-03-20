import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import ReferenceGrid from "@/components/ReferenceGrid";
import { getReferences } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Portfolio & Completed Projects | StropDesign",
  description:
    "Browse our completed stretch ceiling installations — kitchens, bedrooms, bathrooms, commercial spaces. Across the Czech Republic.",
  alternates: {
    canonical: "/en/reference",
    languages: { cs: "/reference", en: "/en/reference" },
  },
};

export default async function PortfolioPageEN() {
  const references = await getReferences("en");
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Portfolio" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Projects we are
              <br />
              <em className="italic text-accent">proud of</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Every project is unique. Browse our completed installations
              across the Czech Republic. Click a photo to enlarge.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Grid with Lightbox */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <ReferenceGrid references={references} />
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold mb-4 text-heading">
              Want a similar result?
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              Every ceiling is custom-made. Get in touch and we&apos;ll find the right solution for your space.
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
