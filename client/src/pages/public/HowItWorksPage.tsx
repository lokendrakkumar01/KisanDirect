import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, Zap, Truck, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';

export const HowItWorksPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-green-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">How KisanDirect Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage AI and smart logistics to create a direct, transparent bridge between farmers and buyers, eliminating inefficiencies.
            </p>
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-100 z-0"></div>

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                <div className="md:w-5/12 text-center md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">1. List or Request Produce</h3>
                  <p className="text-gray-600">Farmers and FPOs list their harvest with expected quantities and prices. Consumers and bulk buyers can browse these listings or post custom bulk requirements.</p>
                </div>
                <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Leaf className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="md:w-5/12 order-3 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hidden md:block text-sm text-gray-500">
                  <strong className="text-gray-900 block mb-1">Prototype Feature:</strong> Real-time crop inventory tracking and FPO aggregation dashboards.
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                <div className="md:w-5/12 order-3 md:order-1 bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm hidden md:block text-sm text-gray-500 text-right">
                  <strong className="text-gray-900 block mb-1">Prototype AI Simulator:</strong> Engine that suggests fair pricing based on micro-market demand data.
                </div>
                <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Zap className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="md:w-5/12 text-center md:text-left order-2 md:order-3 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">2. AI-Powered Matchmaking</h3>
                  <p className="text-gray-600">Our engine instantly matches bulk requirements with the best farmer combinations based on distance, quality grade, and real-time market pricing.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                <div className="md:w-5/12 text-center md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">3. Transparent Transactions</h3>
                  <p className="text-gray-600">Both parties agree on a transparent price. Buyers see exactly how much goes to the farmer and how much logistics cost. Payments are secure.</p>
                </div>
                <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Users className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="md:w-5/12 order-3 bg-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm hidden md:block text-sm text-gray-500">
                  <strong className="text-gray-900 block mb-1">Prototype Simulation:</strong> Transparent checkout showing farmer realization vs logistics cost.
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-5/12 order-3 md:order-1 bg-purple-50 rounded-xl p-6 border border-purple-100 shadow-sm hidden md:block text-sm text-gray-500 text-right">
                  <strong className="text-gray-900 block mb-1">Prototype Capability:</strong> Mocked dynamic routing algorithm for shared transport.
                </div>
                <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Truck className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="md:w-5/12 text-center md:text-left order-2 md:order-3 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">4. Smart Logistics</h3>
                  <p className="text-gray-600">Our logistics module maps the most efficient routes and combines multiple small orders onto a single vehicle, drastically reducing transport costs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">The KisanDirect Advantage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center"><Leaf className="mr-2" /> For Farmers & FPOs</h3>
                <ul className="space-y-4">
                  <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0" /> <span>Higher profit margins by eliminating up to 5 layers of middlemen.</span></li>
                  <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0" /> <span>AI-based planting advice indicating what crops will be in demand.</span></li>
                  <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0" /> <span>Hassle-free transport pickup directly from the farm gate.</span></li>
                </ul>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center"><Users className="mr-2" /> For Consumers & Businesses</h3>
                <ul className="space-y-4">
                  <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0" /> <span>Fresher produce delivered faster (often within 24 hours of harvest).</span></li>
                  <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0" /> <span>Lower overall costs compared to traditional wholesale markets.</span></li>
                  <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0" /> <span>Complete traceability and transparent pricing models.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience the platform</h2>
            <Link to="/register">
              <Button size="lg">Create Free Account</Button>
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
