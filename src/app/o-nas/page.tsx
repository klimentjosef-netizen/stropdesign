import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { reasons } from "@/data/reasons";

export const metadata: Metadata = {
  title: "O nás | StropDesign",
  description:
    "Jsme StropDesign, specialisté na napínané stropy v Ostravě a okolí. Precizní práce, individuální přístup a více než 200 dokončených realizací.",
};

const stats = [
  { number: "200+", label: "Dokončených realizací" },
  { number: "5,0", label: "Hodnocení na Google" },
  { number: "7 dní", label: "Průměrná doba realizace" },
  { number: "15+", label: "Let životnosti stropu" },
];

export default function ONasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <SectionEyebrow text="O nás" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Specialisté na napínané stropy
              <br />
              <em className="italic text-accent">v Ostravě a okolí</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light mb-8">
              Jsme StropDesign, divize společnosti Derbau s.r.o. Zabýváme se
              návrhem a montáží napínaných stropů pro rodinné domy, byty,
              kanceláře i komerční prostory. Každý projekt bereme jako příležitost
              proměnit obyčejný interiér v něco výjimečného.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
            >
              Ozvěte se nám
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="bg-light-secondary border border-border p-8 rounded-2xl">
              <SectionEyebrow text="Tým za StropDesign" />

              <div className="flex flex-col items-center text-center mt-6">
                {/* TODO: nahradit foto majitele, jméno: [doplnit] */}
                <div className="w-[120px] h-[120px] rounded-full bg-[#1a1a1a] flex items-center justify-center mb-5">
                  <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>

                {/* TODO: doplnit jméno */}
                <h3 className="font-display text-lg font-semibold text-heading">
                  Zakladatel &amp; hlavní montér
                </h3>
                <p className="text-accent text-[11px] tracking-[0.1em] uppercase font-medium mt-1">
                  StropDesign / Derbau s.r.o.
                </p>

                {/* TODO: upřesnit délku praxe */}
                <p className="text-body text-sm leading-[1.7] font-light mt-4 max-w-xs">
                  Napínaným stropům se věnuji přes X let. Každou realizaci
                  dělám osobně — od zaměření až po předání.
                </p>
              </div>

              {/* ⚠️ TODO: majitel dodá: 1) fotku (ideálně čtvercový formát, min 400x400px), 2) jméno, 3) délku praxe */}
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
            <SectionEyebrow text="Proč StropDesign" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-12 text-heading">
              6 důvodů, proč nám klienti věří
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((reason, i) => (
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
              Pojďme spolupracovat
            </h2>
            <p className="text-body text-sm leading-[1.7] font-light mb-8">
              Rádi vám poradíme s výběrem a připravíme nabídku na míru. Stačí se ozvat.
            </p>
            <Link
              href="/kontakt"
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
