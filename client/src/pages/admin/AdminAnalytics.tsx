import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Badge } from '../../components/ui/Badge';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Advanced Analytics</h1>
        <select className="border rounded-lg px-4 py-2 text-sm bg-white shadow-sm">
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Produce Sold', val: '245 Tons' },
          { label: 'Avg Order Value', val: '₹4,500' },
          { label: 'Direct Trades', val: '68%' },
          { label: 'Logistics Cost/Kg', val: '₹2.5' }
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{s.val}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Realization (Farmer vs Market)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart 
              type="bar" 
              data={[
                { name: 'Onion', value: 25 },
                { name: 'Tomato', value: 40 },
                { name: 'Potato', value: 20 }
              ]} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supply vs Demand Gap</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart 
              type="line" 
              data={[
                { name: 'W1', value: 10 },
                { name: 'W2', value: 15 },
                { name: 'W3', value: 8 },
                { name: 'W4', value: 12 }
              ]} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
