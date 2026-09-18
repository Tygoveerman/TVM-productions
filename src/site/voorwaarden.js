// Algemene voorwaarden, versie 1.0. De tekst hier is de juridische tekst zoals
// vastgesteld; wijzig hem alleen in overleg. De pagina /voorwaarden/ leest dit
// bestand (zie VoorwaardenPage in SitePages).
//
// Een artikel heeft `leden`: een lijst met strings (lid-tekst) of objecten
// met `tekst` plus `items` (sub-opsomming a., b., …) of `tabel` (rijen).

export const VOORWAARDEN = {
  titel: "Algemene voorwaarden",
  bedrijf: "TVM Networks",
  kvk: "84518839",
  btw: "NL003974368B93",
  adres: "Dukaton, 1132 RA Volendam, Noord-Holland",
  versie: "1.0",
  vastgesteld: "18 september 2026",
  artikelen: [
    {
      titel: "Definities",
      leden: [
        "TVM Networks: de eenmanszaak TVM Networks, gevestigd te Dukaton, 1132 RA Volendam, ingeschreven bij de Kamer van Koophandel onder nummer 84518839.",
        "Opdrachtgever: de natuurlijke persoon of rechtspersoon die aan TVM Networks een opdracht verstrekt tot het uitvoeren van werkzaamheden.",
        "Consument: een opdrachtgever die een natuurlijke persoon is en niet handelt in de uitoefening van een beroep of bedrijf.",
        "Overeenkomst: de schriftelijke of digitale overeenkomst van opdracht tussen TVM Networks en opdrachtgever.",
        "Diensten: alle door TVM Networks aangeboden diensten, waaronder videoproductie, bedrijfsfotografie en website- en landingspagina-ontwikkeling.",
        "Werk: het door TVM Networks gerealiseerde eindproduct, waaronder doch niet beperkt tot videobeelden, foto's, websites en overige creatieve uitingen.",
      ],
    },
    {
      titel: "Toepasselijkheid",
      leden: [
        "Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen en overeenkomsten van TVM Networks, alsmede op alle vervolgopdrachten en aanvullende of gewijzigde opdrachten.",
        "Afwijking van deze algemene voorwaarden is slechts mogelijk indien dit schriftelijk en uitdrukkelijk tussen partijen is overeengekomen.",
        "De toepasselijkheid van eventuele algemene (inkoop)voorwaarden van de opdrachtgever wordt uitdrukkelijk van de hand gewezen.",
        "Indien een of meer bepalingen van deze algemene voorwaarden nietig zijn of worden vernietigd, blijven de overige bepalingen onverminderd van kracht. Partijen zullen in dat geval in overleg treden om een vervangende bepaling overeen te komen die de bedoeling van de oorspronkelijke bepaling zo dicht mogelijk benadert.",
      ],
    },
    {
      titel: "Offertes en totstandkoming overeenkomst",
      leden: [
        "Alle offertes en aanbiedingen van TVM Networks zijn vrijblijvend en geldig gedurende 30 dagen na dagtekening, tenzij in de offerte een andere geldigheidstermijn is vermeld.",
        "Een overeenkomst komt tot stand op het moment dat de opdrachtgever de offerte schriftelijk of digitaal (per e-mail) heeft aanvaard, dan wel op het moment dat TVM Networks met de uitvoering van de werkzaamheden aanvangt.",
        "Mondelinge afspraken binden TVM Networks pas nadat deze schriftelijk zijn bevestigd.",
        "TVM Networks behoudt zich het recht voor een opdracht zonder opgave van redenen te weigeren.",
        "Kennelijke fouten of vergissingen in de offerte, zoals evidente reken- of drukfouten, binden TVM Networks niet.",
      ],
    },
    {
      titel: "Uitvoering van de opdracht",
      leden: [
        "TVM Networks voert de opdracht naar beste inzicht en vermogen uit, overeenkomstig de eisen van goed vakmanschap. De verbintenis betreft een inspanningsverplichting, tenzij uitdrukkelijk schriftelijk een resultaat is overeengekomen.",
        "Opdrachtgever is gehouden alle informatie, materialen en medewerking die TVM Networks nodig acht voor de uitvoering van de opdracht, tijdig en volledig aan te leveren. TVM Networks is niet aansprakelijk voor schade die voortvloeit uit onjuiste of onvolledige informatieverstrekking door opdrachtgever.",
        "TVM Networks is bevoegd de opdracht of onderdelen daarvan door derden te laten uitvoeren, voor zover dit de kwaliteit van het werk niet in gevaar brengt.",
        "Opdrachtgever staat in voor de juistheid, volledigheid en rechtmatigheid van door hem/haar aangeleverde materialen (waaronder logo's, teksten en afbeeldingen) en vrijwaart TVM Networks voor aanspraken van derden die hieruit voortvloeien.",
        "TVM Networks is gerechtigd de opdracht op te schorten zolang opdrachtgever niet heeft voldaan aan zijn informatie- of medewerkingsplicht als bedoeld in lid 4.2.",
      ],
    },
    {
      titel: "Meerwerk en wijzigingen",
      leden: [
        "Indien opdrachtgever wijzigingen verzoekt die buiten de oorspronkelijke opdracht vallen, is sprake van meerwerk. TVM Networks zal dit schriftelijk bevestigen en de meerkosten worden afzonderlijk in rekening gebracht.",
        "Meerwerk wordt berekend op basis van het geldende uurtarief van TVM Networks of een separaat overeengekomen bedrag.",
        "TVM Networks is niet verplicht gevolg te geven aan een wijzigingsverzoek indien dit de kwaliteit of continuïteit van de overige werkzaamheden in gevaar brengt.",
        "Meerwerk geeft opdrachtgever geen recht op verlenging van de opleveringstermijn.",
      ],
    },
    {
      titel: "Opleveringstermijnen",
      leden: [
        "Door TVM Networks opgegeven opleveringstermijnen zijn indicatief en zijn derhalve niet te beschouwen als fatale termijnen, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.",
        "Overschrijding van een indicatieve opleveringstermijn geeft opdrachtgever geen recht op schadevergoeding, ontbinding van de overeenkomst of opschorting van zijn betalingsverplichting, tenzij sprake is van opzet of grove nalatigheid aan de zijde van TVM Networks.",
        "TVM Networks heeft recht op een redelijke verlenging van de opleveringstermijn indien opdrachtgever niet tijdig de benodigde informatie, goedkeuringen of materialen aanlevert, of indien anderszins vertraging optreedt die niet aan TVM Networks is toe te rekenen.",
      ],
    },
    {
      titel: "Tarieven en betaling",
      leden: [
        "Alle tarieven zijn exclusief btw, tenzij anders vermeld. Aan consumenten worden tarieven inclusief btw gecommuniceerd.",
        {
          tekst: "Tenzij schriftelijk anders overeengekomen, geldt de volgende betalingsstructuur:",
          items: [
            "50% van het overeengekomen bedrag bij aanvang van de werkzaamheden (aanbetaling);",
            "50% van het overeengekomen bedrag na oplevering van het werk.",
          ],
          itemStijl: "streep",
        },
        "Betaling dient te geschieden binnen 14 dagen na factuurdatum, door middel van overboeking op het door TVM Networks aangegeven rekeningnummer, zonder recht op verrekening of opschorting.",
        "Bij overschrijding van de betalingstermijn is opdrachtgever van rechtswege in verzuim, zonder dat een nadere ingebrekestelling is vereist. Vanaf de vervaldatum is de wettelijke handelsrente verschuldigd conform artikel 6:119a BW (B2B) respectievelijk artikel 6:119 BW (consumenten).",
        "Alle buitengerechtelijke incassokosten die TVM Networks maakt ter invordering van onbetaalde bedragen zijn voor rekening van opdrachtgever. Voor zakelijke opdrachtgevers bedragen deze kosten minimaal 15% van het openstaande bedrag met een minimum van € 150,–, onverminderd het recht van TVM Networks op vergoeding van alle werkelijk gemaakte kosten. Voor consumenten worden incassokosten berekend conform de Wet normering buitengerechtelijke incassokosten (WIK).",
        "Indien de financiële positie of het betalingsgedrag van opdrachtgever daartoe aanleiding geeft, is TVM Networks gerechtigd aanvullende zekerheid te verlangen of de uitvoering van werkzaamheden op te schorten totdat betaling is ontvangen dan wel zekerheid is gesteld.",
        "TVM Networks behoudt zich het recht voor de overeengekomen prijs te wijzigen indien zich na de totstandkoming van de overeenkomst aantoonbare kostprijsverhogingen voordoen. Bij opdrachten met consumenten geldt dat een prijsverhoging binnen drie maanden na totstandkoming de consument het recht geeft de overeenkomst kosteloos te ontbinden.",
      ],
    },
    {
      titel: "Annulering en opzegging",
      leden: [
        {
          tekst: "Opdrachtgever heeft het recht de overeenkomst schriftelijk te annuleren. De volgende annuleringsvergoedingen zijn van toepassing:",
          tabel: {
            kop: ["Fase van de opdracht", "Annuleringsvergoeding"],
            rijen: [
              ["Vóór aanvang van de werkzaamheden", "30% van het overeengekomen totaalbedrag"],
              ["Na aanvang, nog niet afgerond (< 75% gereed)", "80% van het overeengekomen totaalbedrag"],
              ["Afrondingsfase (≥ 75% gereed)", "100% van het overeengekomen totaalbedrag"],
            ],
          },
        },
        "Reeds gemaakte kosten, waaronder materiaalkosten, ingehuurde derden en reiskosten, worden te allen tijde volledig in rekening gebracht, ook indien deze het toepasselijke annuleringspercentage overstijgen.",
        {
          tekst: "TVM Networks heeft het recht de overeenkomst met onmiddellijke ingang schriftelijk te ontbinden of op te schorten indien:",
          items: [
            "opdrachtgever in staat van faillissement verkeert of surseance van betaling heeft aangevraagd;",
            "opdrachtgever zijn verplichtingen niet, niet tijdig of niet volledig nakomt na schriftelijke ingebrekestelling met een redelijke herstelperiode.",
          ],
        },
        "In geval van ontbinding door TVM Networks op grond van lid 8.3 zijn alle openstaande vorderingen onmiddellijk en volledig opeisbaar.",
      ],
    },
    {
      titel: "Intellectueel eigendom en gebruiksrecht",
      leden: [
        "Alle intellectuele eigendomsrechten op het door TVM Networks vervaardigde werk — waaronder in ieder geval het auteursrecht als bedoeld in de Auteurswet — berusten uitsluitend bij TVM Networks, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.",
        "Na volledige betaling van het overeengekomen bedrag verleent TVM Networks aan opdrachtgever een niet-exclusief, niet-overdraagbaar en niet-sublicentieerbaar gebruiksrecht op het geleverde werk, voor het doel en de wijze zoals overeengekomen bij de opdracht.",
        "Het is opdrachtgever niet toegestaan het werk te bewerken, te verveelvoudigen voor derden of buiten het overeengekomen doel te gebruiken, zonder voorafgaande schriftelijke toestemming van TVM Networks.",
        "Zolang opdrachtgever niet aan alle betalingsverplichtingen heeft voldaan, is het gebruik van het geleverde werk niet toegestaan. TVM Networks behoudt zich het recht voor het gebruiksrecht bij onbetaalde facturen in te trekken.",
        "TVM Networks behoudt te allen tijde het recht het door hem vervaardigde werk te gebruiken voor eigen promotionele doeleinden, waaronder portfolio, website en sociale media, tenzij opdrachtgever hiertegen binnen 14 dagen na oplevering schriftelijk en gemotiveerd bezwaar maakt.",
        "TVM Networks heeft het recht zijn naam te vermelden op of bij het geleverde werk conform artikel 25 Auteurswet, tenzij dit redelijkerwijs niet mogelijk is gezien de aard van het werk.",
        "Ruwe beelden, ruwe opnamen, niet-geselecteerde foto's en tussentijdse versies worden niet overgedragen en blijven eigendom van TVM Networks.",
      ],
    },
    {
      titel: "Aansprakelijkheid",
      leden: [
        "TVM Networks is uitsluitend aansprakelijk voor directe schade die het rechtstreekse gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.",
        "De aansprakelijkheid van TVM Networks is te allen tijde beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht (exclusief btw), met een maximum van € 5.000,– per schadeveroorzakende gebeurtenis.",
        {
          tekst: "TVM Networks is nimmer aansprakelijk voor:",
          items: [
            "indirecte schade, gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie;",
            "schade die voortvloeit uit onjuiste, onvolledige of te laat aangeleverde informatie of materialen door opdrachtgever;",
            "schade veroorzaakt door aangeleverde materialen die inbreuk maken op rechten van derden;",
            "schade als gevolg van overmacht als bedoeld in artikel 12.",
          ],
        },
        "De aansprakelijkheidsbeperkingen in dit artikel gelden niet voor schade die het gevolg is van opzet of bewuste roekeloosheid van TVM Networks.",
        "Eventuele aanspraken van opdrachtgever vervallen indien deze niet binnen 12 maanden nadat opdrachtgever bekend was of redelijkerwijs bekend kon zijn met de schade, schriftelijk bij TVM Networks zijn ingediend.",
      ],
    },
    {
      titel: "Klachten en acceptatie",
      leden: [
        "Opdrachtgever dient het opgeleverde werk direct na ontvangst te inspecteren. Klachten over het geleverde werk dienen schriftelijk en gemotiveerd binnen 14 dagen na oplevering bij TVM Networks te worden ingediend.",
        "Na het verstrijken van de termijn in lid 11.1 wordt het werk geacht door opdrachtgever te zijn aanvaard. Klachten ingediend na deze termijn worden niet in behandeling genomen, tenzij het gebrek redelijkerwijs niet eerder ontdekt kon worden.",
        "Het indienen van een klacht schort de betalingsverplichting van opdrachtgever niet op.",
        "Indien een klacht gegrond wordt bevonden, heeft TVM Networks de keuze om het werk te herstellen, te vervangen of het gefactureerde bedrag (gedeeltelijk) te crediteren, zonder tot verdere schadevergoeding gehouden te zijn.",
      ],
    },
    {
      titel: "Overmacht",
      leden: [
        "TVM Networks is niet aansprakelijk indien een tekortkoming het gevolg is van overmacht. Onder overmacht wordt in ieder geval verstaan: ziekte, storingen in internet of stroomvoorziening, brand, overheidsmaatregelen, extreme weersomstandigheden, uitval van apparatuur en andere van buiten komende oorzaken die redelijkerwijs niet voorzienbaar waren.",
        "In geval van overmacht heeft TVM Networks het recht de uitvoering van de overeenkomst op te schorten dan wel de overeenkomst te ontbinden, zonder gehouden te zijn tot enige schadevergoeding.",
        "Indien de overmachtssituatie langer dan 60 dagen voortduurt, heeft opdrachtgever het recht de overeenkomst schriftelijk te ontbinden, voor zover de overeenkomst nog niet is uitgevoerd. Reeds geleverde prestaties en gemaakte kosten worden in dat geval vergoed.",
      ],
    },
    {
      titel: "Geheimhouding en privacy",
      leden: [
        {
          tekst: "TVM Networks verwerkt persoonsgegevens van opdrachtgevers conform de Algemene Verordening Gegevensbescherming (AVG/GDPR). Meer informatie is opgenomen in de privacyverklaring van TVM Networks, beschikbaar via ",
          link: { label: "www.tvm-productions.nl/privacy", href: "/privacy/" },
          tekstNa: " of op verzoek.",
        },
        "Beide partijen zijn verplicht tot geheimhouding van vertrouwelijke informatie die zij in het kader van de opdracht verkrijgen. Informatie geldt als vertrouwelijk indien dit door een partij is aangegeven of dit redelijkerwijs voortvloeit uit de aard van de informatie.",
        "TVM Networks is gerechtigd de naam, het project en het eindresultaat van opdrachtgever als referentie te gebruiken, tenzij opdrachtgever hiertegen schriftelijk bezwaar heeft gemaakt.",
        "De geheimhoudingsplicht geldt niet voor informatie die reeds openbaar was of wordt, of waarvan TVM Networks de verstrekking is verplicht op grond van wet- of regelgeving.",
      ],
    },
    {
      titel: "Consumentenbepalingen",
      leden: [
        "Dit artikel is uitsluitend van toepassing op opdrachtgevers die als consument handelen (niet in de uitoefening van een beroep of bedrijf).",
        "Bij op afstand gesloten overeenkomsten (bijv. per e-mail of via de website) heeft de consument het recht de overeenkomst binnen 14 dagen na totstandkoming zonder opgave van redenen te ontbinden (herroepingsrecht), conform artikel 6:230o e.v. BW.",
        "Het herroepingsrecht vervalt zodra TVM Networks met uitdrukkelijke instemming van de consument is aangevangen met de uitvoering van de dienst. Door akkoord te gaan met de offerte en TVM Networks te verzoeken met de werkzaamheden te beginnen, doet de consument afstand van zijn herroepingsrecht voor het reeds uitgevoerde deel.",
        "Voor consumenten gelden de wettelijke garantiebepalingen van Boek 7 BW, voor zover deze niet contractueel kunnen worden uitgesloten.",
        "Bepalingen in deze algemene voorwaarden die in strijd zijn met dwingendrechtelijke consumentenbeschermingsbepalingen zijn niet van toepassing op consumenten; de overige bepalingen blijven dan gelden.",
      ],
    },
    {
      titel: "Toepasselijk recht en geschillen",
      leden: [
        "Op alle overeenkomsten en rechtsverhoudingen tussen TVM Networks en opdrachtgever is uitsluitend Nederlands recht van toepassing.",
        "Geschillen worden in eerste instantie geprobeerd op te lossen door middel van overleg. Indien partijen er niet in slagen het geschil minnelijk op te lossen, wordt het geschil voorgelegd aan de bevoegde rechter van de Rechtbank Noord-Holland, locatie Haarlem, tenzij de wet dwingend een andere rechter aanwijst.",
        "Consumenten zijn te allen tijde bevoegd het geschil voor te leggen aan de rechter van hun woonplaats of aan een bevoegde geschillencommissie.",
      ],
    },
  ],
};
