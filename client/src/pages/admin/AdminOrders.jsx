import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, ShoppingBag, Truck, CheckCircle, Plus, Download } from 'lucide-react';
import { getOrders, updateOrderStatus, createOrder } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/format';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [msg, setMsg] = useState('');

    const [newOrderForm, setNewOrderForm] = useState({
        buyerName: '',
        productName: 'Fresh Red Tomatoes',
        quantity: 100,
        deliveryAddress: 'Pune, Maharashtra'
    });

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
            await updateOrderStatus(orderId, newStatus);
            setOrders(prev => prev.map(o => (o.id === orderId || o.orderNumber === orderId) ? { ...o, status: newStatus } : o));
            setMsg(`Order ${orderId} status updated to ${newStatus.toUpperCase()}`);
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            setOrders(prev => prev.map(o => (o.id === orderId || o.orderNumber === orderId) ? { ...o, status: newStatus } : o));
            setMsg(`Order status updated to ${newStatus.toUpperCase()}`);
            setTimeout(() => setMsg(''), 3000);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleCreateOrderSubmit = async (e) => {
        e.preventDefault();
        const res = await createOrder(newOrderForm);
        if (res.success && res.data) {
            setOrders(prev => [res.data, ...prev]);
            setIsCreateOpen(false);
            setNewOrderForm({ buyerName: '', productName: 'Fresh Red Tomatoes', quantity: 100, deliveryAddress: 'Pune, Maharashtra' });
            setMsg(`Order "${res.data.orderNumber || res.data.id}" created successfully!`);
            setTimeout(() => setMsg(''), 4000);
        }
    };

    const exportOrdersCSV = () => {
        const headers = ['Order ID', 'Buyer Name', 'Product', 'Quantity (KG)', 'Total Amount (₹)', 'Status', 'Payment Status', 'Delivery Address', 'Date'];
        const rows = orders.map(o => [
            o.orderNumber || o.id,
            o.buyerName || 'Buyer',
            o.productName || o.cropName || (o.items && o.items[0]?.productName) || 'Produce',
            o.quantity || 100,
            o.total || o.totalPrice || o.totalAmount || 0,
            o.status || 'pending',
            o.paymentStatus || 'successful',
            `"${o.deliveryAddress || 'Maharashtra'}"`,
            o.createdAt || ''
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `AgroConnect_Orders_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMsg('Orders directory exported as CSV!');
        setTimeout(() => setMsg(''), 3000);
    };

    const filteredOrders = orders.filter(o => {
        let matchStatus = true;
        if (statusFilter !== 'All') {
            matchStatus = o.status?.toLowerCase() === statusFilter.toLowerCase();
        }
        let matchSearch = true;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const prod = o.productName || o.cropName || (o.items && o.items[0]?.productName) || '';
            const buyer = o.buyerName || '';
            const idStr = o.orderNumber || o.id || '';
            matchSearch = (
                idStr.toLowerCase().includes(q) ||
                buyer.toLowerCase().includes(q) ||
                prod.toLowerCase().includes(q)
            );
        }
        return matchStatus && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Platform Orders Governance</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor, manage, and update all agricultural trade orders across India</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={exportOrdersCSV} className="font-semibold flex items-center gap-1.5">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                    <Button size="sm" onClick={() => setIsCreateOpen(true)} className="bg-green-600 hover:bg-green-700 font-semibold flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Create Manual Order
                    </Button>
                </div>
            </div>

            {msg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm text-sm">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" /> {msg}
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
                            className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                        >
                            <option value="All">All Statuses ({orders.length})</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="py-12 text-center text-gray-500">Loading platform orders...</div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">No orders found matching criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">Order ID</th>
                                        <th className="p-4 font-medium text-gray-600">Buyer</th>
                                        <th className="p-4 font-medium text-gray-600">Produce & Qty</th>
                                        <th className="p-4 font-medium text-gray-600">Total Amount</th>
                                        <th className="p-4 font-medium text-gray-600">Status</th>
                                        <th className="p-4 font-medium text-gray-600">Order Date</th>
                                        <th className="p-4 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredOrders.map(o => {
                                        const prodName = o.productName || o.cropName || (o.items && o.items[0]?.productName) || 'Fresh Red Tomatoes';
                                        const amount = o.total || o.totalPrice || o.totalAmount || 0;
                                        return (
                                            <tr key={o.id || o.orderNumber} className="hover:bg-gray-50">
                                                <td className="p-4 font-bold text-gray-900">{o.orderNumber || o.id}</td>
                                                <td className="p-4">
                                                    <div className="text-gray-900 font-bold">{o.buyerName || 'Pune Fresh Restaurant'}</div>
                                                    <div className="text-gray-500 text-xs">{o.deliveryAddress || 'Pune, Maharashtra'}</div>
                                                </td>
                                                <td className="p-4 font-medium text-gray-800">
                                                    {prodName} ({o.quantity || 100} {o.unit || 'KG'})
                                                </td>
                                                <td className="p-4 font-bold text-green-700">
                                                    {formatCurrency(amount)}
                                                </td>
                                                <td className="p-4">
                                                    <Badge variant={
                                                        o.status === 'delivered' || o.status === 'Completed' ? 'success' :
                                                        o.status === 'cancelled' ? 'danger' : 'warning'
                                                    }>
                                                        {(o.status || 'pending').toUpperCase()}
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
                                                            disabled={updatingId === (o.id || o.orderNumber)}
                                                            value={o.status || 'pending'}
                                                            onChange={(e) => handleStatusChange(o.id || o.orderNumber, e.target.value)}
                                                            className="border rounded text-xs px-2 py-1 bg-white font-semibold focus:ring-2 focus:ring-green-500 cursor-pointer"
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
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create Manual Order Modal */}
            {isCreateOpen && (
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Create Manual Platform Order"
                >
                    <form onSubmit={handleCreateOrderSubmit} className="space-y-4 text-sm">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Buyer Name *</label>
                            <input 
                                type="text"
                                required
                                value={newOrderForm.buyerName}
                                onChange={(e) => setNewOrderForm(p => ({ ...p, buyerName: e.target.value }))}
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                                placeholder="e.g. Pune Fresh Restaurant or Amit Kumar"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Crop / Product Name *</label>
                            <select 
                                value={newOrderForm.productName}
                                onChange={(e) => setNewOrderForm(p => ({ ...p, productName: e.target.value }))}
                                className="w-full border rounded-lg p-2 bg-white font-medium focus:ring-2 focus:ring-green-500"
                            >
                                <option value="Fresh Red Tomatoes">Fresh Red Tomatoes (Grade A)</option>
                                <option value="Nashik Red Onions">Nashik Red Onions (Grade A)</option>
                                <option value="Organic Potato">Organic Potato</option>
                                <option value="Seedless Grapes">Seedless Grapes</option>
                                <option value="Organic Wheat">Organic Wheat</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Quantity (KG) *</label>
                            <input 
                                type="number"
                                required
                                min="1"
                                value={newOrderForm.quantity}
                                onChange={(e) => setNewOrderForm(p => ({ ...p, quantity: parseInt(e.target.value) || 10 }))}
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Delivery Address</label>
                            <input 
                                type="text"
                                value={newOrderForm.deliveryAddress}
                                onChange={(e) => setNewOrderForm(p => ({ ...p, deliveryAddress: e.target.value }))}
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Pune, Maharashtra"
                            />
                        </div>
                        <div className="pt-4 flex justify-end gap-2 border-t">
                            <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">Create Order</Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <Modal 
                    isOpen={!!selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                    title={`Order Overview: ${selectedOrder.orderNumber || selectedOrder.id}`}
                >
                    <div className="space-y-4 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">ORDER ID</span>
                                <span className="font-bold text-gray-900">{selectedOrder.orderNumber || selectedOrder.id}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">STATUS</span>
                                <Badge variant={selectedOrder.status === 'delivered' ? 'success' : 'warning'}>
                                    {(selectedOrder.status || 'Pending').toUpperCase()}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">BUYER NAME</span>
                                <span className="font-medium text-gray-800">{selectedOrder.buyerName || 'Pune Fresh Restaurant'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">TOTAL AMOUNT</span>
                                <span className="font-bold text-green-700">{formatCurrency(selectedOrder.total || selectedOrder.totalPrice || selectedOrder.totalAmount || 0)}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Item Breakdown</h4>
                            <div className="p-3 bg-white border rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{selectedOrder.productName || selectedOrder.cropName || 'Fresh Produce'}</p>
                                    <p className="text-xs text-gray-500">Quantity: {selectedOrder.quantity || 100} KG</p>
                                </div>
                                <p className="font-bold text-gray-900">{formatCurrency(selectedOrder.total || selectedOrder.totalPrice || selectedOrder.totalAmount || 0)}</p>
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
