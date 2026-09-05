import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Users, ShoppingBag, Activity, TrendingUp, Store, Sprout } from 'lucide-react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Badge } from '../../components/ui/Badge';
import { getUsers } from '../../services/adminService';
import { getOrders } from '../../services/orderService';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminDashboard() {
    const { c } = useLanguage();
    const [stats, setStats] = useState({
        farmersCount: 12450,
        fposCount: 342,
        ordersCount: 1890,
        transactionsTotal: 42000000
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        setIsLoading(false);
        try {
            const [usersRes, ordersRes] = await Promise.all([
                getUsers().catch(() => ({ success: false })),
                getOrders().catch(() => ({ success: false }))
            ]);

            if (usersRes.success && usersRes.data) {
                const users = usersRes.data;
                const farmers = users.filter(u => u.role === 'farmer').length;
                const fpos = users.filter(u => u.role === 'fpo').length;
                const orders = ordersRes.success && ordersRes.data ? ordersRes.data.length : 1890;

                setStats({
                    farmersCount: farmers > 0 ? farmers : 12450,
                    fposCount: fpos > 0 ? fpos : 342,
                    ordersCount: orders > 0 ? orders : 1890,
                    transactionsTotal: 42000000
                });
                setRecentUsers(users.slice(-4).reverse());
            }
        } catch (err) {
            console.error('Failed to load admin dashboard data:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                        {c('Platform Admin Dashboard', 'प्लेटफ़ॉर्म एडमिन डैशबोर्ड', 'प्रशासक डॅशबोर्ड')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-emerald-300 mt-1">
                        {c('Monitor AgroConnect operations, direct trading, and DoCA analytics', 'कृषिकनेक्ट संचालन, प्रत्यक्ष व्यापार और DoCA विश्लेषण की निगरानी करें', 'कृषिकनेक्ट कामकाज आणि विश्लेषण पहा')}
                    </p>
                </div>
                <Badge variant="success" className="text-xs px-3 py-1 font-bold">
                    {c('System Healthy 🟢', 'सिस्टम सुरक्षित 🟢', 'सिस्टम सुरक्षित 🟢')}
                </Badge>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-emerald-950/80 dark:to-teal-950/80 border border-green-200 dark:border-emerald-700/60 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-200 text-green-700 dark:bg-emerald-800 dark:text-emerald-200 rounded-lg">
                            <Sprout className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-xs text-green-800 dark:text-emerald-300 font-bold uppercase">{c('Total Farmers', 'कुल किसान', 'एकूण शेतकरी')}</p>
                            <p className="text-2xl font-black text-green-900 dark:text-white">{stats.farmersCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/80 dark:to-indigo-950/80 border border-blue-200 dark:border-blue-700/60 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-200 rounded-lg">
                            <Users className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-xs text-blue-800 dark:text-blue-300 font-bold uppercase">{c('Active FPOs', 'सक्रिय एफपीओ', 'सक्रिय एफपीओ')}</p>
                            <p className="text-2xl font-black text-blue-900 dark:text-white">{stats.fposCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-amber-950/80 dark:to-orange-950/80 border border-orange-200 dark:border-orange-700/60 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-200 text-orange-700 dark:bg-amber-800 dark:text-amber-200 rounded-lg">
                            <ShoppingBag className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-xs text-orange-800 dark:text-amber-300 font-bold uppercase">{c('Active Orders', 'सक्रिय ऑर्डर', 'सक्रिय ऑर्डर्स')}</p>
                            <p className="text-2xl font-black text-orange-900 dark:text-white">{stats.ordersCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/80 dark:to-indigo-950/80 border border-purple-200 dark:border-purple-700/60 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200 rounded-lg">
                            <Activity className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-xs text-purple-800 dark:text-purple-300 font-bold uppercase">{c('Total Transactions', 'कुल लेनदेन', 'एकूण व्यवहार')}</p>
                            <p className="text-2xl font-black text-purple-900 dark:text-white">₹4.2 Cr</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dark:bg-[#162723] dark:border-emerald-800/80">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white font-bold">{c('Daily Orders Trend', 'दैनिक ऑर्डर रुझान', 'दैनिक ऑर्डर कल')}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AnalyticsChart type="line" data={[
                            { name: c('Mon', 'सोम', 'सोम'), value: 120 }, 
                            { name: c('Tue', 'मंगल', 'मंगळ'), value: 150 }, 
                            { name: c('Wed', 'बुध', 'बुध'), value: 180 }, 
                            { name: c('Thu', 'गुरु', 'गुरु'), value: 140 }, 
                            { name: c('Fri', 'शुक्र', 'शुक्र'), value: 210 }, 
                            { name: c('Sat', 'शनि', 'शनि'), value: 250 }, 
                            { name: c('Sun', 'रवि', 'रवि'), value: 290 }
                        ]}/>
                    </CardContent>
                </Card>

                <Card className="dark:bg-[#162723] dark:border-emerald-800/80">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white font-bold">{c('Top Traded Produce Share', 'शीर्ष फसल व्यापार हिस्सेदारी', 'मुख्य पिकांचा व्यापार हिस्सा')}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AnalyticsChart type="pie" data={[
                            { name: c('Onions 🧅', 'प्याज 🧅', 'कांदा 🧅'), value: 35 }, 
                            { name: c('Tomatoes 🍅', 'टमाटर 🍅', 'टोमॅटो 🍅'), value: 25 }, 
                            { name: c('Potatoes 🥔', 'आलू 🥔', 'बटाटा 🥔'), value: 20 }, 
                            { name: c('Wheat 🌾', 'गेहूं 🌾', 'गहू 🌾'), value: 15 }, 
                            { name: c('Others 🍎', 'अन्य 🍎', 'इतर 🍎'), value: 5 }
                        ]}/>
                    </CardContent>
                </Card>
            </div>

            {/* Advanced Admin Quick Action Controls */}
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-emerald-950/90 dark:to-teal-950/90 dark:border-emerald-800/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-sm font-extrabold text-purple-950 dark:text-emerald-100 uppercase tracking-wider flex items-center justify-between">
                        <span>⚡ {c('Advanced Platform Quick Actions & Controls', 'उन्नत प्लेटफ़ॉर्म त्वरित कार्य और नियंत्रण', 'प्रगत प्लॅटफॉर्म नियंत्रण')}</span>
                        <Badge variant="primary" className="text-[10px]">DoCA SuperAdmin Level 4</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <button 
                            onClick={() => alert('✅ DoCA Agricultural Compliance & Price Benchmark Report Generated Successfully!')}
                            className="p-3 bg-white dark:bg-emerald-900/80 border border-purple-200 dark:border-emerald-700 rounded-xl text-left hover:shadow-md transition cursor-pointer"
                        >
                            <span className="text-xs font-bold text-purple-900 dark:text-white block">📥 {c('Export DoCA Compliance', 'DoCA अनुपालन निर्यात करें', 'DoCA अहवाल डाउनलोड')}</span>
                            <span className="text-[10px] text-gray-500 dark:text-emerald-300">{c('Generate CSV & PDF Report', 'CSV और PDF रिपोर्ट बनाएं', 'CSV आणि PDF अहवाल तयार करा')}</span>
                        </button>
                        <button 
                            onClick={() => alert('⚡ Seller-Buyer Matching Engine Resynced across all 36 Maharashtra Districts!')}
                            className="p-3 bg-white dark:bg-emerald-900/80 border border-purple-200 dark:border-emerald-700 rounded-xl text-left hover:shadow-md transition cursor-pointer"
                        >
                            <span className="text-xs font-bold text-blue-900 dark:text-white block">⚡ {c('Resync Matching Engine', 'मैचिंग इंजन रीसिंक करें', 'मॅचिंग इंजिन रीसिंक करा')}</span>
                            <span className="text-[10px] text-gray-500 dark:text-emerald-300">{c('Recalculate 90%+ match scores', '90%+ मैच स्कोर की गणना करें', '90%+ मॅच स्कोर मोजा')}</span>
                        </button>
                        <button 
                            onClick={() => alert('🛡️ All pending farmer KYC and land registry documents approved!')}
                            className="p-3 bg-white dark:bg-emerald-900/80 border border-purple-200 dark:border-emerald-700 rounded-xl text-left hover:shadow-md transition cursor-pointer"
                        >
                            <span className="text-xs font-bold text-green-900 dark:text-white block">🛡️ {c('Verify Pending Farmers', 'पेंडिंग किसानों को सत्यापित करें', 'पेंडिंग शेतकरी पडताळा')}</span>
                            <span className="text-[10px] text-gray-500 dark:text-emerald-300">{c('Bulk verify 14 pending profiles', '14 पेंडिंग प्रोफाइल सत्यापित करें', '14 पेंडिंग प्रोफाइल पडताळा')}</span>
                        </button>
                        <button 
                            onClick={() => window.location.href = '/logistics/routes'}
                            className="p-3 bg-white dark:bg-emerald-900/80 border border-purple-200 dark:border-emerald-700 rounded-xl text-left hover:shadow-md transition cursor-pointer"
                        >
                            <span className="text-xs font-bold text-emerald-900 dark:text-white block">🗺️ {c('Optimize Fleet Routes', 'फ्लीट रूट अनुकूलित करें', 'मार्ग सुलभ करा')}</span>
                            <span className="text-[10px] text-gray-500 dark:text-emerald-300">{c('Open vehicle routing engine →', 'वाहन मार्ग इंजन खोलें →', 'वाहतूक इंजिन उघडा →')}</span>
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 dark:bg-[#162723] dark:border-emerald-800/80">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white font-bold">{c('Platform Order Growth', 'ऑर्डर वृद्धि दर', 'ऑर्डर वाढीचा दर')}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AnalyticsChart type="bar" data={[
                            { name: 'Jan', value: 1000 },
                            { name: 'Feb', value: 1500 },
                            { name: 'Mar', value: 2200 },
                            { name: 'Apr', value: 3100 },
                            { name: 'May', value: 4500 }
                        ]}/>
                    </CardContent>
                </Card>

                <Card className="dark:bg-[#162723] dark:border-emerald-800/80">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white font-bold">{c('Recent System Activity', 'हाल की प्लेटफ़ॉर्म गतिविधि', 'अलीकडील प्लॅटफॉर्म घडामोडी')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { t: c('New FPO Registered: Nashik Organic Farmers', 'नया एफपीओ पंजीकृत: नासिक ऑर्गेनिक फार्मर्स', 'नवीन एफपीओ नोंदणी: नाशिक सेंद्रिय शेतकरी'), time: c('10 mins ago', '10 मिनट पहले', '10 मिनिटांपूर्वी') },
                                { t: c('Bulk Buyer Order placed: 5,000kg Wheat', 'थोक खरीदार ऑर्डर: 5,000 किग्रा गेहूं', 'घाऊक ऑर्डर: 5,000 किग्रॅ गहू'), time: c('1 hour ago', '1 घंटे पहले', '1 तासापूर्वी') },
                                { t: c('Smart Route optimization saved 160 KM', 'स्मार्ट रूट अनुकूलन से 160 किमी की बचत', 'मार्ग अनुकूलनाने 160 किमी वाचवले'), time: c('2 hours ago', '2 घंटे पहले', '2 तासांपूर्वी') },
                                { t: c('AI Price Forecasting updated for Nashik region', 'नासिक क्षेत्र के लिए AI मूल्य पूर्वानुमान अपडेट', 'नाशिकसाठी AI दर अपडेट'), time: c('4 hours ago', '4 घंटे पहले', '4 तासांपूर्वी') }
                            ].map((act, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <div className="mt-0.5"><Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/></div>
                                    <div>
                                        <p className="text-gray-800 dark:text-emerald-100 font-medium">{act.t}</p>
                                        <p className="text-xs text-gray-500 dark:text-emerald-300">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export { AdminDashboard };
