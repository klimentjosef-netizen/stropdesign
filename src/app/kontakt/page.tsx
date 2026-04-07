import { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Calculator from "@/components/Calculator";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { getSurfaces, getAddons } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Kontakt | StropDesign",
  description:
    "Kontaktujte nás pro nezávaznou poptávku na napínané stropy. Telefon: +420 739 457 794. Realizujeme po celé ČR.",
  alternates: {
    canonical: "/kontakt",
    languages: { cs: "/kontakt", en: "/en/kontakt" },
  },
};

export default async function KontaktPage() {
  const [surfaces, addons] = await Promise.all([
    getSurfaces("cs"),
    getAddons(),
  ]);
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Kontakt" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Ozvěte se nám,
              <br />
              <em className="italic text-accent">rádi poradíme</em>.
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Zavolejte, napište nebo vyplňte formulář. Odpovídáme do 48 hodin
              a nabídku připravíme přesně na míru vašeho projektu.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 bg-light-secondary border-b border-border">
        <div className="max-w-7xl mx-auto mb-8 text-center">
          <h2 className="font-display text-lg font-semibold text-heading">STROPDESIGN / DERBAU S.R.O.</h2>
          <p className="text-muted text-[12px] mt-1">IČO: 24197564</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <RevealOnScroll>
            <div className="bg-white border border-border p-7 hover:border-accent/30 transition-colors duration-300 rounded-2xl">
              <div className="w-8 h-8 border border-accent/25 flex items-center justify-center mb-4 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
              <h3 className="font-display text-base font-medium mb-2 text-heading">
                Telefon
              </h3>
              <a
                href="tel:+420739457794"
                className="text-body text-sm hover:text-accent transition-colors"
              >
                +420 739 457 794
              </a>
              <p className="text-muted text-[11px] mt-1">Po-Pá 8:00 - 18:00</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="bg-white border border-border p-7 hover:border-accent/30 transition-colors duration-300 rounded-2xl">
              <div className="w-8 h-8 border border-accent/25 flex items-center justify-center mb-4 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
              <h3 className="font-display text-base font-medium mb-2 text-heading">
                E-mail
              </h3>
              <a
                href="mailto:info@stropdesign.cz"
                className="text-body text-sm hover:text-accent transition-colors"
              >
                info@stropdesign.cz
              </a>
              <p className="text-muted text-[11px] mt-1">Odpovídáme do 48 hodin</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="bg-white border border-border p-7 hover:border-accent/30 transition-colors duration-300 rounded-2xl">
              <div className="w-8 h-8 border border-accent/25 flex items-center justify-center mb-4 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
              <h3 className="font-display text-base font-medium mb-2 text-heading">
                Lokalita
              </h3>
              <p className="text-body text-sm">Ostrava a okolí</p>
              <p className="text-muted text-[11px] mt-1">
                Frýdek-Místek, Opava, Havířov, Karviná
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Calculator + Contact form anchor */}
      <div id="kontakt-formular">
        <Calculator surfaces={surfaces} addons={addons} />

        {/* Contact form */}
        <ContactSection />
      </div>
    </>
  );
}
