import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, ShieldCheck, ShoppingCart, CheckCircle, Lock, Globe2 } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';

export const MarketplacePage = () => {
    const { isAuthenticated, user } = useAuth();
    const { language, c } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [organicOnly, setOrganicOnly] = useState(false);
    const [sellerType, setSellerType] = useState('All');
    const [toastMsg, setToastMsg] = useState('');
    const { addToCart } = useCart();

    // High quality real Unsplash farm produce photos
    const REAL_PRODUCE_IMAGES = {
        tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        grapes: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
        onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80',
        potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
        wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
        mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
        chilli: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
        rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
        fruit: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80',
        grain: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    };

    const getProduceRealImage = (item) => {
        if (item.image && typeof item.image === 'string' && item.image.startsWith('http')) {
            return item.image;
        }
        const name = (item.productName || item.title || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();

        if (name.includes('tomato')) return REAL_PRODUCE_IMAGES.tomato;
        if (name.includes('onion')) return REAL_PRODUCE_IMAGES.onion;
        if (name.includes('potato')) return REAL_PRODUCE_IMAGES.potato;
        if (name.includes('grape')) return REAL_PRODUCE_IMAGES.grapes;
        if (name.includes('wheat')) return REAL_PRODUCE_IMAGES.wheat;
        if (name.includes('mango')) return REAL_PRODUCE_IMAGES.mango;
        if (name.includes('chilli') || name.includes('chili')) return REAL_PRODUCE_IMAGES.chilli;
        if (name.includes('rice')) return REAL_PRODUCE_IMAGES.rice;

        if (cat.includes('fruit')) return REAL_PRODUCE_IMAGES.fruit;
        if (cat.includes('grain')) return REAL_PRODUCE_IMAGES.grain;

        return REAL_PRODUCE_IMAGES.tomato;
    };

    const DEMO_LISTINGS = [
        {
            id: 'L1', farmerId: 'F1', farmerName: 'Ramesh Patil', farmName: 'Ramesh Organic Farms',
            productName: 'Fresh Red Tomatoes', category: 'vegetables', description: 'Freshly harvested Grade A red tomatoes directly from Nashik farm.',
            quantity: 500, availableQuantity: 500, unit: 'kg', price: 25, minOrderQuantity: 10, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: REAL_PRODUCE_IMAGES.tomato,
            location: { address: '', city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001' },
            rating: 4.8, totalReviews: 24, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L2', farmerId: 'F2', farmerName: 'Sunil Shinde', farmName: 'Shinde Orchards',
            productName: 'Seedless Green Grapes', category: 'fruits', description: 'Sweet export-grade seedless grapes from Niphad vineyard.',
            quantity: 200, availableQuantity: 150, unit: 'kg', price: 80, minOrderQuantity: 5, qualityGrade: 'A',
            organic: false, harvestDate: '2026-09-03', availableFrom: '2026-09-04',
            image: REAL_PRODUCE_IMAGES.grapes,
            location: { address: '', city: 'Niphad', district: 'Nashik', state: 'Maharashtra', pincode: '422303' },
            rating: 4.9, totalReviews: 36, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L3', farmerId: 'F3', farmerName: 'Nashik Fresh Farmers FPO', farmName: 'FPO Aggregation Center', sellerType: 'fpo',
            productName: 'Nashik Export Red Onions', category: 'vegetables', description: 'Bulk aggregated red onions from 150 member farmers in Lasalgaon mandi.',
            quantity: 5000, availableQuantity: 4000, unit: 'kg', price: 30, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-28', availableFrom: '2026-08-30',
            image: REAL_PRODUCE_IMAGES.onion,
            location: { address: '', city: 'Lasalgaon', district: 'Nashik', state: 'Maharashtra', pincode: '422209' },
            rating: 4.6, totalReviews: 120, status: 'active'
        },
        {
            id: 'L4', farmerId: 'F4', farmerName: 'Priya Deshmukh', farmName: 'Priya Organic Fields',
            productName: 'Organic Potatoes', category: 'vegetables', description: 'Pesticide-free organic potatoes grown in fertile Agra & Pune soil.',
            quantity: 800, availableQuantity: 750, unit: 'kg', price: 22, minOrderQuantity: 15, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-02', availableFrom: '2026-09-03',
            image: REAL_PRODUCE_IMAGES.potato,
            location: { address: '', city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', pincode: '282001' },
            rating: 4.7, totalReviews: 42, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L5', farmerId: 'F5', farmerName: 'Deepak Pawar', farmName: 'Pawar Grain Farms',
            productName: 'Premium Sharbati Wheat', category: 'grains', description: 'Golden Sharbati wheat grains, clean and triple-sifted from Punjab fields.',
            quantity: 1200, availableQuantity: 1200, unit: 'kg', price: 28, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-25', availableFrom: '2026-08-26',
            image: REAL_PRODUCE_IMAGES.wheat,
            location: { address: '', city: 'Patiala', district: 'Patiala', state: 'Punjab', pincode: '147001' },
            rating: 4.5, totalReviews: 18, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L6', farmerId: 'F6', farmerName: 'Pune Organic Collective FPO', farmName: 'Pune Collective', sellerType: 'fpo',
            productName: 'Organic Alphonso Mangoes', category: 'fruits', description: 'Certified organic naturally ripened Alphonso mangoes from Ratnagiri.',
            quantity: 300, availableQuantity: 250, unit: 'box', price: 650, minOrderQuantity: 2, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: REAL_PRODUCE_IMAGES.mango,
            location: { address: '', city: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415612' },
            rating: 4.9, totalReviews: 85, status: 'active'
        },
        {
            id: 'L7', farmerId: 'F7', farmerName: 'Andhra Organic Group', farmName: 'Guntur Spice Fields',
            productName: 'Guntur Green Chilli', category: 'spices', description: 'Fresh spicy green chillies direct from Guntur mandi.',
            quantity: 400, availableQuantity: 400, unit: 'kg', price: 40, minOrderQuantity: 5, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-02', availableFrom: '2026-09-03',
            image: REAL_PRODUCE_IMAGES.chilli,
            location: { address: '', city: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', pincode: '522001' },
            rating: 4.9, totalReviews: 50, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L8', farmerId: 'F8', farmerName: 'Odisha Farmers Collective', farmName: 'Cuttack Rice Mills', sellerType: 'fpo',
            productName: 'Premium Basmati Rice', category: 'grains', description: 'Long grain aromatic Basmati rice, aged for 12 months in Odisha mills.',
            quantity: 2500, availableQuantity: 2200, unit: 'kg', price: 70, minOrderQuantity: 10, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-20', availableFrom: '2026-08-22',
            image: REAL_PRODUCE_IMAGES.rice,
            location: { address: '', city: 'Cuttack', district: 'Cuttack', state: 'Odisha', pincode: '753001' },
            rating: 4.8, totalReviews: 95, status: 'active'
        }
    ];

    useEffect(() => {
        const queryFromUrl = searchParams.get('q') || searchParams.get('search');
        if (queryFromUrl !== null) {
            setSearchTerm(queryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/marketplace/listings');
                if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
                    setListings(response.data.data);
                } else {
                    setListings(DEMO_LISTINGS);
                }
            } catch (error) {
                setListings(DEMO_LISTINGS);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleAddToCart = (e, listing) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            setToastMsg(`🔐 Please Login or Register first to add "${listing.productName}" to cart!`);
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } else {
            addToCart(listing, listing.minOrderQuantity || 1);
            setToastMsg(`Added "${listing.productName}" (${listing.minOrderQuantity || 1} ${listing.unit}) to Cart!`);
            setTimeout(() => setToastMsg(''), 3500);
        }
    };

    const filteredListings = listings.filter(item => {
        let matchSearch = true;
        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase().trim();
            matchSearch = (
                (item.productName && item.productName.toLowerCase().includes(q)) ||
                (item.farmerName && item.farmerName.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q)) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.location && item.location.city && item.location.city.toLowerCase().includes(q)) ||
                (item.location && item.location.state && item.location.state.toLowerCase().includes(q))
            );
        }

        let matchCat = true;
        if (selectedCategory !== 'All') {
            matchCat = item.category?.toLowerCase() === selectedCategory.toLowerCase();
        }

        let matchGrade = true;
        if (selectedGrade !== 'All') {
            matchGrade = item.qualityGrade === selectedGrade;
        }

        let matchOrigin = true;
        if (selectedOrigin !== 'All') {
            const itemState = item.location?.state || 'Maharashtra';
            matchOrigin = itemState.toLowerCase() === selectedOrigin.toLowerCase();
        }

        let matchOrganic = true;
        if (organicOnly) {
            matchOrganic = item.organic === true;
        }

        let matchSeller = true;
        if (sellerType === 'farmer') matchSeller = item.sellerType === 'farmer';
        if (sellerType === 'fpo') matchSeller = item.sellerType === 'fpo';

        return matchSearch && matchCat && matchGrade && matchOrigin && matchOrganic && matchSeller;
    });

    return (
        <PublicLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {!isAuthenticated && (
                        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-900 text-white p-4 rounded-2xl mb-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-3">
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
                                <Lock className="w-5 h-5 text-amber-300 flex-shrink-0" />
                                <span>{c('You are viewing in Guest Mode. Please Login or Register to complete produce purchases and contact verified farmers!', 'आप गेस्ट मोड में देख रहे हैं। उपज खरीदने और सत्यापित किसानों से संपर्क करने के लिए कृपया लॉगिन या पंजीकरण करें!', 'आपण अतिथी मोडमध्ये पाहत आहात. खरेदी पूर्ण करण्यासाठी आणि सत्यापित शेतकऱ्यांशी संपर्क साधण्यासाठी कृपया लॉगिन किंवा नोंदणी करा!')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="bg-white text-emerald-950 hover:bg-gray-100 font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xs">
                                    {c('Login', 'लॉगिन', 'लॉगिन')}
                                </Link>
                                <Link to="/register" className="bg-amber-400 text-emerald-950 hover:bg-amber-300 font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xs">
                                    {c('Register', 'पंजीकरण', 'नोंदणी')}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Header & Search Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{c('AgroConnect Marketplace', 'कृषिकनेक्ट बाज़ार', 'कृषिकनेक्ट बाजारपेठ')}</h1>
                            <p className="text-gray-600 mt-1">{c('Discover fresh farm produce directly from verified farmers & FPOs across India.', 'भारत भर के सत्यापित किसानों और एफपीओ से सीधे ताज़ी कृषि उपज खोजें।', 'भारतभरातील सत्यापित शेतकरी आणि एफपीओ कडून थेट ताजी शेतमाल शोधा.')}</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <input 
                                type="text" 
                                placeholder={c('Search crops, vegetables, farmers, cities...', 'फसलें, सब्जियां, किसान, शहर खोजें...', 'पिके, भाज्या, शेतकरी, शहरे शोधा...')} 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm shadow-sm font-medium" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4"/>
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')} 
                                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded"
                                >
                                    {c('Clear', 'साफ़ करें', 'पुसा')}
                                </button>
                            )}
                        </div>
                    </div>

                    {toastMsg && (
                        <div className="bg-emerald-950 text-white px-5 py-3 rounded-2xl mb-6 flex items-center shadow-lg text-xs sm:text-sm font-bold border border-amber-400">
                            <CheckCircle className="w-5 h-5 mr-2 text-amber-400 flex-shrink-0" /> {toastMsg}
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter Sidebar */}
                        <div className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm sticky top-24 space-y-6">
                                <div className="flex items-center gap-2 border-b pb-3">
                                    <Filter className="w-5 h-5 text-emerald-700"/>
                                    <h2 className="font-bold text-gray-900">{c('Filter Produce', 'उपज फ़िल्टर करें', 'उत्पाद फिल्टर करा')}</h2>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{c('Category', 'श्रेणी', 'वर्ग')}</h3>
                                    <select 
                                        value={selectedCategory} 
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="All">{c('All Categories 🌾', 'सभी श्रेणियां 🌾', 'सर्व वर्ग 🌾')}</option>
                                        <option value="vegetables">{c('Vegetables 🍅', 'सब्जियां 🍅', 'भाज्या 🍅')}</option>
                                        <option value="fruits">{c('Fruits 🍇', 'फल 🍇', 'फळे 🍇')}</option>
                                        <option value="grains">{c('Grains & Cereals 🌾', 'अनाज 🌾', 'धान्य 🌾')}</option>
                                        <option value="spices">{c('Spices 🌶️', 'मसाले 🌶️', 'मसाले 🌶️')}</option>
                                    </select>
                                </div>

                                {/* Origin State Filter Option */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                                        <Globe2 className="w-4 h-4 text-emerald-600" /> {c('Origin State / Mandi Hub', 'उत्पत्ति राज्य / मंडी हब', 'मूळ राज्य / मंदी केंद्र')}
                                    </h3>
                                    <select 
                                        value={selectedOrigin} 
                                        onChange={(e) => setSelectedOrigin(e.target.value)}
                                        className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="All">{c('All States 📍', 'सभी राज्य 📍', 'सर्व राज्ये 📍')}</option>
                                        <option value="Maharashtra">Maharashtra (Nashik / Lasalgaon)</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh (Agra)</option>
                                        <option value="Punjab">Punjab (Patiala)</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh (Guntur)</option>
                                        <option value="Odisha">Odisha (Cuttack)</option>
                                    </select>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{c('Quality Grade', 'गुणवत्ता श्रेणी', 'गुणवत्ता श्रेणी')}</h3>
                                    <div className="flex gap-2">
                                        {['All', 'A', 'B', 'C'].map(g => (
                                            <button 
                                                key={g} 
                                                onClick={() => setSelectedGrade(g)}
                                                className={`px-3 py-1 border rounded-lg text-xs font-bold transition cursor-pointer ${
                                                    selectedGrade === g 
                                                        ? 'bg-emerald-700 text-white border-emerald-700' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {g === 'All' ? c('All', 'सभी', 'सर्व') : `${c('Grade', 'ग्रेड', 'ग्रेड')} ${g}`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{c('Seller Type', 'विक्रेता प्रकार', 'विक्रेता प्रकार')}</h3>
                                    <select 
                                        value={sellerType} 
                                        onChange={(e) => setSellerType(e.target.value)}
                                        className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="All">{c('All Sellers', 'सभी विक्रेता', 'सर्व विक्रेते')}</option>
                                        <option value="farmer">{c('Individual Farmers 👨‍🌾', 'व्यक्तिगत किसान 👨‍🌾', 'वैयक्तिक शेतकरी 👨‍🌾')}</option>
                                        <option value="fpo">{c('FPO (Bulk Produce) 🏢', 'एफपीओ (थोक उपज) 🏢', 'एफपीओ (घाऊक माल) 🏢')}</option>
                                    </select>
                                </div>
                                
                                <label className="flex items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={organicOnly}
                                        onChange={(e) => setOrganicOnly(e.target.checked)}
                                        className="rounded text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="ml-2.5 text-xs font-bold text-emerald-900 flex items-center">
                                        <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600"/> {c('Certified Organic Only', 'केवल प्रमाणित जैविक', 'केवळ प्रमाणित सेंद्रिय')}
                                    </span>
                                </label>

                                {(searchTerm || selectedCategory !== 'All' || selectedGrade !== 'All' || selectedOrigin !== 'All' || organicOnly || sellerType !== 'All') && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedGrade('All'); setSelectedOrigin('All'); setOrganicOnly(false); setSellerType('All'); }}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-xl transition cursor-pointer"
                                    >
                                        {c('Reset All Filters', 'सभी फ़िल्टर रीसेट करें', 'सर्व फिल्टर रीसेट करा')}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 text-sm font-medium">
                                    {c('Showing', 'दिखा रहे हैं', 'दाखवत आहे')} <strong className="text-gray-900">{filteredListings.length}</strong> {c('fresh produce listings', 'ताज़ी उपज की लिस्टिंग', 'ताजी उत्पादने यादी')}
                                    {searchTerm && <span> {c('for', 'के लिए', 'साठी')} "<span className="text-emerald-600 font-bold">{searchTerm}</span>"</span>}
                                </span>
                            </div>

                            {isLoading ? (
                                <div className="py-20 text-center text-gray-500 font-medium">{c('Loading produce listings...', 'उपज लिस्टिंग लोड हो रही है...', 'यादी लोड होत आहे...')}</div>
                            ) : filteredListings.length === 0 ? (
                                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm">
                                    <p className="text-gray-600 text-base font-bold mb-1">{c('No produce listings found.', 'कोई उपज लिस्टिंग नहीं मिली।', 'कोणतीही उत्पादने सापडली नाहीत.')}</p>
                                    <p className="text-gray-400 text-xs mb-4">{c('Try searching for "Tomato", "Onion", "Grapes", "Wheat", or "Potato"', '"टमाटर", "प्याज", "अंगूर", "गेहूं", या "आलू" खोजें', '"टोमॅटो", "कांदा", "द्राक्षे", "गहू", किंवा "बटाटा" शोधण्याचा प्रयत्न करा')}</p>
                                    <button 
                                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedGrade('All'); setSelectedOrigin('All'); setOrganicOnly(false); setSellerType('All'); }}
                                        className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-800 transition"
                                    >
                                        {c('Clear Search & Reset Filters', 'खोज साफ़ करें और फ़िल्टर रीसेट करें', 'शोध पुसा आणि फिल्टर रीसेट करा')}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredListings.map(listing => {
                                        const city = listing.location?.city || listing.location?.address || 'Nashik';
                                        const state = listing.location?.state || 'Maharashtra';
                                        const realImage = getProduceRealImage(listing);

                                        return (
                                            <div key={listing.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition flex flex-col">
                                                <Link to={`/marketplace/${listing.id}`} className="block relative">
                                                    <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                                        <img 
                                                            src={realImage} 
                                                            alt={listing.productName} 
                                                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                                        />
                                                        {listing.organic && (
                                                            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center">
                                                                <ShieldCheck className="w-3.5 h-3.5 mr-1"/> {c('Organic', 'जैविक', 'सेंद्रिय')}
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow border">
                                                            {c('Grade', 'ग्रेड', 'ग्रेड')} {listing.qualityGrade || 'A'}
                                                        </div>
                                                        <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                            <MapPin className="w-3 h-3 text-amber-400" /> {c('Origin:', 'स्थान:', 'स्थान:')} {city}, {state}
                                                        </div>
                                                    </div>
                                                </Link>

                                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-1.5">
                                                            <Link to={`/marketplace/${listing.id}`} className="font-bold text-base text-gray-900 group-hover:text-emerald-700 transition line-clamp-1">
                                                                {listing.productName}
                                                            </Link>
                                                            <span className="bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-1 rounded-md text-xs whitespace-nowrap ml-2">
                                                                ₹{listing.price}/{listing.unit}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 line-clamp-2 mb-2 font-medium">{listing.description}</p>
                                                    </div>

                                                    <div className="space-y-3 pt-2 border-t border-gray-100">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <div className="flex items-center gap-1.5">
                                                                {listing.sellerType === 'fpo' ? (
                                                                    <span className="bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded text-[10px]">{c('FPO 🏢', 'एफपीओ 🏢', 'एफपीओ 🏢')}</span>
                                                                ) : (
                                                                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[10px]">{c('FARMER 👨‍🌾', 'किसान 👨‍🌾', 'शेतकरी 👨‍🌾')}</span>
                                                                )}
                                                                <span className="font-bold text-gray-800 truncate max-w-[120px]" title={listing.farmerName}>
                                                                    {listing.farmerName}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center text-amber-500 font-bold">
                                                                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1 text-amber-400"/>
                                                                <span>{listing.rating || 4.8}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Link to={`/marketplace/${listing.id}`} className="flex-1">
                                                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-2.5 rounded-xl text-xs transition cursor-pointer">
                                                                    {c('View Details', 'विवरण देखें', 'तपशील पहा')}
                                                                </button>
                                                            </Link>
                                                            <button 
                                                                onClick={(e) => handleAddToCart(e, listing)}
                                                                className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                                            >
                                                                <ShoppingCart className="w-3.5 h-3.5" /> {c('Buy Direct', 'सीधे खरीदें', 'थेट खरेदी करा')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default MarketplacePage;
