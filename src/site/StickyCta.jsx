export default function StickyCta() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
      <a
        href="/contact/"
        data-cta-location="sticky"
        className="flex min-h-14 items-center justify-center rounded-full bg-[#f5ca3c] text-center text-sm font-black text-black shadow-[0_14px_40px_rgba(0,0,0,.22)]"
      >
        Plan een gesprek
      </a>
    </div>
  );
}
