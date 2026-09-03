import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
const deliveryIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
const depotIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
export const RouteMap = ({ stops, className = 'h-96' }) => {
    if (stops.length === 0)
        return null;
    const positions = stops.map(stop => [stop.point.lat, stop.point.lng]);
    const center = positions[0];
    const getIconForType = (type) => {
        switch (type) {
            case 'pickup': return pickupIcon;
            case 'delivery': return deliveryIcon;
            case 'depot': return depotIcon;
            default: return depotIcon;
        }
    };
    return (<div className={`w-full rounded-xl overflow-hidden border border-gray-200 z-0 ${className}`}>
      <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Polyline positions={positions} color="#3B82F6" weight={3} dashArray="10, 10"/>
        
        {stops.map((stop, index) => (<Marker key={`${stop.point.id}-${index}`} position={[stop.point.lat, stop.point.lng]} icon={getIconForType(stop.point.type)}>
            <Popup>
              <div>
                <h4 className="font-bold text-sm">Stop {stop.index}: {stop.point.name}</h4>
                <p className="text-xs text-gray-600 capitalize">{stop.point.type}</p>
                {stop.point.quantity > 0 && (<p className="text-xs font-medium mt-1">Load: {stop.point.quantity} Qtl</p>)}
              </div>
            </Popup>
          </Marker>))}
      </MapContainer>
    </div>);
};
