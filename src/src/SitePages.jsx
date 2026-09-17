import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import tvmLogo from "../assets/brand/tvm-logo-source.png";
import sunforce from "../assets/portfolio/sunforce.jpeg";
import kesProject from "../assets/portfolio/kes-project.jpeg";
import vestoProduct from "../assets/portfolio/vesto-product.jpeg";
import woonmaandInterior from "../assets/portfolio/woonmaand-interior.jpeg";
import terLeedeEvent from "../assets/portfolio/ter-leede-event.jpeg";
import behindTheScenes from "../assets/portfolio/behind-the-scenes.jpeg";
import tygoCamera from "../assets/portfolio/tygo-camera.jpeg";
import tygoPortrait from "../assets/portfolio/tygo-portrait.jpeg";
import Footer from "./Footer";
import { getMeta } from "../site/seo.js";
import { videoUrl } from "../site/media.js";
import { serviceNode, faqNode } from "../site/schema.js";
import JsonLd from "../site/JsonLd.jsx";
import { SITE_URL } from "../site/business.js";
import StickyCta from "../site/StickyCta.jsx";
import ArrowSwap from "../site/ArrowSwap.jsx";
import Breadcrumbs from "../site/Breadcrumbs.jsx";
import SubpageHero from "../site/SubpageHero.jsx";
import HoeIkHelp from "./HoeIkHelp.jsx";
import OplossingPagina from "./OplossingPagina.jsx";
import { oplossingen } from "../site/oplossingen.js";
import { titleProps } from "../site/typography.js";
import Testimonials from "../site/Testimonials.jsx";
import { trackEvent } from "../site/analytics.js";
import corkesProject from "../assets/portfolio/corkes-project.jpeg";
import daanVastgoed from "../assets/portfolio/daan-vastgoed.jpeg";
import droneProduction from "../assets/portfolio/drone-production.jpeg";
import hsbBusiness from "../assets/portfolio/hsb-business.jpeg";
import productShoot from "../assets/portfolio/product-shoot.jpeg";
import studioProduction from "../assets/portfolio/studio-production.jpeg";
import wines24VideoPoster from "../assets/portfolio/cases/24wines-video-poster.jpg";
import wines24InpakkenPoster from "../assets/portfolio/cases/24wines-inpakken-poster.jpg";
import terLeedeVideoPoster from "../assets/portfolio/cases/ter-leede-video-poster.jpg";

// `omschrijving` zegt wat de serie laat zien; per foto komt daar alleen het
// volgnummer bij, omdat de losse beelden niet apart beschreven zijn.
function selectieGallery(globResult, omschrijving) {
  const keys = Object.keys(globResult).sort();
  return keys.map((key, i) => ({ src: globResult[key], alt: `${omschrijving} (${i + 1} van ${keys.length})` }));
}

