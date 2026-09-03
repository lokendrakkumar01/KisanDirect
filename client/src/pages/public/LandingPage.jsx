import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Truck, Shield, Users, BarChart3, ArrowRight, Zap, MapPin, Star, ShieldCheck, ShoppingCart, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';

export const LandingPage = () => {
    const { addToCart } = useCart();
    const [toastMsg, setToastMsg] = useState('');

    const FEATURED_PRODUCE = [
        {
            id: 'L1', farmerId: 'F1', farmerName: 'Ramesh Patil', farmName: 'Ramesh Organic Farms',
            productName: 'Fresh Red Tomatoes', category: 'vegetables', description: 'Freshly harvested Grade A red tomatoes directly from Nashik farm.',
            quantity: 500, availableQuantity: 500, unit: 'kg', price: 25, minOrderQuantity: 10, qualityGrade: 'A',
            organic: true, location: { city: 'Nashik', state: 'Maharashtra' }, rating: 4.8, sellerType: 'farmer'
        },
        {
            id: 'L3', farmerId: 'F3', farmerName: 'Nashik Fresh Farmers FPO', farmName: 'FPO Aggregation Center', sellerType: 'fpo',
            productName: 'Nashik Export Red Onions', category: 'vegetables', description: 'Bulk aggregated red onions from 150 local member farmers.',
            quantity: 5000, availableQuantity: 4000, unit: 'kg', price: 30, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, location: { city: 'Pimpalgaon', state: 'Maharashtra' }, rating: 4.6
        },
        {
            id: 'L2', farmerId: 'F2', farmerName: 'Sunil Shinde', farmName: 'Shinde Orchards',
            productName: 'Seedless Green Grapes', category: 'fruits', description: 'Sweet export-grade seedless grapes from Niphad vineyard.',
            quantity: 200, availableQuantity: 150, unit: 'kg', price: 80, minOrderQuantity: 5, qualityGrade: 'A',
            organic: false, location: { city: 'Niphad', state: 'Maharashtra' }, rating: 4.9, sellerType: 'farmer'
        },
        {
            id: 'L4', farmerId: 'F4', farmerName: 'Priya Deshmukh', farmName: 'Priya Organic Fields',
            productName: 'Organic Potatoes', category: 'vegetables', description: 'Pesticide-free organic potatoes grown in fertile Pune soil.',
            quantity: 800, availableQuantity: 750, unit: 'kg', price: 22, minOrderQuantity: 15, qualityGrade: 'A',
            organic: true, location: { city: 'Pune', state: 'Maharashtra' }, rating: 4.7, sellerType: 'farmer'
        }
    ];

    const handleAddToCart = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(item, item.minOrderQuantity || 1);
        setToastMsg(`Added "${item.productName}" (${item.minOrderQuantity || 1} ${item.unit}) to Cart!`);
        setTimeout(() => setToastMsg(''), 3500);
    };

    return (
        <PublicLayout>
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-green-50 to-white pt-16 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center mb-4">
                            <Leaf className="h-12 w-12 text-green-600 mr-3"/>
                            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">AgroConnect</h1>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Farm to Buyer, <span className="text-green-600">Direct &amp; Smart.</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            India's first AI-powered agricultural marketplace connecting farmers directly with consumers and bulk buyers. Transparent pricing, smart logistics, zero middlemen.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                            <Link to="/marketplace">
                                <Button size="lg" className="w-full sm:w-auto font-bold bg-green-600 hover:bg-green-700" rightIcon={<ArrowRight size={20}/>}>
                                    Explore Marketplace 🛒
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold">
                                    Sell Your Produce 🌾
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold">
                                    Post Bulk Requirement 🏢
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Animated Supply Chain Visual */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative">
                        <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                            SIH 2026 Direct Trade Platform
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl w-full md:w-1/4 border border-green-100 relative group">
                                <div className="bg-green-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                    <Leaf className="text-green-600 h-8 w-8"/>
                                </div>
                                <h3 className="font-bold text-gray-900">Farmer / FPO</h3>
                                <p className="text-xs text-gray-500 mt-1">Lists fresh produce</p>
                            </div>
                            
                            <div className="hidden md:flex flex-1 items-center justify-center relative">
                                <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-400 to-amber-300 rounded animate-pulse"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-sm text-[10px] font-bold text-blue-600 border border-blue-100 flex items-center">
                                    <Zap size={12} className="mr-1"/> AI Matchmaking
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl w-full md:w-1/4 border border-blue-100 relative group z-10 shadow-lg transform md:-translate-y-4">
                                <div className="bg-blue-600 text-white p-4 rounded-full mb-3 shadow-md group-hover:scale-110 transition-transform">
                                    <Shield className="h-10 w-10"/>
                                </div>
                                <h3 className="font-extrabold text-gray-900">AgroConnect</h3>
                                <p className="text-xs font-medium text-blue-700 mt-1">Smart Engine &amp; Logistics</p>
                            </div>
                            
                            <div className="hidden md:flex flex-1 items-center justify-center relative">
                                <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-300 to-amber-300 rounded animate-pulse"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-sm text-[10px] font-bold text-amber-600 border border-amber-100 flex items-center">
                                    <Truck size={12} className="mr-1"/> Smart Logistics
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-xl w-full md:w-1/4 border border-amber-100 relative group">
                                <div className="bg-amber-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                    <Users className="text-amber-600 h-8 w-8"/>
                                </div>
                                <h3 className="font-bold text-gray-900">Consumer / Bulk Buyer</h3>
                                <p className="text-xs text-gray-500 mt-1">Receives fresh goods</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE FEATURED PRODUCE MARKETPLACE SHOWCASE */}
            <section className="py-16 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                        <div>
                            <span className="text-xs font-extrabold text-green-600 uppercase tracking-widest block mb-1">LIVE MARKETPLACE SHOWCASE</span>
                            <h2 className="text-3xl font-extrabold text-gray-900">Featured Farm Produce Available Now</h2>
                            <p className="text-sm text-gray-600 mt-1">Direct from verified Maharashtra farmers &amp; FPOs with transparent pricing</p>
                        </div>
                        <Link to="/marketplace">
                            <Button variant="outline" className="font-bold text-green-700 border-green-200 hover:bg-green-50">
                                View Full Marketplace &rarr;
                            </Button>
                        </Link>
                    </div>

                    {toastMsg && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm text-sm">
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" /> {toastMsg}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURED_PRODUCE.map(item => {
                            const emoji = item.category === 'vegetables' ? '🍅' : item.category === 'fruits' ? '🍇' : '🌾';
                            return (
                                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                                    <Link to={`/marketplace/${item.id}`} className="block relative">
                                        <div className="h-44 bg-gradient-to-br from-green-100 to-amber-50 flex items-center justify-center relative">
                                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                                            {item.organic && (
                                                <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center">
                                                    <ShieldCheck className="w-3 h-3 mr-1"/> Organic
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 bg-white text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded shadow border">
                                                Grade {item.qualityGrade}
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/marketplace/${item.id}`} className="font-bold text-base text-gray-900 group-hover:text-green-600 transition line-clamp-1">
                                                {item.productName}
                                            </Link>
                                            <span className="bg-green-50 text-green-700 font-extrabold px-2 py-0.5 rounded text-sm whitespace-nowrap ml-1">
                                                ₹{item.price}/{item.unit}
                                            </span>
                                        </div>
                                        
                                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>

                                        <div className="flex items-center text-gray-600 text-xs mb-3 font-medium">
                                            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400 flex-shrink-0"/> {item.location.city}, {item.location.state}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-xs">
                                            <div className="flex items-center gap-1">
                                                {item.sellerType === 'fpo' ? (
                                                    <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[9px]">FPO</span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded text-[9px]">FARMER</span>
                                                )}
                                                <span className="font-medium text-gray-700 truncate max-w-[90px]" title={item.farmerName}>
                                                    {item.farmerName}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-amber-500 font-bold">
                                                <Star className="w-3.5 h-3.5 fill-current mr-0.5"/>
                                                <span>{item.rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t flex gap-2">
                                            <Link to={`/marketplace/${item.id}`} className="flex-1">
                                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded-lg text-xs transition">
                                                    View Details
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={(e) => handleAddToCart(e, item)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-lg text-xs transition flex items-center justify-center gap-1"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" /> Buy Direct
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why the Current Supply Chain Needs a Smarter Approach</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                            <div className="text-red-500 mb-4 flex justify-center"><Users size={40}/></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Multiple Intermediaries</h3>
                            <p className="text-sm text-gray-600">Up to 6 layers between farm and fork, causing delays and waste.</p>
                        </div>
                        <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                            <div className="text-orange-500 mb-4 flex justify-center"><TrendingUp className="rotate-180" size={40}/></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Reduced Farmer Realization</h3>
                            <p className="text-sm text-gray-600">Farmers receive only 20-30% of what the end consumer pays.</p>
                        </div>
                        <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                            <div className="text-yellow-500 mb-4 flex justify-center"><BarChart3 size={40}/></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Fragmented Logistics</h3>
                            <p className="text-sm text-gray-600">Inefficient transport leads to post-harvest losses of up to 40%.</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-gray-500 mb-4 flex justify-center"><Zap className="rotate-45 opacity-50" size={40}/></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Limited Visibility</h3>
                            <p className="text-sm text-gray-600">No data intelligence on market demand, resulting in mismatched supply.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">One Platform. Multiple Problems Solved.</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <Leaf className="text-green-600 h-7 w-7"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Marketplace</h3>
                            <p className="text-gray-600 mb-4">Eliminates middlemen to ensure better prices for both farmers and buyers.</p>
                            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                                End-to-end direct purchasing
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <Users className="text-green-600 h-7 w-7"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">FPO Aggregation</h3>
                            <p className="text-gray-600 mb-4">Enables small farmers to pool resources and fulfill bulk demands effectively.</p>
                            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                                FPO Aggregation Portal
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="text-green-600 h-7 w-7"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Demand Intelligence</h3>
                            <p className="text-gray-600 mb-4">Predicts demand trends to advise farmers on what and when to harvest.</p>
                            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                                AI Yield &amp; Price Forecasting
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to transform agriculture?</h2>
                    <p className="text-xl text-gray-600 mb-10">Join AgroConnect today and be part of the future of smart farming and direct trade.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="w-full sm:w-auto min-w-[200px] font-bold bg-green-600 hover:bg-green-700">Register as Farmer</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] font-bold">Register as Buyer</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default LandingPage;
