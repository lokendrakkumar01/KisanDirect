import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DemandChartProps {
  data: any[];
  isPrototype?: boolean;
}

export const DemandChart: React.FC<DemandChartProps> = ({ data, isPrototype = true }) => {
  return (
    <div className="w-full h-80">
      {isPrototype && (
        <div className="flex justify-end mb-2">
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">Prototype AI Prediction</span>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="predictedDemand" 
            name="Predicted Demand (Qtl)" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
