import React from 'react';
import { Card, CardHeader, CardBody, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDate } from '../../utils/format';

export const FarmerEarnings: React.FC = () => {
  const earningsData = [
    { month: 'Jan', gross: 40000, net: 38000 },
    { month: 'Feb', gross: 30000, net: 28500 },
    { month: 'Mar', gross: 45000, net: 42750 },
    { month: 'Apr', gross: 50000, net: 47500 },
    { month: 'May', gross: 35000, net: 33250 },
    { month: 'Jun', gross: 60000, net: 57000 },
  ];

  const transactions = [
    { id: 'TXN-001', date: new Date().toISOString(), type: 'Settlement', order: 'ORD-2026-001', amount: 1750, status: 'completed' },
    { id: 'TXN-002', date: new Date(Date.now() - 86400000).toISOString(), type: 'Settlement', order: 'ORD-2026-002', amount: 3200, status: 'completed' },
    { id: 'TXN-003', date: new Date(Date.now() - 172800000).toISOString(), type: 'Settlement', order: 'ORD-2026-003', amount: 840, status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings & Payments</h1>
          <p className="text-gray-500 mt-1">Track your revenue, deductions, and payouts.</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Download Statement</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Gross Sales" value={formatCurrency(260000)} icon={<TrendingUp className="w-6 h-6" />} trend={{ value: 15, isPositive: true }} />
        <StatCard title="Logistics Deductions" value={formatCurrency(12000)} />
        <StatCard title="Platform Fees" value={formatCurrency(5200)} />
        <StatCard title="Net Realization" value={formatCurrency(242800)} className="border-green-200 bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Earnings Over Time</h2>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                    <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="gross" name="Gross Sales" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="net" name="Net Realization" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Payment Status</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed Payments</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(238650)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Payments</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(4150)}</p>
                <p className="text-xs text-gray-400 mt-1">Expected settlement in 2-3 business days</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Product Value</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-500">Platform Fee</span>
                    <span className="text-red-500">-2.0%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-gray-100">
                    <span>Your Realization</span>
                    <span className="text-green-600">98.0%</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(txn.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline">{txn.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(txn.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FarmerEarnings;
