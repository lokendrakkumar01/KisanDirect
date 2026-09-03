import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, TrendingUp, CheckCircle, CreditCard, ArrowRight, Sun, BrainCircuit } from 'lucide-react';
import { getProfile, getListings, getEarnings, getHarvests } from '../../services/farmerService';
import { getMarketInsight } from '../../services/aiService';
import { formatCurrency, formatDate } from '../../utils/format';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [insight, setInsight] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, listingsRes, earningsRes, harvestsRes, insightRes] = await Promise.all([
          getProfile(),
          getListings(),
          getEarnings(),
          getHarvests(),
          getMarketInsight('Tomato')
        ]);
        
        setData({
          profile: profileRes.data,
          listings: listingsRes.data || [],
          earnings: earningsRes.data || { total: 0, pending: 0 },
          harvests: harvestsRes.data || []
        });
        
        setInsight(insightRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your farm today.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<BrainCircuit className="w-4 h-4" />}>AI Insights</Button>
          <Button leftIcon={<Package className="w-4 h-4" />}>Add Produce</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produce Listed"
          value={data?.listings.length || 0}
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Active Orders"
          value={3} // Mock
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(data?.earnings.total || 0)}
          icon={<CheckCircle className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Payments"
          value={formatCurrency(data?.earnings.pending || 0)}
          icon={<CreditCard className="w-6 h-6" />}
        />
      </div>

      {insight && (
        <Card className="border-green-200 bg-green-50 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5" />
              <h3 className="font-semibold">AI Market Insight: {insight.crop}</h3>
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Prototype AI Prediction
            </span>
          </div>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Expected Demand</p>
                <p className="text-xl font-bold text-gray-900">{insight.expectedDemand} KG</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Listed Supply</p>
                <p className="text-xl font-bold text-gray-900">{insight.currentSupply} KG</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Demand-Supply Gap</p>
                <p className="text-xl font-bold text-amber-600">{insight.demandSupplyGap} KG</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trend</p>
                <p className="text-xl font-bold text-green-600">+{insight.trendPercentage}%</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-green-100 flex items-start">
              <Sun className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Recommendation</p>
                <p className="text-gray-600 text-sm mt-1">{insight.recommendation}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>View All</Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mock data for now */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-092</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tomato (100 KG)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(3500)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Upcoming Harvests</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {data?.harvests.length > 0 ? (
                data.harvests.map((harvest: any) => (
                  <div key={harvest.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{harvest.crop}</p>
                      <p className="text-sm text-gray-500">{formatDate(harvest.expectedDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{harvest.estimatedQuantity} {harvest.unit}</p>
                      <p className="text-xs text-blue-600 capitalize">{harvest.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No upcoming harvests.</p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
