'use client';

interface BobaCupIconProps {
  size?: number;
  className?: string;
}

export default function BobaCupIcon({ size = 24, className = '' }: BobaCupIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cup */}
      <rect x="6" y="8" width="12" height="14" rx="2" fill="#FFB3BA" stroke="#8B4A5C" strokeWidth="1.5"/>
      {/* Lid */}
      <rect x="5" y="6" width="14" height="3" rx="1.5" fill="#FFF8F0" stroke="#8B4A5C" strokeWidth="1.5"/>
      {/* Straw */}
      <line x1="12" y1="2" x2="12" y2="9" stroke="#8B4A5C" strokeWidth="2" strokeLinecap="round"/>
      {/* Tapioca pearls arranged as smiley face */}
      {/* Left eye */}
      <circle cx="9" cy="15" r="1.5" fill="#3C2413"/>
      {/* Right eye */}
      <circle cx="15" cy="15" r="1.5" fill="#3C2413"/>
      {/* Smile (pearls forming mouth) */}
      <circle cx="10.5" cy="18" r="1.2" fill="#3C2413"/>
      <circle cx="12" cy="19" r="1.2" fill="#3C2413"/>
      <circle cx="13.5" cy="18" r="1.2" fill="#3C2413"/>
    </svg>
  );
}

