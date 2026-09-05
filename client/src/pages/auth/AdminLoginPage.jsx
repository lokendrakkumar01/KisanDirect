import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ShieldAlert, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LanguageSelectionModal } from '../../components/ui/LanguageSelectionModal';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminLoginPage = () => {
    const [email, setEmail] = useState('admin@demo.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);
    const { login } = useAuth();
    const { setLanguage } = useLanguage();
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const loggedUser = await login({ email, password });
            if (loggedUser.role !== 'admin') {
                setError('Access Denied. Only authorized Platform Admins can log in here.');
                setIsLoading(false);
                return;
            }
            setIsLangModalOpen(true);
        }
        catch (err) {
            setError(err.message || 'Failed to login as Admin. Please verify credentials.');
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleLanguageSelected = (selectedCode) => {
        setLanguage(selectedCode);
        setIsLangModalOpen(false);
        navigate(getRoleDashboardPath('admin'));
    };

    return (
        <PublicLayout>
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-red-500 relative">
                        {/* Header Banner */}
                        <div className="text-center mb-6">
                            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3 border-2 border-red-200">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <Badge variant="danger" className="text-xs px-3 py-1 mb-2">
                                DoCA Official Governance Portal
                            </Badge>
                            <h2 className="text-2xl font-extrabold text-gray-900">Platform Admin Login</h2>
                            <p className="text-xs text-gray-500 mt-1">SIH 2026 Problem Statement 26033 Administration</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm flex items-center">
                                <ShieldAlert className="w-5 h-5 mr-2 flex-shrink-0"/> {error}
                            </div>
                        )}

                        <form onSubmit={handleAdminLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Admin Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input 
                                        type="email" 
                                        required 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm font-medium" 
                                        placeholder="admin@demo.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Admin Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input 
                                        type="password" 
                                        required 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm font-medium" 
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                fullWidth 
                                size="lg" 
                                isLoading={isLoading}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold"
                            >
                                Sign In to Admin Dashboard 🛡️
                            </Button>
                        </form>

                        <div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 -mx-8 -mb-8 p-4 rounded-b-2xl text-center">
                            <p className="text-xs text-gray-500 mb-2">Standard user login (Farmer, FPO, Buyer, Consumer)?</p>
                            <Link to="/login" className="text-xs font-bold text-green-600 hover:underline">
                                Go to Standard Portal Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <LanguageSelectionModal 
                isOpen={isLangModalOpen} 
                onClose={() => setIsLangModalOpen(false)} 
                onSelectLanguage={handleLanguageSelected} 
                targetRole="admin" 
            />
        </PublicLayout>
    );
};

export default AdminLoginPage;
