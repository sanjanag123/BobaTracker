'use client';

interface SassyFaceIconProps {
  size?: number;
}

export default function SassyFaceIcon({ size = 20 }: SassyFaceIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#FFDBAC" stroke="#8B4A5C" strokeWidth="1.5"/>
      <circle cx="9" cy="10" r="1.5" fill="#8B4A5C"/>
      <circle cx="15" cy="10" r="1.5" fill="#8B4A5C"/>
      <line x1="9" y1="15" x2="15" y2="15" stroke="#8B4A5C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

