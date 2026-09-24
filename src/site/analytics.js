// Consent-laag boven Google Tag Manager.
//
// De container zelf (GTM-NM7TZL29) staat in index.html en laadt op elke pagina.
// Daar worden ook de Consent Mode v2-defaults gezet: alles wat met analytics en
// advertenties te maken heeft staat op "denied" totdat de bezoeker in
// ConsentBanner.jsx iets kiest. Er wordt hier bewust géén script geladen —
// GA4 en eventuele marketingtags horen in GTM, achter de consent-checks
// hieronder, zodat ze niet ongecontroleerd kunnen vuren.
const STORAGE_KEY = "tvm-consent";

export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// gtag() wordt in index.html gedefinieerd, vóór de container laadt. Mocht dat
// script om wat voor reden niet gelopen hebben, dan pushen we direct naar de
// dataLayer in plaats van te crashen.
function pushConsent(state) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", state);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", state]);
}

// De banner vraagt alleen om analytische cookies. Advertentie-categorieën
// blijven daarom geweigerd, ook bij "granted" — anders belooft de banner iets
// anders dan de site doet.
function consentState(value) {
  return {
    analytics_storage: value === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable (private mode, blocked) — consent choice just won't persist
  }
  pushConsent(consentState(value));
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "tvm_consent_update", tvm_consent: value });
  }
}

// De defaults en het terugzetten van een eerdere keuze gebeuren al in de <head>,
// vóór de container laadt. Deze functie bestaat nog voor het geval dat script
// niet gelopen heeft (bijvoorbeeld als de bezoeker eerder consent gaf en de
// inline try/catch faalde); hij is idempotent.
let synced = false;

export function initAnalytics() {
  if (synced || (typeof window !== "undefined" && window.__tvmConsentSynced)) return;
  synced = true;
  const value = getConsent();
  if (value) pushConsent(consentState(value));
}

// Events gaan naar de dataLayer, waar GTM ze oppikt. Zonder toestemming pushen
// we niets, zodat GTM het event ook niet kan doorzetten.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
