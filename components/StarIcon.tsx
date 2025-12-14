'use client';

interface StarIconProps {
  size?: number;
}

export default function StarIcon({ size = 20 }: StarIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L14.5 8.5 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 8.5 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="1.5"
      />
    </svg>
  );
}

