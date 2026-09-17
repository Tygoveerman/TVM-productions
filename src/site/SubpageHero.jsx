import { motion as Motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs.jsx";

// Herbruikbare hero voor de binnenpagina's: Hoe ik help, Cases, Mijn aanpak en
// Over mij. Rustige split — sterke tekst links, één beeld rechts — zodat die
// pagina's onderling herkenbaar blijven en zich onderscheiden van de homepage,
// die wél een schermvullende video heeft.
//
// De kop komt als array van regels binnen. Elke regel is een eigen blok in de
// h1, zodat de afbreking een ontwerpkeuze is en niet afhangt van de kolombreedte.
//
// Props:
//   eyebrow      klein bovenkopje
//   headline     array met regels, bijv. ["Eerste regel.", "Tweede regel."]
//   description  introtekst
//   image / imageAlt  beeld voor de rechterkolom
//   aside        optioneel; vervangt het beeld in de rechterkolom door eigen inhoud
//   strip        optioneel; band over de volle breedte onderaan de hero, bedoeld
//                voor een horizontale tijdlijn of soortgelijke reeks
//   media        optioneel; { video, poster } voor een klein lopend beeld in de
//                rechterkolom in plaats van een stilstaande foto
//   tone         "licht" (standaard) of "navy" — donkerblauw vlak met lichte tekst
//   action       optioneel; een knop of link onder de tekst
//   breadcrumbs  optioneel; pad ná Home, bijv. [{ label, href }]
//   variant      "redactioneel" (kop over de volle breedte, daaronder tekst en
//                beeld naast elkaar), "split" (tekst links, beeld rechts) of
//                "beeld" (breed beeldvlak met de tekst erop). Wissel met één woord.

export default function SubpageHero({
  eyebrow,
  headline,
  description,
  image,
  imageAlt = "",
  aside,
  strip,
  media,
  action,
  breadcrumbs,
  variant = "redactioneel",
  tone = "licht",
}) {
  const reduceMotion = useReducedMotion();
  const volledigeKop = headline.join(" ");
  const heeftRechterkolom = Boolean(media || aside || image);
  // Navy als eigen blok bovenaan de pagina; de secties eronder blijven crème,
  // waardoor de hero zich duidelijk afscheidt zonder een tweede huisstijl te worden.
  const navy = tone === "navy";

  const Kop = ({ licht = false }) => (
    <h1
      className={`text-[clamp(2rem,2.4vw,2.85rem)] font-black leading-[1.12] tracking-[-0.03em] ${licht ? "text-[#F3F0EA]" : "text-black"}`}
      aria-label={volledigeKop}
    >
      {headline.map((regel) => (
        <span key={regel} className="block">
          {regel}
        </span>
      ))}
    </h1>
  );

  if (variant === "redactioneel") {
    return (
      <section className={`relative isolate px-3 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-36 ${navy ? "bg-[#101E33] text-[#F3F0EA]" : ""}`}>
        {navy ? <div className="hero-grain absolute inset-0 -z-10" aria-hidden="true" /> : null}
        <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
          {breadcrumbs ? (
            <div className="mb-14 sm:mb-16">
              <Breadcrumbs items={breadcrumbs} licht={navy} />
            </div>
          ) : null}

          {/* De kop loopt over de volle breedte, als kop van een artikel. Daaronder
              een lijn, en pas dan de uitleg en het beeld naast elkaar. Zo is de
              typografie het hoofdelement en is de foto ondersteunend — precies
              andersom als bij een beeldbanner. */}
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`flex items-center gap-3 eyebrow ${navy ? "text-[#F3F0EA]/55" : "text-black/55"}`}>
              <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
              {eyebrow}
            </p>

            <h1
              className={`mt-8 -ml-[0.04em] text-[clamp(1.9rem,3.2vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] ${navy ? "text-[#F3F0EA]" : "text-black"}`}
              aria-label={volledigeKop}
            >
              {headline.map((regel) => (
                <span key={regel} className="block">
                  {regel}
                </span>
              ))}
            </h1>
          </Motion.div>

          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 lg:mt-14"
          >
            <div className={`border-t pb-12 lg:pb-14 ${navy ? "border-[#F3F0EA]/20" : "border-black/15"}`} />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className={heeftRechterkolom ? "lg:col-span-6" : "lg:col-span-8"}>
              <p className={`text-lg leading-relaxed sm:text-xl ${navy ? "text-[#F3F0EA]/70" : "text-black/70"}`}>{description}</p>
              {action ? <div className="mt-9">{action}</div> : null}
            </div>

            {/* Rechts: klein lopend beeld, eigen inhoud of een foto — in die
                volgorde. Klein gehouden; het is sfeer en kleur, geen hoofdrol. */}
            {heeftRechterkolom ? (
              <div className="lg:col-span-5 lg:col-start-8">
                {media ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-[#15130f]">
                  <img src={media.poster} alt={imageAlt} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  {!reduceMotion && (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={media.poster}
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <source src={media.video} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : (
                aside ?? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-[#15130f]">
                    <img
                      src={image}
                      alt={imageAlt}
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    </div>
                  )
                )}
              </div>
            ) : null}
            </div>
          </Motion.div>

          {strip ? (
            <Motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-11 sm:mt-12"
            >
              {strip}
            </Motion.div>
          ) : null}
        </div>
      </section>
    );
  }

  if (variant === "beeld") {
    return (
      <section className="px-3 pb-8 pt-24 sm:px-5 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
          {breadcrumbs ? (
            <div className="mb-6 sm:mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          ) : null}

          {/* Eén beeld, en verder alleen wat gezegd moet worden. De rust zit in
              wat er níét staat: geen tijdlijn, geen labels, geen tweede knop.
              Een vlakke verdonkering in plaats van een verloop, zodat het beeld
              zijn eigen contrast houdt. */}
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate flex min-h-[50svh] items-end overflow-hidden rounded-[20px] bg-[#15130f] sm:min-h-[54svh] sm:rounded-[24px]"
          >
            {media ? (
              <>
                <img src={media.poster} alt={imageAlt} decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                {!reduceMotion && (
                  <video
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={media.poster}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <source src={media.video} type="video/mp4" />
                  </video>
                )}
              </>
            ) : (
              <img
                src={image}
                alt={imageAlt}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 -z-10 bg-[#0F0E0B]/55" aria-hidden="true" />

            <div className="w-full p-8 sm:p-10 lg:p-12">
              <p className="flex items-center gap-3 eyebrow text-[#F3F0EA]/55">
                <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
                {eyebrow}
              </p>

              <h1
                className="mt-7 -ml-[0.04em] max-w-4xl text-[clamp(1.9rem,3.2vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#F3F0EA]"
                aria-label={volledigeKop}
              >
                {headline.map((regel) => (
                  <span key={regel} className="block">
                    {regel}
                  </span>
                ))}
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#F3F0EA]/70 sm:text-xl">{description}</p>

              {action ? <div className="mt-10">{action}</div> : null}
            </div>
          </Motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 pb-16 pt-32 sm:px-5 sm:pb-20 sm:pt-40">
      <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
        {breadcrumbs ? (
          <div className="mb-12 sm:mb-14">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}

        {/* Tekst krijgt iets meer breedte dan het beeld: bij een gelijke verdeling
            met een staand beeld ging de foto de compositie domineren. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 xl:gap-20">
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-3 eyebrow text-black/55">
              <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
              {eyebrow}
            </p>

            <div className="mt-7">
              <Kop />
            </div>

            <p className="mt-8 t-body text-black/70">{description}</p>

            {action ? <div className="mt-10">{action}</div> : null}
          </Motion.div>

          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#15130f] lg:aspect-[5/4]"
          >
            <img
              src={image}
              alt={imageAlt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
