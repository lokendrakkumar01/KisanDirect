import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, ShoppingBag, Truck, CheckCircle } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/format';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        try {
            const res = await getOrders();
            if (res.success && res.data) {
                setOrders(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            const res = await updateOrderStatus(orderId, newStatus);
            if (res.success) {
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                setMsg(`Order status updated to ${newStatus}`);
                setTimeout(() => setMsg(''), 3000);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredOrders = orders.filter(o => {
        let matchStatus = true;
        if (statusFilter !== 'All') {
            matchStatus = o.status?.toLowerCase() === statusFilter.toLowerCase();
        }
        let matchSearch = true;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            matchSearch = (
                (o.id && o.id.toLowerCase().includes(q)) ||
                (o.buyerName && o.buyerName.toLowerCase().includes(q)) ||
                (o.cropName && o.cropName.toLowerCase().includes(q))
            );
        }
        return matchStatus && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Platform Orders Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor, manage, and update all agricultural trade orders across India</p>
                </div>
                <Badge variant="primary" className="text-sm px-3 py-1">{orders.length} Total Orders</Badge>
            </div>

            {msg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> {msg}
                </div>
            )}

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search orders by ID, buyer, or crop name..." 
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="py-12 text-center text-gray-500">Loading orders...</div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">No orders found matching criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">Order ID</th>
                                        <th className="p-4 font-medium text-gray-600">Buyer</th>
                                        <th className="p-4 font-medium text-gray-600">Produce / Qty</th>
                                        <th className="p-4 font-medium text-gray-600">Total Amount</th>
                                        <th className="p-4 font-medium text-gray-600">Status</th>
                                        <th className="p-4 font-medium text-gray-600">Date</th>
                                        <th className="p-4 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredOrders.map(o => (
                                        <tr key={o.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-gray-900">{o.id}</td>
                                            <td className="p-4">
                                                <div className="text-gray-900 font-medium">{o.buyerName || o.buyerId || 'Buyer'}</div>
                                                <div className="text-gray-500 text-xs">{o.deliveryAddress || 'Maharashtra'}</div>
                                            </td>
                                            <td className="p-4 font-medium text-gray-800">
                                                {o.cropName || (o.items && o.items[0]?.cropName) || 'Produce'} ({o.quantity || o.totalQuantity || 100} KG)
                                            </td>
                                            <td className="p-4 font-bold text-green-700">
                                                {formatCurrency(o.totalPrice || o.totalAmount || o.total || 0)}
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={
                                                    o.status === 'delivered' || o.status === 'Completed' ? 'success' :
                                                    o.status === 'cancelled' ? 'destructive' : 'warning'
                                                }>
                                                    {o.status || 'Pending'}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-gray-500">
                                                {o.createdAt ? formatDate(o.createdAt) : 'Recent'}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2 items-center">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedOrder(o)}>
                                                        Details
                                                    </Button>
                                                    <select 
                                                        disabled={updatingId === o.id}
                                                        value={o.status || 'pending'}
                                                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                                        className="border rounded text-xs px-2 py-1 bg-white focus:outline-none"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="in_transit">In Transit</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Order Details Modal */}
            {selectedOrder && (
                <Modal 
                    isOpen={!!selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                    title={`Order Details: ${selectedOrder.id}`}
                >
                    <div className="space-y-4 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">ORDER ID</span>
                                <span className="font-bold text-gray-900">{selectedOrder.id}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">STATUS</span>
                                <Badge variant={selectedOrder.status === 'delivered' ? 'success' : 'warning'}>
                                    {selectedOrder.status || 'Pending'}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">BUYER</span>
                                <span className="font-medium text-gray-800">{selectedOrder.buyerName || selectedOrder.buyerId || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">TOTAL PRICE</span>
                                <span className="font-bold text-green-700">{formatCurrency(selectedOrder.totalPrice || selectedOrder.totalAmount || 0)}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Order Items</h4>
                            <div className="p-3 bg-white border rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{selectedOrder.cropName || 'Produce Listing'}</p>
                                    <p className="text-xs text-gray-500">Quantity: {selectedOrder.quantity || 100} KG</p>
                                </div>
                                <p className="font-bold text-gray-900">{formatCurrency(selectedOrder.totalPrice || selectedOrder.totalAmount || 0)}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { AdminOrders };
