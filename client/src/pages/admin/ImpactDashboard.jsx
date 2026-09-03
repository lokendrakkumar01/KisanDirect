import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Sprout, TrendingDown, Users, Truck } from 'lucide-react';
export default function ImpactDashboard() {
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Impact</h1>
          <p className="text-gray-500">Measuring the socio-economic impact of AgroConnect</p>
        </div>
        <Badge variant="warning" className="text-sm px-3 py-1">Prototype Simulation</Badge>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm mb-6">
        <strong>Note for SIH Judges:</strong> These metrics are prototype simulations for demonstration purposes to showcase the potential impact of the AgroConnect platform at scale.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <Sprout className="w-8 h-8 text-green-500 mb-4"/>
            <p className="text-sm text-gray-500 font-medium">Direct Transactions</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1,240</p>
            <p className="text-xs text-green-600 mt-2">+15% vs traditional</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <TrendingDown className="w-8 h-8 text-blue-500 mb-4"/>
            <p className="text-sm text-gray-500 font-medium">Logistics Distance Saved</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">22%</p>
            <p className="text-xs text-blue-600 mt-2">Est. Carbon reduction</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <Truck className="w-8 h-8 text-orange-500 mb-4"/>
            <p className="text-sm text-gray-500 font-medium">Delivery Cost Reduction</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">15%</p>
            <p className="text-xs text-orange-600 mt-2">Due to AI Optimization</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-purple-500 mb-4"/>
            <p className="text-sm text-gray-500 font-medium">FPO Participation</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">42</p>
            <p className="text-xs text-purple-600 mt-2">Active collectives</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Income Realization</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart type="bar" data={[
            { name: 'Traditional', value: 40 },
            { name: 'AgroConnect', value: 75 }
        ]}/>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Produce Traded (Tons)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart type="line" data={[
            { name: 'M1', value: 2 },
            { name: 'M2', value: 5 },
            { name: 'M3', value: 10 },
            { name: 'M4', value: 18.5 }
        ]}/>
          </CardContent>
        </Card>
      </div>
    </div>);
}
