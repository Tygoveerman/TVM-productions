// Titels op maximaal twee regels.
//
// De truc zit niet in de lettergrootte maar in de regelbreedte: geef een titel
// een maximale breedte van ongeveer de helft van zijn eigen tekst, dan kán hij
// niet op één regel en past hij precies op twee. `text-wrap: balance` (in
// index.css) verdeelt die twee regels daarna gelijkmatig, zodat er geen losse
// staartregel van twee woorden overblijft.
//
// De maat gaat als inline `style` mee en niet als Tailwind-klasse, omdat
// Tailwind alleen klassen genereert die letterlijk in de broncode staan; een
// waarde die uit de lengte van de titel volgt, staat daar per definitie niet.

// Ondergrens: onder dit aantal tekens is de titel toch al een regel, dan hoeft
// er niets bijgestuurd te worden en blijft de maat van de tier staan.
const MIN_CHARS = 22;

// De drie stappen in de schaal. Een titel in een smalle kolom krijgt `section`
// of `card`, ook als het een h1 is: de maat moet bij de ruimte passen, niet bij
// het niveau van de kop.
const TIERS = { hero: "t-hero", section: "t-section", card: "t-card" };

// `extra` gaat door dezelfde functie, zodat een losse className achter de
// spread de tier-klasse niet stilletjes kan overschrijven.
export function titleProps(text, tier = "section", extra = "") {
  const className = [TIERS[tier] ?? TIERS.section, extra].filter(Boolean).join(" ");
  if (typeof text !== "string" || text.length === 0) return { className };

  // +1 teken lucht, zodat een titel met een lang laatste woord niet alsnog
  // over drie regels valt.
  // Een titel die volledig in kapitalen staat, is breder dan de ch-eenheid
  // aanneemt (die rekent op het cijfer 0). Zonder die correctie forceert de maat
  // juist een regel extra.
  const caps = text === text.toUpperCase() && text !== text.toLowerCase();
  const chars = Math.max(MIN_CHARS, text.length + 1);
  const measure = Math.ceil((chars / 2) * (caps ? 1.2 : 1));
  return { className, style: { maxInlineSize: `${measure}ch` } };
}
