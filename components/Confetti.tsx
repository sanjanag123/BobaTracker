'use client';

import { useEffect, useState } from 'react';
import StarJellyIcon from './StarJellyIcon';

interface ConfettiProps {
  trigger: boolean;
}

interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);

  useEffect(() => {
    if (trigger) {
      const items: ConfettiItem[] = [];
      for (let i = 0; i < 50; i++) {
        items.push({
          id: i,
          x: Math.random() * 100,
          y: -10, // Start from top
          rotation: Math.random() * 360,
          delay: Math.random() * 0.5,
        });
      }
      setConfetti(items);

      // Clear confetti after animation
      setTimeout(() => setConfetti([]), 3000);
    }
  }, [trigger]);

  if (confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          <StarJellyIcon size={24} />
        </div>
      ))}
    </div>
  );
}

