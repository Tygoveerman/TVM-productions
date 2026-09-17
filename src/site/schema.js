// Structured data (JSON-LD). Pure objectbouwers, veilig aan de clientkant.
//
// Alle entiteiten krijgen een stabiele @id zodat pagina's ernaar kunnen
// verwijzen in plaats van ze te herhalen. Per pagina staat er één <script>
// met een @graph: de basisentiteiten plus wat de pagina zelf toevoegt
// (Service, FAQPage). Zo zijn er nooit twee conflicterende beschrijvingen
// van hetzelfde bedrijf op één pagina.
import { business, SITE_URL } from "./business.js";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#tygo`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// ProfessionalService is een LocalBusiness (en dus ook Organization): het
// meest specifieke schema.org-type voor een zakelijke dienstverlener met een
// vestigingsplaats maar zonder winkel. Een apart type voor videoproductie
// bestaat niet.
export function organizationNode() {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: business.name,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
    image: `${SITE_URL}/favicon-512.png`,
    email: business.email,
    ...(business.telephone ? { telephone: business.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
      ...(business.postalCode ? { postalCode: business.postalCode } : {}),
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: business.founder,
    jobTitle: "Videograaf en fotograaf",
    email: business.email,
    worksFor: { "@id": ORGANIZATION_ID },
    url: `${SITE_URL}/over/`,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: business.name,
    inLanguage: "nl-NL",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

// "vanaf €1.495" -> 1495. Alleen als er een zichtbare vanaf-prijs op de
// pagina staat, wordt die ook in het schema opgenomen.
function parsePrice(text) {
  const match = /€\s?([\d.]+)/.exec(text || "");
  return match ? Number(match[1].replace(/\./g, "")) : null;
}

export function serviceNode(service, slug, { price } = {}) {
  const minPrice = parsePrice(price);
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/diensten/${slug}/#service`,
    serviceType: service.short,
    name: service.title,
    description: service.answer,
    url: `${SITE_URL}/diensten/${slug}/`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    ...(minPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "PriceSpecification", minPrice, priceCurrency: "EUR" },
            url: `${SITE_URL}/diensten/${slug}/`,
          },
        }
      : {}),
  };
}

// `items` zijn [vraag, antwoord]-paren die letterlijk zichtbaar op de pagina staan.
export function faqNode(items, pageUrl) {
  return {
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq` } : {}),
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbSchema(items) {
  const last = items[items.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${last.href}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// De basisgraaf voor iedere pagina, plus optionele pagina-specifieke nodes.
export function siteGraph(extra = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), personNode(), websiteNode(), ...extra.filter(Boolean)],
  };
}
