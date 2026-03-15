import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

const advantages = [
  "Rychlá a čistá instalace bez prachu a nepořádku",
  "PVC membrány odolné proti vlhkosti a prasklinám",
  "Široká škála designů: matný, saténový, lesklý, metalický, průsvitný i tisk",
  "Individuální přístup ke každému projektu",
  "Integrované osvětlení, reproduktory a Smart Home",
  "Antistatický povrch odolný proti prachu, bez náročné údržby",
];

export default function About() {
  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <RevealOnScroll>
          <SectionEyebrow text="O nás" />
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] mb-5 text-heading">
            Precizní práce,
            <br />
            na kterou <em className="italic text-accent">se spolehněte</em>.
          </h2>
          <p className="text-body text-sm leading-[1.8] font-light mb-6">
            Napínané stropy jsou ideální volbou pro hladký, bezešvý povrch a
            estetické provedení interiéru. Slouží k zakrytí nerovností, instalaci
            osvětlení i jako designový prvek prostoru. Specializujeme se na
            precizní montáž v Ostravě a okolí.
          </p>
          <div className="flex flex-col gap-3.5">
            {advantages.map((text, i) => (
              <div key={i} className="flex gap-3.5 items-start">
                <div className="w-7 h-7 border border-accent/30 bg-accent-soft flex-shrink-0 flex items-center justify-center rounded-sm">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                </div>
                <p className="text-[13px] text-body leading-[1.5] font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div className="aspect-square bg-light-secondary border border-border rounded-sm relative overflow-hidden">
            <Image
              src="/images/about-bedroom-led.jpg"
              alt="Napínaný strop s LED osvětlením v ložnici"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
