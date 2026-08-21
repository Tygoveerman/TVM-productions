import { useEffect, useState } from "react";
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
import tygoCamera from "../assets/portfolio/tygo-camera.jpeg";
import tygoPortrait from "../assets/portfolio/tygo-portrait.jpeg";
import behindTheScenes from "../assets/portfolio/behind-the-scenes.jpeg";
import sunforce from "../assets/portfolio/sunforce.jpeg";
import kesProject from "../assets/portfolio/kes-project.jpeg";
import woonmaandInterior from "../assets/portfolio/woonmaand-interior.jpeg";
import terLeedeEvent from "../assets/portfolio/ter-leede-event.jpeg";
import wines24Cover from "../assets/portfolio/cases/24wines-selectie/07.jpg";
import bladergroenCover from "../assets/portfolio/cases/bladergroen-selectie/15.jpg";
import jaimmCover from "../assets/portfolio/cases/jaimm-gallery/behandeling-05.jpg";
import vanBaarsenVastgoed from "../assets/portfolio/daan-vastgoed.jpeg";
import tvmLogo from "../assets/brand/tvm-logo-source.png";
import Footer from "./Footer";
import { organizationSchema, localBusinessSchema } from "../site/schema.js";
import StickyCta from "../site/StickyCta.jsx";
import Testimonials from "../site/Testimonials.jsx";
import heroKes from "../assets/portfolio/hero/kes-project.jpeg";
import heroTygo from "../assets/portfolio/hero/tygo-camera.jpeg";
import heroSunforce from "../assets/portfolio/hero/sunforce.jpeg";
import heroWoonmaand from "../assets/portfolio/hero/woonmaand-interior.jpeg";
import heroBts from "../assets/portfolio/hero/behind-the-scenes.jpeg";
import heroTerLeede from "../assets/portfolio/hero/ter-leede-event.jpeg";
import heroVesto from "../assets/portfolio/hero/vesto-product.jpeg";

const navItems = [
  { label: "Werk", href: "/cases/" },
  { label: "Diensten", href: "/diensten/" },
  { label: "Werkwijze", href: "/werkwijze/" },
  { label: "Over Tygo", href: "/over/" },
];

const serviceNavItems = [
  ["Bedrijfsvideo", "/diensten/bedrijfsvideo/"],
  ["Promotievideo", "/diensten/promotievideo/"],
  ["Klantcasevideo", "/diensten/klantcasevideo/"],
  ["Uitlegvideo", "/diensten/uitlegvideo/"],
  ["Projectvideo", "/diensten/projectvideo/"],
  ["Eventvideo & fotografie", "/diensten/eventvideo-fotografie/"],
  ["Bedrijfsfotografie", "/diensten/bedrijfsfotografie/"],
  ["Productfotografie", "/diensten/productfotografie/"],
];

const outcomes = [
  ["01", "Meer aanvragen", "Beeld dat aandacht pakt en mensen daarna ook laat doorpakken."],
  ["02", "De juiste mensen", "Laat helder zien hoe je bedrijf werkt en wie er goed bij past."],
  ["03", "Werk op niveau", "Geef je beste projecten het beeld dat ze daadwerkelijk verdienen."],
];

const services = [
  { label: "01 · Video", image: sunforce, title: "Bedrijfsfilm", text: "Wie je bent, wat je doet en waarom klanten voor je kiezen. Teruggebracht tot een verhaal dat blijft hangen.", href: "/diensten/bedrijfsvideo/" },
  { label: "02 · Doorlopend", image: behindTheScenes, title: "Social content", text: "Korte video’s die passen bij je merk en bij het platform. Slim opgenomen in één efficiënte draaidag.", href: "/diensten/promotievideo/" },
  { label: "03 · Fotografie", image: woonmaandInterior, title: "Bedrijfsfotografie", text: "Portretten, sfeer en mensen aan het werk. Eén sterke beeldbank voor website, sales en social.", href: "/diensten/bedrijfsfotografie/" },
  { label: "04 · Bewijs", image: kesProject, title: "Cases & testimonials", text: "Laat klanten en projecten het verhaal vertellen. Geloofwaardig bewijs, professioneel in beeld gebracht.", href: "/diensten/klantcasevideo/" },
];

