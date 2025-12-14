'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import BobaCupIcon from './BobaCupIcon';

interface BobaBarChartProps {
  data: { month: string; count: number }[];
  dataKey: string;
  color?: string;
}

const TOPPING_ICONS = ['⭐', '🟤', '🟡', '🟣', '🟢', '🔴', '🟠'];

export default function BobaBarChart({ data, dataKey, color = '#FFB3BA' }: BobaBarChartProps) {
  const maxValue = Math.max(...data.map(d => d[dataKey as keyof typeof d] as number));
  
  const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const value = payload[dataKey];
    const percentage = (value / maxValue) * 100;
    
    return (
      <g>
        {/* Cup outline */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="none"
          stroke="#8B4A5C"
          strokeWidth="2"
          rx="4"
        />
        {/* Liquid fill */}
        <rect
          x={x + 2}
          y={y + height * (1 - percentage / 100)}
          width={width - 4}
          height={height * (percentage / 100)}
          fill={color}
          opacity="0.8"
          rx="2"
        />
        {/* Lid */}
        <rect
          x={x - 2}
          y={y - 6}
          width={width + 4}
          height="8"
          fill="#FFF8F0"
          stroke="#8B4A5C"
          strokeWidth="2"
          rx="4"
        />
        {/* Straw */}
        <line
          x1={x + width / 2}
          y1={y - 12}
          x2={x + width / 2}
          y2={y - 6}
          stroke="#8B4A5C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Tapioca pearls when liquid is high */}
        {percentage > 40 && (
          <g>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={x + width / 2 + (i - 1) * (width * 0.2)}
                cy={y + height - 10}
                r="2"
                fill="#3C2413"
                opacity="0.6"
              />
            ))}
          </g>
        )}
        {/* Topping icon on top */}
        <text
          x={x + width / 2}
          y={y - 18}
          textAnchor="middle"
          fontSize="14"
        >
          {TOPPING_ICONS[Math.floor(Math.random() * TOPPING_ICONS.length)]}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#FFE5E8" />
        <XAxis dataKey="month" stroke="#8B4A5C" />
        <YAxis stroke="#8B4A5C" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFF8F0', 
            border: '2px solid #FFB3BA', 
            borderRadius: '12px' 
          }} 
        />
        <Bar dataKey={dataKey} shape={<CustomBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

