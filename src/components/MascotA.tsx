/** Mascot A: Montér s metrem — veselý řemeslník v montérkách */
export default function MascotA({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="32" fill="#847631" />

      {/* Hard hat / helmet */}
      <path
        d="M20 22c0-7 5-11 12-11s12 4 12 11H20z"
        fill="#C9A84C"
      />
      <rect x="17" y="21" width="30" height="4" rx="2" fill="#C9A84C" />
      {/* Hat brim highlight */}
      <rect x="19" y="22" width="26" height="1.5" rx="0.75" fill="#E0D08C" opacity="0.5" />

      {/* Face */}
      <ellipse cx="32" cy="33" rx="11" ry="10" fill="#F5E6D0" />

      {/* Eyes */}
      <ellipse cx="27.5" cy="31" rx="2" ry="2.2" fill="#333" />
      <ellipse cx="36.5" cy="31" rx="2" ry="2.2" fill="#333" />
      {/* Eye shine */}
      <circle cx="28.3" cy="30" r="0.8" fill="white" />
      <circle cx="37.3" cy="30" r="0.8" fill="white" />

      {/* Smile */}
      <path
        d="M27 36c0 0 2.5 3.5 5 3.5s5-3.5 5-3.5"
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Cheeks blush */}
      <ellipse cx="24" cy="35" rx="2" ry="1.2" fill="#E8A0A0" opacity="0.4" />
      <ellipse cx="40" cy="35" rx="2" ry="1.2" fill="#E8A0A0" opacity="0.4" />

      {/* Body / overalls */}
      <path
        d="M22 43c0 0 2-2 10-2s10 2 10 2v10c0 2-1 3-3 3H25c-2 0-3-1-3-3V43z"
        fill="#6E6329"
      />
      {/* Overall straps */}
      <line x1="27" y1="43" x2="27" y2="50" stroke="#847631" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="43" x2="37" y2="50" stroke="#847631" strokeWidth="2" strokeLinecap="round" />
      {/* Pocket */}
      <rect x="29" y="48" width="6" height="4" rx="1" fill="#847631" opacity="0.6" />

      {/* Meter / measuring tape in right hand */}
      <g transform="translate(42, 38) rotate(-15)">
        {/* Tape body */}
        <rect x="0" y="0" width="8" height="10" rx="2" fill="#C9A84C" />
        <rect x="1.5" y="1.5" width="5" height="7" rx="1" fill="#E0D08C" />
        {/* Tape strip coming out */}
        <rect x="3" y="-6" width="2" height="7" rx="0.5" fill="#F5E0A0" />
        {/* Markings on tape */}
        <line x1="3.5" y1="-4" x2="4.5" y2="-4" stroke="#847631" strokeWidth="0.5" />
        <line x1="3.5" y1="-2" x2="4.5" y2="-2" stroke="#847631" strokeWidth="0.5" />
        <line x1="3.5" y1="0" x2="4.5" y2="0" stroke="#847631" strokeWidth="0.5" />
      </g>

      {/* Left hand (waving) */}
      <circle cx="19" cy="44" r="3" fill="#F5E6D0" />
    </svg>
  );
}
