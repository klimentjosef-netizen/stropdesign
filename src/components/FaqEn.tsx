"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { faqsEn } from "@/data/faq-en";

function FaqItem({
  question,
  answer,
  delay,
}: {
  question: string;
  answer: string;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <RevealOnScroll delay={delay}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 border-b border-border group"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-base font-medium text-heading group-hover:text-accent transition-colors duration-200">
            {question}
          </h3>
          <div
            className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12M6 12h12"
              />
            </svg>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-body text-sm leading-[1.7] font-light pr-10">
            {answer}
          </p>
        </div>
      </button>
    </RevealOnScroll>
  );
}

export default function FaqEn() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-10 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="FAQ" />
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-10 text-heading">
            Frequently asked questions
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col">
          {faqsEn.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
