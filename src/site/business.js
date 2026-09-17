// Centrale bedrijfsgegevens voor SEO, structured data en de footer.
// Alleen feiten die ook zichtbaar op de site staan. Lege velden worden
// automatisch weggelaten uit schema en footer — vul ze pas in als ze kloppen.

export const SITE_URL = "https://www.tvm-productions.nl";

export const business = {
  name: "TVM Productions",
  founder: "Tygo Veerman",
  email: "tygo@tvm-productions.nl",
  telephone: "", // TODO: telefoonnummer toevoegen (nu nergens op de site zichtbaar)
  kvk: "", // TODO: KvK-nummer (verschijnt vanzelf in de footer zodra ingevuld)
  btw: "", // TODO: BTW-nummer, optioneel
  linkedin: "", // TODO: volledige URL naar je LinkedIn-pagina
  instagram: "", // TODO: volledige URL naar je Instagram
  streetAddress: "", // TODO: straat + huisnummer
  postalCode: "", // TODO: postcode
  addressLocality: "Purmerend",
  addressRegion: "Noord-Holland",
  addressCountry: "NL",
  areaServed: ["Purmerend", "Waterland", "Noord-Holland"],
  sameAs: [
    // TODO: link naar Google Business Profile, Instagram, LinkedIn, etc.
  ],
};