const wines24Selectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/24wines-selectie/*.jpg", { eager: true, import: "default" }), "Bedrijfsvideo en productfotografie voor 24Wines in Volendam: winkel, assortiment en inpakproces");
const hsbSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/hsb-selectie/*.jpg", { eager: true, import: "default" }), "Eventfotografie voor HSB x FC Volendam: presentaties, zaal en vestiging");
const kesSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/kes-selectie/*.jpg", { eager: true, import: "default" }), "Projectfotografie voor Kes Sloopwerk: materieel, mensen en uitvoering op locatie");
const bladergroenSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/bladergroen-selectie/*.jpg", { eager: true, import: "default" }), "Campagnefotografie voor SG WJ Bladergroen: leerlingen in de les, praktijkvakken en schoolplein");
const stichtingSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/stichting-selectie/*.jpg", { eager: true, import: "default" }), "Fotoreportage voor Stichting voor het Kind: opnamesessie van de single in de studio");
const sunforceSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/sunforce-selectie/*.jpg", { eager: true, import: "default" }), "Bedrijfsfotografie voor Sunforce: installatie van zonnepanelen, techniek en team");
const terLeedeSelectie = selectieGallery(import.meta.glob("../assets/portfolio/cases/ter-leede-selectie/*.jpg", { eager: true, import: "default" }), "Eventfotografie van het Business Diner van Business Club Ter Leede");
import jaimmRuimte1 from "../assets/portfolio/cases/jaimm-gallery/ruimte-01.jpg";
import jaimmRuimte2 from "../assets/portfolio/cases/jaimm-gallery/ruimte-02.jpg";
import jaimmRuimte3 from "../assets/portfolio/cases/jaimm-gallery/ruimte-03.jpg";
import jaimmRuimte4 from "../assets/portfolio/cases/jaimm-gallery/ruimte-04.jpg";
import jaimmPortret1 from "../assets/portfolio/cases/jaimm-gallery/portret-01.jpg";
import jaimmBehandeling1 from "../assets/portfolio/cases/jaimm-gallery/behandeling-01.jpg";
import jaimmBehandeling2 from "../assets/portfolio/cases/jaimm-gallery/behandeling-02.jpg";
import jaimmBehandeling3 from "../assets/portfolio/cases/jaimm-gallery/behandeling-03.jpg";
import jaimmBehandeling4 from "../assets/portfolio/cases/jaimm-gallery/behandeling-04.jpg";
import jaimmBehandeling5 from "../assets/portfolio/cases/jaimm-gallery/behandeling-05.jpg";
import jaimmBehandeling6 from "../assets/portfolio/cases/jaimm-gallery/behandeling-06.jpg";
import jaimmCloseup3 from "../assets/portfolio/cases/jaimm-gallery/closeup-03.jpg";

// Zelfde vier items als op de homepage; zie de toelichting daar.
// Zelfde drie oplossingen als op de homepage; het menu wijst naar de ankers daar.
const OPLOSSINGEN_MENU = [
  ["Zichtbaar worden", "/oplossingen/zichtbaar-worden/", "Laat zien wat je bedrijf onderscheidt."],
  ["Medewerkers aantrekken", "/oplossingen/medewerkers-aantrekken/", "Laat zien waarom mensen bij jou willen werken."],
  ["Duidelijk uitleggen", "/oplossingen/duidelijk-uitleggen/", "Maak complexe producten, diensten of processen begrijpelijk."],
];

const navItems = [
  ["Oplossingen", "/oplossingen/zichtbaar-worden/"],
  ["Mijn aanpak", "/werkwijze/"],
  ["Cases", "/cases/"],
  ["Over mij", "/over/"],
];


export const serviceData = {
  bedrijfsvideo: {
    title: "Bedrijfsvideo laten maken",
    short: "Bedrijfsfilm",
    label: "Je bedrijf helder in beeld",
    seo: { title: "Bedrijfsvideo of bedrijfsfilm laten maken | TVM Productions", description: "Een bedrijfsvideo laten maken die laat zien wie je bent, wat je doet en hoe je werkt. Bedrijfsfilm of corporate video voor website, sales en recruitment." },
    related: { oplossing: "zichtbaar-worden", diensten: ["klantcasevideo", "bedrijfsfotografie"] },
    intro: "Laat in een paar minuten zien wie je bent, wat je doet en hoe je bedrijf werkt. Een goede basis voor je website — geen wondermiddel voor meer aanvragen.",
    answer: "Een bedrijfsvideo — ook wel bedrijfsfilm of corporate video — laat in grote lijnen zien wie je organisatie is, welke mensen er werken en hoe jullie klanten helpen. Handig als brede basis voor je website of een eerste kennismaking, maar niet de snelste weg naar meer aanvragen of sollicitanten. Heb je één concreet doel, zoals sales of recruitment? Dan werkt een video met een scherpere insteek meestal beter.",
    image: sunforce,
    situations: ["Je website vertelt nog niet goed wat je bedrijf anders maakt", "Nieuwe klanten willen eerst zien met wie ze zaken doen", "Je wilt één sterke video die op meerdere plekken werkt"],
    deliverables: ["Concept en duidelijke verhaallijn", "Opnames op locatie", "Hoofdfilm voor website en presentaties", "Korte versies voor social media", "Ondertiteling en exports per kanaal"],
    faqs: [["Hoe lang wordt een bedrijfsvideo?", "Meestal tussen één en drie minuten. De juiste lengte hangt af van het verhaal en de plek waar de video wordt bekeken."], ["Moeten medewerkers ervaring voor de camera hebben?", "Nee. Ik bereid gesprekken rustig voor en stel vragen buiten beeld. Daardoor blijft het natuurlijk."], ["Kunnen we ook foto's laten maken?", "Ja. Foto en video combineren op één draaidag levert een consistente beeldbank op."]],
  },
  promotievideo: {
    title: "Promotievideo laten maken",
    short: "Promotievideo",
    label: "Eén aanbod. Eén duidelijke actie.",
    seo: { title: "Promotievideo of promotiefilm laten maken | TVM Productions", description: "Een promotievideo laten maken die één product, dienst of campagne scherp neerzet en de kijker naar een concrete actie stuurt. Voor landingspagina, ads en social." },
    related: { oplossing: "zichtbaar-worden", diensten: ["bedrijfsvideo", "productfotografie"] },
    intro: "Zet een product, dienst of campagne scherp neer met een video die snel tot de kern komt.",
    answer: "Een promotievideo of promotiefilm zet één product, dienst of campagne centraal en stuurt de kijker naar een concrete volgende stap. De video is kort, visueel en direct opgebouwd. Je gebruikt hem op een landingspagina, in advertenties of op social media om snel duidelijk te maken wat je aanbiedt en waarom dat relevant is.",
    image: vestoProduct,
    situations: ["Je introduceert een nieuw product of nieuwe dienst", "Je campagne heeft sterk beeld nodig", "Je wilt advertenties maken die direct duidelijk zijn"],
    deliverables: ["Campagneconcept", "Shotlist en productieplanning", "Hoofdvideo", "Verticale en vierkante versies", "Varianten voor advertenties"],
    faqs: [["Hoe kort kan een promotievideo zijn?", "Voor advertenties werkt 15 tot 30 seconden vaak goed. Voor een landingspagina kan meer uitleg nodig zijn."], ["Kunnen er meerdere versies worden gemaakt?", "Ja. We plannen de productie zo dat verschillende openingen, lengtes en formaten mogelijk zijn."], ["Help je ook met de boodschap?", "Ja. Vooraf brengen we terug wat iemand na het kijken moet begrijpen en doen."]],
  },
  klantcasevideo: {
    title: "Klantcasevideo laten maken",
    short: "Klantcasevideo",
    label: "Laat klanten het bewijs leveren",
    seo: { title: "Klantcase- & testimonial video laten maken | TVM Productions", description: "Een klantcasevideo of testimonial video waarin een echte klant vertelt over de samenwerking en het resultaat. Geloofwaardig bewijs voor website en sales." },
    related: { oplossing: "zichtbaar-worden", diensten: ["bedrijfsvideo", "projectvideo"] },
    intro: "Een tevreden klant vertelt geloofwaardiger waarom jouw aanpak werkt dan welke verkooppagina ook.",
    answer: "In een klantcasevideo (testimonial video of referentievideo) vertelt een echte klant over de beginsituatie, jullie samenwerking en de uiteindelijke uitkomst. Daardoor wordt je belofte concreet en geloofwaardig. Je gebruikt de video op je website, LinkedIn of in salesgesprekken om twijfelaars te laten zien hoe jouw aanpak in de praktijk werkt.",
    image: behindTheScenes,
    situations: ["Klanten vragen vaak om voorbeelden", "Je wilt je aanpak bewijzen zonder zelf harder te roepen", "Je hebt een samenwerking waar een goed verhaal in zit"],
    deliverables: ["Voorinterview met klant", "Interview en sfeerbeelden", "Volledige casevideo", "Korte quotevideo's", "Ondertiteling voor gebruik zonder geluid"],
    faqs: [["Hoe bereid je de klant voor?", "De klant ontvangt vooraf duidelijke onderwerpen, geen ingestudeerd script. Zo blijft het gesprek ontspannen."], ["Kan de video bij de klant op locatie?", "Ja. De omgeving maakt de case vaak juist concreter en geloofwaardiger."], ["Wat als iemand nerveus is?", "We nemen tijd, praten eerst zonder camera en bouwen het interview rustig op."]],
  },
  uitlegvideo: {
    title: "Uitlegvideo laten maken",
    short: "Uitlegvideo",
    label: "Maak een ingewikkeld verhaal simpel",
    seo: { title: "Uitlegvideo of explainer video laten maken | TVM Productions", description: "Een uitlegvideo laten maken die een product, proces of dienst in één keer begrijpelijk maakt. Explainer of instructievideo met praktijkbeeld, voice-over of demo." },
    related: { oplossing: "duidelijk-uitleggen", diensten: ["projectvideo", "productfotografie"] },
    intro: "Leg een proces, product of dienst uit zonder dat mensen afhaken in lange tekst.",
    answer: "Een uitlegvideo (explainer video of instructievideo) brengt een ingewikkeld product, proces of dienst terug tot een logische en visuele lijn. Met praktijkbeeld, demonstratie, tekst of voice-over ziet de kijker snel hoe iets werkt. Dat maakt uitlegvideo’s geschikt voor onder meer zorg, techniek, software en zakelijke dienstverlening.",
    image: woonmaandInterior,
    situations: ["Je dienst kost nu te veel woorden om uit te leggen", "Klanten stellen steeds dezelfde vragen", "Sales heeft behoefte aan een duidelijke visuele uitleg"],
    deliverables: ["Inhoudelijke sessie", "Script in gewone taal", "Opnames of visuele demonstratie", "Heldere montage met titels", "Versies voor website en social"],
    faqs: [["Schrijf je het script?", "Ja. Ik maak van jouw inhoud een logisch verhaal en leg de tekst voor productie ter controle voor."], ["Kan een uitlegvideo zonder presentator?", "Ja. Dat kan met demonstratie, voice-over, tekst in beeld of een combinatie."], ["Hoe lang duurt zo'n video?", "Vaak tussen 60 seconden en drie minuten. Kort genoeg om aandacht vast te houden, lang genoeg om iets echt uit te leggen."]],
  },
  projectvideo: {
    title: "Projectvideo laten maken",
    short: "Projectvideo",
    label: "Laat zien wat je bouwt en oplost",
    seo: { title: "Projectvideo & bouwvideo laten maken | TVM Productions", description: "Een projectvideo of bouwvideo die uitvoering, vakmanschap en eindresultaat van een project in beeld brengt. Bewijs richting opdrachtgevers en nieuwe medewerkers." },
    related: { oplossing: "duidelijk-uitleggen", diensten: ["bedrijfsvideo", "bedrijfsfotografie"] },
    intro: "Breng een bouwproject, installatie of technisch traject overtuigend in beeld—van uitvoering tot eindresultaat.",
    answer: "Een projectvideo, bouwvideo of projectfilm maakt zichtbaar wat normaal achter hekken, op een dak of in een werkplaats gebeurt. De video laat proces, vakmanschap en eindresultaat in samenhang zien. Daardoor kun je een uitgevoerd project gebruiken als bewijs richting nieuwe opdrachtgevers, medewerkers en andere betrokken partijen.",
    image: kesProject,
    situations: ["Je wilt een afgerond project als case gebruiken", "De kwaliteit van je werk is lastig in woorden uit te leggen", "Je hebt beeld nodig voor opdrachtgevers en nieuwe collega's"],
    deliverables: ["Locatiescan en veiligheidsafstemming", "Opnames van mensen, proces en resultaat", "Projectfilm", "Fotoreportage als optie", "Korte social edits"],
    faqs: [["Kun je op een bouwplaats filmen?", "Ja. Vooraf stemmen we toegang, veiligheid en planning af met de betrokken partijen."], ["Is dronebeeld mogelijk?", "Als locatie, vergunningen en weersomstandigheden het toelaten kan dronebeeld onderdeel zijn van de productie."], ["Kun je meerdere fases vastleggen?", "Ja. Dan plannen we meerdere korte draaimomenten verspreid over het project."]],
  },
  "eventvideo-fotografie": {
    title: "Eventvideo en fotografie",
    short: "Eventregistratie",
    label: "De sfeer én inhoud vastgelegd",
    seo: { title: "Eventvideo en aftermovie laten maken | TVM Productions", description: "Eventvideo, aftermovie en eventfotografie voor zakelijke evenementen. Sfeer, sprekers en momenten vastgelegd als terugblik en promotie voor de volgende editie." },
    related: { oplossing: "zichtbaar-worden", diensten: ["bedrijfsfotografie", "promotievideo"] },
    intro: "Gebruik je evenement langer dan één dag met een aftermovie, foto's en korte content voor de volgende editie.",
    answer: "Eventvideo (een aftermovie) en eventfotografie leggen de sfeer, bezoekers, sprekers en belangrijkste momenten van een bijeenkomst vast. Het materiaal werkt na afloop door als terugblik, promotie voor een volgende editie en content voor interne communicatie of social media. Vooraf spreken we af welke momenten en personen zeker in beeld moeten.",
    image: terLeedeEvent,
    situations: ["Je organiseert een zakelijk event of netwerkdag", "De volgende editie moet direct goed kunnen worden gepromoot", "Je wilt foto en video door één partij laten verzorgen"],
    deliverables: ["Vooraf een helder draaiplan", "Sfeer- en inhoudelijke registratie", "Aftermovie", "Selectie nabewerkte foto's", "Korte clips voor social"],
    faqs: [["Kunnen foto en video tegelijk?", "Ja. Afhankelijk van programma en omvang werk ik alleen of met een extra specialist."], ["Hoe snel is een korte recap beschikbaar?", "Een snelle social recap kan vooraf worden ingepland. De definitieve aftermovie volgt na selectie en montage."], ["Neem je ook volledige presentaties op?", "Dat kan. We stemmen vooraf af welke onderdelen volledig en welke vooral sfeervol worden vastgelegd."]],
  },
  bedrijfsfotografie: {
    title: "Bedrijfsfotografie in Purmerend",
    short: "Bedrijfsfotografie",
    label: "Een beeldbank die bij je bedrijf past",
    seo: { title: "Bedrijfsfotografie in Purmerend | TVM Productions", description: "Bedrijfsfotografie op locatie: portretten, mensen aan het werk en sfeerbeeld van je bedrijf. Zakelijke fotografie voor website, vacatures en social media." },
    related: { oplossing: "zichtbaar-worden", diensten: ["productfotografie", "bedrijfsvideo"] },
    intro: "Geen willekeurige stockfoto's, maar echte mensen, echte locaties en werk dat herkenbaar in beeld staat.",
    answer: "Bedrijfsfotografie (zakelijke fotografie of een bedrijfsreportage) levert een samenhangende serie portretten, sfeerbeelden, locaties en mensen aan het werk op. Daarmee vervang je willekeurige stockfoto’s door beeld dat echt bij je organisatie past. De foto’s zijn inzetbaar op je website, in vacatures, presentaties, drukwerk en social media.",
    image: tygoCamera,
    situations: ["Je website gebruikt verouderde of verschillende beeldstijlen", "Nieuwe medewerkers en klanten willen de mensen achter het bedrijf zien", "Je hebt regelmatig beeld nodig voor marketing"],
    deliverables: ["Visuele voorbereiding", "Portretten en mensen aan het werk", "Locatie- en detailbeelden", "Professionele selectie en nabewerking", "Bestanden voor web en drukwerk"],
    faqs: [["Hoeveel foto's worden geleverd?", "Dat hangt af van draaiduur en shotlist. In het voorstel staat vooraf een heldere indicatie."], ["Kunnen medewerkers zich voorbereiden?", "Ja. Je krijgt praktische kleding- en planningsinformatie om de shoot soepel te laten verlopen."], ["Regel je toestemming en AVG?", "Ik denk mee over een praktische toestemmingsprocedure. De organisatie blijft verantwoordelijk voor correcte toestemming en opslag."]],
  },
  productfotografie: {
    title: "Productfotografie laten maken",
    short: "Productfotografie",
    label: "Laat het product in gebruik zien",
    seo: { title: "Productfotografie voor webshop en campagne | TVM Productions", description: "Productfotografie laten maken: productfoto's in gebruik en in context voor webshop, campagne en social media. Consistente series met overzicht en details." },
    related: { oplossing: "duidelijk-uitleggen", diensten: ["promotievideo", "bedrijfsfotografie"] },
    intro: "Van een strakke productfoto tot een complete lifestyleserie voor campagne, webshop en social media.",
    answer: "Productfotografie laat niet alleen zien hoe een product eruitziet — productfoto's voor webshop of campagne tonen ook waar, hoe en door wie het wordt gebruikt. Dat maakt de toepassing direct begrijpelijk. Je ontvangt een consistente serie voor webshop, campagne en social media, met overzichtsbeelden, details en uitsneden die passen bij ieder kanaal.",
    image: vestoProduct,
    situations: ["Je productbeelden zijn niet consistent", "Je wilt naast webshopfoto's ook campagnebeeld", "Je product moet in een echte gebruikssituatie worden getoond"],
    deliverables: ["Moodboard en shotlist", "Product- of locatieshoot", "Detail- en gebruiksbeelden", "Selectie en nabewerking", "Uitsneden voor webshop en social"],
    faqs: [["Werk je in een studio of op locatie?", "Beide zijn mogelijk. We kiezen wat het product en de gewenste uitstraling het beste ondersteunt."], ["Kunnen modellen onderdeel zijn van de shoot?", "Ja. Casting, locatie en styling worden dan apart in het productievoorstel opgenomen."], ["Lever je vrijstaande packshots?", "Dat kan, maar mijn focus ligt vooral op productbeeld met context en merkgevoel."]],
  },
};

export const caseData = {
  sunforce: {
    title: "Sunforce", type: "Bedrijfsfotografie", image: sunforceSelectie[5]?.src ?? sunforce,
    kop: "Bedrijfsfotografie voor Sunforce",
    dienst: "bedrijfsfotografie",
    seo: { title: "Sunforce — bedrijfsfotografie zonnepanelen | TVM Productions", description: "Bedrijfsfotografie voor Sunforce, installateur van zonnepanelen in Noord-Holland: installatie op het dak, technische keuring en het team op kantoor." },
    intro: "Technisch werk op hoogte, in de meterkast en op kantoor vertaald naar een helder verhaal voor klanten en nieuwe medewerkers.",
    facts: { Klant: "Sunforce", Sector: "Zonne-energie & installatietechniek", Opgeleverd: "Bedrijfsfotografie", Locatie: "Noord-Holland" },
    situation: "Veel van het vakmanschap gebeurt op locatie en blijft voor klanten onzichtbaar. Van de technische keuring in de meterkast tot de installatie op het dak — en het team erachter.",
    made: "Een fotoreportage van de installatie op locatie, technische controles en de sfeer op kantoor.",
    result: "Een veelzijdige beeldbank voor website, sales en social content — van dakwerk tot het team op kantoor.",
    gallery: sunforceSelectie,
  },
  "kes-sloopwerk": {
    title: "Kes Sloopwerk", type: "Projectfotografie", image: kesSelectie[2]?.src ?? kesProject,
    kop: "Projectfotografie voor Kes Sloopwerk",
    dienst: "projectvideo",
    seo: { title: "Kes Sloopwerk — projectfotografie | TVM Productions", description: "Projectfotografie voor Kes Sloopwerk: materieel, mensen en uitvoering van sloop- en grondwerk, vastgelegd van het eerste graafwerk tot de afronding." },
    intro: "Projectwerk vastgelegd zonder de energie en schaal van de locatie kwijt te raken.",
    facts: { Klant: "Kes Sloopwerken", Sector: "Sloop- en grondwerk", Opgeleverd: "Projectfotografie", Locatie: "Wieringenlaan" },
    situation: "Telefoonbeelden deden geen recht aan het materieel, de mensen en de uitvoering.",
    made: "Een gerichte fotoreportage met overzicht, actie en details van het werk, van het eerste graafwerk tot de afronding.",
    result: "Een bruikbare beeldserie voor website, projecten en online zichtbaarheid.",
    gallery: kesSelectie,
  },
  vesto: { title: "Vesto", type: "Productfotografie", image: vestoProduct, kop: "Productfotografie voor Vesto", dienst: "productfotografie", seo: { title: "Vesto — productfotografie gereedschap | TVM Productions", description: "Productfotografie voor Vesto: gereedschap gefotografeerd op locatie, in gebruik en in zijn omgeving. Een frisse beeldserie voor productpagina's en campagnes." }, intro: "Een productserie die het gereedschap niet alleen toont, maar in zijn omgeving laat werken.", situation: "Het product had helder en aantrekkelijk beeld nodig voor online gebruik.", made: "Productfoto's op locatie met aandacht voor vorm, materiaal en gebruik.", result: "Een frisse beeldbank voor productpagina's en campagnes." },
  "ter-leede": {
    title: "Ter Leede", type: "Eventreportage", image: terLeedeSelectie[5]?.src,
    kop: "Eventvideo en fotografie voor Business Club Ter Leede",
    dienst: "eventvideo-fotografie",
    seo: { title: "Ter Leede — aftermovie en eventfotografie | TVM Productions", description: "Aftermovie en eventfotografie van het Business Diner van Business Club Ter Leede: ontvangst, speeches, sponsormomenten en show, voor terugblik en social media." },
    intro: "Een zakelijk diner met entertainment, sponsoractiviteiten en een feestelijke show vastgelegd van ontvangst tot late avond.",
    facts: { Klant: "Business Club Ter Leede", Sector: "Zakelijk netwerkevent", Opgeleverd: "Eventvideo + fotografie", Locatie: "De Rustende Jager" },
    situation: "De organisatie wilde de sfeer bewaren en tegelijk materiaal voor een volgende editie.",
    made: "Een fotoreportage van ontvangst, speeches, sponsormomenten en de samba-show, aangevuld met een aftermovie die de avond in beweging vastlegt.",
    result: "Herbruikbaar beeld én video voor terugblik, uitnodiging en social media.",
    video: { src: videoUrl("/videos/ter-leede/business-diner.mp4"), poster: terLeedeVideoPoster, title: "Aftermovie — Business Diner" },
    gallery: terLeedeSelectie,
  },
  "24wines": {
    title: "24Wines", type: "Bedrijfsvideo", image: wines24Selectie[6]?.src,
    kop: "Bedrijfsvideo voor 24Wines in Volendam",
    dienst: "bedrijfsvideo",
    seo: { title: "24Wines — bedrijfsvideo in Volendam | TVM Productions", description: "Bedrijfsvideo en productfotografie voor slijterij 24Wines in Volendam: winkel, assortiment en inpakproces in beeld, zodat een online bestelling een gezicht krijgt." },
    intro: "Een slijterij vol verhalen — van het assortiment tot de laatste stap voordat een bestelling de deur uitgaat.",
    facts: { Klant: "24Wines", Sector: "Slijterij & wijnhandel", Opgeleverd: "Bedrijfsvideo + fotografie", Locatie: "Volendam" },
    situation: "24Wines wilde laten zien wat er achter een online bestelling schuilgaat: het assortiment, de sfeer in de zaak en de zorg waarmee iedere fles wordt ingepakt.",
    made: "Een bedrijfsvideo die de winkel en het aanbod in beeld brengt, aangevuld met productfotografie en een behind-the-scenes video van het inpakproces.",
    result: "Beeldmateriaal dat vertrouwen wekt bij nieuwe klanten en 24Wines onderscheidt van een anonieme webshop.",
    video: { src: videoUrl("/videos/24wines/algemeen.mp4"), poster: wines24VideoPoster, title: "24Wines — het verhaal" },
    videoSecondary: { src: videoUrl("/videos/24wines/inpakken.mp4"), poster: wines24InpakkenPoster, title: "Achter de schermen: een bestelling inpakken" },
    gallery: wines24Selectie,
  },
  "hsb-fc-volendam": {
    title: "HSB x FC Volendam", type: "Eventfotografie", image: hsbSelectie[1]?.src,
    kop: "Eventfotografie voor HSB x FC Volendam",
    dienst: "eventvideo-fotografie",
    seo: { title: "HSB x FC Volendam — eventfotografie | TVM Productions", description: "Eventfotografie van de bijeenkomst rond de samenwerking tussen HSB en FC Volendam, in opdracht van Qstylez: presentaties, volle zaal en de vestiging in beeld." },
    intro: "Een bedrijfsevenement vastgelegd in opdracht van Qstylez, van de volle zaal tot de vestiging zelf.",
    facts: { Klant: "HSB x FC Volendam", Sector: "Retail — in opdracht van Qstylez", Opgeleverd: "Eventfotografie", Locatie: "Volendam" },
    situation: "Voor de samenwerking tussen HSB en FC Volendam organiseerde het team een bijeenkomst voor medewerkers en relaties. Qstylez wilde de sfeer en inhoud van die dag professioneel vastleggen.",
    made: "Een fotoreportage van de presentaties, de volle zaal en de vestiging, in opdracht van Qstylez uitgevoerd voor HSB.",
    result: "Beeld dat de samenwerking en de betrokkenheid van het team laat zien, inzetbaar voor interne communicatie en promotie.",
    gallery: hsbSelectie,
  },
  "jaimm-pmu": {
    title: "Jaimm PMU", type: "Bedrijfsfotografie", image: jaimmBehandeling5,
    kop: "Bedrijfsfotografie voor Jaimm PMU",
    dienst: "bedrijfsfotografie",
    seo: { title: "Jaimm PMU — bedrijfsfotografie PMU-praktijk | TVM Productions", description: "Bedrijfsfotografie voor Jaimm PMU, praktijk voor permanente make-up: portret, praktijkruimte en behandeling in beeld voor website, social en boekingspagina." },
    intro: "Een praktijk voor permanente make-up in beeld: de ruimte, de behandeling en de vakvrouw erachter.",
    facts: { Klant: "Jaimm PMU", Sector: "Permanente make-up", Opgeleverd: "Bedrijfsfotografie", Locatie: "Praktijk aan huis" },
    situation: "Klanten boeken een behandeling het liefst bij iemand die ze al een beetje kennen. Jaimm had beeld nodig dat vertrouwen wekt, nog vóór het eerste gesprek.",
    made: "Portretfotografie van Jaimm, sfeerbeeld van de praktijkruimte en close-ups van een behandeling in uitvoering.",
    result: "Een complete beeldset voor website, social media en boekingspagina's die direct laat zien wie er achter de behandeltafel staat.",
    gallery: [
      { src: jaimmRuimte1, alt: "De praktijkruimte van Jaimm PMU", caption: "De praktijkruimte: rustig, licht en verzorgd." },
      { src: jaimmPortret1, alt: "Portret van Jaimm" },
      { src: jaimmBehandeling1, alt: "Een PMU-behandeling bij Jaimm PMU", caption: "Een behandeling in volle gang." },
      { src: jaimmRuimte2, alt: "De praktijkruimte van Jaimm PMU" },
      { src: jaimmBehandeling2, alt: "Een PMU-behandeling bij Jaimm PMU" },
      { src: jaimmBehandeling3, alt: "Een PMU-behandeling bij Jaimm PMU" },
      { src: jaimmRuimte3, alt: "De praktijkruimte van Jaimm PMU" },
      { src: jaimmBehandeling4, alt: "Een PMU-behandeling bij Jaimm PMU", caption: "Volledige aandacht voor iedere klant." },
      { src: jaimmBehandeling5, alt: "Een PMU-behandeling bij Jaimm PMU" },
      { src: jaimmCloseup3, alt: "Close-up van een PMU-behandeling" },
      { src: jaimmRuimte4, alt: "De praktijkruimte van Jaimm PMU" },
      { src: jaimmBehandeling6, alt: "Een PMU-behandeling bij Jaimm PMU" },
    ],
  },
  "sg-wj-bladergroen": {
    title: "SG WJ Bladergroen", type: "Campagnefotografie", image: bladergroenSelectie[14]?.src,
    kop: "Campagnefotografie voor SG WJ Bladergroen",
    dienst: "bedrijfsfotografie",
    seo: { title: "SG WJ Bladergroen — campagnefotografie | TVM Productions", description: "Campagnefotografie voor SG WJ Bladergroen: leerlingen in de les, praktijkvakken, sport en het team achter de school, voor website en wervingsmateriaal." },
    intro: "Een doorsnede van het schoolleven bij SG WJ Bladergroen: van het klaslokaal tot het schoolplein.",
    facts: { Klant: "SG WJ Bladergroen", Sector: "Voortgezet onderwijs", Opgeleverd: "Campagnefotografie", Locatie: "Noord-Holland" },
    situation: "De school wilde laten zien hoe divers een schooldag is: praktijkvakken, toetsen, sport en het team achter de school, niet alleen het klaslokaal.",
    made: "Sfeerfotografie door de hele school heen — leerlingen aan het werk, in de les en op het plein, aangevuld met een teamportret.",
    result: "Een herkenbare beeldserie voor de website en wervingsmateriaal die laat zien hoe het er op Bladergroen echt aan toegaat.",
    gallery: bladergroenSelectie,
  },
  "stichting-voor-het-kind": {
    title: "Stichting voor het Kind", type: "Fotoreportage", image: stichtingSelectie[1]?.src,
    kop: "Fotoreportage voor Stichting voor het Kind",
    dienst: "bedrijfsfotografie",
    seo: { title: "Stichting voor het Kind — fotoreportage | TVM Productions", description: "Fotoreportage van de opnamesessie van een goede-doelen-single voor Stichting voor het Kind: de zangers, de techniek en de concentratie in de studio." },
    intro: "Het ontstaan van een goede-doelen-single vastgelegd, van de studio-opnames tot de mannen achter de microfoons.",
    facts: { Klant: "Stichting voor het Kind", Sector: "Goed doel — muziekproductie", Opgeleverd: "Bedrijfsfotografie", Locatie: "Opnamestudio" },
    situation: "Voor een single ten bate van het goede doel moest het verhaal achter de opname net zo overtuigend in beeld komen als het nummer zelf.",
    made: "Een fotoreportage van de opnamesessie in de studio: de zangers, de techniek achter de knoppen en de concentratie tijdens het opnemen.",
    result: "Beeld dat het verhaal achter de single versterkt en inzetbaar is voor promotie van de actie.",
    gallery: stichtingSelectie,
  },
};

// Wat er daadwerkelijk op het herobeeld van iedere dienstpagina te zien is.
const serviceImageAlt = {
  bedrijfsvideo: "Monteur van Sunforce installeert zonnepanelen op een dak",
  promotievideo: "Elektrische bladblazer van Vesto op het gras, gefotografeerd voor de productcampagne",
  klantcasevideo: "Camera op statief tijdens een opname op locatie in een koffiezaak",
  uitlegvideo: "Badkamer met wastafels en spiegels, gefotografeerd voor Woonmaand",
  projectvideo: "Graafmachine aan het werk op een bouwplaats van Kes Sloopwerk",
  "eventvideo-fotografie": "Gasten op het terras tijdens het Business Diner van Ter Leede",
  bedrijfsfotografie: "Tygo Veerman met camera op gimbal tijdens een opname buiten",
  productfotografie: "Elektrische bladblazer van Vesto op het gras, gefotografeerd voor de productcampagne",
};

// Alle vanaf-prijzen staan in servicePageDetails[slug].price en nergens anders:
// de dienstpagina, de tarievenpagina en het Offer-schema lezen dezelfde waarde.
const servicePageDetails = {
  bedrijfsvideo: {
    price: "vanaf €1.495",
    situations: [
      ["Je website vertelt niet het hele verhaal", "Bezoekers zien wat je aanbiedt, maar niet hoe je werkt of waarom klanten juist voor jouw bedrijf kiezen."],
      ["Nieuwe klanten willen eerst vertrouwen", "Een video laat de mensen, locatie en werkwijze zien voordat het eerste gesprek plaatsvindt."],
      ["Je gebruikt overal ander beeld", "Je wilt één sterke productie waaruit materiaal voor website, sales, recruitment en social komt."],
    ],
    deliverables: ["Hoofdfilm van circa 1–3 minuten", "Korte versie van 30–60 seconden", "Liggend 16:9 en verticaal 9:16", "Ondertiteling voor gebruik zonder geluid", "Twee gebundelde feedbackrondes"],
    process: [["Doel en verhaal", "We bepalen wat iemand na het kijken moet begrijpen en doen."], ["Voorbereiding", "Ik maak de verhaallijn, planning, interviewvragen en shotlist."], ["Draaidag", "Interviews en werksituaties worden efficiënt op locatie vastgelegd."], ["Montage en oplevering", "Je ontvangt een eerste versie, geeft feedback en krijgt alle afgesproken formaten."]],
    proof: { client: "24Wines", type: "Bedrijfsvideo", image: wines24Selectie[6]?.src, challenge: "Een webshop voelt anoniem. Klanten zien niet wie erachter zit.", made: "Een bedrijfsvideo in de zaak, aangevuld met productfotografie en het inpakproces in beeld.", result: "Beeld dat vertrouwen wekt en 24Wines onderscheidt van een anonieme webshop.", href: "/cases/24wines/" },
    alternatives: {
      label: "Eerst het doel, dan de vorm",
      title: "EEN BEDRIJFSVIDEO IS NIET VOOR ELK DOEL DE BESTE KEUZE.",
      intro: "Fijn om achter de hand te hebben, maar 'zodat mensen weten dat je bestaat' levert niet vanzelf meer aanvragen op. Recruitment vraagt om een andere insteek dan sales. Vaak werkt één gerichte video beter dan één brede bedrijfsvideo.",
      items: [
        { when: "Eén aanbod onder de aandacht brengen", label: "Promotievideo", text: "Je zet één product, dienst of actie scherp neer en stuurt de kijker direct naar een concrete volgende stap.", href: "/diensten/promotievideo/" },
        { when: "Twijfelaars over de streep trekken", label: "Klantcasevideo", text: "Een tevreden klant vertelt geloofwaardiger waarom jouw aanpak werkt dan een verkooppagina ooit kan.", href: "/diensten/klantcasevideo/" },
        { when: "Een proces of product uitleggen", label: "Uitlegvideo", text: "Je brengt een ingewikkeld aanbod terug tot een simpele, visuele lijn die terugkerende vragen voorkomt.", href: "/diensten/uitlegvideo/" },
        { when: "Laten zien wat je bouwt of oplost", label: "Projectvideo", text: "Je maakt zichtbaar wat er normaal achter de schermen gebeurt — sterk bewijs richting opdrachtgevers en nieuwe collega's.", href: "/diensten/projectvideo/" },
      ],
    },
  },
  promotievideo: {
    price: "vanaf €995",
    situations: [["Je lanceert iets nieuws", "Een nieuw product of aanbod heeft snel beeld nodig dat zonder lange uitleg duidelijk maakt waarom het interessant is."], ["Je campagne mist een sterke opening", "De eerste seconden moeten aandacht pakken en meteen de juiste boodschap neerzetten."], ["Je wilt meerdere advertenties testen", "Vanuit één productie wil je verschillende openingen, lengtes en formaten kunnen gebruiken."]],
    deliverables: ["Campagnevideo van circa 30–60 seconden", "Korte advertentiecuts van 6–15 seconden", "Versies in 16:9, 1:1 en 9:16", "Tekst en ondertiteling in beeld", "Twee gebundelde feedbackrondes"],
    process: [["Aanbod scherpstellen", "We kiezen één boodschap en één gewenste actie."], ["Concept en shotlist", "Ik werk het idee uit naar concrete scènes en varianten."], ["Productie", "We filmen gericht genoeg materiaal voor de hoofdvideo en korte cuts."], ["Varianten opleveren", "Na feedback ontvang je alle afgesproken advertentieformaten."]],
    proof: { client: "Vesto", type: "Productcontent", image: vestoProduct, challenge: "Het product moest online sneller duidelijk en aantrekkelijk worden.", made: "Beeld op locatie met aandacht voor vorm, details en gebruik.", result: "Een consistente set content voor productpagina en campagne.", href: "/cases/vesto/" },
  },
  klantcasevideo: {
    price: "vanaf €650",
    situations: [["Klanten vragen steeds om voorbeelden", "Je kunt goed uitleggen wat je doet, maar een bestaande klant kan veel geloofwaardiger vertellen hoe de samenwerking echt verliep."], ["Je belofte blijft nog te algemeen", "Woorden als kwaliteit en service krijgen pas waarde als iemand concreet vertelt wat er veranderde."], ["Een sterke samenwerking verdient meer bereik", "Er ligt al een goed verhaal, maar het wordt nog niet gebruikt op je website, LinkedIn of in salesgesprekken."]],
    deliverables: ["Casevideo van circa 2–3 minuten", "Korte cut van maximaal 60 seconden", "Liggend 16:9 en verticaal 9:16", "Volledige ondertiteling", "Twee gebundelde feedbackrondes"],
    process: [["Verhaal ophalen", "Ik spreek jou en de klant kort vooraf en zoek de concrete situatie, aanpak en uitkomst."], ["Klant voorbereiden", "De klant ontvangt gespreksonderwerpen, geen tekst om uit het hoofd te leren."], ["Interview en sfeerbeeld", "Op locatie filmen we het gesprek en relevante beelden van bedrijf, product of samenwerking."], ["Montage en akkoord", "Jij en de klant krijgen een heldere feedbackronde voordat alle versies worden opgeleverd."]],
    proof: { client: "Voorbeeld van de aanpak", type: "Klantcasevideo", image: behindTheScenes, challenge: "Een goed klantverhaal is vaak aanwezig, maar nog niet concreet opgebouwd.", made: "Een rustig interview, aangevuld met beelden die de samenwerking zichtbaar maken.", result: "Een geloofwaardig verhaal dat twijfelaars helpt een volgende stap te zetten." },
  },
  uitlegvideo: {
    price: "vanaf €995",
    situations: [["Je dienst kost te veel woorden", "Tijdens ieder verkoopgesprek begin je opnieuw bij dezelfde uitleg en merk je dat mensen halverwege afhaken."], ["Klanten stellen steeds dezelfde vragen", "Een korte video kan de basis vooraf beantwoorden, zodat gesprekken sneller over de echte inhoud gaan."], ["Een proces blijft abstract", "Je wilt laten zien wat er gebeurt, welke stappen iemand doorloopt en wat de uitkomst is."]],
    deliverables: ["Uitlegvideo van circa 60–180 seconden", "Script in duidelijke, gewone taal", "Voice-over, interview of demonstratie", "Titels en eenvoudige visuele ondersteuning", "Versies voor website en social media"],
    process: [["Inhoud terugbrengen", "We scheiden wat noodzakelijk is van wat vooral intern interessant is."], ["Script en vorm", "Ik schrijf een logische lijn en kies hoe beeld, tekst en geluid samenwerken."], ["Opnames", "We filmen presentatie, demonstratie of praktijkbeelden die de uitleg ondersteunen."], ["Controle en oplevering", "Na inhoudelijke feedback ontvang je de definitieve video en korte versie."]],
    proof: { client: "Voorbeeld van de aanpak", type: "Uitlegvideo", image: woonmaandInterior, challenge: "Veel informatie moest in korte tijd begrijpelijk worden.", made: "Een duidelijke volgorde met demonstratiebeelden en alleen de uitleg die nodig is.", result: "Een video die vooraf context geeft en terugkerende vragen opvangt." },
  },
  projectvideo: {
    price: "vanaf €995",
    situations: [["Het beste werk gebeurt achter de schermen", "Klanten zien vooral het eindresultaat, terwijl juist de uitvoering laat zien hoeveel kennis en aandacht erin zit."], ["Je wilt een project als case gebruiken", "Een afgerond traject verdient meer dan een paar losse telefoonfoto’s zonder context."], ["Je werkt over meerdere fases", "Je wilt voortgang, belangrijke momenten en eindresultaat in één helder verhaal bewaren."]],
    deliverables: ["Projectfilm van circa 1–3 minuten", "Opnames van proces, mensen en eindresultaat", "Korte social edit", "Liggende en verticale oplevering", "Fotoreportage als aanvullende optie"],
    process: [["Locatie en planning", "We stemmen fases, toegang, veiligheid en belangrijke momenten vooraf af."], ["Opnames op locatie", "Ik leg overzicht, handelingen, details en mensen aan het werk vast."], ["Verhaal opbouwen", "De montage maakt duidelijk wat de uitdaging was en hoe het project is uitgevoerd."], ["Opleveren per kanaal", "Je ontvangt de projectfilm en afgesproken korte formaten."]],
    proof: { client: "Kes Sloopwerk", type: "Projectfotografie", image: kesProject, challenge: "Telefoonbeelden deden geen recht aan materieel, locatie en uitvoering.", made: "Een gerichte serie met overzicht, actie en details van het werk.", result: "Herbruikbaar projectbeeld voor website en online zichtbaarheid.", href: "/cases/kes-sloopwerk/" },
  },
  "eventvideo-fotografie": {
    price: "vanaf €495",
    situations: [["De volgende editie moet direct worden gepromoot", "Je wilt na het event niet opnieuw zoeken naar passend beeld voor uitnodigingen, website en social media."], ["Sfeer én inhoud zijn belangrijk", "Niet alleen volle zalen, maar ook sprekers, gesprekken en momenten die laten zien wat het event oplevert."], ["Je wilt één duidelijke planning", "Foto en video moeten samenwerken zonder bezoekers of programma onnodig te verstoren."]],
    deliverables: ["Aftermovie van circa 60–120 seconden", "Korte recap voor social media", "Vooraf afgesproken selectie nabewerkte foto’s", "Verticale en liggende videoformaten", "Snelle preview als dit vooraf is ingepland"],
    process: [["Programma doornemen", "We markeren sprekers, momenten en personen die zeker in beeld moeten."], ["Draaiplan", "Ik stem positie, licht, geluid en eventuele extra crew af."], ["Registratie", "Tijdens het event leg ik inhoud, sfeer en interactie zo onopvallend mogelijk vast."], ["Selectie en montage", "Je ontvangt de afgesproken foto’s en videoformats volgens planning."]],
    proof: { client: "Ter Leede", type: "Eventreportage", image: terLeedeEvent, challenge: "De organisatie wilde sfeer bewaren en materiaal voor een volgende editie.", made: "Een reportage van ontvangst, programma en netwerkmomenten.", result: "Beeld voor terugblik, uitnodiging en social media.", href: "/cases/ter-leede/" },
  },
  bedrijfsfotografie: {
    price: "vanaf €495",
    situations: [["Je website gebruikt vooral stockfoto’s", "De stijl ziet er netjes uit, maar bezoekers krijgen geen beeld van de echte mensen en werkomgeving."], ["Je beeldbank is verouderd", "Team, locatie of uitstraling is veranderd en nieuw materiaal moet weer een paar jaar bruikbaar zijn."], ["Marketing zoekt steeds opnieuw naar foto’s", "Je wilt één gerichte shoot die genoeg variatie oplevert voor website, vacatures, presentaties en social."]],
    deliverables: ["Vooraf afgestemde shotlist", "Portretten, werksituaties en locatiebeelden", "Professionele selectie en nabewerking", "Hoge resolutie én webformaten", "Gebruik voor eigen website en social kanalen"],
    process: [["Beeldbehoefte bepalen", "We inventariseren pagina’s, kanalen en situaties waarvoor foto’s nodig zijn."], ["Planning en voorbereiding", "Je krijgt praktisch advies over locatie, kleding en medewerkers."], ["Fotografiedag", "Ik werk efficiënt door de shotlist en houd ruimte voor spontane momenten."], ["Selectie en levering", "Je ontvangt een consistente beeldbank in web- en hoge resolutie."]],
    proof: { client: "Woonmaand", type: "Interieurfotografie", image: woonmaandInterior, challenge: "Materialen, ruimte en afwerking moesten helder en consistent worden vastgelegd.", made: "Een serie overzichts- en detailbeelden met rustige composities.", result: "Een bruikbare beeldbank voor online presentatie en promotie." },
  },
  productfotografie: {
    price: "vanaf €495",
    situations: [["Je productbeelden verschillen te veel", "Licht, uitsnede en omgeving wisselen, waardoor webshop of campagne geen duidelijke merkstijl heeft."], ["Een los packshot vertelt niet genoeg", "Je wilt laten zien hoe het product wordt gebruikt en voor wie het bedoeld is."], ["Je hebt meerdere formaten nodig", "Dezelfde shoot moet materiaal opleveren voor webshop, advertenties en verticale social content."]],
    deliverables: ["Moodboard en concrete shotlist", "Overzichts-, detail- en gebruiksbeelden", "Consistente professionele nabewerking", "Web- en hoge-resolutiebestanden", "Uitsneden voor webshop en social media"],
    process: [["Doel en stijl", "We bepalen waar het beeld komt en welke uitstraling daarbij past."], ["Productie voorbereiden", "Locatie, ondergrond, props en eventuele modellen worden afgestemd."], ["Shoot", "Ik maak overzicht, details en varianten met ruimte voor verschillende uitsneden."], ["Selectie en levering", "Na selectie ontvang je alle afgesproken bestanden per toepassing."]],
    proof: { client: "Vesto", type: "Productfotografie", image: vestoProduct, challenge: "Het product had helder beeld nodig dat ook de gebruiksomgeving liet zien.", made: "Productfoto’s op locatie met aandacht voor vorm, materiaal en toepassing.", result: "Een frisse serie voor productpagina’s en campagne.", href: "/cases/vesto/" },
  },
};

const serviceWork = {
  bedrijfsvideo: [
    { title: "24Wines", type: "Bedrijfsvideo", image: wines24Selectie[6]?.src, href: "/cases/24wines/" },
    { title: "Sunforce", type: "Bedrijfsfotografie", image: sunforce, href: "/cases/sunforce/" },
    { title: "Van Baarsen Vastgoed", type: "Presentatievideo", image: daanVastgoed },
  ],
  promotievideo: [
    { title: "Vesto", type: "Productcampagne", image: vestoProduct, href: "/cases/vesto/" },
    { title: "Studio Bocalista", type: "Campagneproductie", image: studioProduction },
    { title: "Luchtbeeld", type: "Promotiecontent", image: droneProduction },
  ],
  klantcasevideo: [
    { title: "Van Baarsen Vastgoed", type: "Verhaal op locatie", image: daanVastgoed },
    { title: "Sunforce", type: "Mensen en vakmanschap", image: sunforce, href: "/cases/sunforce/" },
    { title: "CoffeeClick", type: "Klantverhaal in productie", image: productShoot },
  ],
  uitlegvideo: [
    { title: "Woonmaand", type: "Ruimte en product uitgelegd", image: woonmaandInterior },
    { title: "Studio Bocalista", type: "Visuele demonstratie", image: studioProduction },
    { title: "Van Baarsen Vastgoed", type: "Presentatie op locatie", image: daanVastgoed },
  ],
  projectvideo: [
    { title: "Kes Sloopwerk", type: "Projectreportage", image: kesProject, href: "/cases/kes-sloopwerk/" },
    { title: "Cor Kes", type: "Werk in uitvoering", image: corkesProject, href: "/cases/kes-sloopwerk/" },
    { title: "Sunforce", type: "Techniek op locatie", image: sunforce, href: "/cases/sunforce/" },
  ],
  "eventvideo-fotografie": [
    { title: "Ter Leede", type: "Business diner", image: terLeedeEvent, href: "/cases/ter-leede/" },
    { title: "HSB x FC Volendam", type: "Zakelijk evenement", image: hsbBusiness, href: "/cases/hsb-fc-volendam/" },
    { title: "Studio Bocalista", type: "Behind the scenes", image: studioProduction },
  ],
  bedrijfsfotografie: [
    { title: "Jaimm PMU", type: "Portret & praktijk", image: jaimmBehandeling5, href: "/cases/jaimm-pmu/" },
    { title: "Woonmaand", type: "Interieurfotografie", image: woonmaandInterior },
    { title: "HSB x FC Volendam", type: "Bedrijfsreportage", image: hsbBusiness, href: "/cases/hsb-fc-volendam/" },
  ],
  productfotografie: [
    { title: "Vesto", type: "Product in gebruik", image: vestoProduct, href: "/cases/vesto/" },
    { title: "CoffeeClick", type: "Productproductie", image: productShoot },
    { title: "Woonmaand", type: "Materiaal en detail", image: woonmaandInterior },
  ],
};

export const articleData = {
  "wat-kost-een-bedrijfsvideo": { title: "Wat kost een bedrijfsvideo?", label: "Kosten & voorbereiding", seo: { title: "Wat kost een bedrijfsvideo? | TVM Productions", description: "Wat kost een bedrijfsvideo laten maken? De prijs hangt af van voorbereiding, draaidagen, crew en het aantal versies. Zo krijg je een scherpe prijsindicatie." }, intro: "De prijs wordt vooral bepaald door voorbereiding, draaidagen, crew en het aantal eindversies.", sections: [["Waar betaal je voor?", "Niet alleen voor de uren met een camera. Concept, planning, montage, feedback en exports bepalen samen de productie."], ["Begin bij het doel", "Een duidelijke vraag voorkomt dat je te veel maakt. Soms is één sterke video genoeg; soms leveren meerdere korte versies meer op."], ["Hoe krijg je een goede prijsindicatie?", "Beschrijf doelgroep, gebruik, deadline, locaties en gewenste formaten. Daarmee kan een voorstel veel scherper worden."]] },
  "voorbereiden-op-videoshoot": { title: "Hoe bereid je een videoshoot voor?", label: "Praktische gids", seo: { title: "Hoe bereid je een videoshoot voor? | TVM Productions", description: "Een goede draaidag begint bij de voorbereiding: één hoofdboodschap, een locatie die klaar is en mensen die weten wat ze kunnen verwachten. Praktische tips." }, intro: "Een goede draaidag voelt rustig omdat de belangrijke keuzes al eerder zijn gemaakt.", sections: [["Bepaal één hoofdboodschap", "Schrijf op wat iemand na het kijken moet begrijpen. Alles wat daar niet aan bijdraagt kan uit de productie."], ["Maak de locatie klaar", "Let op geluid, licht, logo's, persoonlijke gegevens en spullen die niet in beeld mogen."], ["Bereid mensen praktisch voor", "Geef kledingadvies en gespreksonderwerpen, maar laat mensen geen complete teksten uit het hoofd leren."]] },
  "bedrijfsvideo-of-promotievideo": { title: "Bedrijfsvideo of promotievideo?", label: "Welke vorm past?", seo: { title: "Bedrijfsvideo of promotievideo: wat past? | TVM Productions", description: "Een bedrijfsvideo verkoopt vertrouwen in je organisatie, een promotievideo verkoopt één concreet aanbod. Zo kies je de vorm die past bij je doel." }, intro: "Een bedrijfsvideo verkoopt het vertrouwen in je organisatie. Een promotievideo verkoopt één concreet aanbod.", sections: [["Kies een bedrijfsvideo als…", "je wilt uitleggen wie je bent, hoe je werkt en waarom mensen voor je kiezen."], ["Kies een promotievideo als…", "je één product, actie of campagne snel en overtuigend onder de aandacht wilt brengen."], ["Kun je ze combineren?", "Ja, maar alleen als de hoofdboodschap helder blijft. Vaak is het slimmer om vanuit één draaidag meerdere gerichte video's te maken."]] },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return <Motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</Motion.div>;
}

function BrandLogo({ compact = false }) {
  return <span className={`relative block shrink-0 transition-all duration-300 ${compact ? "h-7 w-[5.2rem]" : "h-11 w-32"}`}><img src={tvmLogo} alt="TVM Productions" className="absolute inset-0 h-full w-full object-contain brightness-0" /><span className="absolute left-[0.3%] right-[0.7%] top-[67.45%] h-[3.7%] bg-[#f5aa00]" aria-hidden="true" /></span>;
}

function Action({ href = "/contact/", children, yellow = false }) {
  return <a href={href} className={`group inline-flex min-h-12 items-center gap-4 rounded-full py-1 pl-5 pr-1 text-sm font-black transition-transform hover:-translate-y-1 ${yellow ? "bg-[#f5ca3c] text-black" : "bg-black text-white"}`}>{children}<span className={`flex size-10 items-center justify-center rounded-full ${yellow ? "bg-black text-white" : "bg-white text-black"}`}><ArrowUpRight className="size-5 -translate-x-px translate-y-px" /></span></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 60); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(0.75rem+20px)] sm:px-5 sm:pt-[calc(1.25rem+20px)]">
    <div className={`mx-auto flex h-14 w-full max-w-[960px] items-center justify-between rounded-full border border-black/[0.07] bg-[#faf9f6]/80 pl-5 pr-2 backdrop-blur-2xl transition-all duration-300 sm:pl-6 sm:pr-2 ${scrolled ? "shadow-[0_2px_14px_rgba(0,0,0,.05)]" : "shadow-[0_1px_8px_rgba(0,0,0,.03)]"}`}>
      <a href="/"><BrandLogo compact /></a>
      <nav className="hidden items-center gap-10 lg:flex">{navItems.map(([label, href]) => label === "Oplossingen" ? (<div key={label} className="group relative"><a href={href} className="flex items-center gap-1.5 text-sm font-semibold text-black/50 transition-colors hover:text-black">{label} <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" /></a><div className="invisible absolute left-0 top-full w-[26rem] translate-y-2 pt-7 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><div className="grid gap-1 rounded-[1.5rem] border border-black/10 bg-white/95 p-3 shadow-[0_24px_70px_rgba(0,0,0,.14)] backdrop-blur-2xl">{OPLOSSINGEN_MENU.map(([titel, link, uitleg]) => <a key={link} href={link} className="group/link rounded-2xl px-4 py-3 transition-colors hover:bg-[#f4f3ee]"><span className="block text-sm font-bold text-black/80 group-hover/link:text-black">{titel}</span><span className="mt-1 block text-sm leading-snug text-black/45">{uitleg}</span></a>)}</div></div></div>) : <a key={href} href={href} className="text-sm font-semibold text-black/50 transition-colors hover:text-black">{label}</a>)}</nav>
      <a href="/contact/" className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-full bg-[#f5ca3c] px-5 text-sm font-bold text-black transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 sm:flex"><span className="absolute -inset-px origin-left scale-x-0 bg-[#ffda58] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" /><span className="relative">Bespreek je uitdaging</span><ArrowSwap className="relative size-4" strokeWidth={2.5} /></a>
      <button className="grid size-10 place-items-center rounded-full border border-black/15 sm:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mx-auto mt-2 flex flex-col rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl sm:hidden">{navItems.map(([label, href]) => label === "Oplossingen" ? (<details key={label} className="border-b border-black/10"><summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-bold">{label} <ChevronDown className="size-5" aria-hidden="true" /></summary><div className="grid pb-3">{OPLOSSINGEN_MENU.map(([titel, link]) => <a key={link} href={link} onClick={() => setOpen(false)} className="py-2 pl-3 text-sm font-bold text-black/55">{titel}</a>)}</div></details>) : <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-black/10 py-4 text-xl font-bold">{label}</a>)}<a href="/contact/" onClick={() => setOpen(false)} className="mt-5 rounded-full bg-black px-5 py-4 text-center font-bold text-white">Bespreek je uitdaging</a></nav>}
  </header>;
}

// `schema`: extra JSON-LD nodes voor deze pagina (Service, FAQPage); de
// basisentiteiten (bedrijf, Tygo, website) zitten er altijd in.
function Layout({ children, schema = [] }) { return <div id="top" className="min-h-screen bg-[#f4f3ee] text-[#111]"><JsonLd nodes={schema} /><Header /><main>{children}</main><Footer /><StickyCta /></div>; }

function PageHero({ label, title, intro, image, imageAlt = "", compact = false, breadcrumbs }) {
  return <section className="px-3 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">{breadcrumbs && <div className="mx-auto mb-10 max-w-[1440px]"><Breadcrumbs items={breadcrumbs} /></div>}<div className={`mx-auto grid max-w-[1440px] gap-10 ${image ? "lg:grid-cols-[1.05fr_.95fr] lg:items-center" : ""}`}><Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }} className={image ? "" : "max-w-5xl"}><p className="eyebrow text-black/40">{label}</p><h1 {...titleProps(title, image || compact ? "section" : "hero", "mt-6")}>{title}</h1><p className="mt-7 t-lead text-black/55">{intro}</p><div className="mt-8"><Action>Plan een kennismaking</Action></div></Motion.div>{image && <Motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55, delay: .06, ease: [0.22, 1, 0.36, 1] }}><div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] sm:min-h-[40rem] sm:rounded-[3rem]"><img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" /></div></Motion.div>}</div></section>;
}

// `narrow` voor een SectionTitle die in een halve kolom staat: daar past de
// sectiemaat niet meer op twee regels.
function SectionTitle({ label, title, intro, narrow = false }) { return <Reveal className="mb-12 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><p className="eyebrow text-black/40">{label}</p><div><h2 {...titleProps(title, narrow ? "card" : "section")}>{title}</h2>{intro && <p className="mt-5 t-lead text-black/55">{intro}</p>}</div></Reveal>; }

function CTA() { return <section className="bg-[#f4f3ee] px-3 pb-3 pt-20 sm:px-6 sm:pb-6"><Reveal className="mx-auto max-w-[1440px] rounded-[2rem] bg-[#f5ca3c] p-8 sm:rounded-[3rem] sm:p-14 lg:p-16"><p className="eyebrow">Meestal binnen één werkdag reactie</p><h2 {...titleProps("VERTEL ME WAT JE WILT MAKEN.", "section", "mt-8")}>VERTEL ME WAT JE WILT MAKEN.</h2><p className="mt-7 t-lead text-black/65">Een eerste idee is genoeg. Ik denk mee over de vorm, aanpak en wat daarvoor nodig is.</p><div className="mt-9"><Action href="/contact/">Start het gesprek</Action></div></Reveal></section>; }

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return <div className="border-t border-black/15">{items.map(([q, a], index) => { const active = open === index; return <div key={q} className="border-b border-black/15"><button onClick={() => setOpen(active ? null : index)} className="flex w-full items-center justify-between gap-4 py-6 text-left"><h2 {...titleProps(q, "card")}>{q}</h2><Motion.span animate={{ rotate: active ? 180 : 0, backgroundColor: active ? "#f5ca3c" : "rgba(0,0,0,0)" }} className="grid size-11 shrink-0 place-items-center rounded-full border border-black/15"><ChevronDown className="size-4" /></Motion.span></button><Motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }} className="overflow-hidden"><p className="max-w-3xl pb-7 pr-12 leading-relaxed text-black/50 t-body">{a}</p></Motion.div></div>; })}</div>;
}


function WorkSelection({ work }) {
  return <section className="px-3 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1440px]"><Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-black/40">Gemaakt voor echte bedrijven</p><h2 {...titleProps("EEN SELECTIE UIT MIJN WERK.", "section", "mt-6")}>EEN SELECTIE UIT MIJN WERK.</h2></div><a href="/cases/" className="inline-flex shrink-0 items-center gap-2 font-black">Bekijk alle cases <ArrowUpRight className="size-4" /></a></Reveal><div className="grid gap-3 lg:grid-cols-12">{work.map((item, i) => { const card = <><img src={item.image} alt={`${item.type} voor ${item.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><p className="eyebrow text-white/60">{item.type}</p><h3 {...titleProps(item.title, "card", "mt-2")}>{item.title}</h3></div></>; const className = `group relative block h-full overflow-hidden rounded-[2rem] ${i === 0 ? "min-h-[32rem] lg:min-h-[43rem]" : "min-h-[24rem] lg:min-h-[21rem]"}`; return <Reveal key={`${item.title}-${item.type}`} delay={i * .05} className={i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}>{item.href ? <a href={item.href} className={className}>{card}</a> : <div className={className}>{card}</div>}</Reveal>; })}</div></div></section>;
}

function ServicesHub() {
  return <Layout><PageHero label="Diensten — video en fotografie voor bedrijven" title="WAT WIL JE LATEN ZIEN?" intro="Kies niet eerst een videovorm. Begin bij wat je klant, medewerker of opdrachtgever na het kijken moet begrijpen. Van bedrijfsvideo tot productfotografie: hieronder staat wat ik maak en wanneer dat past." image={behindTheScenes} imageAlt="Camera op statief tijdens een opname op locatie in een koffiezaak" /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-[1440px]"><SectionTitle label="Alle diensten" title="BEELD VOOR IEDER ZAKELIJK DOEL." /><div className="grid gap-3 md:grid-cols-2">{Object.entries(serviceData).map(([slug, service], index) => <Reveal key={slug} delay={(index % 2) * .05}><a href={`/diensten/${slug}/`} className="group block h-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#f4f3ee] sm:rounded-[2.5rem]"><div className="relative h-72 overflow-hidden"><img src={service.image} alt={serviceImageAlt[slug] ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-black backdrop-blur">{String(index + 1).padStart(2, "0")}</span></div><div className="flex items-end justify-between gap-5 p-7 sm:p-9"><div><h2 {...titleProps(service.short, "card")}>{service.short}</h2><p className="mt-3 max-w-xl text-black/50 t-body">{service.intro}</p></div><span className="grid size-12 shrink-0 place-items-center rounded-full bg-black text-white"><ArrowUpRight /></span></div></a></Reveal>)}</div></div></section><CTA /></Layout>;
}

function ServicePage({ service, slug }) {
  const detail = servicePageDetails[slug];
  const faqs = [
    ...service.faqs,
    ["Hoeveel tijd kost de voorbereiding mij?", "Voor de meeste producties zijn een kennismaking en één gerichte voorbereidingsronde genoeg. Ik verzamel vooraf de benodigde informatie en maak zelf het draaiplan, zodat jij vooral inhoud, mensen en locatie hoeft af te stemmen."],
    ["Waar mag ik het eindresultaat gebruiken?", "De oplevering is bedoeld voor de eigen website, presentaties en organische social kanalen. Betaalde campagnes, uitgebreide licenties of gebruik door derden stemmen we vooraf af, zodat daar achteraf geen onduidelijkheid over ontstaat."],
    [`Wat kost ${service.short.toLowerCase()}?`, `${service.short} start indicatief ${detail.price}. De uiteindelijke prijs hangt af van voorbereiding, locatie, draaiduur en het aantal versies. Na een korte kennismaking ontvang je een vaste prijs met duidelijk omschreven oplevering.`],
  ];
  const proof = detail.proof;
  const work = serviceWork[slug];
  const pageUrl = `${SITE_URL}/diensten/${slug}/`;
  // Verwante pagina's: de oplossing waar deze dienst bij hoort en twee
  // aangrenzende diensten. Zo is iedere dienst vanuit zijn buren bereikbaar.
  const related = [
    ...(service.related?.oplossing && oplossingen[service.related.oplossing] ? [[oplossingen[service.related.oplossing].eyebrow, `/oplossingen/${service.related.oplossing}/`]] : []),
    ...(service.related?.diensten ?? []).filter((s) => serviceData[s]).map((s) => [serviceData[s].short, `/diensten/${s}/`]),
  ];
  return <Layout schema={[serviceNode(service, slug, { price: detail.price }), faqNode(faqs, pageUrl)]}>
    <PageHero label={service.label} title={service.title.toUpperCase()} intro={service.intro} image={service.image} imageAlt={serviceImageAlt[slug] ?? ""} compact breadcrumbs={[{ label: "Diensten", href: "/diensten/" }, { label: service.short, href: `/diensten/${slug}/` }]} />

    <section className="relative z-10 -mt-4 px-3 pb-20 sm:px-6 sm:pb-28"><Reveal className="mx-auto max-w-6xl rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(17,17,17,.05)] sm:p-12"><div className="grid gap-6 lg:grid-cols-[.3fr_1.7fr]"><p className="eyebrow text-black/40">Kort gezegd</p><div><p className="text-2xl font-semibold leading-snug tracking-[-.03em] sm:text-4xl">{service.answer}</p>{related.length > 0 && <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold text-black/45"><span>Lees ook:</span>{related.map(([label, href], i) => <span key={href} className="flex items-center gap-2">{i > 0 && <span aria-hidden="true">·</span>}<a href={href} className="text-black/70 underline decoration-black/20 underline-offset-4 transition-colors hover:text-black hover:decoration-black">{label}</a></span>)}</p>}</div></div></Reveal></section>

    <WorkSelection work={work} />

    <section className="px-3 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr]"><Reveal className="lg:self-start"><p className="eyebrow text-black/40">Wanneer past dit?</p><h2 {...titleProps("DIT IS WAAR HET VERSCHIL MAAKT.", "section", "mt-6")}>DIT IS WAAR HET VERSCHIL MAAKT.</h2><div className="mt-8 hidden h-3 w-28 rounded-full bg-[#f5ca3c] lg:block" /></Reveal><div className="grid gap-3">{detail.situations.map(([title, text], i) => <Reveal key={title} delay={i * .05} className={i === 1 ? "lg:ml-10" : i === 2 ? "lg:ml-20" : ""}><div className="grid gap-6 rounded-[2rem] bg-white p-7 sm:grid-cols-[auto_1fr] sm:p-9"><span className="text-5xl font-black leading-none tracking-[-.06em] text-[#f5ca3c]">0{i + 1}</span><div><h3 {...titleProps(title, "card")}>{title}</h3><p className="mt-4 max-w-2xl leading-relaxed text-black/50 t-body">{text}</p></div></div></Reveal>)}</div></div></section>

    {detail.alternatives && <section className="px-3 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr]"><Reveal className="lg:self-start"><p className="eyebrow text-black/40">{detail.alternatives.label}</p><h2 {...titleProps(detail.alternatives.title, "card", "mt-6")}>{detail.alternatives.title}</h2><p className="mt-6 max-w-md leading-relaxed text-black/50 t-body">{detail.alternatives.intro}</p><div className="mt-8 hidden h-3 w-28 rounded-full bg-[#f5ca3c] lg:block" /></Reveal><div className="grid gap-3">{detail.alternatives.items.map((item, i) => <Reveal key={item.href} delay={i * .05}><a href={item.href} className="group grid gap-4 rounded-[2rem] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9"><div><p className="eyebrow text-[#9c7900]">{item.when}</p><h3 {...titleProps(item.label, "card", "mt-3")}>{item.label}</h3><p className="mt-3 max-w-xl leading-relaxed text-black/50 t-body">{item.text}</p></div><span className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-white transition-transform group-hover:rotate-45 sm:justify-self-end"><ArrowUpRight className="size-5" /></span></a></Reveal>)}</div></div></section>}

    <section className="px-3 py-20 sm:px-6 sm:py-28"><div className="mx-auto max-w-[1440px]"><Reveal className="mb-12 grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="eyebrow text-black/40">Zo werken we samen</p><h2 {...titleProps("DUIDELIJK VANAF HET EERSTE GESPREK.", "section", "mt-6")}>DUIDELIJK VANAF HET EERSTE GESPREK.</h2></div><p className="max-w-xl t-body text-black/50 lg:justify-self-end">Je weet wat er gebeurt, wat ik van jou nodig heb en wanneer alles klaarstaat.</p></Reveal><Reveal className="grid gap-3 rounded-[2.5rem] bg-white p-4 sm:p-6 lg:grid-cols-2">{detail.process.map(([title, text], i) => <div key={title} className="grid gap-5 rounded-[1.75rem] bg-[#f4f3ee] p-6 sm:grid-cols-[auto_1fr] sm:p-7"><span className="text-sm font-black text-black/30">0{i + 1}</span><div><h3 {...titleProps(title, "card")}>{title}</h3><p className="mt-3 leading-relaxed text-black/50 t-body">{text}</p></div></div>)}</Reveal></div></section>

    <section className="px-3 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch"><Reveal><div className="relative min-h-[34rem] h-full overflow-hidden rounded-[2.5rem]"><img src={proof.image} alt={`${proof.type} voor ${proof.client}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div></Reveal><Reveal delay={.06} className="flex flex-col justify-between rounded-[2.5rem] bg-white p-8 sm:p-11"><div className="flex items-start justify-between gap-5"><div><p className="eyebrow text-black/40">{proof.href ? "Uitgelicht werk" : "Voorbeeld van de aanpak"}</p><h2 {...titleProps(proof.client, "section", "mt-5")}>{proof.client}</h2><p className="mt-2 eyebrow text-[#9c7900]">{proof.type}</p></div>{proof.href && <a href={proof.href} aria-label="Bekijk de volledige case" className="grid size-12 shrink-0 place-items-center rounded-full bg-black text-white"><ArrowUpRight className="size-5" /></a>}</div><div className="mt-12 grid gap-8"><div><strong className="eyebrow text-black/35">De vraag</strong><p className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em] text-black/75">{proof.challenge}</p></div><div><strong className="eyebrow text-black/35">Wat ik maakte</strong><p className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em] text-black/75">{proof.made}</p></div><div><strong className="eyebrow text-black/35">Het resultaat</strong><p className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em] text-black/75">{proof.result}</p></div></div></Reveal></div></section>

    <section className="px-3 py-20 sm:px-6 sm:py-28"><Reveal className="mx-auto max-w-6xl rounded-[2.5rem] bg-white p-7 sm:p-10"><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="eyebrow text-black/40">Investering</p><h2 {...titleProps("EEN PRIJS DIE PAST BIJ HET PLAN.", "section", "mt-5")}>EEN PRIJS DIE PAST BIJ HET PLAN.</h2></div><p className="max-w-2xl t-body text-black/55">Iedere productie wordt afgestemd op het doel, de draaidag en waar je het materiaal wilt gebruiken. Na een korte kennismaking ontvang je een helder voorstel met één vaste prijs.</p></div><div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] bg-[#f4f3ee] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="eyebrow text-black/35">Indicatieve investering</p><p className="mt-2 text-2xl font-black tracking-[-.035em] sm:text-3xl">{detail.price}</p></div><a href="/contact/" className="inline-flex w-fit items-center gap-3 rounded-full bg-black py-2 pl-5 pr-2 font-black text-white">Bespreek je productie <span className="grid size-10 place-items-center rounded-full bg-[#f5ca3c] text-black"><ArrowUpRight className="size-5" /></span></a></div></Reveal></section>

    <section className="px-3 py-20 sm:px-6 sm:py-28"><Reveal className="mx-auto grid max-w-[1440px] gap-12 rounded-[2.5rem] bg-white p-7 sm:p-12 lg:grid-cols-[.7fr_1.3fr] lg:p-14"><div><p className="eyebrow text-black/40">Veel gevraagd</p><h2 {...titleProps("GOED OM TE WETEN.", "section", "mt-6")}>GOED OM TE WETEN.</h2></div><Accordion items={faqs} /></Reveal></section>

    <Testimonials />
    <CTA />
  </Layout>;
}

function ProcessPage() {
  const process = [["01", "Kennismaking", "We bespreken doel, doelgroep, gebruik en deadline."], ["02", "Concept", "Ik maak de verhaallijn, shotlist en een duidelijke planning."], ["03", "Draaidag", "We leggen gericht vast wat nodig is, zonder onnodige chaos."], ["04", "Montage", "Je ontvangt een eerste versie en geeft gericht feedback."], ["05", "Oplevering", "Alle afgesproken formaten staan klaar voor website, social en presentatie."]];
  return <Layout><PageHero label="Werkwijze" title="ZO KOMEN WE TOT GOED BEELD." intro="Zo verloopt een videoproductie of fotoshoot bij TVM Productions: je weet vooraf wat er gebeurt, wat ik van jou nodig heb en wanneer alles klaarstaat." image={behindTheScenes} imageAlt="Camera op statief tijdens een opname op locatie in een koffiezaak" compact /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-[1440px]"><SectionTitle label="Het proces" title="VIJF DUIDELIJKE STAPPEN." /><div className="border-t border-black/15">{process.map(([n, t, d]) => <Reveal key={n}><div className="grid gap-4 border-b border-black/15 py-8 md:grid-cols-[.2fr_.6fr_1.2fr] md:items-center"><span className="text-sm font-black text-black/30">{n}</span><h2 {...titleProps(t, "card")}>{t}</h2><p className="max-w-2xl text-black/50 t-body">{d}</p></div></Reveal>)}</div></div></section><CTA /></Layout>;
}

function CasesHub() { return <Layout><PageHero label="Cases" title="WERK DAT VOOR ZICHZELF SPREEKT." intro="Voorbeelden van bedrijfsvideo, eventvideo, bedrijfsfotografie en productfotografie die ik maakte voor bedrijven in Volendam, Purmerend en de rest van Noord-Holland." /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2">{Object.entries(caseData).map(([slug, item], i) => <Reveal key={slug} delay={(i % 2) * .05}><a href={`/cases/${slug}/`} className="group relative block min-h-[34rem] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"><img src={item.image} alt={item.kop ?? `${item.type} voor ${item.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-8 text-white"><p className="eyebrow text-white/60">{item.type}</p><h2 {...titleProps(item.title, "card", "mt-2")}>{item.title}</h2>{item.result && <p className="mt-4 max-w-lg border-l-2 border-[#f5ca3c] pl-4 text-lg leading-snug text-white/85">{item.result}</p>}</div></a></Reveal>)}</div></section><CTA /></Layout>; }

function CaseFacts({ facts }) {
  return <section className="relative z-10 -mt-4 px-3 pb-4 sm:px-6"><Reveal className="mx-auto max-w-[1440px] rounded-[2rem] bg-white p-6 shadow-[0_18px_60px_rgba(17,17,17,.05)] sm:rounded-[2.5rem] sm:p-9"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(facts).map(([label, value]) => <div key={label}><p className="eyebrow text-black/35">{label}</p><p className="mt-2 text-xl font-black tracking-[-.03em] sm:text-2xl">{value}</p></div>)}</div></Reveal></section>;
}

function CaseVideo({ video, eyebrow }) {
  return <Reveal className="overflow-hidden rounded-[2rem] bg-black sm:rounded-[2.5rem]"><video controls preload="none" poster={video.poster} className="aspect-video w-full bg-black" playsInline><source src={video.src} type="video/mp4" /></video><div className="flex items-center justify-between gap-4 p-6 sm:p-7"><div><p className="eyebrow text-white/40">{eyebrow}</p><h3 {...titleProps(video.title, "card", "mt-2 text-white")}>{video.title}</h3></div><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f5ca3c] text-black"><ArrowUpRight className="size-5" /></span></div></Reveal>;
}

function CasePage({ item, slug }) {
  const dienst = item.dienst ? serviceData[item.dienst] : null;
  return <Layout>
    <PageHero label={item.type} title={(item.kop ?? item.title).toUpperCase()} intro={item.intro} image={item.image} imageAlt={item.gallery?.find((shot) => shot.src === item.image)?.alt ?? `${item.type} voor ${item.title}`} compact breadcrumbs={[{ label: "Cases", href: "/cases/" }, { label: item.title, href: `/cases/${slug}/` }]} />

    {item.facts && <CaseFacts facts={item.facts} />}

    {item.video && <section className="px-3 py-16 sm:px-6 sm:py-20"><div className="mx-auto max-w-[1440px]"><div className={`grid gap-3 ${item.videoSecondary ? "sm:grid-cols-2" : ""}`}><CaseVideo video={item.video} eyebrow="Videoproductie" />{item.videoSecondary && <CaseVideo video={item.videoSecondary} eyebrow="Behind the scenes" />}</div></div></section>}

    {item.gallery && item.gallery.length > 0 && <section className="px-3 pb-4 sm:px-6"><div className="mx-auto max-w-[1440px]"><div className={`grid gap-3 ${item.gallery.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : item.gallery.length === 2 ? "sm:grid-cols-2" : ""}`}>{item.gallery.map((shot, i) => <Reveal key={shot.src} delay={i * .05}><figure className={`group relative overflow-hidden rounded-[2rem] bg-[#ddd] sm:rounded-[2.5rem] ${item.gallery.length === 1 ? "min-h-[26rem] sm:min-h-[34rem]" : "min-h-[22rem] sm:min-h-[26rem]"}`}><img src={shot.src} alt={shot.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />{shot.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 text-sm font-semibold text-white sm:p-7">{shot.caption}</figcaption>}</figure></Reveal>)}</div></div></section>}

    <section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-3">{[["De situatie", item.situation], ["Wat ik maakte", item.made], ["Het resultaat", item.result]].map(([t, d], i) => <Reveal key={t} delay={i * .05}><div className={`min-h-80 rounded-[2rem] p-8 ${i === 1 ? "bg-[#f5ca3c]" : "bg-[#f4f3ee]"}`}><p className="eyebrow text-black/40">0{i + 1}</p><h2 {...titleProps(t, "card", "mt-16")}>{t}</h2><p className="mt-4 leading-relaxed text-black/55 t-body">{d}</p></div></Reveal>)}</div>
      {/* Doorverwijzen: de dienst achter deze case en het overzicht. */}
      <Reveal className="mx-auto mt-10 flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 text-base font-bold">{dienst && <a href={`/diensten/${item.dienst}/`} className="inline-flex items-center gap-2 transition-colors hover:text-[#9c7900]">Meer over {dienst.short.toLowerCase()} <ArrowRight className="size-4 text-[#b78d00]" strokeWidth={2.5} aria-hidden="true" /></a>}<a href="/cases/" className="inline-flex items-center gap-2 transition-colors hover:text-[#9c7900]">Alle cases bekijken <ArrowRight className="size-4 text-[#b78d00]" strokeWidth={2.5} aria-hidden="true" /></a></Reveal></section>
    <CTA />
  </Layout>;
}

