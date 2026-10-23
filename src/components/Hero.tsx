"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useDict, useLocalePath } from "@/i18n/LocaleContext";

function formatValue(value: number, target: number, suffix: string, decimals: boolean) {
  if (target === 200 && value >= 200) return "200+";
  if (decimals) return (value).toFixed(1).replace(".", ",");
  return Math.round(value) + suffix;
}

function useCounter(target: number, suffix: string, decimals: boolean, delay: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set final value immediately as fallback
    el.textContent = formatValue(target, target, suffix, decimals);

    // Then animate from 0
    el.textContent = decimals ? "0,0" : "0";

    const timer = setTimeout(() => {
      const dur = 1800;
      const start = performance.now();

      function update(now: number) {
        const p = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        const current = e * target;

        el!.textContent = formatValue(current, target, suffix, decimals);

        if (p < 1) {
          animRef.current = requestAnimationFrame(update);
        }
      }

      animRef.current = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
      // Ensure final value is set on cleanup
      if (el) el.textContent = formatValue(target, target, suffix, decimals);
    };
  }, [target, suffix, decimals, delay]);

  return ref;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const d = useDict();

  const s1 = useCounter(200, "", false, 1500);
  const s2 = useCounter(12, " let", false, 1600);
  const s3 = useCounter(5.0, "", true, 1700);

  const refHref = useLocalePath("/reference");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#F7F4EE" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-[92px] pb-12 lg:pt-28 lg:pb-16 min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-14 items-center">
        {/* Photo: real realization (HHSPA wellness, starry sky ceiling).
            On mobile it sits on top as a wide banner. */}
        <div
          className={`relative order-1 lg:order-2 w-full overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto lg:h-[min(76dvh,720px)] transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s", boxShadow: "0 30px 60px -30px rgba(60,50,20,0.35)" }}
        >
          <Image
            src="/images/hero-kitchen.jpg"
            alt={d.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>

        {/* Copy */}
        <div className="order-2 lg:order-1 flex flex-col items-start text-left">
          <div
            className={`flex items-center gap-3 mb-5 lg:mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="w-8 h-px bg-accent" />
            <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-accent">
              {d.hero.eyebrow}
            </span>
          </div>

          <h1
            className={`font-display font-bold leading-[1.08] tracking-tight mb-5 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "0.55s",
              fontSize: "clamp(36px, 3.9vw, 54px)",
              color: "#161512",
            }}
          >
            {d.hero.title1}{" "}
            {d.hero.title2.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="italic text-accent pb-1">
              {d.hero.title2.split(" ").pop()}
            </em>{" "}
            {d.hero.title3}.
          </h1>

          <p
            className={`leading-[1.7] mb-8 lg:mb-10 transition-all duration-700 text-[16px] lg:text-[17px] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.7s", color: "#4a4740", maxWidth: 500 }}
          >
            {d.hero.subtitle}
          </p>

          <div
            className={`flex flex-wrap items-center gap-x-6 gap-y-4 mb-10 lg:mb-14 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.85s" }}
          >
            <a
              href="#povrchy"
              className="bg-accent text-white text-[13px] font-semibold tracking-[0.06em] uppercase px-7 py-4 rounded-full hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              {d.hero.cta}
            </a>
            <a
              href={refHref}
              className="flex items-center gap-2.5 text-[14px] font-medium group transition-colors duration-200 text-heading hover:text-accent whitespace-nowrap"
            >
              <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
              {d.hero.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 w-full max-w-[520px] pt-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "1s",
              borderTop: "1px solid rgba(132,118,49,0.22)",
            }}
          >
            {[
              { ref: s1, label: d.hero.stat1Label },
              { ref: s2, label: d.hero.stat3Label },
              { ref: s3, label: d.hero.stat2Label },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[26px] lg:text-[34px] font-semibold leading-none mb-1.5 text-heading">
                  <span ref={stat.ref}>0</span>
                </div>
                <div className="text-[12px] lg:text-[13px] leading-snug" style={{ color: "#6b675e" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
