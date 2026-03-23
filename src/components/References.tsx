"use client";

import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import SectionEyebrow from "./SectionEyebrow";
import ReferenceGrid from "./ReferenceGrid";
import { useDict, useLocalePath } from "@/i18n/LocaleContext";
import type { Reference } from "@/lib/keystatic";

interface ReferencesProps {
  references: Reference[];
}

export default function References({ references }: ReferencesProps) {
  const d = useDict();
  const refHref = useLocalePath("/reference");
  const shown = references.filter((r) => r.featured).slice(0, 6);

  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-10">
              <SectionEyebrow text={d.references.eyebrow} />
              <h2 className="font-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] text-heading">
                {d.references.title}
              </h2>
          </div>
        </RevealOnScroll>

        <ReferenceGrid references={shown} showSections={false} />

        <RevealOnScroll delay={300}>
          <div className="flex justify-center mt-10">
            <Link
              href={refHref}
              className="bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-8 py-3 hover:bg-accent-hover transition-all duration-200 rounded-full"
            >
              {d.references.showAll}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
