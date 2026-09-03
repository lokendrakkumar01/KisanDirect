import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { StatusTimeline } from '../../components/ui/StatusTimeline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Truck, Phone, Star, Package } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { formatCurrency, formatDate } from '../../utils/format';
export const TrackingPage = () => {
    // Mock data for tracking
    const orderDetails = {
        orderNumber: 'ORD-2026-092',
        status: 'in_transit',
        estimatedDelivery: new Date(Date.now() + 7200000).toISOString(),
        items: [{ name: 'Fresh Tomatoes', qty: 5, unit: 'KG' }],
        total: 455,
        seller: 'Green Valley Farms',
        driver: {
            name: 'Raju Kumar',
            phone: '+91 98765 43210',
            vehicle: 'Mahindra Bolero (MH 12 AB 1234)'
        }
    };
    const history = [
        { status: 'confirmed', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { status: 'pickup_scheduled', timestamp: new Date(Date.now() - 43200000).toISOString() },
        { status: 'picked_up', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { status: 'in_transit', timestamp: new Date(Date.now() - 3600000).toISOString(), note: 'Left distribution center' }
    ];
    return (<div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
          <p className="text-gray-500 mt-1">Order # {orderDetails.orderNumber}</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Estimated Delivery</p>
          <p className="text-lg font-bold text-green-600">{formatDate(orderDetails.estimatedDelivery)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Delivery Status</h2>
            </CardHeader>
            <CardBody>
              <StatusTimeline currentStatus={orderDetails.status} history={history}/>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Delivery Partner</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-gray-500"/>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{orderDetails.driver.name}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1"><Star className="w-3 h-3 text-amber-400 mr-1 fill-current"/> 4.8 Rating</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                <p className="text-sm font-medium text-gray-900">{orderDetails.driver.vehicle}</p>
              </div>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-50 text-green-700 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors">
                <Phone className="w-4 h-4"/>
                <span>Call Driver</span>
              </button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Order Details</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, i) => (<div key={i} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400"/>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.qty} {item.unit}</span>
                  </div>))}
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Seller</span>
                  <span className="text-sm font-medium text-gray-900">{orderDetails.seller}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(orderDetails.total)}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] overflow-hidden">
            <div className="w-full h-full relative z-0">
              <MapContainer center={[18.5204, 73.8567]} // Pune coordinates
     zoom={13} style={{ width: '100%', height: '100%', minHeight: '500px' }} zoomControl={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={[18.5204, 73.8567]}>
                  <Popup>Delivery Vehicle Location</Popup>
                </Marker>
                <Marker position={[18.5304, 73.8467]}>
                  <Popup>Your Delivery Address</Popup>
                </Marker>
              </MapContainer>
              <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700">Driver Location</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700">Destination</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>);
};
export default TrackingPage;
