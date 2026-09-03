import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { IndianRupee, Users, Package, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';

export default function FPOAnalytics() {
  const stats = {
    revenue: 1250000,
    members: 145,
    produceAggregated: 25000,
    orders: 48
  };

  const revenueData = [
    { name: 'Apr', value: 150000 },
    { name: 'May', value: 180000 },
    { name: 'Jun', value: 210000 },
    { name: 'Jul', value: 190000 },
    { name: 'Aug', value: 240000 },
    { name: 'Sep', value: 280000 }
  ];

  const topCrops = [
    { name: 'Onion', volume: 12000, revenue: 216000 },
    { name: 'Tomato', volume: 8000, revenue: 200000 },
    { name: 'Potato', volume: 5000, revenue: 75000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FPO Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Insights on aggregation, sales, and member performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Revenue (YTD)</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Active Members</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.members}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-yellow-50 p-3">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Aggregated (KG)</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatNumber(stats.produceAggregated)}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.orders}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AnalyticsChart data={revenueData} title="Monthly Revenue (₹)" type="line" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCrops.map((crop, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                    <p className="text-sm text-gray-500">Volume: {formatNumber(crop.volume)} KG</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(crop.revenue)}</p>
                    <p className="text-xs text-green-600 mt-1">+{Math.floor(Math.random() * 15) + 5}% YoY</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 flex items-center mb-2">
                Prototype AI Insight
              </h4>
              <p className="text-sm text-blue-800">
                Demand for Tomato is projected to increase by 20% in the next month. Consider encouraging members to increase aggregation to meet upcoming bulk buyer needs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
