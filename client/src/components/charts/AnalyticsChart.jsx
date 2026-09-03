import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
const DEFAULT_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];
export const AnalyticsChart = ({ data, dataKey = 'value', nameKey = 'name', colors = DEFAULT_COLORS, title }) => {
    return (<div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey={dataKey} nameKey={nameKey}>
            {data.map((_, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}/>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>);
};
