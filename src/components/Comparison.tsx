"use client";

import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";

const rows = [
  { feature: "Montáž", strop: "Rychlá, bez prachu", sdk: "Zdlouhavá, prašná" },
  { feature: "Praskliny", strop: "Bez prasklin", sdk: "Náchylný na praskliny" },
  { feature: "Údržba", strop: "Minimální, antistatický povrch", sdk: "Pravidelné malování" },
  { feature: "Vlhkost", strop: "Vodotěsný, odolný", sdk: "Neodolá vodě" },
  { feature: "Zatížení", strop: "Nízké", sdk: "Vysoké" },
  { feature: "Design", strop: "Matný, lesklý, tisk, LED podsvícení", sdk: "Omezené možnosti" },
  { feature: "Cena", strop: "Nižší celkové náklady", sdk: "Vyšší celkové náklady" },
];

export default function Comparison() {
  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-navy border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <SectionEyebrow text="Srovnání" />
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15]">
              Napínané stropy vs. sádrokarton
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-6 text-[10px] tracking-[0.14em] uppercase text-faint font-medium w-1/4">
                    Vlastnost
                  </th>
                  <th className="py-4 px-6 text-[10px] tracking-[0.14em] uppercase text-accent font-medium w-[37.5%]">
                    Napínaný strop
                  </th>
                  <th className="py-4 pl-6 text-[10px] tracking-[0.14em] uppercase text-faint font-medium w-[37.5%]">
                    Sádrokarton
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="py-4 pr-6 text-sm text-white/80 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-sm font-light">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-accent/80 group-hover:text-accent transition-colors duration-300">
                          {row.strop}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 pl-6 text-sm font-light">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500/40 rounded-full flex-shrink-0" />
                        <span className="text-muted">{row.sdk}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
