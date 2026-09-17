// Trustbar direct onder de hero-video: links de tekst, rechts de doorlopende
// logoband.
//
// De logo's verschillen sterk van vorm — Dinner in the Sky is vijf keer zo
// breed als hoog, CoffeeClick en Huawei zijn vierkant. Op één vaste hoogte
// zetten werkt daarom niet: een vierkant logo oogt dan twee keer zo groot als
// een liggend logo. Elk logo krijgt hieronder een eigen hoogte, gekozen op
// optisch gewicht in plaats van op pixels, zodat de rij rustig oogt.
//
// Nieuw logo toevoegen: bestand in src/assets/logos/, hier importeren en met
// een `h` erbij in de lijst zetten (liggend ±40, vierkant ±68).

import babygroentetas from "../assets/logos/babygroentetas.png";
import b2Restauratie from "../assets/logos/b2-restauratie.png";
import coffeeclick from "../assets/logos/coffeeclick.png";
import deGraaf from "../assets/logos/de-graaf.png";
import dinnerInTheSky from "../assets/logos/dinner-in-the-sky.png";
import huawei from "../assets/logos/huawei.png";
import keesTol from "../assets/logos/kees-tol.png";
import kvzAfbouw from "../assets/logos/kvz-afbouw.png";
import printenbind from "../assets/logos/printenbind.png";
import rienDeWolf from "../assets/logos/rien-de-wolf.png";
import vanBaarsen from "../assets/logos/van-baarsen-vastgoed.png";
import vanWijngaarden from "../assets/logos/van-wijngaarden-zaanse.png";
import verandaVolendam from "../assets/logos/veranda-volendam.png";

const CLIENTS = [
  { name: "Van Baarsen Vastgoed", logo: vanBaarsen, h: 66 },
  { name: "Kees Tol Verf & Behang", logo: keesTol, h: 49 },
  { name: "KVZ Afbouw", logo: kvzAfbouw, h: 61 },
  { name: "Veranda Volendam", logo: verandaVolendam, h: 51 },
  { name: "CoffeeClick", logo: coffeeclick, h: 68 },
  { name: "Van Wijngaarden's Zaanse", logo: vanWijngaarden, h: 61 },
  { name: "Rien de Wolf", logo: rienDeWolf, h: 48 },
  { name: "Dinner in the Sky", logo: dinnerInTheSky, h: 37 },
  { name: "Huawei", logo: huawei, h: 66 },
  { name: "B2 Restauratie", logo: b2Restauratie, h: 61 },
  { name: "De Graaf", logo: deGraaf, h: 68 },
  { name: "Babygroentetas", logo: babygroentetas, h: 44 },
  { name: "Printenbind", logo: printenbind, h: 44 },
];

function Logos() {
  return (
    <div className="flex items-center">
      {CLIENTS.map((client) => (
        <span key={client.name} className="flex shrink-0 items-center px-8 sm:px-11">
          <img
            src={client.logo}
            alt={client.name}
            // Bewust niet lazy: de tweede helft van de band staat buiten beeld
            // en zou dan pas later laden. De twee helften zijn dan even lang
            // niet gelijk in breedte, en precies daarop draait de naadloze lus.
            loading="eager"
            decoding="async"
            style={{ height: `${client.h}px` }}
            className="w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </span>
      ))}
    </div>
  );
}

export default function TrustBar() {
  return (
    <section aria-labelledby="klanten-kop" className="overflow-hidden pb-10 pt-7 sm:pb-12 sm:pt-8">
      {/* Exact dezelfde opbouw als de hero-inhoud: buitenmarge van de sectie,
          daarbinnen dezelfde begrensde kolom met dezelfde binnenmarge. Daardoor
          staat de linkerlijn op elke schermbreedte gelijk aan die van de kop,
          zonder marges tegen elkaar weg te hoeven rekenen. Verander je hier de
          maten, verander ze dan ook in de hero. */}
      <div className="px-3 sm:px-5">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-2.5 sm:px-3.5 lg:flex-row lg:items-center lg:gap-10">
          <h2 id="klanten-kop" className="shrink-0 text-[0.95rem] font-extrabold uppercase leading-snug tracking-[0.15em] text-black/45 sm:text-[1.05rem] lg:max-w-[12rem]">
            Eerder gewerkt voor
          </h2>

          {/* min-w-0 is nodig: zonder die regel weigert een flex-kind te krimpen
              onder zijn inhoud en duwt de band de tekst van het scherm. */}
          <div className="marquee relative min-w-0 flex-1 overflow-hidden">
            {/* Twee identieke helften; de baan schuift over precies de helft van
                zijn eigen breedte, dus de herhaling is onzichtbaar. De tweede is
                voor schermlezers verborgen, anders staat elke klant er dubbel in. */}
            <div className="marquee-track">
              <Logos />
              <div aria-hidden="true">
                <Logos />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
