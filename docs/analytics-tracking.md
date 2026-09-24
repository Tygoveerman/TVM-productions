# Analytics tracking — TVM Productions

De website stuurt uitsluitend **dataLayer-events**. GA4 (`G-FCLEBCWNXB`) wordt
binnen Google Tag Manager (`GTM-NM7TZL29`) geladen; er staat geen gtag.js in de
broncode. Alle events lopen via `src/site/analytics.js`.

Events worden **alleen gepusht als de bezoeker analytics-consent heeft gegeven**.
Zonder toestemming komt er niets in de dataLayer, dus GTM kan het ook niet
doorzetten.

## Events

| Event | Wanneer afgevuurd | Parameters | Waar geïmplementeerd | GA4 key event | GTM-trigger die nog nodig is |
|---|---|---|---|---|---|
| **`generate_lead`** ⭐ | **Alleen** nadat `POST /api/contact/` een `2xx` teruggaf. Niet bij klik op verzenden, niet bij validatiefout, niet bij een mislukte request. Max. één keer per pageview. | `form_name` (`contact`), `form_location` (`contact_page`), `page_path` | `src/src/SitePages.jsx` → `ContactPage.submit()` | **Ja — primaire conversie** | Custom Event trigger `generate_lead` → GA4 Event-tag `generate_lead`. Daarna in GA4 markeren als key event. |
| `contact_start` | Eerste betekenisvolle interactie met een veld van het contactformulier (`onInput`/`onChange`). Niet bij het laden van de pagina. Max. één keer per pageview. | `form_name`, `form_location`, `page_path` | `src/src/SitePages.jsx` → `<form>` op `ContactPage` | Nee | Custom Event trigger `contact_start` → GA4 Event-tag. |
| `cta_click` | Klik op een commerciële CTA richting `/contact/`. Alleen links met `data-cta-location`; gewone navigatie telt bewust niet mee. | `cta_text`, `cta_location`, `cta_destination` (pad zonder querystring), `page_path` | Gedelegeerde listener in `src/site/analytics.js`; markeringen in `Homepage.jsx`, `SitePages.jsx`, `OplossingPagina.jsx`, `HoeIkHelp.jsx`, `StickyCta.jsx` | Nee | Custom Event trigger `cta_click` → GA4 Event-tag. |
| `email_click` | Klik op een `mailto:`-link, waar dan ook op de site. | `link_location`, `page_path` | Gedelegeerde listener in `src/site/analytics.js` | Later beslissen (secondary key event) | Custom Event trigger `email_click` → GA4 Event-tag. |
| `phone_click` | Klik op een `tel:`-link. **Vuurt nu nooit**: er staat geen telefoonnummer op de site (`business.telephone` is leeg). | `link_location`, `page_path` | Gedelegeerde listener in `src/site/analytics.js` | Later beslissen | Trigger alvast aanmaken kan; hij wordt pas actief zodra er een nummer op de site staat. |
| `whatsapp_click` | Klik op een `wa.me`/`api.whatsapp.com`-link. **Vuurt nu nooit**: er staan geen WhatsApp-links op de site. | `link_location`, `page_path` | Gedelegeerde listener in `src/site/analytics.js` | Later beslissen | Idem — pas relevant zodra er een WhatsApp-link komt. |
| `service_view` | Bij het openen van een concrete dienstpagina (`/diensten/<slug>/`). Niet op de hub `/diensten/`. Max. één keer per pageview. | `service_name` (uit `serviceData[slug].short`), `service_slug`, `page_path` | `src/src/SitePages.jsx` → `ServicePage` | Nee | Custom Event trigger `service_view` → GA4 Event-tag. |
| `case_view` | Bij het openen van een casepagina (`/cases/<slug>/`). Max. één keer per pageview. | `case_name`, `case_slug`, `service_name` (alleen als `item.dienst` in `serviceData` bestaat), `page_path` | `src/src/SitePages.jsx` → `CasePage` | Nee | Custom Event trigger `case_view` → GA4 Event-tag. |
| `solution_view` | Bij het openen van een oplossingspagina (`/oplossingen/<slug>/`). Max. één keer per pageview. | `solution_name`, `solution_slug`, `page_path` | `src/src/OplossingPagina.jsx` | Nee | Custom Event trigger `solution_view` → GA4 Event-tag. |
| `video_start` | Bezoeker start bewust een casevideo (`<video controls>`). Max. één keer per playback. | `video_name`, `video_location` (`case`), `page_path` | `useVideoTracking` in `src/site/analytics.js`, gebruikt door `CaseVideo` | Nee | Custom Event trigger `video_start` → GA4 Event-tag. |
| `video_progress` | Bij het passeren van 25%, 50% en 75%. Elke drempel max. één keer per playback. | `video_name`, `video_location`, `video_percent` (25/50/75), `page_path` | Idem | Nee | Custom Event trigger `video_progress` → GA4 Event-tag; neem `video_percent` mee als parameter. |
| `video_complete` | Bij `ended`. Max. één keer per playback. | `video_name`, `video_location`, `page_path` | Idem | Nee | Custom Event trigger `video_complete` → GA4 Event-tag. |
| `tvm_consent_update` | Na een keuze in de cookiebanner. Bestond al; puur informatief. | `tvm_consent` (`granted`/`denied`) | `setConsent()` in `src/site/analytics.js` | Nee | Geen tag nodig. Eventueel bruikbaar als trigger om iets na consent te laten vuren. |

