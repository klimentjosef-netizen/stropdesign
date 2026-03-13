"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CeilingAnimation from "./CeilingAnimation";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left content */}
      <div className="relative flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-24 z-10">
        {/* Animated dot grid background */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-[2s] ${
            loaded ? "opacity-20" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle, #222 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative">
          {/* Eyebrow with line grow animation */}
          <div
            className={`flex items-center gap-3 mb-7 transition-all duration-700 ${
              loaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className={`h-px bg-accent ${loaded ? "animate-line-grow w-8" : "w-0"}`}
                 style={{ animationDelay: "0.4s" }} />
            <span className="text-accent text-[10px] font-medium tracking-[0.2em] uppercase">
              Ostrava a okolí
            </span>
          </div>

          {/* Heading with staggered word reveal */}
          <h1 className="font-display text-[clamp(36px,4.5vw,58px)] font-bold leading-[1.08] tracking-tight mb-6">
            <span
              className={`inline-block transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              Napínané stropy,
            </span>
            <br />
            <span
              className={`inline-block transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.55s" }}
            >
              které{" "}
              <em className="italic text-gradient">promění</em>
            </span>
            <br />
            <span
              className={`inline-block transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.7s" }}
            >
              váš interiér.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-muted text-[15px] leading-[1.75] max-w-[420px] mb-10 font-light transition-all duration-700 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            Designové stropní podhledy formou napínaných stropů. Precizní
            montáž, široký výběr povrchů a dlouhá životnost bez kompromisů.
          </p>

          {/* Actions */}
          <div
            className={`flex flex-wrap items-center gap-6 mb-14 transition-all duration-700 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1.05s" }}
          >
            <Link
              href="/kontakt"
              className="btn-shimmer glow-accent bg-accent text-primary text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 whitespace-nowrap"
            >
              Nezávazná poptávka
            </Link>
            <Link
              href="/reference"
              className="text-faint text-[12px] tracking-[0.06em] flex items-center gap-2 hover:text-white transition-colors duration-200 group"
            >
              <span className="block w-5 h-px bg-current group-hover:w-8 transition-all duration-300" />
              Prohlédnout reference
            </Link>
          </div>

          {/* Stats with counter animation */}
          <div className="flex gap-8">
            {[
              { n: "200+", label: "Realizací", delay: "1.2s" },
              { n: "7 dní", label: "Montáž", delay: "1.35s" },
              { n: "5,0", label: "Hodnocení", delay: "1.5s" },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex gap-8">
                <div
                  className={`flex flex-col gap-1 transition-all duration-600 ${
                    loaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <span className="font-display text-[28px] font-semibold leading-none">
                    {stat.n}
                  </span>
                  <span className="text-faint text-[11px] tracking-[0.06em] uppercase">
                    {stat.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className={`w-px self-stretch transition-all duration-700 ${
                      loaded ? "bg-white/10 scale-y-100" : "bg-transparent scale-y-0"
                    }`}
                    style={{ transitionDelay: stat.delay }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right visual panel - CEILING STRETCH ANIMATION */}
      <div className="relative hidden lg:block bg-navy overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-[#1a1428]" />

        {/* Fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />

        {/* Canvas ceiling animation */}
        <CeilingAnimation />

        {/* Pulsing glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full z-[5] animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(46,204,113,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30">
          <div
            className={`w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "4s" }}
          />
        </div>
      </div>
    </section>
  );
}
