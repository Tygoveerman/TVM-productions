import { Fragment, useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import tygoPortrait from "../assets/portfolio/tygo-portrait.jpeg";
import sunforce from "../assets/portfolio/sunforce.jpeg";
import vestoProduct from "../assets/portfolio/vesto-product.jpeg";
import kesWerk from "../assets/portfolio/cases/kes-selectie/08.jpg";
import tvmLogo from "../assets/brand/tvm-logo-source.png";
import Footer from "./Footer";
import { caseData } from "./SitePages.jsx";
import ArrowSwap from "../site/ArrowSwap.jsx";
import { videoUrl } from "../site/media.js";
import { organizationSchema, localBusinessSchema } from "../site/schema.js";
import StickyCta from "../site/StickyCta.jsx";
import Testimonials from "../site/Testimonials.jsx";
import { titleProps } from "../site/typography.js";
import TrustBar from "../site/TrustBar.jsx";
import heroPoster from "../assets/portfolio/hero/loop-poster.jpg";

// Vier items, meer niet. "Diensten" is eruit: dat trekt de bezoeker terug naar
// een catalogus met videovormen, terwijl de hele site juist naar twee routes
// toewerkt. "Aanpak" vervangt "Werkwijze" — het omvat meer dan alleen het
// productieproces.
// "Hoe ik help" heeft een eigen pagina die om problemen en uitkomsten draait,
// niet om videovormen. Contact zit in de CTA ernaast.
const navItems = [
  // Oplossingen heeft een uitklapmenu; de rest is een gewone link.
  { label: "Oplossingen", href: "/oplossingen/zichtbaar-worden/", dropdown: true },
  { label: "Mijn aanpak", href: "/werkwijze/" },
  { label: "Cases", href: "/cases/" },
  { label: "Over mij", href: "/over/" },
];

// De twee problemen waarmee iemand daadwerkelijk binnenkomt. Geen diensten:
// de bezoeker moet zichzelf hier herkennen, pas daarna is de vraag wat ik maak.
// "Werk op niveau" is bewust geschrapt — dat is een behoefte van de maker, geen
// koopreden van de klant.
// De drie uitkomsten waar iemand voor binnenkomt. Ze staan in de hero én in het
// menu onder "Oplossingen"; de id's zijn de ankers waar dat menu naartoe wijst.
const OPLOSSINGEN = [
  {
    nummer: "01",
    id: "zichtbaar-worden",
    href: "/oplossingen/zichtbaar-worden/",
    titel: "Zichtbaar worden",
    tekst: "Laat zien wat je doet, waar je goed in bent en waarom klanten voor jou moeten kiezen.",
    menu: "Laat zien wat je bedrijf onderscheidt.",
  },
  {
    nummer: "02",
    id: "medewerkers-aantrekken",
    href: "/oplossingen/medewerkers-aantrekken/",
    titel: "Medewerkers aantrekken",
    tekst: "Laat zien hoe het écht is om bij jouw bedrijf te werken.",
    menu: "Laat zien waarom mensen bij jou willen werken.",
  },
  {
    nummer: "03",
    id: "duidelijk-uitleggen",
    href: "/oplossingen/duidelijk-uitleggen/",
    titel: "Duidelijk uitleggen",
    tekst: "Leg producten, diensten en processen helder uit.",
    menu: "Maak complexe producten, diensten of processen begrijpelijk.",
  },
];

const ROUTES = [
  {
    nummer: "01",
    id: "zichtbaar-worden",
    titel: "Zichtbaar worden",
    probleem: "Je levert goed werk, maar potentiële klanten zien onvoldoende wat jullie anders of beter maakt.",
    punten: ["Expertise zichtbaar maken", "Vertrouwen opbouwen", "Bewijs laten zien", "Meer relevante aanvragen"],
    image: sunforce,
    alt: "Bedrijfsvideo-opname voor Sunforce",
  },
  {
    nummer: "02",
    id: "medewerkers-aantrekken",
    titel: "Medewerkers aantrekken",
    probleem: "Je hebt een goed bedrijf en leuk werk, maar kandidaten krijgen daar online nauwelijks iets van mee.",
    punten: ["Het echte werk laten zien", "Medewerkers aan het woord", "Cultuur voelbaar maken", "Kandidaten enthousiast maken"],
    image: kesWerk,
    alt: "Medewerker aan het werk op een project van Kes Sloopwerk",
  },
  {
    nummer: "03",
    id: "duidelijk-uitleggen",
    titel: "Duidelijk uitleggen",
    probleem: "Wat jij doet is niet in één zin uit te leggen, en dat kost je klanten die afhaken voordat ze het snappen.",
    // De vormen hieronder verwijzen naar dienstpagina's die daadwerkelijk bestaan.
    punten: ["Uitlegvideo", "Projectvideo", "Productfotografie", "Processen in beeld"],
    image: vestoProduct,
    alt: "Productfotografie voor Vesto",
  },
];

// De drie sterkste cases. Titel, type en beeld komen uit caseData in SitePages,
// zodat die niet uit de pas lopen met de casepagina zelf.
//
// De drie regels hieronder zijn wél homepage-eigen: de teksten in caseData zijn
// volzinnen die op een casepagina prima werken, maar hier moet je in één blik
// kunnen zien waar het over ging. Kort houden dus — het hele verhaal staat een
// klik verderop.
const FEATURED_CASES = [
  {
    slug: "24wines",
    uitdaging: "Een webshop voelt anoniem. Klanten zien niet wie erachter zit.",
    aanpak: "Bedrijfsvideo in de zaak, productfotografie en het inpakproces in beeld.",
    resultaat: "Beeld dat vertrouwen wekt en 24Wines onderscheidt van een anonieme webshop.",
  },
  {
    slug: "sunforce",
    uitdaging: "Het vakmanschap gebeurt op locatie en blijft voor klanten onzichtbaar.",
    aanpak: "Reportage van de installatie op het dak tot het team op kantoor.",
    resultaat: "Eén beeldbank die werkt voor website, sales én social.",
  },
  {
    slug: "kes-sloopwerk",
    uitdaging: "Telefoonbeelden deden geen recht aan het materieel en de mensen.",
    aanpak: "Van het eerste graafwerk tot de afronding: overzicht, actie en details.",
    resultaat: "Een beeldserie die het werk laat zien zoals het echt is.",
  },
];

// Vier woorden volstaan: meer hoeft iemand op de homepage niet te weten over
// de werkwijze.
const steps = [
  ["01", "Kennismaken"],
  ["02", "Plan maken"],
  ["03", "Produceren"],
  ["04", "Opleveren"],
];

const faqs = [
  ["Wat kost een zakelijke video?", "Dat hangt af van het doel, het aantal draaidagen en hoeveel versies je nodig hebt. Na een korte kennismaking krijg je een helder voorstel zonder verborgen posten."],
  ["Hoe lang duurt een productie?", "Een compacte productie kan vaak binnen twee tot vier weken live. Bij grotere producties plannen we meer tijd voor concept, voorbereiding en feedback."],
  ["Werk je alleen in Purmerend?", "Nee. Ik werk vanuit Purmerend in heel Waterland, Noord-Holland en daarbuiten. Voor klanten in de regio ben ik meestal binnen een half uur op locatie."],
  ["Kun je foto en video combineren?", "Ja. Door foto en video in één productie te combineren krijg je een consistente beeldbank en haal je meer uit één draaidag."],
];

function Reveal({ children, className = "", delay = 0, id }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.div
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}

// De vulling schuift van links in over de basiskleur heen, in plaats van dat de
// achtergrond in één keer omklapt. Het pijltje wisselt tegelijk (zie ArrowSwap),
// zodat de knop als één beweging leest en niet als twee losse effecten.
function PillButton({ children, href, yellow = false }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-12 shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap rounded-full py-1 pl-5 pr-1 text-sm font-black leading-none transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 ${yellow ? "bg-[#f5ca3c] text-black" : "bg-[#111] text-white"}`}
    >
      <span
        className={`absolute -inset-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 ${yellow ? "bg-[#ffda58]" : "bg-[#2a2a2a]"}`}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
      <span className={`relative flex size-10 shrink-0 items-center justify-center rounded-full p-0 leading-none transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 ${yellow ? "bg-black text-white" : "bg-white text-black"}`}>
        <ArrowSwap />
      </span>
    </a>
  );
}

function JsonLd({ data }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }

function FAQSchema({ items }) {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <JsonLd data={schema} />;
}

function BrandLogo({ compact = false }) {
  return (
    <span className={`relative block shrink-0 transition-all duration-500 ${compact ? "h-9 w-[6.6rem]" : "h-11 w-32"}`}>
      <img src={tvmLogo} alt="TVM Productions" decoding="async" className="absolute inset-0 h-full w-full object-contain brightness-0" />
      <span className="absolute left-[0.3%] right-[0.7%] top-[67.45%] h-[3.7%] bg-[#f5aa00]" aria-hidden="true" />
    </span>
  );
}

export default function Homepage() {
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 72);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div id="top" className="overflow-x-hidden bg-[#f4f3ee] text-[#111]">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 sm:px-5 ${scrolled ? "pt-3 sm:pt-5" : "pt-[calc(0.75rem+20px)] sm:pt-[calc(1.25rem+20px)]"}`}>
        <div className={`mx-auto flex h-[4.25rem] w-full max-w-[920px] items-center justify-between rounded-full border border-black/[0.07] bg-[#faf9f6]/80 pl-6 pr-2.5 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:pl-7 sm:pr-3 ${
          scrolled ? "shadow-[0_2px_14px_rgba(0,0,0,.05)]" : "shadow-[0_1px_8px_rgba(0,0,0,.03)]"
        }`}>
          <a href="#top" className="flex items-center" aria-label="TVM Productions home">
            <BrandLogo compact />
          </a>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Hoofdnavigatie">
            {navItems.map((item) => item.dropdown ? (
              <div key={item.label} className="group relative">
                <a href={item.href} className="flex items-center gap-1.5 text-sm font-semibold text-black/50 transition-colors hover:text-black">
                  {item.label}
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                </a>
                <div className="invisible absolute left-0 top-full w-[30rem] translate-y-3 pt-7 opacity-0 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-[#faf9f6]/95 shadow-[0_24px_70px_rgba(0,0,0,.12)] backdrop-blur-2xl">
                    <p className="border-b border-black/[0.07] px-5 pb-3 pt-4 eyebrow text-black/35">
                      Waar loop je tegenaan?
                    </p>

                    <div className="grid p-2">
                      {OPLOSSINGEN.map((oplossing) => (
                        <a
                          key={oplossing.id}
                          href={`/oplossingen/${oplossing.id}/`}
                          className="group/link relative grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 rounded-2xl px-3 py-3.5 transition-colors duration-200 hover:bg-black/[0.04]"
                        >
                          <span className="text-sm font-black tracking-[0.12em] text-black/25 transition-colors duration-200 group-hover/link:text-[#9c7900]">
                            {oplossing.nummer}
                          </span>
                          <span>
                            <span className="block text-[0.9375rem] font-bold text-black/85">
                              {oplossing.titel}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-black/45">{oplossing.menu}</span>
                          </span>
                          <ArrowRight
                            className="size-4 translate-y-1 text-black/20 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-[#9c7900]"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>

                    <a
                      href="/contact/"
                      className="group/voet flex items-center justify-between gap-4 border-t border-black/[0.07] px-5 py-4 text-sm font-bold text-black/60 transition-colors duration-200 hover:bg-black/[0.04] hover:text-black"
                    >
                      Weet je het niet zeker? Bespreek je uitdaging
                      <ArrowRight className="size-4 shrink-0 text-[#9c7900] transition-transform duration-300 group-hover/voet:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-black/50 transition-colors hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* Zelfde beweging als de knoppen in de pagina: vulling schuift in,
              pijl wisselt. Compacter, want hij moet in de pill passen. */}
          <a href="/contact/" className="group relative hidden h-[44px] items-center gap-2 overflow-hidden rounded-full bg-[#f5ca3c] px-5 text-sm font-bold text-black transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 sm:flex">
            <span className="absolute -inset-px origin-left scale-x-0 bg-[#ffda58] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" />
            <span className="relative hidden xl:inline">Bespreek je uitdaging</span>
            <span className="relative inline xl:hidden">Bespreek</span>
            <ArrowSwap className="relative size-4" strokeWidth={2.5} />
          </a>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-black/15 sm:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Menu openen">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <Motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-2 flex max-w-[1440px] flex-col rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl sm:hidden">
            {navItems.map((item) => item.dropdown ? (
              <details key={item.label} className="border-b border-black/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-bold">
                  {item.label}
                  <ChevronDown className="size-5" aria-hidden="true" />
                </summary>
                <div className="grid pb-3">
                  {OPLOSSINGEN.map((oplossing) => (
                    <a
                      key={oplossing.id}
                      href={`/oplossingen/${oplossing.id}/`}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 pl-3 text-sm font-bold text-black/55"
                    >
                      {oplossing.titel}
                    </a>
                  ))}
                </div>
              </details>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-black/10 py-4 text-xl font-bold"
              >
                {item.label}
              </a>
            ))}
            <a href="/contact/" onClick={() => setMenuOpen(false)} className="mt-5 rounded-full bg-black px-5 py-4 text-center font-bold text-white">Bespreek je uitdaging</a>
          </Motion.nav>
        )}
      </header>

      <main>
        {/* De hero is één afgerond videovlak dat bijna de hele fold vult. De tekst
            ligt tegen de onderrand: je ziet eerst het beeld, dan pas de belofte.
            Het verloop eronder houdt de tekst leesbaar op elk frame. */}
        <section id="top" className="px-3 pb-2 pt-3 sm:px-5 sm:pb-3 sm:pt-5">
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate flex min-h-[74svh] items-end overflow-hidden sm:min-h-[calc(100svh-13rem)] rounded-[18px] bg-[#15130f] sm:rounded-[24px]"
          >
            <img src={heroPoster} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" decoding="async" />
            {/* De poster blijft liggen tot de video kan spelen, zodat er geen zwart
                vlak of sprong zit bij het laden. Bij beperkte animatie blijft het
                stilstaande beeld staan. */}
            {!reduceMotion && (
              <video
                className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroPoster}
                onCanPlay={() => setVideoReady(true)}
                aria-hidden="true"
                tabIndex={-1}
              >
                <source src={videoUrl("/videos/hero/loop.mp4")} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0F0E0B] via-[#0F0E0B]/75 to-[#0F0E0B]/20" aria-hidden="true" />

            <div className="mx-auto w-full max-w-[1750px] px-2.5 pb-8 pt-24 text-[#F3F0EA] sm:px-3.5">
              <Motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="flex items-center gap-3 eyebrow text-[#F3F0EA]/50"
              >
                <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
                Strategie · Video · Content
              </Motion.p>

              <Motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                {...titleProps("Maak zichtbaar wat jouw bedrijf te bieden heeft.", "hero", "mt-6")}
              >
                Maak zichtbaar wat jouw bedrijf te{" "}
                <span className="text-[#f5ca3c]">bieden heeft.</span>
              </Motion.h1>

              {/* Subtekst en acties onder elkaar: de knoppen staan direct onder de
                  zin die ze verdient, niet ernaast in een tweede kolom. */}
              <Motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="mt-7"
              >
                <p className="t-lead text-[#F3F0EA]/70">
                  Ik help bedrijven met videocontent die zichtbaar maakt wat ze doen, mensen overtuigt en complexe verhalen begrijpelijk maakt.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <PillButton href="/contact/" yellow>Bespreek je uitdaging</PillButton>
                  <a href="/cases/" className={`group relative inline-flex min-h-12 shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap rounded-full border border-[#F3F0EA]/30 py-1 pl-5 pr-1 text-sm font-bold leading-none text-[#F3F0EA] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-[#F3F0EA]`}>
                    <span className="absolute -inset-px origin-left scale-x-0 bg-[#F3F0EA]/10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" />
                    <span className="relative">Bekijk mijn werk</span>
                    <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[#0F0E0B] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
                      <ArrowSwap />
                    </span>
                  </a>
                </div>
              </Motion.div>

              {/* Lijn met een gereserveerde strook eronder. Bewust leeg: hier kan
                  later een balk komen (denk aan cijfers, klantnamen of een
                  doorscroll-hint) zonder dat de hero opnieuw op de schop hoeft. */}
              <Motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-8 min-h-[1.5rem] border-t border-[#F3F0EA]/20 pt-4 sm:mt-9 sm:min-h-[1.75rem]"
              />
            </div>
          </Motion.div>

        </section>

        <TrustBar />

        {/* Sectie 2 doet één ding: de bezoeker zichzelf laten herkennen en laten
            kiezen welke van de twee problemen het zijne is. Nog geen uitleg over
            werkwijze, nog geen diensten — die komen pas als hij zich herkend heeft.

            Gecentreerd en met een expliciet "of" tussen de twee kaarten, zodat het
            als één keuze leest in plaats van als twee losse blokken naast elkaar. */}
        <section id="probleem" className="px-3 py-24 sm:px-5 sm:py-32">
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow text-black/40">Waar loop je tegenaan?</p>
              <h2 {...titleProps("Goed bedrijf. Maar ziet de buitenwereld dat ook?", "section", "mt-6 mx-auto")}>
                Goed bedrijf. Maar ziet de buitenwereld dat{" "}
                <span className="text-[#e7b900]">ook?</span>
              </h2>
              <p className="mx-auto mt-7 t-body text-black/55">
                De meeste bedrijven die ik help hebben geen tekort aan kwaliteit. Ze krijgen die kwaliteit alleen onvoldoende overgebracht naar de mensen die ze willen bereiken.
              </p>
            </Reveal>

            {/* Drie kolommen op groot scherm: kaart, scheiding, kaart. Het "of"
                staat zo in de opmaak zelf en hoeft niet absoluut gepositioneerd
                te worden; op mobiel valt het vanzelf tussen de kaarten in. */}
            <div className="mt-16 grid items-stretch gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5">
              {ROUTES.map((route, index) => (
                <Reveal key={route.nummer} id={route.id} delay={index * 0.07} className="h-full scroll-mt-32">
                    <a
                      href={route.href}
                      className="group relative flex h-full min-h-[38rem] flex-col items-center justify-end overflow-hidden rounded-[24px] bg-[#0F0E0B] p-8 text-center sm:min-h-[42rem] sm:p-12"
                    >
                      <img
                        src={route.image}
                        alt={route.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:opacity-55"
                      />
                      {/* Verloop van onderaf: de tekst moet leesbaar blijven, hoe druk
                          het beeld eronder ook is. */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0B] via-[#0F0E0B]/85 to-[#0F0E0B]/25" aria-hidden="true" />

                      {/* Het cijfer groot en doorzichtig achter de kop: het geeft de
                          kaart gewicht zonder een extra element toe te voegen. */}
                      <span
                        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 text-[5.5rem] font-black leading-none text-[#F3F0EA]/[0.07] sm:top-10 sm:text-[7rem]"
                        aria-hidden="true"
                      >
                        {route.nummer}
                      </span>

                      <div className="relative flex flex-col items-center text-[#F3F0EA]">
                        <h3 {...titleProps(route.titel, "card", "mx-auto")}>{route.titel}</h3>
                        <p className="mx-auto mt-5 t-body text-[#F3F0EA]/65">{route.probleem}</p>

                        {/* Chips in plaats van een opsomming: gecentreerde bullets
                            ogen slap en zijn lastiger te scannen. */}
                        <ul className="mt-8 grid w-full grid-cols-2 gap-2">
                          {route.punten.map((punt) => (
                            <li
                              key={punt}
                              className="flex items-center justify-center rounded-full border border-[#F3F0EA]/20 bg-[#F3F0EA]/[0.06] px-3 py-2 text-center text-[0.8125rem] font-semibold leading-snug text-[#F3F0EA]/85 backdrop-blur-sm"
                            >
                              {punt}
                            </li>
                          ))}
                        </ul>

                        <span className={`relative mt-10 inline-flex min-h-12 items-center gap-4 overflow-hidden rounded-full bg-[#f5ca3c] py-1 pl-6 pr-1 text-base font-bold leading-none text-[#0F0E0B] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1`}>
                          <span className="absolute -inset-px origin-left scale-x-0 bg-[#ffda58] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" />
                          <span className="relative">Bekijk hoe ik daarbij help</span>
                          <span className={`relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0F0E0B] text-[#F3F0EA] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105`}>
                            <ArrowSwap />
                          </span>
                        </span>
                      </div>
                    </a>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bewijs. Niet alleen namen en een mooi plaatje, maar per case wat het
            probleem was, wat ik maakte en wat het opleverde — dat is waar iemand
            op afgaat als hij zichzelf net herkend heeft in sectie 2. */}
        <section id="werk" className="bg-white px-3 py-24 sm:px-5 sm:py-32">
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <Reveal className="mb-16 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-black/40">Selectie uit mijn werk</p>
                <h2 {...titleProps("Echt werk. Echt in beeld.", "section", "mt-6")}>
                  Echt werk. Echt in <span className="text-[#e7b900]">beeld.</span>
                </h2>
              </div>
              <a href="/cases/" className="group inline-flex shrink-0 items-center gap-3 text-lg font-bold">
                Bekijk alle cases
                <span className={`flex size-10 items-center justify-center rounded-full bg-[#0F0E0B] text-[#F3F0EA] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110`}>
                  <ArrowSwap />
                </span>
              </a>
            </Reveal>

            <div className="grid gap-4">
              {FEATURED_CASES.map((featured, index) => {
                const item = caseData[featured.slug];
                if (!item) return null;
                return (
                  <Reveal key={featured.slug} delay={index * 0.06}>
                    <a
                      href={`/cases/${featured.slug}/`}
                      className="group grid gap-8 overflow-hidden rounded-[24px] bg-[#f4f3ee] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#efece4] sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-7"
                    >
                      <div className="relative min-h-[20rem] overflow-hidden rounded-[16px] bg-black lg:min-h-[28rem]">
                        <img
                          src={item.image}
                          alt={`${item.title} — ${item.type}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-[#F3F0EA]/95 px-4 py-2 eyebrow text-[#0F0E0B] backdrop-blur">
                          {item.type}
                        </span>
                      </div>

                      <div className="flex flex-col justify-center py-1 lg:py-6">
                        <h3 {...titleProps(item.title, "card")}>{item.title}</h3>

                        {/* Het resultaat krijgt het meeste gewicht: daar landt het oog,
                            en dat is waar iemand op afgaat. De gele streep links maakt
                            het scanbaar zonder er een kader omheen te zetten. */}
                        <div className="mt-6 border-l-[3px] border-[#f5ca3c] pl-5">
                          <p className="eyebrow text-[#9c7900]">Resultaat</p>
                          <p className="mt-2 text-[clamp(1.25rem,1.5vw,1.75rem)] font-bold leading-[1.35] tracking-[-0.015em] text-black/85">
                            {featured.resultaat}
                          </p>
                        </div>

                        {/* Uitdaging en aanpak eronder, elk op één regel met het label
                            ernaast: te lezen als je wilt, over te slaan als je scant. */}
                        <dl className="mt-7 grid gap-3">
                          {[["Uitdaging", featured.uitdaging], ["Aanpak", featured.aanpak]].map(([label, tekst]) => (
                            <div key={label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                              <dt className="eyebrow pt-1 text-black/35">{label}</dt>
                              <dd className="text-[1.0625rem] leading-[1.5] text-black/60">{tekst}</dd>
                            </div>
                          ))}
                        </dl>

                        <span className={`relative mt-8 inline-flex w-fit min-h-12 items-center gap-4 overflow-hidden rounded-full bg-[#0F0E0B] py-1 pl-6 pr-1 text-base font-bold leading-none text-[#F3F0EA] transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:text-[#0F0E0B]`}>
                          <span className="absolute -inset-px origin-left scale-x-0 bg-[#f5ca3c] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" />
                          <span className="relative">Bekijk case</span>
                          <span className={`relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5ca3c] text-[#0F0E0B] transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-[#0F0E0B] group-hover:text-[#F3F0EA]`}>
                            <ArrowSwap />
                          </span>
                        </span>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mijn aanpak. Was een opeenstapeling van losse onderdelen — drie
            paragrafen van verschillend gewicht, een stappenregel, een knop, een
            groot portret en een naamregel — zonder dat één daarvan de leiding nam.
            Nu draagt de kop het, staat de uitleg ernaast en vormen de vier stappen
            een rail eronder. Dat is hetzelfde patroon als de andere secties (dunne
            lijn bovenaan, twee kolommen, rail), zodat hij in de pagina past in
            plaats van ertussen te zitten. De knop is eruit: die staat al in de
            navigatie, in de hero en onderaan de pagina. */}
        <section id="over" className="bg-white px-3 py-24 sm:px-5 sm:py-32">
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <div className="grid gap-12 border-t border-black/15 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:pt-16">
              <Reveal>
                <p className="flex items-center gap-3 eyebrow text-black/45">
                  <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
                  Mijn aanpak
                </p>

                <h2 {...titleProps("Eerst het doel. Dan de camera.", "section", "mt-7")}>
                  Eerst het doel.<br />Dan de <span className="text-[#e7b900]">camera.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.06} className="lg:pt-3">
                <p className="t-body text-black/70">
                  Ik maak geen content omdat er &ldquo;iets op social moet&rdquo;. Eerst wil ik weten wat je wilt bereiken en waar het nu vastloopt. Daarna bepalen we wat er nodig is om daar verandering in te brengen.
                </p>

                <p className="mt-7 text-[clamp(1.2rem,1.4vw,1.6rem)] font-bold leading-[1.4] tracking-[-0.015em] text-black/85">
                  Geen standaard pakket. Geen video om de video.{" "}
                  <span className="text-[#c59d00]">Wel content met een duidelijke reden.</span>
                </p>

                {/* Portret als ondertekening in plaats van als tweede beeldvlak. */}
                <div className="mt-9 flex items-center gap-4">
                  <img
                    src={tygoPortrait}
                    alt="Portret van Tygo Veerman"
                    loading="lazy"
                    decoding="async"
                    className="size-14 shrink-0 rounded-full object-cover object-top"
                  />
                  <p className="text-base font-bold">
                    Tygo Veerman
                    <span className="ml-2.5 font-semibold text-black/40">TVM Productions</span>
                  </p>
                </div>
              </Reveal>
            </div>

            {/* De vier stappen als rail: één doorlopende lijn met de stappen erop,
                net als de tijdlijn op /hoe-ik-help/. */}
            <Reveal className="relative mt-16 sm:mt-20">
              <span className="absolute inset-x-0 top-[5px] h-px bg-black/15" aria-hidden="true" />
              <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-4">
                {[
                  ["Strategie", "Wat moet er veranderen?"],
                  ["Concept", "Wat gaan we maken?"],
                  ["Productie", "Draaien en monteren."],
                  ["Inzet", "Waar gaat het werken?"],
                ].map(([stap, uitleg], i) => (
                  <li key={stap} className="relative pt-8">
                    <span
                      className={`absolute left-0 top-0 rounded-full ${i === 3 ? "size-3 bg-[#f5ca3c] ring-4 ring-[#f5ca3c]/20" : "size-2.5 bg-black/25"}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm font-black tracking-[0.12em] ${i === 3 ? "text-[#9c7900]" : "text-black/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2.5 text-xl font-extrabold tracking-[-0.015em]">{stap}</h3>
                    <p className="mt-2 text-base leading-relaxed text-black/60">{uitleg}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Werkwijze in één regel. De uitgebreide uitleg staat op /werkwijze/;
            op de homepage is dit alles wat iemand hoeft te weten. */}
        <section id="werkwijze" className="px-3 py-16 sm:px-5 sm:py-20">
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <Reveal>
              <p className="eyebrow text-black/40">Zo werkt het</p>
              <ol className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-black/15 pt-8 sm:gap-x-6">
                {steps.map(([nummer, titel], index) => (
                  <Fragment key={nummer}>
                    {index > 0 && (
                      <span className="text-2xl text-black/25" aria-hidden="true">&rarr;</span>
                    )}
                    <li className="flex items-baseline gap-3">
                      <span className="text-sm font-black tracking-[0.14em] text-[#c59d00]">{nummer}</span>
                      <span className="text-[clamp(1.35rem,2vw,2rem)] font-extrabold tracking-[-0.02em]">{titel}</span>
                    </li>
                  </Fragment>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <Testimonials />

        {/* Oorspronkelijke opzet: kop links, uitklaplijst rechts. Alleen ruimer
            gezet, en zonder de vaste antwoordhoogte van 128px — daar viel tekst
            achter weg zodra de bodytekst groter werd. */}
        <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
          <FAQSchema items={faqs} />
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <Reveal className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="eyebrow text-black/40">Kort antwoord</p>
                <h2 {...titleProps("Goede vragen.", "section", "mt-6")}>
                  Goede <span className="text-[#e7b900]">vragen.</span>
                </h2>
              </div>

              <div className="border-t border-black/15">
                {faqs.map(([vraag, antwoord], index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={vraag} className="border-b border-black/15">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="group flex w-full items-center justify-between gap-8 py-8 text-left sm:py-9"
                        aria-expanded={isOpen}
                      >
                        <span className={`t-card transition-colors duration-300 ${isOpen ? "text-black" : "text-black/70 group-hover:text-black"}`}>
                          {vraag}
                        </span>
                        <Motion.span
                          animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? "#f5ca3c" : "rgba(0,0,0,0)" }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="grid size-12 shrink-0 place-items-center rounded-full border border-black/15"
                        >
                          <ChevronDown className="size-5" strokeWidth={2.25} />
                        </Motion.span>
                      </button>

                      {/* height: "auto" — het antwoord bepaalt zelf zijn hoogte. */}
                      <Motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
                        className="overflow-hidden"
                        aria-hidden={!isOpen}
                      >
                        <p className="pb-9 pr-6 t-body text-black/55 sm:pr-16">{antwoord}</p>
                      </Motion.div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Afsluiting op een vervaagd, verduisterd beeld. Het is dezelfde
            posterframe als in de hero: al geladen (dus geen extra laadtijd) en de
            pagina sluit in dezelfde wereld als waarin hij opent.
            De scale-110 op het beeld is nodig: blur trekt randpixels naar binnen,
            waardoor je zonder die overmaat een lichte zoom langs de randen ziet. */}
        <section id="contact" className="bg-white px-3 pb-5 pt-24 sm:px-5 sm:pt-32">
          <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
            <Reveal className="relative isolate overflow-hidden rounded-[24px] bg-[#0F0E0B] px-6 py-24 text-center sm:px-12 sm:py-28">
              <img
                src={heroPoster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover blur-[14px]"
              />
              <div className="absolute inset-0 -z-10 bg-[#0F0E0B]/75" aria-hidden="true" />

              <div className="text-[#F3F0EA]">
                <p className="flex items-center justify-center gap-3 eyebrow text-[#F3F0EA]/50">
                  <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
                  Meestal binnen één werkdag reactie
                </p>

                <h2 {...titleProps("Klaar om iets te veranderen?", "section", "mx-auto mt-7")}>
                  Klaar om iets te <span className="text-[#f5ca3c]">veranderen?</span>
                </h2>

                <p className="mx-auto mt-7 t-body text-[#F3F0EA]/70">
                  Vertel me waar je tegenaan loopt. Ik denk met je mee over wat daarvoor nodig is.
                </p>

                <div className="mt-10 flex justify-center">
                  <PillButton href="/contact/" yellow>Bespreek je uitdaging</PillButton>
                </div>

                <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 border-t border-[#F3F0EA]/15 pt-8 text-lg font-bold text-[#F3F0EA]/55 sm:flex-row sm:justify-center sm:gap-10">
                  <a
                    href="mailto:Tygo@tvm-productions.nl"
                    className="flex items-center gap-3 transition-colors hover:text-[#F3F0EA]"
                  >
                    <Mail className="size-5 shrink-0 text-[#f5ca3c]" aria-hidden="true" />
                    Tygo@tvm-productions.nl
                  </a>
                  <span className="flex items-center gap-3">
                    <MapPin className="size-5 shrink-0 text-[#f5ca3c]" aria-hidden="true" />
                    Purmerend · Noord-Holland
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer elevated />
      <StickyCta />
    </div>
  );
}
