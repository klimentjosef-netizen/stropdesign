"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { readConsent, saveConsent } from "@/lib/gtag";

// This component lives outside the LocaleProvider (rendered straight in
// layout.tsx <body>), so it detects its own locale from the path, the same
// way ChatWidget does.
const COPY = {
  cs: {
    title: "Vážíme si vašeho soukromí",
    body:
      "Používáme cookies k zajištění správného fungování webu a, s vaším souhlasem, k měření návštěvnosti a marketingu. Souhlas můžete kdykoli změnit nebo odvolat v patičce webu.",
    acceptAll: "Přijmout vše",
    rejectAll: "Odmítnout vše",
    manage: "Spravovat souhlas",
    save: "Uložit volbu",
    back: "Zpět",
    settingsTitle: "Nastavení souhlasu",
    necessaryTitle: "Nezbytné cookies",
    necessaryDesc:
      "Potřebné pro základní fungování webu. Nelze vypnout.",
    necessaryState: "Vždy aktivní",
    analyticsTitle: "Analytické cookies",
    analyticsDesc:
      "Pomáhají nám rozumět, jak web používáte (Google Analytics).",
    marketingTitle: "Marketingové cookies",
    marketingDesc:
      "Umožňují měření reklam a remarketing (Google Ads, Sklik).",
  },
  en: {
    title: "We value your privacy",
    body:
      "We use cookies to make the site work and, with your consent, to measure traffic and for marketing. You can change or withdraw your consent at any time from the site footer.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    manage: "Manage consent",
    save: "Save choice",
    back: "Back",
    settingsTitle: "Consent settings",
    necessaryTitle: "Necessary cookies",
    necessaryDesc: "Required for the site to function. Cannot be disabled.",
    necessaryState: "Always on",
    analyticsTitle: "Analytics cookies",
    analyticsDesc: "Help us understand how you use the site (Google Analytics).",
    marketingTitle: "Marketing cookies",
    marketingDesc: "Enable ad measurement and remarketing (Google Ads, Sklik).",
  },
} as const;

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const pathname = usePathname();
  const t = COPY[pathname.startsWith("/en") ? "en" : "cs"];

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  // Show on first visit (no stored choice yet).
  useEffect(() => {
    if (!readConsent()) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Re-open from the persistent "Nastavení cookies" link in the footer so the
  // visitor can change or withdraw consent at any time (legal requirement).
  useEffect(() => {
    const open = () => {
      const c = readConsent();
      setAnalytics(c ? c.analytics : true);
      setMarketing(c ? c.marketing : true);
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  const finish = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => finish(true, true);
  const rejectAll = () => finish(false, false);
  const saveChoice = () => finish(analytics, marketing);

  if (!visible) return null;

  return (
    <>
      {/* Dim backdrop to draw attention and prompt a decision */}
      <div
        className="fixed inset-0 z-[90] bg-dark/40 backdrop-blur-[2px]"
        style={{ animation: "cookieFade 0.3s ease forwards" }}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-[91] px-4 pb-4 sm:px-6 sm:pb-6"
        style={{ animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
      >
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white shadow-2xl p-6 sm:p-7">
          {!showSettings ? (
            <>
              <h2 className="font-display text-lg font-semibold text-heading mb-2">
                {t.title}
              </h2>
              <p className="text-sm leading-[1.7] font-normal text-body mb-5">
                {t.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={acceptAll}
                  className="bg-accent text-white text-[13px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
                >
                  {t.acceptAll}
                </button>
                <button
                  onClick={rejectAll}
                  className="border border-border text-heading text-[13px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-full hover:bg-light-secondary transition-colors"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={() => {
                    const c = readConsent();
                    setAnalytics(c ? c.analytics : true);
                    setMarketing(c ? c.marketing : true);
                    setShowSettings(true);
                  }}
                  className="text-muted text-[13px] tracking-[0.04em] px-4 py-3 hover:text-body transition-colors sm:ml-auto"
                >
                  {t.manage}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-lg font-semibold text-heading mb-4">
                {t.settingsTitle}
              </h2>

              <div className="space-y-4 mb-6">
                {/* Necessary — locked on */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-heading">{t.necessaryTitle}</p>
                    <p className="text-xs leading-[1.6] font-normal text-muted mt-0.5">
                      {t.necessaryDesc}
                    </p>
                  </div>
                  <span className="text-[12px] tracking-[0.08em] uppercase text-accent font-medium whitespace-nowrap pt-1">
                    {t.necessaryState}
                  </span>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-heading">{t.analyticsTitle}</p>
                    <p className="text-xs leading-[1.6] font-normal text-muted mt-0.5">
                      {t.analyticsDesc}
                    </p>
                  </div>
                  <div className="pt-1">
                    <Toggle checked={analytics} onChange={setAnalytics} />
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-heading">{t.marketingTitle}</p>
                    <p className="text-xs leading-[1.6] font-normal text-muted mt-0.5">
                      {t.marketingDesc}
                    </p>
                  </div>
                  <div className="pt-1">
                    <Toggle checked={marketing} onChange={setMarketing} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={saveChoice}
                  className="bg-accent text-white text-[13px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
                >
                  {t.save}
                </button>
                <button
                  onClick={acceptAll}
                  className="border border-border text-heading text-[13px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-full hover:bg-light-secondary transition-colors"
                >
                  {t.acceptAll}
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-muted text-[13px] tracking-[0.04em] px-4 py-3 hover:text-body transition-colors sm:ml-auto"
                >
                  {t.back}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cookieFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
