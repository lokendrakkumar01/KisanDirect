import React from 'react';
import { Target, Lightbulb, Shield, Code, Cpu } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
export const AboutPage = () => {
    return (<PublicLayout>
      <div className="bg-white min-h-screen pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About AgroConnect</h1>
            <p className="text-xl text-gray-600">Empowering Indian agriculture through technology, AI, and transparency.</p>
          </div>

          {/* SIH Context Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-20">
              <Target size={150}/>
            </div>
            <div className="relative z-10">
              <div className="inline-block bg-white/20 px-3 py-1 rounded text-sm font-bold uppercase tracking-widest mb-4">
                Smart India Hackathon 2026
              </div>
              <h2 className="text-2xl font-bold mb-4">Project Context</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                AgroConnect is built as a prototype solution for the Smart India Hackathon 2026. 
                Our mission is to solve the critical inefficiencies in the Indian agricultural supply chain where 
                farmers receive only a fraction of the consumer price due to excessive middlemen, opaque pricing, and fragmented logistics.
              </p>
              <p className="text-blue-100 leading-relaxed">
                This prototype demonstrates the core capabilities of an AI-powered marketplace, smart matchmaking, and transparent logistics integration.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <Lightbulb className="w-10 h-10 text-green-600 mb-4"/>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-700">To create a world where farmers are prosperous business owners with direct market access, and consumers have access to affordable, fresh, and traceable food.</p>
            </div>
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
              <Shield className="w-10 h-10 text-amber-600 mb-4"/>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-700">To deploy cutting-edge AI and logistics optimization to dismantle the traditional mandi system inefficiencies, building trust through absolute transparency.</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Code className="w-6 h-6 text-indigo-500 mr-3 mt-1"/>
                <div>
                  <h4 className="font-bold text-gray-900">Frontend</h4>
                  <p className="text-gray-600 text-sm">React, TypeScript, Tailwind CSS, Recharts for data visualization, and Lucide Icons.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Code className="w-6 h-6 text-green-500 mr-3 mt-1"/>
                <div>
                  <h4 className="font-bold text-gray-900">Backend</h4>
                  <p className="text-gray-600 text-sm">Node.js, Express, TypeScript, RESTful API architecture.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Code className="w-6 h-6 text-blue-500 mr-3 mt-1"/>
                <div>
                  <h4 className="font-bold text-gray-900">Database</h4>
                  <p className="text-gray-600 text-sm">MongoDB for scalable document storage of marketplace listings and user data.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Cpu className="w-6 h-6 text-purple-500 mr-3 mt-1"/>
                <div>
                  <h4 className="font-bold text-gray-900">AI / Algorithms</h4>
                  <p className="text-gray-600 text-sm">Custom Python-based microservices for demand forecasting, price intelligence, and route optimization (Simulated for SIH).</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Impact Goals */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Expected Impact</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">By connecting farm to fork directly with smart systems, we project significant improvements across the ecosystem:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-3xl font-extrabold text-green-600">30%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Increase in Farmer Income</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-600">20%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Drop in Consumer Price</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-purple-600">40%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Reduction in Food Waste</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-amber-600">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Price Transparency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>);
};
