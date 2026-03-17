"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import Lightbox from "./Lightbox";
import { references } from "@/data/references";

export default function ReferenceGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Only references with images can be opened in lightbox
  const lightboxImages = references
    .map((ref, i) => (ref.image ? { src: ref.image, alt: ref.title, caption: ref.description, originalIndex: i } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const openLightbox = useCallback((refIndex: number) => {
    const lbIdx = lightboxImages.findIndex((img) => img.originalIndex === refIndex);
    if (lbIdx !== -1) setLightboxIndex(lbIdx);
  }, [lightboxImages]);

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {references.map((ref, i) => (
          <RevealOnScroll key={ref.title} delay={i * 80}>
            <div
              className={`bg-white border border-border overflow-hidden group hover:border-accent/30 transition-colors duration-300 rounded-sm ${ref.image ? "cursor-pointer" : ""}`}
              onClick={() => ref.image && openLightbox(i)}
            >
              <div
                className={`h-48 relative overflow-hidden flex items-end p-4 ${ref.image ? "" : `bg-gradient-to-br ${ref.gradient}`}`}
              >
                {ref.image && (
                  <Image
                    src={ref.image}
                    alt={ref.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {ref.image && (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                )}
                <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 text-accent text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium">
                  {ref.tag}
                </div>
                {/* Magnify icon on hover */}
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
        ))}
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
