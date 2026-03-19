"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import Lightbox from "./Lightbox";
import SectionEyebrow from "./SectionEyebrow";
import { references } from "@/data/references";
import { useDict } from "@/i18n/LocaleContext";

export default function ReferenceGrid() {
  const d = useDict();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build proper alt texts for accessibility & SEO
  const altTexts: Record<string, string> = {
    "Moderní kuchyně s LED": "napínaný strop matný s LED páskem – kuchyně, Ostrava",
    "Designové LED linie": "napínaný strop matný s LED liniemi – chodba, Ostrava",
    "Strop s vlastním tiskem": "napínaný strop průsvitný s potiskem oblohy – koupelna, Frýdek-Místek",
    "Průsvitný strop se zlatým vzorem": "napínaný strop průsvitný s potiskem – hala, Ostrava",
    "LED kosočtverec v ložnici": "napínaný strop matný s LED designem – ložnice, Ostrava",
  };

  // Only references with images can be opened in lightbox
  const lightboxImages = references
    .map((ref, i) => (ref.image ? { src: ref.image, alt: altTexts[ref.title] || ref.title, caption: ref.description, originalIndex: i } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const openLightbox = useCallback((refIndex: number) => {
    const lbIdx = lightboxImages.findIndex((img) => img.originalIndex === refIndex);
    if (lbIdx !== -1) setLightboxIndex(lbIdx);
  }, [lightboxImages]);

  const featuredRefs = references.filter((r) => r.featured);
  const regularRefs = references.filter((r) => !r.featured);

  const renderCard = (ref: typeof references[0], i: number, globalIndex: number) => (
    <RevealOnScroll key={ref.title} delay={i * 80}>
      <div
        className={`bg-white border border-border overflow-hidden group hover:border-accent/30 transition-colors duration-300 rounded-2xl ${ref.image ? "cursor-pointer" : ""}`}
        onClick={() => ref.image && openLightbox(globalIndex)}
      >
        <div
          className={`h-48 relative overflow-hidden flex items-end p-4 ${ref.image ? "" : "bg-[#1a1a1a]"}`}
        >
          {ref.image ? (
            <>
              <Image
                src={ref.image}
                alt={altTexts[ref.title] || ref.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <svg className="w-8 h-8 text-white/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                      </svg>
              <span className="text-white/60 text-[11px] font-medium tracking-[0.06em] uppercase">
                {d.surfaces.photoPlaceholder}
              </span>
              <span className="text-white/30 text-[10px] mt-1">
                {ref.title}
              </span>
            </div>
          )}
          <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 text-accent text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium rounded-full">
            {ref.tag}
          </div>
          {ref.image && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-border">
          <h3 className="font-display text-lg font-medium text-heading mb-1 group-hover:text-accent transition-colors">
            {ref.title}
          </h3>
          <p className="text-muted text-[11px] tracking-[0.04em] mb-3">
            {ref.meta}
          </p>
          <p className="text-body text-sm leading-[1.6] font-light">
            {ref.description}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );

  return (
    <>
      {/* Featured projects */}
      {featuredRefs.length > 0 && (
        <div className="max-w-7xl mx-auto mb-16">
          <RevealOnScroll>
            <SectionEyebrow text={d.references.featuredEyebrow} />
            <h2 className="font-display text-[clamp(24px,2.5vw,34px)] font-semibold leading-[1.15] mb-8 text-heading">
              {d.references.featuredTitle}
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredRefs.map((ref, i) => {
              const globalIndex = references.indexOf(ref);
              return renderCard(ref, i, globalIndex);
            })}
          </div>
        </div>
      )}

      {/* All projects */}
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-display text-[clamp(20px,2vw,28px)] font-semibold leading-[1.15] mb-8 text-heading">
            {d.references.allTitle}
          </h2>
        </RevealOnScroll>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {regularRefs.map((ref, i) => {
          const globalIndex = references.indexOf(ref);
          return renderCard(ref, i, globalIndex);
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : 0
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % lightboxImages.length : 0
            )
          }
        />
      )}
    </>
  );
}
