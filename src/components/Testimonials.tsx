"use client";

import { useState, useEffect, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  surface: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Martin K.",
    location: "Ostrava-Poruba",
    text: "Skvělá práce, rychlá montáž bez prachu. Strop vypadá naprosto luxusně a hlavně — celá realizace proběhla přesně podle domluvy. Doporučuji každému.",
    rating: 5,
    surface: "Matný + LED pásky",
  },
  {
    name: "Jana M.",
    location: "Frýdek-Místek",
    text: "Nechali jsme si udělat napínaný strop do koupelny s potiskem oblohy. Výsledek předčil očekávání. Koupelna teď vypadá jako ze showroomu.",
    rating: 5,
    surface: "Vlastní tisk",
  },
  {
    name: "Petr V.",
    location: "Havířov",
    text: "Profesionální přístup od konzultace po montáž. Ocenili jsme zejména pomoc s výběrem povrchu a návrhem osvětlení. Cena odpovídá kvalitě.",
    rating: 5,
    surface: "Saténový povrch",
  },
  {
    name: "Lucie S.",
    location: "Opava",
    text: "Napínaný strop v obýváku kompletně změnil atmosféru celé místnosti. Lesklý povrch prostor opticky zvětšil. Montáž za půl dne, žádný nepořádek.",
    rating: 5,
    surface: "Lesklý povrch",
  },
  {
    name: "Tomáš R.",
    location: "Ostrava-Zábřeh",
    text: "Řešili jsme vlhký strop ve sklepě a napínaný strop byl ideální volba. Žádná kondenzace, skvěle vypadá a montáž bez komplikací.",
    rating: 5,
    surface: "Matný povrch",
  },
  {
    name: "Eva D.",
    location: "Karviná",
    text: "Pro naši lékařskou ordinaci jsme potřebovali čisté a hygienické řešení. StropDesign dodal přesně to — akustický strop s integrovaným osvětlením.",
    rating: 5,
    surface: "Akustický povrch",
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
            <div className="bg-white border border-border rounded-sm p-8 lg:p-10 text-center relative">
              {/* Quote mark */}
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
                {t.location} · {t.surface}
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
          </div>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll delay={200}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
            {[
              { value: "5.0", label: "Google hodnocení" },
              { value: "200+", label: "Realizací" },
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
