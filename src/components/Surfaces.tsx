"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { surfaces } from "@/data/products";

export default function Surfaces() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = useCallback((index: number) => {
    if (selected === index) {
      setSelected(null);
      setCardRect(null);
      return;
    }
    const card = cardRefs.current[index];
    const section = sectionRef.current;
    if (!card || !section) return;

    const cRect = card.getBoundingClientRect();
    const sRect = section.getBoundingClientRect();

    setCardRect({
      ...cRect,
      x: cRect.left - sRect.left,
      y: cRect.top - sRect.top,
    } as DOMRect);
    setSelected(index);
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setCardRect(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const closeDetail = useCallback(() => {
    setSelected(null);
    setCardRect(null);
  }, []);

  const isOpen = selected !== null;

  return (
    <section className="bg-light-secondary border-y border-border py-8 px-6 lg:px-10">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto" ref={sectionRef}>
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

          {/* Grid with perspective */}
          <div style={{ perspective: "1000px" }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {surfaces.map((surface, i) => {
                const isHovered = hovered === i && selected === null;
                const hasHover = hovered !== null && selected === null;
                const isDimmed = hasHover && !isHovered;

                return (
                  <div
                    key={surface.name}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleCardClick(i)}
                    className="cursor-pointer relative"
                    style={{
                      transformStyle: "preserve-3d",
                      transition:
                        "transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 250ms ease, box-shadow 280ms ease",
                      transform: isHovered
                        ? "scale(1.06) translateZ(20px)"
                        : isDimmed
                          ? "scale(0.97) translateZ(-8px)"
                          : "scale(1) translateZ(0)",
                      opacity: isDimmed ? 0.5 : isOpen ? 0.6 : 1,
                      zIndex: isHovered ? 10 : 1,
                    }}
                  >
                    <div
                      className={`bg-white border rounded-sm overflow-hidden transition-colors duration-250 ${
                        isHovered
                          ? "border-accent/50 shadow-lg"
                          : "border-border"
                      }`}
                    >
                      {/* Surface color */}
                      <div
                        className="h-14 relative overflow-hidden"
                        style={{ background: surface.color }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 origin-left"
                          style={{
                            background: surface.accent,
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700"
                          style={{
                            transform: isHovered
                              ? "translateX(100%)"
                              : "translateX(-100%)",
                          }}
                        />
                      </div>

                      {/* Label */}
                      <div className="px-2.5 py-2">
                        <span
                          className="text-[10px] tracking-[0.05em] transition-colors duration-250"
                          style={{
                            color: isHovered ? surface.accent : undefined,
                            fontWeight: isHovered ? 500 : 400,
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
          <div
            onClick={closeDetail}
            className="fixed inset-0 z-40 transition-all duration-300"
            style={{
              background: isOpen ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
              pointerEvents: isOpen ? "auto" : "none",
              backdropFilter: isOpen ? "blur(2px)" : "blur(0px)",
            }}
          />

          {/* Expanded detail card */}
          {selected !== null && cardRect && (
            <div
              className="absolute z-50"
              style={{
                top: cardRect.y,
                left: cardRect.x,
                width: cardRect.width,
                animation: "cardExpand 350ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards",
              }}
            >
              <div
                className="bg-white border border-accent/30 rounded-sm overflow-hidden"
                style={{
                  boxShadow: "0 20px 60px -10px rgba(0,0,0,0.2), 0 8px 20px -6px rgba(46,204,113,0.15)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={(e) => { e.stopPropagation(); closeDetail(); }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 border border-border text-muted hover:text-heading hover:border-border-dark transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l8 8M9 1l-8 8" />
                  </svg>
                </button>

                {/* Color bar */}
                <div
                  className="h-20 relative overflow-hidden"
                  style={{ background: surfaces[selected].color }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: surfaces[selected].accent }}
                  />
                  {/* Animated sheen */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{
                      animation: "sheenSweep 1.2s ease-out 0.3s forwards",
                      transform: "translateX(-100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h4 className="font-display text-base font-semibold text-heading">
                      {surfaces[selected].name}
                    </h4>
                    <span
                      className="text-[10px] font-medium tracking-wide"
                      style={{ color: surfaces[selected].accent }}
                    >
                      {surfaces[selected].priceLabel}
                    </span>
                  </div>

                  <p className="text-body text-[11px] leading-[1.7] font-light mb-3">
                    {surfaces[selected].description}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {surfaces[selected].features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-[10px] text-muted"
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: surfaces[selected].accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </RevealOnScroll>

      <style jsx>{`
        @keyframes cardExpand {
          from {
            transform: scale(1) translateZ(0);
            opacity: 0.8;
          }
          to {
            transform: scale(2.8) translateZ(40px);
            opacity: 1;
          }
        }
        @keyframes sheenSweep {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
