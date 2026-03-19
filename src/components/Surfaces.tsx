"use client";

import { useState, useEffect } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { surfaces } from "@/data/products";

export default function Surfaces() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const isOpen = selected !== null;

  // Close on Escape or click outside
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-surface-card]")) {
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

  const handleCardClick = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <section className="bg-light-secondary border-y border-border py-8 px-6 lg:px-10">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
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

          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
            {surfaces.map((surface, i) => {
              const isHovered = hovered === i && !isOpen;
              const hasHover = hovered !== null && !isOpen;
              const isDimmed = isOpen && selected !== i;
              const isSelected = selected === i;

              return (
                <div
                  key={surface.name}
                  data-surface-card
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => { e.stopPropagation(); handleCardClick(i); }}
                  className="cursor-pointer"
                  style={{
                    width: isSelected ? 380 : 130,
                    transition: "width 400ms cubic-bezier(0.34, 1, 0.64, 1), opacity 300ms ease, transform 300ms ease, filter 300ms ease",
                    opacity: isDimmed ? 0.35 : 1,
                    transform: isDimmed
                      ? "scale(0.95)"
                      : isHovered && !isOpen
                        ? "scale(1.04)"
                        : "scale(1)",
                    filter: isDimmed ? "blur(1px)" : "none",
                    flexShrink: 0,
                  }}
                >
                  <div
                    className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 h-full ${
                      isSelected
                        ? "border-accent shadow-xl"
                        : isHovered
                          ? "border-accent/50 shadow-md"
                          : hasHover && !isDimmed
                            ? "border-border"
                            : "border-border"
                    }`}
                  >
                    {/* Color preview bar */}
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

                    {/* Card content */}
                    <div className="px-3 py-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className="text-[11px] tracking-[0.05em] transition-colors duration-200 font-medium whitespace-nowrap"
                          style={{
                            color: isHovered || isSelected ? surface.accent : undefined,
                          }}
                        >
                          {surface.name}
                        </span>
                        {isSelected && (
                          <span
                            className="text-[9px] font-medium tracking-wide whitespace-nowrap"
                            style={{ color: surface.accent }}
                          >
                            {surface.priceLabel}
                          </span>
                        )}
                      </div>

                      {/* Expanded detail */}
                      <div
                        className="overflow-hidden transition-all duration-400"
                        style={{
                          maxHeight: isSelected ? 200 : 0,
                          opacity: isSelected ? 1 : 0,
                          marginTop: isSelected ? 8 : 0,
                        }}
                      >
                        <p className="text-body text-[10px] leading-[1.65] font-light mb-2.5">
                          {surface.description}
                        </p>
                        <ul className="flex flex-col gap-1">
                          {surface.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-[9px] text-muted">
                              <div
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: surface.accent }}
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Hover hint */}
                      {!isSelected && (
                        <span
                          className="flex items-center gap-1 text-[8px] tracking-[0.04em] transition-all duration-250 overflow-hidden"
                          style={{
                            color: surface.accent,
                            opacity: isHovered ? 1 : 0,
                            maxHeight: isHovered ? "16px" : "0",
                            marginTop: isHovered ? "2px" : "0",
                          }}
                        >
                          <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="5" cy="5" r="4" />
                            <path d="M5 3.5v1.5M5 6.5v.01" />
                          </svg>
                          Zobrazit detail
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
