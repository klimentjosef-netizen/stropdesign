interface LogoProps {
  variant?: "dark" | "light";
  showText?: boolean;
  showUrl?: boolean;
  className?: string;
  size?: number;
}

export function LogoMark({
  color = "#0A0A0A",
  size = 36,
}: {
  color?: string;
  size?: number;
}) {
  // Geometric "N" matching the brand logo:
  // Two thick vertical bars connected by a diagonal from top-left to bottom-right
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left vertical bar */}
      <rect x="8" y="5" width="22" height="90" fill={color} />
      {/* Diagonal from top-left to bottom-right */}
      <polygon points="8,5 30,5 92,95 70,95" fill={color} />
      {/* Right vertical bar */}
      <rect x="70" y="5" width="22" height="90" fill={color} />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  showText = true,
  showUrl = false,
  className = "",
  size = 36,
}: LogoProps) {
  const nColor = variant === "dark" ? "#0A0A0A" : "#FFFFFF";
  const textColor = variant === "dark" ? "text-accent" : "text-accent";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark color={nColor} size={size} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${textColor} text-[11px] font-semibold tracking-[0.22em] uppercase`}
          >
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
