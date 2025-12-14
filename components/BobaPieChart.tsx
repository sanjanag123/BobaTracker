'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface BobaPieChartProps {
  data: { topping: string; count: number }[];
}

const CHART_COLORS = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#C7BAFF', '#FFBAE7'];

export default function BobaPieChart({ data }: BobaPieChartProps) {
  const pieData = data.filter(entry => entry.count > 0);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFF8F0', 
              border: '2px solid #FFB3BA', 
              borderRadius: '12px' 
            }}
            formatter={(value: number, name: string, props: any) => {
              return [`${value}`, props.payload.topping];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Topping counters on the right side */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        {pieData.slice(0, 8).map((entry, index) => (
          <div key={entry.topping} className="flex items-center gap-2 p-2 bg-boba-cream rounded-lg">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <div className="flex-1">
              <p className="text-xs font-medium text-boba-dark">{entry.topping}</p>
              <p className="text-xs text-gray-600">{entry.count}x</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

