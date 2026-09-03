import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Truck, Zap, Info, ArrowLeft, Loader2, Calendar, Scale, Award } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
export const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Demo fetch
        setTimeout(() => {
            setProduct({
                id: id || 'L1', farmerId: 'F1', farmerName: 'Ramesh Patel', farmName: 'Green Acres',
                productName: 'Organic Tomatoes', category: 'vegetables', description: 'Fresh organic tomatoes directly from Nashik farms. Grown without synthetic pesticides, hand-picked for quality. Perfect for retail or culinary use.',
                quantity: 500, availableQuantity: 500, unit: 'kg', price: 30, minOrderQuantity: 10, qualityGrade: 'A',
                organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02', images: [],
                location: { address: 'Plot 42', city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001', lat: 20, lng: 73 },
                rating: 4.8, totalReviews: 24, sellerType: 'farmer', status: 'active', createdAt: '', updatedAt: ''
            });
            setIsLoading(false);
        }, 600);
    }, [id]);
    if (isLoading) {
        return (<PublicLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4"/>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </PublicLayout>);
    }
    if (!product) {
        return (<PublicLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The listing you are looking for does not exist or has been removed.</p>
          <Link to="/marketplace">
            <Button leftIcon={<ArrowLeft size={16}/>}>Back to Marketplace</Button>
          </Link>
        </div>
      </PublicLayout>);
    }
    return (<PublicLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/marketplace" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1"/> Back to Marketplace
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Product Image Placeholder */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-12 flex items-center justify-center min-h-[400px] border-r border-gray-100 relative">
                <span className="text-[10rem]">🍅</span>
                {product.organic && (<div className="absolute top-6 left-6 bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-md flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2"/> Certified Organic
                  </div>)}
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-10 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-green-600 uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded text-sm font-medium">
                    <Star className="w-4 h-4 fill-current mr-1"/>
                    {product.rating} ({product.totalReviews} reviews)
                  </div>
                </div>
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.productName}</h1>
                
                <div className="flex items-center text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <MapPin className="w-5 h-5 mr-1 text-gray-400"/>
                  <span>{product.location.city}, {product.location.state} <span className="text-gray-400 ml-1">(~12 km away)</span></span>
                </div>

                <div className="flex items-end mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">₹{product.price}</span>
                  <span className="text-xl text-gray-500 ml-2 mb-1">/ {product.unit}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center">
                      <Scale className="w-3 h-3 mr-1"/> Available Qty
                    </div>
                    <div className="font-bold text-gray-900 text-lg">{product.availableQuantity} {product.unit}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center">
                      <Award className="w-3 h-3 mr-1"/> Quality
                    </div>
                    <div className="font-bold text-gray-900 text-lg">Grade {product.qualityGrade}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1"/> Harvested On
                    </div>
                    <div className="font-bold text-gray-900 text-lg">{new Date(product.harvestDate).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center">
                      <Truck className="w-3 h-3 mr-1"/> Min. Order
                    </div>
                    <div className="font-bold text-gray-900 text-lg">{product.minOrderQuantity} {product.unit}</div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="mt-auto flex gap-4">
                  <Button size="lg" className="flex-1">Add to Cart</Button>
                  <Button variant="accent" size="lg" className="flex-1">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Seller Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-3">Seller Details</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mr-4">👨‍🌾</div>
                <div>
                  <h4 className="font-bold text-gray-900">{product.farmerName}</h4>
                  <p className="text-sm text-gray-500">{product.farmName}</p>
                </div>
              </div>
              <Button variant="outline" fullWidth>Contact Seller</Button>
            </div>

            {/* Price Transparency */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-gray-50 opacity-50"><Info size={100}/></div>
              <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-3 relative z-10">Price Transparency</h3>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Farm Price</span>
                  <span className="font-medium text-gray-900">₹26.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Est. Shared Logistics</span>
                  <span className="font-medium text-gray-900">₹3.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee (3%)</span>
                  <span className="font-medium text-gray-900">₹1.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 font-bold text-green-700">
                  <span>Total Transparent Price</span>
                  <span>₹30.00 / {product.unit}</span>
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-sm text-white relative">
              <div className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                Prototype AI Prediction
              </div>
              <Zap className="w-8 h-8 text-yellow-300 mb-4"/>
              <h3 className="font-bold text-lg mb-2">Market Insight</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Prices for Tomatoes in Nashik are expected to rise by 12% next week due to high demand and reduced local yields. Current price is 15% below market average.
              </p>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <span className="block text-xs text-blue-200 mb-1">Recommendation</span>
                <span className="font-semibold text-sm">Excellent time to buy in bulk.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>);
};
