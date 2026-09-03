import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';
export default function FPOOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const orders = [
        {
            id: 'ORD-5092',
            buyer: 'FreshMart Chains',
            product: 'Onion',
            quantity: 5000,
            unit: 'KG',
            total: 90000,
            status: 'Processing',
            payment: 'Pending',
            date: '2026-09-02',
            membersInvolved: 28
        },
        {
            id: 'ORD-5090',
            buyer: 'Hotel Taj',
            product: 'Tomato',
            quantity: 1000,
            unit: 'KG',
            total: 24000,
            status: 'In Transit',
            payment: 'Paid',
            date: '2026-08-30',
            membersInvolved: 8
        },
        {
            id: 'ORD-5075',
            buyer: 'Urban Grocers',
            product: 'Potato',
            quantity: 2000,
            unit: 'KG',
            total: 30000,
            status: 'Delivered',
            payment: 'Paid',
            date: '2026-08-25',
            membersInvolved: 15
        }
    ];
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FPO Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Manage incoming bulk orders and member payouts.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400"/>
              </div>
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" placeholder="Search orders or buyers..."/>
            </div>
            <div className="flex gap-2">
              <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 border">
                <option>All Status</option>
                <option>Processing</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        </CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID & Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product & Qty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount & Payout</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (<tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-600">{order.id}</div>
                    <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.buyer}</div>
                    <Badge variant="outline" className="mt-1 text-xs">Bulk Buyer</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.product}</div>
                    <div className="text-sm text-gray-500">{order.quantity} {order.unit}</div>
                    <div className="text-xs text-blue-600 mt-1">{order.membersInvolved} farmers involved</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-bold">{formatCurrency(order.total)}</div>
                    <div className="flex items-center mt-1">
                      {order.payment === 'Paid' ? (<span className="inline-flex items-center text-xs text-green-600 font-medium">
                          <CheckCircle2 className="h-3 w-3 mr-1"/> Payment Received
                        </span>) : (<span className="inline-flex items-center text-xs text-yellow-600 font-medium">
                          <AlertCircle className="h-3 w-3 mr-1"/> Payment Pending
                        </span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={order.status === 'Delivered' ? 'success' :
                order.status === 'In Transit' ? 'primary' : 'warning'}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex flex-col gap-2 justify-end">
                      <Button variant="outline" size="sm" className="h-8">Details</Button>
                      {order.status === 'Delivered' && order.payment === 'Paid' && (<Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">Distribute Payout</Button>)}
                      {order.status === 'Processing' && (<Button size="sm" className="h-8">Dispatch</Button>)}
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>);
}
