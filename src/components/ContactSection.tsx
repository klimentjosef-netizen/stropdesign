"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

const inputClass =
  "bg-light-secondary border border-border text-heading font-body text-[13px] font-light px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-accent focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] hover:border-border-dark rounded-sm";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    room: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-light-secondary border-t border-border py-14 lg:py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll>
          <SectionEyebrow text="Kontakt" />
          <h2 className="font-display text-[28px] font-semibold mb-3 text-heading">
            Udělejte první krok
            <br />
            k dokonalému stropu.
          </h2>
          <p className="text-body text-[13px] leading-[1.7] mb-6">
            Zavolejte nám nebo vyplňte formulář. Odpovídáme do 24 hodin a
            nabídku připravíme přesně na míru vašeho projektu.
          </p>

          <div className="flex flex-col gap-3">
            {[
              { text: "+420 739 457 794", href: "tel:+420739457794" },
              { text: "stropdesign.cz", href: undefined },
              { text: "Ostrava a okolí", href: undefined },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-[13px] text-body group">
                <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                {item.href ? (
                  <a href={item.href} className="hover:text-accent transition-colors duration-300">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          {submitted ? (
            <div className="bg-white border border-accent/20 rounded-sm p-10 text-center">
              <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-heading">Děkujeme za poptávku!</h3>
              <p className="text-body text-sm font-light">
                Ozveme se vám do 24 hodin s nabídkou na míru.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Jméno a příjmení"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Telefon"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Typ místnosti a přibližná plocha"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className={inputClass}
              />
              <textarea
                placeholder="Zpráva (nepovinné)"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-y min-h-[90px]`}
              />
              <button
                type="submit"
                className="btn-shimmer glow-accent bg-accent text-white font-body text-[11px] font-medium tracking-[0.12em] uppercase py-4 hover:bg-accent-hover transition-all duration-300 rounded-sm"
              >
                Odeslat poptávku
              </button>
            </form>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
