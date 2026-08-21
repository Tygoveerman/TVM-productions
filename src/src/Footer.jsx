import { Mail, MapPin } from "lucide-react";
import tvmLogo from "../assets/brand/tvm-logo-source.png";

const pages = [
  ["Werk", "/cases/"],
  ["Werkwijze", "/werkwijze/"],
  ["Over Tygo", "/over/"],
  ["Tarieven", "/tarieven/"],
  ["Veelgestelde vragen", "/veelgestelde-vragen/"],
];

const services = [
  ["Bedrijfsvideo", "/diensten/bedrijfsvideo/"],
  ["Promotievideo", "/diensten/promotievideo/"],
  ["Klantcasevideo", "/diensten/klantcasevideo/"],
  ["Uitlegvideo", "/diensten/uitlegvideo/"],
  ["Projectvideo", "/diensten/projectvideo/"],
  ["Eventvideo & fotografie", "/diensten/eventvideo-fotografie/"],
  ["Bedrijfsfotografie", "/diensten/bedrijfsfotografie/"],
  ["Productfotografie", "/diensten/productfotografie/"],
];

function FooterLogo() {
  return <span className="relative block h-14 w-40"><img src={tvmLogo} alt="TVM Productions" className="absolute inset-0 h-full w-full object-contain brightness-0" /><span className="absolute left-[0.3%] right-[0.7%] top-[67.45%] h-[3.7%] bg-[#f5ca3c]" aria-hidden="true" /></span>;
}

export default function Footer({ elevated = false }) {
  return <footer className={`${elevated ? "bg-white" : "bg-[#f4f3ee]"} px-3 pb-3 pt-16 sm:px-6 sm:pb-6 sm:pt-24`}><div className={`mx-auto max-w-[1600px] rounded-[2.5rem] bg-white text-black sm:rounded-[3rem] ${elevated ? "shadow-[0_16px_70px_rgba(17,17,17,.10)]" : ""}`}><div className="p-7 sm:p-12 lg:p-14"><div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-[1.05fr_.65fr_1.4fr_1fr]"><div><FooterLogo /><p className="mt-7 max-w-sm text-2xl font-black leading-tight tracking-[-.035em]">Video en fotografie die helder laat zien waar je bedrijf voor staat.</p><p className="mt-5 max-w-sm leading-relaxed text-black/45">Vanuit Purmerend, voor bedrijven in Noord-Holland en daarbuiten.</p><div className="mt-6 flex items-center gap-2 text-sm font-bold text-black/65"><MapPin className="size-4 text-[#b78d00]" /> Purmerend · Noord-Holland</div></div><nav><p className="text-xs font-black uppercase tracking-[.16em] text-black/35">Ontdek</p><div className="mt-6 grid gap-3">{pages.map(([label, href]) => <a key={href} href={href} className="w-fit font-bold text-black/55 transition-colors hover:text-black">{label}</a>)}</div></nav><nav><div className="flex items-center justify-between gap-4"><p className="text-xs font-black uppercase tracking-[.16em] text-black/35">Diensten</p><a href="/diensten/" className="shrink-0 text-xs font-black text-[#9c7900]">Alles bekijken</a></div><div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">{services.map(([label, href]) => <a key={href} href={href} className="w-fit font-bold text-black/55 transition-colors hover:text-black">{label}</a>)}</div></nav><div><p className="text-xs font-black uppercase tracking-[.16em] text-black/35">Contact</p><div className="mt-6 grid gap-4"><a href="mailto:info@tvmproductions.nl" className="flex items-center gap-3 whitespace-nowrap text-sm font-bold text-black/65 transition-colors hover:text-black"><Mail className="size-4 shrink-0 text-[#b78d00]" /><span>info@tvmproductions.nl</span></a><p className="max-w-56 text-sm leading-relaxed text-black/40">Meestal binnen één werkdag een reactie.</p></div></div></div><div className="mt-10 flex flex-col gap-5 border-t border-black/10 pt-6 text-xs font-bold text-black/35 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} TVM Productions</span><div className="flex flex-wrap gap-x-6 gap-y-3"><a href="/privacy/" className="hover:text-black">Privacy</a><a href="/voorwaarden/" className="hover:text-black">Voorwaarden</a><a href="/avg-fotografie-video/" className="hover:text-black">AVG fotografie & video</a><a href="#top" className="text-black/60 hover:text-black">Naar boven ↑</a></div></div></div></div></footer>;
}
