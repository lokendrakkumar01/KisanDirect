import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Layers, Plus, TrendingUp, Check, Users, Leaf, Save, Share } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export default function AggregationPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const aggregations = [
    { id: 'AGG-001', crop: 'Tomato (Grade A)', target: 2000, current: 1500, price: 25, unit: 'KG', members: 12, status: 'In Progress' },
    { id: 'AGG-002', crop: 'Onion', target: 5000, current: 5000, price: 18, unit: 'KG', members: 28, status: 'Listed' },
    { id: 'AGG-003', crop: 'Potato', target: 3000, current: 3000, price: 15, unit: 'KG', members: 15, status: 'Completed' }
  ];

  const contributions = [
    { name: 'Ramesh Patel', qty: 500 },
    { name: 'Suresh Kumar', qty: 450 },
    { name: 'Anita Desai', qty: 300 },
    { name: 'Vijay Singh', qty: 250 },
  ];

  const CreateAggregationForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Aggregation Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop to Aggregate</label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
              <option>Tomato</option>
              <option>Onion</option>
              <option>Potato</option>
              <option>Wheat</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
              <option>Grade A (Premium)</option>
              <option>Grade B (Standard)</option>
              <option>Grade C (Processing)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Qty (KG)</label>
              <Input type="number" defaultValue="2000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹/KG)</label>
              <Input type="number" defaultValue="25" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 flex justify-between items-center">
            Member Contributions
            <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" /> Add</Button>
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-3">
              {contributions.map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs mr-2">
                      {c.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue={c.qty} className="w-20 h-8 text-right" />
                    <span className="text-sm text-gray-500">KG</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center font-bold">
              <span>Total Current</span>
              <span className="text-primary-600">1500 / 2000 KG</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
          <Save className="h-4 w-4 mr-2" /> Save Draft
        </Button>
        <Button onClick={() => setIsCreating(false)}>
          <Share className="h-4 w-4 mr-2" /> Create & Publish Listing
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crop Aggregations</h1>
          <p className="mt-1 text-sm text-gray-500">Pool produce from multiple farmers to fulfill bulk orders.</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Aggregation
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New Aggregation</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateAggregationForm />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex space-x-2 border-b border-gray-200">
            {['Active', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setActiveTab(status.toLowerCase())}
                className={`px-4 py-2 border-b-2 text-sm font-medium ${
                  activeTab === status.toLowerCase() 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aggregations
              .filter(a => activeTab === 'active' ? a.status !== 'Completed' : a.status === 'Completed')
              .map(agg => (
              <Card key={agg.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="pb-2 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{agg.crop}</CardTitle>
                      <p className="text-xs text-gray-500 mt-1">{agg.id}</p>
                    </div>
                    <Badge variant={
                      agg.status === 'Listed' ? 'success' : 
                      agg.status === 'Completed' ? 'secondary' : 'primary'
                    }>
                      {agg.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-gray-600">{agg.current} / {agg.target} {agg.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${agg.current >= agg.target ? 'bg-green-500' : 'bg-primary-500'}`} 
                        style={{ width: `${Math.min((agg.current / agg.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> Expected Price</p>
                      <p className="font-semibold text-gray-900 mt-1">{formatCurrency(agg.price)}/{agg.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 flex items-center"><Users className="h-3 w-3 mr-1" /> Contributors</p>
                      <p className="font-semibold text-gray-900 mt-1">{agg.members} Farmers</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t flex gap-2">
                  <Button variant="outline" className="flex-1 text-sm h-9">Manage</Button>
                  {agg.status === 'In Progress' && (
                    <Button className="flex-1 text-sm h-9">Publish</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
