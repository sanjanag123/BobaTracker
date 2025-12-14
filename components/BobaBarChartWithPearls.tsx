'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RectangleProps } from 'recharts';

interface BobaBarChartWithPearlsProps {
  data: { month: string; count: number }[];
  dataKey: string;
  color?: string;
}

const CustomBarShape = (props: any, dataKey: string) => {
  const { x, y, width, height, payload } = props;
  const value = payload[dataKey] || 0;
  
  return (
    <g>
      {/* Bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.fill}
        rx="4"
      />
      {/* Tapioca pearls at the bottom - animated and bigger */}
      {value > 0 && (
        <g>
          {/* Bottom row of pearls - bigger and same size */}
          {Array.from({ length: Math.min(5, Math.floor(width / 10)) }).map((_, i) => (
            <circle
              key={i}
              cx={x + (i + 1) * (width / (Math.min(5, Math.floor(width / 10)) + 1))}
              cy={y + height - 5}
              r="5"
              fill="#3C2413"
              opacity="0.8"
              className="animate-pearl-float"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
          {/* Second row if bar is tall enough - bigger and same size */}
          {height > 40 && Array.from({ length: Math.min(4, Math.floor(width / 12)) }).map((_, i) => (
            <circle
              key={`row2-${i}`}
              cx={x + (i + 1.5) * (width / (Math.min(4, Math.floor(width / 12)) + 1))}
              cy={y + height - 15}
              r="5"
              fill="#3C2413"
              opacity="0.7"
              className="animate-pearl-float"
              style={{
                animationDelay: `${(i + 5) * 0.15}s`,
              }}
            />
          ))}
        </g>
      )}
    </g>
  );
};

export default function BobaBarChartWithPearls({ data, dataKey, color = '#FFB3BA' }: BobaBarChartWithPearlsProps) {
  const BarShape = (props: any) => CustomBarShape(props, dataKey);
  const isAmount = dataKey === 'amount';
  
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
          formatter={(value: number) => [
            isAmount ? `$${value.toFixed(2)}` : `${value}`,
            isAmount ? 'Spent' : 'Purchases'
          ]}
        />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} shape={BarShape}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

