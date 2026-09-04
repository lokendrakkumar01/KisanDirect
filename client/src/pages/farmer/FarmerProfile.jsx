import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { BadgeCheck, Star, MapPin, Edit, CheckCircle, Sprout, Building, CreditCard } from 'lucide-react';

export const FarmerProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const [form, setForm] = useState({
        name: user?.name || 'Ramesh Patil',
        phone: user?.phone || '+91 98765 43210',
        city: user?.location?.city || 'Nashik',
        state: user?.location?.state || 'Maharashtra',
        farmName: 'Green Valley Organic Farms',
        farmSize: '5 Acres',
        crops: 'Tomato, Onion, Potato',
        farmingMethod: 'Conventional & Organic Drip Irrigation',
        fpo: 'MahaFarmers Cooperative Hub',
        upiId: 'ramesh.patil@okaxis',
        description: 'Family-owned farm focusing on high-quality vegetable production with drip irrigation and sustainable practices.'
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateUserProfile({
            name: form.name,
            phone: form.phone,
            location: { city: form.city, state: form.state }
        });
        setToastMsg('Farmer Profile & Farm Details updated successfully!');
        setIsEditOpen(false);
        setTimeout(() => setToastMsg(''), 4000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-emerald-100">My Farmer Profile</h1>
                    <p className="text-xs text-gray-500 dark:text-emerald-300 mt-0.5">Manage your farm gate verification & personal profile details</p>
                </div>
                <Button onClick={() => setIsEditOpen(true)} className="flex items-center gap-2 font-bold bg-emerald-700 hover:bg-emerald-800">
                    <Edit className="w-4 h-4"/> Edit Farmer Profile
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-100 p-4 rounded-xl flex items-center font-bold text-sm shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-300" /> {toastMsg}
                </div>
            )}

            <Card>
                <CardBody className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                        <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center text-emerald-800 dark:text-emerald-100 text-4xl font-extrabold border-4 border-white dark:border-emerald-700 shadow-lg">
                            {user?.name?.charAt(0) || 'R'}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user?.name || form.name}</h2>
                                {user?.isVerified && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300">
                                        <BadgeCheck className="w-4 h-4 mr-1 text-emerald-600"/> Verified Farmer Partner
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-center md:justify-start text-gray-600 dark:text-emerald-300 font-semibold text-sm">
                                <MapPin className="w-4 h-4 mr-1 text-emerald-600"/>
                                <span>{form.city}, {form.state} | Phone: {form.phone}</span>
                            </div>
                            
                            <div className="flex justify-center md:justify-start space-x-6 text-sm pt-2">
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-500 dark:text-emerald-400 font-medium">Buyer Rating</p>
                                    <p className="font-extrabold text-gray-900 dark:text-white flex items-center text-base">4.9 <Star className="w-4 h-4 text-amber-500 ml-1 fill-current"/></p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-500 dark:text-emerald-400 font-medium">Completed Orders</p>
                                    <p className="font-extrabold text-gray-900 dark:text-white text-base">124 Trips</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-500 dark:text-emerald-400 font-medium">Farm Area</p>
                                    <p className="font-extrabold text-gray-900 dark:text-white text-base">{form.farmSize}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="bg-gray-50/60 dark:bg-emerald-900/40">
                    <h3 className="text-base font-bold text-gray-900 dark:text-emerald-100 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-emerald-600" /> Farm & Crop Information
                    </h3>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-emerald-400 font-bold mb-1">Farm Name</p>
                            <p className="font-bold text-gray-900 dark:text-white">{form.farmName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-emerald-400 font-bold mb-1">Primary Harvested Crops</p>
                            <div className="flex flex-wrap gap-1.5">
                                {form.crops.split(',').map((crop, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-lg text-xs font-extrabold">
                                        {crop.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-emerald-400 font-bold mb-1">Farming Methods</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{form.farmingMethod}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-emerald-400 font-bold mb-1">FPO Affiliation</p>
                            <p className="font-bold text-emerald-700 dark:text-emerald-300">{form.fpo}</p>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100 dark:border-emerald-800">
                        <p className="text-xs text-gray-500 dark:text-emerald-400 font-bold mb-1">Farm Description</p>
                        <p className="text-sm text-gray-700 dark:text-emerald-200 leading-relaxed">{form.description}</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="bg-gray-50/60 dark:bg-emerald-900/40">
                    <h3 className="text-base font-bold text-gray-900 dark:text-emerald-100 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-emerald-600" /> Bank & Direct Wallet Settlement
                    </h3>
                </CardHeader>
                <CardBody className="space-y-3">
                    <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-emerald-800 rounded-xl bg-emerald-50/30 dark:bg-emerald-900/20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-xl flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-100 text-xs">
                                SBI
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">State Bank of India (Direct Farmer Transfer)</p>
                                <p className="text-xs text-gray-500 dark:text-emerald-300">UPI ID: {form.upiId} | Verified Direct Mandi Settlement</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-full">
                            Active Bank Account
                        </span>
                    </div>
                </CardBody>
            </Card>

            {/* Profile Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Farmer Profile & Farm Details">
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">Full Name</label>
                            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">Phone Number</label>
                            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">City / District</label>
                            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">State</label>
                            <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">Farm Name</label>
                            <Input value={form.farmName} onChange={(e) => setForm({ ...form, farmName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">Primary Crops (Comma separated)</label>
                            <Input value={form.crops} onChange={(e) => setForm({ ...form, crops: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 dark:text-emerald-200 mb-1">Farm Description</label>
                        <textarea 
                            value={form.description} 
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full p-2.5 border rounded-xl dark:bg-emerald-900/60 dark:border-emerald-700 dark:text-white"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                        <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 font-bold">Save Changes</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FarmerProfile;
