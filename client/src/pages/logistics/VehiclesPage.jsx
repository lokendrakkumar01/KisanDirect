import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Truck, Plus } from 'lucide-react';
const vehicles = [
    { id: 'MH15 AB 1234', type: 'Mini Truck', capacity: '1000 kg', status: 'available' },
    { id: 'MH12 CD 5678', type: 'Heavy Truck', capacity: '5000 kg', status: 'in_use' },
    { id: 'MH04 EF 9012', type: 'Pickup', capacity: '500 kg', status: 'maintenance' },
];
export default function VehiclesPage() {
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4"/> Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(v => (<Card key={v.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Truck className="w-8 h-8 text-gray-600"/>
                </div>
                <Badge variant={v.status === 'available' ? 'success' :
                v.status === 'in_use' ? 'warning' : 'destructive'}>
                  {v.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{v.id}</h3>
              <p className="text-sm text-gray-500">{v.type} • Capacity: {v.capacity}</p>
              
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1">Edit</Button>
                <Button variant="outline" className="flex-1">Assign</Button>
              </div>
            </CardContent>
          </Card>))}
      </div>
    </div>);
}
