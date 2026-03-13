import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { steps } from "@/data/steps";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Jak to funguje | StropDesign",
  description:
    "Postup montáže napínaného stropu ve 3 krocích. Od první konzultace po finální předání. Čistá montáž bez prachu.",
};

export default function PostupPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Jak to funguje" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Od poptávky po hotový strop
              <br />
              <em className="italic text-accent">za 7 dní</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Celý proces je jednoduchý a bezstarostný. Postaráme se o vše od
              konzultace po finální montáž.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <div className="max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 100}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-12 ${
                  i < steps.length - 1
                    ? "pb-12 lg:pb-16 mb-12 lg:mb-16 border-b border-border"
                    : ""
                }`}
              >
                <div className="font-display text-[64px] lg:text-[80px] font-bold text-accent/15 leading-none">
                  {step.number}
                </div>
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-4 text-heading">
                    {step.title}
                  </h2>
                  <p className="text-body text-sm leading-[1.8] font-light mb-6 max-w-lg">
                    {step.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-2.5 text-[12px] text-body"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Časté dotazy" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-10 text-heading">
              Na co se nás ptáte nejčastěji
            </h2>
          </RevealOnScroll>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 60}>
                <div className="py-6 border-b border-border">
                  <h3 className="font-display text-base font-medium mb-2 text-heading">
                    {faq.question}
                  </h3>
                  <p className="text-body text-sm leading-[1.7] font-light">
                    {faq.answer}
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
              Připraveni začít?
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              Stačí se ozvat. Odpovídáme do 24 hodin a nabídku připravíme přesně na míru.
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
