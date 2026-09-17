import { useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { titleProps } from "../site/typography.js";
import { videoUrl } from "../site/media.js";
import ArrowSwap from "../site/ArrowSwap.jsx";
import SubpageHero from "../site/SubpageHero.jsx";
import posterKlanten from "../assets/portfolio/routes/klanten-poster.jpg";
import posterMedewerkers from "../assets/portfolio/routes/medewerkers-poster.jpg";
import productieBreed from "../assets/portfolio/hero/productie-breed.jpg";

// De pagina achter "Hoe ik help".
//
// Bewust géén dienstenpagina: iemand komt hier met één vraag — "kan Tygo helpen
// met het probleem dat wij hebben?" De opbouw volgt die vraag: eerst de twee
// problemen, dan ruimte voor wat daar niet in past, dan pas welke vormen er
// bestaan. Videoformats staan onderaan en klein, want het middel volgt het doel.

const PROBLEMEN = [
  {
    nummer: "01",
    anker: "klanten",
    titel: "Meer klanten overtuigen",
    kern: "Je weet wat jouw bedrijf goed maakt. Een potentiële klant ziet dat niet automatisch.",
    tekst: "Ik help je expertise, resultaten en manier van werken zichtbaar te maken, zodat potentiële klanten sneller begrijpen waarom ze juist met jou moeten werken.",
    vormen: ["Klantcases", "Projectcases", "Expertcontent", "Bedrijfscontent", "Social content"],
    belofte: "Laat zien waarom jouw bedrijf de juiste keuze is.",
    video: videoUrl("/videos/routes/klanten.mp4"),
    poster: posterKlanten,
    // Slug uit caseData; blijft leeg als er nog geen passende case is.
    case: "24wines",
  },
  {
    nummer: "02",
    anker: "medewerkers",
    titel: "De juiste medewerkers aantrekken",
    kern: "Een vacature vertelt wat iemand gaat doen. Goede recruitmentcontent laat zien waarom iemand het bij jóú zou willen doen.",
    tekst: "Ik breng het echte werk, collega's en de cultuur in beeld zodat kandidaten al vóór hun sollicitatie een gevoel krijgen bij je bedrijf.",
    vormen: ["Recruitmentfilm", "Werken-bij-content", "Medewerkerverhalen", "Social ads", "Fotografie"],
    belofte: "Laat zien waarom mensen bij jouw bedrijf willen werken.",
    video: videoUrl("/videos/routes/medewerkers.mp4"),
    poster: posterMedewerkers,
    // TODO: zodra de Putrenovatie-case bestaat, hier de slug invullen. Tot die
    // tijd staat dit blok bewust zonder beeld — liever geen bewijs dan bewijs
    // dat over iets anders gaat.
    case: null,
  },
];

const DENKSTAPPEN = [
  ["Doel", "Wat moet er veranderen?"],
  ["Doelgroep", "Wie moet je bereiken?"],
  ["Boodschap", "Wat moeten zij zien, begrijpen of geloven?"],
  ["Content", "Welke content is daarvoor nodig?"],
  ["Productie", "Dan pas komt de camera."],
];

// Bewijs, gekoppeld aan het probleem dat het oplost — niet als portfolio-grid.
// `label` is de route, `slug` verwijst naar caseData.
const BEWIJS = [
  { label: "Klanten overtuigen", slug: "24wines", regel: "Laten zien wat er achter een online bestelling schuilgaat, zodat een webshop niet langer anoniem voelt." },
  { label: "Klanten overtuigen", slug: "sunforce", regel: "Vakmanschap dat op locatie gebeurt en voor klanten onzichtbaar bleef, alsnog in beeld gebracht." },
];

const CONTENTVORMEN = [
  "Klantcases", "Projectvideo's", "Recruitmentcontent", "Social content",
  "Bedrijfsfilms", "Fotografie", "Uitlegvideo's",
];

function Reveal({ children, className = "", delay = 0, id }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.div
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}

function Knop({ href, children }) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-h-12 shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap rounded-full bg-[#f5ca3c] py-1 pl-6 pr-1 text-base font-bold leading-none text-[#0F0E0B] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1"
    >
      <span className="absolute -inset-px origin-left scale-x-0 bg-[#ffda58] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" aria-hidden="true" />
      <span className="relative">{children}</span>
      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0F0E0B] text-[#F3F0EA] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
        <ArrowSwap />
      </span>
    </a>
  );
}

