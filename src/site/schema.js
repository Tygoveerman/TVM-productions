// Pure structured-data (JSON-LD) builders. Safe to import client-side —
// no window access, plain object construction.
import { business, SITE_URL } from "./business.js";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512.png`,
    email: business.email,
    ...(business.telephone ? { telephone: business.telephone } : {}),
    founder: { "@type": "Person", name: business.founder },
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: SITE_URL,
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
    areaServed: business.areaServed,
  };
}

export function serviceSchema(service, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.short,
    name: service.title,
    description: service.answer,
    provider: { "@type": "Organization", name: business.name, url: SITE_URL },
    areaServed: business.areaServed,
    url: `${SITE_URL}/diensten/${slug}/`,
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
