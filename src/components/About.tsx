"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict } from "@/i18n/LocaleContext";

export default function About() {
  const d = useDict();

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <RevealOnScroll>
          <SectionEyebrow text={d.about.eyebrow} />
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-5 text-heading">
            {d.about.title}
          </h2>
          <p className="text-body text-sm leading-[1.8] font-light mb-6">
            {d.about.subtitle}
          </p>
          <div className="flex flex-col gap-3.5">
            {d.about.features.map((text: string, i: number) => (
              <div key={i} className="flex gap-3.5 items-start">
                <div className="w-7 h-7 border border-accent/30 bg-accent-soft flex-shrink-0 flex items-center justify-center rounded-lg">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                </div>
                <p className="text-[13px] text-body leading-[1.5] font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div className="aspect-square bg-light-secondary border border-border rounded-2xl relative overflow-hidden">
            <Image
              src="/images/about-bedroom-led.jpg"
              alt={d.about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
