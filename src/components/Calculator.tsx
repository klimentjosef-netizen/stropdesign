"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

    const duration = 350;
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

// Min/max price range for teaser
const minPrice = Math.min(...surfaces.map((s) => s.price));
const maxPrice = Math.max(...surfaces.map((s) => s.price));

export default function Calculator() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSurface, setSelectedSurface] = useState(0);
  const [area, setArea] = useState(24);
  const [lights, setLights] = useState(6);
  const [addons, setAddons] = useState<Set<number>>(new Set());
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(["lighting"])
  );

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [isOpen]);

  const areaPct = ((area - 5) / (100 - 5)) * 100;
  const lightsPct = (lights / 20) * 100;

  return (
    <>
      {/* ═══ COMPACT TEASER on homepage ═══ */}
      <section
        id="kalkulacka"
        className="py-16 lg:py-20 px-6 lg:px-10 bg-light-secondary border-b border-border"
      >
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                {/* Left - text */}
                <div className="flex-1">
                  <SectionEyebrow text="Cenový odhad" />
                  <h2 className="font-display text-[clamp(22px,2.5vw,30px)] font-semibold leading-[1.2] text-heading mb-2">
                    Kolik stojí napínaný strop?
                  </h2>
                  <p className="text-body text-[13px] font-light leading-[1.7]">
                    Ceny jsou orientační a fixní. Žádné překvapení.
                    Přesnou nabídku připravíme do 24 hodin.
                  </p>
                </div>

                {/* Right - price indicator + CTA */}
                <div className="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
                  <div className="text-center lg:text-right">
                    <div className="text-muted text-[9px] tracking-[0.12em] uppercase mb-1">
                      Cena od
                    </div>
                    <div className="font-display text-[32px] font-semibold text-accent leading-none tabular-nums">
                      {minPrice} <span className="text-[14px] text-muted">Kč/m²</span>
                    </div>
                    <div className="text-muted text-[10px] mt-1">
                      až {maxPrice} Kč/m² dle povrchu
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn-shimmer glow-accent bg-accent text-white text-[11px] font-medium tracking-[0.12em] uppercase px-7 py-3.5 hover:bg-accent-hover transition-colors duration-200 rounded-sm whitespace-nowrap"
                  >
                    Spočítat přesnou cenu →
                  </button>
                </div>
              </div>

              {/* Bottom surface preview strip */}
              <div className="border-t border-border px-8 lg:px-10 py-3 flex items-center gap-4 overflow-x-auto">
                <span className="text-muted text-[9px] tracking-[0.1em] uppercase flex-shrink-0">
                  Povrchy:
                </span>
                <div className="flex gap-2">
                  {surfaces.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-center gap-1.5 flex-shrink-0"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-border-dark/30"
                        style={{ background: s.color }}
                      />
                      <span className="text-[10px] text-muted">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ FULLSCREEN MODAL ═══ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center"
          style={{
            animation: "calcFadeIn 0.22s ease forwards",
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/88 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <div
            className="relative w-full max-w-[1100px] max-h-[100dvh] overflow-y-auto bg-white mx-4 my-4 lg:my-8 rounded-sm shadow-2xl"
            style={{
              animation: "calcSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-border px-6 lg:px-10 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-heading">
                  Kalkulačka ceny stropu
                </h2>
                <p className="text-muted text-[11px]">
                  Vyberte parametry a ihned uvidíte orientační cenu
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-heading hover:border-heading transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1l10 10M11 1l-10 10" />
                </svg>
              </button>
            </div>

            {/* Body - two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
              {/* Left: Form */}
              <div className="p-6 lg:p-10 lg:border-r lg:border-border">
                {/* Step 1: Surface */}
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
                        className={`border text-left px-3 py-2.5 transition-all duration-200 rounded-sm relative overflow-hidden ${
                          selectedSurface === i
                            ? "border-accent bg-accent-soft shadow-sm"
                            : "border-border bg-light-secondary/50 hover:border-border-dark"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-3 h-3 rounded-full border flex-shrink-0"
                            style={{
                              background: s.color,
                              borderColor:
                                selectedSurface === i ? s.accent : "#ddd",
                            }}
                          />
                          <span
                            className={`text-[11px] ${
                              selectedSurface === i
                                ? "text-heading font-medium"
                                : "text-body"
                            }`}
                          >
                            {s.name}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] ${
                            selectedSurface === i
                              ? "text-accent font-medium"
                              : "text-muted"
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
                      Plocha stropu
                    </label>
                  </div>
                  <div className="bg-light-secondary/50 border border-border rounded-sm p-4">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[11px] text-body">
                        Velikost místnosti
                      </span>
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
                      Bodová světla
                    </label>
                  </div>
                  <div className="bg-light-secondary/50 border border-border rounded-sm p-4">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[11px] text-body">
                        Počet světel (350 Kč/ks)
                      </span>
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
                          className="border border-border rounded-sm overflow-hidden"
                        >
                          <button
                            onClick={() => toggleCategory(cat)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-light-secondary/30 hover:bg-light-secondary/60 transition-colors"
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
                              maxHeight: isExpanded
                                ? `${catAddons.length * 44 + 8}px`
                                : "0",
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
                                    onClick={() =>
                                      toggleAddon(addon.originalIndex)
                                    }
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
                                        isActive
                                          ? "text-accent font-medium"
                                          : "text-muted"
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

              {/* Right: Sticky price summary */}
              <div className="p-6 lg:p-8 lg:sticky lg:top-[73px] lg:self-start">
                <div
                  className="h-1.5 rounded-t-sm -mx-6 lg:-mx-8 -mt-6 lg:-mt-8 mb-6"
                  style={{ background: surfaces[selectedSurface].accent }}
                />

                <div className="border-b border-border pb-5 mb-5">
                  <div className="text-muted text-[10px] tracking-[0.14em] uppercase mb-2">
                    Orientační cena
                  </div>
                  <div className="font-display text-[38px] font-semibold text-accent leading-none tabular-nums">
                    <AnimatedPrice value={total} />{" "}
                    <span className="text-[15px] text-muted">Kč</span>
                  </div>
                  <div className="text-[10px] text-muted mt-1.5">
                    {Math.round(total / area).toLocaleString("cs-CZ")} Kč/m²
                    vč. příslušenství
                  </div>
                </div>

                {/* Breakdown */}
                <div className="flex flex-col gap-2 mb-5">
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
                    <span className="text-muted">Materiál + montáž</span>
                    <span className="text-body">
                      {(area * pricePerSqm).toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                  {lights > 0 && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted">
                        Světla ({lights}×)
                      </span>
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

                {/* Selected addons tags */}
                {addons.size > 0 && (
                  <div className="border-t border-border pt-4 mb-5">
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

                <button
                  onClick={() => {
                    const selectedAddons = Array.from(addons)
                      .map((i) => addonsList[i].name)
                      .join(", ");
                    const room = `${surfaces[selectedSurface].name} povrch, ${area} m²`;
                    const lines = [
                      `Povrch: ${surfaces[selectedSurface].name} (${pricePerSqm} Kč/m²)`,
                      `Plocha: ${area} m²`,
                      lights > 0 ? `Bodová světla: ${lights} ks` : "",
                      selectedAddons ? `Doplňky: ${selectedAddons}` : "",
                      `Orientační cena: ${total.toLocaleString("cs-CZ")} Kč`,
                    ]
                      .filter(Boolean)
                      .join("\n");
                    const params = new URLSearchParams({
                      room,
                      message: `Poptávka z kalkulačky:\n${lines}`,
                    });
                    setIsOpen(false);
                    router.push(`/kontakt?${params.toString()}`);
                  }}
                  className="btn-shimmer glow-accent block w-full bg-accent text-white text-[11px] font-medium tracking-[0.12em] uppercase py-4 text-center hover:bg-accent-hover transition-colors duration-200 rounded-sm"
                >
                  Poptat tento strop →
                </button>
                <p className="text-muted text-[9px] text-center mt-2.5 leading-[1.5]">
                  Přesná nabídka s fixní cenou do 24 hodin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes calcFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes calcSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
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
          border: 2px solid #C49A30;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .calc-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(196, 154, 48, 0.3);
        }
        .calc-range::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(196, 154, 48, 0.4);
        }
        .calc-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 2px solid #C49A30;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
        .calc-range::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(196, 154, 48, 0.3);
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
    </>
  );
}
