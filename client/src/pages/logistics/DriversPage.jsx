import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Star } from 'lucide-react';
const drivers = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'MH15 AB 1234', status: 'available', rating: 4.8, trips: 124 },
    { id: 2, name: 'Suresh Patil', phone: '+91 87654 32109', vehicle: 'MH12 CD 5678', status: 'on_delivery', rating: 4.5, trips: 89 },
    { id: 3, name: 'Amit Singh', phone: '+91 76543 21098', vehicle: 'Unassigned', status: 'off_duty', rating: 4.9, trips: 210 },
];
export default function DriversPage() {
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Driver Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4"/> Add Driver
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Driver Info</th>
                  <th className="p-4 font-medium text-gray-600">Vehicle Assigned</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Performance</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {drivers.map(d => (<tr key={d.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{d.name}</div>
                      <div className="text-xs text-gray-500">{d.phone}</div>
                    </td>
                    <td className="p-4">{d.vehicle}</td>
                    <td className="p-4">
                      <Badge variant={d.status === 'available' ? 'success' :
                d.status === 'on_delivery' ? 'warning' : 'default'}>
                        {d.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current"/>
                        <span className="font-medium">{d.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{d.trips} trips</div>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Manage</Button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>);
}
