"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict } from "@/i18n/LocaleContext";

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
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="text-body text-[13px] leading-[1.7] font-light pt-3 pr-8">
          {answer}
        </p>
      </div>
    </button>
  );
}

export default function Faq() {
  const d = useDict();

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-10 border-b border-border">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text={d.faq.eyebrow} />
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold mb-8 text-heading">
            {d.faq.title}
          </h2>
          <div>
            {d.faq.questions.map((question: string, i: number) => (
              <FaqItemComponent key={i} question={question} answer={d.faq.answers[i]} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
