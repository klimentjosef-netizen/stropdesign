"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, GOOGLE_ADS_ID, grantConsent } from "@/lib/gtag";

export default function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("cookie-consent") === "all") grantConsent();
  }, []);

  if (!GA_ID && !GOOGLE_ADS_ID) return null;

  const firstId = GA_ID || GOOGLE_ADS_ID;

  return (
    <>
      {/* Consent Mode v2 — must run BEFORE gtag.js loads. Default: denied. */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${firstId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ""}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
