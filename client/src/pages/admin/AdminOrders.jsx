import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search } from 'lucide-react';
export default function AdminOrders() {
    const mockOrders = [
        { id: 'ORD-9001', buyer: 'Fresh Mart', seller: 'Suresh P.', product: 'Onions (500kg)', total: '₹12,500', status: 'Completed', payment: 'Paid', date: '2026-09-02' },
        { id: 'ORD-9002', buyer: 'Rahul Sharma', seller: 'Nashik FPO', product: 'Tomatoes (50kg)', total: '₹1,500', status: 'Processing', payment: 'Pending', date: '2026-09-03' },
    ];
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Platform Orders</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"/>
            </div>
            <select className="border rounded-lg px-4 py-2 text-sm bg-white">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Order ID</th>
                  <th className="p-4 font-medium text-gray-600">Buyer / Seller</th>
                  <th className="p-4 font-medium text-gray-600">Product</th>
                  <th className="p-4 font-medium text-gray-600">Total</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Date</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockOrders.map(o => (<tr key={o.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{o.id}</td>
                    <td className="p-4">
                      <div className="text-gray-900">B: {o.buyer}</div>
                      <div className="text-gray-500 text-xs">S: {o.seller}</div>
                    </td>
                    <td className="p-4">{o.product}</td>
                    <td className="p-4 font-medium">{o.total}</td>
                    <td className="p-4">
                      <Badge variant={o.status === 'Completed' ? 'success' : 'warning'}>{o.status}</Badge>
                    </td>
                    <td className="p-4 text-gray-500">{o.date}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>);
}
