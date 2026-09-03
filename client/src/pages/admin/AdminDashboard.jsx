import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Users, ShoppingBag, Activity } from 'lucide-react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Badge } from '../../components/ui/Badge';
export default function AdminDashboard() {
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Platform Admin Dashboard</h1>
        <Badge variant="success" className="text-sm px-3 py-1">System Healthy</Badge>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-200 text-green-700 rounded-lg">
              <Users className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-sm text-green-800 font-medium">Total Farmers</p>
              <p className="text-2xl font-bold text-green-900">12,450</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-200 text-blue-700 rounded-lg">
              <Users className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">FPOs</p>
              <p className="text-2xl font-bold text-blue-900">342</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-200 text-orange-700 rounded-lg">
              <ShoppingBag className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-sm text-orange-800 font-medium">Active Orders</p>
              <p className="text-2xl font-bold text-orange-900">1,890</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-200 text-purple-700 rounded-lg">
              <Activity className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-sm text-purple-800 font-medium">Transactions</p>
              <p className="text-2xl font-bold text-purple-900">₹4.2 Cr</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Orders</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <AnalyticsChart type="line" data={[
            { name: 'Mon', value: 120 },
            { name: 'Tue', value: 150 },
            { name: 'Wed', value: 180 },
            { name: 'Thu', value: 140 },
            { name: 'Fri', value: 210 },
            { name: 'Sat', value: 250 },
            { name: 'Sun', value: 290 }
        ]}/>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Crops</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <AnalyticsChart type="pie" data={[
            { name: 'Onions', value: 35 },
            { name: 'Tomatoes', value: 25 },
            { name: 'Potatoes', value: 20 },
            { name: 'Wheat', value: 15 },
            { name: 'Others', value: 5 }
        ]}/>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <AnalyticsChart type="bar" data={[
            { name: 'Jan', value: 1000 },
            { name: 'Feb', value: 1500 },
            { name: 'Mar', value: 2200 },
            { name: 'Apr', value: 3100 },
            { name: 'May', value: 4500 }
        ]}/>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
            { t: 'New FPO Registered: Nashik Farmers Org', time: '10 mins ago' },
            { t: 'Large Bulk Order placed: 5000kg Wheat', time: '1 hour ago' },
            { t: 'Route optimization saved 45km', time: '2 hours ago' },
            { t: 'System maintenance scheduled', time: '5 hours ago' }
        ].map((act, i) => (<div key={i} className="flex gap-3 text-sm">
                  <div className="mt-0.5"><Activity className="w-4 h-4 text-gray-400"/></div>
                  <div>
                    <p className="text-gray-800">{act.t}</p>
                    <p className="text-xs text-gray-500">{act.time}</p>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