const cases = [
  { title: "24Wines", type: "Bedrijfscontent", image: wines24Cover, href: "/cases/24wines/", className: "md:col-span-2 lg:col-span-2 lg:row-span-2", height: "min-h-[32rem] lg:min-h-[44rem]" },
  { title: "SG WJ Bladergroen", type: "Schoolfotografie", image: bladergroenCover, href: "/cases/sg-wj-bladergroen/", className: "", height: "min-h-[24rem]" },
  { title: "Ter Leede", type: "Eventreportage video & foto", image: terLeedeEvent, href: "/cases/ter-leede/", className: "", height: "min-h-[24rem]" },
  { title: "Jaimm PMU", type: "Bedrijfsfotografie", image: jaimmCover, href: "/cases/jaimm-pmu/", className: "", height: "min-h-[27rem]" },
  { title: "Van Baarsen Vastgoed", type: "Vastgoedvideografie", image: vanBaarsenVastgoed, className: "md:col-span-2", height: "min-h-[27rem]" },
];

const heroFrames = [
  { image: heroKes, alt: "Projectfotografie voor Kes Sloopwerk", position: "object-center", size: "h-[14rem] w-[14.5%] sm:h-[20rem] lg:h-[26rem] xl:h-[28rem]" },
  { image: heroTygo, alt: "Tygo Veerman achter de camera", position: "object-[center_35%]", size: "h-[12.5rem] w-[13.5%] sm:h-[18rem] lg:h-[23rem] xl:h-[25rem]" },
  { image: heroSunforce, alt: "Bedrijfsvideo voor Sunforce", position: "object-center", size: "h-[11rem] w-[12.5%] sm:h-[16.5rem] lg:h-[20.5rem] xl:h-[22rem]" },
  { image: heroWoonmaand, alt: "Interieurfotografie voor Woonmaand", position: "object-center", size: "h-[10rem] w-[11%] sm:h-[15rem] lg:h-[18rem] xl:h-[20rem]" },
  { image: heroBts, alt: "Videoproductie achter de schermen", position: "object-center", size: "h-[11rem] w-[12.5%] sm:h-[16.5rem] lg:h-[20.5rem] xl:h-[22rem]" },
  { image: heroTerLeede, alt: "Eventreportage voor Ter Leede", position: "object-center", size: "h-[12.5rem] w-[13.5%] sm:h-[18rem] lg:h-[23rem] xl:h-[25rem]" },
  { image: heroVesto, alt: "Productfotografie voor Vesto", position: "object-center", size: "h-[14rem] w-[14.5%] sm:h-[20rem] lg:h-[26rem] xl:h-[28rem]" },
];

const steps = [
  ["01", "Kennismaken", "We bepalen eerst wat het beeld moet opleveren. Zonder helder doel draait de camera nog niet."],
  ["02", "Plan maken", "Ik werk concept, planning en shots uit. Je weet vooraf precies wat er gaat gebeuren."],
  ["03", "Draaien", "Een rustige draaidag, strak geregeld. Ik stuur bij waar nodig en houd de vaart erin."],
  ["04", "Opleveren", "Montage, feedback en exports voor ieder kanaal. Klaar om direct te gebruiken."],
];

