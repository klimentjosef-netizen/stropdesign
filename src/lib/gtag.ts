export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function grantConsent() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
}

export function denyConsent() {
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

export function pageview(url: string) {
  if (GA_ID) gtag("config", GA_ID, { page_path: url });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  gtag("event", name, params);
}

// Google Ads conversion (call on form-submit success, phone-click, etc.)
export function trackAdsConversion(label?: string, params: Record<string, unknown> = {}) {
  const conv = label || GOOGLE_ADS_CONVERSION_LABEL;
  if (!GOOGLE_ADS_ID || !conv) return;
  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${conv}`,
    ...params,
  });
}
