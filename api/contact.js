// Vercel serverless function (Node runtime). Handelt het /contact/ formulier af.
// Vereist RESEND_API_KEY in de environment variables van het Vercel-project.
import { Resend } from "resend";

const TO_EMAIL = "info@tvm-productions.nl";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_TIME_MS = 3000;

// Maximale veldlengtes. Zonder deze limieten kan iemand een bericht van
// megabytes insturen dat vervolgens in je mailbox belandt.
const LIMITS = { naam: 100, bedrijf: 120, email: 254, bericht: 5000, uitdaging: 80 };

// Rate limiting: max 5 inzendingen per IP per uur.
//
// LET OP - dit is best-effort. Serverless functies draaien in meerdere
// instances, elk met een eigen geheugen, en een instance verdwijnt na
// inactiviteit. Een stortvloed vanaf één IP raakt in de praktijk meestal
// dezelfde warme instance en wordt dus geremd, maar een aanvaller die over
// veel IP's spreidt komt hier langs. De robuuste laag daarvoor is de
// Firewall in het Vercel-dashboard (zie SECURITY.md).
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;

  // Oude entries opruimen zodat de Map niet ongelimiteerd groeit.
  for (const [key, times] of hits) {
    const recent = times.filter((t) => t > cutoff);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }

  const times = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  if (times.length >= RATE_LIMIT.max) return true;

  times.push(now);
  hits.set(ip, times);
  return false;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function tooLong(value, max) {
  return typeof value === "string" && value.length > max;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Methode niet toegestaan." });
    return;
  }

  // Blokkeert formulieren op andere websites die naar dit endpoint posten.
  // Browsers sturen Origin altijd mee bij een cross-origin POST.
  const origin = req.headers.origin;
  if (origin) {
    let originHost;
    try {
      originHost = new URL(origin).host;
    } catch {
      res.status(403).json({ error: "Ongeldige herkomst." });
      return;
    }
    if (originHost !== req.headers.host) {
      res.status(403).json({ error: "Ongeldige herkomst." });
      return;
    }
  }

  if (rateLimited(clientIp(req))) {
    res.status(429).json({ error: "Te veel aanvragen. Probeer het over een uur opnieuw of mail rechtstreeks naar tygo@tvm-productions.nl." });
    return;
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Ongeldige aanvraag." });
    return;
  }

  const { naam, bedrijf, email, bericht, uitdaging, website, startedAt } = body;

  // Honeypot: echte bezoekers vullen dit verborgen veld nooit in.
  // Stopt simpele bots; een gericht script omzeilt dit moeiteloos.
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!startedAt || Date.now() - Number(startedAt) < MIN_FILL_TIME_MS) {
    res.status(400).json({ error: "Formulier te snel verzonden. Probeer het opnieuw." });
    return;
  }

  if (!naam || !email || !bericht) {
    res.status(400).json({ error: "Vul naam, e-mail en bericht in." });
    return;
  }

  if (typeof naam !== "string" || typeof email !== "string" || typeof bericht !== "string" || (bedrijf != null && typeof bedrijf !== "string")) {
    res.status(400).json({ error: "Ongeldige aanvraag." });
    return;
  }

  if (tooLong(naam, LIMITS.naam) || tooLong(bedrijf, LIMITS.bedrijf) || tooLong(email, LIMITS.email) || tooLong(bericht, LIMITS.bericht) || tooLong(uitdaging, LIMITS.uitdaging)) {
    res.status(400).json({ error: "Een van de velden is te lang. Kort je bericht in en probeer het opnieuw." });
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: "Vul een geldig e-mailadres in." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ error: "E-mailversturen is nog niet geconfigureerd. Mail rechtstreeks naar tygo@tvm-productions.nl." });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      // Vereist dat tvm-productions.nl als verzenddomein is geverifieerd in Resend.
      from: "TVM Productions website <website@tvm-productions.nl>",
      to: TO_EMAIL,
      replyTo: email,
      // Nieuwe regels uit het invoerveld strippen zodat de onderwerpregel
      // altijd één regel blijft.
      subject: `Aanvraag via website — ${String(bedrijf || naam).replace(/[\r\n]+/g, " ").trim()}`,
      text: `Uitdaging: ${uitdaging || "-"}\nNaam: ${naam}\nBedrijf: ${bedrijf || "-"}\nE-mail: ${email}\n\n${bericht}`,
    });
    if (error) throw new Error(error.message || "Resend gaf een fout terug.");
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "Verzenden is mislukt. Probeer het later opnieuw of mail rechtstreeks." });
  }
}
