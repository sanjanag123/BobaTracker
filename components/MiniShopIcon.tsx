'use client';

interface MiniShopIconProps {
  size?: number;
}

export default function MiniShopIcon({ size = 24 }: MiniShopIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shop building */}
      <rect x="6" y="12" width="12" height="8" fill="#FFF8F0" stroke="#8B4A5C" strokeWidth="1.5" rx="1"/>
      {/* Door */}
      <rect x="10" y="16" width="4" height="4" fill="#FFE5E8" stroke="#8B4A5C" strokeWidth="1" rx="0.5"/>
      {/* Door handle */}
      <circle cx="12.5" cy="18" r="0.5" fill="#8B4A5C"/>
      {/* Window */}
      <rect x="8" y="13.5" width="2" height="2" fill="#FFB3BA" stroke="#8B4A5C" strokeWidth="0.8" rx="0.3"/>
      <rect x="14" y="13.5" width="2" height="2" fill="#FFB3BA" stroke="#8B4A5C" strokeWidth="0.8" rx="0.3"/>
    </svg>
  );
}

