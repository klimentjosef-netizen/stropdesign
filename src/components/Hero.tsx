"use client";

import { useEffect, useState, useRef } from "react";
import StarlightCanvas from "./StarlightCanvas";
import { useDict, useLocalePath } from "@/i18n/LocaleContext";

function useCounter(target: number, suffix: string, decimals: boolean, delay: number) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      const dur = 1800;
      const start = performance.now();

      function update(now: number) {
        const p = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);

        if (decimals) {
          el!.textContent = (e * target).toFixed(1);
        } else {
          el!.textContent = Math.round(e * target) + suffix;
        }
        if (target === 150 && p >= 1) el!.textContent = "150+";
        if (p < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, suffix, decimals, delay]);

  return ref;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const d = useDict();

  const s1 = useCounter(150, "", false, 1500);
  const s2 = useCounter(12, " let", false, 1600);
  const s3 = useCounter(5.0, "", true, 1700);

  const refHref = useLocalePath("/reference");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100vh", background: "#F7F4EE" }}
    >
      {/* Dot grid */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[2s] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.048) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          zIndex: 0,
        }}
      />

      {/* Canvas lines */}
      <StarlightCanvas />

      {/* Center content */}
      <div
        className="relative flex flex-col items-center text-center px-8"
        style={{ zIndex: 10, maxWidth: 720 }}
      >
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3.5 mb-7 transition-all duration-800 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="w-10 h-px bg-accent" />
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--gold, #A8935A)" }}
          >
            {d.hero.eyebrow}
          </span>
          <div className="w-10 h-px bg-accent" />
        </div>

        {/* Heading */}
        <h1
          className={`font-display font-bold leading-[1.06] tracking-tight mb-5 transition-all duration-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.7s",
            fontSize: "clamp(48px, 5.5vw, 82px)",
            color: "#111",
          }}
        >
          {d.hero.title1}
          <br />
          {d.hero.title2.split(" ").slice(0, -1).join(" ")}{" "}
          <em className="italic text-accent">
            {d.hero.title2.split(" ").pop()}
          </em>
          <br />
          {d.hero.title3}.
        </h1>

        {/* Subtitle */}
        <p
          className={`font-light leading-[1.8] mb-10 transition-all duration-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.9s",
            fontSize: 14,
            color: "#666",
            maxWidth: 480,
          }}
        >
          {d.hero.subtitle}
        </p>

        {/* CTAs */}
        <div
          className={`flex items-center gap-5 mb-16 transition-all duration-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "1.1s" }}
        >
          <a
            href="#kalkulacka"
            className="btn-shimmer glow-accent bg-accent text-white text-[10.5px] font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200"
          >
            {d.hero.cta}
          </a>
          <a
            href={refHref}
            className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.06em] group transition-colors duration-200"
            style={{ color: "#999" }}
          >
            <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
            <span className="group-hover:text-accent transition-colors duration-200">
              {d.hero.ctaSecondary}
            </span>
          </a>
        </div>

        {/* Stats */}
        <div
          className={`flex gap-0 w-full justify-center pt-7 transition-all duration-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "1.3s",
            borderTop: "1px solid rgba(168,147,90,0.18)",
          }}
        >
          {[
            { ref: s1, label: d.hero.stat1Label },
            { ref: s2, label: d.hero.stat3Label },
            { ref: s3, label: d.hero.stat2Label },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className="px-10"
              style={{
                borderRight: i < arr.length - 1 ? "1px solid rgba(168,147,90,0.15)" : "none",
              }}
            >
              <div
                className="font-display text-[34px] font-semibold leading-none mb-1"
                style={{ color: "#111" }}
              >
                <span ref={stat.ref}>0</span>
              </div>
              <div
                className="text-[9px] font-semibold tracking-[0.15em] uppercase"
                style={{ color: "#bbb" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "2.2s", zIndex: 10 }}
      >
        <div
          className="w-px h-7 animate-pulse"
          style={{
            background: "linear-gradient(to bottom, rgba(168,147,90,0.4), transparent)",
          }}
        />
        <span
          className="text-[8.5px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "rgba(168,147,90,0.35)" }}
        >
          {d.hero.scroll}
        </span>
      </div>
    </section>
  );
}
