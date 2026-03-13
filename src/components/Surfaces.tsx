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

    // Center the detail card above the clicked card
    const cardCenterX = cRect.left - sRect.left + cRect.width / 2;
    const cardTopY = cRect.top - sRect.top;

    setDetailPos({ x: cardCenterX, y: cardTopY });
    setSelected(index);
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const closeDetail = useCallback(() => setSelected(null), []);
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
                    ref={(el) => { cardRefs.current[i] = el; }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleCardClick(i)}
                    className="cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 250ms ease",
                      transform: isSelected
                        ? "scale(1.08) translateZ(25px)"
                        : isHovered
                          ? "scale(1.06) translateZ(20px)"
                          : isDimmed || (isOpen && !isSelected)
                            ? "scale(0.97) translateZ(-8px)"
                            : "scale(1) translateZ(0)",
                      opacity: (isDimmed || (isOpen && !isSelected)) ? 0.4 : 1,
                      zIndex: isSelected ? 20 : isHovered ? 10 : 1,
                      position: "relative",
                    }}
                  >
                    <div
                      className={`bg-white border rounded-sm overflow-hidden transition-colors duration-200 ${
                        isSelected
                          ? "border-accent shadow-lg"
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
                          className="text-[10px] tracking-[0.05em] transition-colors duration-200"
                          style={{
                            color: isHovered || isSelected ? surface.accent : undefined,
                            fontWeight: isHovered || isSelected ? 500 : 400,
                          }}
                        >
                          {surface.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backdrop */}
          {isOpen && (
            <div
              onClick={closeDetail}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(2px)",
              }}
            />
          )}

          {/* Detail card - fixed size, positioned near clicked card */}
          {selected !== null && detailPos && (
            <div
              className="absolute z-50"
              style={{
                left: `clamp(0px, ${detailPos.x - 140}px, calc(100% - 280px))`,
                bottom: `calc(100% - ${detailPos.y}px + 8px)`,
                width: 280,
                animation: "detailAppear 280ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards",
              }}
            >
              <div
                className="bg-white border border-accent/30 rounded-sm overflow-hidden"
                style={{
                  boxShadow: "0 16px 48px -8px rgba(0,0,0,0.18), 0 4px 16px -4px rgba(46,204,113,0.12)",
                }}
              >
                {/* Close */}
                <button
                  onClick={(e) => { e.stopPropagation(); closeDetail(); }}
                  className="absolute top-2.5 right-2.5 z-10 w-5 h-5 flex items-center justify-center rounded-full bg-white border border-border text-muted hover:text-heading hover:border-border-dark transition-colors"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l6 6M7 1l-6 6" />
                  </svg>
                </button>

                {/* Color preview */}
                <div
                  className="h-16 relative overflow-hidden"
                  style={{ background: surfaces[selected].color }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: surfaces[selected].accent }}
                  />
                </div>

                {/* Content */}
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

                {/* Arrow pointing down to card */}
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-accent/30 rotate-45"
                />
              </div>
            </div>
          )}
        </div>
      </RevealOnScroll>

      <style jsx>{`
        @keyframes detailAppear {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
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
