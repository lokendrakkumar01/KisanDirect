import React from 'react';
import { Target, Lightbulb, Shield, Code, Cpu } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export const AboutPage = () => {
    const { c } = useLanguage();

    return (
      <PublicLayout>
        <div className="bg-white min-h-screen pt-12 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {c('About AgroConnect', 'कृषिकनेक्ट के बारे में', 'कृषिकनेक्ट बद्दल')}
              </h1>
              <p className="text-xl text-gray-600">
                {c('Empowering Indian agriculture through technology, AI, and transparency.', 'तकनीक, एआई और पारदर्शिता के माध्यम से भारतीय कृषि को सशक्त बनाना।', 'तंत्रज्ञान, AI आणि पारदर्शकतेद्वारे भारतीय शेतीला सक्षम करणे.')}
              </p>
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
                <h2 className="text-2xl font-bold mb-4">
                  {c('Project Context', 'परियोजना का संदर्भ', 'प्रकल्पाची पार्श्वभूमी')}
                </h2>
                <p className="text-blue-100 leading-relaxed mb-4">
                  {c('AgroConnect is built as a solution for the Smart India Hackathon 2026. Our mission is to solve the critical inefficiencies in the Indian agricultural supply chain.', 'कृषिकनेक्ट स्मार्ट इंडिया हैकाथॉन 2026 के लिए बनाया गया है। हमारा मिशन भारतीय कृषि आपूर्ति श्रृंखला में अकुशलता को दूर करना है।', 'कृषिकनेक्ट हे स्मार्ट इंडिया हॅकाथॉन 2026 साठी विकसित केले आहे. भारतीय शेती पुरवठा साखळीतील त्रुटी दूर करणे हे आमचे ध्येय आहे.')}
                </p>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                <Lightbulb className="w-10 h-10 text-green-600 mb-4"/>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {c('Our Vision', 'हमारा विज़न', 'आमची दृष्टी')}
                </h3>
                <p className="text-gray-700">
                  {c('To create a world where farmers have direct market access, and consumers get fresh produce.', 'एक ऐसी दुनिया बनाना जहाँ किसानों को सीधी बाज़ार पहुँच मिले और उपभोक्ताओं को ताज़ी उपज मिले।', 'शेतकऱ्यांना थेट बाजारपेठ आणि ग्राहकांना ताजी उत्पादने मिळतील असे वातावरण तयार करणे.')}
                </p>
              </div>
              <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                <Shield className="w-10 h-10 text-amber-600 mb-4"/>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {c('Our Mission', 'हमारा मिशन', 'आमचे ध्येय')}
                </h3>
                <p className="text-gray-700">
                  {c('To deploy AI and smart logistics optimization to build absolute trust.', 'पूर्ण विश्वास बनाने के लिए एआई और स्मार्ट लॉजिस्टिक्स का उपयोग करना।', 'पूर्ण पारदर्शकता निर्माण करण्यासाठी AI आणि लॉजिस्टिक तंत्रज्ञान वापरणे.')}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
                {c('Technology Stack', 'तकनीकी स्टैक', 'तंत्रज्ञान स्टॅक')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Code className="w-6 h-6 text-indigo-500 mr-3 mt-1"/>
                  <div>
                    <h4 className="font-bold text-gray-900">Frontend</h4>
                    <p className="text-gray-600 text-sm">React, Tailwind CSS, Recharts & Lucide Icons.</p>
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
