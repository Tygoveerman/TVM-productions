// TODO: vul met echte testimonials — { quote, name, company, role, image? }.
// Renders nothing until real quotes are added; we don't fabricate reviews.
const testimonials = [];

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white px-3 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-black uppercase tracking-[.16em] text-black/40">Wat klanten zeggen</p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-[2rem] bg-[#f4f3ee] p-8">
              <p className="text-lg font-semibold leading-relaxed tracking-[-.01em] text-black/80">“{item.quote}”</p>
              <footer className="mt-6 text-sm font-bold text-black/50">
                {item.name}
                {item.role || item.company ? `, ${[item.role, item.company].filter(Boolean).join(" — ")}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
