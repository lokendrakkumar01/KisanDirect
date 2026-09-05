import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, UserCheck, Sprout, Store, Truck, ShieldAlert, Users, ShieldCheck } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LanguageSelectionModal } from '../../components/ui/LanguageSelectionModal';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const requestedRole = searchParams.get('role');
    const initialRole = requestedRole === 'bulk_buyer' ? 'buyer' : (requestedRole || 'farmer');
    const [email, setEmail] = useState(`${initialRole}@demo.com`);
    const [password, setPassword] = useState('demo123');
    const [selectedRole, setSelectedRole] = useState(initialRole);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);
    const { user, isAuthenticated, login } = useAuth();
    const { language, setLanguage } = useLanguage();
    const navigate = useNavigate();

    const c = (enText, hiText, mrText) => {
        if (language === 'hi') return hiText;
        if (language === 'mr') return mrText || hiText;
        return enText;
    };

    React.useEffect(() => {
        if (isAuthenticated && user?.role && !isLangModalOpen && !pendingUser) {
            navigate(getRoleDashboardPath(user.role), { replace: true });
        }
    }, [isAuthenticated, user, navigate, isLangModalOpen, pendingUser]);

    const roleInfoMap = {
        farmer: { name: c('Farmer', 'किसान', 'शेतकरी'), icon: Sprout, color: 'text-green-600', bg: 'bg-green-50 border-green-200 text-green-800' },
        fpo: { name: c('FPO Admin', 'एफपीओ व्यवस्थापक', 'एफपीओ प्रशासक'), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200 text-blue-800' },
        buyer: { name: c('Bulk Buyer', 'थोक खरीदार', 'घाऊक खरेदीदार'), icon: Store, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200 text-purple-800' },
        consumer: { name: c('Consumer', 'उपभोक्ता', 'ग्राहक'), icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 text-amber-800' },
        logistics: { name: c('Driver Partner Portal', 'चालक पार्टनर पोर्टल', 'ड्रायव्हर पार्टनर पोर्टल'), icon: Truck, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
        admin: { name: c('Platform Admin', 'प्लेटफ़ॉर्म व्यवस्थापक', 'प्रशासक'), icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50 border-red-200 text-red-800' }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const loggedUser = await login({ email, password });
            setPendingUser(loggedUser);
            setIsLangModalOpen(true);
        }
        catch (err) {
            setError(err.message || c('Failed to login. Please check your credentials.', 'लॉगिन विफल रहा। कृपया अपने क्रेडेंशियल जांचें।', 'लॉगिन अयशस्वी. कृपया आपली माहिती तपासा.'));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleLanguageSelected = (selectedCode) => {
        setLanguage(selectedCode);
        setIsLangModalOpen(false);
        const target = pendingUser || user;
        if (target?.role) {
            navigate(getRoleDashboardPath(target.role));
        }
    };

    const setDemoCreds = (demoEmail, roleKey) => {
        setEmail(demoEmail);
        setPassword('demo123');
        setSelectedRole(roleKey);
    };

    const CurrentIcon = roleInfoMap[selectedRole]?.icon || Sprout;

    return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            {c('Welcome Back', 'वापसी पर स्वागत है', 'पुन्हा स्वागत आहे')}
                        </h2>
                        <p className="text-gray-500 mt-1 text-sm">
                            {c('Sign in to your AgroConnect Account', 'अपने कृषिकनेक्ट खाते में साइन इन करें', 'आपल्या कृषिकनेक्ट खात्यात साइन इन करा')}
                        </p>
                    </div>

                    {/* Team Password & Master Login Notice */}
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-xl mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold">
                                {c('Team Master Password:', 'टीम मास्टर पासवर्ड:', 'टीम मास्टर पासवर्ड:')} <strong className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-emerald-300">demo123</strong>
                            </span>
                        </div>
                        <span className="text-[11px] font-bold uppercase bg-emerald-700 text-white px-2.5 py-1 rounded-full">
                            {c('Auto Login Ready', 'ऑटो लॉगिन तैयार', 'ऑटो लॉगिन तयार')}
                        </span>
                    </div>

                    {/* Active Selected Role Indicator */}
                    <div className={`p-3 rounded-xl border mb-6 flex items-center justify-between ${roleInfoMap[selectedRole]?.bg || 'bg-green-50 border-green-200 text-green-800'}`}>
                        <div className="flex items-center gap-2">
                            <CurrentIcon className="w-5 h-5" />
                            <span className="text-sm font-bold">
                                {c('Logging in as:', 'इस रूप में लॉगिन कर रहे हैं:', 'या नात्याने लॉगिन करत आहात:')} {roleInfoMap[selectedRole]?.name || c('User', 'उपयोगकर्ता', 'वापरकर्ता')}
                            </span>
                        </div>
                        <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-white border opacity-90">
                            {selectedRole}
                        </span>
                    </div>

                    {/* Single-Click Role Quick Selectors */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            {c('Select Role Persona (Click to Auto-fill):', 'भूमिका चुनें (ऑटो-फिल के लिए क्लिक करें):', 'भूमिका निवडा (आपोआप भरण्यासाठी क्लिक करा):')}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            <button
                                type="button"
                                onClick={() => setDemoCreds('farmer@demo.com', 'farmer')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'farmer' ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Sprout className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('Farmer', 'किसान', 'शेतकरी')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">farmer@demo.com</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDemoCreds('fpo@demo.com', 'fpo')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'fpo' ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-600 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('FPO Admin', 'एफपीओ व्यवस्थापक', 'एफपीओ प्रशासक')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">fpo@demo.com</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDemoCreds('buyer@demo.com', 'buyer')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'buyer' ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-600 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Store className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('Bulk Buyer', 'थोक खरीदार', 'घाऊक खरेदीदार')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">buyer@demo.com</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDemoCreds('consumer@demo.com', 'consumer')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'consumer' ? 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-500 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <UserCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('Consumer', 'उपभोक्ता', 'ग्राहक')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">consumer@demo.com</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDemoCreds('logistics@demo.com', 'logistics')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'logistics' ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-700 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('Driver Partner', 'चालक पार्टनर', 'ड्रायव्हर पार्टनर')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">logistics@demo.com</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDemoCreds('admin@demo.com', 'admin')}
                                className={`p-2.5 text-xs font-bold rounded-xl border flex items-center gap-2 transition cursor-pointer ${
                                    selectedRole === 'admin' ? 'border-red-600 bg-red-50 text-red-800 ring-2 ring-red-600 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
                                <div className="text-left truncate">
                                    <div className="truncate">{c('Platform Admin', 'व्यवस्थापक', 'प्रशासक')}</div>
                                    <div className="text-[10px] text-gray-400 font-normal truncate">admin@demo.com</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                            <ShieldAlert className="w-5 h-5 mr-2 flex-shrink-0"/> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {c('Email Address', 'ईमेल पता', 'ईमेल पत्ता')}
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
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 text-sm" 
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {c('Password', 'पासवर्ड', 'पासवर्ड')}
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
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 text-sm" 
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button type="submit" fullWidth size="lg" isLoading={isLoading} className="font-bold cursor-pointer">
                            {c('Sign in to Account', 'खाते में साइन इन करें', 'खात्यात साइन इन करा')} ({roleInfoMap[selectedRole]?.name || 'User'})
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        {c("Don't have an account?", 'क्या आपका खाता नहीं है?', 'आपले खाते नाही?')} {' '}
                        <Link to="/register" className="font-bold text-green-600 hover:text-green-500">
                            {c('Register new account', 'नया खाता पंजीकृत करें', 'नवीन खात्याची नोंदणी करा')}
                        </Link>
                    </div>
                </div>
            </div>={() => setDemoCreds('logistics@demo.com', 'logistics')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-500 hover:shadow-sm transition group text-left cursor-pointer">
                                <Truck className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">
                                        {c('🚛 Driver Partner Portal', '🚛 चालक पार्टनर पोर्टल', '🚛 ड्रायव्हर पार्टनर पोर्टल')}
                                    </div>
                                    <div className="text-xs text-gray-500">logistics@demo.com</div>
                                </div>
                            </button>

                            <button onClick={() => setDemoCreds('admin@demo.com', 'admin')} className="w-full flex items-center p-3 bg-white border border-red-300 rounded-lg hover:border-red-600 hover:shadow-sm transition group text-left cursor-pointer">
                                <ShieldCheck className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">
                                        {c('🛡️ Platform Admin Portal (DoCA)', '🛡️ प्लेटफ़ॉर्म व्यवस्थापक पोर्टल', '🛡️ प्लॅटफॉर्म प्रशासक पोर्टल')}
                                    </div>
                                    <div className="text-xs text-gray-500">admin@demo.com</div>
                                </div>
                            </button>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-green-200 text-xs text-center text-gray-600">
                            {c('All demo passwords:', 'सभी डेमो पासवर्ड:', 'सर्व प्रात्यक्षिक पासवर्ड:')} <strong className="text-gray-900 font-bold">demo123</strong>
                        </div>
                    </div>
                </div>
            </div>

            <LanguageSelectionModal 
                isOpen={isLangModalOpen} 
                onClose={() => setIsLangModalOpen(false)} 
                onSelectLanguage={handleLanguageSelected} 
                targetRole={pendingUser?.role || selectedRole} 
            />
        </PublicLayout>
    );
};

export default LoginPage;
