"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict, useLocalePath, useLocale } from "@/i18n/LocaleContext";
import type { Surface, Addon } from "@/lib/keystatic";

const CATEGORIES: string[] = ["lighting", "tech", "other"];

interface Room {
  id: number;
  width: number;
  length: number;
  surfaceIndex: number;
  corners: number;
  addonQuantities: Map<number, number>;
  expandedCats: Set<string>;
}

let nextRoomId = 1;

function createRoom(surfaceDefault = 0): Room {
  return {
    id: nextRoomId++,
    width: 5,
    length: 4,
    surfaceIndex: surfaceDefault,
    corners: 4,
    addonQuantities: new Map(),
    expandedCats: new Set(["lighting"]),
  };
}

function roomArea(r: Room) {
  return r.width * r.length;
}

function roomPerimeter(r: Room) {
  return 2 * (r.width + r.length);
}

function roomAddonsCost(r: Room, addonsList: Addon[]) {
  return Array.from(r.addonQuantities.entries()).reduce((cost, [index, qty]) => {
    return cost + addonsList[index].price * qty;
  }, 0);
}

function roomCornersCost(r: Room) {
  return Math.max(0, r.corners - 4) * 200;
}

function roomTotal(r: Room, surfaces: Surface[], addonsList: Addon[]) {
  const area = roomArea(r);
  const pricePerSqm = surfaces[r.surfaceIndex]?.price ?? 0;
  return area * pricePerSqm + roomCornersCost(r) + roomAddonsCost(r, addonsList);
}

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

interface CalculatorProps {
  surfaces: Surface[];
  addons: Addon[];
}

