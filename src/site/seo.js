import { oplossingRoutes } from "./oplossingen.js";
// Used only by the prerender step (scripts/prerender.mjs via src/entry-server.jsx).
// Never imported by client code — keeps this out of the browser bundle.
import { serviceData, caseData, articleData } from "../src/SitePages.jsx";
import { SITE_URL } from "./business.js";
import fallbackImage from "../assets/portfolio/hero/tygo-camera.jpeg";

const SITE_NAME = "TVM Productions";

function truncate(text, max = 155) {
  if (!text) return "";
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

const staticPages = {
  "/": {
    title: "Zakelijke video & fotografie Purmerend | TVM Productions",
    description: "Zakelijke video en fotografie die klanten oplevert. Voor bedrijven in Purmerend en regio Waterland.",
  },
  "/diensten": {
    title: "Diensten — video en fotografie voor bedrijven | TVM Productions",
    description: "Bedrijfsvideo, promotievideo, klantcasevideo, uitlegvideo, projectvideo, eventregistratie, bedrijfs- en productfotografie.",
  },
  "/oplossingen/zichtbaar-worden": {
    title: "Zichtbaar worden — laat zien waarom klanten voor jou kiezen | TVM Productions",
    description: "Je levert goed werk, maar klanten zien het niet. Videocontent die je expertise, resultaten en manier van werken zichtbaar maakt.",
  },
  "/oplossingen/medewerkers-aantrekken": {
    title: "Medewerkers aantrekken met video | TVM Productions",
    description: "Een vacature vertelt wat iemand gaat doen. Recruitmentcontent laat zien waarom iemand het bij jou zou willen doen.",
  },
  "/oplossingen/duidelijk-uitleggen": {
    title: "Complexe producten en processen duidelijk uitleggen | TVM Productions",
    description: "Een klant die het niet snapt, koopt niet. Uitlegvideo en beeld dat je product, dienst of proces in één keer begrijpelijk maakt.",
  },
  "/hoe-ik-help": {
    title: "Hoe ik help — meer klanten of de juiste medewerkers | TVM Productions",
    description: "Niet beginnen bij wat we maken, maar bij wat je wilt bereiken. Videocontent om klanten te overtuigen of kandidaten aan te trekken.",
  },
  "/werkwijze": {
    title: "Werkwijze — van kennismaking tot oplevering | TVM Productions",
    description: "Vijf duidelijke stappen: kennismaking, concept, draaidag, montage en oplevering. Je weet vooraf wat er gebeurt.",
  },
  "/cases": {
    title: "Cases — video- en fotoproducties uit de praktijk | TVM Productions",
    description: "Een selectie van zakelijke video- en fotoproducties voor bedrijven in Purmerend en Noord-Holland.",
  },
  "/over": {
    title: "Over Tygo Veerman | TVM Productions",
    description: "Tygo Veerman maakt vanuit Purmerend video en fotografie voor bedrijven die willen laten zien wie ze zijn.",
  },
  "/tarieven": {
    title: "Tarieven — video en fotografie op maat | TVM Productions",
    description: "Iedere productie krijgt een vaste prijs op basis van omvang, uitwerking en oplevering. Geen verrassingen achteraf.",
  },
  "/videoproductie-purmerend": {
    title: "Videoproductie Purmerend | TVM Productions",
    description: "Video en fotografie voor bedrijven in Purmerend, Waterland en omliggende plaatsen. Snel op locatie.",
  },
  "/kennisbank": {
    title: "Kennisbank — praktische vragen over video en foto | TVM Productions",
    description: "Praktische antwoorden over de kosten, voorbereiding en keuze tussen bedrijfsvideo en promotievideo.",
  },
  "/veelgestelde-vragen": {
    title: "Veelgestelde vragen | TVM Productions",
    description: "Directe antwoorden op praktische vragen over voorbereiding, opnames, planning en oplevering.",
  },
  "/contact": {
    title: "Contact | TVM Productions",
    description: "Vertel wat je wilt maken. Meestal binnen één werkdag reactie op je aanvraag.",
  },
  "/contact/bedankt": {
    title: "Bedankt voor je aanvraag | TVM Productions",
    description: "Je aanvraag is verstuurd. Je hoort meestal binnen één werkdag van ons.",
  },
  "/particulier": {
    title: "Video voor particulieren | TVM Productions",
    description: "Trouwfilms en eventvideo's met aandacht voor mensen, sfeer en de kleine momenten.",
  },
  "/particulier/trouwfilm": {
    title: "Trouwfilm laten maken | TVM Productions",
    description: "Een trouwfilm die jullie dag laat voelen zoals hij was, zonder het te regisseren.",
  },
  "/particulier/event": {
    title: "Privé-event vastleggen | TVM Productions",
    description: "Een jubileum, feest of bijzonder moment vastgelegd zonder dat de camera opvalt.",
  },
  "/privacy": {
    title: "Privacyverklaring | TVM Productions",
    description: "Hoe TVM Productions omgaat met persoonsgegevens.",
  },
  "/voorwaarden": {
    title: "Algemene voorwaarden | TVM Productions",
    description: "Praktische afspraken rond offertes, planning, gebruik en oplevering.",
  },
  "/avg-fotografie-video": {
    title: "AVG bij fotografie en video | TVM Productions",
    description: "Praktische aandachtspunten wanneer medewerkers, klanten of bezoekers in beeld komen.",
  },
};

export function getMeta(rawPath) {
  const path = rawPath.replace(/\/+$/, "") || "/";
  const segments = path.split("/").filter(Boolean);
  let title;
  let description;
  let image;

  if (path.startsWith("/diensten/") && serviceData[segments[1]]) {
    const service = serviceData[segments[1]];
    title = `${service.title} | ${SITE_NAME}`;
    description = truncate(service.answer || service.intro);
    image = service.image;
  } else if (path.startsWith("/cases/") && caseData[segments[1]]) {
    const item = caseData[segments[1]];
    title = `${item.title} — ${item.type} | ${SITE_NAME}`;
    description = truncate(item.intro);
    image = item.image;
  } else if (path.startsWith("/kennisbank/") && articleData[segments[1]]) {
    const article = articleData[segments[1]];
    title = `${article.title} | ${SITE_NAME}`;
    description = truncate(article.intro);
  } else if (staticPages[path]) {
    ({ title, description } = staticPages[path]);
  } else {
    title = `Pagina niet gevonden | ${SITE_NAME}`;
    description = "Deze pagina bestaat niet (meer). Ga terug naar de homepage van TVM Productions.";
  }

  const canonicalPath = path === "/" ? "/" : `${path}/`;

  return {
    title,
    description,
    canonical: `${SITE_URL}${canonicalPath}`,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}${fallbackImage}`,
  };
}

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
