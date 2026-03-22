interface SectionEyebrowProps {
  text: string;
}

export default function SectionEyebrow({ text }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-accent" />
      <span className="text-accent text-[10px] font-medium tracking-[0.18em] uppercase">
        {text}
      </span>
    </div>
  );
}