⭐ = primaire conversie.

## Waarden van `cta_location`

`header`, `hero`, `section`, `service`, `mobile_nav`, `sticky`. Een CTA in een
`<footer>` of `<header>` zonder expliciete markering valt automatisch terug op
`footer` respectievelijk `header`.

## Pageviews

De site is Vite + React **zonder client-side router**: `src/App.jsx` leest
`window.location.pathname` één keer en elke link is een gewone `<a href>`. Elke
navigatie is dus een volledige page load. De GA4-configuratietag op *All Pages*
meet daardoor correct één `page_view` per pagina. **Er is geen History
Change-trigger nodig** en de site pusht bewust geen eigen `page_view` — dat zou
dubbeltellingen opleveren.

## Parameters registreren in GA4

Custom parameters (`form_name`, `cta_location`, `service_slug`, `video_percent`,
enzovoort) moeten in GA4 als **custom dimensions/metrics** worden aangemeld
(Admin → Custom definitions), anders zijn ze niet rapporteerbaar.

## Attributie

Er is bewust **geen eigen UTM/localStorage-attributie** gebouwd. GA4 verwerkt
verkeersbronnen en UTM-parameters zelf; onze events vallen binnen dezelfde
GA4-sessie, dus bron → gedrag → lead is in GA4 te volgen.

## Outbound links en downloads

Niet custom gemeten. GA4 Enhanced Measurement dekt outbound clicks en downloads
al; een eigen implementatie zou dubbel tellen.

## Privacy

Er gaat **geen PII** naar de dataLayer. Concreet:

- Formuliervelden worden nooit uitgelezen voor analytics — geen naam, e-mail,
  bedrijf, bericht of gekozen uitdaging.
- `page_path` is altijd `location.pathname`, nooit de volledige URL. Zo blijft
  bijvoorbeeld `/contact/?uitdaging=…` buiten de meting.
- Bij `email_click`, `phone_click` en `whatsapp_click` gaat alleen mee *waar*
  geklikt is, nooit het adres of nummer zelf.
- `cta_text` komt uit de knoptekst in de code, niet uit invoer van de bezoeker.
- `cta_destination` wordt ontdaan van querystring en hash.
- Lege parameters worden weggelaten in plaats van als `undefined` verstuurd.

## Debuggen

In development (`npm run dev`) logt elke push naar de console als
`[analytics] <event> {…}`. In de productionbuild valt die tak weg
(`import.meta.env.DEV`), dus er komen geen console logs op de live site.

## Belangrijk

De GTM-container wordt niet vanuit de code beheerd. De website stuurt alleen de
events hierboven; triggers en tags worden handmatig in GTM geconfigureerd.
