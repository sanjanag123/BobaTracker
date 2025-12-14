'use client';

interface ShopRoofIconProps {
  size?: number;
}

export default function ShopRoofIcon({ size }: ShopRoofIconProps) {
  // Isosceles trapezoid: wider bottom, narrower top
  const topOffset = 4; // How much narrower the top is (each side)
  const height = 14; // Roof height - less flat now
  
  const stripeColors = ['#FFB3BA', '#FFDFBA']; // Alternating pink and peach
  
  return (
    <svg 
      width="100%" 
      height={`${height}px`}
      viewBox="0 0 100 14" 
      preserveAspectRatio="none"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="roof-clip">
          <path d={`M 0 14 L ${topOffset} 0 L ${100 - topOffset} 0 L 100 14 Z`} />
        </clipPath>
      </defs>
      
      {/* Base fill for roof */}
      <path
        d={`M 0 14 L ${topOffset} 0 L ${100 - topOffset} 0 L 100 14 Z`}
        fill="#FFB3BA"
        stroke="#8B4A5C"
        strokeWidth="0.5"
      />
      
      {/* Vertical stripes within the trapezoid */}
      <g clipPath="url(#roof-clip)">
        {Array.from({ length: 12 }).map((_, i) => {
          // Vertical stripes as rectangles - alternating pink and white
          const stripeWidth = 100 / 12;
          const x = i * stripeWidth;
          
          return (
            <rect
              key={i}
              x={x}
              y="0"
              width={stripeWidth}
              height="14"
              fill={stripeColors[i % 2]}
            />
          );
        })}
      </g>
    </svg>
  );
}

