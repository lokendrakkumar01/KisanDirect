import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ShoppingBag, Package, IndianRupee, AlertCircle, Search, ClipboardList } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
export default function BuyerDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // Mock data for dashboard
    const stats = {
        activeRequirements: 3,
        offersReceived: 12,
        activeOrders: 5,
        completedOrders: 48,
        totalSpend: 1250000
    };
    const activeRequirements = [
        { id: 'REQ-001', crop: 'Tomato (Grade A)', quantity: 500, unit: 'KG', targetPrice: 25, status: 'Matching', date: '2026-09-03', offers: 3 },
        { id: 'REQ-002', crop: 'Potato', quantity: 1000, unit: 'KG', targetPrice: 18, status: 'Open', date: '2026-09-02', offers: 1 },
        { id: 'REQ-003', crop: 'Onion', quantity: 2000, unit: 'KG', targetPrice: 30, status: 'Closing Soon', date: '2026-09-01', offers: 8 }
    ];
    const recentOffers = [
        { id: 'OFF-101', requirementId: 'REQ-001', seller: 'Green Valley FPO', price: 24, matchScore: 95, distance: '12 km' },
        { id: 'OFF-102', requirementId: 'REQ-003', seller: 'Ramesh Patel', price: 29, matchScore: 88, distance: '8 km' },
    ];
    useEffect(() => {
        // Simulate API call
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'Buyer'}</h1>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-gray-500">Manage your bulk purchases and requirements.</p>
            <Badge variant="success">Restaurant Chain</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/buyer/find-produce')}>
            <Search className="mr-2 h-4 w-4"/> Find Produce
          </Button>
          <Button onClick={() => navigate('/buyer/post-requirement')}>
            <ClipboardList className="mr-2 h-4 w-4"/> Post Requirement
          </Button>
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-primary-600"/>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary-800">New Matches Available</h3>
            <div className="mt-2 text-sm text-primary-700">
              <p>3 nearby sellers can fulfill your requirement REQ-001 (Tomato). <span className="font-semibold text-primary-900 cursor-pointer hover:underline" onClick={() => navigate('/buyer/offers')}>View Offers</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                <ClipboardList className="h-6 w-6 text-blue-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Active Requirements</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.activeRequirements}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                <AlertCircle className="h-6 w-6 text-purple-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Offers Received</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.offersReceived}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-yellow-50 p-3">
                <Package className="h-6 w-6 text-yellow-600"/>
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
              <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                <ShoppingBag className="h-6 w-6 text-green-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Completed Orders</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.completedOrders}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-red-50 p-3">
                <IndianRupee className="h-6 w-6 text-red-600"/>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Spend</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalSpend)}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Requirements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Requirements</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/requirements')}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRequirements.map((req) => (<div key={req.id} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{req.crop}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{req.quantity} {req.unit}</span>
                      <span>&bull;</span>
                      <span>Target: {formatCurrency(req.targetPrice)}/{req.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={req.status === 'Matching' ? 'success' : req.status === 'Open' ? 'primary' : 'warning'}>
                      {req.status}
                    </Badge>
                    <p className="mt-1 text-sm text-gray-500">{req.offers} offers</p>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Offers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Offers</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/offers')}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOffers.map((offer) => (<div key={offer.id} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{offer.seller}</p>
                      <Badge variant="outline" className="text-xs">FPO</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{offer.distance} away</span>
                      <span>&bull;</span>
                      <span className="font-medium text-green-600">{offer.matchScore}% Match</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(offer.price)}/KG</p>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-1" onClick={() => navigate(`/buyer/offers/${offer.id}`)}>
                      Review Offer
                    </Button>
                  </div>
                </div>))}
              {recentOffers.length === 0 && (<div className="text-center py-6 text-gray-500">
                  No recent offers to display.
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
