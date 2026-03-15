"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { surfaces } from "@/data/products";

export default function Surfaces() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [detailPos, setDetailPos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = useCallback((index: number) => {
    if (selected === index) {
      setSelected(null);
      return;
    }
    const card = cardRefs.current[index];
    const section = sectionRef.current;
    if (!card || !section) return;

    const cRect = card.getBoundingClientRect();
    const sRect = section.getBoundingClientRect();

    setDetailPos({
      x: cRect.left - sRect.left + cRect.width / 2,
      y: cRect.top - sRect.top,
    });
    setSelected(index);
  }, [selected]);

  // Close on Escape or click outside
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-surface-detail]") && !target.closest("[data-surface-card]")) {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [selected]);

  const isOpen = selected !== null;

  return (
    <section className="bg-light-secondary border-y border-border py-8 px-6 lg:px-10">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto relative" ref={sectionRef}>
          <div className="flex items-center justify-between mb-5">
            <span className="text-muted text-[10px] tracking-[0.16em] uppercase">
              Výběr povrchu
            </span>
            <a
              href="/sluzby"
              className="text-accent text-[10px] tracking-[0.1em] uppercase hover:text-accent-hover transition-colors"
            >
              Zobrazit vše
            </a>
          </div>

          <div style={{ perspective: "1000px" }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {surfaces.map((surface, i) => {
                const isHovered = hovered === i && !isOpen;
                const hasHover = hovered !== null && !isOpen;
                const isDimmed = hasHover && !isHovered;
                const isSelected = selected === i;

                return (
                  <div
                    key={surface.name}
                    data-surface-card
                    ref={(el) => { cardRefs.current[i] = el; }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={(e) => { e.stopPropagation(); handleCardClick(i); }}
                    className="cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 250ms ease",
                      transform: isSelected
                        ? "scale(1.1) translateZ(30px)"
                        : isHovered
                          ? "scale(1.06) translateZ(20px)"
                          : isDimmed
                            ? "scale(0.97) translateZ(-8px)"
                            : "scale(1) translateZ(0)",
                      opacity: isDimmed ? 0.5 : 1,
                      zIndex: isSelected ? 20 : isHovered ? 10 : 1,
                      position: "relative",
                    }}
                  >
                    <div
                      className={`bg-white border rounded-sm overflow-hidden transition-all duration-200 ${
                        isSelected
                          ? "border-accent shadow-xl"
                          : isHovered
                            ? "border-accent/50 shadow-md"
                            : "border-border"
                      }`}
                    >
                      <div
                        className="h-14 relative overflow-hidden"
                        style={{ background: surface.color }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 origin-left"
                          style={{
                            background: surface.accent,
                            opacity: isHovered || isSelected ? 1 : 0,
                            transform: isHovered || isSelected ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700"
                          style={{
                            transform: isHovered || isSelected ? "translateX(100%)" : "translateX(-100%)",
                          }}
                        />
                      </div>
                      <div className="px-2.5 py-2">
                        <span
                          className="text-[10px] tracking-[0.05em] transition-colors duration-200 block"
                          style={{
                            color: isHovered || isSelected ? surface.accent : undefined,
                            fontWeight: isHovered || isSelected ? 500 : 400,
                          }}
                        >
                          {surface.name}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[8px] tracking-[0.04em] transition-all duration-250 overflow-hidden"
                          style={{
                            color: surface.accent,
                            opacity: isHovered && !isSelected ? 1 : 0,
                            maxHeight: isHovered && !isSelected ? "16px" : "0",
                            marginTop: isHovered && !isSelected ? "2px" : "0",
                          }}
                        >
                          <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="5" cy="5" r="4" />
                            <path d="M5 3.5v1.5M5 6.5v.01" />
                          </svg>
                          Zobrazit detail
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail tooltip - pops up above card, no backdrop */}
          {selected !== null && detailPos && (
            <div
              data-surface-detail
              className="absolute z-50"
              style={{
                left: `clamp(0px, ${detailPos.x - 140}px, calc(100% - 280px))`,
                bottom: `calc(100% - ${detailPos.y}px + 8px)`,
                width: 280,
                animation: "detailPop 250ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards",
              }}
            >
              <div
                className="bg-white border border-accent/40 rounded-sm overflow-hidden relative"
                style={{
                  boxShadow: "0 12px 40px -8px rgba(0,0,0,0.15), 0 4px 12px -4px rgba(197,165,90,0.12)",
                }}
              >
                {/* Close */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                  className="absolute top-2 right-2 z-10 w-5 h-5 flex items-center justify-center rounded-full bg-white border border-border text-muted hover:text-heading transition-colors"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l6 6M7 1l-6 6" />
                  </svg>
                </button>

                {/* Color preview */}
                <div
                  className="h-14 relative overflow-hidden"
                  style={{ background: surfaces[selected].color }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: surfaces[selected].accent }}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="font-display text-[13px] font-semibold text-heading">
                      {surfaces[selected].name}
                    </h4>
                    <span
                      className="text-[9px] font-medium tracking-wide"
                      style={{ color: surfaces[selected].accent }}
                    >
                      {surfaces[selected].priceLabel}
                    </span>
                  </div>

                  <p className="text-body text-[10px] leading-[1.65] font-light mb-2.5">
                    {surfaces[selected].description}
                  </p>

                  <ul className="flex flex-col gap-1">
                    {surfaces[selected].features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[9px] text-muted">
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: surfaces[selected].accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow pointing down */}
                <div
                  className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-accent/40 rotate-45"
                />
              </div>
            </div>
          )}
        </div>
      </RevealOnScroll>

      <style jsx>{`
        @keyframes detailPop {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
