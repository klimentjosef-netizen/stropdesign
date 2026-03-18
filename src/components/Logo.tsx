import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  showText?: boolean;
  showUrl?: boolean;
  className?: string;
  size?: number;
}

export function LogoMark({
  variant = "dark",
  size = 36,
}: {
  variant?: "dark" | "light";
  color?: string;
  size?: number;
}) {
  return (
    <Image
      src={variant === "dark" ? "/images/logo-mark-dark.jpg" : "/images/logo-mark-light.jpg"}
      alt="StropDesign"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  );
}

export default function Logo({
  variant = "dark",
  showText = true,
  showUrl = false,
  className = "",
  size = 36,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark variant={variant} size={size} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-accent text-[11px] font-semibold tracking-[0.22em] uppercase">
            Strop Design
          </span>
          {showUrl && (
            <span className="text-muted text-[8px] tracking-[0.08em] mt-1">
              www.stropdesign.cz
            </span>
          )}
        </div>
      )}
    </div>
  );
}
