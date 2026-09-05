import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ShoppingBag, Package, IndianRupee, AlertCircle, Search, ClipboardList } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export default function BuyerDashboard() {
    const { user } = useAuth();
    const { c } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const stats = {
        activeRequirements: 3,
        offersReceived: 12,
        activeOrders: 5,
        completedOrders: 48,
        totalSpend: 1250000
    };

    const activeRequirements = [
        { id: 'REQ-001', crop: c('Tomato (Grade A)', 'टमाटर (ग्रेड ए)', 'टोमॅटो (ग्रेड ए)'), quantity: 500, unit: 'KG', targetPrice: 25, status: c('Matching', 'मिलान', 'जुळणी'), date: '2026-09-03', offers: 3 },
        { id: 'REQ-002', crop: c('Potato', 'आलू', 'बटाटा'), quantity: 1000, unit: 'KG', targetPrice: 18, status: c('Open', 'खुला', 'उघडे'), date: '2026-09-02', offers: 1 },
        { id: 'REQ-003', crop: c('Onion', 'प्याज', 'कांदा'), quantity: 2000, unit: 'KG', targetPrice: 30, status: c('Closing Soon', 'जल्द बंद', 'लवकरच बंद'), date: '2026-09-01', offers: 8 }
    ];

    const recentOffers = [
        { id: 'OFF-101', requirementId: 'REQ-001', seller: 'Green Valley FPO', price: 24, matchScore: 95, distance: '12 km' },
        { id: 'OFF-102', requirementId: 'REQ-003', seller: 'Ramesh Patel', price: 29, matchScore: 88, distance: '8 km' },
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
                    <h1 className="text-2xl font-bold text-gray-900">{c('Welcome back', 'वापसी पर स्वागत है', 'पुन्हा स्वागत आहे')}, {user?.name || 'Buyer'}</h1>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm text-gray-500">{c('Manage your bulk purchases and requirements.', 'अपनी थोक खरीद और आवश्यकताओं को प्रबंधित करें।', 'आपल्या घाऊक खरेदीचे व्यवस्थापन करा.')}</p>
                        <Badge variant="success">{c('Restaurant Chain', 'रेस्टोरेंट श्रृंखला', 'रेस्टॉरंट साखळी')}</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigate('/buyer/find-produce')}>
                        <Search className="mr-2 h-4 w-4"/> {c('Find Produce', 'उपज खोजें', 'माल शोधा')}
                    </Button>
                    <Button onClick={() => navigate('/buyer/post-requirement')}>
                        <ClipboardList className="mr-2 h-4 w-4"/> {c('Post Requirement', 'मांग पोस्ट करें', 'मागणी पोस्ट करा')}
                    </Button>
                </div>
            </div>

            {/* Alerts */}
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-primary-600"/>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-primary-800">{c('New Matches Available', 'नए मिलान उपलब्ध हैं', 'नवीन जुळण्या उपलब्ध आहेत')}</h3>
                        <div className="mt-2 text-sm text-primary-700">
                            <p>{c('3 nearby sellers can fulfill your requirement REQ-001 (Tomato).', '3 आस-पास के विक्रेता आपकी मांग REQ-001 (टमाटर) को पूरा कर सकते हैं।', '३ जवळचे शेतकरी तुमची मागणी पूर्ण करू शकतात.')} <span className="font-semibold text-primary-900 cursor-pointer hover:underline" onClick={() => navigate('/buyer/offers')}>{c('View Offers', 'प्रस्ताव देखें', 'ऑफर्स पहा')}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">
                                <ClipboardList className="h-6 w-6 text-blue-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Active Requirements', 'सक्रिय आवश्यकताएं', 'सक्रिय मागण्या')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{stats.activeRequirements}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-purple-50 p-3">
                                <AlertCircle className="h-6 w-6 text-purple-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Offers Received', 'प्राप्त प्रस्ताव', 'मिळालेल्या ऑफर्स')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{stats.offersReceived}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-yellow-50 p-3">
                                <Package className="h-6 w-6 text-yellow-600"/>
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
                            <div className="flex-shrink-0 rounded-md bg-green-50 p-3">
                                <ShoppingBag className="h-6 w-6 text-green-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Completed Orders', 'पूर्ण ऑर्डर', 'पूर्ण ऑर्डर्स')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{stats.completedOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-red-50 p-3">
                                <IndianRupee className="h-6 w-6 text-red-600"/>
                            </div>
                            <div className="ml-4 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">{c('Total Spend', 'कुल खर्च', 'एकूण खर्च')}</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalSpend)}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Active Requirements */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{c('Active Requirements', 'सक्रिय आवश्यकताएं', 'सक्रिय मागण्या')}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/requirements')}>{c('View All', 'सभी देखें', 'सर्व पहा')}</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeRequirements.map((req) => (
                                <div key={req.id} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-900">{req.crop}</p>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <span>{req.quantity} {req.unit}</span>
                                            <span>&bull;</span>
                                            <span>{c('Target:', 'लक्ष्य:', 'लक्ष्य:')} {formatCurrency(req.targetPrice)}/{req.unit}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={req.status === 'Matching' ? 'success' : req.status === 'Open' ? 'primary' : 'warning'}>
                                            {req.status}
                                        </Badge>
                                        <p className="mt-1 text-sm text-gray-500">{req.offers} {c('offers', 'प्रस्ताव', 'ऑफर्स')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Offers */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{c('Recent Offers', 'हाल के प्रस्ताव', 'नुकत्याच आलेल्या ऑफर्स')}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/offers')}>{c('View All', 'सभी देखें', 'सर्व पहा')}</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOffers.map((offer) => (
                                <div key={offer.id} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{offer.seller}</p>
                                            <Badge variant="outline" className="text-xs">FPO</Badge>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <span>{offer.distance} {c('away', 'दूर', 'दूर')}</span>
                                            <span>&bull;</span>
                                            <span className="font-medium text-green-600">{offer.matchScore}% {c('Match', 'मिलान', 'जुळणी')}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{formatCurrency(offer.price)}/KG</p>
                                        <Button variant="link" size="sm" className="h-auto p-0 mt-1" onClick={() => navigate(`/buyer/offers/${offer.id}`)}>
                                            {c('Review Offer', 'प्रस्ताव की समीक्षा करें', 'ऑफर पुनरावलोकन करा')}
                                        </Button>
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
