import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { StatusTimeline } from '../../components/ui/StatusTimeline';
import { RouteMap } from '../../components/map/RouteMap';
import { Truck, Phone, Star, Package, MapPin, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

export const TrackingPage = () => {
    // Mock data for tracking
    const orderDetails = {
        orderNumber: 'ORD-2026-092',
        status: 'in_transit',
        estimatedDelivery: new Date(Date.now() + 7200000).toISOString(),
        items: [{ name: 'Fresh Red Tomatoes 🍅', qty: 500, unit: 'KG' }],
        total: 14500,
        seller: 'Ramesh Patil Farm (Nashik)',
        driver: {
            name: 'Rajesh Kumar',
            phone: '+91 98765 43210',
            vehicle: 'Tata 407 (MH 15 AB 1234)'
        },
        pickupCoords: [20.1667, 73.9833], // Nashik
        dropCoords: [18.5204, 73.8567],   // Pune
    };

    const history = [
        { status: 'confirmed', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { status: 'pickup_scheduled', timestamp: new Date(Date.now() - 43200000).toISOString() },
        { status: 'picked_up', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { status: 'in_transit', timestamp: new Date(Date.now() - 3600000).toISOString(), note: 'En-route on Express Highway (NH 60)' }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-emerald-100 flex items-center gap-2">
                        <Truck className="w-6 h-6 text-emerald-600" />
                        <span>Live Delivery Order Tracking</span>
                    </h1>
                    <p className="text-gray-500 dark:text-emerald-300 mt-1 font-semibold">Order ID: #{orderDetails.orderNumber}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-right">
                    <p className="text-xs text-gray-500 dark:text-emerald-300 font-bold">Estimated Delivery Arrival</p>
                    <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">{formatDate(orderDetails.estimatedDelivery)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <h2 className="text-base font-bold text-gray-900 dark:text-emerald-100">Delivery Status Timeline</h2>
                        </CardHeader>
                        <CardBody>
                            <StatusTimeline currentStatus={orderDetails.status} history={history}/>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-5 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 dark:text-emerald-400 uppercase tracking-wider">Assigned Driver Partner</h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-200 font-bold border border-emerald-300">
                                    <Truck className="w-6 h-6"/>
                                </div>
                                <div>
                                    <p className="font-extrabold text-gray-900 dark:text-white text-base">{orderDetails.driver.name}</p>
                                    <p className="text-xs text-amber-600 font-bold flex items-center mt-0.5"><Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-current"/> ⭐ 4.9 Driver Rating</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-emerald-900/40 p-3 rounded-xl border border-gray-200 dark:border-emerald-800">
                                <p className="text-xs text-gray-500 dark:text-emerald-300 font-medium">Vehicle Registration</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{orderDetails.driver.vehicle}</p>
                            </div>
                            <a href={`tel:${orderDetails.driver.phone}`} className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition">
                                <Phone className="w-4 h-4"/>
                                <span>Call Driver Partner ({orderDetails.driver.phone})</span>
                            </a>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-5 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 dark:text-emerald-400 uppercase tracking-wider">Consignment Details</h3>
                            <div className="space-y-3">
                                {orderDetails.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center bg-emerald-50/50 dark:bg-emerald-900/30 p-2.5 rounded-xl">
                                        <div className="flex items-center space-x-2">
                                            <Package className="w-4 h-4 text-emerald-600"/>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">{item.qty} {item.unit}</span>
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-gray-100 dark:border-emerald-800 flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-500 dark:text-emerald-300">Origin Farm Gate</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{orderDetails.seller}</span>
                                </div>
                                <div className="pt-2 border-t border-gray-100 dark:border-emerald-800 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900 dark:text-emerald-100">Total Consignment Value</span>
                                    <span className="text-base font-black text-emerald-700 dark:text-emerald-300">{formatCurrency(orderDetails.total)}</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Live Route Map */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[500px] overflow-hidden flex flex-col">
                        <CardHeader className="flex justify-between items-center bg-gray-50 dark:bg-emerald-900/40">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-emerald-600" />
                                <h2 className="text-base font-bold text-gray-900 dark:text-emerald-100">Live GPS Route & Highway Tracking</h2>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-black rounded-full">
                                Live GPS Active
                            </span>
                        </CardHeader>
                        <CardBody className="p-0 flex-1 min-h-[450px]">
                            <RouteMap 
                                origin={orderDetails.pickupCoords}
                                destination={orderDetails.dropCoords}
                                waypoints={[
                                    { name: 'Farm Pickup: ' + orderDetails.seller, coords: orderDetails.pickupCoords },
                                    { name: 'Buyer Delivery: Pune Mandi', coords: orderDetails.dropCoords }
                                ]}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TrackingPage;
