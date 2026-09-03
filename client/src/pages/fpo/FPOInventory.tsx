import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Package, Search, Filter, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { formatCurrency } from '../../utils/format';

export default function FPOInventory() {
  const inventory = [
    { id: 'INV-001', product: 'Tomato (Grade A)', totalQty: 1500, reservedQty: 500, unit: 'KG', price: 25, status: 'In Stock', location: 'Main Godown' },
    { id: 'INV-002', product: 'Onion', totalQty: 5000, reservedQty: 5000, unit: 'KG', price: 18, status: 'Committed', location: 'Warehouse B' },
    { id: 'INV-003', product: 'Potato', totalQty: 800, reservedQty: 0, unit: 'KG', price: 15, status: 'Low Stock', location: 'Main Godown' },
    { id: 'INV-004', product: 'Wheat', totalQty: 10000, reservedQty: 2000, unit: 'KG', price: 22, status: 'In Stock', location: 'Silo A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FPO Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">Manage aggregated produce and track availability.</p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" /> Add Inventory
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Items</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">4</dd>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Value (Est.)</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">{formatCurrency(359500)}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <dl>
                <dt className="text-sm font-medium text-yellow-800 truncate">Low Stock Alerts</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-900">1</dd>
              </dl>
              <AlertCircle className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input className="pl-10" placeholder="Search inventory..." />
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listed Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => {
                const availableQty = item.totalQty - item.reservedQty;
                const reservedPercent = (item.reservedQty / item.totalQty) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.product}</div>
                      <div className="text-xs text-gray-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-64">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{availableQty} {item.unit} available</span>
                        <span className="text-gray-500">{item.reservedQty} reserved</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
                        <div className="bg-blue-500 h-1.5" style={{ width: `${100 - reservedPercent}%` }}></div>
                        <div className="bg-orange-400 h-1.5" style={{ width: `${reservedPercent}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">Total: {item.totalQty} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{formatCurrency(item.price)}</div>
                      <div className="text-xs text-gray-500">per {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        item.status === 'In Stock' ? 'success' : 
                        item.status === 'Low Stock' ? 'warning' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-blue-600">Update</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
