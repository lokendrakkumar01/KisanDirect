import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Users, Package, ShoppingCart, IndianRupee, AlertCircle, Layers } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';

export default function FPODashboard() {
    const { user } = useAuth();
    const { c } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const stats = {
        members: 145,
        aggregatedProduce: 12500, // KG
        activeOrders: 8,
        revenue: 450000,
        pendingOrders: 3
    };

    const activeAggregations = [
        { id: 'AGG-001', crop: c('Tomato', 'टमाटर', 'टोमॅटो'), target: 2000, current: 1500, unit: 'KG', members: 12, status: c('In Progress', 'प्रगति में', 'प्रगतीपथावर') },
        { id: 'AGG-002', crop: c('Onion', 'प्याज', 'कांदा'), target: 5000, current: 5000, unit: 'KG', members: 28, status: c('Listed', 'सूचीबद्ध', 'नोंदवलेले') }
    ];

    const recentOrders = [
        { id: 'ORD-5092', buyer: 'FreshMart Chains', product: c('Onion', 'प्याज', 'कांदा'), amount: 56000, status: c('Processing', 'प्रसंस्करण', 'प्रक्रिया सुरु'), date: '2026-09-02' },
        { id: 'ORD-5090', buyer: 'Hotel Taj', product: c('Tomato', 'टमाटर', 'टोमॅटो'), amount: 24000, status: c('Delivered', 'डिलीवर हुआ', 'डिलिव्हर केले'), date: '2026-08-30' }
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <LoadingSpinner size="lg"/>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{c('Welcome', 'स्वागत है', 'स्वागत आहे')}, {user?.name || 'Green Valley FPO'}</h1>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm text-gray-500">Reg No: FPO-MH-2023-4458</p>
                        <Badge variant="success">{c('Verified FPO', 'सत्यापित एफपीओ', 'सत्यापित एफपीओ')}</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigate('/fpo/members')}>
                        <Users className="mr-2 h-4 w-4"/> {c('Add Member', 'सदस्य जोड़ें', 'सदस्य जोडा')}
                    </Button>
                    <Button onClick={() => navigate('/fpo/aggregations')}>
                        <Layers className="mr-2 h-4 w-4"/> {c('New Aggregation', 'नया संग्रहण', 'नवीन संकलन')}
                    </Button>
                </div>
            </div>

            {/* Alerts */}
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-primary-600"/>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-primary-800">{c('New Buyer Requirement Matched!', 'नया खरीदार मांग मिलान हुआ!', 'नवीन खरेदीदार मागणी जुळली!')}</h3>
                            <div className="mt-2 text-sm text-primary-700">
                                <p>{c('A buyer is looking for 500 KG of Tomato near your location. Your current inventory matches this requirement.', 'एक खरीदार आपके स्थान के पास 500 KG टमाटर की तलाश कर रहा है। आपकी वर्तमान सूची इससे मेल खाती है।', 'एक खरेदीदार तुमच्या जवळ ५०० किलो टोमॅटो शोधत आहे.')}</p>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-0 md:ml-6">
                            <Button size="sm" onClick={() => navigate('/fpo/opportunities')}>{c('View Requirement', 'आवश्यकता देखें', 'मागणी पहा')}</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                                <Users className="h-6 w-6 text-blue-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Total Members', 'कुल सदस्य', 'एकूण सदस्य')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{stats.members}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                                <Package className="h-6 w-6 text-green-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Aggregated Produce', 'एकत्रित उपज', 'एकत्रित शेतमाल')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{formatNumber(stats.aggregatedProduce)} KG</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-yellow-50 p-3">
                                <ShoppingCart className="h-6 w-6 text-yellow-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Active Orders', 'सक्रिय ऑर्डर', 'सक्रिय ऑर्डर्स')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{stats.activeOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                                <IndianRupee className="h-6 w-6 text-purple-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Revenue (Monthly)', 'राजस्व (मासिक)', 'महसूल (मासिक)')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Active Aggregations */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{c('Active Aggregations', 'सक्रिय संग्रहण', 'सक्रिय संकलन')}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/fpo/aggregations')}>{c('View All', 'सभी देखें', 'सर्व पहा')}</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeAggregations.map((agg) => (
                                <div key={agg.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-gray-900">{agg.crop}</h4>
                                        <Badge variant={agg.status === 'Listed' ? 'success' : 'primary'}>{agg.status}</Badge>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                                            <span>{agg.current} {agg.unit} {c('collected', 'एकत्रित', 'संकलित')}</span>
                                            <span>{c('Target:', 'लक्ष्य:', 'लक्ष्य:')} {agg.target} {agg.unit}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`h-2 rounded-full ${agg.current >= agg.target ? 'bg-green-500' : 'bg-primary-500'}`} style={{ width: `${Math.min((agg.current / agg.target) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                        <Users className="h-4 w-4 mr-1"/> {agg.members} {c('members contributed', 'सदस्यों ने योगदान दिया', 'सदस्यांचे योगदान')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{c('Recent Orders', 'हाल के ऑर्डर', 'नुकत्याच आलेल्या ऑर्डर्स')}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/fpo/orders')}>{c('View All', 'सभी देखें', 'सर्व पहा')}</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{order.buyer}</p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <span>{order.product}</span>
                                            <span>&bull;</span>
                                            <span>{order.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                                        <Badge className="mt-1" variant={order.status === 'Delivered' ? 'success' : 'warning'}>
                                            {order.status}
                                        </Badge>
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
