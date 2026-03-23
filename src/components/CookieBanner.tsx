"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[80] px-4 pb-4 pointer-events-none"
      style={{ animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
    >
      <div className="max-w-lg mx-auto bg-dark/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-5 pointer-events-auto border border-white/10">
        <p className="text-[12px] leading-[1.7] text-white/80 mb-4">
          Tento web používá cookies pro správné fungování a zlepšování služeb.
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 bg-accent text-white text-[11px] font-medium tracking-[0.08em] uppercase py-2.5 rounded-full hover:bg-accent-hover transition-colors"
          >
            Přijmout vše
          </button>
          <button
            onClick={decline}
            className="px-4 py-2.5 text-white/50 text-[11px] font-medium tracking-[0.06em] uppercase hover:text-white/80 transition-colors"
          >
            Pouze nezbytné
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
