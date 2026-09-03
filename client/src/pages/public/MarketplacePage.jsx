import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, ShieldCheck, ShoppingCart, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { useCart } from '../../contexts/CartContext';
import api from '../../services/api';

export const MarketplacePage = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [organicOnly, setOrganicOnly] = useState(false);
    const [sellerType, setSellerType] = useState('All');
    const [toastMsg, setToastMsg] = useState('');
    const { addToCart } = useCart();

    const DEMO_LISTINGS = [
        {
            id: 'L1', farmerId: 'F1', farmerName: 'Ramesh Patil', farmName: 'Ramesh Organic Farms',
            productName: 'Fresh Red Tomatoes', category: 'vegetables', description: 'Freshly harvested Grade A red tomatoes directly from Nashik farm.',
            quantity: 500, availableQuantity: 500, unit: 'kg', price: 25, minOrderQuantity: 10, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001' },
            rating: 4.8, totalReviews: 24, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L2', farmerId: 'F2', farmerName: 'Sunil Shinde', farmName: 'Shinde Orchards',
            productName: 'Seedless Green Grapes', category: 'fruits', description: 'Sweet export-grade seedless grapes from Niphad vineyard.',
            quantity: 200, availableQuantity: 150, unit: 'kg', price: 80, minOrderQuantity: 5, qualityGrade: 'A',
            organic: false, harvestDate: '2026-09-03', availableFrom: '2026-09-04',
            image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Niphad', district: 'Nashik', state: 'Maharashtra', pincode: '422303' },
            rating: 4.9, totalReviews: 36, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L3', farmerId: 'F3', farmerName: 'Nashik Fresh Farmers FPO', farmName: 'FPO Aggregation Center', sellerType: 'fpo',
            productName: 'Nashik Export Red Onions', category: 'vegetables', description: 'Bulk aggregated red onions from 150 member farmers.',
            quantity: 5000, availableQuantity: 4000, unit: 'kg', price: 30, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-28', availableFrom: '2026-08-30',
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Pimpalgaon', district: 'Nashik', state: 'Maharashtra', pincode: '422209' },
            rating: 4.6, totalReviews: 120, status: 'active'
        },
        {
            id: 'L4', farmerId: 'F4', farmerName: 'Priya Deshmukh', farmName: 'Priya Organic Fields',
            productName: 'Organic Potatoes', category: 'vegetables', description: 'Pesticide-free organic potatoes grown in fertile Pune soil.',
            quantity: 800, availableQuantity: 750, unit: 'kg', price: 22, minOrderQuantity: 15, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-02', availableFrom: '2026-09-03',
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411001' },
            rating: 4.7, totalReviews: 42, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L5', farmerId: 'F5', farmerName: 'Deepak Pawar', farmName: 'Pawar Grain Farms',
            productName: 'Premium Sharbati Wheat', category: 'grains', description: 'Golden Sharbati wheat grains, clean and triple-sifted.',
            quantity: 1200, availableQuantity: 1200, unit: 'kg', price: 28, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-25', availableFrom: '2026-08-26',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Ahmednagar', district: 'Ahmednagar', state: 'Maharashtra', pincode: '414001' },
            rating: 4.5, totalReviews: 18, sellerType: 'farmer', status: 'active'
        },
        {
            id: 'L6', farmerId: 'F6', farmerName: 'Pune Organic Collective FPO', farmName: 'Pune Collective', sellerType: 'fpo',
            productName: 'Organic Alphonso Mangoes', category: 'fruits', description: 'Certified organic naturally ripened Alphonso mangoes.',
            quantity: 300, availableQuantity: 250, unit: 'box', price: 650, minOrderQuantity: 2, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
            location: { address: '', city: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415612' },
            rating: 4.9, totalReviews: 85, status: 'active'
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
        addToCart(listing, listing.minOrderQuantity || 1);
        setToastMsg(`Added "${listing.productName}" (${listing.minOrderQuantity || 1} ${listing.unit}) to Cart!`);
        setTimeout(() => setToastMsg(''), 3500);
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

        let matchOrganic = true;
        if (organicOnly) {
            matchOrganic = item.organic === true;
        }

        let matchSeller = true;
        if (sellerType === 'farmer') matchSeller = item.sellerType === 'farmer';
        if (sellerType === 'fpo') matchSeller = item.sellerType === 'fpo';

        return matchSearch && matchCat && matchGrade && matchOrganic && matchSeller;
    });

    return (
        <PublicLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Search Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">AgroConnect Marketplace</h1>
                            <p className="text-gray-600 mt-1">Discover fresh farm produce directly from verified farmers &amp; FPOs across India.</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <input 
                                type="text" 
                                placeholder="Search crops, vegetables, farmers, cities..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm font-medium" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4"/>
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')} 
                                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {toastMsg && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm text-sm font-semibold">
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" /> {toastMsg}
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter Sidebar */}
                        <div className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm sticky top-24 space-y-6">
                                <div className="flex items-center gap-2 border-b pb-3">
                                    <Filter className="w-5 h-5 text-gray-700"/>
                                    <h2 className="font-bold text-gray-900">Filter Produce</h2>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Category</h3>
                                    <select 
                                        value={selectedCategory} 
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full border rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-green-500 font-medium"
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="vegetables">Vegetables 🍅</option>
                                        <option value="fruits">Fruits 🍇</option>
                                        <option value="grains">Grains &amp; Cereals 🌾</option>
                                    </select>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quality Grade</h3>
                                    <div className="flex gap-2">
                                        {['All', 'A', 'B', 'C'].map(g => (
                                            <button 
                                                key={g} 
                                                onClick={() => setSelectedGrade(g)}
                                                className={`px-3 py-1 border rounded-lg text-xs font-bold transition ${
                                                    selectedGrade === g 
                                                        ? 'bg-green-600 text-white border-green-600' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {g === 'All' ? 'All' : `Grade ${g}`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Seller Type</h3>
                                    <select 
                                        value={sellerType} 
                                        onChange={(e) => setSellerType(e.target.value)}
                                        className="w-full border rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-green-500 font-medium"
                                    >
                                        <option value="All">All Sellers</option>
                                        <option value="farmer">Individual Farmers 👨‍🌾</option>
                                        <option value="fpo">FPO (Bulk Produce) 🏭</option>
                                    </select>
                                </div>
                                
                                <label className="flex items-center p-3 bg-green-50 rounded-xl border border-green-100 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={organicOnly}
                                        onChange={(e) => setOrganicOnly(e.target.checked)}
                                        className="rounded text-green-600 focus:ring-green-500"
                                    />
                                    <span className="ml-2.5 text-xs font-bold text-green-900 flex items-center">
                                        <ShieldCheck className="w-4 h-4 mr-1 text-green-600"/> Certified Organic Only
                                    </span>
                                </label>

                                {(searchTerm || selectedCategory !== 'All' || selectedGrade !== 'All' || organicOnly || sellerType !== 'All') && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedGrade('All'); setOrganicOnly(false); setSellerType('All'); }}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-xl transition"
                                    >
                                        Reset All Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 text-sm font-medium">
                                    Showing <strong className="text-gray-900">{filteredListings.length}</strong> fresh produce listings
                                    {searchTerm && <span> for "<span className="text-green-600 font-bold">{searchTerm}</span>"</span>}
                                </span>
                            </div>

                            {isLoading ? (
                                <div className="py-20 text-center text-gray-500 font-medium">Loading produce listings...</div>
                            ) : filteredListings.length === 0 ? (
                                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm">
                                    <p className="text-gray-600 text-base font-bold mb-1">No produce listings found.</p>
                                    <p className="text-gray-400 text-xs mb-4">Try searching for "Tomato", "Onion", "Grapes", "Wheat", or "Potato"</p>
                                    <button 
                                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedGrade('All'); setOrganicOnly(false); setSellerType('All'); }}
                                        className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-green-700 transition"
                                    >
                                        Clear Search &amp; Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredListings.map(listing => {
                                        const city = listing.location?.city || listing.location?.address || 'Nashik';
                                        const state = listing.location?.state || 'Maharashtra';
                                        return (
                                            <div key={listing.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition flex flex-col">
                                                <Link to={`/marketplace/${listing.id}`} className="block relative">
                                                    <div className="h-44 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                                        {listing.image ? (
                                                            <img 
                                                                src={listing.image} 
                                                                alt={listing.productName} 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                                                {listing.category === 'vegetables' ? '🍅' : listing.category === 'fruits' ? '🍇' : '🌾'}
                                                            </span>
                                                        )}
                                                        {listing.organic && (
                                                            <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center">
                                                                <ShieldCheck className="w-3.5 h-3.5 mr-1"/> Organic
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow border">
                                                            Grade {listing.qualityGrade}
                                                        </div>
                                                    </div>
                                                </Link>

                                                <div className="p-5 flex-1 flex flex-col">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Link to={`/marketplace/${listing.id}`} className="font-bold text-base text-gray-900 group-hover:text-green-600 transition line-clamp-1">
                                                            {listing.productName}
                                                        </Link>
                                                        <span className="bg-green-50 text-green-700 font-extrabold px-2.5 py-1 rounded text-xs whitespace-nowrap ml-2">
                                                            ₹{listing.price}/{listing.unit}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{listing.description}</p>
                                                    
                                                    <div className="flex items-center text-gray-600 text-xs mb-3 font-medium">
                                                        <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400 flex-shrink-0"/> {city}, {state}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-xs">
                                                        <div className="flex items-center gap-1.5">
                                                            {listing.sellerType === 'fpo' ? (
                                                                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">FPO</span>
                                                            ) : (
                                                                <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-[10px]">FARMER</span>
                                                            )}
                                                            <span className="font-medium text-gray-700 truncate max-w-[110px]" title={listing.farmerName}>
                                                                {listing.farmerName}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-amber-500 font-bold">
                                                            <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-500"/>
                                                            <span>{listing.rating || 4.8}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-3 border-t flex gap-2">
                                                        <Link to={`/marketplace/${listing.id}`} className="flex-1">
                                                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-2.5 rounded-xl text-xs transition">
                                                                View Details
                                                            </button>
                                                        </Link>
                                                        <button 
                                                            onClick={(e) => handleAddToCart(e, listing)}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                                                        >
                                                            <ShoppingCart className="w-3.5 h-3.5" /> Buy Direct
                                                        </button>
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
