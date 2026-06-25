"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_ID,
  GOOGLE_ADS_ID,
  SKLIK_RETARGETING_ID,
  applyConsent,
  readConsent,
  pageview,
  trackSklikRetargeting,
} from "@/lib/gtag";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Re-apply the visitor's stored consent on every load (Consent Mode
    // defaults to denied in <head>, so a returning visitor's choice must be
    // restored here).
    const stored = readConsent();
    if (stored) applyConsent(stored);
  }, []);

  // gtag config (in <head>) already sends the initial page_view.
  // Here we only track SUBSEQUENT client-side navigations to avoid double counts.
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    pageview(url);
    trackSklikRetargeting();
  }, [pathname, searchParams]);

  if (!GA_ID && !GOOGLE_ADS_ID && !SKLIK_RETARGETING_ID) return null;

  const firstId = GA_ID || GOOGLE_ADS_ID;

  return (
    <>
      {(GA_ID || GOOGLE_ADS_ID) && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${firstId}`}
          strategy="afterInteractive"
        />
      )}
      {SKLIK_RETARGETING_ID && (
        <Script
          src="https://c.seznam.cz/js/rc.js"
          strategy="afterInteractive"
          onLoad={() => trackSklikRetargeting()}
        />
      )}
    </>
  );
}
