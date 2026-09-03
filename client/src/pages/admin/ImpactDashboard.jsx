import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Sprout, TrendingDown, Users, Truck } from 'lucide-react';

export default function ImpactDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Platform Socio-Economic Impact</h1>
                    <p className="text-gray-500">Measuring direct farmer realization, carbon savings, and supply chain efficiency</p>
                </div>
                <Badge variant="warning" className="text-sm px-3 py-1">SIH 2026 Impact Simulation</Badge>
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm mb-6">
                <strong>Note for SIH 2026 Evaluators:</strong> These metrics simulate platform performance under Department of Consumer Affairs (DoCA) Problem Statement 26033 guidelines.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Sprout className="w-8 h-8 text-green-500 mb-4"/>
                        <p className="text-sm text-gray-500 font-medium">Direct Farmer Transactions</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">1,240</p>
                        <p className="text-xs text-green-600 mt-2">+35% price realization</p>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardContent className="p-6">
                        <TrendingDown className="w-8 h-8 text-blue-500 mb-4"/>
                        <p className="text-sm text-gray-500 font-medium">Logistics Distance Saved</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">36%</p>
                        <p className="text-xs text-blue-600 mt-2">Est. Carbon emission reduction</p>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Truck className="w-8 h-8 text-orange-500 mb-4"/>
                        <p className="text-sm text-gray-500 font-medium">Logistics Cost Savings</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">₹2.8 / KG</p>
                        <p className="text-xs text-orange-600 mt-2">Via Nearest Neighbor AI</p>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardContent className="p-6">
                        <Users className="w-8 h-8 text-purple-500 mb-4"/>
                        <p className="text-sm text-gray-500 font-medium">FPO Participation</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">42</p>
                        <p className="text-xs text-purple-600 mt-2">Active farmer collectives</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Farmer Realization Rate (% of Buyer Payment)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <AnalyticsChart type="bar" data={[
                            { name: 'Traditional APMC Mandi', value: 40 },
                            { name: 'AgroConnect Direct', value: 85 }
                        ]}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cumulative Produce Traded (Tons)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <AnalyticsChart type="line" data={[
                            { name: 'Month 1', value: 2 },
                            { name: 'Month 2', value: 5 },
                            { name: 'Month 3', value: 10 },
                            { name: 'Month 4', value: 18.5 }
                        ]}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export { ImpactDashboard };
