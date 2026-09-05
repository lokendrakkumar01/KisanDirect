import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, UserCheck, Sprout, Store, Truck, ShieldAlert, Users, ShieldCheck } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';

export const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const requestedRole = searchParams.get('role');
    const initialRole = requestedRole === 'bulk_buyer' ? 'buyer' : (requestedRole || 'farmer');
    const [email, setEmail] = useState(`${initialRole}@demo.com`);
    const [password, setPassword] = useState('demo123');
    const [selectedRole, setSelectedRole] = useState(initialRole);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const roleInfoMap = {
        farmer: { name: 'Farmer', icon: Sprout, color: 'text-green-600', bg: 'bg-green-50 border-green-200 text-green-800' },
        fpo: { name: 'FPO Admin', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200 text-blue-800' },
        buyer: { name: 'Bulk Buyer', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200 text-purple-800' },
        consumer: { name: 'Consumer', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 text-amber-800' },
        logistics: { name: 'Driver Partner Portal', icon: Truck, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
        admin: { name: 'Platform Admin', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50 border-red-200 text-red-800' }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const loggedUser = await login({ email, password });
            navigate(getRoleDashboardPath(loggedUser.role));
        }
        catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        }
        finally {
            setIsLoading(false);
        }
    };

    const setDemoCreds = (demoEmail, roleKey) => {
        setEmail(demoEmail);
        setPassword('demo123');
        setSelectedRole(roleKey);
    };

    const CurrentIcon = roleInfoMap[selectedRole]?.icon || Sprout;

    return (
        <PublicLayout>
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Main Login Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-500 mt-1">Sign in to your AgroConnect Account</p>
                            <div className="mt-3">
                                <Link to="/admin/login" className="inline-flex items-center text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-100 transition">
                                    <ShieldCheck className="w-4 h-4 mr-1" /> Dedicated Platform Admin Login Portal &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* Clear Selected Role Banner */}
                        <div className={`p-3 rounded-lg border mb-6 flex items-center justify-between ${roleInfoMap[selectedRole]?.bg || 'bg-green-50 border-green-200 text-green-800'}`}>
                            <div className="flex items-center gap-2">
                                <CurrentIcon className="w-5 h-5" />
                                <span className="text-sm font-bold">
                                    Logging in as: {roleInfoMap[selectedRole]?.name || 'User'}
                                </span>
                            </div>
                            <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-white border opacity-80">
                                {selectedRole}
                            </span>
                        </div>

                        {/* Quick Role Selector Buttons */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Your Role:</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDemoCreds('farmer@demo.com', 'farmer')}
                                    className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                        selectedRole === 'farmer' ? 'border-green-600 bg-green-50 text-green-700 ring-2 ring-green-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Sprout className="w-4 h-4 text-green-600" />
                                    Farmer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDemoCreds('fpo@demo.com', 'fpo')}
                                    className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                        selectedRole === 'fpo' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Users className="w-4 h-4 text-blue-600" />
                                    FPO Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDemoCreds('buyer@demo.com', 'buyer')}
                                    className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                        selectedRole === 'buyer' ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Store className="w-4 h-4 text-purple-600" />
                                    Bulk Buyer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDemoCreds('consumer@demo.com', 'consumer')}
                                    className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                        selectedRole === 'consumer' ? 'border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <UserCheck className="w-4 h-4 text-amber-500" />
                                    Consumer
                                </button>
                                <button
                                     type="button"
                                     onClick={() => setDemoCreds('logistics@demo.com', 'logistics')}
                                     className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                         selectedRole === 'logistics' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                     }`}
                                 >
                                     <Truck className="w-4 h-4 text-emerald-600" />
                                     Driver Partner Portal
                                 </button>
                                <button
                                    type="button"
                                    onClick={() => setDemoCreds('admin@demo.com', 'admin')}
                                    className={`p-2 text-xs font-bold rounded-lg border text-center flex flex-col items-center gap-1 transition ${
                                        selectedRole === 'admin' ? 'border-red-600 bg-red-50 text-red-700 ring-2 ring-red-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <ShieldCheck className="w-4 h-4 text-red-600" />
                                    Admin
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                                <ShieldAlert className="w-5 h-5 mr-2"/> {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input 
                                        type="email" 
                                        required 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input 
                                        type="password" 
                                        required 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                                Sign in to {roleInfoMap[selectedRole]?.name || 'Account'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                                Register now
                            </Link>
                        </div>
                    </div>

                    {/* Demo Mode Panel */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">SIH 2026 Quick Demo Login</h3>
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold uppercase">Prototype</span>
                        </div>
                        <p className="text-gray-700 mb-6 text-sm">
                            Click any persona to auto-fill credentials for testing:
                        </p>

                        <div className="space-y-3">
                            <button onClick={() => setDemoCreds('farmer@demo.com', 'farmer')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-sm transition group text-left">
                                <Sprout className="w-5 h-5 text-green-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🌾 Farmer Portal (Ramesh Patil)</div>
                                    <div className="text-xs text-gray-500">farmer@demo.com</div>
                                </div>
                            </button>
                            
                            <button onClick={() => setDemoCreds('fpo@demo.com', 'fpo')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition group text-left">
                                <Users className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🏭 FPO Admin Portal (Nashik FPO)</div>
                                    <div className="text-xs text-gray-500">fpo@demo.com</div>
                                </div>
                            </button>

                            <button onClick={() => setDemoCreds('buyer@demo.com', 'buyer')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-sm transition group text-left">
                                <Store className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🏢 Bulk Buyer Portal (Pune Fresh)</div>
                                    <div className="text-xs text-gray-500">buyer@demo.com</div>
                                </div>
                            </button>

                            <button onClick={() => setDemoCreds('consumer@demo.com', 'consumer')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-sm transition group text-left">
                                <UserCheck className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🛒 Consumer Portal</div>
                                    <div className="text-xs text-gray-500">consumer@demo.com</div>
                                </div>
                            </button>

                            <button onClick={() => setDemoCreds('logistics@demo.com', 'logistics')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-500 hover:shadow-sm transition group text-left">
                                <Truck className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🚛 Logistics Operator Portal</div>
                                    <div className="text-xs text-gray-500">logistics@demo.com</div>
                                </div>
                            </button>

                            <button onClick={() => setDemoCreds('admin@demo.com', 'admin')} className="w-full flex items-center p-3 bg-white border border-red-300 rounded-lg hover:border-red-600 hover:shadow-sm transition group text-left">
                                <ShieldCheck className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">🛡️ Platform Admin Portal (DoCA)</div>
                                    <div className="text-xs text-gray-500">admin@demo.com</div>
                                </div>
                            </button>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-green-200 text-xs text-center text-gray-600">
                            All demo passwords: <strong className="text-gray-900 font-bold">demo123</strong>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default LoginPage;
