import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Sprout, Store, UserCheck, ShieldAlert, Users, Truck } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [role, setRole] = useState('farmer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated, register } = useAuth();
    const { language } = useLanguage();
    const navigate = useNavigate();

    const c = (enText, hiText, mrText) => {
        if (language === 'hi') return hiText;
        if (language === 'mr') return mrText || hiText;
        return enText;
    };

    React.useEffect(() => {
        if (isAuthenticated && user?.role) {
            navigate(getRoleDashboardPath(user.role), { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const roleMap = {
        farmer: { 
            label: c('Farmer 🌾', 'किसान 🌾', 'शेतकरी 🌾'), 
            desc: c('Direct sell produce to buyers and FPOs', 'खरीदारों और एफपीओ को सीधे फसल बेचें', 'खरेदीदार आणि एफपीओना थेट शेतमाल विका') 
        },
        fpo: { 
            label: c('FPO Admin 🏭', 'एफपीओ व्यवस्थापक 🏭', 'एफपीओ प्रशासक 🏭'), 
            desc: c('Aggregate produce from farmer members', 'किसान सदस्यों से उपज एकत्र करें', 'शेतकरी सदस्यांकडून शेतमाल संकलित करा') 
        },
        consumer: { 
            label: c('Consumer 🛒', 'उपभोक्ता 🛒', 'ग्राहक 🛒'), 
            desc: c('Buy farm-fresh produce directly from local farmers', 'स्थानीय किसानों से सीधे ताज़ी फसलें खरीदें', 'स्थानिक शेतकर्‍यांकडून थेट ताज्या पिके खरेदी करा') 
        },
        bulk_buyer: { 
            label: c('Bulk Buyer 🏢', 'थोक खरीदार 🏢', 'घाऊक खरेदीदार 🏢'), 
            desc: c('Post bulk requirements for restaurants, hotels & supermarkets', 'रेस्तरां, होटल और सुपरमार्केट के लिए थोक मांग पोस्ट करें', 'हॉटेल्स आणि सुपरमार्केटसाठी घाऊक मागणी पोस्ट करा') 
        },
        logistics: { 
            label: c('Driver Partner Portal 🚛', 'चालक पार्टनर पोर्टल 🚛', 'ड्रायव्हर पार्टनर पोर्टल 🚛'), 
            desc: c('Access active trips, OTP delivery verification & route maps', 'एक्टिव ट्रिप्स, ओटीपी डिलीवरी और रूट मैप का उपयोग करें', 'सक्रिय ट्रिप्स, ओटीपी डिलिव्हरी आणि मार्ग नकाशा वापरा') 
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.name || !formData.email || !formData.password) {
            setError(c('Please fill in all required fields', 'कृपया सभी आवश्यक फ़ील्ड भरें', 'कृपया सर्व आवश्यक फील्ड भरा'));
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError(c('Passwords do not match', 'पासवर्ड मेल नहीं खाते', 'पासवर्ड जुळत नाहीत'));
            return;
        }
        if (formData.password.length < 6) {
            setError(c('Password must be at least 6 characters long', 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए', 'पासवर्ड किमान 6 अक्षरांचा असावा'));
            return;
        }
        setIsLoading(true);
        try {
            const newUser = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: role
            });
            navigate(getRoleDashboardPath(newUser.role));
        }
        catch (err) {
            setError(err.message || c('Failed to register. Please try again.', 'पंजीकरण करने में विफल। कृपया पुनः प्रयास करें।', 'नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.'));
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <PublicLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            {c('Create your AgroConnect Account', 'अपना कृषिकनेक्ट खाता बनाएं', 'आपले कृषिकनेक्ट खाते तयार करा')}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {c("Join India's smartest direct agricultural marketplace", 'भारत के सबसे स्मार्ट सीधे कृषि बाज़ार से जुड़ें', 'भारतातील सर्वात स्मार्ट थेट कृषी बाजारपेठेत सामील व्हा')}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8">

                            {/* Active Role Indicator Banner */}
                            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-green-600 font-bold uppercase block">
                                        {c('Selected Account Type', 'चुना गया खाता प्रकार', 'निवडलेला खाते प्रकार')}
                                    </span>
                                    <span className="font-bold text-base text-gray-900">{roleMap[role]?.label}</span>
                                    <p className="text-xs text-green-700 mt-0.5">{roleMap[role]?.desc}</p>
                                </div>
                                <span className="bg-green-600 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase">
                                    {role.replace('_', ' ')}
                                </span>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                                    <ShieldAlert className="w-5 h-5 mr-2 flex-shrink-0"/> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Role Selection Grid - 5 Roles */}
                                <div className="mb-8">
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        {c('Choose Your Account Role:', 'अपनी खाता भूमिका चुनें:', 'आपली खाते भूमिका निवडा:')}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                        <button 
                                            type="button" 
                                            onClick={() => setRole('farmer')} 
                                            className={`flex flex-col items-center p-3.5 border-2 rounded-xl transition-all cursor-pointer ${
                                                role === 'farmer' ? 'border-green-600 bg-green-50 text-green-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            <Sprout className={`w-7 h-7 mb-1.5 ${role === 'farmer' ? 'text-green-600' : 'text-gray-400'}`}/>
                                            <span className="font-semibold text-xs text-center">{c('Farmer', 'किसान', 'शेतकरी')}</span>
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            onClick={() => setRole('fpo')} 
                                            className={`flex flex-col items-center p-3.5 border-2 rounded-xl transition-all cursor-pointer ${
                                                role === 'fpo' ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            <Users className={`w-7 h-7 mb-1.5 ${role === 'fpo' ? 'text-blue-600' : 'text-gray-400'}`}/>
                                            <span className="font-semibold text-xs text-center">{c('FPO', 'एफपीओ', 'एफपीओ')}</span>
                                        </button>

                                        <button 
                                            type="button" 
                                            onClick={() => setRole('consumer')} 
                                            className={`flex flex-col items-center p-3.5 border-2 rounded-xl transition-all cursor-pointer ${
                                                role === 'consumer' ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            <UserCheck className={`w-7 h-7 mb-1.5 ${role === 'consumer' ? 'text-amber-500' : 'text-gray-400'}`}/>
                                            <span className="font-semibold text-xs text-center">{c('Consumer', 'उपभोक्ता', 'ग्राहक')}</span>
                                        </button>

                                        <button 
                                            type="button" 
                                            onClick={() => setRole('bulk_buyer')} 
                                            className={`flex flex-col items-center p-3.5 border-2 rounded-xl transition-all cursor-pointer ${
                                                role === 'bulk_buyer' ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            <Store className={`w-7 h-7 mb-1.5 ${role === 'bulk_buyer' ? 'text-purple-600' : 'text-gray-400'}`}/>
                                            <span className="font-semibold text-xs text-center">{c('Bulk Buyer', 'थोक खरीदार', 'घाऊक खरेदीदार')}</span>
                                        </button>

                                        <button 
                                            type="button" 
                                            onClick={() => setRole('logistics')} 
                                            className={`flex flex-col items-center p-3.5 border-2 rounded-xl transition-all cursor-pointer ${
                                                role === 'logistics' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            <Truck className={`w-7 h-7 mb-1.5 ${role === 'logistics' ? 'text-indigo-600' : 'text-gray-400'}`}/>
                                            <span className="font-semibold text-xs text-center">{c('Driver Partner', 'चालक पार्टनर', 'ड्रायव्हर पार्टनर')}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {c('Full Name / Business Name *', 'पूरा नाम / व्यवसाय का नाम *', 'पूर्ण नाव / व्यवसायाचे नाव *')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                required 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" 
                                                placeholder={role === 'logistics' ? 'e.g. Speedy Logistics Transport' : 'e.g. Ramesh Patil'}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {c('Email Address *', 'ईमेल पता *', 'ईमेल पत्ता *')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                required 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" 
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {c('Phone Number', 'फोन नंबर', 'फोन नंबर')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                value={formData.phone} 
                                                onChange={handleChange} 
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" 
                                                placeholder="+91 9876543210"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {c('Password *', 'पासवर्ड *', 'पासवर्ड *')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input 
                                                type="password" 
                                                name="password" 
                                                required 
                                                minLength={6} 
                                                value={formData.password} 
                                                onChange={handleChange} 
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" 
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {c('Confirm Password *', 'पासवर्ड की पुष्टि करें *', 'पासवर्डची खात्री करा *')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input 
                                                type="password" 
                                                name="confirmPassword" 
                                                required 
                                                minLength={6} 
                                                value={formData.confirmPassword} 
                                                onChange={handleChange} 
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" 
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" fullWidth size="lg" isLoading={isLoading} className="font-bold cursor-pointer">
                                    {c('Register as', 'इस रूप में पंजीकरण करें', 'या नात्याने नोंदणी करा')} {roleMap[role]?.label.split(' ')[0]}
                                </Button>
                            </form>
                        </div>
                        
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center text-sm">
                            {c('Already have an account?', 'क्या आपके पास पहले से खाता है?', 'आपले आधीच खाते आहे का?')} {' '}
                            <Link to="/login" className="font-bold text-green-600 hover:text-green-500">
                                {c('Sign in instead', 'इसके बजाय साइन इन करें', 'साइन इन करा')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default RegisterPage;
