import { breadcrumbSchema } from "./schema.js";

// Kruimelpad plus de bijbehorende structured data. Stond eerder in SitePages.jsx;
// staat hier zodat ook SubpageHero hem kan gebruiken zonder importcirkel.
// `items` is het pad ná Home, bijv. [{ label: "Cases", href: "/cases/" }].
// `licht` voor gebruik op een donkere ondergrond.
export default function Breadcrumbs({ items, licht = false }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-2 text-sm font-bold ${licht ? "text-[#F3F0EA]/45" : "text-black/40"}`}>
          {trail.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span className={licht ? "text-[#F3F0EA]/25" : "text-black/20"} aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page" className={licht ? "text-[#F3F0EA]/75" : "text-black/60"}>{item.label}</span>
              ) : (
                <a href={item.href} className={`transition-colors ${licht ? "hover:text-[#F3F0EA]" : "hover:text-black"}`}>{item.label}</a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail)) }} />
    </>
  );
}
