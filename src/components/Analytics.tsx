"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_ID,
  GOOGLE_ADS_ID,
  SKLIK_RETARGETING_ID,
  grantConsent,
  pageview,
  trackSklikRetargeting,
} from "@/lib/gtag";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("cookie-consent") === "all") grantConsent();
  }, []);

  // Track page views & Sklik retargeting on every client-side navigation.
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    pageview(url);
    trackSklikRetargeting();
  }, [pathname, searchParams]);

  if (!GA_ID && !GOOGLE_ADS_ID && !SKLIK_RETARGETING_ID) return null;

  const firstId = GA_ID || GOOGLE_ADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${firstId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: false });` : ""}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}', { send_page_view: false });` : ""}
        `}
      </Script>

      {SKLIK_RETARGETING_ID && (
        <Script src="https://c.seznam.cz/js/rc.js" strategy="afterInteractive" />
      )}
    </>
  );
}
