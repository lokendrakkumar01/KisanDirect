import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { IndianRupee, TrendingUp, Package, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export default function BuyerAnalytics() {
  const stats = {
    totalSpend: 1250000,
    averagePrice: 24.5,
    totalOrders: 48,
    uniqueSuppliers: 12
  };

  const spendData = [
    { name: 'Apr', value: 150000 },
    { name: 'May', value: 180000 },
    { name: 'Jun', value: 210000 },
    { name: 'Jul', value: 190000 },
    { name: 'Aug', value: 240000 },
    { name: 'Sep', value: 280000 }
  ];

  const suppliers = [
    { name: 'Green Valley FPO', orders: 15, spend: 450000, rating: 4.8 },
    { name: 'Nashik Farmers Co-op', orders: 12, spend: 380000, rating: 4.9 },
    { name: 'Pune District FPO', orders: 8, spend: 210000, rating: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Procurement Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Track your bulk buying performance and spend.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                <IndianRupee className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Spend (YTD)</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalSpend)}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Avg. Price/KG (Tomato)</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.averagePrice)}</dd>
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
                  <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Unique Suppliers</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.uniqueSuppliers}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spend Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AnalyticsChart data={spendData} title="Monthly Spend (₹)" type="bar" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Suppliers by Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                    <p className="text-sm text-gray-500">{supplier.orders} orders completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(supplier.spend)}</p>
                    <div className="flex items-center justify-end mt-1 text-sm text-yellow-600">
                      ★ {supplier.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
