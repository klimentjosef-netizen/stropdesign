"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

const SURFACES = [
  { name: "Matný", price: 600, icon: "○" },
  { name: "Saténový", price: 680, icon: "◐" },
  { name: "Lesklý", price: 750, icon: "●" },
  { name: "Metalický", price: 820, icon: "◆" },
  { name: "Průsvitný", price: 900, icon: "◇" },
  { name: "Perforovaný", price: 950, icon: "⬡" },
  { name: "Akustický", price: 1100, icon: "◎" },
  { name: "Vlastní tisk", price: 1200, icon: "▣" },
] as const;

const STEPS = ["Povrch", "Plocha", "Výsledek"];
const MARGIN = 0.15;

export default function PriceCalculator() {
  const [step, setStep] = useState(0);
  const [surfaceIdx, setSurfaceIdx] = useState(0);
  const [inputMode, setInputMode] = useState<"dimensions" | "direct">("dimensions");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [directArea, setDirectArea] = useState("");

  const area = useMemo(() => {
    if (inputMode === "direct") return parseFloat(directArea) || 0;
    return (parseFloat(length) || 0) * (parseFloat(width) || 0);
  }, [inputMode, length, width, directArea]);

  const pricePerSqm = SURFACES[surfaceIdx].price;
  const basePrice = Math.round(area * pricePerSqm);
  const priceLow = Math.round(basePrice * (1 - MARGIN));
  const priceHigh = Math.round(basePrice * (1 + MARGIN));

  const canNext = step === 0 || (step === 1 && area > 0);

  const fmt = (n: number) => n.toLocaleString("cs-CZ");

  return (
    <section id="kalkulacka" className="py-20 lg:py-24 px-6 lg:px-10 bg-navy border-y border-white/5">
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-10">
            <SectionEyebrow text="Cenový odhad" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15]">
              Kolik stojí napínaný strop?
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Progress bar */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-2">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className="flex-1">
                      <div className="h-1 rounded-full overflow-hidden bg-white/10">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500"
                          style={{ width: i <= step ? "100%" : "0%" }}
                        />
                      </div>
                    </div>
                    {i < STEPS.length - 1 && <div className="w-1" />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] tracking-[0.08em] uppercase">
                {STEPS.map((label, i) => (
                  <span
                    key={label}
                    className={`transition-colors duration-300 ${
                      i <= step ? "text-accent" : "text-white/30"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              {/* STEP 1: Surface selection */}
              {step === 0 && (
                <div>
                  <p className="text-white/50 text-[13px] font-light mb-5">
                    Vyberte typ povrchu napínaného stropu:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SURFACES.map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => setSurfaceIdx(i)}
                        className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                          i === surfaceIdx
                            ? "border-accent bg-accent/10 text-white"
                            : "border-white/10 hover:border-white/25 text-white/70"
                        }`}
                      >
                        <span className="block text-lg mb-1.5">{s.icon}</span>
                        <span className="block text-[12px] font-medium">{s.name}</span>
                        <span className={`block text-[11px] mt-0.5 ${
                          i === surfaceIdx ? "text-accent" : "text-white/40"
                        }`}>
                          {s.price} Kč/m²
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Area input */}
              {step === 1 && (
                <div>
                  <p className="text-white/50 text-[13px] font-light mb-5">
                    Zadejte rozměry místnosti nebo přímo plochu:
                  </p>

                  {/* Mode toggle */}
                  <div className="flex gap-2 mb-5">
                    <button
                      onClick={() => setInputMode("dimensions")}
                      className={`text-[11px] tracking-[0.06em] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                        inputMode === "dimensions"
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-white/10 text-white/40 hover:border-white/25"
                      }`}
                    >
                      Délka x šířka
                    </button>
                    <button
                      onClick={() => setInputMode("direct")}
                      className={`text-[11px] tracking-[0.06em] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                        inputMode === "direct"
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-white/10 text-white/40 hover:border-white/25"
                      }`}
                    >
                      Přímo m²
                    </button>
                  </div>

                  {inputMode === "dimensions" ? (
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[10px] text-white/40 tracking-[0.08em] uppercase mb-1.5">
                          Délka (m)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          placeholder="0"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[15px] font-light outline-none focus:border-accent transition-colors placeholder:text-white/20"
                        />
                      </div>
                      <span className="text-white/30 text-xl mt-5">×</span>
                      <div className="flex-1">
                        <label className="block text-[10px] text-white/40 tracking-[0.08em] uppercase mb-1.5">
                          Šířka (m)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="0"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[15px] font-light outline-none focus:border-accent transition-colors placeholder:text-white/20"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] text-white/40 tracking-[0.08em] uppercase mb-1.5">
                        Plocha (m²)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={directArea}
                        onChange={(e) => setDirectArea(e.target.value)}
                        placeholder="0"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[15px] font-light outline-none focus:border-accent transition-colors placeholder:text-white/20"
                      />
                    </div>
                  )}

                  {/* Live area display */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-white/40 text-[11px]">Odhadovaná plocha:</span>
                    <span className="font-display text-lg font-semibold text-accent tabular-nums">
                      {area > 0 ? `${area.toFixed(1)} m²` : "–"}
                    </span>
                  </div>

                  {/* Live price preview */}
                  {area > 0 && (
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-white/40 text-[11px]">Vybraný povrch:</span>
                      <span className="text-white/60 text-[12px]">
                        {SURFACES[surfaceIdx].name} ({SURFACES[surfaceIdx].price} Kč/m²)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Result */}
              {step === 2 && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 text-[11px] text-white/40 tracking-[0.06em] uppercase mb-2">
                    <span>{SURFACES[surfaceIdx].icon}</span>
                    <span>{SURFACES[surfaceIdx].name}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>{area.toFixed(1)} m²</span>
                  </div>

                  <div className="font-display text-[clamp(28px,4vw,42px)] font-bold text-accent leading-none mt-3 mb-1 tabular-nums">
                    {fmt(priceLow)} – {fmt(priceHigh)} Kč
                  </div>

                  <p className="text-white/30 text-[11px] mb-6">
                    orientační rozsah ±15 %
                  </p>

                  <div className="w-12 h-px bg-accent/30 mx-auto mb-6" />

                  <p className="text-white/50 text-[13px] font-light leading-[1.7] mb-8 max-w-md mx-auto">
                    Přesnou nabídku připravíme do 24 hodin po bezplatné konzultaci.
                    Cena zahrnuje materiál i montáž.
                  </p>

                  <Link
                    href={`/kontakt?room=${encodeURIComponent(
                      `${SURFACES[surfaceIdx].name}, ${area.toFixed(1)} m²`
                    )}&message=${encodeURIComponent(
                      `Mám zájem o ${SURFACES[surfaceIdx].name.toLowerCase()} napínaný strop, přibližně ${area.toFixed(1)} m². Orientační cena: ${fmt(priceLow)}–${fmt(priceHigh)} Kč. Prosím o přesnou nabídku.`
                    )}`}
                    className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
                  >
                    Chci přesnou nabídku
                  </Link>
                </div>
              )}

              {/* Navigation buttons */}
              {step < 2 && (
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    disabled={step === 0}
                    className={`text-[11px] tracking-[0.08em] uppercase flex items-center gap-2 transition-colors ${
                      step === 0
                        ? "text-white/10 cursor-not-allowed"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Zpět
                  </button>

                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                    className={`text-[11px] tracking-[0.08em] uppercase flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-200 ${
                      canNext
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {step === 1 ? "Spočítat" : "Další"}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Back button on result step */}
              {step === 2 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setStep(0)}
                    className="text-[11px] tracking-[0.06em] text-white/30 hover:text-white/60 transition-colors"
                  >
                    Spočítat znovu
                  </button>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
