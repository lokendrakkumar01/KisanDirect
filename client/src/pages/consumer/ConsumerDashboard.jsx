import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, MapPin, ShoppingBag, Clock, Star, CheckCircle, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export const ConsumerDashboard = () => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const recommendedProduce = [
        { 
            id: 'L1', productName: 'Fresh Red Tomatoes', name: 'Fresh Tomatoes', seller: 'Ramesh Farm', sellerName: 'Ramesh Patil',
            price: 35, unit: 'KG', rating: 4.8, distance: '5 km', minOrderQuantity: 1, organic: true, qualityGrade: 'A',
            location: { city: 'Nashik', state: 'Maharashtra' },
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80' 
        },
        { 
            id: 'L3', productName: 'Nashik Export Red Onions', name: 'Organic Onions', seller: 'Green Valley FPO', sellerName: 'Nashik FPO',
            price: 28, unit: 'KG', rating: 4.5, distance: '12 km', minOrderQuantity: 1, organic: false, qualityGrade: 'A',
            location: { city: 'Pimpalgaon', state: 'Maharashtra' },
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=400&q=80' 
        },
        { 
            id: 'L4', productName: 'Organic Potatoes', name: 'Potatoes (Grade A)', seller: 'Priya Deshmukh', sellerName: 'Priya Deshmukh',
            price: 25, unit: 'KG', rating: 4.9, distance: '8 km', minOrderQuantity: 1, organic: true, qualityGrade: 'A',
            location: { city: 'Pune', state: 'Maharashtra' },
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80' 
        },
        { 
            id: 'L5', productName: 'Premium Sharbati Wheat', name: 'Wheat (Sharbati)', seller: 'Kisan Cooperative', sellerName: 'Deepak Pawar',
            price: 28, unit: 'KG', rating: 4.7, distance: '25 km', minOrderQuantity: 1, organic: false, qualityGrade: 'A',
            location: { city: 'Ahmednagar', state: 'Maharashtra' },
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80' 
        },
    ];

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setToastMsg(`Added "${product.name || product.productName}" to Cart!`);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    return (
        <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-lg relative overflow-hidden">
                <div className="mb-6 md:mb-0 max-w-xl z-10">
                    <h1 className="text-3xl font-extrabold mb-2">Welcome back, {user?.name || 'Consumer'}! 👋</h1>
                    <p className="text-green-100 text-base mb-6">Discover farm-fresh produce directly from local verified farmers &amp; FPOs.</p>
                    <form onSubmit={handleSearchSubmit} className="relative max-w-md">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for tomatoes, onions, grapes, wheat..." 
                            className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md text-sm font-medium"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5"/>
                    </form>
                </div>
                <div className="hidden md:block z-10">
                    <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" 
                        alt="Fresh Produce" 
                        className="w-44 h-44 rounded-full border-4 border-white/30 object-cover shadow-2xl transform hover:scale-105 transition"
                    />
                </div>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center shadow-sm text-sm font-bold animate-in fade-in-50">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" /> {toastMsg}
                </div>
            )}

            {/* Quick Action Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card 
                    onClick={() => navigate('/marketplace')} 
                    className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-green-500 group"
                >
                    <CardBody className="flex items-center p-6">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-6 h-6"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition">Browse Marketplace</h3>
                            <p className="text-sm text-gray-500">Explore 100+ fresh produce listings</p>
                        </div>
                    </CardBody>
                </Card>

                <Card 
                    onClick={() => navigate('/consumer/orders')} 
                    className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500 group"
                >
                    <CardBody className="flex items-center p-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition">Track Orders</h3>
                            <p className="text-sm text-gray-500">View active deliveries &amp; status</p>
                        </div>
                    </CardBody>
                </Card>

                <Card 
                    onClick={() => navigate('/marketplace?sellerType=farmer')} 
                    className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-amber-500 group"
                >
                    <CardBody className="flex items-center p-6">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition">Nearby Farmers</h3>
                            <p className="text-sm text-gray-500">Direct farmgate produce in 20km</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Recommended Section */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
                        <p className="text-gray-500 mt-1">Top-rated produce from nearby verified farmers</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate('/marketplace')}
                        className="font-bold text-green-600 hover:text-green-700"
                    >
                        View All Marketplace &rarr;
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedProduce.map(product => (
                        <Card key={product.id} className="overflow-hidden flex flex-col hover:shadow-xl transition group border-gray-200">
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm flex items-center">
                                    <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-current"/> {product.rating}
                                </div>
                            </div>
                            <CardBody className="flex-1 flex flex-col p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-base group-hover:text-green-600 transition">{product.name}</h3>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">{product.seller} • {product.distance}</p>
                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="font-extrabold text-lg text-gray-900">₹{product.price}</span>
                                        <span className="text-xs text-gray-500">/{product.unit}</span>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-green-600 hover:bg-green-700 font-bold px-4 py-2 flex items-center gap-1 text-xs shadow-sm"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" /> Add
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConsumerDashboard;