function AboutPage() { return <Layout><PageHero label="Over Tygo" title="EERST HET DOEL. DAN DE CAMERA." intro="Ik ben Tygo Veerman, videograaf en bedrijfsfotograaf in Purmerend. Met TVM Productions maak ik video en fotografie voor bedrijven in Noord-Holland die duidelijk willen laten zien wat ze doen." image={tygoPortrait} imageAlt="Portret van Tygo Veerman" compact /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2"><SectionTitle label="Mijn aanpak" title="IK WIL EERST WETEN WAT JE WILT BEREIKEN." narrow /><Reveal><p className="text-2xl font-semibold leading-relaxed tracking-[-.025em]">Ik wil eerst begrijpen wat jouw bedrijf bijzonder maakt. Daarna vertaal ik dat naar beelden die professioneel voelen, zonder dat het gemaakt wordt.</p><div className="mt-10 grid gap-3">{["Goed voorbereid, zodat de draaidag rustig blijft", "Direct contact over inhoud en keuzes", "Oog voor de details die een verhaal geloofwaardig maken"].map(x => <div key={x} className="flex gap-3 rounded-2xl bg-[#f4f3ee] p-5 font-bold"><Check />{x}</div>)}</div></Reveal></div></section><CTA /></Layout>; }

function PricingPage() { return <Layout><PageHero label="Tarieven" title="EEN HELDERE PRIJS BEGINT MET EEN HELDERE VRAAG." intro="Geen productie is hetzelfde. Je krijgt vooraf een vaste offerte waarin voorbereiding, draaidag, montage en oplevering duidelijk zijn opgenomen." /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-[1440px]"><SectionTitle label="Investering" title="WAAR DE PRIJS VAN AFHANGT." /><div className="grid gap-3 md:grid-cols-3">{[["Omvang", "Aantal locaties, draaidagen en mensen voor en achter de camera."], ["Uitwerking", "De hoeveelheid voorbereiding, montage, animatie en feedback."], ["Oplevering", "Het aantal video's, foto's, formaten en varianten dat je nodig hebt."]].map(([t, d], i) => <div key={t} className={`min-h-72 rounded-[2rem] p-8 ${i === 1 ? "bg-[#f5ca3c]" : "bg-[#f4f3ee]"}`}><span className="text-sm font-black">0{i + 1}</span><h2 {...titleProps(t, "card", "mt-20")}>{t}</h2><p className="mt-3 text-black/55 t-body">{d}</p></div>)}</div><div className="mt-16"><SectionTitle label="Indicatieve vanaf-prijzen" title="WAAR JE ONGEVEER OP KUNT REKENEN." intro="Dezelfde vanaf-prijzen als op de dienstpagina's. De uiteindelijke prijs hangt af van voorbereiding, locatie, draaiduur en het aantal versies; na een korte kennismaking ontvang je één vaste prijs." /><div className="border-t border-black/15">{Object.entries(serviceData).map(([slug, service]) => <a key={slug} href={`/diensten/${slug}/`} className="group grid gap-2 border-b border-black/15 py-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"><span className="text-xl font-extrabold tracking-[-0.015em] transition-colors group-hover:text-[#9c7900]">{service.short}</span><span className="text-xl font-black tracking-[-.03em]">{servicePageDetails[slug].price}</span><span className="hidden sm:grid size-10 place-items-center rounded-full bg-black text-white transition-transform group-hover:rotate-45"><ArrowUpRight className="size-5" /></span></a>)}</div></div></div></section><CTA /></Layout>; }

function LocalPage() { return <Layout><PageHero label="Lokaal in Purmerend" title="VIDEOPRODUCTIE IN PURMEREND." intro="Video en fotografie voor bedrijven in Purmerend, Waterland en omliggende plaatsen. Snel op locatie en bekend met de regio." image={terLeedeEvent} compact /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-[1440px]"><SectionTitle label="Waarom lokaal?" title="KORTE LIJNEN. SNEL GESCHAKELD." /><div className="grid gap-3 md:grid-cols-3">{["Voor veel locaties in de regio weinig reistijd", "Makkelijk een extra opname of locatiebezoek plannen", "Ervaring met bedrijven, evenementen en projecten in Noord-Holland"].map((x, i) => <div key={x} className="min-h-64 rounded-[2rem] bg-[#f4f3ee] p-8"><span className="text-sm font-black text-black/30">0{i + 1}</span><p className="mt-24 text-2xl font-black">{x}</p></div>)}</div></div></section><CTA /></Layout>; }

function KnowledgeHub() { return <Layout><PageHero label="Kennisbank" title="PRAKTISCHE ANTWOORDEN OVER VIDEO EN FOTO." intro="Geen vaktaal om de vaktaal. Wel heldere uitleg waarmee je een betere productie kunt voorbereiden." /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-3">{Object.entries(articleData).map(([slug, a], i) => <a key={slug} href={`/kennisbank/${slug}/`} className={`group flex min-h-[30rem] flex-col justify-between rounded-[2rem] p-8 ${i === 1 ? "bg-[#f5ca3c]" : "bg-[#f4f3ee]"}`}><div className="flex justify-between"><span className="eyebrow">{a.label}</span><ArrowUpRight /></div><div><h2 {...titleProps(a.title, "card")}>{a.title}</h2><p className="mt-4 text-black/50 t-body">{a.intro}</p></div></a>)}</div></section><CTA /></Layout>; }

function ArticlePage({ article, slug }) { return <Layout><PageHero label={article.label} title={article.title.toUpperCase()} intro={article.intro} compact breadcrumbs={[{ label: "Kennisbank", href: "/kennisbank/" }, { label: article.title, href: `/kennisbank/${slug}/` }]} /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><article className="mx-auto max-w-4xl">{article.sections.map(([title, text], i) => <Reveal key={title} className="border-t border-black/15 py-10"><span className="text-sm font-black text-black/30">0{i + 1}</span><h2 {...titleProps(title, "card", "mt-5")}>{title}</h2><p className="mt-5 t-body text-black/55">{text}</p></Reveal>)}</article></section><CTA /></Layout>; }

function FAQPage() { const all = [...serviceData.bedrijfsvideo.faqs, ...serviceData["eventvideo-fotografie"].faqs, ["Hoe snel ontvang ik een voorstel?", "Na de kennismaking ontvang je meestal binnen enkele werkdagen een duidelijk productievoorstel."]]; return <Layout schema={[faqNode(all, `${SITE_URL}/veelgestelde-vragen/`)]}><PageHero label="Veelgestelde vragen" title="ALLES WAT JE VOORAF WILT WETEN." intro="Direct antwoord op praktische vragen over voorbereiding, opnames, planning en oplevering." /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-4xl"><Accordion items={all} /></div></section><CTA /></Layout>; }

function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const startedAt = useState(() => Date.now())[0];

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const data = new FormData(event.currentTarget);
    const payload = {
      naam: data.get("naam"),
      bedrijf: data.get("bedrijf"),
      email: data.get("email"),
      bericht: data.get("bericht"),
      uitdaging: data.get("uitdaging"),
      website: data.get("website"),
      startedAt,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Verzenden is mislukt.");
      trackEvent("generate_lead", { method: "contact_form" });
      window.location.href = "/contact/bedankt/";
    } catch (err) {
      setStatus("error");
      setError(err.message || "Er ging iets mis. Probeer het later opnieuw of mail rechtstreeks.");
    }
  };

  return <Layout>
    <SubpageHero
      variant="redactioneel"
      eyebrow="Contact"
      headline={["Wat is je uitdaging?"]}
      description="Je hoeft nog niet te weten welke video je nodig hebt. Vertel waar het bij jou vastloopt, dan denk ik mee over wat daarvoor nodig is."
      breadcrumbs={[{ label: "Contact", href: "/contact/" }]}
    />

    {/* Funnel in twee stappen: eerst kwalificeren op de uitdaging, dan pas de
        gegevens vragen. Wie eerst één keuze maakt, maakt het formulier eerder af
        dan wie meteen tegen zes lege velden aankijkt. */}
    <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-2.5 sm:px-3.5">
        <form onSubmit={submit} className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="border-t border-black/15 pt-8">
              <p className="eyebrow text-[#9c7900]">01 — Waar loopt het vast?</p>
              <h2 {...titleProps("Kies wat het dichtst in de buurt komt.", "card", "mt-5")}>
                Kies wat het dichtst in de buurt komt.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  ["Zichtbaar worden", "Klanten zien onvoldoende wat wij anders of beter doen."],
                  ["Medewerkers aantrekken", "We krijgen onze vacatures niet gevuld met de juiste mensen."],
                  ["Duidelijk uitleggen", "Wat wij doen is lastig uit te leggen aan klanten."],
                  ["Iets anders", "Mijn uitdaging past hier niet tussen."],
                ].map(([label, uitleg], i) => (
                  <label
                    key={label}
                    className="group flex cursor-pointer items-start gap-4 rounded-[18px] border border-black/10 bg-[#f4f3ee] p-5 transition-colors duration-200 hover:border-black/25 has-[:checked]:border-[#c59d00] has-[:checked]:bg-[#fffaea] sm:p-6"
                  >
                    <input
                      type="radio"
                      name="uitdaging"
                      value={label}
                      defaultChecked={i === 0}
                      className="mt-1 size-5 shrink-0 accent-[#c59d00]"
                    />
                    <span>
                      <span className="block text-lg font-extrabold tracking-[-0.015em]">{label}</span>
                      <span className="mt-1 block text-base leading-relaxed text-black/60">{uitleg}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-14 border-t border-black/15 pt-8">
              <p className="eyebrow text-[#9c7900]">02 — Vertel er iets meer over</p>
              <h2 {...titleProps("Waar zit het precies?", "card", "mt-5")}>Waar zit het precies?</h2>

              <div className="mt-8 grid gap-4">
                <label className="grid gap-2 text-sm font-bold">
                  Wat wil je bereiken?
                  <textarea required name="bericht" rows="5" maxLength={5000} className="resize-y rounded-2xl border border-black/10 bg-white px-5 py-4 text-base font-normal outline-none transition-colors focus:border-black" />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold">
                    Naam
                    <input required name="naam" maxLength={100} autoComplete="name" className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-base font-normal outline-none transition-colors focus:border-black" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Bedrijf
                    <input name="bedrijf" maxLength={120} autoComplete="organization" className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-base font-normal outline-none transition-colors focus:border-black" />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-bold">
                  E-mail
                  <input required type="email" name="email" maxLength={254} autoComplete="email" className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-base font-normal outline-none transition-colors focus:border-black" />
                </label>

                <label className="hidden" aria-hidden="true">Laat dit veld leeg<input tabIndex={-1} autoComplete="off" name="website" /></label>

                {status === "error" && <p role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">{error}</p>}

                <button disabled={status === "sending"} className="mt-3 w-fit rounded-full bg-[#f5ca3c] px-7 py-4 text-base font-bold text-[#0F0E0B] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50">
                  {status === "sending" ? "Versturen…" : "Verstuur je uitdaging"}
                </button>

                <p className="text-sm text-black/40">Je gegevens worden alleen gebruikt om je aanvraag te beantwoorden.</p>
              </div>
            </div>
          </div>

          {/* Naast het formulier: wat er daarna gebeurt, en de directe route voor
              wie liever niet invult. */}
          <aside className="lg:pt-8">
            <div className="rounded-[24px] bg-[#f4f3ee] p-7 sm:p-9">
              <p className="eyebrow text-black/45">Wat er daarna gebeurt</p>
              <ol className="mt-7 grid gap-6">
                {[
                  ["Ik reageer", "Meestal binnen één werkdag, met een paar concrete vragen."],
                  ["We bellen kort", "Twintig minuten om te bepalen waar het echt om draait."],
                  ["Je krijgt een voorstel", "Met wat we maken, waarom, en wat het kost."],
                ].map(([stap, uitleg], i) => (
                  <li key={stap} className="flex gap-4">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#0F0E0B] text-xs font-black text-[#F3F0EA]">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-bold">{stap}</span>
                      <span className="mt-1 block text-base leading-relaxed text-black/55">{uitleg}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 grid gap-3 border-t border-black/15 pt-7 text-base font-semibold text-black/60">
                <a href="mailto:tygo@tvm-productions.nl" className="flex w-fit items-center gap-3 transition-colors hover:text-black">
                  <Mail className="size-5 shrink-0 text-[#b78d00]" aria-hidden="true" />
                  tygo@tvm-productions.nl
                </a>
                <span className="flex items-center gap-3">
                  <MapPin className="size-5 shrink-0 text-[#b78d00]" aria-hidden="true" />
                  Purmerend, Noord-Holland
                </span>
                <span className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0 text-[#b78d00]" aria-hidden="true" />
                  Meestal binnen één werkdag
                </span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  </Layout>;
}

function ContactThanksPage() {
  return <Layout><PageHero label="Contact" title="BEDANKT VOOR JE AANVRAAG." intro="Je bericht is verstuurd. Meestal krijg je binnen één werkdag reactie met een eerste reactie of een voorstel voor een kennismaking." /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-4xl"><SectionTitle label="Wat gebeurt er nu?" title="DRIE KORTE STAPPEN." /><div className="grid gap-3 sm:grid-cols-3">{[["01", "Ik lees je aanvraag", "Meestal dezelfde of de eerstvolgende werkdag."], ["02", "Korte kennismaking", "Telefonisch of op locatie, om doel en aanpak scherp te krijgen."], ["03", "Voorstel op maat", "Je ontvangt een duidelijke aanpak en prijs, zonder verplichtingen."]].map(([n, t, d]) => <div key={n} className="rounded-[2rem] bg-[#f4f3ee] p-7"><span className="text-sm font-black text-black/30">{n}</span><h3 {...titleProps(t, "card", "mt-16")}>{t}</h3><p className="mt-3 text-sm text-black/50">{d}</p></div>)}</div><div className="mt-10"><Action href="/">Terug naar home</Action></div></div></section></Layout>;
}

export const privateData = {
  particulier: { label: "Voor particulieren", title: "MOMENTEN DIE JE NIET OPNIEUW KUNT DOEN.", intro: "Trouwfilms en eventvideo's met aandacht voor mensen, sfeer en alles wat tussendoor gebeurt.", image: terLeedeEvent },
  trouwfilm: { label: "Trouwfilm", title: "JULLIE DAG, ZONDER HET TE REGISSEREN.", intro: "Een trouwfilm die de dag laat voelen zoals hij was: de mensen, stemmen en kleine momenten die je zelf bijna mist.", image: tygoCamera },
  event: { label: "Privé-event", title: "DE SFEER VAN DE AVOND BEWAARD.", intro: "Een jubileum, feest of bijzonder moment vastgelegd zonder dat de camera de aandacht overneemt.", image: terLeedeEvent },
};

function PrivatePage({ data }) { return <Layout><PageHero label={data.label} title={data.title} intro={data.intro} image={data.image} compact /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><div className="mx-auto max-w-[1440px]"><SectionTitle label="Persoonlijk vastgelegd" title="AANWEZIG, ZONDER OP TE VALLEN." intro="Vooraf spreken we door wat belangrijk is. Op de dag zelf houd ik ruimte voor wat spontaan gebeurt." /><div className="grid gap-3 md:grid-cols-3">{["Rustige voorbereiding", "Oog voor mensen en details", "Een film die natuurlijk blijft"].map((x, i) => <div key={x} className={`min-h-64 rounded-[2rem] p-8 ${i === 1 ? "bg-[#f5ca3c]" : "bg-[#f4f3ee]"}`}><span className="text-sm font-black">0{i + 1}</span><p className="mt-24 text-2xl font-black">{x}</p></div>)}</div></div></section><CTA /></Layout>; }

export const legalData = {
  privacy: { title: "Privacyverklaring", intro: "Hoe TVM Productions omgaat met persoonsgegevens.", sections: [["Contactgegevens", "TVM Productions verwerkt gegevens die je zelf verstrekt wanneer je contact opneemt, zoals naam, e-mailadres, telefoonnummer en bedrijfsnaam."], ["Waarom deze gegevens worden gebruikt", "Voor het beantwoorden van aanvragen, maken van offertes, uitvoeren van opdrachten en voldoen aan administratieve verplichtingen."], ["Bewaartermijnen en delen", "Gegevens worden niet langer bewaard dan nodig en alleen gedeeld met partijen die noodzakelijk zijn voor de uitvoering of wanneer de wet dit vereist."], ["Jouw rechten", "Je kunt vragen om inzage, correctie of verwijdering via tygo@tvm-productions.nl."]] },
  voorwaarden: { title: "Algemene voorwaarden", intro: "Praktische afspraken rond offertes, planning, gebruik en oplevering.", sections: [["Conceptversie", "Deze pagina is een inhoudelijke placeholder en geen definitieve juridische set voorwaarden."], ["Offerte en opdracht", "Leg vóór publicatie vast wanneer een offerte bindend wordt, welke werkzaamheden zijn inbegrepen en hoe meerwerk wordt behandeld."], ["Planning en annulering", "Neem afspraken op over verplaatsen, annuleren, weersomstandigheden, toegang tot locaties en inzet van derden."], ["Gebruiksrechten", "Leg vast welke gebruiksrechten de klant ontvangt en hoe bronmateriaal, muzieklicenties en portfoliogebruik worden behandeld."]] },
  "avg-fotografie-video": { title: "AVG bij fotografie en video", intro: "Praktische aandachtspunten wanneer medewerkers, klanten of bezoekers in beeld komen.", sections: [["Wie regelt toestemming?", "De opdrachtgever is doorgaans verantwoordelijk voor een geldige grondslag en voor het informeren van mensen die herkenbaar in beeld komen."], ["Maak afspraken vooraf", "Bepaal wie wel en niet in beeld mag, waar het materiaal wordt gepubliceerd en hoe lang toestemming geldt."], ["Evenementen", "Werk met duidelijke informatie bij registratie en entree. Bied waar mogelijk een herkenbare route voor bezoekers die niet in beeld willen."]] },
};

function LegalPage({ data, slug }) { return <Layout><PageHero label="Praktisch" title={data.title.toUpperCase()} intro={data.intro} compact breadcrumbs={[{ label: data.title, href: `/${slug}/` }]} /><section className="bg-white px-3 py-24 sm:px-6 sm:py-32"><article className="mx-auto max-w-4xl">{data.sections.map(([t, d], i) => <section key={t} className="border-t border-black/15 py-9"><span className="text-sm font-black text-black/30">0{i + 1}</span><h2 {...titleProps(t, "card", "mt-4")}>{t}</h2><p className="mt-4 leading-relaxed text-black/55 t-body">{d}</p></section>)}</article></section></Layout>; }

function NotFound() { return <Layout><PageHero label="404" title="DEZE PAGINA BESTAAT NIET." intro="De link klopt niet meer of de pagina is verplaatst." /><div className="mx-auto max-w-[1440px] px-6 pb-24"><Action href="/">Terug naar home</Action></div></Layout>; }

export default function SitePage({ path }) {
  const clean = path.replace(/\/+$/, "") || "/";
  useEffect(() => {
    window.scrollTo(0, 0);
    // Titel uit seo.js halen in plaats van uit een tweede, handmatige lijst.
    // Die lijst stond hier eerder en liep uiteen met wat de server rendert: de
    // browser overschreef na hydratie de volledige SEO-titel met een kortere.
    // Eén bron dus, en een nieuwe route hoeft nog maar op één plek geregeld.
    document.title = getMeta(clean).title;
  }, [clean]);
  if (clean === "/diensten") return <ServicesHub />;
  if (clean.startsWith("/diensten/")) { const slug = clean.split("/")[2]; const service = serviceData[slug]; return service ? <ServicePage service={service} slug={slug} /> : <NotFound />; }
  if (clean === "/werkwijze") return <ProcessPage />;
  if (clean === "/cases") return <CasesHub />;
  if (clean.startsWith("/cases/")) { const slug = clean.split("/")[2]; const item = caseData[slug]; return item ? <CasePage item={item} slug={slug} /> : <NotFound />; }
  if (clean === "/over") return <AboutPage />;
  if (clean === "/tarieven") return <PricingPage />;
  if (clean === "/videoproductie-purmerend") return <LocalPage />;
  if (clean === "/kennisbank") return <KnowledgeHub />;
  if (clean.startsWith("/kennisbank/")) { const slug = clean.split("/")[2]; const article = articleData[slug]; return article ? <ArticlePage article={article} slug={slug} /> : <NotFound />; }
  if (clean === "/veelgestelde-vragen") return <FAQPage />;
  if (clean === "/contact") return <ContactPage />;
  if (clean === "/hoe-ik-help") return <Layout><HoeIkHelp cases={caseData} /></Layout>;
  if (clean.startsWith("/oplossingen/")) {
    const slug = clean.split("/")[2];
    const data = oplossingen[slug];
    return data ? <Layout><OplossingPagina data={data} slug={slug} cases={caseData} /></Layout> : <NotFound />;
  }
  if (clean === "/contact/bedankt") return <ContactThanksPage />;
  if (clean === "/particulier") return <PrivatePage data={privateData.particulier} />;
  if (clean === "/particulier/trouwfilm") return <PrivatePage data={privateData.trouwfilm} />;
  if (clean === "/particulier/event") return <PrivatePage data={privateData.event} />;
  if (clean === "/privacy") return <LegalPage data={legalData.privacy} slug="privacy" />;
  if (clean === "/voorwaarden") return <LegalPage data={legalData.voorwaarden} slug="voorwaarden" />;
  if (clean === "/avg-fotografie-video") return <LegalPage data={legalData["avg-fotografie-video"]} slug="avg-fotografie-video" />;
  return <NotFound />;
}
