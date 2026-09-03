import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Filter } from 'lucide-react';
import MapView from '../../components/map/MapView';

export default function LogisticsMap() {
    const [showFarmers, setShowFarmers] = useState(true);
    const [showBuyers, setShowBuyers] = useState(true);
    const [showVehicles, setShowVehicles] = useState(true);

    const ALL_MARKERS = [
        { id: 'm1', title: 'Ramesh Patil Farm', name: 'Ramesh Patil Farm', type: 'farmer', location: { lat: 20.0059, lng: 73.7898, city: 'Nashik', state: 'Maharashtra' }, description: 'Fresh Red Tomatoes (500 KG)' },
        { id: 'm2', title: 'Sunil Shinde Orchard', name: 'Sunil Shinde Orchard', type: 'farmer', location: { lat: 20.0825, lng: 74.1086, city: 'Niphad', state: 'Maharashtra' }, description: 'Seedless Grapes (200 KG)' },
        { id: 'm3', title: 'Nashik Fresh Farmers FPO', name: 'Nashik Fresh Farmers FPO', type: 'fpo', location: { lat: 20.1582, lng: 73.9922, city: 'Pimpalgaon', state: 'Maharashtra' }, description: 'Export Red Onions (5000 KG)' },
        { id: 'm4', title: 'Pune Fresh Restaurant', name: 'Pune Fresh Restaurant', type: 'buyer', location: { lat: 18.5204, lng: 73.8567, city: 'Pune', state: 'Maharashtra' }, description: 'Bulk Buyer (Tomato & Onion)' },
        { id: 'm5', title: 'Mumbai Grand Hotel', name: 'Mumbai Grand Hotel', type: 'buyer', location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai', state: 'Maharashtra' }, description: 'Bulk Buyer (Mango & Vegetables)' },
        { id: 'm6', title: 'Logistics Truck MH-15-AB-1234', name: 'Speedy Transport 1', type: 'vehicle', location: { lat: 19.8456, lng: 73.9482, city: 'Sinnar', state: 'Maharashtra' }, description: 'In Transit to Pune' }
    ];

    const activeMarkers = ALL_MARKERS.filter(m => {
        if (m.type === 'farmer' || m.type === 'fpo') return showFarmers;
        if (m.type === 'buyer') return showBuyers;
        if (m.type === 'vehicle') return showVehicles;
        return true;
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Live Logistics Map</h1>
                    <p className="text-sm text-gray-500">Real-time agricultural supply chain tracking across Maharashtra</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-lg shadow-sm border text-xs font-semibold">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Filter className="w-4 h-4 text-gray-500"/> Layers:
                    </div>
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-800">
                        <input 
                            type="checkbox" 
                            checked={showFarmers} 
                            onChange={(e) => setShowFarmers(e.target.checked)}
                            className="rounded text-green-600 focus:ring-green-500" 
                        /> 
                        <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span> Farmers &amp; FPOs
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-800">
                        <input 
                            type="checkbox" 
                            checked={showBuyers} 
                            onChange={(e) => setShowBuyers(e.target.checked)}
                            className="rounded text-green-600 focus:ring-green-500" 
                        /> 
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span> Bulk Buyers
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-800">
                        <input 
                            type="checkbox" 
                            checked={showVehicles} 
                            onChange={(e) => setShowVehicles(e.target.checked)}
                            className="rounded text-green-600 focus:ring-green-500" 
                        /> 
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Active Vehicles
                    </label>
                </div>
            </div>

            <Card className="p-0 overflow-hidden relative border-gray-200 min-h-[500px]">
                <div className="w-full h-full min-h-[500px] relative">
                    <Badge variant="primary" className="absolute top-4 right-4 z-10 shadow-md bg-white text-gray-800 border font-bold">
                        Google Maps API Enabled 🗺️
                    </Badge>
                    <MapView 
                        center={{ lat: 19.8760, lng: 73.8777 }} 
                        zoom={8} 
                        markers={activeMarkers} 
                        className="w-full h-full min-h-[500px] rounded-none" 
                    />
                </div>
            </Card>
        </div>
    );
}
