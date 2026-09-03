import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { Input } from '../../components/ui/Input';
import { Search, Filter, Truck, PackageCheck, Star } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

export default function BulkOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders = [
    {
      id: 'ORD-5092',
      seller: 'Nashik Farmers Co-op (FPO)',
      product: 'Onion',
      quantity: 2000,
      unit: 'KG',
      total: 56000,
      status: 'In Transit',
      payment: 'Paid',
      date: '2026-09-01',
      deliveryDate: '2026-09-05'
    },
    {
      id: 'ORD-5088',
      seller: 'Ramesh Patel',
      product: 'Tomato',
      quantity: 300,
      unit: 'KG',
      total: 7800,
      status: 'Delivered',
      payment: 'Paid',
      date: '2026-08-28',
      deliveryDate: '2026-08-30'
    },
    {
      id: 'ORD-5045',
      seller: 'Green Valley FPO',
      product: 'Potato',
      quantity: 1500,
      unit: 'KG',
      total: 27000,
      status: 'Processing',
      payment: 'Pending',
      date: '2026-09-03',
      deliveryDate: '2026-09-08'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered': return <Badge variant="success">Delivered</Badge>;
      case 'In Transit': return <Badge variant="primary">In Transit</Badge>;
      case 'Processing': return <Badge variant="warning">Processing</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Paid': return <Badge variant="success">Paid</Badge>;
      case 'Pending': return <Badge variant="warning">Pending</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your bulk purchases.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                placeholder="Search orders..."
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID & Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product & Qty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-600 cursor-pointer hover:underline">{order.id}</div>
                    <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.seller}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.product}</div>
                    <div className="text-sm text-gray-500">{order.quantity} {order.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                    {order.status === 'In Transit' && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Truck className="h-3 w-3 mr-1" /> Est: {formatDate(order.deliveryDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPaymentBadge(order.payment)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {order.status === 'In Transit' ? (
                      <Button variant="outline" size="sm" className="w-full text-xs">Track</Button>
                    ) : order.status === 'Delivered' ? (
                      <Button variant="outline" size="sm" className="w-full text-xs text-yellow-600 border-yellow-200 hover:bg-yellow-50">
                        <Star className="mr-1 h-3 w-3" /> Rate
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="w-full text-xs">Details</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
