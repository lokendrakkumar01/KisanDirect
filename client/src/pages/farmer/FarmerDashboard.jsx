import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, TrendingUp, CheckCircle, CreditCard, ArrowRight, Sun, BrainCircuit, Sparkles } from 'lucide-react';
import { getProfile, getListings, getEarnings, getHarvests } from '../../services/farmerService';
import { askGeminiAI } from '../../services/geminiAiService';
import { formatCurrency, formatDate } from '../../utils/format';
import { useLanguage } from '../../contexts/LanguageContext';

export const FarmerDashboard = () => {
    const { user } = useAuth();
    const { language, c } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [aiAdvice, setAiAdvice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, listingsRes, earningsRes, harvestsRes] = await Promise.all([
                    getProfile(),
                    getListings(),
                    getEarnings(),
                    getHarvests(),
                ]);

                setData({
                    profile: profileRes.data,
                    listings: listingsRes.data || [],
                    earnings: earningsRes.data || { total: 0, pending: 0 },
                    harvests: harvestsRes.data || []
                });

                // Fetch Gemini AI insight for Tomato crop
                const aiResult = await askGeminiAI('Give me a quick 3-line market demand insight for Tomatoes in Nashik and Pune.', 'farmer', language);
                setAiAdvice(aiResult);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return c('Good Morning', 'शुभ प्रभात', 'शुभ सकाळ');
        if (hour < 18) return c('Good Afternoon', 'शुभ दोपहर', 'शुभ दुपार');
        return c('Good Evening', 'शुभ संध्या', 'शुभ संध्या');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user?.name}</h1>
                    <p className="text-gray-500 mt-1">{c("Here's what's happening with your farm today.", 'आज आपके खेत और उपज की जानकारी यहाँ है:', 'आज तुमच्या शेतात काय चालले आहे ते येथे आहे:')}</p>
                </div>
                <div className="flex space-x-3">
                    <Button 
                        variant="outline" 
                        leftIcon={<BrainCircuit className="w-4 h-4 text-purple-600"/>}
                        onClick={() => navigate('/farmer/insights')}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 font-bold"
                    >
                        {c('AI Insights', 'एआई सलाह', 'AI सल्ला')}
                    </Button>
                    <Button 
                        leftIcon={<Package className="w-4 h-4"/>}
                        onClick={() => navigate('/farmer/add-produce')}
                        className="bg-green-600 hover:bg-green-700 font-bold"
                    >
                        {c('Add Produce ➕', 'उपज जोड़ें ➕', 'उत्पादन जोडा ➕')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={c('Total Produce Listed', 'कुल सूचीबद्ध उपज', 'एकूण नोंदवलेली उत्पादने')} value={data?.listings.length || 0} icon={<Package className="w-6 h-6"/>}/>
                <StatCard title={c('Active Orders', 'सक्रिय ऑर्डर', 'सक्रिय ऑर्डर्स')} value={3} icon={<TrendingUp className="w-6 h-6"/>}/>
                <StatCard title={c('Total Earnings', 'कुल कमाई', 'एकूण उत्पन्न')} value={formatCurrency(data?.earnings.total || 0)} icon={<CheckCircle className="w-6 h-6"/>} trend={{ value: 12, isPositive: true }}/>
                <StatCard title={c('Pending Payments', 'बकाया भुगतान', 'प्रलंबित देयके')} value={formatCurrency(data?.earnings.pending || 0)} icon={<CreditCard className="w-6 h-6"/>}/>
            </div>

            {/* Gemini AI Powered Market Insight Card */}
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-800 px-6 py-3 flex justify-between items-center text-white">
                    <div className="flex items-center space-x-2">
                        <BrainCircuit className="w-5 h-5 text-amber-300"/>
                        <h3 className="font-bold text-base flex items-center gap-1.5">
                            {c('Gemini AI Market Insight: Tomato', 'जेमिनी एआई बाज़ार विश्लेषण: टमाटर', 'जेमिनी AI बाजार सल्ला: टोमॅटो')} <Sparkles className="w-4 h-4 text-amber-300 fill-current"/>
                        </h3>
                    </div>
                    <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full border border-white/30 font-extrabold uppercase tracking-wider backdrop-blur-sm">
                        Gemini 1.5 Flash AI Engine
                    </span>
                </div>
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{c('Expected Demand', 'अपेक्षित मांग', 'अपेक्षित मागणी')}</p>
                            <p className="text-xl font-bold text-gray-900">4,500 KG</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{c('Current Listed Supply', 'वर्तमान आपूर्ति', 'सध्याचा पुरवठा')}</p>
                            <p className="text-xl font-bold text-gray-900">3,200 KG</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{c('Demand-Supply Gap', 'मांग-आपूर्ति अंतर', 'मागणी-पुरवठा तफावत')}</p>
                            <p className="text-xl font-bold text-amber-600">1,300 KG</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">{c('Trend', 'रुझान', 'कल')}</p>
                            <p className="text-xl font-bold text-green-600">{c('+18% High', '+18% अधिक', '+18% जास्त')}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-green-200 flex items-start shadow-sm">
                        <Sun className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0"/>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 text-sm">{c('Gemini AI Real-time Recommendation', 'जेमिनी एआई वास्तविक समय की सलाह', 'जेमिनी AI रिअल-टाइम शिफारस')}</p>
                            <p className="text-gray-700 text-sm mt-1 leading-relaxed whitespace-pre-wrap">{aiAdvice}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">{c('Recent Orders', 'हाल के ऑर्डर', 'नुकत्याच आलेल्या ऑर्डर्स')}</h2>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                rightIcon={<ArrowRight className="w-4 h-4"/>}
                                onClick={() => navigate('/farmer/orders')}
                            >
                                {c('View All', 'सभी देखें', 'सर्व पहा')}
                            </Button>
                        </CardHeader>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{c('Order', 'ऑर्डर', 'ऑर्डर')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{c('Product', 'उत्पाद', 'उत्पादन')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{c('Amount', 'राशि', 'रक्कम')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{c('Status', 'स्थिति', 'स्थिती')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">#ORD-092</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c('Fresh Red Tomato (100 KG)', 'ताज़ा लाल टमाटर (100 KG)', 'ताजे लाल टोमॅटो (100 KG)')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{formatCurrency(3500)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-yellow-100 text-yellow-800">{c('Pending Pickup', 'पिकअप लंबित', 'पिकअप प्रलंबित')}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">#ORD-091</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c('Nashik Red Onion (500 KG)', 'नासिक लाल प्याज (500 KG)', 'नाशिक लाल कांदा (500 KG)')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{formatCurrency(15000)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-green-100 text-green-800">{c('Completed', 'पूर्ण', 'पूर्ण')}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-bold text-gray-900">{c('Upcoming Harvests', 'आगामी कटाई', 'येणारी सुगी')}</h2>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{c('Fresh Tomatoes', 'ताज़ा टमाटर', 'ताजे टोमॅटो')}</p>
                                    <p className="text-xs text-gray-500">{c('Expected 08 Sept 2026', 'अपेक्षित 08 सितंबर 2026', 'अपेक्षित 08 सप्टेंबर 2026')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-gray-900">500 KG</p>
                                    <p className="text-[10px] font-bold text-green-600 uppercase">{c('Ready Soon', 'जल्द तैयार', 'लवकरच तयार')}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{c('Organic Potatoes', 'जैविक आलू', 'सेंद्रिय बटाटे')}</p>
                                    <p className="text-xs text-gray-500">{c('Expected 15 Sept 2026', 'अपेक्षित 15 सितंबर 2026', 'अपेक्षित 15 सप्टेंबर 2026')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-gray-900">800 KG</p>
                                    <p className="text-[10px] font-bold text-amber-600 uppercase">{c('Growing', 'बढ़ रहा है', 'वाढत आहे')}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
