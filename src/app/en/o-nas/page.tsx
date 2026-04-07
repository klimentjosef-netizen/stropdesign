import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { reasonsEn } from "@/data/reasons-en";

export const metadata: Metadata = {
  title: "About Us | Stretch Ceiling Specialists | StropDesign",
  description:
    "StropDesign – a division of Derbau s.r.o. Over 150 completed projects, 12-year color warranty. We operate across the Czech Republic.",
  alternates: {
    canonical: "/en/o-nas",
    languages: { cs: "/o-nas", en: "/en/o-nas" },
  },
};

const stats = [
  { number: "200+", label: "Completed projects" },
  { number: "5.0", label: "Google rating" },
  { number: "12 years", label: "Color warranty" },
  { number: "30+ years", label: "Lifespan" },
];

export default function AboutPageEN() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <SectionEyebrow text="About us" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Stretch ceiling specialists
              <br />
              <em className="italic text-accent">across the Czech Republic</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light mb-8">
              We are StropDesign, a division of Derbau s.r.o. We design and
              install stretch ceilings for houses, apartments, offices and
              commercial spaces. Every project is an opportunity to transform
              an ordinary interior into something exceptional.
            </p>
            <Link
              href="/en/kontakt#kontakt-formular"
              className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
            >
              Get in touch
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="bg-light-secondary border border-border p-8 rounded-2xl">
              <SectionEyebrow text="The team behind StropDesign" />

              <div className="flex flex-col items-center text-center mt-6">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-5 border-2 border-accent/20 relative">
                  <Image
                    src="/images/founder.jpg"
                    alt="Founder of StropDesign"
                    fill
                    sizes="120px"
                    className="object-cover scale-[1.8] object-top"
                    quality={90}
                  />
                </div>

                <h3 className="font-display text-lg font-semibold text-heading">
                  Pavel Karlík
                </h3>
                <p className="text-muted text-xs font-light mt-0.5">
                  Founder &amp; Lead Installer
                </p>
                <p className="text-accent text-[11px] tracking-[0.1em] uppercase font-medium mt-1">
                  StropDesign / Derbau s.r.o.
                </p>

                <p className="text-body text-sm leading-[1.7] font-light mt-4 max-w-xs">
                  Over 3 years of experience in stretch ceilings, overseeing
                  dozens of projects across the Czech Republic. I personally
                  ensure quality in every detail of each installation.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 bg-light-secondary border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 100}>
              <div className="text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted text-[11px] tracking-[0.1em] uppercase">
                  {stat.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Why StropDesign" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-12 text-heading">
              6 reasons why our clients trust us
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasonsEn.map((reason, i) => (
              <RevealOnScroll key={reason.title} delay={i * 80}>
                <div className="bg-light-secondary border border-border p-7 hover:border-accent/30 transition-colors duration-300 rounded-2xl">
                  <div className="w-8 h-8 border border-accent/25 flex items-center justify-center mb-4 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <h3 className="font-display text-base font-medium mb-2 text-heading">
                    {reason.title}
                  </h3>
                  <p className="text-body text-sm leading-[1.7] font-light">
                    {reason.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-light-secondary border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold mb-4 text-heading">
              Let&apos;s work together
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              We&apos;ll be happy to help you choose the right solution and prepare a tailor-made offer. Just get in touch.
            </p>
            <Link
              href="/en/kontakt#kontakt-formular"
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
