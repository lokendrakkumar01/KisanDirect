import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/format';
export const PriceChart = ({ data, isPrototype = true }) => {
    return (<div className="w-full h-80">
      {isPrototype && (<div className="flex justify-end mb-2">
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">Prototype AI Prediction</span>
        </div>)}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }}/>
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `₹${value}`}/>
          <Tooltip formatter={(value) => [formatCurrency(value), 'Price / Qtl']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}/>
          <Area type="monotone" dataKey="avgPrice" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>);
};
