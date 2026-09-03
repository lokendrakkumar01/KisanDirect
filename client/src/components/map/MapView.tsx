import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '../../types';

// Fix Leaflet's default icon path issues with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for different marker types
const createIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  farmer: createIcon('green'),
  fpo: createIcon('blue'),
  buyer: createIcon('orange'),
  vehicle: createIcon('violet')
};

export interface MapMarker {
  id: string;
  location: Location;
  type: 'farmer' | 'fpo' | 'buyer' | 'vehicle';
  title: string;
  description?: string;
}

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
  className?: string;
}

export const MapView: React.FC<MapViewProps> = ({ center, zoom = 6, markers, className = 'h-96' }) => {
  return (
    <div className={`w-full rounded-xl overflow-hidden border border-gray-200 z-0 ${className}`}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={[marker.location.lat, marker.location.lng]}
            icon={icons[marker.type]}
          >
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-gray-900">{marker.title}</h3>
                <p className="text-sm text-gray-600 capitalize">{marker.type}</p>
                {marker.description && <p className="text-sm mt-1">{marker.description}</p>}
                <p className="text-xs text-gray-400 mt-2">{marker.location.city}, {marker.location.state}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
