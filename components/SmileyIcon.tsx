'use client';

interface SmileyIconProps {
  size?: number;
  expression?: 'happy' | 'sassy';
}

export default function SmileyIcon({ size = 24, expression = 'happy' }: SmileyIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face circle */}
      <circle cx="12" cy="12" r="10" fill="#FFDBAC" stroke="#8B4A5C" strokeWidth="1.5"/>
      
      {/* Eyes */}
      <circle cx="9" cy="10" r="1.5" fill="#8B4A5C"/>
      <circle cx="15" cy="10" r="1.5" fill="#8B4A5C"/>
      
      {/* Mouth */}
      {expression === 'happy' ? (
        <path d="M 8 14 Q 12 18 16 14" stroke="#8B4A5C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M 8 16 Q 12 13 16 16" stroke="#8B4A5C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      )}
    </svg>
  );
}

