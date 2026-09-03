import React, { useEffect, useRef } from 'react';
import { useGoogleMapScript } from '../../utils/useGoogleMap';

const DEFAULT_CENTER = { lat: 19.9975, lng: 73.7898 }; // Nashik, Maharashtra

const getMarkerIconSvg = (color) => {
    // Custom SVG marker pin
    const fillHex = color === 'green' ? '#16A34A' : color === 'blue' ? '#2563EB' : color === 'orange' ? '#EA580C' : '#9333EA';
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z" fill="${fillHex}"/>
            <circle cx="17" cy="17" r="8" fill="white"/>
        </svg>
    `)}`;
};

export const MapView = ({ 
    center = DEFAULT_CENTER, 
    zoom = 8, 
    markers = [], 
    className = 'h-96' 
}) => {
    const { isLoaded, loadError } = useGoogleMapScript();
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const googleMarkersRef = useRef([]);

    useEffect(() => {
        if (!isLoaded || !mapRef.current) return;

        const initialCenter = Array.isArray(center) 
            ? { lat: center[0], lng: center[1] } 
            : center;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                center: initialCenter,
                zoom: zoom,
                mapTypeId: 'roadmap',
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: [
                    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
                ]
            });
        } else {
            mapInstanceRef.current.setCenter(initialCenter);
            mapInstanceRef.current.setZoom(zoom);
        }

        // Clear existing markers
        googleMarkersRef.current.forEach(m => m.setMap(null));
        googleMarkersRef.current = [];

        // Add Markers
        if (markers && markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();

            markers.forEach((item) => {
                const lat = item.location?.lat || item.lat;
                const lng = item.location?.lng || item.lng;
                if (!lat || !lng) return;

                const pos = { lat: Number(lat), lng: Number(lng) };
                bounds.extend(pos);

                const color = item.type === 'farmer' ? 'green' : item.type === 'fpo' ? 'blue' : item.type === 'buyer' ? 'orange' : 'purple';

                const marker = new window.google.maps.Marker({
                    position: pos,
                    map: mapInstanceRef.current,
                    title: item.title || item.name || 'Location',
                    icon: {
                        url: getMarkerIconSvg(color),
                        scaledSize: new window.google.maps.Size(32, 40),
                        anchor: new window.google.maps.Point(16, 40)
                    }
                });

                const infoContent = `
                    <div style="padding: 6px; font-family: sans-serif; max-width: 200px;">
                        <h4 style="margin:0 0 4px 0; font-weight:bold; font-size:14px; color:#111827;">${item.title || item.name || 'AgroConnect Hub'}</h4>
                        <p style="margin:0; font-size:12px; color:#4B5563; text-transform:capitalize;">Role: ${item.type || 'Farmer'}</p>
                        ${item.description ? `<p style="margin:4px 0 0 0; font-size:12px; color:#6B7280;">${item.description}</p>` : ''}
                        <p style="margin:6px 0 0 0; font-size:11px; color:#9CA3AF;">${item.location?.city || 'Maharashtra'}, ${item.location?.state || 'India'}</p>
                    </div>
                `;

                const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });
                marker.addListener('click', () => {
                    infoWindow.open(mapInstanceRef.current, marker);
                });

                googleMarkersRef.current.push(marker);
            });

            if (markers.length > 1) {
                mapInstanceRef.current.fitBounds(bounds);
            }
        }
    }, [isLoaded, center, zoom, markers]);

    if (loadError) {
        return (
            <div className={`w-full rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center p-6 text-center text-gray-500 ${className}`}>
                <div>
                    <p className="font-bold text-gray-800">Google Maps Error</p>
                    <p className="text-xs">Failed to load Google Maps script. Check API key.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full rounded-xl overflow-hidden border border-gray-200 relative ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500 z-10">
                    Loading Google Maps (API Powered)...
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    );
};

export default MapView;
