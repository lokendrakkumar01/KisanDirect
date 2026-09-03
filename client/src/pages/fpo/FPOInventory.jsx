import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Package, Search, AlertCircle, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/format';

const initialInventory = [
    { id: 'INV-001', product: 'Tomato (Grade A)', totalQty: 1500, reservedQty: 500, unit: 'KG', price: 25, status: 'In Stock', location: 'Nashik Main Godown' },
    { id: 'INV-002', product: 'Onion (Grade A)', totalQty: 5000, reservedQty: 5000, unit: 'KG', price: 18, status: 'Committed', location: 'Warehouse B' },
    { id: 'INV-003', product: 'Potato (Grade B)', totalQty: 800, reservedQty: 0, unit: 'KG', price: 15, status: 'Low Stock', location: 'Main Godown' },
    { id: 'INV-004', product: 'Wheat (Grade A)', totalQty: 10000, reservedQty: 2000, unit: 'KG', price: 22, status: 'In Stock', location: 'Silo A' },
];

export default function FPOInventory() {
    const [inventory, setInventory] = useState(initialInventory);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    const [form, setForm] = useState({
        product: '',
        totalQty: 1000,
        price: 20,
        location: 'Nashik Main Godown'
    });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!form.product.trim()) return;

        const newItem = {
            id: `INV-00${inventory.length + 1}`,
            product: form.product.trim(),
            totalQty: Number(form.totalQty) || 1000,
            reservedQty: 0,
            unit: 'KG',
            price: Number(form.price) || 20,
            status: 'In Stock',
            location: form.location.trim() || 'Nashik Main Godown'
        };

        setInventory(prev => [newItem, ...prev]);
        setToastMsg(`Inventory item "${newItem.product}" added!`);
        setIsAddOpen(false);
        setForm({ product: '', totalQty: 1000, price: 20, location: 'Nashik Main Godown' });
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleDeleteItem = () => {
        if (!deletingItem) return;
        const pName = deletingItem.product;
        setInventory(prev => prev.filter(i => i.id !== deletingItem.id));
        setToastMsg(`Inventory item "${pName}" removed!`);
        setDeletingItem(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const filteredInventory = inventory.filter(item => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase().trim();
        return (
            item.product.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q)
        );
    });

    const totalValue = inventory.reduce((sum, item) => sum + (item.totalQty * item.price), 0);
    const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">FPO Inventory & Warehouse Stock</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage aggregated produce and track availability across warehouses.</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)}>
                    <Package className="mr-2 h-4 w-4"/> Add Inventory
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Produce Stock Items</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{inventory.length}</dd>
                        </dl>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Est. Total Inventory Value</dt>
                            <dd className="mt-1 text-3xl font-semibold text-green-600">{formatCurrency(totalValue)}</dd>
                        </dl>
                    </CardContent>
                </Card>
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <dl>
                                <dt className="text-sm font-medium text-yellow-800 truncate">Low Stock Alerts</dt>
                                <dd className="mt-1 text-3xl font-semibold text-yellow-900">{lowStockCount}</dd>
                            </dl>
                            <AlertCircle className="h-8 w-8 text-yellow-600 opacity-50"/>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-4 border-b border-gray-200">
                    <div className="relative w-full max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400"/>
                        </div>
                        <Input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10" 
                            placeholder="Search inventory by product, ID, or warehouse location..."
                        />
                    </div>
                </CardContent>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInventory.map((item) => {
                                const availableQty = item.totalQty - item.reservedQty;
                                const reservedPercent = item.totalQty > 0 ? (item.reservedQty / item.totalQty) * 100 : 0;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-900">{item.product}</div>
                                            <div className="text-xs text-gray-500">{item.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap w-64">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-bold text-green-700">{availableQty} {item.unit} available</span>
                                                <span className="text-gray-500">{item.reservedQty} reserved</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 flex overflow-hidden">
                                                <div className="bg-green-600 h-1.5" style={{ width: `${100 - reservedPercent}%` }}></div>
                                                <div className="bg-amber-400 h-1.5" style={{ width: `${reservedPercent}%` }}></div>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 text-right">Total: {item.totalQty} {item.unit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-900">{formatCurrency(item.price)}</div>
                                            <div className="text-xs text-gray-500">per {item.unit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {item.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={
                                                item.status === 'In Stock' ? 'success' :
                                                item.status === 'Low Stock' ? 'warning' : 'secondary'
                                            }>
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => setDeletingItem(item)}
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                    title="Remove Inventory"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add Inventory Modal */}
            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Aggregated Warehouse Inventory">
                <form onSubmit={handleAddSubmit} className="space-y-4 py-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name & Grade *</label>
                        <Input 
                            required 
                            value={form.product}
                            onChange={(e) => setForm({ ...form, product: e.target.value })}
                            placeholder="e.g. Tomato (Grade A)" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity (KG)</label>
                            <Input 
                                type="number"
                                value={form.totalQty}
                                onChange={(e) => setForm({ ...form, totalQty: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per KG (₹)</label>
                            <Input 
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse Location</label>
                        <Input 
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="e.g. Nashik Main Godown" 
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Inventory</Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            {deletingItem && (
                <Modal isOpen={!!deletingItem} onClose={() => setDeletingItem(null)} title="Confirm Remove Inventory">
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to remove <strong className="text-gray-900">{deletingItem.product}</strong> ({deletingItem.totalQty} {deletingItem.unit}) from warehouse stock?
                        </p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingItem(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteItem}>Remove Item</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { FPOInventory };
