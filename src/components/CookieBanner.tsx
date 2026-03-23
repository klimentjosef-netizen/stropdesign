"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
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
      className="fixed bottom-4 left-4 z-[80]"
      style={{ animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-3.5 border border-border/50 max-w-[280px]">
        <p className="text-[10px] leading-[1.6] text-body mb-3">
          Tento web používá cookies pro správné fungování.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={accept}
            className="bg-accent text-white text-[9px] font-medium tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-full hover:bg-accent-hover transition-colors"
          >
            Přijmout
          </button>
          <button
            onClick={decline}
            className="text-muted text-[9px] tracking-[0.04em] hover:text-body transition-colors"
          >
            Odmítnout
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
