// De drie oplossingen als losse pagina's.
//
// Elke pagina volgt dezelfde opbouw: eerst het probleem benoemen zoals de
// bezoeker het zelf ervaart, dan wat ik daarvoor doe, dan cases die laten zien
// dat het werkt, en tot slot de vervolgstap.
//
// `cases` verwijst naar slugs uit caseData in SitePages; titel, type, beeld en
// resultaat komen daarvandaan, zodat een casepagina en deze pagina niet uit de
// pas gaan lopen.

export const oplossingen = {
  "zichtbaar-worden": {
    nummer: "01",
    eyebrow: "Zichtbaar worden",
    headline: ["Je levert goed werk.", "Alleen ziet niemand het."],
    description:
      "Klanten kiezen wat ze kunnen zien. Als jouw expertise onzichtbaar blijft, wordt er vergeleken op prijs in plaats van op wat je écht levert.",
    beeld: "sunforce",

    probleem: {
      kop: "Waar het misgaat",
      inleiding:
        "Je weet wat jouw bedrijf goed maakt. Een potentiële klant ziet dat niet automatisch — die ziet een website met tekst en een paar foto's, net als bij de concurrent.",
      punten: [
        ["Je onderscheid blijft impliciet", "Wat jullie anders doet, zit in het werk zelf. Online is daar weinig van terug te zien."],
        ["Je moet het elke keer opnieuw uitleggen", "Elk verkoopgesprek begint bij nul, omdat er vooraf niets is dat het werk laat zien."],
        ["Je wordt vergeleken op prijs", "Zonder zichtbaar bewijs blijft de prijs het enige verschil dat een klant kan zien."],
      ],
    },

    oplossing: {
      kop: "Wat ik daarvoor doe",
      inleiding:
        "Ik maak zichtbaar waarom klanten voor jou zouden moeten kiezen — met beeld dat het werk, de mensen en het resultaat laat zien.",
      items: [
        ["Klantcases", "Bestaande klanten vertellen zelf waarom ze voor je kozen en wat het opleverde.", "/diensten/klantcasevideo/"],
        ["Bedrijfsvideo", "Eén verhaal over wie je bent, wat je doet en voor wie.", "/diensten/bedrijfsvideo/"],
        ["Projectcontent", "Laat een project van begin tot eind zien, als bewijs van hoe je werkt.", "/diensten/projectvideo/"],
        ["Bedrijfsfotografie", "Eén beeldbank voor website, offertes en social, in plaats van losse telefoonfoto's.", "/diensten/bedrijfsfotografie/"],
      ],
    },

    cases: ["24wines", "sunforce"],
  },

  "medewerkers-aantrekken": {
    nummer: "02",
    eyebrow: "Medewerkers aantrekken",
    headline: ["Een vacature vertelt wat", "iemand gaat doen. Meer niet."],
    description:
      "Goede kandidaten kiezen niet op functie-eisen, maar op gevoel. Dat gevoel krijgen ze pas als ze zien hoe het er bij jou echt aan toegaat.",
    beeld: "kes-sloopwerk",

    probleem: {
      kop: "Waar het misgaat",
      inleiding:
        "Je hebt een goed bedrijf en leuk werk, maar kandidaten krijgen daar online nauwelijks iets van mee. Ze zien een vacaturetekst, en die lijkt op alle andere.",
      punten: [
        ["Je vacature zegt niets over jou", "Functie-eisen en arbeidsvoorwaarden staan er wel. Waarom iemand hier zou willen werken niet."],
        ["Kandidaten haken af vóór het gesprek", "Wie geen beeld heeft bij het werk en de mensen, solliciteert niet."],
        ["Je concurreert met bureaus", "Zonder eigen verhaal blijft alleen het salaris over om je mee te onderscheiden."],
      ],
    },

    oplossing: {
      kop: "Wat ik daarvoor doe",
      inleiding:
        "Ik breng het echte werk, de collega's en de sfeer in beeld, zodat een kandidaat al vóór het sollicitatiegesprek weet waar hij aan begint.",
      items: [
        ["Recruitmentvideo", "Laat zien hoe een werkdag er echt uitziet, op locatie en zonder script.", "/diensten/bedrijfsvideo/"],
        ["Medewerkers aan het woord", "Collega's vertellen zelf waarom ze hier werken. Geloofwaardiger dan elke vacaturetekst.", "/diensten/klantcasevideo/"],
        ["Werken-bij content", "Korte video's die passen bij waar kandidaten je tegenkomen: social, vacaturesites, je eigen pagina.", "/diensten/promotievideo/"],
        ["Teamfotografie", "Echte foto's van echte mensen, in plaats van stockbeeld dat niemand gelooft.", "/diensten/bedrijfsfotografie/"],
      ],
    },

    cases: ["kes-sloopwerk"],
  },

  "duidelijk-uitleggen": {
    nummer: "03",
    eyebrow: "Duidelijk uitleggen",
    headline: ["Wat jij doet is niet", "in één zin uit te leggen."],
    description:
      "Een klant die het niet snapt, koopt niet. Hoe technischer of specialistischer je werk, hoe belangrijker het is dat iemand het in één keer begrijpt.",
    beeld: "vesto",

    probleem: {
      kop: "Waar het misgaat",
      inleiding:
        "Je product, dienst of proces zit slim in elkaar. Precies daarom kost het moeite om het uit te leggen — en die moeite neemt een klant meestal niet.",
      punten: [
        ["Je uitleg kost te veel tijd", "Elk gesprek begint met hetzelfde verhaal, omdat er niets is dat het voor je doet."],
        ["Klanten haken af bij de techniek", "Wat voor jou logisch is, is voor een buitenstaander een muur van vakjargon."],
        ["Je website legt het niet uit", "Tekst alleen krijgt een proces of een product zelden helder over."],
      ],
    },

    oplossing: {
      kop: "Wat ik daarvoor doe",
      inleiding:
        "Ik vertaal wat je doet naar beeld dat iemand zonder voorkennis begrijpt — zodat je het niet elke keer opnieuw hoeft uit te leggen.",
      items: [
        ["Uitlegvideo", "Eén video die je product, dienst of proces stap voor stap duidelijk maakt.", "/diensten/uitlegvideo/"],
        ["Projectvideo", "Laat een compleet traject zien, zodat een klant begrijpt wat er allemaal bij komt kijken.", "/diensten/projectvideo/"],
        ["Productfotografie", "Beeld dat laat zien wat een product is en wat het doet.", "/diensten/productfotografie/"],
        ["Processen in beeld", "Maak zichtbaar wat er achter de schermen gebeurt, van eerste stap tot oplevering.", "/diensten/projectvideo/"],
      ],
    },

    cases: ["vesto"],
  },
};

// Dezelfde vervolgstap op alle drie de pagina's: één route naar binnen, geen
// keuzestress aan het eind.
export const vervolgstappen = [
  ["Kennismaken", "Je vertelt waar je tegenaan loopt. Ik stel vragen en denk mee."],
  ["Plan en prijs", "Je krijgt een voorstel met wat we maken, waarom, en wat het kost."],
  ["Maken en opleveren", "Ik draai, monteer en lever aan in de formaten die je nodig hebt."],
];

export const oplossingRoutes = Object.keys(oplossingen).map((slug) => `/oplossingen/${slug}/`);
