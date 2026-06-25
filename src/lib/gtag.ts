const env = (v: string | undefined) => (v || "").trim();

export const GA_ID = env(process.env.NEXT_PUBLIC_GA_ID);
export const GOOGLE_ADS_ID = env(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID);
export const GOOGLE_ADS_CONVERSION_LABEL = env(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
);
export const SKLIK_RETARGETING_ID = env(
  process.env.NEXT_PUBLIC_SKLIK_RETARGETING_ID
);
export const SKLIK_CONVERSION_ID = env(
  process.env.NEXT_PUBLIC_SKLIK_CONVERSION_ID
);

type GtagFn = (...args: unknown[]) => void;

type SklikRC = {
  retargetingHit?: (conf: { rtgId: number; consent: number | null }) => void;
  conversionHit?: (conf: {
    id: number;
    value?: number;
    consent: number | null;
  }) => void;
};

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    rc?: SklikRC;
    sznIVA?: { IS: { updateIdentities: (i: { eid: string | null }) => void } };
  }
}

export const CONSENT_KEY = "cookie-consent";

export type ConsentState = { analytics: boolean; marketing: boolean };

// Reads the visitor's stored choice. Understands both the new granular JSON
// format and the legacy "all" / "necessary" strings from the previous banner.
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  if (raw === "all") return { analytics: true, marketing: true };
  if (raw === "necessary") return { analytics: false, marketing: false };
  try {
    const p = JSON.parse(raw);
    return { analytics: !!p.analytics, marketing: !!p.marketing };
  } catch {
    return null;
  }
}

// Pushes a Consent Mode v2 update reflecting the chosen categories.
export function applyConsent(c: ConsentState) {
  gtag("consent", "update", {
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    analytics_storage: c.analytics ? "granted" : "denied",
  });
}

// Persists the choice and applies it immediately.
export function saveConsent(c: ConsentState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...c, ts: Date.now() }));
  applyConsent(c);
}

function getSklikConsent(): number | null {
  const c = readConsent();
  if (!c) return null;
  return c.marketing ? 1 : 0;
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  // Use the real gtag (defined in <head>) so commands are queued the way
  // gtag.js expects (arguments object), not as a plain array.
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
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
  if (typeof window === "undefined") return;
  if (!GA_ID && !GOOGLE_ADS_ID) return;
  gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.origin + url,
    page_title: document.title,
  });
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

export function trackSklikRetargeting() {
  if (typeof window === "undefined" || !SKLIK_RETARGETING_ID) return;
  const fire = () => {
    try {
      window.sznIVA?.IS.updateIdentities({ eid: null });
      window.rc?.retargetingHit?.({
        rtgId: Number(SKLIK_RETARGETING_ID),
        consent: getSklikConsent(),
      });
    } catch {}
  };
  if (window.rc?.retargetingHit) {
    fire();
  } else {
    // rc.js loaded async — retry briefly
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      if (window.rc?.retargetingHit) {
        clearInterval(iv);
        fire();
      } else if (tries > 20) {
        clearInterval(iv);
      }
    }, 200);
  }
}

export function trackSklikConversion(value: number = 1) {
  if (typeof window === "undefined" || !SKLIK_CONVERSION_ID) return;
  const fire = () => {
    try {
      window.sznIVA?.IS.updateIdentities({ eid: null });
      window.rc?.conversionHit?.({
        id: Number(SKLIK_CONVERSION_ID),
        value,
        consent: getSklikConsent(),
      });
    } catch {}
  };
  if (window.rc?.conversionHit) {
    fire();
  } else {
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      if (window.rc?.conversionHit) {
        clearInterval(iv);
        fire();
      } else if (tries > 20) {
        clearInterval(iv);
      }
    }, 200);
  }
}