export default function Calculator({ surfaces, addons: addonsList }: CalculatorProps) {
  const router = useRouter();
  const d = useDict();
  const locale = useLocale();
  const kontaktHref = useLocalePath("/kontakt") + "#kontakt-formular";
  const [isOpen, setIsOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [rooms, setRooms] = useState<Room[]>(() => [createRoom()]);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  const room = rooms[activeRoomIndex];

  // Min/max price range for teaser
  const minPrice = useMemo(() => Math.min(...surfaces.map((s) => s.price)), [surfaces]);
  const maxPrice = useMemo(() => Math.max(...surfaces.map((s) => s.price)), [surfaces]);

  // Totals across all rooms
  const total = useMemo(
    () => rooms.reduce((sum, r) => sum + roomTotal(r, surfaces, addonsList), 0),
    [rooms, surfaces, addonsList]
  );
  const totalHigh = useMemo(
    () => Math.round(total * 1.2),
    [total]
  );
  const totalArea = useMemo(() => rooms.reduce((sum, r) => sum + roomArea(r), 0), [rooms]);

  const getAddonName = useCallback(
    (addon: Addon) => (locale === "en" ? addon.nameEn : addon.nameCz),
    [locale]
  );

  // ── Room mutations ──

  const updateRoom = useCallback((index: number, updater: (r: Room) => Room) => {
    setRooms((prev) => prev.map((r, i) => (i === index ? updater(r) : r)));
  }, []);

  const updateRoomDimensions = useCallback(
    (index: number, updater: (r: Room) => Room) => {
      setRooms((prev) =>
        prev.map((r, i) => {
          if (i !== index) return r;
          const oldPerimeter = roomPerimeter(r);
          const updated = updater(r);
          const newPerimeter = roomPerimeter(updated);
          if (oldPerimeter === newPerimeter) return updated;
          const nextAddons = new Map(updated.addonQuantities);
          for (const [addonIdx, qty] of Array.from(nextAddons.entries())) {
            if (addonsList[addonIdx].unit === "bm" && qty === oldPerimeter) {
              nextAddons.set(addonIdx, newPerimeter);
            }
          }
          return { ...updated, addonQuantities: nextAddons };
        })
      );
    },
    [addonsList]
  );

  const addRoom = useCallback(() => {
    setRooms((prev) => [...prev, createRoom()]);
    setActiveRoomIndex((prev) => prev + 1);
  }, []);

  const removeRoom = useCallback(
    (index: number) => {
      if (rooms.length <= 1) return;
      setRooms((prev) => prev.filter((_, i) => i !== index));
      setActiveRoomIndex((prev) => {
        if (prev >= rooms.length - 1) return Math.max(0, rooms.length - 2);
        if (prev > index) return prev - 1;
        return prev;
      });
    },
    [rooms.length]
  );

  const toggleAddon = useCallback(
    (addonIndex: number) => {
      updateRoom(activeRoomIndex, (r) => {
        const next = new Map(r.addonQuantities);
        if (next.has(addonIndex)) {
          next.delete(addonIndex);
        } else {
          next.set(addonIndex, 1);
        }
        return { ...r, addonQuantities: next };
      });
    },
    [activeRoomIndex, updateRoom, addonsList]
  );

  const setAddonQty = useCallback(
    (addonIndex: number, qty: number) => {
      updateRoom(activeRoomIndex, (r) => {
        const next = new Map(r.addonQuantities);
        if (qty <= 0) {
          next.delete(addonIndex);
        } else {
          next.set(addonIndex, qty);
        }
        return { ...r, addonQuantities: next };
      });
    },
    [activeRoomIndex, updateRoom]
  );

  const toggleCategory = useCallback(
    (cat: string) => {
      updateRoom(activeRoomIndex, (r) => {
        const next = new Set(r.expandedCats);
        if (next.has(cat)) next.delete(cat);
        else next.add(cat);
        return { ...r, expandedCats: next };
      });
    },
    [activeRoomIndex, updateRoom]
  );

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

  // Derived values for current room
  const area = roomArea(room);
  const perimeter = roomPerimeter(room);
  const widthPct = room.width;
  const lengthPct = room.length;
  const cornersPct = ((room.corners - 3) / (12 - 3)) * 100;

  // Wizard step labels
  const stepLabels = [
    d.calculator.step1,
    locale === "en" ? "Dimensions" : "Rozměry",
    locale === "en" ? "Corners" : "Rohy",
    d.calculator.step4,
  ];

  return (
    <>
      {/* ═══ COMPACT TEASER on homepage ═══ */}
      <section
        id="kalkulacka"
        className="py-16 lg:py-20 px-6 lg:px-10 bg-light-secondary border-b border-border"
      >
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                {/* Left - text */}
                <div className="flex-1">
                  <SectionEyebrow text={d.calculator.teaserEyebrow} />
                  <h2 className="font-display text-[clamp(22px,2.5vw,30px)] font-semibold leading-[1.2] text-heading mb-2">
                    {d.calculator.teaserTitle}
                  </h2>
                  <p className="text-body text-[13px] font-light leading-[1.7]">
                    {d.calculator.teaserText}
                  </p>
                </div>

                {/* Right - price indicator + CTA */}
                <div className="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
                  <div className="text-center lg:text-right">
                    <div className="text-muted text-[9px] tracking-[0.12em] uppercase mb-1">
                      {d.calculator.priceFrom}
                    </div>
                    <div className="font-display text-[32px] font-semibold text-accent leading-none tabular-nums">
                      {minPrice}{" "}
                      <span className="text-[14px] text-muted">
                        {d.calculator.currency}/{d.calculator.sqm}
                      </span>
                    </div>
                    <div className="text-muted text-[10px] mt-1">
                      {d.calculator.priceUpTo.replace("{max}", String(maxPrice))}
                    </div>
                  </div>
                  <button
                    onClick={() => { setWizardStep(0); setIsOpen(true); }}
                    className="btn-shimmer glow-accent bg-accent text-white text-[11px] font-medium tracking-[0.12em] uppercase px-7 py-3.5 hover:bg-accent-hover transition-colors duration-200 rounded-full whitespace-nowrap"
                  >
                    {d.calculator.ctaTeaser}
                  </button>
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
          style={{ animation: "calcFadeIn 0.22s ease forwards" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/88 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <div
            className="relative w-full max-w-[1300px] max-h-[100dvh] flex flex-col bg-white mx-4 my-4 lg:my-8 rounded-2xl shadow-2xl"
            style={{
              animation: "calcSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Header */}
            <div className="z-10 bg-white border-b border-border px-6 lg:px-10 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-display text-lg font-semibold text-heading">
                  {d.calculator.modalTitle}
                </h2>
                <p className="text-muted text-[11px]">{d.calculator.modalSubtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-heading hover:border-heading transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l10 10M11 1l-10 10" />
                </svg>
              </button>
            </div>

            {/* Body - two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
              {/* Left: Form — Wizard */}
              <div className="p-6 lg:p-8 lg:border-r lg:border-border flex flex-col">
                {/* ── Room tabs ── */}
                <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                  {rooms.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveRoomIndex(i)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                        i === activeRoomIndex
                          ? "bg-accent text-white shadow-sm"
                          : "bg-light-secondary/50 border border-border text-body hover:border-border-dark"
                      }`}
                    >
                      {locale === "en" ? `Room ${i + 1}` : `Místnost ${i + 1}`}
                      <span className={`text-[9px] ${i === activeRoomIndex ? "text-white/70" : "text-muted"}`}>
                        {roomArea(r)} {d.calculator.sqm}
                      </span>
                      {rooms.length > 1 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRoom(i);
                          }}
                          className={`ml-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] leading-none cursor-pointer transition-colors ${
                            i === activeRoomIndex
                              ? "hover:bg-white/20 text-white/60 hover:text-white"
                              : "hover:bg-border text-muted hover:text-heading"
                          }`}
                        >
                          ×
                        </span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={addRoom}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium border border-dashed border-border text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    + {locale === "en" ? "Add room" : "Přidat místnost"}
                  </button>
                </div>

                {/* ── Wizard step indicator ── */}
                <div className="flex items-center gap-1 mb-5">
                  {[1, 2, 3, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setWizardStep(s - 1)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 ${
                        wizardStep === s - 1
                          ? "bg-accent text-white"
                          : wizardStep > s - 1
                            ? "bg-accent/10 text-accent"
                            : "bg-light-secondary/50 text-muted"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-current/10 flex items-center justify-center text-[9px]">
                        {wizardStep > s - 1 ? "✓" : s}
                      </span>
                      <span className="hidden sm:inline">
                        {stepLabels[s - 1]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* ── Wizard step content ── */}
                <div className={`flex-1${wizardStep === 3 ? " overflow-y-auto" : ""}`}>

                  {/* Step 0: Surface */}
                  {wizardStep === 0 && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                          1
                        </span>
                        <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                          {d.calculator.step1}
                        </label>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {surfaces.map((s, i) => (
                          <button
                            key={s.name}
                            onClick={() =>
                              updateRoom(activeRoomIndex, (r) => ({ ...r, surfaceIndex: i }))
                            }
                            className={`border text-left px-2 py-2 sm:px-3 sm:py-2.5 transition-all duration-200 rounded-xl relative overflow-hidden ${
                              room.surfaceIndex === i
                                ? "border-accent bg-accent-soft shadow-sm"
                                : "border-border bg-light-secondary/50 hover:border-border-dark"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                              <div
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border flex-shrink-0"
                                style={{
                                  background: s.color,
                                  borderColor: room.surfaceIndex === i ? s.accent : "#ddd",
                                }}
                              />
                              <span
                                className={`text-[9px] sm:text-[11px] ${
                                  room.surfaceIndex === i ? "text-heading font-medium" : "text-body"
                                }`}
                              >
                                {s.name}
                              </span>
                            </div>
                            <span
                              className={`text-[8px] sm:text-[9px] ${
                                room.surfaceIndex === i ? "text-accent font-medium" : "text-muted"
                              }`}
                            >
                              {s.priceLabel}
                            </span>
                            {room.surfaceIndex === i && (
                              <div
                                className="absolute bottom-0 left-0 right-0 h-[2px]"
                                style={{ background: s.accent }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Room dimensions (width × length) */}
                  {wizardStep === 1 && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                          2
                        </span>
                        <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                          {locale === "en" ? "Room dimensions" : "Rozměry místnosti"}
                        </label>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {/* Width */}
                        <div className="bg-light-secondary/50 border border-border rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[11px] text-body">
                              {locale === "en" ? "Width" : "Šířka"}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.1}
                                value={room.width}
                                onChange={(e) => {
                                  const v = Math.min(100, Math.max(0, Number(e.target.value)));
                                  updateRoomDimensions(activeRoomIndex, (r) => ({
                                    ...r,
                                    width: +v.toFixed(1),
                                  }));
                                }}
                                className="w-16 text-right font-display text-sm text-accent border border-border rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-accent tabular-nums"
                              />
                              <span className="text-[11px] text-muted">m</span>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={0.1}
                              value={room.width}
                              onChange={(e) =>
                                updateRoomDimensions(activeRoomIndex, (r) => ({
                                  ...r,
                                  width: Number(e.target.value),
                                }))
                              }
                              className="calc-range w-full"
                            />
                            <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-border rounded-full pointer-events-none">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-100"
                                style={{ width: `${widthPct}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-muted text-[10px]">0 m</span>
                            <span className="text-muted text-[10px]">100 m</span>
                          </div>
                        </div>

                        {/* Length */}
                        <div className="bg-light-secondary/50 border border-border rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[11px] text-body">
                              {locale === "en" ? "Length" : "Délka"}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.1}
                                value={room.length}
                                onChange={(e) => {
                                  const v = Math.min(100, Math.max(0, Number(e.target.value)));
                                  updateRoomDimensions(activeRoomIndex, (r) => ({
                                    ...r,
                                    length: +v.toFixed(1),
                                  }));
                                }}
                                className="w-16 text-right font-display text-sm text-accent border border-border rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-accent tabular-nums"
                              />
                              <span className="text-[11px] text-muted">m</span>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={0.1}
                              value={room.length}
                              onChange={(e) =>
                                updateRoomDimensions(activeRoomIndex, (r) => ({
                                  ...r,
                                  length: Number(e.target.value),
                                }))
                              }
                              className="calc-range w-full"
                            />
                            <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-border rounded-full pointer-events-none">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-100"
                                style={{ width: `${lengthPct}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-muted text-[10px]">0 m</span>
                            <span className="text-muted text-[10px]">100 m</span>
                          </div>
                        </div>
                      </div>
                      {/* Computed area & perimeter */}
                      <div className="flex gap-4 mt-3 px-1">
                        <span className="text-[12px] text-heading font-medium">
                          {locale === "en" ? "Area" : "Plocha"}: <span className="text-accent font-semibold">{area} {d.calculator.sqm}</span>
                        </span>
                        <span className="text-[10px] text-muted self-center">
                          {locale === "en" ? "Perimeter" : "Obvod"}: <span className="text-body font-medium">{perimeter} bm</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Corners */}
                  {wizardStep === 2 && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                          3
                        </span>
                        <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                          {locale === "en" ? "Number of room corners" : "Počet rohů v místnosti"}
                        </label>
                      </div>
                      <div className="bg-light-secondary/50 border border-border rounded-xl p-4">
                        <div className="flex justify-between items-baseline mb-3">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-body">
                              {locale === "en" ? "Corners" : "Počet rohů"}
                            </span>
                            <span className="text-[9px] text-muted">
                              {locale === "en"
                                ? "Over 4 corners: 200 CZK/pc for each extra"
                                : "Nad 4 rohy: 200 Kč/ks za každý další"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateRoom(activeRoomIndex, (r) => ({
                                  ...r,
                                  corners: Math.max(3, r.corners - 1),
                                }))
                              }
                              className="w-6 h-6 flex items-center justify-center border border-border rounded-lg text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="font-display text-lg text-accent min-w-[2.5rem] text-center tabular-nums">
                              {room.corners}
                            </span>
                            <button
                              onClick={() =>
                                updateRoom(activeRoomIndex, (r) => ({
                                  ...r,
                                  corners: Math.min(12, r.corners + 1),
                                }))
                              }
                              className="w-6 h-6 flex items-center justify-center border border-border rounded-lg text-muted hover:border-accent hover:text-accent transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min={3}
                            max={12}
                            value={room.corners}
                            onChange={(e) =>
                              updateRoom(activeRoomIndex, (r) => ({
                                ...r,
                                corners: Number(e.target.value),
                              }))
                            }
                            className="calc-range w-full"
                          />
                          <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-border rounded-full pointer-events-none">
                            <div
                              className="h-full bg-accent rounded-full transition-all duration-100"
                              style={{ width: `${cornersPct}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-muted text-[10px]">3</span>
                          <span className="text-muted text-[10px]">12</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Addons */}
                  {wizardStep === 3 && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                          4
                        </span>
                        <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-heading">
                          {d.calculator.step4}
                        </label>
                      </div>
                      <div className="lg:columns-2 gap-2 space-y-2">
                        {CATEGORIES.map((cat, catIdx) => {
                          const catAddons = addonsList
                            .map((a, i) => ({ ...a, originalIndex: i }))
                            .filter((a) => a.category === cat);
                          const isExpanded = room.expandedCats.has(cat);
                          const selectedCount = catAddons.filter((a) =>
                            room.addonQuantities.has(a.originalIndex)
                          ).length;

                          return (
                            <div
                              key={cat}
                              className="border border-border rounded-xl overflow-hidden break-inside-avoid"
                            >
                              <button
                                onClick={() => toggleCategory(cat)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-light-secondary/30 hover:bg-light-secondary/60 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-medium text-heading tracking-[0.04em]">
                                    {d.calculator.categoryLabels[catIdx]}
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
                                  maxHeight: isExpanded ? `${catAddons.length * 52 + 8}px` : "0",
                                  opacity: isExpanded ? 1 : 0,
                                  overflow: "hidden",
                                }}
                              >
                                <div className="px-3 pb-3 flex flex-col gap-1">
                                  {catAddons.map((addon) => {
                                    const isActive = room.addonQuantities.has(addon.originalIndex);
                                    const qty = room.addonQuantities.get(addon.originalIndex) ?? 0;
                                    const unitLabel = addon.unit === "bm" ? "bm" : d.calculator.pcs;

                                    return (
                                      <div
                                        key={addon.nameCz}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-[11px] transition-all duration-200 ${
                                          isActive
                                            ? "bg-accent-soft border border-accent/30 text-heading"
                                            : "bg-light-secondary/50 border border-transparent text-body hover:bg-light-secondary"
                                        }`}
                                      >
                                        <div
                                          className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                                          onClick={() => toggleAddon(addon.originalIndex)}
                                        >
                                          <div
                                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                                              isActive ? "bg-accent border-accent" : "border-border bg-white"
                                            }`}
                                          >
                                            {isActive && (
                                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.5">
                                                <path d="M1.5 4l2 2 3-3.5" />
                                              </svg>
                                            )}
                                          </div>
                                          <span className="truncate">{getAddonName(addon)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          {/* Quantity/length stepper */}
                                          {isActive && (
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={() => setAddonQty(addon.originalIndex, qty - 1)}
                                                className="w-5 h-5 flex items-center justify-center border border-accent/30 rounded text-[10px] text-accent hover:bg-accent hover:text-white transition-colors"
                                              >
                                                −
                                              </button>
                                              <span className="text-[10px] font-medium text-accent min-w-[1.8rem] text-center tabular-nums">
                                                {qty} {unitLabel}
                                              </span>
                                              <button
                                                onClick={() => setAddonQty(addon.originalIndex, qty + 1)}
                                                className="w-5 h-5 flex items-center justify-center border border-accent/30 rounded text-[10px] text-accent hover:bg-accent hover:text-white transition-colors"
                                              >
                                                +
                                              </button>
                                            </div>
                                          )}
                                          <span
                                            className={`text-[10px] tabular-nums whitespace-nowrap ${
                                              isActive ? "text-accent font-medium" : "text-muted"
                                            }`}
                                          >
                                            {addon.price.toLocaleString("cs-CZ")} {d.calculator.currency}/{unitLabel}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* ── Wizard navigation (pinned at bottom) ── */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border flex-shrink-0">
                  <button
                    onClick={() => setWizardStep((s) => Math.max(0, s - 1))}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                      wizardStep === 0
                        ? "text-muted cursor-default opacity-40"
                        : "text-body border border-border hover:border-accent hover:text-accent"
                    }`}
                    disabled={wizardStep === 0}
                  >
                    ← {locale === "en" ? "Back" : "Zpět"}
                  </button>
                  <div className="text-[10px] text-muted">
                    {wizardStep + 1} / 4
                  </div>
                  {wizardStep < 3 ? (
                    <button
                      onClick={() => setWizardStep((s) => Math.min(3, s + 1))}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
                    >
                      {locale === "en" ? "Next" : "Další"} →
                    </button>
                  ) : (
                    <div className="w-[72px]" />
                  )}
                </div>
              </div>

              {/* Right: Sticky price summary */}
              <div className="p-6 lg:p-8 overflow-y-auto">
                <div
                  className="h-1.5 rounded-t-2xl -mx-6 lg:-mx-8 -mt-6 lg:-mt-8 mb-6"
                  style={{ background: surfaces[room.surfaceIndex]?.accent }}
                />

                <div className="border-b border-border pb-5 mb-5">
                  <div className="text-muted text-[10px] tracking-[0.14em] uppercase mb-2">
                    {d.calculator.orientPrice}
                    {rooms.length > 1 && ` (${rooms.length} ${locale === "en" ? "rooms" : "místnosti"})`}
                  </div>
                  <div className="font-display text-[38px] font-semibold text-accent leading-none tabular-nums">
                    <AnimatedPrice value={total} />{" "}
                    <span className="text-[15px] text-muted">{d.calculator.currency}</span>
                  </div>
                  <div className="text-[10px] text-muted mt-1.5">
                    {totalArea > 0 ? Math.round(total / totalArea).toLocaleString("cs-CZ") : 0} {d.calculator.pricePerSqm}
                  </div>
                  <div className="text-[10px] text-muted mt-1">
                    {locale === "en" ? "from" : "od"} {total.toLocaleString("cs-CZ")} {locale === "en" ? "to" : "až"} {totalHigh.toLocaleString("cs-CZ")} {d.calculator.currency}
                  </div>
                  <div className="text-[13px] font-semibold text-accent mt-2.5">
                    {locale === "en" ? "Prices are listed without VAT." : "Ceny jsou uvedeny bez DPH."}
                  </div>
                </div>

                {/* Breakdown per room */}
                <div className="flex flex-col gap-3 mb-5">
                  {rooms.map((r, ri) => {
                    const rArea = roomArea(r);
                    const rSurface = surfaces[r.surfaceIndex];
                    const rCornersCost = roomCornersCost(r);
                    const rTotal = roomTotal(r, surfaces, addonsList);

                    return (
                      <div key={r.id} className={rooms.length > 1 ? "border-b border-border pb-3 last:border-0" : ""}>
                        {rooms.length > 1 && (
                          <div className="text-[10px] font-medium text-heading mb-1.5">
                            {locale === "en" ? `Room ${ri + 1}` : `Místnost ${ri + 1}`}
                          </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-muted">{d.calculator.surface}</span>
                            <span className="text-body font-medium">{rSurface?.name}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-muted">{d.calculator.area}</span>
                            <span className="text-body">
                              {r.width} × {r.length} m = {rArea} {d.calculator.sqm}
                            </span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-muted">{d.calculator.materialInstall}</span>
                            <span className="text-body">
                              {(rArea * (rSurface?.price ?? 0)).toLocaleString("cs-CZ")} {d.calculator.currency}
                            </span>
                          </div>
                          {r.corners > 4 && (
                            <div className="flex justify-between text-[11px]">
                              <span className="text-muted">
                                {locale === "en"
                                  ? `Corners (${r.corners}×, ${r.corners - 4} extra)`
                                  : `Rohy (${r.corners}×, ${r.corners - 4} navíc)`}
                              </span>
                              <span className="text-body">
                                {rCornersCost.toLocaleString("cs-CZ")} {d.calculator.currency}
                              </span>
                            </div>
                          )}
                          {/* Individual addon lines */}
                          {Array.from(r.addonQuantities.entries()).map(([addonIdx, qty]) => {
                            const addon = addonsList[addonIdx];
                            const lineCost = addon.price * qty;
                            const detail =
                              addon.unit === "bm"
                                ? `${qty} bm × ${addon.price}`
                                : `${qty}× ${addon.price}`;
                            return (
                              <div key={addonIdx} className="flex justify-between text-[11px]">
                                <span className="text-muted truncate mr-2">
                                  {getAddonName(addon)} ({detail})
                                </span>
                                <span className="text-body whitespace-nowrap">
                                  {lineCost.toLocaleString("cs-CZ")} {d.calculator.currency}
                                </span>
                              </div>
                            );
                          })}
                          {rooms.length > 1 && (
                            <div className="flex justify-between text-[11px] pt-1 border-t border-border/50">
                              <span className="text-muted font-medium">
                                {locale === "en" ? "Subtotal" : "Mezisoučet"}
                              </span>
                              <span className="text-body font-medium">
                                {rTotal.toLocaleString("cs-CZ")} {d.calculator.currency}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    const roomLines = rooms.map((r, ri) => {
                      const rArea = roomArea(r);
                      const rPerimeter = roomPerimeter(r);
                      const rSurface = surfaces[r.surfaceIndex];
                      const rCornersCost = roomCornersCost(r);
                      const addonLines = Array.from(r.addonQuantities.entries()).map(
                        ([addonIdx, qty]) => {
                          const addon = addonsList[addonIdx];
                          const unitLabel = addon.unit === "bm" ? `${qty} bm` : `${qty}×`;
                          return `  - ${getAddonName(addon)}: ${unitLabel} × ${addon.price} = ${(addon.price * qty).toLocaleString("cs-CZ")} ${d.calculator.currency}`;
                        }
                      );
                      const header = rooms.length > 1 ? `\n${locale === "en" ? `Room ${ri + 1}` : `Místnost ${ri + 1}`}:\n` : "";
                      return [
                        header,
                        `${d.calculator.surface}: ${rSurface?.name} (${rSurface?.price} ${d.calculator.currency}/${d.calculator.sqm})`,
                        `${locale === "en" ? "Dimensions" : "Rozměry"}: ${r.width} × ${r.length} m (${rArea} ${d.calculator.sqm}, ${locale === "en" ? "perimeter" : "obvod"} ${rPerimeter} bm)`,
                        rCornersCost > 0
                          ? `${locale === "en" ? "Corners" : "Rohy"}: ${r.corners} (${r.corners - 4} ${locale === "en" ? "extra" : "navíc"}, ${rCornersCost} ${d.calculator.currency})`
                          : "",
                        ...addonLines,
                      ]
                        .filter(Boolean)
                        .join("\n");
                    });

                    const lines = [
                      ...roomLines,
                      `\n${d.calculator.orientPrice}: ${locale === "en" ? "from" : "od"} ${total.toLocaleString("cs-CZ")} ${locale === "en" ? "to" : "až"} ${totalHigh.toLocaleString("cs-CZ")} ${d.calculator.currency}`,
                    ].join("\n");

                    const roomSummary = rooms
                      .map((r) => `${surfaces[r.surfaceIndex]?.name}, ${roomArea(r)} ${d.calculator.sqm}`)
                      .join(" + ");

                    const params = new URLSearchParams({
                      room: roomSummary,
                      message: `${d.calculator.enquiryPrefix}\n${lines}`,
                    });
                    setIsOpen(false);
                    router.push(`${kontaktHref}?${params.toString()}`);
                  }}
                  className="btn-shimmer glow-accent block w-full bg-accent text-white text-[11px] font-medium tracking-[0.12em] uppercase py-4 text-center hover:bg-accent-hover transition-colors duration-200 rounded-full"
                >
                  {d.calculator.ctaSubmit}
                </button>
                <p className="text-muted text-[9px] text-center mt-2.5 leading-[1.5]">
                  {d.calculator.ctaNote}
                </p>
                <p className="text-muted text-[8px] text-center mt-1.5 leading-[1.5]">
                  {locale === "en"
                    ? "Special requirements need an individual quote."
                    : "Speciální požadavky vyžadují individuální cenovou nabídku."}
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent("openStropKecka"));
                  }}
                  className="block w-full text-center text-[11px] text-accent hover:underline mt-3 transition-colors"
                >
                  {locale === "en" ? "Not sure what to choose? We'll help!" : "Nevíte co vybrat? Poradíme!"}
                </button>
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
          margin-top: -7.5px;
          background: white;
          border: 2px solid #847631;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .calc-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(132, 118, 49, 0.3);
        }
        .calc-range::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(132, 118, 49, 0.4);
        }
        .calc-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 2px solid #847631;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
        .calc-range::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(132, 118, 49, 0.3);
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
