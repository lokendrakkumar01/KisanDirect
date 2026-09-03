import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Star, Trash2, Edit, CheckCircle } from 'lucide-react';

const initialDrivers = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'MH15 AB 1234', status: 'available', rating: 4.8, trips: 124 },
    { id: 2, name: 'Suresh Patil', phone: '+91 87654 32109', vehicle: 'MH12 CD 5678', status: 'on_delivery', rating: 4.5, trips: 89 },
    { id: 3, name: 'Amit Singh', phone: '+91 76543 21098', vehicle: 'MH04 EF 9012', status: 'off_duty', rating: 4.9, trips: 210 },
];

export default function DriversPage() {
    const [drivers, setDrivers] = useState(initialDrivers);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deletingDriver, setDeletingDriver] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    const [form, setForm] = useState({
        name: '',
        phone: '',
        vehicle: ''
    });

    const handleAddDriver = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;

        const newDriver = {
            id: Date.now(),
            name: form.name.trim(),
            phone: form.phone.trim() || '+91 98765 43210',
            vehicle: form.vehicle.trim() || 'MH15 AB 1234',
            status: 'available',
            rating: 5.0,
            trips: 0
        };

        setDrivers(prev => [newDriver, ...prev]);
        setToastMsg(`Driver "${newDriver.name}" added to logistics directory!`);
        setIsAddOpen(false);
        setForm({ name: '', phone: '', vehicle: '' });
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleDeleteDriver = () => {
        if (!deletingDriver) return;
        const dName = deletingDriver.name;
        setDrivers(prev => prev.filter(d => d.id !== deletingDriver.id));
        setToastMsg(`Driver "${dName}" deleted!`);
        setDeletingDriver(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Driver Directory & Roster</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage delivery drivers, ratings, and vehicle assignments</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4"/> Add Driver
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 font-medium text-gray-600">Driver Info</th>
                                    <th className="p-4 font-medium text-gray-600">Vehicle Assigned</th>
                                    <th className="p-4 font-medium text-gray-600">Status</th>
                                    <th className="p-4 font-medium text-gray-600">Performance</th>
                                    <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {drivers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No drivers in directory.</td>
                                    </tr>
                                ) : (
                                    drivers.map(d => (
                                        <tr key={d.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{d.name}</div>
                                                <div className="text-xs text-gray-500">{d.phone}</div>
                                            </td>
                                            <td className="p-4 font-medium text-gray-800">{d.vehicle}</td>
                                            <td className="p-4">
                                                <Badge variant={
                                                    d.status === 'available' ? 'success' :
                                                    d.status === 'on_delivery' ? 'warning' : 'outline'
                                                }>
                                                    {d.status.replace('_', ' ').toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="w-4 h-4 fill-current"/>
                                                    <span className="font-bold text-gray-900">{d.rating}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">{d.trips} completed trips</div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setDrivers(prev => prev.map(item => item.id === d.id ? {
                                                                ...item,
                                                                status: item.status === 'available' ? 'on_delivery' : 'available'
                                                            } : item));
                                                            setToastMsg(`Status for driver "${d.name}" updated!`);
                                                            setTimeout(() => setToastMsg(''), 3000);
                                                        }}
                                                    >
                                                        Toggle Status
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        onClick={() => setDeletingDriver(d)}
                                                        className="text-red-600 hover:text-red-800 p-2"
                                                        title="Delete Driver"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Driver Modal */}
            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Logistics Driver">
                <form onSubmit={handleAddDriver} className="space-y-4 py-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <Input 
                            required 
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter driver's full name" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input 
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 98765 43210" 
                            type="tel"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Vehicle</label>
                        <Input 
                            value={form.vehicle}
                            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                            placeholder="e.g. MH15 AB 1234" 
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Driver</Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            {deletingDriver && (
                <Modal isOpen={!!deletingDriver} onClose={() => setDeletingDriver(null)} title="Confirm Delete Driver">
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to remove driver <strong className="text-gray-900">{deletingDriver.name}</strong> from directory?
                        </p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingDriver(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteDriver}>Delete Driver</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { DriversPage };
