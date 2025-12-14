'use client';

interface HappyFaceIconProps {
  size?: number;
}

export default function HappyFaceIcon({ size = 20 }: HappyFaceIconProps) {
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
      <path d="M 8 14 Q 12 18 16 14" stroke="#8B4A5C" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

