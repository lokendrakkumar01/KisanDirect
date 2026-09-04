import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Truck, Zap, Info, ArrowLeft, Loader2, Calendar, Scale, Award, ShoppingCart, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [toastMsg, setToastMsg] = useState('');
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const CROP_DATABASE = {
        'L1': {
            id: 'L1', farmerId: 'F1', farmerName: 'Ramesh Patil', farmName: 'Ramesh Organic Farms',
            productName: 'Fresh Red Tomatoes', category: 'vegetables', description: 'Freshly harvested Grade A red tomatoes directly from Nashik farm. Grown without synthetic pesticides, hand-picked for quality. Perfect for retail, household cooking, or culinary use.',
            quantity: 500, availableQuantity: 500, unit: 'kg', price: 25, minOrderQuantity: 10, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Plot 42, Nashik Valley', city: 'Nashik', state: 'Maharashtra', pincode: '422001' },
            rating: 4.8, totalReviews: 24, sellerType: 'farmer'
        },
        'L2': {
            id: 'L2', farmerId: 'F2', farmerName: 'Sunil Shinde', farmName: 'Shinde Vineyards',
            productName: 'Seedless Green Grapes', category: 'fruits', description: 'Sweet export-grade seedless green grapes from Niphad valley. Crispy texture, high sugar content, harvested fresh daily.',
            quantity: 200, availableQuantity: 150, unit: 'kg', price: 80, minOrderQuantity: 5, qualityGrade: 'A',
            organic: false, harvestDate: '2026-09-03', availableFrom: '2026-09-04',
            image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Niphad Vineyard Road', city: 'Niphad', state: 'Maharashtra', pincode: '422303' },
            rating: 4.9, totalReviews: 36, sellerType: 'farmer'
        },
        'L3': {
            id: 'L3', farmerId: 'F3', farmerName: 'Nashik Fresh Farmers FPO', farmName: 'FPO Aggregation Center',
            productName: 'Nashik Export Red Onions', category: 'vegetables', description: 'Bulk aggregated export quality red onions pooled from 150 member farmers. Long shelf life, dry cured, ideal for hotels, wholesale, and export.',
            quantity: 5000, availableQuantity: 4000, unit: 'kg', price: 30, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-28', availableFrom: '2026-08-30',
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Main FPO Hub, Pimpalgaon', city: 'Pimpalgaon', state: 'Maharashtra', pincode: '422209' },
            rating: 4.6, totalReviews: 120, sellerType: 'fpo'
        },
        'L4': {
            id: 'L4', farmerId: 'F4', farmerName: 'Priya Deshmukh', farmName: 'Priya Organic Fields',
            productName: 'Organic Potatoes', category: 'vegetables', description: 'Pesticide-free organic potatoes grown in fertile Pune black soil. Excellent texture for chips, curries, and culinary dishes.',
            quantity: 800, availableQuantity: 750, unit: 'kg', price: 22, minOrderQuantity: 15, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-02', availableFrom: '2026-09-03',
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Organic Farm Zone', city: 'Pune', state: 'Maharashtra', pincode: '411001' },
            rating: 4.7, totalReviews: 42, sellerType: 'farmer'
        },
        'L5': {
            id: 'L5', farmerId: 'F5', farmerName: 'Deepak Pawar', farmName: 'Pawar Grain Farms',
            productName: 'Premium Sharbati Wheat', category: 'grains', description: 'Golden Sharbati wheat grains, sun-dried, clean, and triple-sifted. High protein content, ideal for nutritious roti flour.',
            quantity: 1200, availableQuantity: 1200, unit: 'kg', price: 28, minOrderQuantity: 50, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-25', availableFrom: '2026-08-26',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Grain Mandi Sector 4', city: 'Ahmednagar', state: 'Maharashtra', pincode: '414001' },
            rating: 4.5, totalReviews: 18, sellerType: 'farmer'
        },
        'L6': {
            id: 'L6', farmerId: 'F6', farmerName: 'Pune Organic Collective FPO', farmName: 'Pune Collective',
            productName: 'Organic Alphonso Mangoes', category: 'fruits', description: 'Certified organic naturally ripened Alphonso mangoes from Ratnagiri orchards. Rich aroma, sweet pulp, zero chemical ripening.',
            quantity: 300, availableQuantity: 250, unit: 'box', price: 650, minOrderQuantity: 2, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02',
            image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Coastal Orchard Hub', city: 'Ratnagiri', state: 'Maharashtra', pincode: '415612' },
            rating: 4.9, totalReviews: 85, sellerType: 'fpo'
        },
        'L7': {
            id: 'L7', farmerId: 'F7', farmerName: 'Andhra Organic Group', farmName: 'Guntur Spice Fields',
            productName: 'Guntur Green Chilli', category: 'spices', description: 'Fresh spicy green chillies direct from Guntur mandi. High pungent quality, freshly picked for spice processing and culinary use.',
            quantity: 400, availableQuantity: 400, unit: 'kg', price: 40, minOrderQuantity: 5, qualityGrade: 'A',
            organic: true, harvestDate: '2026-09-02', availableFrom: '2026-09-03',
            image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Guntur Mandi Market', city: 'Guntur', state: 'Andhra Pradesh', pincode: '522001' },
            rating: 4.9, totalReviews: 50, sellerType: 'farmer'
        },
        'L8': {
            id: 'L8', farmerId: 'F8', farmerName: 'Odisha Farmers Collective', farmName: 'Cuttack Rice Mills',
            productName: 'Premium Basmati Rice', category: 'grains', description: 'Long grain aromatic Basmati rice, aged for 12 months in Odisha mills. Superfine texture, zero broken grains, rich aroma.',
            quantity: 2500, availableQuantity: 2200, unit: 'kg', price: 70, minOrderQuantity: 10, qualityGrade: 'A',
            organic: false, harvestDate: '2026-08-20', availableFrom: '2026-08-22',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
            location: { address: 'Cuttack Rice Mill Zone', city: 'Cuttack', state: 'Odisha', pincode: '753001' },
            rating: 4.8, totalReviews: 95, sellerType: 'fpo'
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const found = CROP_DATABASE[id] || CROP_DATABASE['L1'];
            setProduct(found);
            setIsLoading(false);
        }, 300);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, product.minOrderQuantity || 1);
        setToastMsg(`Added "${product.productName}" to Cart!`);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleBuyNow = () => {
        if (!product) return;
        addToCart(product, product.minOrderQuantity || 1);
        navigate('/consumer/checkout');
    };

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                    <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4"/>
                    <p className="text-gray-600 font-medium">Loading produce details...</p>
                </div>
            </PublicLayout>
        );
    }

    if (!product) {
        return (
            <PublicLayout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Produce Listing Not Found</h2>
                    <p className="text-gray-500 mb-6">The produce listing you are looking for does not exist or has been removed.</p>
                    <Link to="/marketplace">
                        <Button leftIcon={<ArrowLeft size={16}/>}>Back to Marketplace</Button>
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <Link to="/marketplace" className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-green-600 mb-6 transition">
                        <ArrowLeft className="w-4 h-4 mr-1"/> Back to Marketplace
                    </Link>

                    {toastMsg && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm text-sm">
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" /> {toastMsg}
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            
                            {/* High Quality Product Image */}
                            <div className="relative min-h-[380px] bg-gray-100 flex items-center justify-center overflow-hidden border-r border-gray-100">
                                <img 
                                    src={product.image} 
                                    alt={product.productName} 
                                    className="w-full h-full object-cover max-h-[480px]"
                                />
                                {product.organic && (
                                    <div className="absolute top-6 left-6 bg-green-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center">
                                        <ShieldCheck className="w-4 h-4 mr-1.5"/> Certified Organic
                                    </div>
                                )}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-gray-900 font-extrabold text-xs px-3 py-1.5 rounded-lg shadow border">
                                    Grade {product.qualityGrade}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-8 lg:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-green-600 uppercase tracking-widest">{product.category}</span>
                                        <div className="flex items-center bg-amber-50 text-amber-700 px-2.5 py-1 rounded text-xs font-bold border border-amber-200">
                                            <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-500"/>
                                            {product.rating} ({product.totalReviews} reviews)
                                        </div>
                                    </div>
                                    
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.productName}</h1>
                                    
                                    <div className="flex items-center text-gray-600 text-sm mb-6 pb-4 border-b border-gray-100">
                                        <MapPin className="w-4 h-4 mr-1 text-gray-400"/>
                                        <span>{product.location.city}, {product.location.state} <span className="text-green-600 font-bold ml-1">(~12 km away)</span></span>
                                    </div>

                                    <div className="flex items-baseline mb-6">
                                        <span className="text-4xl font-extrabold text-gray-900">₹{product.price}</span>
                                        <span className="text-base text-gray-500 font-medium ml-1.5">/ {product.unit}</span>
                                        <span className="ml-3 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">Direct Farm Rate</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center">
                                                <Scale className="w-3.5 h-3.5 mr-1 text-green-600"/> Available Stock
                                            </div>
                                            <div className="font-extrabold text-gray-900 text-base">{product.availableQuantity} {product.unit}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center">
                                                <Award className="w-3.5 h-3.5 mr-1 text-blue-600"/> Quality Standard
                                            </div>
                                            <div className="font-extrabold text-gray-900 text-base">Grade {product.qualityGrade}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600"/> Harvested On
                                            </div>
                                            <div className="font-extrabold text-gray-900 text-base">{product.harvestDate}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center">
                                                <Truck className="w-3.5 h-3.5 mr-1 text-purple-600"/> Min Order
                                            </div>
                                            <div className="font-extrabold text-gray-900 text-base">{product.minOrderQuantity} {product.unit}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <Button 
                                        size="lg" 
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-gray-900 hover:bg-black font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                                    </Button>
                                    <Button 
                                        size="lg" 
                                        onClick={handleBuyNow}
                                        className="flex-1 bg-green-600 hover:bg-green-700 font-bold text-sm"
                                    >
                                        Buy Now Direct ⚡
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lower Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        {/* Seller Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-base text-gray-900 mb-4 border-b border-gray-100 pb-3">Seller Details</h3>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold mr-3 border border-green-200">
                                    {product.sellerType === 'fpo' ? '🏭' : '👨‍🌾'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{product.farmerName}</h4>
                                    <p className="text-xs text-gray-500">{product.farmName}</p>
                                    <span className="inline-block bg-green-50 text-green-700 text-[10px] font-extrabold px-2 py-0.5 rounded mt-1">
                                        VERIFIED SELLER
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" fullWidth className="font-semibold text-xs">Contact Farmer / FPO</Button>
                        </div>

                        {/* Price Transparency */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                            <div className="absolute -right-6 -top-6 text-gray-100 opacity-50"><Info size={100}/></div>
                            <h3 className="font-bold text-base text-gray-900 mb-4 border-b border-gray-100 pb-3 relative z-10">Price Transparency Breakdown</h3>
                            <div className="space-y-3 relative z-10 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Base Farmer Realization</span>
                                    <span className="font-bold text-gray-900">₹{(product.price * 0.85).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shared Route Logistics</span>
                                    <span className="font-bold text-gray-900">₹{(product.price * 0.10).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">AgroConnect Engine Fee (5%)</span>
                                    <span className="font-bold text-gray-900">₹{(product.price * 0.05).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-gray-100 font-extrabold text-sm text-green-700">
                                    <span>Total Buyer Price</span>
                                    <span>₹{product.price}.00 / {product.unit}</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Insights Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-sm text-white relative">
                            <div className="absolute top-4 right-4 bg-white/20 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider">
                                AI Yield &amp; Demand Engine
                            </div>
                            <Zap className="w-7 h-7 text-yellow-300 mb-3"/>
                            <h3 className="font-bold text-base mb-2">Market Demand Intelligence</h3>
                            <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                                Demand for {product.productName} in {product.location.city} is trending +18% higher than average. Direct farmer pricing provides 22% cost savings vs traditional mandis.
                            </p>
                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                <span className="block text-[10px] text-blue-200 mb-0.5 font-bold uppercase">AI Recommendation</span>
                                <span className="font-bold text-xs text-white">Optimal time to lock in order at direct farm rates.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default ProductDetailPage;
