import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Truck, Plus, Trash2, Edit, CheckCircle } from 'lucide-react';

const initialVehicles = [
    { id: 'MH15 AB 1234', type: 'Mini Truck (Bolero Pickup)', capacity: '1000 kg', status: 'available', driver: 'Sunil Patil' },
    { id: 'MH12 CD 5678', type: 'Heavy Truck (Eicher 14T)', capacity: '5000 kg', status: 'in_use', driver: 'Prakash Rao' },
    { id: 'MH04 EF 9012', type: 'Pickup (Mahindra Supro)', capacity: '750 kg', status: 'maintenance', driver: 'Unassigned' },
];

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deletingVehicle, setDeletingVehicle] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    const [form, setForm] = useState({
        id: '',
        type: '',
        capacity: '',
        status: 'available'
    });

    const handleAddVehicle = (e) => {
        e.preventDefault();
        if (!form.id.trim()) return;

        const newV = {
            id: form.id.trim().toUpperCase(),
            type: form.type.trim() || 'Mini Truck',
            capacity: form.capacity.trim() || '1000 kg',
            status: form.status,
            driver: 'Unassigned'
        };

        setVehicles(prev => [newV, ...prev]);
        setToastMsg(`Vehicle ${newV.id} added to fleet!`);
        setIsAddOpen(false);
        setForm({ id: '', type: '', capacity: '', status: 'available' });
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleDeleteVehicle = () => {
        if (!deletingVehicle) return;
        const vId = deletingVehicle.id;
        setVehicles(prev => prev.filter(v => v.id !== vId));
        setToastMsg(`Vehicle ${vId} removed from fleet!`);
        setDeletingVehicle(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Logistics Fleet Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage vehicles, transport capacity, and maintenance</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4"/> Add Vehicle
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(v => (
                    <Card key={v.id} className="hover:shadow-md transition">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                                    <Truck className="w-8 h-8"/>
                                </div>
                                <Badge variant={
                                    v.status === 'available' ? 'success' :
                                    v.status === 'in_use' ? 'warning' : 'destructive'
                                }>
                                    {v.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{v.id}</h3>
                            <p className="text-sm text-gray-500">{v.type} • Capacity: {v.capacity}</p>
                            <p className="text-xs text-gray-400 mt-2">Driver: <strong className="text-gray-700">{v.driver}</strong></p>

                            <div className="mt-6 flex gap-2 pt-4 border-t">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => {
                                        setVehicles(prev => prev.map(item => item.id === v.id ? {
                                            ...item,
                                            status: item.status === 'available' ? 'in_use' : 'available'
                                        } : item));
                                        setToastMsg(`Status for ${v.id} updated!`);
                                        setTimeout(() => setToastMsg(''), 3000);
                                    }}
                                >
                                    Toggle Status
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setDeletingVehicle(v)}
                                    className="text-red-600 hover:text-red-800 p-2"
                                    title="Delete Vehicle"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add Vehicle Modal */}
            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Transport Vehicle">
                <form onSubmit={handleAddVehicle} className="space-y-4 py-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number (e.g. MH15 AB 1234) *</label>
                        <Input 
                            required 
                            value={form.id}
                            onChange={(e) => setForm({ ...form, id: e.target.value })}
                            placeholder="MH15 AB 1234" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model / Type</label>
                        <Input 
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            placeholder="e.g. Mahindra Bolero Pickup" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payload Capacity (KG / Tons)</label>
                        <Input 
                            value={form.capacity}
                            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                            placeholder="e.g. 1500 kg" 
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Vehicle</Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            {deletingVehicle && (
                <Modal isOpen={!!deletingVehicle} onClose={() => setDeletingVehicle(null)} title="Confirm Delete Vehicle">
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to remove vehicle <strong className="text-gray-900">{deletingVehicle.id}</strong> from fleet inventory?
                        </p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingVehicle(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteVehicle}>Delete Vehicle</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { VehiclesPage };
