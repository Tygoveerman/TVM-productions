// Centrale analytics-laag: consent + dataLayer.
//
// De GTM-container (GTM-NM7TZL29) staat in index.html en zet daar ook de
// Consent Mode v2-defaults. GA4 (G-FCLEBCWNXB) wordt binnen GTM geladen; hier
// wordt bewust geen script geladen en geen gtag.js-tag aangeroepen. Componenten
// pushen niet zelf naar window.dataLayer maar gebruiken de functies hieronder,
// zodat eventnamen, parameters en de PII-regels op één plek staan.
//
// PII-regel: er gaan uitsluitend waarden naar de dataLayer die uit de code
// komen (vaste labels, slugs, pathnames). Nooit iets wat een bezoeker zelf
// heeft ingetypt, en nooit een volledige URL — alleen location.pathname, omdat
// een querystring persoonsgegevens kan bevatten (bv. /contact/?uitdaging=…).
import { useCallback, useRef } from "react";

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

// ─── Events ────────────────────────────────────────────────────────────────

// Alleen het pad, nooit search of hash: daar kunnen persoonsgegevens in staan.
function pagePath() {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

// Lege waarden eruit, zodat GA4 geen parameters met undefined/"" binnenkrijgt.
function clean(params) {
  const out = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = value;
  }
  return out;
}

