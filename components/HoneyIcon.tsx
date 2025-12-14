'use client';

interface HoneyIconProps {
  size?: number;
}

export default function HoneyIcon({ size = 24 }: HoneyIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Honey jar/bottle */}
      <rect x="9" y="6" width="6" height="12" rx="1" fill="#FFD700" stroke="#8B4A5C" strokeWidth="1.5"/>
      <rect x="8" y="5" width="8" height="2" rx="1" fill="#FFF8F0" stroke="#8B4A5C" strokeWidth="1.5"/>
      {/* Honey texture lines */}
      <line x1="10" y1="10" x2="14" y2="10" stroke="#FFA500" strokeWidth="1" opacity="0.6"/>
      <line x1="10" y1="13" x2="14" y2="13" stroke="#FFA500" strokeWidth="1" opacity="0.6"/>
      <line x1="10" y1="16" x2="14" y2="16" stroke="#FFA500" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

