"use client";

import { useState, useEffect, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict } from "@/i18n/LocaleContext";
import type { Testimonial, FaqItem } from "@/lib/keystatic";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?sca_esv=c1aee945acc89b8a&q=strop+design&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOSoIVhG44J1F14tVdiuftmyvOEsuV2wCc4xWAeeTo_Nb0vDCgowLCFaWhJEMwmVZPLInovM%3D&uds=ALYpb_kPfttAwudk1x-HGnga9iDDgBWpVX4BktQyA-tg2NtL0hFccrlPGlFsJINLW4KPT6vtO-EGA5hYDSUQCu0TDWGjFZwpCib3RQgneU-Nl2wZQhn4BoM";

/* ── Sub-components ── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FaqItemComponent({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left py-4 border-b border-border group"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-[14px] font-medium text-heading group-hover:text-accent transition-colors duration-200">
          {question}
        </h3>
        <div
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
          </svg>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 mt-2.5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-body text-[13px] leading-[1.7] font-light pr-8">
          {answer}
        </p>
      </div>
    </button>
  );
}

/* ── Main component ── */

interface FaqAndTestimonialsProps {
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

export default function FaqAndTestimonials({ testimonials, faqs }: FaqAndTestimonialsProps) {
  const d = useDict();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-light-secondary border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT — FAQ */}
        <RevealOnScroll>
          <div>
            <SectionEyebrow text={d.faq.eyebrow} />
            <h2 className="font-display text-[clamp(24px,2.5vw,34px)] font-semibold leading-[1.15] mb-8 text-heading">
              {d.faq.title}
            </h2>
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <FaqItemComponent key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* RIGHT — Testimonials */}
        <RevealOnScroll delay={150}>
          <div>
            <SectionEyebrow text={d.testimonials.eyebrow} />
            <h2 className="font-display text-[clamp(24px,2.5vw,34px)] font-semibold leading-[1.15] mb-8 text-heading">
              {d.testimonials.title}
            </h2>

            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Testimonial card */}
              <div className="bg-white border border-border rounded-2xl p-7 lg:p-8 relative">
                <div className="absolute top-3 left-5 text-accent/10 font-display text-[64px] leading-none select-none">
                  &ldquo;
                </div>

                <Stars count={t.rating} />

                <p className="mt-5 mb-5 text-body text-[14px] leading-[1.8] font-light italic relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="w-8 h-px bg-accent mb-3" />

                <p className="font-display text-sm font-semibold text-heading">
                  {t.name}
                </p>
                <p className="text-muted text-[11px] tracking-[0.04em] mt-0.5">
                  {d.faq.googleReview}
                </p>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === active ? "bg-accent w-6" : "bg-border hover:bg-muted"
                    }`}
                    aria-label={`${d.testimonials.eyebrow} ${i + 1}`}
                  />
                ))}
              </div>

              {/* Google link */}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white border border-border rounded-full px-5 py-2.5 mt-5 hover:border-accent/30 transition-colors duration-300 group"
              >
                <GoogleIcon />
                <span className="text-body text-[12px] font-medium group-hover:text-heading transition-colors">
                  {d.faq.googleReview}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
                {[
                  { value: "5.0", label: d.testimonials.googleRating },
                  { value: "150+", label: d.testimonials.projects },
                  { value: "100%", label: d.testimonials.satisfaction },
                  { value: d.testimonials.warrantyValue, label: d.testimonials.warranty },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-xl font-bold text-accent">
                      {stat.value}
                    </p>
                    <p className="text-muted text-[10px] tracking-[0.04em] mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
