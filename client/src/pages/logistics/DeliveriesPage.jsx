import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MapPin, Truck } from 'lucide-react';
const mockDeliveries = [
    { id: 'DEL-1001', orderId: 'ORD-5050', product: 'Onions (500kg)', pickup: 'Nashik Farm', destination: 'Pune Market', distance: '210 km', status: 'in_transit', driver: 'Rajesh K.' },
    { id: 'DEL-1002', orderId: 'ORD-5051', product: 'Tomatoes (200kg)', pickup: 'Sinnar Hub', destination: 'Mumbai Retail', distance: '180 km', status: 'pending', driver: 'Unassigned' },
    { id: 'DEL-1003', orderId: 'ORD-5052', product: 'Wheat (1000kg)', pickup: 'FPO Center', destination: 'Nagpur Bulk', distance: '450 km', status: 'delivered', driver: 'Suresh M.' },
];
export default function DeliveriesPage() {
    const [activeTab, setActiveTab] = useState('All');
    const getStatusBadge = (status) => {
        switch (status) {
            case 'delivered': return <Badge variant="success">Delivered</Badge>;
            case 'in_transit': return <Badge variant="warning">In Transit</Badge>;
            case 'pending': return <Badge variant="default">Pending</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };
    const filtered = activeTab === 'All' ? mockDeliveries : mockDeliveries.filter(d => d.status.toLowerCase().replace('_', ' ') === activeTab.toLowerCase());
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Deliveries</h1>
        <Button>Create Delivery</Button>
      </div>

      <div className="flex gap-4 border-b">
        {['All', 'Pending', 'In Transit', 'Delivered'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 px-1 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab}
          </button>))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">ID / Order</th>
                  <th className="p-4 font-medium text-gray-600">Product</th>
                  <th className="p-4 font-medium text-gray-600">Route</th>
                  <th className="p-4 font-medium text-gray-600">Driver/Vehicle</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(d => (<tr key={d.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{d.id}</div>
                      <div className="text-xs text-gray-500">{d.orderId}</div>
                    </td>
                    <td className="p-4">{d.product}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3 text-red-500"/> {d.pickup}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <MapPin className="w-3 h-3 text-green-500"/> {d.destination}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{d.distance}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400"/>
                        <span>{d.driver}</span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(d.status)}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Update</Button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>);
}
