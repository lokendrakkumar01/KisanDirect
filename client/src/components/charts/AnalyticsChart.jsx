import React from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

const DEFAULT_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

export const AnalyticsChart = ({ 
  type = 'pie', 
  data = [], 
  dataKey = 'value', 
  nameKey = 'name', 
  colors = DEFAULT_COLORS, 
  title 
}) => {
  if (!data || data.length === 0) {
    return <div className="w-full h-72 flex items-center justify-center text-gray-400 text-sm">No data available</div>;
  }

  const tooltipStyle = { 
    borderRadius: '12px', 
    border: '1px solid #e5e7eb', 
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    color: '#111827',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '8px 12px'
  };

  if (type === 'bar') {
    return (
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={nameKey} tick={{ fontSize: 11, fontWeight: 600, fill: '#4B5563' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`bar-cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={nameKey} tick={{ fontSize: 11, fontWeight: 600, fill: '#4B5563' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="#10B981" 
              strokeWidth={3} 
              dot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }} 
              activeDot={{ r: 7 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default: Pie Chart
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 10 }}>
          <Pie 
            data={data} 
            cx="50%" 
            cy="42%" 
            innerRadius={50} 
            outerRadius={75} 
            paddingAngle={4} 
            dataKey={dataKey} 
            nameKey={nameKey}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            wrapperStyle={{ fontSize: '11px', fontWeight: '600', paddingTop: '8px' }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

