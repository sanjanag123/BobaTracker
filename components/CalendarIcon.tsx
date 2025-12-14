'use client';

interface CalendarIconProps {
  size?: number;
}

export default function CalendarIcon({ size = 24 }: CalendarIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calendar base */}
      <rect x="4" y="6" width="16" height="14" rx="2" fill="#FFF8F0" stroke="#8B4A5C" strokeWidth="1.5"/>
      {/* Calendar header */}
      <rect x="4" y="6" width="16" height="5" rx="2" fill="#FFB3BA" stroke="#8B4A5C" strokeWidth="1.5"/>
      {/* Binding rings */}
      <circle cx="8" cy="8.5" r="1" fill="#8B4A5C"/>
      <circle cx="16" cy="8.5" r="1" fill="#8B4A5C"/>
      {/* Calendar grid lines */}
      <line x1="8" y1="11" x2="8" y2="20" stroke="#FFB3BA" strokeWidth="1" opacity="0.3"/>
      <line x1="12" y1="11" x2="12" y2="20" stroke="#FFB3BA" strokeWidth="1" opacity="0.3"/>
      <line x1="16" y1="11" x2="16" y2="20" stroke="#FFB3BA" strokeWidth="1" opacity="0.3"/>
      <line x1="4" y1="14" x2="20" y2="14" stroke="#FFB3BA" strokeWidth="1" opacity="0.3"/>
      <line x1="4" y1="17" x2="20" y2="17" stroke="#FFB3BA" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

