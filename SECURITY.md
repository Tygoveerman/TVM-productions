# Beveiliging & kosten — instellingen vóór livegang

Wat in de code geregeld is, en wat je zelf in een dashboard moet zetten.

## In de code geregeld

| Maatregel | Waar |
|---|---|
| Rate limiting contactformulier (5/uur per IP) | `api/contact.js` |
| Maximale veldlengtes (naam 100, bericht 5000) | `api/contact.js` + `SitePages.jsx` |
| Herkomstcontrole (blokkeert formulieren op andere sites) | `api/contact.js` |
| Honeypot + minimale invultijd | `api/contact.js` |
| Beveiligingsheaders (HSTS, nosniff, clickjacking) | `vercel.json` |
| Cachebeleid voor video's en case-foto's | `vercel.json` |
| Portaal + video-masters uitgesloten van deploy | `.vercelignore` |
| Secrets uitgesloten van versiebeheer | `.gitignore` |

De rate limiting is **best-effort**. Serverless functies draaien in meerdere
instances met eigen geheugen, dus een aanvaller die over veel IP's spreidt komt
er langs. Zie hieronder voor de robuuste laag.

## Zelf instellen in het Vercel-dashboard

1. **Spend limit / budget-alert** — Settings → Billing. Je belangrijkste
   vangnet. Zet een bedrag waarbij je een melding krijgt.
2. **Firewall rate limiting** — Settings → Firewall. Zet een regel op
   `/api/contact` (bijv. 10 verzoeken per minuut per IP). Dit werkt vóór de
   functie start, dus het kost je geen invocatie én het spreidt niet over
   instances. Dit is de echte bescherming.
3. **Attack Challenge Mode** — aan te zetten als je ooit een aanval ziet.
4. **Environment variables** — `RESEND_API_KEY` en `VITE_GA_MEASUREMENT_ID`.
   Nooit in de code.

## Overige

- **Resend**: stel een sending limit in, zodat een lek nooit je hele quotum kost.
- **404-status controleren**: na de eerste deploy even checken of een
  onbestaande URL echt een 404 teruggeeft (lokaal is dit niet te testen).
- **Video's**: nu ~35MB in totaal na compressie. Groeit dit weer, overweeg dan
  een videohost (Cloudflare Stream, Mux) in plaats van losse bestanden.

## Als het portaal ooit live gaat

`client-portal/` is een aparte applicatie met inlog, database en een koppeling
naar je Synology NAS. Dat is een fundamenteel groter risico dan deze
marketingsite en verdient een eigen beveiligingsronde. `SETUP.md` daarin
beschrijft je thuisnetwerk (NAS-adres, doorgestuurde poort) — houd die
documentatie uit publieke repositories.
