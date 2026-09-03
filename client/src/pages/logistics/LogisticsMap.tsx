import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Map as MapIcon, Filter } from 'lucide-react';
import { MapView } from '../../components/map/MapView';

export default function LogisticsMap() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Live Logistics Map</h1>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border">
          <Filter className="w-4 h-4 text-gray-500" />
          <label className="text-sm flex items-center gap-1"><input type="checkbox" defaultChecked /> Farmers</label>
          <label className="text-sm flex items-center gap-1"><input type="checkbox" defaultChecked /> Buyers</label>
          <label className="text-sm flex items-center gap-1"><input type="checkbox" defaultChecked /> Vehicles</label>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden">
        <div className="h-full relative bg-gray-100 flex flex-col items-center justify-center">
          <Badge variant="warning" className="absolute top-4 right-4 z-10 shadow-md">Prototype Simulation</Badge>
          <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md border text-xs space-y-2">
             <div className="font-semibold mb-1">Legend</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Farmer / Pickup</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Buyer / Destination</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Active Vehicle</div>
          </div>
          
          <div className="text-center text-gray-500">
            <MapIcon className="w-16 h-16 mx-auto mb-2 opacity-30" />
            <p className="text-lg">MapView Component</p>
            <p className="text-sm">Centers on Maharashtra region</p>
          </div>
          {/* <MapView center={[19.0760, 72.8777]} zoom={7} /> */}
        </div>
      </Card>
    </div>
  );
}
