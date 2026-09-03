import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Users, Package, ShoppingCart, IndianRupee, AlertCircle, Layers } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';
export default function FPODashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const stats = {
        members: 145,
        aggregatedProduce: 12500, // KG
        activeOrders: 8,
        revenue: 450000,
        pendingOrders: 3
    };
    const activeAggregations = [
        { id: 'AGG-001', crop: 'Tomato', target: 2000, current: 1500, unit: 'KG', members: 12, status: 'In Progress' },
        { id: 'AGG-002', crop: 'Onion', target: 5000, current: 5000, unit: 'KG', members: 28, status: 'Listed' }
    ];
    const recentOrders = [
        { id: 'ORD-5092', buyer: 'FreshMart Chains', product: 'Onion', amount: 56000, status: 'Processing', date: '2026-09-02' },
        { id: 'ORD-5090', buyer: 'Hotel Taj', product: 'Tomato', amount: 24000, status: 'Delivered', date: '2026-08-30' }
    ];
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);
    if (loading) {
        return (<div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <LoadingSpinner size="lg"/>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Green Valley FPO'}</h1>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-gray-500">Reg No: FPO-MH-2023-4458</p>
            <Badge variant="success">Verified FPO</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/fpo/members')}>
            <Users className="mr-2 h-4 w-4"/> Add Member
          </Button>
          <Button onClick={() => navigate('/fpo/aggregations')}>
            <Layers className="mr-2 h-4 w-4"/> New Aggregation
          </Button>
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary-600"/>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <div>
              <h3 className="text-sm font-medium text-primary-800">New Buyer Requirement Matched!</h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>A buyer is looking for 500 KG of Tomato near your location. Your current inventory matches this requirement.</p>
              </div>
            </div>
            <div className="mt-3 md:mt-0 md:ml-6">
              <Button size="sm" onClick={() => navigate('/fpo/opportunities')}>View Requirement</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                <Users className="h-6 w-6 text-blue-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Members</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.members}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                <Package className="h-6 w-6 text-green-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Aggregated Produce</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatNumber(stats.aggregatedProduce)} KG</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-yellow-50 p-3">
                <ShoppingCart className="h-6 w-6 text-yellow-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Active Orders</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.activeOrders}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                <IndianRupee className="h-6 w-6 text-purple-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Revenue (Monthly)</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Aggregations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Aggregations</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/fpo/aggregations')}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAggregations.map((agg) => (<div key={agg.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">{agg.crop}</h4>
                    <Badge variant={agg.status === 'Listed' ? 'success' : 'primary'}>{agg.status}</Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{agg.current} {agg.unit} collected</span>
                      <span>Target: {agg.target} {agg.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${agg.current >= agg.target ? 'bg-green-500' : 'bg-primary-500'}`} style={{ width: `${Math.min((agg.current / agg.target) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1"/> {agg.members} members contributed
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/fpo/orders')}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (<div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{order.buyer}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{order.product}</span>
                      <span>&bull;</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                    <Badge className="mt-1" variant={order.status === 'Delivered' ? 'success' : 'warning'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
