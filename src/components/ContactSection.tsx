"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import { useDict } from "@/i18n/LocaleContext";
import { trackLead } from "@/lib/gtag";

const inputClass =
  "w-full bg-white border border-border-dark/60 text-heading font-body text-[15px] px-4 py-3 outline-none transition-all duration-200 placeholder:text-[#8a867c] focus:border-accent focus:shadow-[0_0_0_3px_rgba(132,118,49,0.15)] hover:border-border-dark rounded-xl";

const labelClass = "text-[14px] font-medium text-heading";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_ACCEPT = "image/*,.pdf,.doc,.docx";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ContactForm() {
  const searchParams = useSearchParams();
  const d = useDict();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
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

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    setError("");

    const merged = [...files];
    for (const f of selected) {
      if (merged.length >= MAX_FILES) {
        setError(d.contact.attachmentsTooMany);
        break;
      }
      if (!ALLOWED_TYPES.includes(f.type)) {
        setError(d.contact.attachmentsBadType);
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        setError(d.contact.attachmentsTooBig);
        continue;
      }
      if (merged.some((m) => m.name === f.name && m.size === f.size)) continue;
      merged.push(f);
    }

    const total = merged.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setError(d.contact.attachmentsTotalTooBig);
    } else {
      setFiles(merged);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      files.forEach((f) => body.append("files", f, f.name));

      const res = await fetch("/api/contact", { method: "POST", body });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Error" }));
        throw new Error(data.error || "Error");
      }

      trackLead(
        "contact",
        { email: formData.email, phone: formData.phone },
        { attachments: files.length }
      );
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
        <p className="text-body text-sm font-normal">{d.contact.successSub}</p>
      </div>
    );
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {(
        [
          { key: "name", type: "text", label: d.contact.name, required: true, auto: "name" },
          { key: "email", type: "email", label: d.contact.email, required: true, auto: "email" },
          { key: "phone", type: "tel", label: d.contact.phone, required: true, auto: "tel" },
          { key: "room", type: "text", label: d.contact.room, required: false, placeholder: d.contact.roomPlaceholder },
        ] as const
      ).map((f) => (
        <label key={f.key} className="flex flex-col gap-1.5">
          <span className={labelClass}>{f.label}</span>
          <input
            type={f.type}
            name={f.key}
            required={f.required}
            autoComplete={"auto" in f ? f.auto : undefined}
            placeholder={"placeholder" in f ? f.placeholder : undefined}
            value={formData[f.key]}
            onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
            className={inputClass}
          />
        </label>
      ))}
      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>{d.contact.message}</span>
        <textarea name="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-y min-h-[100px]`} />
      </label>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-col">
            <span className={labelClass}>{d.contact.attachmentsLabel}</span>
            <span className="text-[13px] text-body">{d.contact.attachmentsHint}</span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= MAX_FILES}
            className="border border-accent text-accent text-[13px] font-medium tracking-[0.04em] px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {d.contact.attachmentsAdd}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_ACCEPT}
          onChange={handleFilesSelected}
          className="hidden"
        />
        {files.length > 0 && (
          <ul className="flex flex-col gap-1.5 mt-1">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-3 bg-light-secondary border border-border rounded-lg px-3 py-2"
              >
                <span className="text-[13px] text-body truncate flex-1" title={f.name}>
                  {f.name} <span className="text-muted">({formatSize(f.size)})</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-[12px] tracking-[0.06em] uppercase text-muted hover:text-red-600 transition-colors flex-shrink-0"
                >
                  {d.contact.attachmentsRemove}
                </button>
              </li>
            ))}
            <li className="text-[12px] text-muted text-right">
              {files.length}/{MAX_FILES} · {formatSize(totalBytes)} / 4 MB
            </li>
          </ul>
        )}
      </div>

      {error && <p className="text-red-600 text-sm font-normal">{error}</p>}
      <label className="flex items-start gap-3 cursor-pointer text-[14px] text-heading leading-[1.6]">
        <input
          type="checkbox"
          required
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
        />
        <span>{d.contact.gdpr}</span>
      </label>
      <button type="submit" disabled={sending} className="bg-accent text-white font-body text-[14px] font-semibold tracking-[0.04em] py-4 hover:bg-accent-hover active:scale-[0.99] transition-all duration-200 rounded-full disabled:opacity-60 disabled:cursor-wait">
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
          <h2 className="font-display text-[28px] font-semibold mb-3 text-heading">
            {d.contact.title1}
            <br />
            {d.contact.title2}
          </h2>
          <p className="text-body text-[14px] leading-[1.7] mb-6">
            {d.contact.subtitle}
          </p>

          <div className="flex flex-col gap-3">
            {[
              { text: "+420 739 457 794", href: "tel:+420739457794" },
              { text: "info@stropdesign.cz", href: "mailto:info@stropdesign.cz" },
              { text: d.contact.area, href: undefined },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-[14px] text-body group">
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
