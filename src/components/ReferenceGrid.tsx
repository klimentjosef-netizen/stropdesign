"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { useDict, useLocale } from "@/i18n/LocaleContext";
import type { Reference } from "@/lib/keystatic";

const altTextsCs: Record<string, string> = {
  "Moderní kuchyně s LED": "napínaný strop matný s LED páskem – kuchyně, Ostrava",
  "Designové LED linie": "napínaný strop matný s LED liniemi – chodba, Ostrava",
  "Strop s vlastním tiskem": "napínaný strop průsvitný s potiskem oblohy – koupelna, Frýdek-Místek",
  "Průsvitný strop se zlatým vzorem": "napínaný strop průsvitný s potiskem – hala, Ostrava",
  "LED kosočtverec v ložnici": "napínaný strop matný s LED designem – ložnice, Ostrava",
};

const altTextsEn: Record<string, string> = {
  "Modern Kitchen with LED": "matte stretch ceiling with LED strip – kitchen, Ostrava",
  "Design LED Lines": "matte stretch ceiling with LED lines – hallway, Ostrava",
  "Custom Print Ceiling": "translucent stretch ceiling with sky print – bathroom, Frýdek-Místek",
  "Translucent Ceiling with Gold Pattern": "translucent stretch ceiling with print – hall, Ostrava",
  "LED Diamond in Bedroom": "matte stretch ceiling with LED design – bedroom, Ostrava",
};

interface ReferenceGridProps {
  references: Reference[];
  showSections?: boolean;
}

/* ─── Project Detail Modal ─── */

function ProjectModal({
  reference,
  altText,
  onClose,
}: {
  reference: Reference;
  altText: string;
  onClose: () => void;
}) {
  // Build the full gallery: featured image first, then additional images
  const allImages: string[] = [];
  if (reference.image) allImages.push(reference.image);
  if (reference.images) {
    for (const img of reference.images) {
      if (img && !allImages.includes(img)) allImages.push(img);
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, allImages.length]);

  const goTo = useCallback(
    (idx: number) => {
      if (allImages.length === 0) return;
      const next = (idx + allImages.length) % allImages.length;
      setActiveIndex(next);
    },
    [allImages.length],
  );

  // Scroll active thumb into view
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[activeIndex] as HTMLElement | undefined;
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ animation: "refFadeIn 0.22s ease forwards" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-[900px] max-h-[90dvh] flex flex-col bg-white mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          animation: "refSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-sm"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {/* Header info */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2 pr-8">
              <h2 className="font-display text-[clamp(20px,2.5vw,28px)] font-semibold text-heading leading-tight">
                {reference.title}
              </h2>
              <span className="shrink-0 bg-accent/10 text-accent text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 font-medium rounded-full mt-1">
                {reference.tag}
              </span>
            </div>
            <p className="text-muted text-[12px] tracking-[0.04em] mb-3">
              {reference.meta}
            </p>
            <p className="text-body text-sm leading-[1.7] font-light">
              {reference.description}
            </p>
          </div>

          {/* Gallery */}
          {allImages.length > 0 && (
            <div>
              {/* Main image */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-100" style={{ aspectRatio: "16/10" }}>
                <Image
                  key={allImages[activeIndex]}
                  src={allImages[activeIndex]}
                  alt={activeIndex === 0 ? altText : `${reference.title} – ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                  priority
                />

                {/* Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => goTo(activeIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => goTo(activeIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md transition-colors"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Counter badge */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    {activeIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div
                  ref={thumbsRef}
                  className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin"
                >
                  {allImages.map((img, idx) => (
                    <button
                      key={img + idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative shrink-0 w-[80px] h-[60px] rounded-lg overflow-hidden transition-all duration-200 ${
                        idx === activeIndex
                          ? "ring-2 ring-accent ring-offset-2 opacity-100"
                          : "opacity-60 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${reference.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes refFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes refSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Card with mini gallery ─── */

function ReferenceCard({
  reference: ref,
  images,
  altText,
  delay,
  hasGallery: hasGal,
  onExpand,
}: {
  reference: Reference;
  images: string[];
  altText: string;
  delay: number;
  hasGallery: boolean;
  onExpand: () => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const d = useDict();

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p - 1 + images.length) % images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p + 1) % images.length);
  };

  return (
    <RevealOnScroll key={ref.title} delay={delay}>
      <div
        className={`bg-white border border-border overflow-hidden group hover:border-accent/30 transition-colors duration-300 rounded-2xl ${hasGal ? "cursor-pointer" : ""}`}
        onClick={() => hasGal && onExpand()}
      >
        <div
          className={`h-48 relative overflow-hidden flex items-end p-4 ${images.length > 0 ? "" : "bg-[#1a1a1a]"}`}
        >
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImg]}
                alt={altText}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Mini arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0A0A0A" strokeWidth="1.5"><path d="M6 2L3 5l3 3" /></svg>
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0A0A0A" strokeWidth="1.5"><path d="M4 2l3 3-3 3" /></svg>
                  </button>
                  {/* Dot indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {images.slice(0, 7).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImg(idx); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${currentImg === idx ? "bg-white scale-125" : "bg-white/50"}`}
                      />
                    ))}
                    {images.length > 7 && <span className="text-white/60 text-[8px] ml-0.5">+{images.length - 7}</span>}
                  </div>
                </>
              )}
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
            </div>
          )}
          <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 text-accent text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium rounded-full">
            {ref.tag}
          </div>
          {hasGal && (
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
}

/* ─── Main Grid ─── */

export default function ReferenceGrid({ references, showSections = true }: ReferenceGridProps) {
  const locale = useLocale();
  const altTexts = locale === "en" ? altTextsEn : altTextsCs;
  const [activeRef, setActiveRef] = useState<Reference | null>(null);

  const hasGallery = (ref: Reference) =>
    ref.image || (ref.images && ref.images.length > 0);

  const getImages = (ref: Reference): string[] => {
    const imgs: string[] = [];
    if (ref.image) imgs.push(ref.image);
    if (ref.images) {
      for (const img of ref.images) {
        if (!imgs.includes(img)) imgs.push(img);
      }
    }
    return imgs;
  };

  const renderCard = (ref: Reference, i: number) => (
    <ReferenceCard
      key={ref.title}
      reference={ref}
      images={getImages(ref)}
      altText={altTexts[ref.title] || ref.title}
      delay={i * 80}
      hasGallery={!!hasGallery(ref)}
      onExpand={() => setActiveRef(ref)}
    />
  );

  return (
    <>
      {/* All projects in one grid, sorted by sortOrder (best first) */}
      <div className={showSections ? "max-w-7xl mx-auto" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {references.map((ref, i) => renderCard(ref, i))}
        </div>
      </div>

      {/* Project detail modal */}
      {activeRef && (
        <ProjectModal
          reference={activeRef}
          altText={altTexts[activeRef.title] || activeRef.title}
          onClose={() => setActiveRef(null)}
        />
      )}
    </>
  );
}
