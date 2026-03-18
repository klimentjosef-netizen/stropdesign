import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

const reviews = [
  { name: "Jana M.", location: "Ostrava" },
  { name: "Petr K.", location: "Frýdek-Místek" },
  { name: "Martin V.", location: "Opava" },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

{/* ⚠️ TODO: majitel dodá reálné texty recenzí + odkaz na Google Business profil */}
export default function ReviewCards() {
  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <SectionEyebrow text="Recenze" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] text-heading">
              Co říkají naši zákazníci
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <RevealOnScroll key={review.name} delay={i * 100}>
              <div className="bg-light-secondary border border-border rounded-2xl p-7 flex flex-col h-full">
                <Stars />

                {/* TODO: doplnit recenzi */}
                <p className="mt-5 mb-6 text-body text-sm leading-[1.8] font-light italic flex-grow">
                  &ldquo;Recenze připravujeme...&rdquo;
                </p>

                <div className="w-8 h-px bg-accent mb-4" />

                <p className="font-display text-sm font-semibold text-heading">
                  {review.name}
                </p>
                <p className="text-muted text-[11px] tracking-[0.04em] mt-0.5">
                  {review.location}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* TODO: doplnit odkaz na Google Business profil */}
        <RevealOnScroll delay={300}>
          <div className="flex justify-center mt-10">
            <a
              href="https://www.google.com/maps/place/StropDesign/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent text-[12px] font-medium tracking-[0.06em] hover:text-accent-hover transition-colors duration-200 group"
            >
              Přečíst všechny recenze na Google
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
