import React, { useEffect, useRef } from 'react';
import { useGoogleMapScript } from '../../utils/useGoogleMap';

const DEFAULT_CENTER = { lat: 19.9975, lng: 73.7898 };

const getStopMarkerSvg = (type, number) => {
    const fillHex = type === 'pickup' ? '#16A34A' : type === 'delivery' ? '#DC2626' : '#2563EB';
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z" fill="${fillHex}"/>
            <circle cx="17" cy="17" r="9" fill="white"/>
            <text x="17" y="21" font-size="12" font-weight="bold" fill="${fillHex}" text-anchor="middle">${number || '•'}</text>
        </svg>
    `)}`;
};

export const RouteMap = ({ stops = [], className = 'h-96' }) => {
    const { isLoaded, loadError } = useGoogleMapScript();
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const polylineRef = useRef(null);
    const googleMarkersRef = useRef([]);

    useEffect(() => {
        if (!isLoaded || !mapRef.current) return;

        const initialCenter = stops.length > 0 && stops[0].point 
            ? { lat: Number(stops[0].point.lat), lng: Number(stops[0].point.lng) }
            : DEFAULT_CENTER;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: initialCenter,
                zoom: 8,
                mapTypeId: 'roadmap',
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true
            });
        }

        // Clear existing markers & polyline
        googleMarkersRef.current.forEach(m => m.setMap(null));
        googleMarkersRef.current = [];
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }

        if (stops.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            const pathCoordinates = [];

            stops.forEach((stop, idx) => {
                const pt = stop.point;
                if (!pt || !pt.lat || !pt.lng) return;

                const pos = { lat: Number(pt.lat), lng: Number(pt.lng) };
                pathCoordinates.push(pos);
                bounds.extend(pos);

                const stopType = pt.type || (idx === 0 ? 'pickup' : idx === stops.length - 1 ? 'delivery' : 'pickup');
                const stopNumber = stop.index || idx + 1;

                const marker = new window.google.maps.Marker({
                    position: pos,
                    map: mapInstanceRef.current,
                    title: `Stop ${stopNumber}: ${pt.name}`,
                    icon: {
                        url: getStopMarkerSvg(stopType, stopNumber),
                        scaledSize: new window.google.maps.Size(32, 40),
                        anchor: new window.google.maps.Point(16, 40)
                    }
                });

                const infoContent = `
                    <div style="padding: 6px; font-family: sans-serif; max-width: 200px;">
                        <h4 style="margin:0 0 4px 0; font-weight:bold; font-size:13px; color:#111827;">Stop ${stopNumber}: ${pt.name}</h4>
                        <p style="margin:0; font-size:12px; color:#4B5563; text-transform:capitalize;">Type: <strong>${stopType}</strong></p>
                        ${pt.quantity ? `<p style="margin:4px 0 0 0; font-size:12px; font-weight:bold; color:#16A34A;">Load: ${pt.quantity} KG</p>` : ''}
                    </div>
                `;

                const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });
                marker.addListener('click', () => {
                    infoWindow.open(mapInstanceRef.current, marker);
                });

                googleMarkersRef.current.push(marker);
            });

            // Draw Polyline
            polylineRef.current = new window.google.maps.Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: '#2563EB',
                strokeOpacity: 0.8,
                strokeWeight: 4
            });
            polylineRef.current.setMap(mapInstanceRef.current);

            mapInstanceRef.current.fitBounds(bounds);
        }
    }, [isLoaded, stops]);

    if (loadError) {
        return (
            <div className={`w-full rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center p-6 text-center text-gray-500 ${className}`}>
                <div>
                    <p className="font-bold text-gray-800">Google Maps Error</p>
                    <p className="text-xs">Failed to load Google Maps script.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full rounded-xl overflow-hidden border border-gray-200 relative ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500 z-10">
                    Loading Route Map (Google Maps API)...
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    );
};

export default RouteMap;
