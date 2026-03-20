/** Mascot B: Usměvavý strop — přátelský napínaný stropní panel */
export default function MascotB({ size = 56 }: { size?: number }) {
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

      {/* Ceiling panel body — rounded rectangle with wavy bottom edge */}
      <path
        d="M12 18c0-2 1.5-3.5 3.5-3.5h33c2 0 3.5 1.5 3.5 3.5v22c0 0-4 3-16 3s-16-3-16-3V18z"
        fill="#F5F2E8"
      />

      {/* Subtle stretched fabric texture lines */}
      <path d="M16 20h32" stroke="#E8E0C8" strokeWidth="0.5" opacity="0.6" />
      <path d="M14 25h36" stroke="#E8E0C8" strokeWidth="0.5" opacity="0.4" />
      <path d="M15 30h34" stroke="#E8E0C8" strokeWidth="0.5" opacity="0.3" />

      {/* Eyes */}
      <ellipse cx="24" cy="25" rx="3" ry="3.5" fill="#333" />
      <ellipse cx="40" cy="25" rx="3" ry="3.5" fill="#333" />
      {/* Eye shine */}
      <circle cx="25.2" cy="23.5" r="1.2" fill="white" />
      <circle cx="41.2" cy="23.5" r="1.2" fill="white" />

      {/* Big friendly smile */}
      <path
        d="M23 33c0 0 4 5.5 9 5.5s9-5.5 9-5.5"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Cheeks */}
      <ellipse cx="19" cy="31" rx="2.5" ry="1.5" fill="#C9A84C" opacity="0.35" />
      <ellipse cx="45" cy="31" rx="2.5" ry="1.5" fill="#C9A84C" opacity="0.35" />

      {/* Small hands waving from sides */}
      <g>
        {/* Left hand */}
        <path
          d="M10 35c-2-1-3-3-1-5s4-1 5 1l-1 3"
          fill="#F5F2E8"
          stroke="#E8E0C8"
          strokeWidth="0.5"
        />
        {/* Right hand */}
        <path
          d="M54 35c2-1 3-3 1-5s-4-1-5 1l1 3"
          fill="#F5F2E8"
          stroke="#E8E0C8"
          strokeWidth="0.5"
        />
      </g>

      {/* Mounting profile at top (like a real ceiling rail) */}
      <rect x="14" y="13" width="36" height="3" rx="1" fill="#C9A84C" />
      <rect x="16" y="13.5" width="32" height="1.5" rx="0.5" fill="#E0D08C" opacity="0.5" />

      {/* Small LED dots along the top */}
      <circle cx="22" cy="14.5" r="0.8" fill="white" opacity="0.8" />
      <circle cx="32" cy="14.5" r="0.8" fill="white" opacity="0.8" />
      <circle cx="42" cy="14.5" r="0.8" fill="white" opacity="0.8" />

      {/* Bottom wavy edge — stretched fabric effect */}
      <path
        d="M16 40c4 2 8 3 16 3s12-1 16-3"
        stroke="#E8E0C8"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