// Elk event loopt hierlangs. SSR-safe, consent-gated: zonder toestemming wordt
// er niets gepusht, dus GTM kan het ook niet doorzetten.
//
// `onReady` is er voor het ene geval waarin dat nodig is: generate_lead vlak
// vóór een navigatie. GTM roept eventCallback aan zodra de tags gevuurd zijn,
// eventTimeout zorgt dat we niet blijven wachten als er niets luistert.
export function trackEvent(name, params = {}, { onReady } = {}) {
  if (typeof window === "undefined") {
    onReady?.();
    return;
  }
  if (getConsent() !== "granted") {
    onReady?.();
    return;
  }

  const payload = { event: name, ...clean({ page_path: pagePath(), ...params }) };

  if (onReady) {
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      onReady();
    };
    payload.eventCallback = fire;
    payload.eventTimeout = 1200;
    setTimeout(fire, 1300);
  }

  if (import.meta.env.DEV) {
    // Alleen tijdens ontwikkelen; in de productionbuild valt deze tak weg.
    console.debug("[analytics]", name, payload);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// Events die hoogstens één keer per pageview mogen vuren. De site doet geen
// client-side routing (zie App.jsx: elke navigatie is een volledige page load),
// dus module-state is precies één pageview. Dit vangt meteen de dubbele
// effect-run van React StrictMode in development af.
const eenmalig = new Set();

function trackOnce(key, name, params) {
  if (eenmalig.has(key)) return;
  eenmalig.add(key);
  trackEvent(name, params);
}

export function trackServiceView({ serviceName, serviceSlug }) {
  trackOnce(`service:${serviceSlug}`, "service_view", {
    service_name: serviceName,
    service_slug: serviceSlug,
  });
}

export function trackCaseView({ caseName, caseSlug, serviceName }) {
  trackOnce(`case:${caseSlug}`, "case_view", {
    case_name: caseName,
    case_slug: caseSlug,
    service_name: serviceName,
  });
}

export function trackSolutionView({ solutionName, solutionSlug }) {
  trackOnce(`solution:${solutionSlug}`, "solution_view", {
    solution_name: solutionName,
    solution_slug: solutionSlug,
  });
}

// Eén keer per formulier per pageview, bij de eerste echte interactie met een
// veld. De ingevulde waarde gaat nadrukkelijk niet mee.
export function trackContactStart({ formName, formLocation }) {
  trackOnce(`contact_start:${formName}`, "contact_start", {
    form_name: formName,
    form_location: formLocation,
  });
}

// Alleen na een aantoonbaar geslaagde verzending. `onReady` laat de navigatie
// naar de bedankpagina wachten tot GTM de tags heeft afgevuurd.
export function trackLead({ formName, formLocation, onReady }) {
  if (eenmalig.has("lead")) {
    onReady?.();
    return;
  }
  eenmalig.add("lead");
  trackEvent("generate_lead", { form_name: formName, form_location: formLocation }, { onReady });
}

// ─── Klik-tracking via één gedelegeerde listener ────────────────────────────

// Contactmethodes en commerciële CTA's zitten verspreid over veel componenten.
// Eén listener op document is daardoor betrouwbaarder dan een onClick per knop:
// niets kan vergeten worden en er kan niets dubbel geregistreerd raken.
//
// Welke CTA's meetellen: alleen links met een expliciete data-cta-location.
// Gewone navigatie (menu-items, casekaarten, dienstenlinks) is bewust géén
// cta_click — anders is de vergelijking tussen CTA's waardeloos.
let klikListener = false;

function linkLocation(link) {
  const expliciet = link.getAttribute("data-link-location");
  if (expliciet) return expliciet;
  if (link.closest("footer")) return "footer";
  if (link.closest("header")) return "header";
  return "section";
}

function onDocumentClick(event) {
  const link = event.target.closest?.("a[href]");
  if (!link) return;

  // getAttribute, niet .href: de property maakt er een absolute URL van.
  const href = link.getAttribute("href") || "";

  // Het adres/nummer zelf gaat nooit mee als parameter — alleen wáár geklikt is.
  if (href.startsWith("mailto:")) {
    trackEvent("email_click", { link_location: linkLocation(link) });
    return;
  }
  if (href.startsWith("tel:")) {
    trackEvent("phone_click", { link_location: linkLocation(link) });
    return;
  }
  if (/^https?:\/\/(api\.whatsapp\.com|wa\.me)\//i.test(href)) {
    trackEvent("whatsapp_click", { link_location: linkLocation(link) });
    return;
  }

  const ctaLocation = link.getAttribute("data-cta-location");
  if (ctaLocation) {
    trackEvent("cta_click", {
      // innerText van de knop, niet van de bezoeker: geen PII.
      cta_text: link.textContent.trim().replace(/\s+/g, " ").slice(0, 100),
      cta_location: ctaLocation,
      // Alleen het pad van de bestemming, zonder querystring.
      cta_destination: href.split("?")[0].split("#")[0],
    });
  }
}

export function initInteractionTracking() {
  if (typeof document === "undefined" || klikListener) return;
  klikListener = true;
  // Capture-fase: ook kliks die een component met stopPropagation afvangt
  // bereiken ons nog.
  document.addEventListener("click", onDocumentClick, true);
}

// ─── Video ─────────────────────────────────────────────────────────────────

// Alleen video's die een bezoeker bewust start (<video controls>). De muted
// autoplay-loops in de hero's zijn decoratie, geen engagement, en blijven
// ongemeten.
const DREMPELS = [25, 50, 75];

export function useVideoTracking({ videoName, videoLocation }) {
  const state = useRef({ started: false, passed: new Set(), completed: false });

  const onPlay = useCallback(() => {
    if (state.current.started) return;
    state.current.started = true;
    trackEvent("video_start", { video_name: videoName, video_location: videoLocation });
  }, [videoName, videoLocation]);

  const onTimeUpdate = useCallback(
    (event) => {
      const { currentTime, duration } = event.currentTarget;
      if (!duration || !Number.isFinite(duration)) return;
      const percent = (currentTime / duration) * 100;
      for (const drempel of DREMPELS) {
        if (percent < drempel || state.current.passed.has(drempel)) continue;
        state.current.passed.add(drempel);
        trackEvent("video_progress", {
          video_name: videoName,
          video_location: videoLocation,
          video_percent: drempel,
        });
      }
    },
    [videoName, videoLocation],
  );

  const onEnded = useCallback(() => {
    if (state.current.completed) return;
    state.current.completed = true;
    trackEvent("video_complete", { video_name: videoName, video_location: videoLocation });
  }, [videoName, videoLocation]);

  // Opnieuw afspelen telt als een nieuwe playback: start en drempels mogen dan
  // weer één keer vuren.
  const onSeeked = useCallback((event) => {
    if (event.currentTarget.currentTime === 0) {
      state.current = { started: false, passed: new Set(), completed: false };
    }
  }, []);

  return { onPlay, onTimeUpdate, onEnded, onSeeked };
}
