'use client';

import { useEffect, useRef } from 'react';
import BobaCupIcon from './BobaCupIcon';

interface CupStatCardProps {
  title: string;
  value: string | number;
  maxValue: number;
  color: string;
  icon?: React.ReactNode;
}

export default function CupStatCard({ title, value, maxValue, color, icon }: CupStatCardProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace('$', '')) || 0 : value;
  const percentage = Math.min((numericValue / maxValue) * 100, 100);
  
  useEffect(() => {
    if (!fillRef.current) return;
    
    // Calculate height - cup is 160px tall, start 15px from bottom
    const cupHeight = 160;
    const startOffset = 15;
    const fillableHeight = cupHeight - startOffset - 10; // Leave some space at top
    
    if (numericValue > 0 && percentage > 0) {
      const fillHeight = (percentage / 100) * fillableHeight;
      // Ensure minimum visible height for any value > 0
      const finalHeight = Math.max(Math.min(fillHeight, fillableHeight), 8);
      fillRef.current.style.height = `${finalHeight}px`;
      fillRef.current.style.opacity = '0.8';
    } else {
      fillRef.current.style.height = '0px';
      fillRef.current.style.opacity = '0';
    }
  }, [percentage, numericValue]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Cup Container */}
      <div className="relative w-32 h-40 mb-4">
        {/* Cup Outline with mask for liquid */}
        <svg 
          viewBox="0 0 120 150" 
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={`cup-clip-${title.replace(/\s+/g, '-')}`}>
              <path d="M30 20 L30 130 Q30 140 40 140 L80 140 Q90 140 90 130 L90 20 Q90 10 80 10 L40 10 Q30 10 30 20 Z"/>
            </clipPath>
          </defs>
          {/* Cup shape */}
          <path
            d="M30 20 L30 130 Q30 140 40 140 L80 140 Q90 140 90 130 L90 20 Q90 10 80 10 L40 10 Q30 10 30 20 Z"
            fill="none"
            stroke="#8B4A5C"
            strokeWidth="3"
          />
          {/* Lid */}
          <rect x="25" y="15" width="70" height="8" rx="4" fill="#FFF8F0" stroke="#8B4A5C" strokeWidth="2"/>
          {/* Straw */}
          <line x1="60" y1="5" x2="60" y2="23" stroke="#8B4A5C" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        
        {/* Liquid Fill - starts from a fixed position inside the cup (not at very bottom) */}
        <div 
          ref={fillRef}
          className="absolute transition-all duration-1000 ease-out overflow-hidden"
          style={{ 
            height: '0px', // Will be set by useEffect
            left: '30%',
            right: '30%',
            bottom: '15px', // Start 15px from bottom (clearly inside the cup)
            backgroundColor: color,
            opacity: 0.8,
          }}
        >
          {/* Liquid shimmer effect */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)`,
              animation: 'shimmer 3s infinite',
            }}
          />
        </div>

        {/* Tapioca pearls overlay (only visible when liquid is high enough) */}
        {percentage > 30 && (
          <div 
            className="absolute bottom-0 left-0 right-0 z-5 overflow-hidden"
            style={{ 
              height: `${Math.min(percentage, 85)}%`,
              clipPath: 'polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)',
            }}
          >
            <svg viewBox="0 0 120 150" className="w-full h-full" preserveAspectRatio="none">
              <circle cx="45" cy="100" r="3" fill="#3C2413" opacity="0.6"/>
              <circle cx="60" cy="110" r="3" fill="#3C2413" opacity="0.6"/>
              <circle cx="75" cy="100" r="3" fill="#3C2413" opacity="0.6"/>
              <circle cx="50" cy="120" r="3" fill="#3C2413" opacity="0.6"/>
              <circle cx="70" cy="120" r="3" fill="#3C2413" opacity="0.6"/>
            </svg>
          </div>
        )}
      </div>

      {/* Value Display Outside Cup */}
      <div className="text-center">
        <p className="text-2xl font-bold text-boba-dark mb-1">{value}</p>
        <p className="text-xs text-gray-600">{title}</p>
        {icon && <div className="mt-2 flex justify-center">{icon}</div>}
      </div>
    </div>
  );
}

