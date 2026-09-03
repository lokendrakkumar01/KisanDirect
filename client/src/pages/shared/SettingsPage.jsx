import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || 'Maharashtra, India'
    });

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Account & Platform Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your AgroConnect profile and preferences</p>
            </div>

            {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> Settings saved successfully!
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-green-600" /> Personal Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email"
                                    disabled
                                    value={formData.email}
                                    className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input 
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" /> Account Security & Role Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Account Role</p>
                            <p className="text-xs text-gray-500">Your role determines portal permissions and dashboard access</p>
                        </div>
                        <Badge variant="primary" className="capitalize">{user?.role ? user.role.replace('_', ' ') : 'User'}</Badge>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Verification Status</p>
                            <p className="text-xs text-gray-500">KYC and document verification status</p>
                        </div>
                        <Badge variant={user?.isVerified ? 'success' : 'warning'}>
                            {user?.isVerified ? 'Verified Account' : 'Pending Verification'}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export { SettingsPage };
