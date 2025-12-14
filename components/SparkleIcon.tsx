'use client';

interface SparkleIconProps {
  size?: number;
}

export default function SparkleIcon({ size = 24 }: SparkleIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="1"
      />
      <circle cx="12" cy="12" r="2" fill="#FFF" opacity="0.8"/>
    </svg>
  );
}

