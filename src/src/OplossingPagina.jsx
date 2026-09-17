import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { titleProps } from "../site/typography.js";
import SubpageHero from "../site/SubpageHero.jsx";
import ArrowSwap from "../site/ArrowSwap.jsx";
import { vervolgstappen } from "../site/oplossingen.js";

// Eén component voor alle drie de oplossingspagina's. De opbouw is per pagina
// gelijk — probleem, oplossing, bewijs, vervolgstap — zodat iemand die er twee
// bekijkt niet opnieuw hoeft te zoeken waar wat staat.
//
// `cases` komt binnen als caseData, zodat titel, type, beeld en resultaat uit
// één bron komen en niet apart bijgehouden hoeven te worden.

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.div
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

function Kader({ children, className = "" }) {
  return <div className={`mx-auto max-w-[1750px] px-2.5 sm:px-3.5 ${className}`}>{children}</div>;
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

export default function OplossingPagina({ data, slug, cases = {} }) {
  const beeld = cases[data.beeld];
  const bewijs = data.cases.map((s) => ({ slug: s, ...cases[s] })).filter((c) => c.title);

  return (
    <>
      <SubpageHero
        variant="split"
        eyebrow={data.eyebrow}
        headline={data.headline}
        description={data.description}
        image={beeld?.image}
        imageAlt={beeld ? `${beeld.title} — ${beeld.type}` : ""}
        breadcrumbs={[
          { label: "Oplossingen", href: "/oplossingen/zichtbaar-worden/" },
          { label: data.eyebrow, href: `/oplossingen/${slug}/` },
        ]}
      />

      {/* 1. Het probleem, zoals de bezoeker het zelf ervaart. */}
      <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-black/45">{data.probleem.kop}</p>
            <h2 className="mt-6 text-[clamp(1.3rem,1.6vw,1.9rem)] font-bold leading-[1.35] tracking-[-0.015em] text-black/85">
              {data.probleem.inleiding}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-black/15 pt-12 sm:mt-16 lg:grid-cols-3">
            {data.probleem.punten.map(([kop, tekst], i) => (
              <Reveal key={kop} delay={i * 0.06}>
                <h3 className="text-xl font-extrabold tracking-[-0.015em]">{kop}</h3>
                <p className="mt-3 text-base leading-relaxed text-black/60">{tekst}</p>
              </Reveal>
            ))}
          </div>
        </Kader>
      </section>

      {/* 2. Wat ik ervoor doe. */}
      <section className="px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-black/45">{data.oplossing.kop}</p>
            <h2 className="mt-6 t-body font-semibold text-black/80">{data.oplossing.inleiding}</h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2">
            {data.oplossing.items.map(([kop, tekst, href], i) => (
              <Reveal key={kop} delay={(i % 2) * 0.06}>
                <a
                  href={href}
                  className="group flex h-full items-start justify-between gap-6 rounded-[20px] border border-black/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 sm:p-8"
                >
                  <span>
                    <span className="block text-xl font-extrabold tracking-[-0.015em]">{kop}</span>
                    <span className="mt-3 block max-w-md text-base leading-relaxed text-black/60">{tekst}</span>
                  </span>
                  <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-[#f4f3ee] text-[#0F0E0B] transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
                    <ArrowUpRight className="size-5" strokeWidth={2.25} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Kader>
      </section>

      {/* 3. Bewijs: cases waar dit gewerkt heeft. */}
      {bewijs.length > 0 && (
        <section className="bg-white px-3 py-24 sm:px-5 sm:py-32">
          <Kader>
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-black/45">Zo werkte dat in de praktijk</p>
              <h2 {...titleProps("Cases waar dit het verschil maakte.", "section", "mt-6")}>
                Cases waar dit het verschil maakte.
              </h2>
            </Reveal>

            <div className={`mt-14 grid gap-4 sm:mt-16 ${bewijs.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {bewijs.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <a
                    href={`/cases/${c.slug}/`}
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
                        {c.type}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-2 pt-7 sm:p-3 sm:pt-8">
                      <h3 {...titleProps(c.title, "card")}>{c.title}</h3>
                      {c.result && (
                        <div className="mt-5 border-l-[3px] border-[#f5ca3c] pl-5">
                          <p className="eyebrow text-[#9c7900]">Resultaat</p>
                          <p className="mt-2 text-lg font-bold leading-[1.4] text-black/85">{c.result}</p>
                        </div>
                      )}
                      <span className="mt-7 inline-flex items-center gap-3 text-lg font-bold">
                        Bekijk case
                        <ArrowRight className="size-4 text-[#b78d00] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </Kader>
        </section>
      )}

      {/* 4. De vervolgstap. */}
      <section className="px-3 py-24 sm:px-5 sm:py-32">
        <Kader>
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-black/45">Hoe we verder gaan</p>
            <h2 {...titleProps("Van hier naar iets dat werkt.", "section", "mt-6")}>
              Van hier naar iets dat werkt.
            </h2>
          </Reveal>

          <Reveal className="relative mt-14 sm:mt-16">
            <span className="absolute inset-x-0 top-[5px] h-px bg-black/15" aria-hidden="true" />
            <ol className="grid gap-x-6 gap-y-9 sm:grid-cols-3 lg:gap-x-4">
              {vervolgstappen.map(([stap, uitleg], i) => (
                <li key={stap} className="relative pt-8">
                  <span
                    className={`absolute left-0 top-0 rounded-full ${i === vervolgstappen.length - 1 ? "size-3 bg-[#f5ca3c] ring-4 ring-[#f5ca3c]/20" : "size-2.5 bg-black/25"}`}
                    aria-hidden="true"
                  />
                  <span className={`text-sm font-black tracking-[0.12em] ${i === vervolgstappen.length - 1 ? "text-[#9c7900]" : "text-black/40"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-xl font-extrabold tracking-[-0.015em]">{stap}</h3>
                  <p className="mt-2 text-base leading-relaxed text-black/60">{uitleg}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-14 flex flex-col items-start gap-6 border-t border-black/15 pt-12 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[clamp(1.2rem,1.4vw,1.6rem)] font-bold leading-[1.4] tracking-[-0.015em] text-black/85">
              Vertel me waar je tegenaan loopt. Ik denk met je mee over wat daarvoor nodig is.
            </p>
            <Knop href="/contact/">Bespreek je uitdaging</Knop>
          </Reveal>
        </Kader>
      </section>
    </>
  );
}
