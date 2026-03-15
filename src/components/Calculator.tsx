"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { surfaces } from "@/data/products";
import { addons as addonsList, categoryLabels, type Addon } from "@/data/addons";

const CATEGORIES = Object.keys(categoryLabels) as Addon["category"][];

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(value);

  useEffect(() => {
    const from = ref.current;
    const to = value;
    if (from === to) return;

    const duration = 400;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        ref.current = to;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{display.toLocaleString("cs-CZ")}</>;
}

export default function Calculator() {
  const [selectedSurface, setSelectedSurface] = useState(0);
  const [area, setArea] = useState(24);
  const [lights, setLights] = useState(6);
  const [addons, setAddons] = useState<Set<number>>(new Set());
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["lighting"]));

  const pricePerSqm = surfaces[selectedSurface].price;
  const lightCost = lights * 350;
  const addonsCost = Array.from(addons).reduce(
    (sum, i) => sum + addonsList[i].price,
    0
  );
  const total = area * pricePerSqm + lightCost + addonsCost;

  const toggleAddon = useCallback((index: number) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const areaPct = ((area - 5) / (100 - 5)) * 100;
  const lightsPct = (lights / 20) * 100;

  return (
    <section id="kalkulacka" className="py-20 lg:py-24 px-6 lg:px-10 bg-light-secondary border-b border-border">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-12">
            <SectionEyebrow text="Kalkulačka" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] text-heading">
              Spočítejte si cenu stropu
            </h2>
            <p className="text-body text-sm font-light mt-2">
              Zadejte parametry místnosti. Orientační cena ihned, přesná nabídka
              do 24 hodin.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          <RevealOnScroll>
            <div>
              {/* Step 1: Surface type */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                    Typ povrchu
                  </label>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {surfaces.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSurface(i)}
                      className={`group border text-left px-3 py-2.5 transition-all duration-250 rounded-sm relative overflow-hidden ${
                        selectedSurface === i
                          ? "border-accent bg-white shadow-md"
                          : "border-border bg-white/50 hover:border-border-dark hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-transform duration-200"
                          style={{
                            background: s.color,
                            borderColor: selectedSurface === i ? s.accent : "#ddd",
                            transform: selectedSurface === i ? "scale(1.2)" : "scale(1)",
                          }}
                        />
                        <span
                          className={`text-[11px] tracking-[0.03em] transition-colors duration-200 ${
                            selectedSurface === i
                              ? "text-heading font-medium"
                              : "text-body"
                          }`}
                        >
                          {s.name}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] transition-colors duration-200 ${
                          selectedSurface === i ? "text-accent font-medium" : "text-muted"
                        }`}
                      >
                        {s.priceLabel}
                      </span>
                      {selectedSurface === i && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[2px]"
                          style={{ background: s.accent }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Area */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                    Rozměry
                  </label>
                </div>

                <div className="bg-white border border-border rounded-sm p-4">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[11px] text-body">Plocha stropu</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setArea((a) => Math.max(5, a - 1))}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="font-display text-lg text-accent min-w-[3.5rem] text-center tabular-nums">
                        {area} m²
                      </span>
                      <button
                        onClick={() => setArea((a) => Math.min(100, a + 1))}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={5}
                      max={100}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="calc-range w-full"
                    />
                    <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-border rounded-full pointer-events-none">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-100"
                        style={{ width: `${areaPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-muted text-[10px]">5 m²</span>
                    <span className="text-muted text-[10px]">100 m²</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Lights */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                    Osvětlení
                  </label>
                </div>

                <div className="bg-white border border-border rounded-sm p-4">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[11px] text-body">Bodová světla (350 Kč/ks)</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLights((l) => Math.max(0, l - 1))}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="font-display text-lg text-accent min-w-[2.5rem] text-center tabular-nums">
                        {lights} ks
                      </span>
                      <button
                        onClick={() => setLights((l) => Math.min(20, l + 1))}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={lights}
                      onChange={(e) => setLights(Number(e.target.value))}
                      className="calc-range w-full"
                    />
                    <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-border rounded-full pointer-events-none">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-100"
                        style={{ width: `${lightsPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-muted text-[10px]">0 ks</span>
                    <span className="text-muted text-[10px]">20 ks</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Addons */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    4
                  </span>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                    Doplňky & příslušenství
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => {
                    const catAddons = addonsList
                      .map((a, i) => ({ ...a, originalIndex: i }))
                      .filter((a) => a.category === cat);
                    const isExpanded = expandedCats.has(cat);
                    const selectedCount = catAddons.filter((a) =>
                      addons.has(a.originalIndex)
                    ).length;

                    return (
                      <div
                        key={cat}
                        className="bg-white border border-border rounded-sm overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-light-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-heading tracking-[0.04em]">
                              {categoryLabels[cat]}
                            </span>
                            {selectedCount > 0 && (
                              <span className="bg-accent text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                                {selectedCount}
                              </span>
                            )}
                          </div>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className={`text-muted transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <path d="M2 3.5l3 3 3-3" />
                          </svg>
                        </button>

                        <div
                          className="transition-all duration-250 ease-out"
                          style={{
                            maxHeight: isExpanded ? `${catAddons.length * 44 + 8}px` : "0",
                            opacity: isExpanded ? 1 : 0,
                            overflow: "hidden",
                          }}
                        >
                          <div className="px-3 pb-3 flex flex-col gap-1">
                            {catAddons.map((addon) => {
                              const isActive = addons.has(addon.originalIndex);
                              return (
                                <button
                                  key={addon.name}
                                  onClick={() => toggleAddon(addon.originalIndex)}
                                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-[11px] transition-all duration-200 ${
                                    isActive
                                      ? "bg-accent-soft border border-accent/30 text-heading"
                                      : "bg-light-secondary/50 border border-transparent text-body hover:bg-light-secondary"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all duration-200 ${
                                        isActive
                                          ? "bg-accent border-accent"
                                          : "border-border bg-white"
                                      }`}
                                    >
                                      {isActive && (
                                        <svg
                                          width="8"
                                          height="8"
                                          viewBox="0 0 8 8"
                                          fill="none"
                                          stroke="white"
                                          strokeWidth="1.5"
                                        >
                                          <path d="M1.5 4l2 2 3-3.5" />
                                        </svg>
                                      )}
                                    </div>
                                    <span>{addon.name}</span>
                                  </div>
                                  <span
                                    className={`text-[10px] tabular-nums ${
                                      isActive ? "text-accent font-medium" : "text-muted"
                                    }`}
                                  >
                                    +{addon.price.toLocaleString("cs-CZ")} Kč
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Result card */}
          <RevealOnScroll delay={200}>
            <div className="bg-white border border-border rounded-sm overflow-hidden lg:sticky lg:top-24 shadow-sm">
              {/* Header with surface color */}
              <div
                className="h-2 transition-all duration-300"
                style={{ background: surfaces[selectedSurface].accent }}
              />

              <div className="p-8">
                <div className="border-b border-border pb-5 mb-5">
                  <div className="text-muted text-[10px] tracking-[0.14em] uppercase mb-2">
                    Orientační cena
                  </div>
                  <div className="font-display text-[42px] font-semibold text-accent leading-none mb-1 tabular-nums">
                    <AnimatedPrice value={total} />{" "}
                    <span className="text-lg text-muted">Kč</span>
                  </div>
                  <div className="text-[10px] text-muted mt-1">
                    {Math.round(total / area).toLocaleString("cs-CZ")} Kč/m² vč. příslušenství
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-6">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted">Povrch</span>
                    <span className="text-body font-medium">
                      {surfaces[selectedSurface].name}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted">Plocha</span>
                    <span className="text-body">{area} m²</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted">Cena za m²</span>
                    <span className="text-accent font-medium">{pricePerSqm} Kč</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted">Materiál + montáž</span>
                    <span className="text-body">
                      {(area * pricePerSqm).toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                  {lights > 0 && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted">Bodová světla ({lights}×)</span>
                      <span className="text-body">
                        {lightCost.toLocaleString("cs-CZ")} Kč
                      </span>
                    </div>
                  )}
                  {addons.size > 0 && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted">
                        Doplňky ({addons.size}×)
                      </span>
                      <span className="text-body">
                        {addonsCost.toLocaleString("cs-CZ")} Kč
                      </span>
                    </div>
                  )}
                </div>

                {/* Selected addons list */}
                {addons.size > 0 && (
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="text-[9px] uppercase tracking-[0.12em] text-muted mb-2">
                      Vybrané doplňky
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(addons).map((i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-accent-soft text-accent px-2 py-0.5 rounded-sm"
                        >
                          {addonsList[i].name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href="/kontakt"
                  className="btn-shimmer glow-accent block w-full bg-accent text-white text-[11px] font-medium tracking-[0.12em] uppercase py-4 text-center hover:bg-accent-hover transition-colors duration-200 rounded-sm"
                >
                  Odeslat poptávku
                </a>
                <p className="text-muted text-[9px] text-center mt-2.5 leading-[1.5]">
                  Přesná nabídka s fixní cenou do 24 hodin po schůzce.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style jsx>{`
        .calc-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 20px;
          position: relative;
          z-index: 2;
          cursor: pointer;
        }
        .calc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: white;
          border: 2px solid #C5A55A;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .calc-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(197, 165, 90, 0.3);
        }
        .calc-range::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(197, 165, 90, 0.4);
        }
        .calc-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 2px solid #C5A55A;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
        .calc-range::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(197, 165, 90, 0.3);
        }
        .calc-range::-moz-range-track {
          background: transparent;
          height: 3px;
        }
        .calc-range::-webkit-slider-runnable-track {
          background: transparent;
          height: 3px;
        }
      `}</style>
    </section>
  );
}
