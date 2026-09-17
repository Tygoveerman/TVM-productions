import { ArrowRight, ArrowUp } from "lucide-react";
import tvmLogo from "../assets/brand/tvm-logo-source.png";
import { business } from "../site/business.js";

// De footer is voor navigatie, vertrouwen en praktische informatie — het
// verkoopwerk is boven al gedaan. Geen tweede dienstenlijst dus: die zou de
// pagina alsnog laten eindigen met "Tygo kan veel dingen maken", terwijl de rest
// van de site juist naar twee routes toewerkt. Die twee staan hier nog één keer.

const navigatie = [
  ["Werk", "/cases/"],
  ["Werkwijze", "/werkwijze/"],
  ["Over Tygo", "/over/"],
  ["Contact", "/contact/"],
];

const routes = [
  ["Klanten aantrekken", "/diensten/"],
  ["Medewerkers aantrekken", "/diensten/"],
];

function FooterLogo() {
  return (
    <span className="relative block h-12 w-36">
      <img src={tvmLogo} alt="TVM Productions" className="absolute inset-0 h-full w-full object-contain brightness-0" />
      <span className="absolute left-[0.3%] right-[0.7%] top-[67.45%] h-[3.7%] bg-[#f5aa00]" aria-hidden="true" />
    </span>
  );
}

function Kolom({ titel, children }) {
  return (
    <nav>
      <p className="eyebrow text-black/35">{titel}</p>
      <div className="mt-7 grid gap-3.5">{children}</div>
    </nav>
  );
}

function Link({ href, children }) {
  return (
    <a href={href} className="w-fit font-semibold text-black/55 transition-colors duration-300 hover:text-black">
      {children}
    </a>
  );
}

export default function Footer({ elevated = false }) {
  // Telefoon, KvK, BTW en de socials staan nog als lege placeholder in
  // src/site/business.js. Ze worden pas getoond zodra ze daar zijn ingevuld —
  // zo staat er nooit een leeg label of een dode link in de footer.
  const socials = [
    ["LinkedIn", business.linkedin],
    ["Instagram", business.instagram],
  ].filter(([, url]) => url);

  return (
    <footer className={`${elevated ? "bg-white" : "bg-[#f4f3ee]"} px-3 pb-10 pt-24 sm:px-5 sm:pb-12 sm:pt-28`}>
      <div className="mx-auto max-w-[1750px] px-2.5 sm:px-3.5">
        <div className="grid gap-x-12 gap-y-14 border-t border-black/15 pt-14 lg:grid-cols-[1.6fr_1fr_1.1fr_1fr] lg:gap-x-16 lg:pt-16">
          {/* Links de positionering, niet alleen een logo: wie helemaal naar
              beneden scrollt eindigt met dezelfde gedachte als waarmee hij boven
              binnenkwam. */}
          <div>
            <FooterLogo />
            <p className="mt-7 max-w-sm text-[1.35rem] font-bold leading-[1.35] tracking-[-0.015em] text-black/85">
              Ik help bedrijven zichtbaar maken waarom klanten en medewerkers voor hen moeten kiezen.
            </p>
            <p className="mt-6 text-base font-semibold text-black/45">Purmerend · Door heel Nederland</p>

            {(business.kvk || business.btw) && (
              <div className="mt-5 grid gap-1 text-sm text-black/35">
                {business.kvk && <span>KvK {business.kvk}</span>}
                {business.btw && <span>BTW {business.btw}</span>}
              </div>
            )}
          </div>

          <Kolom titel="Navigatie">
            {navigatie.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </Kolom>

          <Kolom titel="Waarmee ik help">
            {routes.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group flex w-fit items-center gap-2.5 font-semibold text-black/55 transition-colors duration-300 hover:text-black"
              >
                {label}
                <ArrowRight
                  className="size-4 shrink-0 text-[#b78d00] transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </a>
            ))}
          </Kolom>

          <Kolom titel="Contact">
            <a
              href={`mailto:${business.email}`}
              className="w-fit font-semibold text-black/55 transition-colors duration-300 hover:text-black"
            >
              {business.email}
            </a>
            {business.telephone && (
              <a
                href={`tel:${business.telephone.replace(/\s/g, "")}`}
                className="w-fit font-semibold text-black/55 transition-colors duration-300 hover:text-black"
              >
                {business.telephone}
              </a>
            )}
            {socials.map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-fit font-semibold text-black/55 transition-colors duration-300 hover:text-black"
              >
                {label}
              </a>
            ))}
          </Kolom>
        </div>

        {/* Eén dunne regel onderaan. */}
        <div className="mt-16 flex flex-col gap-4 border-t border-black/10 pt-7 text-sm font-semibold text-black/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} TVM Productions</span>
            <span aria-hidden="true">·</span>
            <a href="/privacy/" className="transition-colors hover:text-black">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="/voorwaarden/" className="transition-colors hover:text-black">Algemene voorwaarden</a>
          </p>

          <a href="#top" className="group flex w-fit items-center gap-2 text-black/50 transition-colors hover:text-black">
            Naar boven
            <span className="grid size-8 place-items-center rounded-full border border-black/15 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1">
              <ArrowUp className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
