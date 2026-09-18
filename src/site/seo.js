import { oplossingRoutes } from "./oplossingen.js";
// Used only by the prerender step (scripts/prerender.mjs via src/entry-server.jsx)
// and for document.title after hydration.
import { serviceData, caseData, articleData } from "../src/SitePages.jsx";
import { SITE_URL } from "./business.js";
import fallbackImage from "../assets/portfolio/hero/tygo-camera.jpeg";

const SITE_NAME = "TVM Productions";

function truncate(text, max = 155) {
  if (!text) return "";
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

// Bereikbaar voor bezoekers, maar niet in de index en niet in de sitemap.
const NOINDEX = new Set(["/privacy", "/voorwaarden", "/contact/bedankt", "/videoproductie-purmerend"]);

// Titel ~50–60 tekens, description ~140–160. Eén primaire intentie per pagina;
// de dienst- en casepagina's halen hun tekst uit hun eigen data (seo-veld).
const staticPages = {
  "/": {
    title: "Videoproductie & bedrijfsfotografie Purmerend | TVM Productions",
    description: "Zakelijke video en bedrijfsfotografie vanuit Purmerend voor bedrijven in Noord-Holland. Beeld dat zichtbaar maakt wat je doet en klanten en medewerkers overtuigt.",
  },
  "/diensten": {
    title: "Diensten: video en fotografie voor bedrijven | TVM Productions",
    description: "Alle video- en fotografiediensten van TVM Productions op een rij: bedrijfsvideo, promotievideo, klantcase, uitlegvideo, eventvideo, bedrijfs- en productfotografie.",
  },
  "/oplossingen/zichtbaar-worden": {
    title: "Bedrijf zichtbaar maken met video en foto | TVM Productions",
    description: "Je levert goed werk, maar klanten zien het niet. Zo maak je je bedrijf zichtbaar met video en foto die expertise, resultaat en werkwijze laten zien.",
  },
  "/oplossingen/medewerkers-aantrekken": {
    title: "Recruitmentvideo: medewerkers aantrekken | TVM Productions",
    description: "Een vacature vertelt wat iemand gaat doen, niet waarom iemand bij jou wil werken. Recruitmentvideo en werken-bij content die laat zien hoe het er echt aan toegaat.",
  },
  "/oplossingen/duidelijk-uitleggen": {
    title: "Je product of dienst duidelijk uitleggen | TVM Productions",
    description: "Een klant die het niet snapt, koopt niet. Zo maak je een technisch product, proces of dienst in één keer begrijpelijk met beeld, en wanneer een uitlegvideo past.",
  },
  "/hoe-ik-help": {
    title: "Hoe ik help bedrijven met video en foto | TVM Productions",
    description: "Niet beginnen bij welke video je wilt, maar bij wat er in je bedrijf moet veranderen. Zo bepaal ik welke video of foto klanten overtuigt of kandidaten aantrekt.",
  },
  "/werkwijze": {
    title: "Werkwijze: zo verloopt een videoproductie | TVM Productions",
    description: "Van kennismaking tot oplevering in vijf duidelijke stappen: doel, concept, draaidag, montage en oplevering. Je weet vooraf wat er gebeurt en wat ik nodig heb.",
  },
  "/cases": {
    title: "Cases: voorbeelden van video en fotografie | TVM Productions",
    description: "Voorbeelden van bedrijfsvideo, eventvideo, bedrijfsfotografie en productfotografie voor bedrijven in Volendam, Purmerend en de rest van Noord-Holland.",
  },
  "/over": {
    title: "Over Tygo Veerman, videograaf in Purmerend | TVM Productions",
    description: "Tygo Veerman is videograaf en bedrijfsfotograaf in Purmerend. Met TVM Productions maakt hij video en foto voor bedrijven die willen laten zien wat ze doen.",
  },
  "/tarieven": {
    title: "Tarieven voor video en fotografie | TVM Productions",
    description: "Wat bepaalt de prijs van een videoproductie of fotoshoot? Omvang, uitwerking en oplevering. Bekijk de vanaf-prijzen per dienst en ontvang vooraf één vaste offerte.",
  },
  "/videoproductie-purmerend": {
    title: "Videoproductie in Purmerend en Waterland | TVM Productions",
    description: "Video en fotografie voor bedrijven in Purmerend, Waterland en omliggende plaatsen. Snel op locatie en bekend met de regio.",
  },
  "/kennisbank": {
    title: "Kennisbank over video en fotografie | TVM Productions",
    description: "Praktische antwoorden voor wie een bedrijfsvideo of fotoshoot overweegt: wat het kost, hoe je een draaidag voorbereidt en welke videovorm bij je doel past.",
  },
  "/veelgestelde-vragen": {
    title: "Veelgestelde vragen over video en fotografie | TVM Productions",
    description: "Directe antwoorden op praktische vragen over een videoproductie of fotoshoot: lengte, voorbereiding, medewerkers voor de camera, planning en oplevering.",
  },
  "/contact": {
    title: "Contact: bespreek je video- of fotoproductie | TVM Productions",
    description: "Vertel waar het bij jou vastloopt of wat je wilt maken. Je krijgt meestal binnen één werkdag reactie van Tygo Veerman, TVM Productions in Purmerend.",
  },
  "/contact/bedankt": {
    title: "Bedankt voor je aanvraag | TVM Productions",
    description: "Je aanvraag is verstuurd. Je hoort meestal binnen één werkdag van ons.",
  },
  "/particulier": {
    title: "Video voor particulieren: trouwfilm & event | TVM Productions",
    description: "Trouwfilms en video van privé-events met aandacht voor mensen, sfeer en de kleine momenten die je zelf bijna mist. Rustig voorbereid, aanwezig zonder op te vallen.",
  },
  "/particulier/trouwfilm": {
    title: "Trouwfilm laten maken: jullie dag, zonder regie | TVM Productions",
    description: "Een trouwfilm laten maken die jullie dag laat voelen zoals hij was: de mensen, de stemmen en de kleine momenten, zonder dat de dag geregisseerd wordt.",
  },
  "/particulier/event": {
    title: "Privé-event laten vastleggen op video | TVM Productions",
    description: "Een jubileum, feest of ander bijzonder moment vastgelegd op video, zonder dat de camera de aandacht overneemt. Vooraf besproken wat belangrijk is.",
  },
  "/privacy": {
    title: "Privacyverklaring | TVM Productions",
    description: "Hoe TVM Productions omgaat met persoonsgegevens.",
  },
  "/voorwaarden": {
    title: "Algemene voorwaarden | TVM Productions",
    description: "Algemene voorwaarden van TVM Networks (versie 1.0): offertes, betaling, annulering, gebruiksrecht en aansprakelijkheid.",
  },
  "/avg-fotografie-video": {
    title: "AVG bij fotografie en video op de werkvloer | TVM Productions",
    description: "Praktische aandachtspunten voor toestemming en privacy wanneer medewerkers, klanten of bezoekers herkenbaar in beeld komen bij een bedrijfsvideo of fotoshoot.",
  },
};

export function getMeta(rawPath) {
  const path = rawPath.replace(/\/+$/, "") || "/";
  const segments = path.split("/").filter(Boolean);
  let title;
  let description;
  let image;
  let known = true;

  if (path.startsWith("/diensten/") && serviceData[segments[1]]) {
    const service = serviceData[segments[1]];
    title = service.seo?.title ?? `${service.title} | ${SITE_NAME}`;
    description = service.seo?.description ?? truncate(service.answer || service.intro);
    image = service.image;
  } else if (path.startsWith("/cases/") && caseData[segments[1]]) {
    const item = caseData[segments[1]];
    title = item.seo?.title ?? `${item.title} — ${item.type} | ${SITE_NAME}`;
    description = item.seo?.description ?? truncate(item.intro);
    image = item.image;
  } else if (path.startsWith("/kennisbank/") && articleData[segments[1]]) {
    const article = articleData[segments[1]];
    title = article.seo?.title ?? `${article.title} | ${SITE_NAME}`;
    description = article.seo?.description ?? truncate(article.intro);
  } else if (staticPages[path]) {
    ({ title, description } = staticPages[path]);
  } else {
    known = false;
    title = `Pagina niet gevonden | ${SITE_NAME}`;
    description = "Deze pagina bestaat niet (meer). Ga terug naar de homepage van TVM Productions.";
  }

  const canonicalPath = path === "/" ? "/" : `${path}/`;
  const noindex = !known || NOINDEX.has(path);

  return {
    title,
    description,
    canonical: `${SITE_URL}${canonicalPath}`,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}${fallbackImage}`,
    robots: noindex ? "noindex, follow" : "index, follow",
    noindex,
  };
}

// Alle routes die geprerenderd worden (ook de noindex-pagina's: die moeten
// gewoon bereikbaar zijn).
export function getAllRoutes() {
  return [
    "/",
    "/diensten/",
    ...Object.keys(serviceData).map((slug) => `/diensten/${slug}/`),
    "/hoe-ik-help/",
    ...oplossingRoutes,
    "/werkwijze/",
    "/cases/",
    ...Object.keys(caseData).map((slug) => `/cases/${slug}/`),
    "/over/",
    "/tarieven/",
    "/videoproductie-purmerend/",
    "/kennisbank/",
    ...Object.keys(articleData).map((slug) => `/kennisbank/${slug}/`),
    "/veelgestelde-vragen/",
    "/contact/",
    "/contact/bedankt/",
    "/particulier/",
    "/particulier/trouwfilm/",
    "/particulier/event/",
    "/privacy/",
    "/voorwaarden/",
    "/avg-fotografie-video/",
  ];
}

// Alleen indexeerbare pagina's horen in de sitemap.
export function getSitemapRoutes() {
  return getAllRoutes().filter((route) => !getMeta(route).noindex);
}

export { SITE_URL };
