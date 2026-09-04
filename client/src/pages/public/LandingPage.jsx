import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Search, MapPin, Heart, ArrowRight, ShieldCheck, ShoppingCart, CheckCircle, 
    TrendingUp, TrendingDown, ChevronRight, Users, Store, PackageCheck, Globe2, LogIn, Lock
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export const LandingPage = () => {
    const { isAuthenticated, user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All');
    const [favorites, setFavorites] = useState({});
    const [toastMsg, setToastMsg] = useState('');

    const CATEGORIES = [
        { name: 'Vegetables', icon: '🍅', category: 'vegetables', count: '45+ items' },
        { name: 'Fruits', icon: '🍋', category: 'fruits', count: '30+ items' },
        { name: 'Grains & Cereals', icon: '🌾', category: 'grains', count: '25+ items' },
        { name: 'Pulses', icon: '🫘', category: 'pulses', count: '18+ items' },
        { name: 'Oilseeds', icon: '🌻', category: 'oilseeds', count: '12+ items' },
        { name: 'Dairy', icon: '🥛', category: 'dairy', count: '15+ items' },
        { name: 'Spices', icon: '🌶️', category: 'spices', count: '20+ items' },
        { name: 'Organic', icon: '🍃', category: 'organic', count: '50+ items' },
    ];

    // Authentic Genuine Indian Mandi Produce Data
    const FEATURED_PRODUCE = [
        {
            id: 'L1', productName: 'Fresh Red Tomatoes', category: 'vegetables',
            price: 20, unit: 'kg', location: 'Nashik, Maharashtra', isFresh: true,
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Ramesh Patil (Verified Farmer)', organic: true, qualityGrade: 'A', minOrderQuantity: 5
        },
        {
            id: 'L4', productName: 'Potato (Grade A)', category: 'vegetables',
            price: 18, unit: 'kg', location: 'Agra, Uttar Pradesh', isFresh: false,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Suresh Patil (Verified Farmer)', organic: true, qualityGrade: 'A', minOrderQuantity: 10
        },
        {
            id: 'L3', productName: 'Nashik Export Red Onion', category: 'vegetables',
            price: 22, unit: 'kg', location: 'Lasalgaon / Indore', isFresh: false,
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Nashik Farmers FPO', organic: false, qualityGrade: 'A', minOrderQuantity: 10
        },
        {
            id: 'L5', productName: 'Sharbati Wheat', category: 'grains',
            price: 25, unit: 'kg', location: 'Patiala, Punjab', isFresh: false,
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Deepak Pawar (Punjab)', organic: false, qualityGrade: 'A', minOrderQuantity: 20
        },
        {
            id: 'L7', productName: 'Guntur Green Chilli', category: 'vegetables',
            price: 40, unit: 'kg', location: 'Guntur, Andhra Pradesh', isFresh: false,
            image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Andhra Organic Group', organic: true, qualityGrade: 'A', minOrderQuantity: 5
        },
        {
            id: 'L8', productName: 'Premium Basmati Rice', category: 'grains',
            price: 70, unit: 'kg', location: 'Cuttack, Odisha', isFresh: false,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
            sellerName: 'Odisha Farmers Collective', organic: false, qualityGrade: 'A', minOrderQuantity: 10
        }
    ];

    // Genuine Live Indian Mandi Benchmark Rates
    const LIVE_MARKET_PRICES = [
        { crop: 'Tomato (Nashik)', price: 28, trend: '+12%', isUp: true },
        { crop: 'Onion (Lasalgaon)', price: 22, trend: '-8%', isUp: false },
        { crop: 'Potato (Agra)', price: 18, trend: '-5%', isUp: false },
        { crop: 'Wheat (Punjab)', price: 25, trend: '+3%', isUp: true },
        { crop: 'Rice (Odisha)', price: 70, trend: '-2%', isUp: false }
    ];

    const toggleFavorite = (id) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Gate navigation for guest users (requires login/register)
    const requireAuthNavigation = (targetPath, featureName = 'browse marketplace') => {
        if (!isAuthenticated) {
            setToastMsg(`🔐 Please Login or Register first to ${featureName}!`);
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } else {
            navigate(targetPath);
        }
    };

    const handleAddToCart = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isAuthenticated) {
            setToastMsg(`🔐 Please Login or Register first to add "${item.productName}" to cart!`);
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } else {
            addToCart(item, item.minOrderQuantity || 1);
            setToastMsg(`Added "${item.productName}" to Cart!`);
            setTimeout(() => setToastMsg(''), 3500);
        }
    };

    const handleGlobalSearch = (e) => {
        e?.preventDefault();
        let queryParams = [];
        if (searchQuery.trim()) queryParams.push(`q=${encodeURIComponent(searchQuery.trim())}`);
        if (selectedCategory !== 'All') queryParams.push(`category=${encodeURIComponent(selectedCategory.toLowerCase())}`);
        if (selectedState !== 'All') queryParams.push(`state=${encodeURIComponent(selectedState)}`);
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        requireAuthNavigation(`/marketplace${queryString}`, 'search and filter produce');
    };

    return (
        <PublicLayout>
            {/* Toast Feedback */}
            {toastMsg && (
                <div className="fixed top-24 right-6 z-50 bg-emerald-950 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm animate-in fade-in-50 border border-amber-400">
                    <Lock className="w-5 h-5 text-amber-400" /> {toastMsg}
                </div>
            )}

            {/* Authenticated Banner Banner if Logged In */}
            {isAuthenticated ? (
                <div className="bg-emerald-900 text-white py-3 px-4 text-xs font-bold flex justify-between items-center shadow-inner border-b border-emerald-700">
                    <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
                        <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-400" />
                            Welcome back, <strong className="text-amber-300 font-extrabold">{user?.name}</strong> ({user?.role?.toUpperCase().replace('_', ' ')})! You are logged in.
                        </span>
                        <Link to={getRoleDashboardPath(user?.role)} className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-4 py-1.5 rounded-full flex items-center gap-1 font-extrabold shadow-sm transition">
                            Go to My Dashboard &rarr;
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-800 text-white py-2.5 px-4 text-xs font-bold text-center shadow-md">
                    <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-200" />
                        <span>All marketplace produce browsing, seller details, and ordering options are unlocked after <Link to="/login" className="underline font-black text-amber-100 hover:text-white">Login</Link> or <Link to="/register" className="underline font-black text-amber-100 hover:text-white">Registration</Link>!</span>
                    </div>
                </div>
            )}

            {/* 1. HERO SECTION (Matching User Mockup Image 100%) */}
            <section className="bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/30 pt-10 pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Hero Left Column Text */}
                        <div className="lg:col-span-6 space-y-6 text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                                Directly from <br />
                                <span className="text-gray-900">Farmers to You</span>
                            </h1>

                            <div className="space-y-1">
                                <h2 className="text-lg sm:text-xl font-extrabold text-emerald-700">
                                    Fair Prices. Fresh Produce. A Stronger India.
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium max-w-xl">
                                    A direct digital marketplace connecting farmers, FPOs, consumers and bulk buyers with AI demand insights and smart logistics support.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button 
                                    onClick={() => requireAuthNavigation('/marketplace', 'explore fresh produce')}
                                    className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-emerald-900/30 transition duration-200 text-sm flex items-center gap-2"
                                >
                                    Shop Fresh Produce <ArrowRight className="w-4 h-4" />
                                </button>

                                {!isAuthenticated ? (
                                    <Link to="/register">
                                        <button className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-6 py-3.5 rounded-full border border-gray-300 shadow-sm transition duration-200 text-sm">
                                            Register Account
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to={getRoleDashboardPath(user?.role)}>
                                        <button className="bg-white hover:bg-gray-50 text-emerald-800 font-extrabold px-6 py-3.5 rounded-full border border-emerald-600 shadow-sm transition duration-200 text-sm flex items-center gap-1.5">
                                            Go to Dashboard <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                )}
                            </div>

                            {/* 4 Feature Pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200/80">
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">Better Prices for Farmers</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <Users className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">Lower Prices for Buyers</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <PackageCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">Transparent Supply Chain</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <TrendingUp className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">Smarter Agriculture</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Center Image & Right Floating Glassmorphism Card */}
                        <div className="lg:col-span-6 relative flex justify-end items-center">
                            
                            {/* Farmer Main Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg">
                                <img 
                                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1000&auto=format&fit=crop&q=80" 
                                    alt="Smiling Indian Farmer" 
                                    className="w-full h-[420px] object-cover object-top hover:scale-105 transition duration-500"
                                />
                                {/* Handwritten Quote Overlay */}
                                <div className="absolute top-6 left-6 max-w-[200px] bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/30">
                                    <p className="font-serif italic text-white text-base leading-snug drop-shadow-md">
                                        "Empowering Farmers Building a Better Tomorrow"
                                    </p>
                                </div>
                            </div>

                            {/* Floating Glassmorphism Stats Card */}
                            <div className="absolute top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xl space-y-4 w-44 sm:w-52 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-900">10K+</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Farmers Registered</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <Store className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-900">5K+</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Bulk Buyers</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <ShoppingCart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-900">1L+</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Orders Completed</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-900">25+</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">States Covered</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. GLOBAL MULTI-FILTER SEARCH BAR CARD */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-30">
                <form onSubmit={handleGlobalSearch} className="bg-white p-3 sm:p-4 rounded-3xl border border-gray-200 shadow-xl flex flex-col md:flex-row items-center gap-3">
                    {/* Input Field */}
                    <div className="flex-1 flex items-center gap-2 pl-3 w-full border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0">
                        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for fresh fruits, vegetables, grains (e.g. Nashik Tomatoes, Agra Potato)..." 
                            className="w-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none py-1.5"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 px-2">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full text-xs font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer py-1.5"
                        >
                            <option value="All">All Categories</option>
                            <option value="Vegetables">Vegetables 🍅</option>
                            <option value="Fruits">Fruits 🍋</option>
                            <option value="Grains">Grains &amp; Cereals 🌾</option>
                            <option value="Pulses">Pulses 🫘</option>
                            <option value="Organic">Certified Organic 🍃</option>
                        </select>
                    </div>

                    {/* State Dropdown */}
                    <div className="w-full md:w-48 px-2">
                        <select 
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full text-xs font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer py-1.5"
                        >
                            <option value="All">Select State</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Odisha">Odisha</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <button 
                        type="submit"
                        className="w-full md:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-3 rounded-2xl shadow-md text-sm transition duration-200 flex items-center justify-center gap-1.5"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* 3. SHOP BY CATEGORY SECTION */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Shop by Category</h2>
                            <p className="text-xs text-gray-500 font-semibold mt-0.5">Explore 100% genuine Indian mandi categories</p>
                        </div>
                        <button 
                            onClick={() => requireAuthNavigation('/marketplace', 'browse all categories')}
                            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {CATEGORIES.map((cat, idx) => (
                            <button
                                key={idx} 
                                onClick={() => requireAuthNavigation(`/marketplace?category=${encodeURIComponent(cat.category)}`, `browse ${cat.name}`)}
                                className="group bg-gray-50/80 hover:bg-emerald-50/60 p-4 rounded-2xl border border-gray-200/80 hover:border-emerald-300 text-center transition-all duration-200 flex flex-col items-center justify-center hover:shadow-md cursor-pointer"
                            >
                                <span className="text-4xl mb-2.5 transform group-hover:scale-110 transition duration-200">{cat.icon}</span>
                                <h3 className="font-bold text-xs text-gray-900 group-hover:text-emerald-800">{cat.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURED PRODUCE & SIDEBAR WIDGETS SECTION */}
            <section className="py-10 bg-gray-50/60 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left 8 Cols: Featured Produce Grid */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Featured Produce</h2>
                                    <p className="text-xs text-gray-500 font-semibold mt-0.5">Genuine Mandi listings directly from verified farmers</p>
                                </div>
                                <button 
                                    onClick={() => requireAuthNavigation('/marketplace', 'view all products')}
                                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                                >
                                    View All Products <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {FEATURED_PRODUCE.map((product) => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => requireAuthNavigation(`/marketplace/${product.id}`, `view ${product.productName} details`)}
                                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative cursor-pointer"
                                    >
                                        {/* Card Image Header */}
                                        <div className="h-40 relative overflow-hidden bg-gray-100">
                                            <img 
                                                src={product.image} 
                                                alt={product.productName} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                            {product.isFresh && (
                                                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                                                    Fresh
                                                </span>
                                            )}
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(product.id);
                                                }}
                                                className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-gray-400 hover:text-red-500 transition shadow-sm"
                                            >
                                                <Heart className={`w-4 h-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : ''}`} />
                                            </button>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition">
                                                {product.productName}
                                            </h3>
                                            
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="font-extrabold text-base text-gray-900">₹{product.price}</span>
                                                <span className="text-xs text-gray-500">/ kg</span>
                                            </div>

                                            <div className="flex items-center text-gray-500 text-[11px] font-medium mt-2">
                                                <MapPin className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                                                <span>{product.location}</span>
                                            </div>

                                            <button 
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className="mt-4 w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2 px-3 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right 4 Cols: Side Widgets */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Widget 1: Fresh Food Banner Card */}
                            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[200px]">
                                <div className="space-y-2 z-10">
                                    <h3 className="text-xl font-black leading-tight">Fresh Food <br />Stronger India</h3>
                                    <p className="text-xs text-emerald-100 font-medium">Support our farmers, choose local.</p>
                                </div>
                                <div className="pt-4 z-10">
                                    <Link to="/about">
                                        <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 transition flex items-center gap-1">
                                            Know More <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </Link>
                                </div>
                                <img 
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" 
                                    alt="Fresh Food" 
                                    className="absolute right-0 bottom-0 w-36 h-36 object-cover opacity-30 rounded-tl-full pointer-events-none"
                                />
                            </div>

                            {/* Widget 2: Live Market Prices Table */}
                            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <h3 className="font-extrabold text-sm text-gray-900">Live Mandi Prices</h3>
                                        <span className="text-[10px] text-gray-400 font-semibold">Genuine Benchmark Rates</span>
                                    </div>
                                    <button 
                                        onClick={() => requireAuthNavigation('/farmer/insights', 'view live market price intelligence')}
                                        className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                                    >
                                        View More <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="text-gray-400 uppercase text-[10px] font-bold border-b border-gray-100">
                                                <th className="pb-2">Product</th>
                                                <th className="pb-2">Avg. Price (₹/kg)</th>
                                                <th className="pb-2 text-right">Trend</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {LIVE_MARKET_PRICES.map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="py-2.5 font-bold text-gray-900">{row.crop}</td>
                                                    <td className="py-2.5 font-extrabold text-gray-800">₹{row.price}</td>
                                                    <td className={`py-2.5 text-right font-extrabold flex items-center justify-end gap-0.5 ${
                                                        row.isUp ? 'text-emerald-600' : 'text-red-500'
                                                    }`}>
                                                        {row.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                        <span>{row.trend}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* 5. BOTTOM IMPACT FOOTER RIBBON */}
            <section className="bg-emerald-950 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold">
                    <div className="flex flex-wrap items-center gap-6 text-emerald-100">
                        <span className="flex items-center gap-1.5">🌱 Support Farmers</span>
                        <span className="flex items-center gap-1.5">👥 Choose Fresh</span>
                        <span className="flex items-center gap-1.5">🤝 Build a Sustainable Future</span>
                        <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-emerald-400"/> Atmanirbhar Bharat</span>
                    </div>

                    {!isAuthenticated ? (
                        <Link to="/register">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md transition flex items-center gap-1">
                                Register Account <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    ) : (
                        <Link to={getRoleDashboardPath(user?.role)}>
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md transition flex items-center gap-1">
                                Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
};

export default LandingPage;
