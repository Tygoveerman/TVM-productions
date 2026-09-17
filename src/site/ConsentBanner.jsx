import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getConsent, initAnalytics, setConsent } from "./analytics.js";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    initAnalytics();
    if (!getConsent()) setVisible(true);
  }, []);

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          // Dezelfde taal als de hero: donker vlak, 24px radius, geel accent.
          // Daardoor leest de banner als onderdeel van de site en niet als een
          // ingeplakte plug-in.
          role="dialog"
          aria-label="Cookievoorkeuren"
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] overflow-hidden rounded-[18px] bg-[#0F0E0B] text-[#F3F0EA] shadow-[0_24px_70px_rgba(15,14,11,.4)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[26rem] sm:rounded-[24px]"
        >
          {/* Smalle gele rand aan de bovenkant in plaats van een heel geel vlak:
              het valt op zonder te schreeuwen. */}
          <div className="h-1.5 w-full bg-[#f5ca3c]" aria-hidden="true" />

          <div className="p-6 sm:p-7">
            <p className="flex items-center gap-3 eyebrow text-[#F3F0EA]/50">
              <span className="size-2 shrink-0 rounded-full bg-[#f5ca3c]" aria-hidden="true" />
              Cookies
            </p>

            <p className="mt-4 text-[0.9375rem] leading-[1.6] text-[#F3F0EA]/75 sm:text-base">
              Ik gebruik alleen analytische cookies, om te zien welke pagina&apos;s bezoekers
              helpen. Geen advertenties, geen doorverkoop. Ze worden pas geplaatst als jij
              hieronder ja zegt.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => choose("granted")}
                className="group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full bg-[#f5ca3c] py-1 pl-5 pr-1 text-sm font-bold leading-none text-[#0F0E0B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Prima
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0F0E0B] text-[#F3F0EA]" aria-hidden="true">
                  <ArrowUpRight className="block size-4 shrink-0 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => choose("denied")}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-[#F3F0EA]/25 px-5 text-sm font-bold text-[#F3F0EA]/80 transition-colors duration-300 hover:border-[#F3F0EA]/60 hover:text-[#F3F0EA]"
              >
                Liever niet
              </button>
            </div>

            <a
              href="/privacy/"
              className="mt-5 inline-block text-xs font-semibold text-[#F3F0EA]/40 underline decoration-[#F3F0EA]/25 underline-offset-4 transition-colors hover:text-[#F3F0EA]/70"
            >
              Lees wat ik wel en niet bijhoud
            </a>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
