"use client";

import { useState, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { surfaces } from "@/data/products";

const addonsList = [
  { name: "LED osvětlení", price: 800 },
  { name: "Reproduktory", price: 2400 },
  { name: "Rolety", price: 1200 },
  { name: "Protipožární systém", price: 1800 },
  { name: "Smart Home", price: 2800 },
];

export default function Calculator() {
  const [selectedSurface, setSelectedSurface] = useState(0);
  const [area, setArea] = useState(24);
  const [lights, setLights] = useState(6);
  const [addons, setAddons] = useState<Set<number>>(new Set([0]));

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

  const handleTrackClick = (
    e: React.MouseEvent<HTMLDivElement>,
    min: number,
    max: number,
    setter: (val: number) => void
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setter(Math.round(min + pct * (max - min)));
  };

  const areaPct = ((area - 5) / (100 - 5)) * 100;
  const lightsPct = (lights / 20) * 100;

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-light-secondary border-b border-border">
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
              {/* Surface type */}
              <div className="mb-7">
                <label className="block text-[10px] font-medium tracking-[0.14em] uppercase text-muted mb-2.5">
                  Typ povrchu
                </label>
                <div className="flex flex-wrap gap-2">
                  {surfaces.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSurface(i)}
                      className={`border text-[11px] px-3.5 py-1.5 tracking-[0.04em] transition-all duration-200 rounded-sm ${
                        selectedSurface === i
                          ? "border-accent bg-accent-soft text-accent font-medium"
                          : "border-border text-body hover:border-border-dark"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area slider */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2.5">
                  <label className="text-[10px] font-medium tracking-[0.14em] uppercase text-muted">
                    Plocha stropu
                  </label>
                  <span className="font-display text-lg text-accent">
                    {area} m²
                  </span>
                </div>
                <div
                  className="h-[3px] bg-border rounded-full relative cursor-pointer"
                  onClick={(e) => handleTrackClick(e, 5, 100, setArea)}
                >
                  <div
                    className="h-[3px] bg-accent rounded-full"
                    style={{ width: `${areaPct}%` }}
                  />
                  <div
                    className="w-4 h-4 bg-white border-2 border-accent rounded-full absolute top-1/2 -translate-y-1/2 -ml-2 cursor-grab shadow-sm"
                    style={{ left: `${areaPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-muted text-[10px]">5 m²</span>
                  <span className="text-muted text-[10px]">100 m²</span>
                </div>
              </div>

              {/* Lights slider */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2.5">
                  <label className="text-[10px] font-medium tracking-[0.14em] uppercase text-muted">
                    Světelné body
                  </label>
                  <span className="font-display text-lg text-accent">
                    {lights} ks
                  </span>
                </div>
                <div
                  className="h-[3px] bg-border rounded-full relative cursor-pointer"
                  onClick={(e) => handleTrackClick(e, 0, 20, setLights)}
                >
                  <div
                    className="h-[3px] bg-accent rounded-full"
                    style={{ width: `${lightsPct}%` }}
                  />
                  <div
                    className="w-4 h-4 bg-white border-2 border-accent rounded-full absolute top-1/2 -translate-y-1/2 -ml-2 cursor-grab shadow-sm"
                    style={{ left: `${lightsPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-muted text-[10px]">0 ks</span>
                  <span className="text-muted text-[10px]">20 ks</span>
                </div>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-[10px] font-medium tracking-[0.14em] uppercase text-muted mb-2.5">
                  Doplňky
                </label>
                <div className="flex flex-wrap gap-2">
                  {addonsList.map((addon, i) => (
                    <button
                      key={addon.name}
                      onClick={() => toggleAddon(i)}
                      className={`border text-[10px] px-3 py-1.5 tracking-[0.04em] transition-all duration-200 rounded-sm ${
                        addons.has(i)
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-border text-muted hover:border-border-dark"
                      }`}
                    >
                      {addon.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Result card */}
          <RevealOnScroll delay={200}>
            <div className="bg-white border border-border rounded-sm p-8 lg:sticky lg:top-24 shadow-sm">
              <div className="border-b border-border pb-5 mb-5">
                <div className="text-muted text-[10px] tracking-[0.14em] uppercase mb-2">
                  Orientační cena
                </div>
                <div className="font-display text-[42px] font-semibold text-accent leading-none mb-1">
                  {total.toLocaleString("cs-CZ")}{" "}
                  <span className="text-lg text-muted">Kč</span>
                </div>
              </div>

              <p className="text-muted text-[11px] leading-[1.6] mb-1.5">
                Cena zahrnuje montáž, materiál a dopravu v Ostravě a okolí.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted">Povrch</span>
                  <span className="text-body">{surfaces[selectedSurface].name}</span>
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
                  <span className="text-muted">Světla + doplňky</span>
                  <span className="text-body">
                    {(lightCost + addonsCost).toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
              </div>

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
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
