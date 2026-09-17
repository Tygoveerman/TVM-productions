import { ArrowUpRight } from "lucide-react";

// Twee pijlen in een venster dat de rest afknipt. Bij hover schuift de eerste
// diagonaal weg naar rechtsboven en komt de tweede van linksonder terug op zijn
// plek. Dat leest als beweging in de richting waar de pijl heen wijst, in
// plaats van als een kleur die omklapt.
//
// De ouder moet `group` zijn: de animatie hangt aan de hover van de hele knop
// of kaart, niet aan de pijl zelf.

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

export default function ArrowSwap({ className = "size-5", strokeWidth = 2.25 }) {
  return (
    <span className={`relative block overflow-hidden ${className}`} aria-hidden="true">
      <ArrowUpRight
        className={`absolute inset-0 h-full w-full transition-transform duration-500 ${EASE} group-hover:-translate-y-full group-hover:translate-x-full`}
        strokeWidth={strokeWidth}
      />
      <ArrowUpRight
        className={`absolute inset-0 h-full w-full translate-y-full -translate-x-full transition-transform duration-500 ${EASE} group-hover:translate-x-0 group-hover:translate-y-0`}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}
