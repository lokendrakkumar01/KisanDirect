import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Search, MapPin, Heart, ArrowRight, ShieldCheck, ShoppingCart, CheckCircle, 
    TrendingUp, TrendingDown, ChevronRight, Users, Store, PackageCheck, Globe2, LogIn, Lock, Star, Sparkles
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const LandingPage = () => {
    const { isAuthenticated, user } = useAuth();
    const { addToCart } = useCart();
    const { language, c } = useLanguage();
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

    // Authentic Genuine Indian Mandi Produce Data with High-Quality Real Farm Images
    const FEATURED_PRODUCE = [
        {
            id: 'L1', productName: 'Fresh Red Tomatoes', category: 'vegetables',
            price: 20, unit: 'kg', location: 'Nashik, Maharashtra', isFresh: true,
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Ramesh Patil', sellerBadge: 'Verified Farmer 👨‍🌾', organic: true, qualityGrade: 'Grade A', minOrderQuantity: 5, rating: 4.8
        },
        {
            id: 'L4', productName: 'Agra Potato (Grade A)', category: 'vegetables',
            price: 18, unit: 'kg', location: 'Agra, Uttar Pradesh', isFresh: true,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Suresh Patil', sellerBadge: 'Verified Farmer 👨‍🌾', organic: true, qualityGrade: 'Grade A', minOrderQuantity: 10, rating: 4.7
        },
        {
            id: 'L3', productName: 'Nashik Export Red Onion', category: 'vegetables',
            price: 22, unit: 'kg', location: 'Lasalgaon, Maharashtra', isFresh: false,
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Nashik Farmers FPO', sellerBadge: 'FPO Collective 🏢', organic: false, qualityGrade: 'Export Grade', minOrderQuantity: 10, rating: 4.9
        },
        {
            id: 'L5', productName: 'Sharbati Wheat (Punjab)', category: 'grains',
            price: 25, unit: 'kg', location: 'Patiala, Punjab', isFresh: false,
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Deepak Pawar', sellerBadge: 'Verified Farmer 👨‍🌾', organic: false, qualityGrade: 'Grade A', minOrderQuantity: 20, rating: 4.6
        },
        {
            id: 'L7', productName: 'Guntur Green Chilli', category: 'spices',
            price: 40, unit: 'kg', location: 'Guntur, Andhra Pradesh', isFresh: true,
            image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Andhra Organic Group', sellerBadge: 'Verified Farmer 👨‍🌾', organic: true, qualityGrade: 'Premium', minOrderQuantity: 5, rating: 4.9
        },
        {
            id: 'L8', productName: 'Premium Basmati Rice', category: 'grains',
            price: 70, unit: 'kg', location: 'Cuttack, Odisha', isFresh: false,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
            sellerName: 'Odisha Farmers Collective', sellerBadge: 'FPO Collective 🏢', organic: false, qualityGrade: 'Superfine', minOrderQuantity: 10, rating: 4.8
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
                <div className="fixed top-24 right-6 z-50 bg-emerald-950 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in-50 border border-amber-400 max-w-md">
                    <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" /> <span>{toastMsg}</span>
                </div>
            )}

            {/* Authenticated Banner Banner if Logged In */}
            {isAuthenticated ? (
                <div className="bg-emerald-900 text-white py-3 px-4 text-xs font-bold flex justify-between items-center shadow-inner border-b border-emerald-700">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center w-full gap-2">
                        <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            {c('Welcome back, ', 'वापसी पर स्वागत है, ')}<strong className="text-amber-300 font-extrabold">{user?.name}</strong> {c('! You are logged in.', '! आप लॉगिन हैं।')}
                        </span>
                        <Link to={getRoleDashboardPath(user?.role)} className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-4 py-1 rounded-full flex items-center gap-1 font-extrabold shadow-sm transition">
                            {c('Go to My Dashboard', 'मेरे डैशबोर्ड पर जाएं')} &rarr;
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-800 text-white py-2.5 px-4 text-xs font-bold text-center shadow-md">
                    <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-200 flex-shrink-0" />
                        <span>{c('All marketplace produce browsing, seller details, and ordering options are unlocked after ', 'मार्केटप्लेस में उपज देखना, विक्रेता विवरण और ऑर्डर के विकल्प ')}<Link to="/login" className="underline font-black text-amber-100 hover:text-white">{c('Login', 'लॉगिन')}</Link>{c(' or ', ' या ')}<Link to="/register" className="underline font-black text-amber-100 hover:text-white">{c('Registration', 'रजिस्ट्रेशन')}</Link>{c('!', ' के बाद उपलब्ध होंगे!')}</span>
                    </div>
                </div>
            )}

            {/* 1. HERO SECTION (100% Responsive & Matching Mockup Image) */}
            <section className="bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/30 pt-8 sm:pt-12 pb-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Hero Left Column Text */}
                        <div className="lg:col-span-6 space-y-6 text-left">
                            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-extrabold shadow-xs">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>{c('Direct Farm-to-Buyer AI Platform', 'किसान से खरीदार तक कृत्रिम बुद्धिमत्ता मंच')}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                                {c('Directly from', 'सीधे')} <br />
                                <span className="text-emerald-800">{c('Farmers to You', 'किसानों से आपके पास')}</span>
                            </h1>

                            <div className="space-y-1">
                                <h2 className="text-base sm:text-xl font-extrabold text-emerald-700">
                                    {c('Fair Prices. Fresh Produce. A Stronger India.', 'उचित दाम। ताज़ी उपज। एक मजबूत भारत।')}
                                </h2>
                                <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-medium max-w-xl">
                                    {c('A direct digital marketplace connecting farmers, FPOs, consumers and bulk buyers with AI demand insights and smart logistics support.', 'किसानों, किसान उत्पादक संगठनों, उपभोक्ताओं और थोक खरीदारों को मांग की जानकारी तथा स्मार्ट परिवहन सहायता से जोड़ने वाला सीधा डिजिटल बाजार।')}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3.5 pt-2">
                                <button 
                                    onClick={() => requireAuthNavigation('/marketplace', 'explore fresh produce')}
                                    className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-emerald-900/30 transition duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {c('Shop Fresh Produce', 'ताज़ी उपज खरीदें')} <ArrowRight className="w-4 h-4" />
                                </button>

                                {!isAuthenticated ? (
                                    <Link to="/register" className="w-full sm:w-auto">
                                        <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold px-6 py-3.5 rounded-full border border-gray-300 shadow-sm transition duration-200 text-sm">
                                            {c('Register Account', 'खाता बनाएं')}
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to={getRoleDashboardPath(user?.role)} className="w-full sm:w-auto">
                                        <button className="w-full bg-white hover:bg-gray-50 text-emerald-800 font-extrabold px-6 py-3.5 rounded-full border border-emerald-600 shadow-sm transition duration-200 text-sm flex items-center justify-center gap-1.5">
                                            {c('Go to Dashboard', 'डैशबोर्ड पर जाएं')} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                )}
                            </div>

                            {/* 4 Feature Pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-gray-200/80">
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{c('Better Prices for Farmers', 'किसानों के लिए बेहतर दाम')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <Users className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{c('Lower Prices for Buyers', 'खरीदारों के लिए कम दाम')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <PackageCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{c('Transparent Supply Chain', 'पारदर्शी आपूर्ति श्रृंखला')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-gray-200/60 shadow-xs">
                                    <TrendingUp className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{c('Smarter Agriculture', 'स्मार्ट कृषि')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Center Image & Right Floating Glassmorphism Card */}
                        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
                            
                            {/* Farmer Main Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg">
                                <img 
                                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1000&auto=format&fit=crop&q=80" 
                                    alt={c('Smiling Indian Farmer', 'मुस्कुराता भारतीय किसान')}
                                    className="w-full h-[340px] sm:h-[420px] object-cover object-top hover:scale-105 transition duration-500"
                                />
                                {/* Handwritten Quote Overlay */}
                                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[180px] sm:max-w-[200px] bg-black/35 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-white/30">
                                    <p className="font-serif italic text-white text-sm sm:text-base leading-snug drop-shadow-md">
                                        {c('"Empowering Farmers Building a Better Tomorrow"', '"किसानों को सशक्त बनाकर बेहतर कल का निर्माण"')}
                                    </p>
                                </div>
                            </div>

                            {/* Floating Glassmorphism Stats Card */}
                            <div className="absolute -bottom-6 sm:top-4 right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-gray-100 shadow-2xl space-y-3 sm:space-y-4 w-40 sm:w-52 z-20">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <div className="p-2 sm:p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-lg font-black text-gray-900">10K+</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">{c('Farmers Registered', 'पंजीकृत किसान')}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <div className="p-2 sm:p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-lg font-black text-gray-900">5K+</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">{c('Bulk Buyers', 'थोक खरीदार')}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <div className="p-2 sm:p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-lg font-black text-gray-900">1L+</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">{c('Orders Completed', 'पूर्ण ऑर्डर')}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <div className="p-2 sm:p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-lg font-black text-gray-900">25+</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">{c('States Covered', 'कवर किए गए राज्य')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. GLOBAL MULTI-FILTER SEARCH BAR CARD (Fully Responsive) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-30">
                <form onSubmit={handleGlobalSearch} className="bg-white p-3 sm:p-4 rounded-3xl border border-gray-200 shadow-xl flex flex-col md:flex-row items-center gap-3">
                    {/* Input Field */}
                    <div className="flex-1 flex items-center gap-2 pl-3 w-full border-b md:border-b-0 md:border-r border-gray-200 pb-2.5 md:pb-0">
                        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={c('Search fresh produce (e.g. Nashik Tomatoes, Agra Potato, Punjab Wheat)...', 'ताज़ी उपज खोजें (जैसे नासिक टमाटर, आगरा आलू, पंजाब गेहूं)...')}
                            className="w-full text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none py-1.5"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 pb-2.5 md:pb-0 px-2">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full text-xs font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer py-1.5"
                        >
                            <option value="All">{c('All Categories 🌾', 'सभी श्रेणियां 🌾')}</option>
                            <option value="Vegetables">{c('Vegetables 🍅', 'सब्जियां 🍅')}</option>
                            <option value="Fruits">{c('Fruits 🍋', 'फल 🍋')}</option>
                            <option value="Grains">{c('Grains & Cereals 🌾', 'अनाज और खाद्यान्न 🌾')}</option>
                            <option value="Pulses">{c('Pulses 🫘', 'दालें 🫘')}</option>
                            <option value="Spices">{c('Spices 🌶️', 'मसाले 🌶️')}</option>
                            <option value="Organic">{c('Certified Organic 🍃', 'प्रमाणित जैविक 🍃')}</option>
                        </select>
                    </div>

                    {/* State Dropdown */}
                    <div className="w-full md:w-48 px-2 pb-2 md:pb-0">
                        <select 
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full text-xs font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer py-1.5"
                        >
                            <option value="All">{c('Select State 📍', 'राज्य चुनें 📍')}</option>
                            <option value="Maharashtra">{c('Maharashtra', 'महाराष्ट्र')}</option>
                            <option value="Uttar Pradesh">{c('Uttar Pradesh', 'उत्तर प्रदेश')}</option>
                            <option value="Madhya Pradesh">{c('Madhya Pradesh', 'मध्य प्रदेश')}</option>
                            <option value="Punjab">{c('Punjab', 'पंजाब')}</option>
                            <option value="Andhra Pradesh">{c('Andhra Pradesh', 'आंध्र प्रदेश')}</option>
                            <option value="Odisha">{c('Odisha', 'ओडिशा')}</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <button 
                        type="submit"
                        className="w-full md:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-3 rounded-2xl shadow-md text-xs sm:text-sm transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <Search className="w-4 h-4" /> {c('Search Produce', 'उपज खोजें')}
                    </button>
                </form>
            </div>

            {/* 3. SHOP BY CATEGORY SECTION (Responsive Grid) */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-gray-900">{c('Shop by Category', 'श्रेणी के अनुसार खरीदें')}</h2>
                            <p className="text-xs text-gray-500 font-semibold mt-0.5">{c('Explore 100% genuine Indian mandi produce categories', 'भारत की असली मंडी उपज की श्रेणियां देखें')}</p>
                        </div>
                        <button 
                            onClick={() => requireAuthNavigation('/marketplace', 'browse all categories')}
                            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                            {c('View All', 'सभी देखें')} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                        {CATEGORIES.map((cat, idx) => (
                            <button
                                key={idx} 
                                onClick={() => requireAuthNavigation(`/marketplace?category=${encodeURIComponent(cat.category)}`, `browse ${cat.name}`)}
                                className="group bg-gray-50/90 hover:bg-emerald-50/80 p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 hover:border-emerald-300 text-center transition-all duration-200 flex flex-col items-center justify-center hover:shadow-md cursor-pointer"
                            >
                                <span className="text-3xl sm:text-4xl mb-2 transform group-hover:scale-110 transition duration-200">{cat.icon}</span>
                                <h3 className="font-bold text-xs text-gray-900 group-hover:text-emerald-800">{c(cat.name, { Vegetables: 'सब्जियां', Fruits: 'फल', 'Grains & Cereals': 'अनाज और खाद्यान्न', Pulses: 'दालें', Oilseeds: 'तिलहन', Dairy: 'डेयरी', Spices: 'मसाले', Organic: 'जैविक' }[cat.name])}</h3>
                                <span className="text-[10px] text-gray-400 mt-0.5">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURED PRODUCE & SIDEBAR WIDGETS SECTION (Real HD Photos & Clean Cards) */}
            <section className="py-10 bg-gray-50/70 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left 8 Cols: Featured Produce Grid */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">{c('Featured Produce', 'चुनिंदा उपज')}</h2>
                                    <p className="text-xs text-gray-500 font-semibold mt-0.5">{c('High quality farm produce directly from verified farmers', 'सत्यापित किसानों से सीधे उच्च गुणवत्ता वाली उपज')}</p>
                                </div>
                                <button 
                                    onClick={() => requireAuthNavigation('/marketplace', 'view all products')}
                                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    {c('View All Products', 'सभी उत्पाद देखें')} <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {FEATURED_PRODUCE.map((product) => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => requireAuthNavigation(`/marketplace/${product.id}`, `view ${product.productName} details`)}
                                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative cursor-pointer"
                                    >
                                        {/* Card Image Header with Real HD Image */}
                                        <div className="h-44 sm:h-48 relative overflow-hidden bg-gray-100">
                                            <img 
                                                src={product.image} 
                                                alt={product.productName} 
                                                className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                                            />
                                            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                                                {product.isFresh && (
                                                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                                                        🌱 {c('Fresh Harvest', 'ताज़ी कटाई')}
                                                    </span>
                                                )}
                                                {product.organic && (
                                                    <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                                                        🍃 {c('Organic', 'जैविक')}
                                                    </span>
                                                )}
                                            </div>

                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(product.id);
                                                }}
                                                className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 rounded-full text-gray-400 hover:text-red-500 transition shadow-sm"
                                            >
                                                <Heart className={`w-4 h-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : ''}`} />
                                            </button>
                                            
                                            <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                                {product.qualityGrade}
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-emerald-700 transition leading-snug">
                                                        {product.productName}
                                                    </h3>
                                                    <div className="flex items-center text-xs font-bold text-amber-500 ml-1">
                                                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                                                        <span>{product.rating}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-baseline gap-1 mt-1.5">
                                                    <span className="font-black text-lg text-emerald-900">₹{product.price}</span>
                                                    <span className="text-xs text-gray-500 font-semibold">/ {product.unit}</span>
                                                    <span className="text-[10px] text-gray-400 ml-auto">{c('Min:', 'न्यूनतम:')} {product.minOrderQuantity} {product.unit}</span>
                                                </div>

                                                <div className="flex items-center text-gray-600 text-[11px] font-medium mt-2">
                                                    <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1 flex-shrink-0" />
                                                    <span className="truncate">{product.location}</span>
                                                </div>

                                                <div className="text-[11px] font-semibold text-gray-500 mt-1 flex items-center gap-1">
                                                    <span>{product.sellerBadge}</span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" /> {c('Add to Cart', 'कार्ट में जोड़ें')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right 4 Cols: Side Widgets */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Widget 1: Fresh Food Banner Card */}
                            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                                <div className="space-y-2 z-10">
                                    <h3 className="text-2xl font-black leading-tight">{c('Fresh Food', 'ताज़ा भोजन')} <br />{c('Stronger India', 'मजबूत भारत')}</h3>
                                    <p className="text-xs text-emerald-100 font-medium">{c('Direct mandi connections. Zero middlemen exploitation.', 'सीधे मंडी संपर्क। बिचौलियों का शोषण नहीं।')}</p>
                                </div>
                                <div className="pt-4 z-10">
                                    <Link to="/about">
                                        <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 transition flex items-center gap-1 cursor-pointer">
                                            {c('Know More', 'और जानें')} <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </Link>
                                </div>
                                <img 
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" 
                                    alt={c('Fresh Food', 'ताज़ा भोजन')}
                                    className="absolute right-0 bottom-0 w-40 h-40 object-cover opacity-25 rounded-tl-full pointer-events-none"
                                />
                            </div>

                            {/* Widget 2: Live Market Prices Table */}
                            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <h3 className="font-extrabold text-sm text-gray-900">{c('Live Mandi Rates', 'लाइव मंडी भाव')}</h3>
                                        <span className="text-[10px] text-gray-400 font-semibold">{c('Genuine Benchmark Prices', 'विश्वसनीय मानक भाव')}</span>
                                    </div>
                                    <button 
                                        onClick={() => requireAuthNavigation('/farmer/insights', 'view live market price intelligence')}
                                        className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                                    >
                                        {c('View More', 'और देखें')} <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="text-gray-400 uppercase text-[10px] font-bold border-b border-gray-100">
                                                <th className="pb-2">{c('Product', 'उत्पाद')}</th>
                                                <th className="pb-2">{c('Price (₹/kg)', 'मूल्य (₹/किलो)')}</th>
                                                <th className="pb-2 text-right">{c('Trend', 'रुझान')}</th>
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
                        <span className="flex items-center gap-1.5">🌱 {c('Support Farmers', 'किसानों का समर्थन करें')}</span>
                        <span className="flex items-center gap-1.5">👥 {c('Choose Fresh', 'ताज़ा चुनें')}</span>
                        <span className="flex items-center gap-1.5">🤝 {c('Build a Sustainable Future', 'टिकाऊ भविष्य बनाएं')}</span>
                        <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-emerald-400"/> Atmanirbhar Bharat</span>
                    </div>

                    {!isAuthenticated ? (
                        <Link to="/register">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md transition flex items-center gap-1 cursor-pointer">
                                {c('Register Account', 'खाता बनाएं')} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    ) : (
                        <Link to={getRoleDashboardPath(user?.role)}>
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md transition flex items-center gap-1 cursor-pointer">
                                {c('Open Dashboard', 'डैशबोर्ड खोलें')} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
};

export default LandingPage;
