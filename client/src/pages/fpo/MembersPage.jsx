import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, UserPlus, MapPin, Edit, Trash2, CheckCircle } from 'lucide-react';

const initialMembers = [
    { id: 'M-001', name: 'Ramesh Patel', location: 'Village A', phone: '+91 9876543210', crops: 'Tomato, Onion', contributed: 2400, status: 'Active', joinDate: '2025-01-15' },
    { id: 'M-002', name: 'Suresh Kumar', location: 'Village B', phone: '+91 9876543211', crops: 'Wheat, Potato', contributed: 5600, status: 'Active', joinDate: '2025-02-20' },
    { id: 'M-003', name: 'Anita Desai', location: 'Village A', phone: '+91 9876543212', crops: 'Onion, Garlic', contributed: 1200, status: 'Active', joinDate: '2025-04-10' },
    { id: 'M-004', name: 'Vijay Singh', location: 'Village C', phone: '+91 9876543213', crops: 'Tomato', contributed: 0, status: 'Inactive', joinDate: '2026-01-05' },
];

export default function MembersPage() {
    const [members, setMembers] = useState(initialMembers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [deletingMember, setDeletingMember] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    const [form, setForm] = useState({
        name: '',
        phone: '',
        location: '',
        crops: ''
    });

    const handleOpenAdd = () => {
        setForm({ name: '', phone: '', location: '', crops: '' });
        setEditingMember(null);
        setIsAddModalOpen(true);
    };

    const handleOpenEdit = (member) => {
        setEditingMember(member);
        setForm({
            name: member.name,
            phone: member.phone || '',
            location: member.location,
            crops: member.crops
        });
        setIsAddModalOpen(true);
    };

    const handleSaveMember = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;

        if (editingMember) {
            setMembers(prev => prev.map(m => m.id === editingMember.id ? {
                ...m,
                name: form.name.trim(),
                phone: form.phone.trim(),
                location: form.location.trim() || 'Village A',
                crops: form.crops.trim() || 'General Produce'
            } : m));
            setToastMsg(`Member "${form.name}" updated successfully!`);
        } else {
            const newMember = {
                id: `M-00${members.length + 1}`,
                name: form.name.trim(),
                phone: form.phone.trim() || '+91 9876543210',
                location: form.location.trim() || 'Village A',
                crops: form.crops.trim() || 'Tomato, Onion',
                contributed: 0,
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0]
            };
            setMembers(prev => [newMember, ...prev]);
            setToastMsg(`Member "${form.name}" added successfully!`);
        }

        setIsAddModalOpen(false);
        setEditingMember(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleDeleteConfirm = () => {
        if (!deletingMember) return;
        const memberName = deletingMember.name;
        setMembers(prev => prev.filter(m => m.id !== deletingMember.id));
        setToastMsg(`Member "${memberName}" deleted successfully!`);
        setDeletingMember(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const filteredMembers = members.filter(m => {
        let matchStatus = true;
        if (statusFilter === 'Active') matchStatus = m.status === 'Active';
        else if (statusFilter === 'Inactive') matchStatus = m.status === 'Inactive';

        let matchSearch = true;
        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase().trim();
            matchSearch = (
                m.name.toLowerCase().includes(q) ||
                m.location.toLowerCase().includes(q) ||
                m.crops.toLowerCase().includes(q)
            );
        }
        return matchStatus && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">FPO Members</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your farmer members and their contributions.</p>
                </div>
                <Button onClick={handleOpenAdd}>
                    <UserPlus className="mr-2 h-4 w-4"/> Add Member
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <Card>
                <CardContent className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative w-full max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400"/>
                            </div>
                            <Input 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="pl-10" 
                                placeholder="Search members by name or village..."
                            />
                        </div>
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 border bg-white"
                        >
                            <option value="All Status">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Details</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops Grown</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Contributed</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <MapPin className="h-3 w-3 mr-1"/> {member.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{member.crops}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-medium">{member.contributed} KG</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={member.status === 'Active' ? 'success' : 'secondary'}>
                                                {member.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => handleOpenEdit(member)}
                                                    className="text-blue-600 hover:text-blue-900 p-2"
                                                    title="Edit Member"
                                                >
                                                    <Edit className="h-4 w-4"/>
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => setDeletingMember(member)}
                                                    className="text-red-600 hover:text-red-900 p-2"
                                                    title="Delete Member"
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add / Edit Member Modal */}
            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => { setIsAddModalOpen(false); setEditingMember(null); }} 
                title={editingMember ? `Edit Member: ${editingMember.name}` : "Add New FPO Member"}
            >
                <form onSubmit={handleSaveMember} className="space-y-4 py-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <Input 
                            required 
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter farmer's full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input 
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 9876543210" 
                            type="tel"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Village / Location</label>
                        <Input 
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="Enter village or district name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crops (comma separated)</label>
                        <Input 
                            value={form.crops}
                            onChange={(e) => setForm({ ...form, crops: e.target.value })}
                            placeholder="e.g. Tomato, Onion, Wheat"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => { setIsAddModalOpen(false); setEditingMember(null); }}>Cancel</Button>
                        <Button type="submit">{editingMember ? 'Save Changes' : 'Add Member'}</Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            {deletingMember && (
                <Modal
                    isOpen={!!deletingMember}
                    onClose={() => setDeletingMember(null)}
                    title="Confirm Delete Member"
                >
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to delete farmer member <strong className="text-gray-900">{deletingMember.name}</strong> from village <strong className="text-gray-900">{deletingMember.location}</strong>?
                        </p>
                        <p className="text-xs text-red-600 font-medium">This action will remove the member from your FPO directory.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingMember(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteConfirm}>Delete Member</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { MembersPage };
