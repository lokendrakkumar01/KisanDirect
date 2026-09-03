import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Badge } from '../../components/ui/Badge';

export default function AdminAnalytics() {
    const [timeframe, setTimeframe] = useState('Last 30 Days');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Advanced Platform Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time trade volume, price realizations, and market efficiency</p>
                </div>
                <select 
                    value={timeframe} 
                    onChange={(e) => setTimeframe(e.target.value)} 
                    className="border rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last Quarter">Last Quarter</option>
                    <option value="Year to Date">Year to Date</option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Produce Sold', val: '245 Tons' },
                    { label: 'Avg Order Value', val: '₹4,500' },
                    { label: 'Direct Trades', val: '68%' },
                    { label: 'Logistics Savings', val: '36%' }
                ].map((s, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500 font-medium mb-1">{s.label}</p>
                            <p className="text-2xl font-bold text-green-700">{s.val}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Price Realization (Farmer realization vs APMC Mandi)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <AnalyticsChart type="bar" data={[
                            { name: 'Onion (₹/kg)', value: 25 },
                            { name: 'Tomato (₹/kg)', value: 40 },
                            { name: 'Potato (₹/kg)', value: 20 },
                            { name: 'Wheat (₹/kg)', value: 26 },
                            { name: 'Grapes (₹/kg)', value: 65 }
                        ]}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Supply vs Demand Gap Index</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <AnalyticsChart type="line" data={[
                            { name: 'Week 1', value: 10 },
                            { name: 'Week 2', value: 15 },
                            { name: 'Week 3', value: 8 },
                            { name: 'Week 4', value: 12 }
                        ]}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export { AdminAnalytics };
