"use client";

import { useState, useEffect, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  subtitle: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Martin K.",
    text: "Skvělá práce, rychlá montáž bez prachu. Strop vypadá naprosto luxusně a hlavně — celá realizace proběhla přesně podle domluvy. Doporučuji každému.",
    rating: 5,
    subtitle: "Ostrava-Poruba · Matný + LED pásky",
  },
  {
    name: "Jana M.",
    text: "Nechali jsme si udělat napínaný strop do koupelny s potiskem oblohy. Výsledek předčil očekávání. Koupelna teď vypadá jako ze showroomu.",
    rating: 5,
    subtitle: "Frýdek-Místek · Vlastní tisk",
  },
  {
    name: "Petr V.",
    text: "Profesionální přístup od konzultace po montáž. Ocenili jsme zejména pomoc s výběrem povrchu a návrhem osvětlení. Cena odpovídá kvalitě.",
    rating: 5,
    subtitle: "Havířov · Saténový povrch",
  },
  {
    name: "Lucie S.",
    text: "Napínaný strop v obýváku kompletně změnil atmosféru celé místnosti. Lesklý povrch prostor opticky zvětšil. Montáž za půl dne, žádný nepořádek.",
    rating: 5,
    subtitle: "Opava · Lesklý povrch",
  },
  {
    name: "Tomáš R.",
    text: "Řešili jsme vlhký strop ve sklepě a napínaný strop byl ideální volba. Žádná kondenzace, skvěle vypadá a montáž bez komplikací.",
    rating: 5,
    subtitle: "Ostrava-Zábřeh · Matný povrch",
  },
  {
    name: "Eva D.",
    text: "Pro naši lékařskou ordinaci jsme potřebovali čisté a hygienické řešení. StropDesign dodal přesně to — akustický strop s integrovaným osvětlením.",
    rating: 5,
    subtitle: "Karviná · Akustický povrch",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?sca_esv=c1aee945acc89b8a&q=strop+design&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOSoIVhG44J1F14tVdiuftmyvOEsuV2wCc4xWAeeTo_Nb0vDCgowLCFaWhJEMwmVZPLInovM%3D&uds=ALYpb_kPfttAwudk1x-HGnga9iDDgBWpVX4BktQyA-tg2NtL0hFccrlPGlFsJINLW4KPT6vtO-EGA5hYDSUQCu0TDWGjFZwpCib3RQgneU-Nl2wZQhn4BoM";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-light-secondary border-t border-border">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <SectionEyebrow text="Hodnocení" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] text-heading">
              Co říkají naši zákazníci
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div
            className="max-w-3xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Main testimonial card */}
            <div className="bg-white border border-border rounded-2xl p-8 lg:p-10 text-center relative">
              <div className="absolute top-4 left-6 text-accent/10 font-display text-[80px] leading-none select-none">
                &ldquo;
              </div>

              <Stars count={t.rating} />

              <p className="mt-6 mb-6 text-body text-[15px] leading-[1.8] font-light italic relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="w-8 h-px bg-accent mx-auto mb-4" />

              <p className="font-display text-base font-semibold text-heading">
                {t.name}
              </p>
              <p className="text-muted text-[12px] tracking-[0.04em] mt-0.5">
                {t.subtitle}
              </p>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-accent w-6"
                      : "bg-border hover:bg-muted"
                  }`}
                  aria-label={`Hodnocení ${i + 1}`}
                />
              ))}
            </div>

            {/* Google CTA */}
            <div className="flex justify-center mt-8">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white border border-border rounded-full px-6 py-3 hover:border-accent/30 transition-colors duration-300 group"
              >
                <GoogleIcon />
                <span className="text-body text-[13px] font-medium group-hover:text-heading transition-colors">
                  Zobrazit všechny recenze na Google
                </span>
                <svg
                  className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll delay={200}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
            {[
              { value: "5.0", label: "Google hodnocení" },
              { value: "150+", label: "Realizací" },
              { value: "100%", label: "Spokojených klientů" },
              { value: "12 let", label: "Záruka na barvu" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-muted text-[11px] tracking-[0.04em] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
