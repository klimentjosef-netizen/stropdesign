import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: number;
}

export function LogoMark({
  variant = "dark",
  size = 36,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  return (
    <Image
      src={variant === "dark" ? "/images/logo-mark-dark.png" : "/images/logo-mark-light.png"}
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
  className = "",
  size = 36,
}: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <LogoMark variant={variant} size={size} />
    </div>
  );
}