const faqs = [
  ["Wat kost een zakelijke video?", "Dat hangt af van het doel, het aantal draaidagen en hoeveel versies je nodig hebt. Na een korte kennismaking krijg je een helder voorstel zonder verborgen posten."],
  ["Hoe lang duurt een productie?", "Een compacte productie kan vaak binnen twee tot vier weken live. Bij grotere producties plannen we meer tijd voor concept, voorbereiding en feedback."],
  ["Werk je alleen in Purmerend?", "Nee. Ik werk vanuit Purmerend in heel Waterland, Noord-Holland en daarbuiten. Voor klanten in de regio ben ik meestal binnen een half uur op locatie."],
  ["Kun je foto en video combineren?", "Ja. Door foto en video in één productie te combineren krijg je een consistente beeldbank en haal je meer uit één draaidag."],
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.div
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

function PillButton({ children, href, yellow = false }) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 shrink-0 items-center gap-4 whitespace-nowrap rounded-full py-1 pl-5 pr-1 text-sm font-black leading-none transition-all duration-300 hover:-translate-y-1 ${yellow ? "bg-[#f5ca3c] text-black" : "bg-[#111] text-white"}`}
    >
      {children}
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full p-0 leading-none ${yellow ? "bg-black text-white" : "bg-white text-black"}`} aria-hidden="true">
        <ArrowUpRight className="block size-5 shrink-0 -translate-x-px translate-y-px transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.25} />
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
    <span className={`relative block shrink-0 transition-all duration-500 ${compact ? "h-8 w-[5.85rem]" : "h-11 w-32"}`}>
      <img src={tvmLogo} alt="TVM Productions" decoding="async" className="absolute inset-0 h-full w-full object-contain brightness-0" />
      <span className="absolute left-[0.3%] right-[0.7%] top-[67.45%] h-[3.7%] bg-[#f5aa00]" aria-hidden="true" />
    </span>
  );
}

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

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
      <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 sm:px-6 ${scrolled ? "pt-3" : "pt-3 sm:pt-5"}`}>
        <div className={`mx-auto flex w-full items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolled
            ? "h-14 max-w-[820px] border border-black/10 bg-white/75 px-3 shadow-[0_14px_45px_rgba(0,0,0,.1)] backdrop-blur-2xl sm:px-4"
            : "h-16 max-w-[1600px] border border-transparent bg-transparent px-0"
        }`}>
          <a href="#top" className="flex items-center" aria-label="TVM Productions home">
            <BrandLogo compact={scrolled} />
          </a>
          <nav className={`hidden items-center rounded-full border backdrop-blur-xl transition-all duration-500 lg:flex ${
            scrolled
              ? "gap-5 border-transparent bg-transparent px-2 py-2 shadow-none"
              : "gap-7 border-black/10 bg-transparent px-7 py-3 shadow-[0_10px_35px_rgba(0,0,0,.04)]"
          }`} aria-label="Hoofdnavigatie">
            {navItems.map((item) => item.label === "Diensten" ? (
              <div key={item.label} className="group relative">
                <a href={item.href} className="flex items-center gap-1.5 text-sm font-semibold text-black/50 transition-colors hover:text-black">Diensten <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" /></a>
                <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-[1.75rem] border border-black/10 bg-white/95 p-3 shadow-[0_24px_70px_rgba(0,0,0,.14)] backdrop-blur-2xl">
                    {serviceNavItems.map(([label, href], index) => <a key={href} href={href} className="group/link flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-[#f4f3ee]"><span className="text-[10px] font-black text-black/25">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-bold text-black/70 group-hover/link:text-black">{label}</span></a>)}
                    <a href="/diensten/" className="col-span-2 mt-1 flex items-center justify-between rounded-2xl bg-[#f5ca3c] px-4 py-3 text-sm font-black">Bekijk alle diensten <ArrowUpRight className="size-4" /></a>
                  </div>
                </div>
              </div>
            ) : <a key={item.label} href={item.href} className="text-sm font-semibold text-black/50 transition-colors hover:text-black">{item.label}</a>)}
          </nav>
          <a href="/contact/" className={`hidden items-center rounded-full bg-[#f5ca3c] text-sm font-bold text-black transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#ffda58] sm:flex ${scrolled ? "gap-1.5 px-4 py-2.5" : "gap-2 px-5 py-3"}`}>
            <span className={scrolled ? "hidden xl:inline" : "inline"}>Plan een gesprek</span>
            <span className={scrolled ? "inline xl:hidden" : "hidden"}>Gesprek</span>
            <ArrowUpRight className="size-4" />
          </a>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-black/15 sm:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Menu openen">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <Motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-2 flex max-w-[1440px] flex-col rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl sm:hidden">
            {navItems.map((item) => item.label === "Diensten" ? <details key={item.label} className="border-b border-black/10"><summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-bold">Diensten <ChevronDown className="size-5" /></summary><div className="grid pb-3">{serviceNavItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2 pl-3 text-sm font-bold text-black/55">{label}</a>)}</div></details> : <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-black/10 py-4 text-xl font-bold">{item.label}</a>)}
            <a href="/contact/" onClick={() => setMenuOpen(false)} className="mt-5 rounded-full bg-black px-5 py-4 text-center font-bold text-white">Plan een gesprek</a>
          </Motion.nav>
        )}
      </header>

      <main>
        <section id="top" className="relative overflow-hidden bg-[#f4f3ee] px-3 pb-0 pt-28 sm:px-6 sm:pt-36">
          <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center text-center">
            <Motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fff9df] px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-black/55 shadow-sm sm:text-xs"
            >
              <span className="size-2 rounded-full bg-[#f5ca3c]" />
              Video & fotografie vanuit Purmerend
            </Motion.div>

            <Motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-6xl text-[clamp(3.8rem,9vw,9rem)] font-black leading-[0.81] tracking-[-0.078em]"
            >
              BEELD DAT<br /><span className="text-[#e7b900]">WERKT.</span>
            </Motion.h1>

          </div>

          <div className="relative left-1/2 mt-14 flex w-[150vw] max-w-[1800px] -translate-x-1/2 items-center justify-center gap-[1.3%] sm:mt-16 sm:w-[92vw] lg:w-[90vw]">
            {heroFrames.map((frame, index) => (
              <Motion.div
                key={frame.alt}
                initial={{ opacity: 0, y: 70, rotate: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative shrink-0 overflow-hidden rounded-xl bg-[#ddd] shadow-[0_18px_45px_rgba(0,0,0,.12)] sm:rounded-2xl ${frame.size}`}
              >
                <img src={frame.image} alt={frame.alt} decoding="async" className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${frame.position}`} />
              </Motion.div>
            ))}
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-3 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-20">
            <Motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 }}
              className="max-w-2xl text-base leading-relaxed text-black/50 sm:text-lg"
            >
              Zakelijke video en fotografie die klanten oplevert, mensen aantrekt en laat zien waar je bedrijf goed in is. Eén maker, van idee tot oplevering.
            </Motion.p>
            <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }} className="mt-7">
              <PillButton href="#contact" yellow>Vertel je idee</PillButton>
            </Motion.div>
          </div>
        </section>

        <section className="bg-white px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-20">
            <Reveal>
              <figure className="group relative min-h-[34rem] h-full overflow-hidden rounded-[2rem] bg-black sm:min-h-[44rem] sm:rounded-[3rem]">
                <img src={behindTheScenes} alt="Behind the scenes tijdens een videoproductie" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <figcaption className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur sm:bottom-8 sm:left-8">Achter de schermen · op locatie</figcaption>
              </figure>
            </Reveal>

            <Reveal className="flex flex-col justify-center" delay={0.08}>
              <p className="section-label !text-black/40">WAAR HET OM DRAAIT</p>
              <h2 className="mt-7 text-[clamp(3.2rem,6vw,6.3rem)] font-black leading-[0.87] tracking-[-0.065em]">Mooi is pas<br />het <span className="text-[#e7b900]">begin.</span></h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/50">Ieder beeld begint bij een zakelijke vraag. Pas als het doel helder is, bepaal ik wat we maken en hoe we het laten werken.</p>

              <div className="mt-12 border-t border-black/15">
                {outcomes.map(([number, title, text]) => (
                  <div key={number} className="group grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5">
                    <span className="pt-1 text-xs font-black tracking-[0.14em] text-[#c59d00]">{number}</span>
                    <div>
                      <h3 className="text-2xl font-black tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1">{title}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-black/45">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="werk" className="bg-white px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="section-label !text-black/40">SELECTIE UIT MIJN WERK</p><h2 className="mt-6 text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.84] tracking-[-0.07em]">ECHT WERK.<br />ECHT IN BEELD.</h2></div><p className="max-w-md text-lg leading-relaxed text-black/50">Van techniek op het dak tot een diner vol mensen. Het onderwerp wisselt. De aandacht voor beeld niet.</p></Reveal>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, index) => {
                const Tag = item.href ? "a" : "article";
                return (
                  <Reveal key={item.title} className={item.className} delay={(index % 3) * 0.06}>
                    <Tag href={item.href} className={`portfolio-card group relative block h-full overflow-hidden rounded-[2rem] bg-[#ddd] sm:rounded-[2.5rem] ${item.height}`}>
                      <img src={item.image} alt={`${item.type} voor ${item.title}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white sm:p-8"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">{item.type}</p><h3 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{item.title}</h3></div><span className="grid size-12 place-items-center rounded-full bg-white text-black"><ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" /></span></div>
                    </Tag>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diensten" className="px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end"><div><p className="section-label !text-black/40">WAT IK MAAK</p><h2 className="mt-6 text-[clamp(3rem,6.5vw,6.5rem)] font-black leading-[0.86] tracking-[-0.065em]">DIT MAAK IK<br />VOOR BEDRIJVEN.</h2></div><p className="max-w-lg justify-self-end text-lg leading-relaxed text-black/50">Je krijgt beeld dat past bij je merk, je klant en de plek waar je het wilt gebruiken.</p></Reveal>
            <div className="grid gap-3 md:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={(index % 2) * 0.06}>
                  <a href={service.href} className="group block h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white transition-transform duration-500 hover:-translate-y-2 sm:rounded-[2.5rem]">
                    <div className="relative h-[18rem] overflow-hidden sm:h-[22rem]">
                      <img src={service.image} alt={`${service.title} door TVM Productions`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15" />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
                        <span className="text-xs font-black uppercase tracking-[0.16em] text-white drop-shadow-md">{service.label}</span>
                        <span className="grid size-11 place-items-center rounded-full bg-white text-black"><ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" /></span>
                      </div>
                    </div>
                    <div className="bg-white p-7 sm:p-10">
                      <h3 className="text-4xl font-black tracking-[-0.045em]">{service.title}</h3>
                      <p className="mt-4 max-w-xl leading-relaxed text-black/50">{service.text}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="over" className="bg-white px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal><div className="relative min-h-[38rem] overflow-hidden rounded-[2rem] bg-black sm:rounded-[2.5rem]"><img src={tygoPortrait} alt="Portret van Tygo Veerman" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" /><span className="absolute bottom-6 left-6 rounded-full bg-[#f5ca3c] px-4 py-2 text-xs font-black">TYGO VEERMAN</span></div></Reveal>
            <Reveal delay={0.08}><div className="flex min-h-[38rem] flex-col justify-between rounded-[2rem] bg-[#f4f3ee] p-7 sm:rounded-[2.5rem] sm:p-10 lg:p-14"><div><p className="section-label !text-black/40">OVER TYGO</p><h2 className="mt-7 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl">Eerst het doel. Dan de camera.</h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-black/50">Ik ben Tygo Veerman. Vanuit Purmerend maak ik video en fotografie voor bedrijven. Ik wil eerst begrijpen wat jouw bedrijf bijzonder maakt. Daarna vertaal ik dat naar beelden die professioneel voelen, zonder dat het gemaakt wordt.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-3">{["Rust op de set", "Goed voorbereid", "Oog voor detail"].map((label) => <div key={label} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-black"><Check className="size-4" />{label}</div>)}</div></div></Reveal>
          </div>
        </section>

        <section id="werkwijze" className="px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end"><div><p className="section-label !text-black/40">ZO WERKT HET</p><h2 className="mt-6 text-[clamp(3rem,6.5vw,6.5rem)] font-black leading-[0.86] tracking-[-0.065em]">VAN VRAAG<br />NAAR BEELD.</h2></div><p className="max-w-md justify-self-end text-lg leading-relaxed text-black/50">Een goed proces voelt niet zwaar. Je weet wat er gebeurt, wanneer jij nodig bent en wanneer alles klaarstaat.</p></Reveal>
            <div className="border-t border-black/15">{steps.map(([number, title, text], index) => <Reveal key={number} delay={index * 0.04}><div className="group grid gap-5 border-b border-black/15 py-8 md:grid-cols-[0.25fr_0.65fr_1.1fr] md:items-center md:py-10"><span className="text-xs font-black tracking-[0.14em] text-black/30">{number}</span><h3 className="text-3xl font-black tracking-[-0.04em] transition-transform group-hover:translate-x-2 sm:text-4xl">{title}</h3><p className="max-w-xl leading-relaxed text-black/50">{text}</p></div></Reveal>)}</div>
          </div>
        </section>

        <Testimonials />

        <section className="bg-white px-3 py-24 sm:px-6 sm:py-32">
          <FAQSchema items={faqs} />
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="section-label !text-black/40">KORT ANTWOORD</p><h2 className="mt-6 text-5xl font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl">GOEDE<br />VRAGEN.</h2></div>
              <div className="min-h-[32rem] border-t border-black/15">
                {faqs.map(([q, a], index) => {
                  const isOpen = openFaq === index;
                  return (
                    <Motion.div key={q} layout className="border-b border-black/15">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} className="group flex w-full items-center justify-between gap-5 py-6 text-left" aria-expanded={isOpen}>
                        <span className="text-xl font-black tracking-[-0.025em] sm:text-2xl">{q}</span>
                        <Motion.span animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? "#f5ca3c" : "rgba(255,255,255,0)" }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} className="grid size-11 shrink-0 place-items-center rounded-full border border-black/15">
                          <ChevronDown className="size-4" />
                        </Motion.span>
                      </button>
                      <Motion.div
                        initial={false}
                        animate={{ height: isOpen ? 128 : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.12 } }}
                        className="overflow-hidden"
                        aria-hidden={!isOpen}
                      >
                        <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-black/50">{a}</p>
                      </Motion.div>
                    </Motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="bg-white px-3 pb-3 sm:px-6 sm:pb-6">
          <Reveal className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#f5ca3c] sm:rounded-[3rem]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative min-h-[28rem] overflow-hidden bg-black lg:min-h-[42rem]">
                <img src={tygoCamera} alt="Tygo Veerman tijdens een videoproductie" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[center_38%] transition-transform duration-700 hover:scale-[1.025]" />
              </div>
              <div className="flex min-h-[38rem] flex-col justify-between p-7 sm:p-12 lg:min-h-[42rem] lg:p-16">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]"><span className="size-2 rounded-full bg-black" /> Meestal binnen één werkdag reactie</div>
                  <h2 className="mt-10 max-w-4xl text-[clamp(3.2rem,6.5vw,7rem)] font-black leading-[0.84] tracking-[-0.07em]">VERTEL ME WAT JE WILT MAKEN.</h2>
                  <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">Een eerste idee is genoeg. Vertel me wat je wilt bereiken, dan denk ik mee over wat daarvoor nodig is.</p>
                  <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <PillButton href="/contact/">Vertel je idee</PillButton>
                    <a href="mailto:info@tvmproductions.nl" className="inline-flex min-h-14 items-center gap-3 px-3 text-sm font-black"><Mail className="size-4" /> info@tvmproductions.nl</a>
                  </div>
                </div>
                <div className="mt-12 flex flex-col gap-4 border-t border-black/15 pt-7 text-sm font-bold sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2"><MapPin className="size-4" /> Purmerend · Noord-Holland</span><span>Video · Fotografie · Content</span></div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer elevated />
      <StickyCta />
    </div>
  );
}
