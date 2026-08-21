// GA4, loaded only after explicit consent (see ConsentBanner.jsx).
// TODO: set VITE_GA_MEASUREMENT_ID in Vercel project env vars (see .env.example).
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const STORAGE_KEY = "tvm-consent";

export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

let loaded = false;

function loadGA() {
  if (loaded || !GA_ID) return;
  loaded = true;
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable (private mode, blocked) — consent choice just won't persist
  }
  if (value === "granted") loadGA();
}

export function initAnalytics() {
  if (getConsent() === "granted") loadGA();
}

export function trackEvent(name, params = {}) {
  if (getConsent() === "granted" && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}
