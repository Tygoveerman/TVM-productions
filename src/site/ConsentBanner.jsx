import { useEffect, useState } from "react";
import { getConsent, initAnalytics, setConsent } from "./analytics.js";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initAnalytics();
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-3 top-3 z-[60] mx-auto max-w-md rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(17,17,17,.16)] sm:inset-x-auto sm:right-6 sm:top-auto sm:bottom-6 sm:left-auto sm:max-w-sm">
      <p className="text-sm leading-relaxed text-black/70">
        We gebruiken alleen analytische cookies om te begrijpen hoe bezoekers de site gebruiken. Deze worden pas geplaatst na jouw toestemming.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("granted")} className="rounded-full bg-black px-5 py-2.5 text-sm font-black text-white">
          Accepteren
        </button>
        <button type="button" onClick={() => choose("denied")} className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-black">
          Weigeren
        </button>
      </div>
    </div>
  );
}
