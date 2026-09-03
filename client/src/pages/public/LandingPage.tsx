import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Truck, Shield, Users, BarChart3, ArrowRight, CheckCircle, Zap, MapPin } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-green-50 to-white pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-12 w-12 text-green-600 mr-3" />
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">KisanDirect</h1>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Farm to Buyer, <span className="text-green-600">Direct & Smart.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              India's first AI-powered agricultural marketplace connecting farmers directly with consumers and bulk buyers. Transparent pricing, smart logistics, zero middlemen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <Link to="/marketplace">
                <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight size={20} />}>
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Sell Your Produce
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Post Bulk Requirement
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Animated Supply Chain Visual */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative">
            <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
              Prototype Simulation
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl w-full md:w-1/4 border border-green-100 relative group">
                <div className="bg-green-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Leaf className="text-green-600 h-8 w-8" />
                </div>
                <h3 className="font-bold text-gray-900">Farmer / FPO</h3>
                <p className="text-xs text-gray-500 mt-1">Lists fresh produce</p>
              </div>
              
              <div className="hidden md:flex flex-1 items-center justify-center relative">
                <div className="h-1 w-full bg-gradient-to-r from-green-300 via-blue-400 to-amber-300 rounded animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-sm text-[10px] font-bold text-blue-600 border border-blue-100 flex items-center">
                  <Zap size={12} className="mr-1" /> AI Matchmaking
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl w-full md:w-1/4 border border-blue-100 relative group z-10 shadow-lg transform md:-translate-y-4">
                <div className="bg-blue-600 text-white p-4 rounded-full mb-3 shadow-md group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="font-extrabold text-gray-900">KisanDirect</h3>
                <p className="text-xs font-medium text-blue-700 mt-1">Smart Engine & Logistics</p>
              </div>
              
              <div className="hidden md:flex flex-1 items-center justify-center relative">
                <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-300 to-amber-300 rounded animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-sm text-[10px] font-bold text-amber-600 border border-amber-100 flex items-center">
                  <Truck size={12} className="mr-1" /> Smart Logistics
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-xl w-full md:w-1/4 border border-amber-100 relative group">
                <div className="bg-amber-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Users className="text-amber-600 h-8 w-8" />
                </div>
                <h3 className="font-bold text-gray-900">Consumer / Bulk Buyer</h3>
                <p className="text-xs text-gray-500 mt-1">Receives fresh goods</p>
              </div>
            </div>
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
              <div className="text-red-500 mb-4 flex justify-center"><Users size={40} /></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Multiple Intermediaries</h3>
              <p className="text-sm text-gray-600">Up to 6 layers between farm and fork, causing delays and waste.</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-orange-500 mb-4 flex justify-center"><TrendingUp className="rotate-180" size={40} /></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Reduced Farmer Realization</h3>
              <p className="text-sm text-gray-600">Farmers receive only 20-30% of what the end consumer pays.</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
              <div className="text-yellow-500 mb-4 flex justify-center"><BarChart3 size={40} /></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fragmented Logistics</h3>
              <p className="text-sm text-gray-600">Inefficient transport leads to post-harvest losses of up to 40%.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-gray-500 mb-4 flex justify-center"><Zap className="rotate-45 opacity-50" size={40} /></div>
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
                <Leaf className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Marketplace</h3>
              <p className="text-gray-600 mb-4">Eliminates middlemen to ensure better prices for both farmers and buyers.</p>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                Prototype Capability: End-to-end purchasing
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">FPO Aggregation</h3>
              <p className="text-gray-600 mb-4">Enables small farmers to pool resources and fulfill bulk demands effectively.</p>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                Prototype Capability: FPO Dashboard
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Demand Intelligence</h3>
              <p className="text-gray-600 mb-4">Predicts demand trends to advise farmers on what and when to harvest.</p>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                Prototype AI Prediction: Yield forecasting
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Truck className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Logistics</h3>
              <p className="text-gray-600 mb-4">Route optimization and shared capacity mapping to reduce transport costs.</p>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                Prototype Simulation: Cost & Route Optimizer
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600 mb-4">Dynamic pricing engine providing real-time market rates and breakdowns.</p>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded border border-blue-100">
                Prototype Simulation: Price Transparency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-gray-200 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-green-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Farmer Lists Produce</h3>
                <p className="text-sm text-gray-600">Farmers or FPOs list their harvest details and expected pricing.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Buyers Discover</h3>
                <p className="text-sm text-gray-600">Consumers and bulk buyers find fresh produce or post requirements.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-amber-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Matchmaking</h3>
                <p className="text-sm text-gray-600">KisanDirect AI connects supply with demand instantly.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-purple-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Optimized Delivery</h3>
                <p className="text-sm text-gray-600">Shared logistics ensure cheap and fast farm-to-door delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-green-900 text-white relative">
        <div className="absolute top-4 right-4 bg-green-800 text-green-200 text-xs font-bold px-3 py-1 rounded border border-green-700">
          Prototype Simulation Data
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">10k+</div>
              <div className="text-lg font-medium text-green-100">Direct Transactions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">500<span className="text-2xl">MT</span></div>
              <div className="text-lg font-medium text-green-100">Produce Traded</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">35%</div>
              <div className="text-lg font-medium text-green-100">Logistics Savings</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2">50+</div>
              <div className="text-lg font-medium text-green-100">FPOs Empowered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to transform agriculture?</h2>
          <p className="text-xl text-gray-600 mb-10">Join KisanDirect today and be part of the future of smart farming and direct trade.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">Register as Farmer</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">Register as Buyer</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
