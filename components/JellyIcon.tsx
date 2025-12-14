'use client';

interface JellyIconProps {
  size?: number;
}

export default function JellyIcon({ size = 24 }: JellyIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Jelly blob shape */}
      <path
        d="M12 4 Q8 6 6 10 Q4 14 7 17 Q10 20 12 19 Q14 20 17 17 Q20 14 18 10 Q16 6 12 4 Z"
        fill="#FFB3BA"
        stroke="#8B4A5C"
        strokeWidth="1.5"
      />
      {/* Jelly shine/highlight */}
      <ellipse cx="10" cy="8" rx="3" ry="4" fill="#FFE5E8" opacity="0.6"/>
      {/* Jelly texture dots */}
      <circle cx="9" cy="11" r="1" fill="#FFFFFF" opacity="0.5"/>
      <circle cx="13" cy="13" r="0.8" fill="#FFFFFF" opacity="0.5"/>
      <circle cx="15" cy="10" r="1" fill="#FFFFFF" opacity="0.5"/>
    </svg>
  );
}

