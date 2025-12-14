'use client';

interface TapiocaStickerProps {
  size?: number;
  className?: string;
}

export default function TapiocaSticker({ size = 20, className = '' }: TapiocaStickerProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#FFF8F0" stroke="#FFB3BA" strokeWidth="1.5"/>
      {/* Tapioca pearls */}
      <circle cx="9" cy="10" r="2" fill="#3C2413"/>
      <circle cx="12" cy="12" r="2" fill="#3C2413"/>
      <circle cx="15" cy="10" r="2" fill="#3C2413"/>
      <circle cx="10" cy="15" r="2" fill="#3C2413"/>
      <circle cx="14" cy="15" r="2" fill="#3C2413"/>
    </svg>
  );
}

