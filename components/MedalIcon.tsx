'use client';

interface MedalIconProps {
  type: 'gold' | 'silver' | 'bronze';
  size?: number;
}

export default function MedalIcon({ type, size = 24 }: MedalIconProps) {
  const colors = {
    gold: { fill: '#FFD700', stroke: '#FFA500', text: '1' },
    silver: { fill: '#C0C0C0', stroke: '#808080', text: '2' },
    bronze: { fill: '#CD7F32', stroke: '#8B4513', text: '3' }
  };
  
  const color = colors[type];
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" fill={color.fill} stroke={color.stroke} strokeWidth="1.5"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={color.stroke}>
        {color.text}
      </text>
      <rect x="10" y="4" width="4" height="3" rx="1" fill={color.stroke}/>
    </svg>
  );
}

