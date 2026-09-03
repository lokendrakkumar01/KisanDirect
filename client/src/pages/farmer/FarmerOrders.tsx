import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusTimeline } from '../../components/ui/StatusTimeline';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

export const FarmerOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock data
  const orders = [
    {
      id: 'ord1',
      orderNumber: 'ORD-2026-001',
      buyerName: 'Fresh Mart',
      productName: 'Tomato',
      quantity: 50,
      unit: 'KG',
      total: 1750,
      status: 'confirmed',
      paymentStatus: 'successful',
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage your customer orders and track deliveries.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200">
          {['all', 'active', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize ${activeTab === tab ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500" />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="overflow-hidden">
            <div 
              className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">
                  {order.productName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-500">{order.buyerName} • {formatDate(order.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{order.quantity} {order.unit}</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(order.total)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {order.status.replace('_', ' ')}
                  </span>
                  {expandedOrder === order.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
            </div>
            
            {expandedOrder === order.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Status</h4>
                  <StatusTimeline currentStatus={order.status as any} />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Payment Information</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className="text-sm font-medium text-green-600 capitalize">{order.paymentStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Amount</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" fullWidth>Download Invoice</Button>
                    <Button fullWidth>Contact Buyer</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerOrders;
