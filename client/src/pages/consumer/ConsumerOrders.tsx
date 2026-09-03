import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

export const ConsumerOrders: React.FC = () => {
  // Mock data
  const orders = [
    {
      id: 'ord1',
      orderNumber: 'ORD-2026-092',
      items: [
        { name: 'Fresh Tomatoes', quantity: 5, unit: 'KG' },
        { name: 'Onions', quantity: 10, unit: 'KG' }
      ],
      total: 455,
      status: 'in_transit',
      createdAt: new Date().toISOString()
    },
    {
      id: 'ord2',
      orderNumber: 'ORD-2026-085',
      items: [
        { name: 'Potatoes (Grade A)', quantity: 20, unit: 'KG' }
      ],
      total: 540,
      status: 'delivered',
      createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start exploring farm-fresh produce.</p>
          <Button onClick={() => window.location.href = '/marketplace'}>Browse Marketplace</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="overflow-hidden hover:border-gray-300 transition-colors">
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                <div>
                  <span className="text-sm font-medium text-gray-500 mr-4">Order Placed: {formatDate(order.createdAt)}</span>
                  <span className="text-sm font-medium text-gray-500">Total: {formatCurrency(order.total)}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 text-right">
                  Order # {order.orderNumber}
                </div>
              </div>
              
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <div className="mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-900 font-medium space-y-1">
                    {order.items.map((item, i) => (
                      <p key={i}>{item.name} x {item.quantity} {item.unit}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 w-full md:w-auto">
                  {order.status === 'delivered' ? (
                    <Button variant="outline" className="w-full md:w-auto">Rate Seller</Button>
                  ) : (
                    <Button 
                      className="w-full md:w-auto" 
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                      onClick={() => window.location.href = `/consumer/tracking/${order.id}`}
                    >
                      Track Order
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full md:w-auto text-green-600">Buy Again</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsumerOrders;
