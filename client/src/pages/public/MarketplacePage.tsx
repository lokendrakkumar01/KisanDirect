import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Award, ShieldCheck, Loader2 } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { CropListing } from '../../types';
import api from '../../services/api';

export const MarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<CropListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for Prototype
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/marketplace/listings');
        if (response.data?.success && response.data?.data) {
          setListings(response.data.data);
        } else {
          // Fallback demo data
          setListings(getDemoListings());
        }
      } catch (error) {
        setListings(getDemoListings());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListings();
  }, []);

  const getDemoListings = (): CropListing[] => [
    {
      id: 'L1', farmerId: 'F1', farmerName: 'Ramesh Patel', farmName: 'Green Acres',
      productName: 'Organic Tomatoes', category: 'vegetables', description: 'Fresh organic tomatoes directly from Nashik farms.',
      quantity: 500, availableQuantity: 500, unit: 'kg', price: 30, minOrderQuantity: 10, qualityGrade: 'A',
      organic: true, harvestDate: '2026-09-01', availableFrom: '2026-09-02', images: [],
      location: { address: '', city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001', lat: 20, lng: 73 },
      rating: 4.8, totalReviews: 24, sellerType: 'farmer', status: 'active', createdAt: '', updatedAt: ''
    },
    {
      id: 'L2', farmerId: 'F2', farmerName: 'Suresh Kumar', farmName: 'Sunshine Orchards',
      productName: 'Alphonso Mangoes', category: 'fruits', description: 'Premium quality export-grade Alphonso.',
      quantity: 200, availableQuantity: 150, unit: 'box', price: 800, minOrderQuantity: 5, qualityGrade: 'A',
      organic: false, harvestDate: '2026-09-03', availableFrom: '2026-09-04', images: [],
      location: { address: '', city: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415612', lat: 17, lng: 73 },
      rating: 4.9, totalReviews: 56, sellerType: 'farmer', status: 'active', createdAt: '', updatedAt: ''
    },
    {
      id: 'L3', farmerId: 'F3', farmerName: 'Nashik FPO', farmName: 'FPO Collect', sellerType: 'fpo',
      productName: 'Onions (Red)', category: 'vegetables', description: 'Bulk onions aggregated from 50 local farmers.',
      quantity: 5000, availableQuantity: 4000, unit: 'kg', price: 18, minOrderQuantity: 500, qualityGrade: 'B',
      organic: false, harvestDate: '2026-08-28', availableFrom: '2026-08-30', images: [],
      location: { address: '', city: 'Pimpalgaon', district: 'Nashik', state: 'Maharashtra', pincode: '422209', lat: 20, lng: 73.9 },
      rating: 4.5, totalReviews: 120, status: 'active', createdAt: '', updatedAt: ''
    }
  ];

  return (
    <PublicLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-gray-600 mt-1">Discover fresh produce directly from farmers and FPOs.</p>
            </div>
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search crops, vegetables..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-gray-700" />
                  <h2 className="font-bold text-gray-900">Filters</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Category</h3>
                    <div className="space-y-2">
                      {['Vegetables', 'Fruits', 'Grains', 'Pulses'].map(cat => (
                        <label key={cat} className="flex items-center">
                          <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                          <span className="ml-2 text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quality Grade</h3>
                    <div className="flex gap-2">
                      {['A', 'B', 'C'].map(grade => (
                        <button key={grade} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-green-50 hover:border-green-500 focus:bg-green-50 focus:border-green-500">
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Seller Type</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-700">Individual Farmer</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-700">FPO (Bulk)</span>
                      </label>
                    </div>
                  </div>
                  
                  <label className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100 cursor-pointer">
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                    <span className="ml-2 text-sm font-medium text-green-800 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1" /> Certified Organic
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm">Showing {listings.length} results</span>
                <select className="border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500">
                  <option>Sort by: Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Distance: Nearest First</option>
                </select>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Loading marketplace listings...</p>
                </div>
              ) : listings.length === 0 ? (
                <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
                  <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map(listing => (
                    <Link key={listing.id} to={`/marketplace/product/${listing.id}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col">
                      <div className="h-48 bg-gradient-to-br from-green-100 to-amber-50 flex items-center justify-center relative">
                        <span className="text-6xl">{listing.category === 'vegetables' ? '🍅' : listing.category === 'fruits' ? '🥭' : '🌾'}</span>
                        {listing.organic && (
                          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-1" /> Organic
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                          Grade {listing.qualityGrade}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition">{listing.productName}</h3>
                          <span className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded text-sm">
                            ₹{listing.price}/{listing.unit}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {listing.location.city}, {listing.location.state}
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            {listing.sellerType === 'fpo' ? (
                              <Award className="w-4 h-4 mr-1 text-blue-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs">👨‍🌾</div>
                            )}
                            <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]" title={listing.farmerName}>
                              {listing.farmerName}
                            </span>
                          </div>
                          <div className="flex items-center text-amber-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 font-medium text-gray-700">{listing.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && listings.length > 0 && (
                <div className="flex justify-center mt-10">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-md font-medium">1</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
