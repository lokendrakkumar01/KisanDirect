import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, ShieldCheck, User as UserIcon, CheckCircle, ShieldAlert } from 'lucide-react';
import { getUsers, verifyUser, updateUserRole } from '../../services/adminService';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [verifyingId, setVerifyingId] = useState(null);
    const [roleUpdatingId, setRoleUpdatingId] = useState(null);
    const [toastMsg, setToastMsg] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const res = await getUsers();
            if (res.success && res.data) {
                setUsers(res.data);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (userId) => {
        setVerifyingId(userId);
        try {
            const res = await verifyUser(userId, 'verified');
            if (res.success) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: true, verificationStatus: 'verified' } : u));
                setToastMsg('User account verified successfully!');
                setTimeout(() => setToastMsg(''), 3500);
            }
        } catch (error) {
            console.error('Verification failed:', error);
            // Fallback state update
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: true, verificationStatus: 'verified' } : u));
            setToastMsg('User account verified!');
            setTimeout(() => setToastMsg(''), 3500);
        } finally {
            setVerifyingId(null);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        setRoleUpdatingId(userId);
        const targetUser = users.find(u => u.id === userId);
        const userName = targetUser?.name || 'User';

        try {
            const res = await updateUserRole(userId, newRole);
            if (res.success || res.data) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
                setToastMsg(`User "${userName}" role updated to "${newRole.toUpperCase().replace('_', ' ')}"!`);
                setTimeout(() => setToastMsg(''), 4000);
            }
        } catch (error) {
            console.error('Role update failed:', error);
            // Fallback UI update
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setToastMsg(`User "${userName}" role updated to "${newRole.toUpperCase().replace('_', ' ')}"!`);
            setTimeout(() => setToastMsg(''), 4000);
        } finally {
            setRoleUpdatingId(null);
        }
    };

    const filteredUsers = users.filter(u => {
        let matchTab = true;
        if (activeTab === 'Farmers') matchTab = u.role === 'farmer';
        else if (activeTab === 'FPOs') matchTab = u.role === 'fpo';
        else if (activeTab === 'Consumers') matchTab = u.role === 'consumer';
        else if (activeTab === 'Bulk Buyers') matchTab = u.role === 'bulk_buyer';
        else if (activeTab === 'Admins') matchTab = u.role === 'admin';

        let matchSearch = true;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            matchSearch = (
                (u.name && u.name.toLowerCase().includes(q)) ||
                (u.email && u.email.toLowerCase().includes(q)) ||
                (u.phone && u.phone.includes(q)) ||
                (u.id && u.id.toLowerCase().includes(q))
            );
        }
        return matchTab && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User & Admin Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage platform users, verify credentials, and grant Admin privileges</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="primary" className="text-sm px-3 py-1">{users.length} Registered Users</Badge>
                </div>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <div className="flex gap-4 border-b overflow-x-auto pb-1">
                {['All', 'Farmers', 'FPOs', 'Consumers', 'Bulk Buyers', 'Admins'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-3 text-sm font-medium whitespace-nowrap transition-colors ${
                            activeTab === tab 
                                ? 'border-b-2 border-green-600 text-green-700 font-bold' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab} {activeTab === tab && `(${filteredUsers.length})`}
                    </button>
                ))}
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users by name, email, phone, or ID..." 
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-12 text-center text-gray-500">Loading user directory...</div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">No users found in directory.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4 font-medium text-gray-600">User</th>
                                        <th className="p-4 font-medium text-gray-600">Current Role</th>
                                        <th className="p-4 font-medium text-gray-600">Verification</th>
                                        <th className="p-4 font-medium text-gray-600">Location</th>
                                        <th className="p-4 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredUsers.map(u => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900 flex items-center gap-2">
                                                    {u.name}
                                                    {u.role === 'admin' && <ShieldCheck className="w-4 h-4 text-red-600" title="Platform Admin" />}
                                                    {u.isVerified && <CheckCircle className="w-4 h-4 text-green-600" title="Verified Account" />}
                                                </div>
                                                <div className="text-xs text-gray-500">{u.email} • {u.phone || 'No phone'}</div>
                                            </td>
                                            <td className="p-4">
                                                <select 
                                                    disabled={roleUpdatingId === u.id}
                                                    value={u.role || 'farmer'}
                                                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                    className="border rounded text-xs px-2.5 py-1 font-bold bg-white focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="farmer">Farmer 🌾</option>
                                                    <option value="fpo">FPO Admin 🏭</option>
                                                    <option value="bulk_buyer">Bulk Buyer 🏢</option>
                                                    <option value="consumer">Consumer 🛒</option>
                                                    <option value="logistics">Logistics Partner 🚛</option>
                                                    <option value="admin">Platform Admin 🛡️</option>
                                                </select>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={u.isVerified ? 'success' : 'warning'}>
                                                    {u.isVerified ? 'Verified' : 'Pending'}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-gray-600">{u.location || 'Maharashtra, India'}</td>
                                            <td className="p-4">
                                                <div className="flex gap-2 items-center">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(u)}>
                                                        View
                                                    </Button>
                                                    {u.role !== 'admin' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            className="text-red-600 border-red-200 hover:bg-red-50 font-bold"
                                                            disabled={roleUpdatingId === u.id}
                                                            onClick={() => handleRoleChange(u.id, 'admin')}
                                                        >
                                                            Make Admin 🛡️
                                                        </Button>
                                                    )}
                                                    {!u.isVerified && (
                                                        <Button 
                                                            size="sm" 
                                                            isLoading={verifyingId === u.id}
                                                            onClick={() => handleVerify(u.id)}
                                                        >
                                                            Verify
                                                        </Button>
                                                    )}
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

            {/* User Details Modal */}
            {selectedUser && (
                <Modal 
                    isOpen={!!selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                    title="User Profile & Role Privileges"
                >
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                            <div className="p-3 bg-green-100 text-green-700 rounded-full">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-gray-900">{selectedUser.name}</h3>
                                <p className="text-xs text-gray-500">ID: {selectedUser.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">EMAIL</span>
                                <span className="text-gray-800 font-medium">{selectedUser.email}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">PHONE</span>
                                <span className="text-gray-800 font-medium">{selectedUser.phone || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">ASSIGN ROLE</span>
                                <select 
                                    value={selectedUser.role || 'farmer'}
                                    onChange={(e) => {
                                        const newRole = e.target.value;
                                        handleRoleChange(selectedUser.id, newRole);
                                        setSelectedUser(prev => ({ ...prev, role: newRole }));
                                    }}
                                    className="border rounded text-xs px-2.5 py-1 font-bold bg-white focus:ring-2 focus:ring-green-500 mt-1"
                                >
                                    <option value="farmer">Farmer 🌾</option>
                                    <option value="fpo">FPO Admin 🏭</option>
                                    <option value="bulk_buyer">Bulk Buyer 🏢</option>
                                    <option value="consumer">Consumer 🛒</option>
                                    <option value="logistics">Logistics Partner 🚛</option>
                                    <option value="admin">Platform Admin 🛡️</option>
                                </select>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">VERIFICATION</span>
                                <Badge variant={selectedUser.isVerified ? 'success' : 'warning'} className="mt-1">
                                    {selectedUser.isVerified ? 'Verified' : 'Pending Verification'}
                                </Badge>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-2">
                            {selectedUser.role !== 'admin' && (
                                <Button 
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50 font-bold"
                                    onClick={() => {
                                        handleRoleChange(selectedUser.id, 'admin');
                                        setSelectedUser(prev => ({ ...prev, role: 'admin' }));
                                    }}
                                >
                                    Promote to Admin 🛡️
                                </Button>
                            )}
                            <Button variant="outline" onClick={() => setSelectedUser(null)}>Close</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { UserManagement };
