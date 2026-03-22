"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict } from "@/i18n/LocaleContext";

const inputClass =
  "bg-light-secondary border border-border text-heading font-body text-[13px] font-light px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-accent focus:shadow-[0_0_0_3px_rgba(132,118,49,0.1)] hover:border-border-dark rounded-xl";

function ContactForm() {
  const searchParams = useSearchParams();
  const d = useDict();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    room: "",
    message: "",
  });
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const calcRoom = searchParams.get("room");
    const calcMessage = searchParams.get("message");
    if (calcRoom || calcMessage) {
      setFormData((prev) => ({
        ...prev,
        room: calcRoom || prev.room,
        message: calcMessage || prev.message,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-accent/20 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold mb-2 text-heading">{d.contact.success}</h3>
        <p className="text-body text-sm font-light">{d.contact.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" placeholder={d.contact.name} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
      <input type="tel" placeholder={d.contact.phone} required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
      <input type="text" placeholder={d.contact.room} value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} className={inputClass} />
      <textarea placeholder={d.contact.message} rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-y min-h-[90px]`} />
      {error && <p className="text-red-600 text-sm font-light">{error}</p>}
      <label className="flex items-start gap-3 cursor-pointer text-[12px] text-body leading-[1.6]">
        <input
          type="checkbox"
          required
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
        />
        <span>Souhlasím se zpracováním osobních údajů</span>
      </label>
      <button type="submit" disabled={sending || !gdprConsent} className="btn-shimmer glow-accent bg-accent text-white font-body text-[11px] font-medium tracking-[0.12em] uppercase py-4 hover:bg-accent-hover transition-all duration-300 rounded-full disabled:opacity-60 disabled:cursor-not-allowed">
        {sending ? d.contact.sending : d.contact.submit}
      </button>
    </form>
  );
}

export default function ContactSection() {
  const d = useDict();

  return (
    <section id="kontakt-formular" className="bg-light-secondary border-t border-border py-14 lg:py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll>
          <SectionEyebrow text={d.contact.eyebrow} />
          <h2 className="font-display text-[28px] font-semibold mb-3 text-heading">
            {d.contact.title1}
            <br />
            {d.contact.title2}
          </h2>
          <p className="text-body text-[13px] leading-[1.7] mb-6">
            {d.contact.subtitle}
          </p>

          <div className="flex flex-col gap-3">
            {[
              { text: "+420 739 457 794", href: "tel:+420739457794" },
              { text: "stropdesign.cz", href: undefined },
              { text: d.contact.area, href: undefined },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-[13px] text-body group">
                <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                {item.href ? (
                  <a href={item.href} className="hover:text-accent transition-colors duration-300">{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <Suspense fallback={<div className="h-[300px]" />}>
            <ContactForm />
          </Suspense>
        </RevealOnScroll>
      </div>
    </section>
  );
}
