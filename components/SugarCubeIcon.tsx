'use client';

interface SugarCubeIconProps {
  size?: number;
}

export default function SugarCubeIcon({ size = 24 }: SugarCubeIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sugar cube - 3D perspective */}
      <path
        d="M6 8 L12 4 L18 8 L18 16 L12 20 L6 16 Z"
        fill="#FFF8F0"
        stroke="#8B4A5C"
        strokeWidth="1.5"
      />
      {/* Top face */}
      <path
        d="M6 8 L12 4 L18 8 L12 12 Z"
        fill="#FFFFFF"
        stroke="#8B4A5C"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Side face */}
      <path
        d="M18 8 L18 16 L12 20 L12 12 Z"
        fill="#FFE5E8"
        stroke="#8B4A5C"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Cube lines for texture */}
      <line x1="9" y1="10" x2="15" y2="10" stroke="#D4A574" strokeWidth="0.5" opacity="0.5"/>
      <line x1="10.5" y1="12" x2="16.5" y2="12" stroke="#D4A574" strokeWidth="0.5" opacity="0.5"/>
      <line x1="9" y1="14" x2="15" y2="14" stroke="#D4A574" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

