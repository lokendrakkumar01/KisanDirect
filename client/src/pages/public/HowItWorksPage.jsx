import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, Zap, Truck, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const HowItWorksPage = () => {
    const { c } = useLanguage();

    return (
      <PublicLayout>
        <div className="bg-white min-h-screen">
          {/* Header */}
          <section className="bg-green-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                {c('How AgroConnect Works', 'कृषिकनेक्ट कैसे काम करता है', 'कृषिकनेक्ट कसे काम करते')}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {c('We leverage AI and smart logistics to create a direct, transparent bridge between farmers and buyers, eliminating inefficiencies.', 'हम किसानों और खरीदारों के बीच एक सीधा, पारदर्शी पुल बनाने के लिए एआई और स्मार्ट लॉजिस्टिक्स का लाभ उठाते हैं।', 'आम्ही शेतकरी आणि खरेदीदार यांच्यात थेट, पारदर्शक पूल तयार करण्यासाठी AI आणि स्मार्ट लॉजिस्टिकचा वापर करतो.')}
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {c('1. List or Request Produce', '1. उपज सूचीबद्ध करें या अनुरोध करें', '1. पिके सूचीबद्ध करा किंवा मागणी करा')}
                    </h3>
                    <p className="text-gray-600">
                      {c('Farmers and FPOs list their harvest with expected quantities and prices. Consumers and bulk buyers can browse these listings or post custom bulk requirements.', 'किसान और एफपीओ अपनी उपज की अपेक्षित मात्रा और मूल्य सूचीबद्ध करते हैं। उपभोक्ता और थोक खरीदार इन सूचियों को देख सकते हैं या थोक आवश्यकताएं पोस्ट कर सकते हैं।', 'शेतकरी आणि एफपीओ त्यांच्या पिकांची यादी तयार करतात. ग्राहक आणि घाऊक खरेदीदार या याद्या पाहू शकतात किंवा घाऊक मागण्या पोस्ट करू शकतात.')}
                    </p>
                  </div>
                  <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Leaf className="text-white w-8 h-8"/>
                    </div>
                  </div>
                  <div className="md:w-5/12 order-3 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hidden md:block text-sm text-gray-500">
                    <strong className="text-gray-900 block mb-1">{c('Feature:', 'सुविधा:', 'वैशिष्ट्य:')}</strong> {c('Real-time crop inventory tracking and FPO aggregation dashboards.', 'वास्तविक समय में फसल सूची ट्रैकिंग और एफपीओ एकत्रीकरण डैशबोर्ड।', 'रिअल-टाइम पीक इन्व्हेंटरी ट्रॅकिंग आणि FPO संकलन डॅशबोर्ड.')}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                  <div className="md:w-5/12 order-3 md:order-1 bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm hidden md:block text-sm text-gray-500 text-right">
                    <strong className="text-gray-900 block mb-1">{c('AI Matching:', 'एआई मिलान:', 'AI जुळणी:')}</strong> {c('Engine that suggests fair pricing based on micro-market demand data.', 'माइक्रो-मार्केट मांग डेटा के आधार पर उचित मूल्य का सुझाव देने वाला इंजन।', 'मायक्रो-मार्केट मागणी डेटावर आधारित रास्त दराची शिफारस करणारे इंजिन.')}
                  </div>
                  <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Zap className="text-white w-8 h-8"/>
                    </div>
                  </div>
                  <div className="md:w-5/12 text-center md:text-left order-2 md:order-3 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {c('2. AI-Powered Matchmaking', '2. एआई-संचालित मिलान', '2. AI-आधारित जुळणी')}
                    </h3>
                    <p className="text-gray-600">
                      {c('Our engine instantly matches bulk requirements with the best farmer combinations based on distance, quality grade, and real-time market pricing.', 'हमारा इंजन दूरी, गुणवत्ता ग्रेड और वास्तविक समय के बाजार मूल्य निर्धारण के आधार पर किसान संयोजनों के साथ थोक आवश्यकताओं का तुरंत मिलान करता है।', 'आमचे इंजिन अंतर, गुणवत्ता श्रेणी आणि बाजार दरावर आधारित शेतकऱ्यांशी घाऊक मागण्यांची त्वरित जुळणी करते.')}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10">
                  <div className="md:w-5/12 text-center md:text-right order-2 md:order-1 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {c('3. Transparent Transactions', '3. पारदर्शी लेनदेन', '3. पारदर्शक व्यवहार')}
                    </h3>
                    <p className="text-gray-600">
                      {c('Both parties agree on a transparent price. Buyers see exactly how much goes to the farmer and how much logistics cost. Payments are secure.', 'दोनों पक्ष पारदर्शी कीमत पर सहमत होते हैं। खरीदार देखते हैं कि कितना हिस्सा किसान को जाता है और कितना परिवहन लागत है।', 'दोन्ही पक्ष पारदर्शक दरावर सहमत होतात. खरेदीदारांना शेतकरी आणि वाहतूक खर्च स्पष्ट दिसतो.')}
                    </p>
                  </div>
                  <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Users className="text-white w-8 h-8"/>
                    </div>
                  </div>
                  <div className="md:w-5/12 order-3 bg-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm hidden md:block text-sm text-gray-500">
                    <strong className="text-gray-900 block mb-1">{c('Transparency:', 'पारदर्शिता:', 'पारदर्शकता:')}</strong> {c('Transparent checkout showing farmer realization vs logistics cost.', 'किसान आय बनाम परिवहन लागत दिखाने वाला पारदर्शी चेकआउट।', 'शेतकरी उत्पन्न आणि वाहतूक खर्च दाखवणारा पारदर्शक चेकआउट.')}
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                  <div className="md:w-5/12 order-3 md:order-1 bg-purple-50 rounded-xl p-6 border border-purple-100 shadow-sm hidden md:block text-sm text-gray-500 text-right">
                    <strong className="text-gray-900 block mb-1">{c('Routing:', 'मार्ग निर्धारण:', 'मार्ग नियोजन:')}</strong> {c('Dynamic routing algorithm for shared transport.', 'साझा परिवहन के लिए गतिशील मार्ग निर्धारण एल्गोरिदम।', 'सामायिक वाहतुकीसाठी डायनॅमिक मार्ग नियोजन अलगोरिदम.')}
                  </div>
                  <div className="md:w-2/12 flex justify-center order-1 md:order-2">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Truck className="text-white w-8 h-8"/>
                    </div>
                  </div>
                  <div className="md:w-5/12 text-center md:text-left order-2 md:order-3 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {c('4. Smart Logistics', '4. स्मार्ट लॉजिस्टिक्स', '4. स्मार्ट लॉजिस्टिक')}
                    </h3>
                    <p className="text-gray-600">
                      {c('Our logistics module maps the most efficient routes and combines multiple small orders onto a single vehicle, drastically reducing transport costs.', 'हमारा लॉजिस्टिक्स मॉड्यूल सबसे कुशल मार्गों का नक्शा बनाता है और परिवहन लागत को कम करता है।', 'आमचे लॉजिस्टिक मॉडेल अत्यंत कार्यक्षम मार्गांचे नियोजन करते आणि वाहतूक खर्च कमी करते.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-16">
                {c('The AgroConnect Advantage', 'कृषिकनेक्ट के लाभ', 'कृषिकनेक्टचे फायदे')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center">
                    <Leaf className="mr-2"/> {c('For Farmers & FPOs', 'किसानों और एफपीओ के लिए', 'शेतकरी आणि एफपीओ साठी')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0"/> <span>{c('Higher profit margins by eliminating middlemen.', 'बिचौलियों को हटाकर अधिक लाभ मार्जिन।', 'मध्यस्थांना हटवून अधिक नफा.')}</span></li>
                    <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0"/> <span>{c('AI-based planting advice indicating demand.', 'मांग दर्शाने वाली एआई-आधारित सलाह।', 'मागणी दर्शवणारा AI-आधारित सल्ला.')}</span></li>
                    <li className="flex"><CheckCircle className="text-green-500 mr-3 flex-shrink-0"/> <span>{c('Hassle-free transport pickup directly from farm.', 'खेत से सीधे सुगम परिवहन पिकअप।', 'शेतातून थेट सुलभ वाहतूक पिकअप.')}</span></li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center">
                    <Users className="mr-2"/> {c('For Consumers & Businesses', 'उपभोक्ताओं और व्यवसायों के लिए', 'ग्राहक आणि व्यवसायांसाठी')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0"/> <span>{c('Fresher produce delivered faster directly from farms.', 'खेतों से सीधे तेजी से डिलीवर होने वाली ताज़ी उपज।', 'शेतातून थेट वेगाने मिळणारा ताजा माल.')}</span></li>
                    <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0"/> <span>{c('Lower overall costs compared to traditional markets.', 'पारंपरिक बाजारों की तुलना में कम लागत।', 'पारंपारिक बाजारांपेक्षा कमी खर्च.')}</span></li>
                    <li className="flex"><CheckCircle className="text-blue-500 mr-3 flex-shrink-0"/> <span>{c('Complete traceability and transparent pricing models.', 'पूर्ण पता लगाने की क्षमता और पारदर्शी मूल्य निर्धारण।', 'पूर्ण पारदर्शकता आणि स्पष्ट दर प्रणाली.')}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 text-center">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {c('Experience the platform', 'मंच का अनुभव करें', 'प्लॅटफॉर्मचा अनुभव घ्या')}
              </h2>
              <Link to="/register">
                <Button size="lg">{c('Create Free Account', 'मुफ्त खाता बनाएं', 'मोफत खाते तयार करा')}</Button>
              </Link>
            </div>
          </section>
        </div>
      </PublicLayout>
    );
};