function Kader({ children, className = "" }) {
  return <div className={`mx-auto max-w-[1750px] px-2.5 sm:px-3.5 ${className}`}>{children}</div>;
}

// De twee routes als beeldvlakken, binnen dezelfde kolom als de rest van de site.
//
// De compositie is één geheel in plaats van een tekstblok met daaronder twee
// banners: de intro staat links en beslaat zeven van de twaalf kolommen, en het
// rechterpaneel begint op dezelfde regel als de kop. Daardoor loopt de fotografie
// omhoog tot náást de headline en vult het de leegte die daar anders valt.
// Op mobiel vervalt dat raster en staat alles gewoon onder elkaar: kop, route 01,
// route 02.
function RoutePaneel({ route, className = "" }) {
  const reduceMotion = useReducedMotion();
  const [actief, setActief] = useState(false);

  return (
    <a
      href={`#${route.anker}`}
      onMouseEnter={() => setActief(true)}
      onMouseLeave={() => setActief(false)}
      onFocus={() => setActief(true)}
      onBlur={() => setActief(false)}
      className={`group relative isolate flex flex-col justify-end overflow-hidden p-7 text-[#F3F0EA] sm:p-9 lg:p-11 ${className}`}
    >
      <img src={route.poster} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      {!reduceMotion && (
        <video
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${actief ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="none"
          poster={route.poster}
          aria-hidden="true"
          tabIndex={-1}
          ref={(el) => {
            if (!el) return;
            if (actief) el.play().catch(() => {});
            else el.pause();
          }}
        >
          <source src={route.video} type="video/mp4" />
        </video>
      )}
      {/* Vlakke verdonkering voor leesbaarheid, geen verloop. Hij wordt lichter
          zodra je erop staat, zodat het beeld naar voren komt. */}
      <div
        className={`absolute inset-0 -z-10 bg-[#0F0E0B] transition-opacity duration-700 ${actief ? "opacity-40" : "opacity-[0.58]"}`}
        aria-hidden="true"
      />

      <span className="text-sm font-black tracking-[0.16em] text-[#f5ca3c]">{route.nummer}</span>
      <h2 {...titleProps(route.titel, "section", "mt-4 text-[#F3F0EA]")}>{route.titel}</h2>
      <p className="mt-4 max-w-sm text-lg leading-relaxed text-[#F3F0EA]/70">{route.belofte}</p>

      <span className="mt-7 flex items-center gap-3 text-base font-bold">
        <span className="border-b border-[#F3F0EA]/40 pb-1 transition-colors duration-300 group-hover:border-[#f5ca3c]">
          Bekijk hoe ik daarbij help
        </span>
        <ArrowRight
          className="size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5"
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

export default function HoeIkHelp({ cases = {} }) {
  return (
    <>
      <SubpageHero
        variant="split"
        eyebrow="Hoe ik help"
        headline={["Zichtbaar maken waarom klanten", "en medewerkers voor jou kiezen."]}
        description="Ik begin bij wat er moet veranderen in je bedrijf, niet bij de vraag welke video je wilt. Vanuit dat doel bepaal ik wat er nodig is."
        image={productieBreed}
        imageAlt="Opname op locatie tijdens een productie"
        breadcrumbs={[{ label: "Hoe ik help", href: "/hoe-ik-help/" }]}
      />

      {/* Eerste contentsectie: de keuze. De twee panelen zijn de ingang; de
          uitwerking per route staat in de sectie daaronder, waar ze naartoe
          linken. */}
      <section className="px-3 pb-24 sm:px-5 sm:pb-32">
        <Kader>
          <Reveal className="max-w-2xl">
            <h2 {...titleProps("Waar loop je tegenaan?", "section")}>Waar loop je tegenaan?</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/50">
              Kies waar het bij jou schuurt. Vanuit die uitdaging bepaal ik welke content nodig is.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:mt-14 md:grid-cols-2 md:gap-4">
            {PROBLEMEN.map((route) => (
              <RoutePaneel key={route.nummer} route={route} className="min-h-[26rem] lg:min-h-[32rem]" />
            ))}
          </div>
        </Kader>
      </section>

      {/* 2. De twee hoofdproblemen. De belangrijkste sectie van de pagina:
             probleem → oplossing → bewijs, per route. */}
      <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <div className="grid gap-20 lg:gap-28">
            {PROBLEMEN.map((probleem, index) => {
              const bewijs = probleem.case ? cases[probleem.case] : null;
              return (
                <Reveal key={probleem.nummer} delay={index * 0.05} className="scroll-mt-32" id={probleem.anker}>
                  <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
                    <div>
                      <p className="eyebrow text-[#9c7900]">{probleem.nummer}</p>
                      <h2 {...titleProps(probleem.titel, "section", "mt-5")}>{probleem.titel}</h2>

                      <p className="mt-8 text-[clamp(1.3rem,1.6vw,1.9rem)] font-bold leading-[1.35] tracking-[-0.015em] text-black/85">
                        {probleem.kern}
                      </p>
                      <p className="mt-6 t-body text-black/55">{probleem.tekst}</p>

                      <div className="mt-10 border-t border-black/15 pt-7">
                        <p className="eyebrow text-black/35">Dit kan betekenen</p>
                        <ul className="mt-5 flex flex-wrap gap-2.5">
                          {probleem.vormen.map((vorm) => (
                            <li
                              key={vorm}
                              className="rounded-full border border-black/10 bg-[#f4f3ee] px-4 py-2 text-[0.9375rem] font-semibold text-black/60"
                            >
                              {vorm}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bewijs direct naast het probleem. Staat er nog geen passende
                        case, dan blijft deze kolom leeg in plaats van gevuld met
                        een case die over iets anders gaat. */}
                    {bewijs && (
                      <a href={`/cases/${probleem.case}/`} className="group block lg:pt-14">
                        <div className="relative min-h-[22rem] overflow-hidden rounded-[20px] bg-black lg:min-h-[26rem]">
                          <img
                            src={bewijs.image}
                            alt={`${bewijs.title} — ${bewijs.type}`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                          />
                        </div>
                        <p className="mt-5 eyebrow text-black/35">{bewijs.type}</p>
                        <p className="mt-2 flex items-center gap-3 text-xl font-bold">
                          {bewijs.title}
                          <ArrowRight className="size-4 text-[#b78d00] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                        </p>
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Kader>
      </section>

      {/* Van probleem naar oplossing. Stond even in de hero, maar daar maakte
          het samen met de routes te veel tegelijk. Als eigen sectie krijgt het
          rust en kan het blijven wat het is: hoe ik denk, niet hoe een draaidag
          loopt — dat laatste staat op /werkwijze/. */}
      <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-black/45">Van doel naar productie</p>
            <h2 {...titleProps("Zo kom ik tot een voorstel.", "section", "mt-6")}>Zo kom ik tot een voorstel.</h2>
          </Reveal>

          <Reveal className="relative mt-14 sm:mt-16">
            <span className="absolute inset-x-0 top-[5px] h-px bg-black/15" aria-hidden="true" />
            <ol className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
              {DENKSTAPPEN.map(([stap, vraag], i) => {
                const laatste = i === DENKSTAPPEN.length - 1;
                return (
                  <li key={stap} className="relative pt-8">
                    <span
                      className={`absolute left-0 top-0 rounded-full ${laatste ? "size-3 bg-[#f5ca3c] ring-4 ring-[#f5ca3c]/20" : "size-2.5 bg-black/25"}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm font-black tracking-[0.12em] ${laatste ? "text-[#9c7900]" : "text-black/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2.5 text-xl font-extrabold tracking-[-0.015em]">{stap}</h3>
                    <p className="mt-2 text-base leading-relaxed text-black/60">{vraag}</p>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </Kader>
      </section>

      {/* 3. Ruimte voor wat niet in die twee vakjes past. Marketing scherp, maar
             geen opdrachten afwijzen die er prima bij passen. */}
      <section className="px-3 py-24 sm:px-5 sm:py-28">
        <Kader>
          <Reveal className="max-w-3xl border-t border-black/15 pt-14">
            <h2 {...titleProps("Speelt er iets anders?", "section")}>Speelt er iets anders?</h2>
            <p className="mt-7 t-body text-black/55">
              Niet ieder zakelijk probleem past netjes in één van deze twee vakjes. Misschien wil je een complexe dienst begrijpelijk uitleggen, terugkerende communicatie slimmer aanpakken of een belangrijk project professioneel vastleggen.
            </p>
            <p className="mt-6 t-body text-black/55">
              Vertel me wat er speelt. Dan kijk ik of content daarbij kan helpen.
            </p>
          </Reveal>
        </Kader>
      </section>

      {/* 4. De drempel wegnemen: de klant hoeft de videoproducten niet te kennen. */}
      <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <Reveal className="max-w-4xl">
            <h2 {...titleProps("Je hoeft niet te weten welke video je nodig hebt.", "section")}>
              Je hoeft niet te weten welke video je{" "}
              <span className="text-[#e7b900]">nodig hebt.</span>
            </h2>
            <p className="mt-8 t-body text-black/55">
              Misschien denk je aan een bedrijfsfilm terwijl drie sterke klantcases veel effectiever zijn. Of wil je één recruitmentvideo, terwijl een serie korte video&apos;s beter aansluit op waar kandidaten je tegenkomen.
            </p>
            <p className="mt-6 t-body text-black/55">
              Daarom begin ik liever bij het doel dan bij het format.
            </p>
          </Reveal>
        </Kader>
      </section>

      {/* 6. Bewijs, gekoppeld aan het probleem dat het oplost. */}
      {BEWIJS.some((item) => cases[item.slug]) && (
        <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
          <Kader>
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-black/40">Bewijs</p>
              <h2 {...titleProps("Hoe dat er in de praktijk uitziet.", "section", "mt-6")}>
                Hoe dat er in de praktijk uitziet.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-4 lg:grid-cols-2">
              {BEWIJS.filter((item) => cases[item.slug]).map((item, index) => {
                const c = cases[item.slug];
                return (
                  <Reveal key={item.slug} delay={index * 0.06}>
                    <a
                      href={`/cases/${item.slug}/`}
                      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-[#f4f3ee] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#efece4] sm:p-6"
                    >
                      <div className="relative min-h-[18rem] overflow-hidden rounded-[16px] bg-black">
                        <img
                          src={c.image}
                          alt={`${c.title} — ${c.type}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-[#F3F0EA]/95 px-4 py-2 eyebrow text-[#0F0E0B] backdrop-blur">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-2 pt-7 sm:p-3 sm:pt-8">
                        <h3 {...titleProps(c.title, "card")}>{c.title}</h3>
                        <p className="mt-4 t-body text-black/55">{item.regel}</p>
                        <span className="mt-7 inline-flex items-center gap-3 text-lg font-bold">
                          Bekijk case
                          <span className="flex size-9 items-center justify-center rounded-full bg-[#f5ca3c] text-[#0F0E0B] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                            <ArrowRight className="size-4" strokeWidth={2.5} />
                          </span>
                        </span>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </Kader>
        </section>
      )}

      {/* 7. Contentvormen. Pas hier, en klein: ondersteunende informatie, geen
             positionering. */}
      <section className="px-3 py-20 sm:px-5 sm:py-24">
        <Kader>
          <Reveal className="border-t border-black/15 pt-12">
            <p className="eyebrow text-black/40">Het middel volgt het doel</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/50">
              Afhankelijk van de uitdaging kan dat bijvoorbeeld bestaan uit:
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2.5">
              {CONTENTVORMEN.map((vorm) => (
                <li key={vorm} className="text-lg font-semibold text-black/45">
                  {vorm}
                  <span className="ml-3 text-black/20" aria-hidden="true">·</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Kader>
      </section>

      {/* 8. Afsluiting: de boodschap van de pagina nog één keer, scherper. */}
      <section className="px-3 pb-5 sm:px-5">
        <Kader>
          <Reveal className="relative isolate overflow-hidden rounded-[24px] bg-[#0F0E0B] px-6 py-24 text-center text-[#F3F0EA] sm:px-12 sm:py-28">
            <h2 {...titleProps("Vertel me niet welke video je nodig hebt.", "section", "mx-auto")}>
              Vertel me niet welke video je nodig hebt.
            </h2>
            <p className="mx-auto mt-6 text-[clamp(1.3rem,1.6vw,1.9rem)] font-bold leading-[1.35] text-[#f5ca3c]">
              Vertel me wat je wilt veranderen.
            </p>
            <p className="mx-auto mt-7 t-body text-[#F3F0EA]/70">
              Dan kijk ik met je mee naar wat daarvoor nodig is.
            </p>
            <div className="mt-10 flex justify-center">
              <Knop href="/contact/">Bespreek je uitdaging</Knop>
            </div>
          </Reveal>
        </Kader>
      </section>
    </>
  );
}
