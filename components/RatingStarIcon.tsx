'use client';

interface RatingStarIconProps {
  filled?: boolean;
  size?: number;
}

export default function RatingStarIcon({ filled = true, size = 18 }: RatingStarIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={filled ? '#FFD700' : 'none'}
      stroke="#FFD700"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L14.5 8.5 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 8.5 Z"
      />
    </svg>
  );
}

