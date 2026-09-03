import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RouteMap } from '../../components/map/RouteMap';
import { Map, Navigation2, Zap, ArrowRight, Truck } from 'lucide-react';

export default function RouteOptimization() {
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleOptimize = () => {
    setOptimizing(true);
    // Simulate API call
    setTimeout(() => {
      setOptimizing(false);
      setResult({
        sequence: [
          { type: 'pickup', loc: 'Nashik Farm' },
          { type: 'pickup', loc: 'Sinnar Farm' },
          { type: 'pickup', loc: 'FPO Collection Center' },
          { type: 'delivery', loc: 'Pune Restaurant' },
          { type: 'delivery', loc: 'Pune Retailer' }
        ],
        metrics: {
          before: '440',
          after: '280',
          saved: '160',
          savedPct: '36%',
          time: '5.5 hours',
          cost: '₹2,800'
        }
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI Route Optimization</h1>
          <p className="text-gray-500">Smart consolidation & routing powered by AI</p>
        </div>
        <Badge variant="warning" className="text-sm px-3 py-1">Prototype AI Prediction</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Pending Pickups (3)</label>
                <div className="space-y-2 border rounded p-2 max-h-32 overflow-y-auto bg-gray-50">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Nashik Farm (500kg)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Sinnar Farm (200kg)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> FPO Center (300kg)</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Select Delivery Points (2)</label>
                <div className="space-y-2 border rounded p-2 max-h-32 overflow-y-auto bg-gray-50">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Pune Restaurant (600kg)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Pune Retailer (400kg)</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Capacity (KG)</label>
                <input type="number" defaultValue="2000" className="w-full border rounded p-2 text-sm" />
              </div>

              <Button 
                className="w-full flex items-center justify-center gap-2" 
                onClick={handleOptimize}
                disabled={optimizing}
              >
                {optimizing ? <span className="animate-spin text-xl">⟳</span> : <Zap className="w-4 h-4" />}
                {optimizing ? 'Optimizing AI Route...' : 'Optimize Route'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-green-700 font-medium">Distance Saved</p>
                    <p className="text-2xl font-bold text-green-900">{result.metrics.saved} KM</p>
                    <p className="text-xs text-green-600 mt-1">(-{result.metrics.savedPct})</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-blue-700 font-medium">Est. Time</p>
                    <p className="text-2xl font-bold text-blue-900">{result.metrics.time}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-amber-700 font-medium">Est. Cost</p>
                    <p className="text-2xl font-bold text-amber-900">{result.metrics.cost}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 flex items-center justify-center">
                   <CardContent className="p-4 text-center">
                      <Button size="sm" className="w-full">Dispatch Now</Button>
                   </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-sm">Optimized Sequence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                      {result.sequence.map((step: any, i: number) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span className="text-xs font-bold">{i+1}</span>
                          </div>
                          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded border border-slate-200 bg-white shadow">
                            <p className="text-xs font-semibold text-slate-700 mb-1">{step.loc}</p>
                            <Badge variant={step.type === 'pickup' ? 'default' : 'success'} className="text-[10px] py-0">{step.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2 overflow-hidden flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Map className="w-4 h-4" /> Route Map
                    </CardTitle>
                  </CardHeader>
                  <div className="bg-gray-100 flex-1 min-h-[300px] flex items-center justify-center relative">
                    <p className="text-gray-400 absolute z-10 bg-white/80 px-2 py-1 rounded text-xs top-2 left-2 shadow">Prototype Simulation</p>
                    <div className="text-center text-gray-500">
                      <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Interactive Map Component</p>
                      <p className="text-xs">Showing route from Nashik → Pune</p>
                    </div>
                    {/* In a real app, <RouteMap markers={...} polyline={...} /> goes here */}
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-dashed">
              <Navigation2 className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Ready to Optimize</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-2">Select your pickup and delivery points on the left, then click Optimize Route to generate the most efficient path.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
