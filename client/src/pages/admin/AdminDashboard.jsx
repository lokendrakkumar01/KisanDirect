import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Users, ShoppingBag, Activity, TrendingUp, Store, Sprout } from 'lucide-react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Badge } from '../../components/ui/Badge';
import { getDashboard, getUsers } from '../../services/adminService';
import { getOrders } from '../../services/orderService';
import { formatCurrency } from '../../utils/format';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminDashboard() {
    const { t } = useLanguage();
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
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin.title')}</h1>
                    <p className="text-sm text-gray-500 mt-1">{t('admin.subtitle')}</p>
                </div>
                <Badge variant="success" className="text-sm px-3 py-1">{t('admin.healthy')}</Badge>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-200 text-green-700 rounded-lg">
                            <Sprout className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-sm text-green-800 font-medium">{t('admin.totalFarmers')}</p>
                            <p className="text-2xl font-bold text-green-900">{stats.farmersCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-200 text-blue-700 rounded-lg">
                            <Users className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">{t('admin.activeFpos')}</p>
                            <p className="text-2xl font-bold text-blue-900">{stats.fposCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-none shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-200 text-orange-700 rounded-lg">
                            <ShoppingBag className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-sm text-orange-800 font-medium">{t('admin.activeOrders')}</p>
                            <p className="text-2xl font-bold text-orange-900">{stats.ordersCount.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-200 text-purple-700 rounded-lg">
                            <Activity className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="text-sm text-purple-800 font-medium">{t('admin.transactions')}</p>
                            <p className="text-2xl font-bold text-purple-900">₹4.2 Cr</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.dailyOrders')}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AnalyticsChart type="line" data={[
                            { name: t('admin.monday'), value: 120 }, { name: t('admin.tuesday'), value: 150 }, { name: t('admin.wednesday'), value: 180 }, { name: t('admin.thursday'), value: 140 }, { name: t('admin.friday'), value: 210 }, { name: t('admin.saturday'), value: 250 }, { name: t('admin.sunday'), value: 290 }
                        ]}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.topProduce')}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <AnalyticsChart type="pie" data={[
                            { name: t('admin.onions'), value: 35 }, { name: t('admin.tomatoes'), value: 25 }, { name: t('admin.potatoes'), value: 20 }, { name: t('admin.wheat'), value: 15 }, { name: t('admin.others'), value: 5 }
                        ]}/>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('admin.growth')}</CardTitle>
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

                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.recentActivity')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { t: 'New FPO Registered: Nashik Organic Farmers', time: '10 mins ago' },
                                { t: 'Bulk Buyer Order placed: 5,000kg Wheat', time: '1 hour ago' },
                                { t: 'Smart Route optimization saved 160 KM', time: '2 hours ago' },
                                { t: 'AI Price Forecasting updated for Nashik region', time: '4 hours ago' }
                            ].map((act, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <div className="mt-0.5"><Activity className="w-4 h-4 text-green-600"/></div>
                                    <div>
                                        <p className="text-gray-800 font-medium">{act.t}</p>
                                        <p className="text-xs text-gray-500">{act.time}</p>
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
