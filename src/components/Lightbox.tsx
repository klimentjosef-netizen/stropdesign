"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string; caption?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const img = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-20"
          aria-label="Zavřít"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[16/10] bg-black rounded-2xl overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Caption & counter */}
        <div className="mt-4 text-center">
          {img.caption && (
            <p className="text-white/80 text-sm font-light">{img.caption}</p>
          )}
          <p className="text-white/40 text-xs mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full lg:-translate-x-16 p-3 text-white/50 hover:text-white transition-colors"
              aria-label="Předchozí"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full lg:translate-x-16 p-3 text-white/50 hover:text-white transition-colors"
              aria-label="Další"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
