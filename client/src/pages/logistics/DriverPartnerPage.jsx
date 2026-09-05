import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { 
  Truck, MapPin, Navigation, Phone, CheckCircle2, Clock, 
  DollarSign, ShieldAlert, Award, FileCheck, ArrowRight, 
  RotateCw, Play, CheckCircle, Star, User, Camera, Lock
} from 'lucide-react';
import { RouteMap } from '../../components/map/RouteMap';
import { useLanguage } from '../../contexts/LanguageContext';

const INITIAL_TRIPS = [
  {
    id: 'DEL-8801',
    crop: 'Red Tomatoes 🍅',
    quantity: '600 KG',
    pickup: 'Ramesh Patil Farm, Pimpalgaon, Nashik',
    pickupPhone: '+91 98234 11223',
    pickupCoords: [20.1667, 73.9833],
    drop: 'Pune Fresh Restaurant, FC Road, Pune',
    dropPhone: '+91 98900 55443',
    dropCoords: [18.5204, 73.8567],
    distance: '185 KM',
    payout: 2200,
    fuelBonus: 350,
    status: 'assigned', // assigned -> picked_up -> in_transit -> arrived -> delivered
    otp: '4829',
    deliveryTime: 'Today, 4:30 PM',
  },
  {
    id: 'DEL-8802',
    crop: 'Nashik Onions 🧅',
    quantity: '1,200 KG',
    pickup: 'Nashik Farmers FPO Hub, Sinnar',
    pickupPhone: '+91 97654 33221',
    pickupCoords: [19.8450, 73.9900],
    drop: 'Mumbai Central Vegetable Mandi, Dadar',
    dropPhone: '+91 98211 44332',
    dropCoords: [19.0178, 72.8478],
    distance: '172 KM',
    payout: 3100,
    fuelBonus: 400,
    status: 'picked_up',
    otp: '9102',
    deliveryTime: 'Today, 7:00 PM',
  },
];

const COMPLETED_TRIPS = [
  { id: 'DEL-8750', crop: 'Seedless Grapes 🍇', quantity: '800 KG', date: 'Yesterday', payout: 2600, status: 'delivered', rating: 5.0 },
  { id: 'DEL-8742', crop: 'Organic Potatoes 🥔', quantity: '1,500 KG', date: '03 Sep 2026', payout: 3800, status: 'delivered', rating: 4.9 },
  { id: 'DEL-8711', crop: 'Sharbati Wheat 🌾', quantity: '2,000 KG', date: '01 Sep 2026', payout: 4200, status: 'delivered', rating: 5.0 },
];

export default function DriverPartnerPage() {
  const { c } = useLanguage();
  const [driverStatus, setDriverStatus] = useState('online'); // online | busy | offline
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [activeTrip, setActiveTrip] = useState(INITIAL_TRIPS[0]);
  const [activeTab, setActiveTab] = useState('active_trips'); // active_trips | route_nav | earnings | support
  
  // Verification Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [selectedTripForDelivery, setSelectedTripForDelivery] = useState(null);
  
  // Toast Alert
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateStatus = (tripId, newStatus) => {
    if (newStatus === 'delivered') {
      const trip = trips.find(t => t.id === tripId);
      setSelectedTripForDelivery(trip);
      setOtpInput('');
      setOtpError('');
      setIsOtpModalOpen(true);
      return;
    }

    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const updated = { ...t, status: newStatus };
        if (activeTrip?.id === tripId) setActiveTrip(updated);
        return updated;
      }
      return t;
    }));

    const statusLabels = {
      picked_up: c('🚚 Produce Picked Up from Farm! Route navigation started.', '🚚 खेत से उपज लोड की गई! रूट नेविगेशन शुरू।', '🚚 शेतातून शेतमाल लोड केला! मार्ग नेव्हिगेशन सुरू.'),
      in_transit: c('🛣️ Truck is now In-Transit on Expressway.', '🛣️ ट्रक एक्सप्रेसवे पर रास्ते में है।', '🛣️ ट्रक महामार्गावर प्रवासात आहे.'),
      arrived: c('📍 Arrived at Buyer Destination Mandi.', '📍 गंतव्य मंडी में पहुंच गए।', '📍 गंतव्य मंडीत पोहोचलो.'),
    };

    showToast(statusLabels[newStatus] || `Trip ${tripId} status updated to ${newStatus}`);
  };

  const handleVerifyOtpAndDeliver = (e) => {
    e.preventDefault();
    if (!selectedTripForDelivery) return;

    if (otpInput.trim() !== selectedTripForDelivery.otp) {
      setOtpError(c(`Invalid OTP! Verification code is ${selectedTripForDelivery.otp}`, `अमान्य ओटीपी! सत्यापन कोड ${selectedTripForDelivery.otp} है`, `अवैध ओटीपी! पडताळणी कोड ${selectedTripForDelivery.otp} आहे`));
      return;
    }

    // Success OTP verify
    setTrips(prev => prev.map(t => {
      if (t.id === selectedTripForDelivery.id) {
        const updated = { ...t, status: 'delivered' };
        if (activeTrip?.id === selectedTripForDelivery.id) setActiveTrip(updated);
        return updated;
      }
      return t;
    }));

    setIsOtpModalOpen(false);
    showToast(c(`🎉 Delivery ${selectedTripForDelivery.id} Completed! ₹${selectedTripForDelivery.payout + selectedTripForDelivery.fuelBonus} credited to Driver Wallet.`, `🎉 डिलीवरी ${selectedTripForDelivery.id} पूर्ण! ₹${selectedTripForDelivery.payout + selectedTripForDelivery.fuelBonus} चालक वॉलेट में जमा हुए।`, `🎉 डिलिव्हरी ${selectedTripForDelivery.id} पूर्ण! ₹${selectedTripForDelivery.payout + selectedTripForDelivery.fuelBonus} ड्रायव्हर वॉलेटमध्ये जमा.`));
  };

  const totalEarningsToday = COMPLETED_TRIPS.reduce((acc, curr) => acc + curr.payout, 0) + 5300;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Driver Header Banner & Live Status Toggle */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 dark:from-emerald-950 dark:to-green-950 text-white rounded-2xl p-6 shadow-md border border-emerald-600/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 flex items-center justify-center text-white font-extrabold text-xl shadow-inner">
              <User className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{c('Driver Partner Portal', 'चालक पार्टनर पोर्टल', 'ड्रायव्हर पार्टनर पोर्टल')}</h1>
                <Badge variant="success" className="bg-emerald-400/20 text-emerald-200 border-emerald-300/30 font-bold">
                  {c('Verified Driver Partner', 'सत्यापित चालक पार्टनर', 'सत्यापित ड्रायव्हर पार्टनर')}
                </Badge>
              </div>
              <p className="text-emerald-100 text-xs mt-1">
                {c('Driver:', 'चालक:', 'ड्रायव्हर:')} <span className="font-bold text-white">Rajesh Kumar</span> | {c('Vehicle:', 'वाहन:', 'वाहन:')} <span className="font-bold text-white">Tata 407 (MH 15 AB 1234)</span>
              </p>
            </div>
          </div>

          {/* Duty Status Switcher */}
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md p-2 rounded-xl border border-white/10">
            <span className="text-xs font-bold text-emerald-100 px-2">{c('Duty Status:', 'ड्यूटी स्थिति:', 'ड्यूटी स्थिती:')}</span>
            <button
              onClick={() => setDriverStatus('online')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                driverStatus === 'online' 
                  ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-300' 
                  : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              {c('🟢 Online (Ready)', '🟢 ऑनलाइन (तैयार)', '🟢 ऑनलाइन (तयार)')}
            </button>
            <button
              onClick={() => setDriverStatus('busy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                driverStatus === 'busy' 
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300' 
                  : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              {c('🟡 On Delivery', '🟡 डिलीवरी पर', '🟡 डिलिव्हरीवर')}
            </button>
            <button
              onClick={() => setDriverStatus('offline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                driverStatus === 'offline' 
                  ? 'bg-red-500 text-white shadow-sm ring-2 ring-red-300' 
                  : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              {c('🔴 Off Duty', '🔴 ऑफ ड्यूटी', '🔴 ऑफ ड्यूटी')}
            </button>
          </div>

        </div>
      </div>

      {/* Toast Notification Alert */}
      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-400 flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-200 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* Driver Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title={c('Active Assigned Trips', 'सक्रिय असाइन ट्रिप्स', 'सक्रिय सोपवलेल्या ट्रिप्स')} 
          value={trips.filter(t => t.status !== 'delivered').length} 
          icon={<Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />} 
        />
        <StatCard 
          title={c("Today's Total Earnings", 'आज की कुल कमाई', 'आजचे एकूण उत्पन्न')} 
          value={`₹${totalEarningsToday.toLocaleString('en-IN')}`} 
          icon={<DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />} 
        />
        <StatCard 
          title={c('Driver Rating', 'चालक रेटिंग', 'ड्रायव्हर रेटिंग')} 
          value="⭐ 4.9 / 5.0" 
          icon={<Star className="w-6 h-6 text-amber-500 fill-amber-400" />} 
        />
        <StatCard 
          title={c('Total Trips Completed', 'कुल पूर्ण ट्रिप्स', 'एकूण पूर्ण ट्रिप्स')} 
          value={c('127 Trips', '127 ट्रिप्स', '127 ट्रिप्स')} 
          icon={<Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-emerald-800/80 space-x-4">
        <button
          onClick={() => setActiveTab('active_trips')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'active_trips' 
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-200' 
              : 'border-transparent text-gray-500 dark:text-emerald-400 hover:text-gray-800'
          }`}
        >
          {c('🚚 Active Trips & Deliveries', '🚚 सक्रिय ट्रिप्स और डिलीवरी', '🚚 सक्रिय ट्रिप आणि डिलिव्हरी')} ({trips.filter(t => t.status !== 'delivered').length})
        </button>
        <button
          onClick={() => setActiveTab('route_nav')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'route_nav' 
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-200' 
              : 'border-transparent text-gray-500 dark:text-emerald-400 hover:text-gray-800'
          }`}
        >
          {c('🗺️ GPS Route Navigation', '🗺️ जीपीएस रूट नेविगेशन', '🗺️ जीपीएस मार्ग नेव्हिगेशन')}
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'earnings' 
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-200' 
              : 'border-transparent text-gray-500 dark:text-emerald-400 hover:text-gray-800'
          }`}
        >
          {c('💰 Driver Earnings & History', '💰 चालक कमाई और इतिहास', '💰 ड्रायव्हरची कमाई आणि इतिहास')}
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`pb-3 text-sm font-bold transition border-b-2 ${
            activeTab === 'support' 
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-200' 
              : 'border-transparent text-gray-500 dark:text-emerald-400 hover:text-gray-800'
          }`}
        >
          {c('🆘 Highway Support & Mandi Pass', '🆘 राजमार्ग सहायता और मंडी पास', '🆘 महामार्ग मदत आणि मंडी पास')}
        </button>
      </div>

      {/* TAB 1: Active Trips & Workflow */}
      {activeTab === 'active_trips' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trip Cards Column */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-emerald-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" /> {c('Assigned Pickup Tasks', 'सौंपे गए पिकअप कार्य', 'सोपवलेले पिकअप कामे')}
            </h2>

            {trips.length === 0 ? (
              <Card><CardBody className="text-center py-8 text-gray-500">{c('No trips currently assigned.', 'वर्तमान में कोई ट्रिप असाइन नहीं है।', 'सध्या कोणतीही ट्रिप सोपवलेली नाही.')}</CardBody></Card>
            ) : (
              trips.map(trip => (
                <div 
                  key={trip.id}
                  onClick={() => setActiveTrip(trip)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    activeTrip?.id === trip.id 
                      ? 'bg-emerald-50/90 dark:bg-emerald-900/50 border-emerald-500 shadow-md ring-2 ring-emerald-400/40' 
                      : 'bg-white dark:bg-emerald-950/70 border-gray-200 dark:border-emerald-800/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/90 px-2 py-0.5 rounded">
                        {trip.id}
                      </span>
                      <h3 className="font-extrabold text-base text-gray-900 dark:text-white mt-1">{trip.crop}</h3>
                    </div>
                    <Badge variant={trip.status === 'delivered' ? 'success' : 'warning'}>
                      {trip.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-emerald-300 font-semibold mb-3">
                    {c('Quantity:', 'मात्रा:', 'प्रमाण:')} {trip.quantity} | {c('Distance:', 'दूरी:', 'अंतर:')} {trip.distance}
                  </p>

                  <div className="space-y-1.5 text-xs text-gray-700 dark:text-emerald-200 border-t border-gray-100 dark:border-emerald-800/60 pt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate"><strong>{c('From:', 'सेंडर:', 'पाठवणारा:')}</strong> {trip.pickup}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate"><strong>{c('To:', 'डिलीवरी स्थान:', 'डिलिव्हरी ठिकाण:')}</strong> {trip.drop}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center bg-gray-50 dark:bg-emerald-900/40 p-2 rounded-xl">
                    <span className="text-xs font-bold text-gray-700 dark:text-emerald-200">{c('Driver Payout:', 'चालक भुगतान:', 'ड्रायव्हरचे पेमेंट:')}</span>
                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">₹{trip.payout + trip.fuelBonus}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Active Trip Workflow Action Center */}
          <div className="lg:col-span-2 space-y-6">
            {activeTrip ? (
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader className="bg-emerald-50/60 dark:bg-emerald-900/30 flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl font-black">
                      <span>{c('Task Workflow for', 'कार्य प्रवाह:', 'कामकाज प्रवाह:')} {activeTrip.id}</span>
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">({activeTrip.crop})</span>
                    </CardTitle>
                    <p className="text-xs text-gray-500 dark:text-emerald-400">{c('Follow steps from farm pickup to mandi delivery', 'खेत पिकअप से मंडी डिलीवरी तक चरणों का पालन करें', 'शेतातील पिकअपपासून मंडी डिलिव्हरीपर्यंत पायऱ्यांचे अनुसरण करा')}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab('route_nav')} className="text-xs font-bold">
                    {c('🗺️ Open Route Map', '🗺️ रूट मैप खोलें', '🗺️ मार्ग नकाशा उघडा')}
                  </Button>
                </CardHeader>

                <CardBody className="space-y-6">
                  
                  {/* Step Progress Tracker */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                    <div className={`p-2 rounded-xl border ${
                      activeTrip.status === 'assigned' 
                        ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400' 
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}>
                      {c('1. Assigned 📋', '1. असाइन हुआ 📋', '1. सोपवले 📋')}
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      activeTrip.status === 'picked_up' 
                        ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400' 
                        : (['in_transit', 'arrived', 'delivered'].includes(activeTrip.status) ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-gray-100 text-gray-400')
                    }`}>
                      {c('2. Picked Up 🌾', '2. पिकअप पूर्ण 🌾', '2. पिकअप पूर्ण 🌾')}
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      activeTrip.status === 'in_transit' || activeTrip.status === 'arrived'
                        ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400' 
                        : (activeTrip.status === 'delivered' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-gray-100 text-gray-400')
                    }`}>
                      {c('3. In Transit 🚚', '3. रास्ते में 🚚', '3. रस्त्यावर 🚚')}
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      activeTrip.status === 'delivered'
                        ? 'bg-emerald-500 text-white font-extrabold shadow-sm' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {c('4. Delivered ✅', '4. डिलीवरी सफल ✅', '4. डिलिव्हरी झाली ✅')}
                    </div>
                  </div>

                  {/* Farm Pickup Section */}
                  <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/80 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>{c('Pickup:', 'पिकअप स्थान:', 'पिकअप ठिकाण:')} {activeTrip.pickup}</span>
                      </div>
                      <a href={`tel:${activeTrip.pickupPhone}`} className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-700">
                        <Phone className="w-3.5 h-3.5" /> {c('Call Farmer', 'किसान को कॉल करें', 'शेतकऱ्याला कॉल करा')}
                      </a>
                    </div>

                    {activeTrip.status === 'assigned' && (
                      <Button 
                        onClick={() => handleUpdateStatus(activeTrip.id, 'picked_up')}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 font-bold text-sm py-2.5 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> {c('Confirm Farm Pickup Complete & Load Truck', 'खेत पिकअप पूरा करें और ट्रक लोड करें', 'शेतातून माल भरल्याची पुष्टी करा')}
                      </Button>
                    )}
                  </div>

                  {/* Mandi Drop Destination Section */}
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/80 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-950 dark:text-amber-200">
                        <Navigation className="w-4 h-4 text-red-500" />
                        <span>{c('Destination:', 'गंतव्य स्थान:', 'गंतव्य ठिकाण:')} {activeTrip.drop}</span>
                      </div>
                      <a href={`tel:${activeTrip.dropPhone}`} className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-amber-700">
                        <Phone className="w-3.5 h-3.5" /> {c('Call Buyer', 'खरीदार को कॉल करें', 'खरेदीदाराला कॉल करा')}
                      </a>
                    </div>

                    {activeTrip.status === 'picked_up' && (
                      <Button 
                        onClick={() => handleUpdateStatus(activeTrip.id, 'in_transit')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 flex items-center justify-center gap-2"
                      >
                        <Truck className="w-4 h-4" /> {c('Start In-Transit Highway Route 🛣️', 'हाइवे रूट शुरू करें 🛣️', 'महामार्ग प्रवास सुरू करा 🛣️')}
                      </Button>
                    )}

                    {activeTrip.status === 'in_transit' && (
                      <Button 
                        onClick={() => handleUpdateStatus(activeTrip.id, 'arrived')}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-2.5 flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-4 h-4" /> {c('Mark Arrived at Destination Mandi', 'मंडी पहुँचने की पुष्टि करें', 'मंडीत पोहोचल्याची पुष्टी करा')}
                      </Button>
                    )}

                    {(activeTrip.status === 'arrived' || activeTrip.status === 'in_transit') && (
                      <Button 
                        onClick={() => handleUpdateStatus(activeTrip.id, 'delivered')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 flex items-center justify-center gap-2 shadow-md"
                      >
                        <Lock className="w-4 h-4" /> {c('Complete Delivery & Verify Buyer OTP', 'डिलीवरी पूरी करें और खरीदार ओटीपी दर्ज करें', 'डिलिव्हरी पूर्ण करा आणि ओटीपी टाका')} ({activeTrip.otp})
                      </Button>
                    )}

                    {activeTrip.status === 'delivered' && (
                      <div className="bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 text-emerald-900 dark:text-emerald-100 p-3 rounded-xl text-center font-extrabold text-sm flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>{c('Delivery Verified & Completed! Payout Credited.', 'डिलीवरी सत्यापित और पूर्ण! राशि जमा की गई।', 'डिलिव्हरी पूर्ण झाली! रक्कम जमा केली.')}</span>
                      </div>
                    )}
                  </div>

                  {/* Payment Breakdown Card */}
                  <div className="bg-gray-50 dark:bg-emerald-900/40 p-4 rounded-xl border border-gray-200 dark:border-emerald-800/80 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-gray-500 dark:text-emerald-300">{c('Driver Remuneration Breakdown', 'चालक पारिश्रमिक विवरण', 'ड्रायव्हर मोबदला तपशील')}</span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{c('Freight Charge:', 'भाड़ा शुल्क:', 'वाहतूक भाडे:')} ₹{activeTrip.payout} + {c('Diesel Allowance:', 'डीजल भत्ता:', 'डिझेल भत्ता:')} ₹{activeTrip.fuelBonus}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-500 dark:text-emerald-300">{c('Total Credit', 'कुल जमा राशि', 'एकूण जमा रक्कम')}</span>
                      <p className="text-xl font-black text-emerald-700 dark:text-emerald-300">₹{activeTrip.payout + activeTrip.fuelBonus}</p>
                    </div>
                  </div>

                </CardBody>
              </Card>
            ) : (
              <Card><CardBody className="text-center py-12 text-gray-500">{c('Select a trip from the left list to view workflow.', 'कार्यप्रवाह देखने के लिए बाईं सूची से एक ट्रिप चुनें।', 'कामकाज पाहण्यासाठी डाव्या यादीतून ट्रिप निवडा.')}</CardBody></Card>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: Turn-by-Turn Route Navigation Map */}
      {activeTab === 'route_nav' && (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span>{c('🗺️ Live Highway Route & Turn-by-Turn Directions', '🗺️ लाइव हाइवे रूट और दिशा-निर्देश', '🗺️ लाइव्ह महामार्ग मार्ग आणि दिशानिर्देश')}</span>
              </CardTitle>
              <p className="text-xs text-gray-500 dark:text-emerald-300">
                {c('Route:', 'मार्ग:', 'मार्ग:')} {activeTrip?.pickup} &rarr; {activeTrip?.drop} ({activeTrip?.distance})
              </p>
            </div>
            <Badge variant="success" className="px-3 py-1 text-xs">
              {c('Fastest Highway Route (NH 60)', 'सबसे तेज़ हाइवे मार्ग (NH 60)', 'सर्वात वेगवान महामार्ग (NH 60)')}
            </Badge>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-emerald-800 shadow-inner">
              <RouteMap 
                origin={activeTrip?.pickupCoords || [20.1667, 73.9833]}
                destination={activeTrip?.dropCoords || [18.5204, 73.8567]}
                waypoints={[
                  { name: 'Pickup: ' + activeTrip?.pickup, coords: activeTrip?.pickupCoords || [20.1667, 73.9833] },
                  { name: 'Drop: ' + activeTrip?.drop, coords: activeTrip?.dropCoords || [18.5204, 73.8567] }
                ]}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-gray-500 dark:text-emerald-300">{c('Estimated Travel Time', 'अनुमानित यात्रा समय', 'अंदाजे वेळ')}</span>
                <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">{c('3 hrs 45 mins', '3 घंटे 45 मिनट', '3 तास 45 मिनिटे')}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="text-xs font-bold text-gray-500 dark:text-emerald-300">{c('Toll Expenses (Reimbursed)', 'टोल खर्च (प्रतिपूर्ति)', 'टोल खर्च')}</span>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">₹240 ({c('FASTag Auto-Pay', 'फास्टैग ऑटो-पे', 'फास्टॅग ऑटो-पे')})</p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="text-xs font-bold text-gray-500 dark:text-emerald-300">{c('Fuel Distance Savings', 'ईंधन दूरी की बचत', 'इंधन अंतर बचत')}</span>
                <p className="text-lg font-bold text-amber-900 dark:text-amber-100">18 KM ({c('AI Optimized', 'एआई अनुकूलित', 'एआय अनुकूलित')})</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* TAB 3: Driver Earnings & Trip History */}
      {activeTab === 'earnings' && (
        <Card>
          <CardHeader>
            <CardTitle>{c('💰 Driver Partner Wallet & Completed Trips History', '💰 चालक वॉलेट और पूर्ण ट्रिप इतिहास', '💰 ड्रायव्हर वॉलेट आणि पूर्ण ट्रिप इतिहास')}</CardTitle>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-emerald-900/50 border-b border-gray-200 dark:border-emerald-800">
                  <tr>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200">{c('Trip ID', 'ट्रिप आईडी', 'ट्रिप आयडी')}</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200">{c('Crop Traded', 'फसल', 'पीक')}</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200">{c('Date', 'दिनांक', 'दिनांक')}</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200">{c('Driver Rating', 'रेटिंग', 'रेटिंग')}</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200">{c('Payout Amount', 'भुगतान राशि', 'पेमेंट रक्कम')}</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-emerald-200 text-right">{c('Status', 'स्थिति', 'स्थिती')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-emerald-900/40">
                  {COMPLETED_TRIPS.map((t, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30">
                      <td className="p-3 font-bold text-emerald-800 dark:text-emerald-300">{t.id}</td>
                      <td className="p-3 font-semibold text-gray-900 dark:text-white">{t.crop} ({t.quantity})</td>
                      <td className="p-3 text-gray-600 dark:text-emerald-300 text-xs font-semibold">{t.date}</td>
                      <td className="p-3 text-amber-600 font-bold">⭐ {t.rating}</td>
                      <td className="p-3 font-black text-emerald-700 dark:text-emerald-300">₹{t.payout}</td>
                      <td className="p-3 text-right">
                        <Badge variant="success" className="px-2.5 py-0.5 text-[10px]">
                          {c('PAID TO BANK ✅', 'बैंक में जमा ✅', 'बँकेत जमा ✅')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* TAB 4: Highway Support & Mandi Pass */}
      {activeTab === 'support' && (
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50/60 dark:bg-amber-950/40">
            <CardTitle className="text-amber-950 dark:text-amber-200 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>{c('Driver Highway Support & Digital Mandi Gate Pass', 'चालक हाइवे सहायता और डिजिटल मंडी गेट पास', 'ड्रायव्हर महामार्ग मदत आणि डिजिटल मंडी पास')}</span>
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-emerald-950/70 border border-gray-200 dark:border-emerald-800 rounded-xl space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" /> {c('Digital Mandi Gate Pass', 'डिजिटल मंडी गेट पास', 'डिजिटल मंडी गेट पास')}
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-300">{c('Pass Code: MP-NHK-99201 (Verified by Maharashtra APMC)', 'पास कोड: MP-NHK-99201 (महाराष्ट्र APMC द्वारा सत्यापित)', 'पास कोड: MP-NHK-99201 (महाराष्ट्र APMC द्वारे सत्यापित)')}</p>
                <div className="bg-gray-100 dark:bg-emerald-900/60 p-3 rounded-lg text-center font-mono text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  {c('[ QR Code Verified: AgroConnect Cold Produce ]', '[ क्यूआर कोड सत्यापित: कृषिकनेक्ट कोल्ड उपज ]', '[ क्यूआर कोड पडताळला: कृषिकनेक्ट कोल्ड पिके ]')}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-emerald-950/70 border border-gray-200 dark:border-emerald-800 rounded-xl space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-red-600" /> {c('24x7 Highway Emergency Assistance', '24x7 हाइवे आपातकालीन सहायता', '24x7 महामार्ग आपत्कालीन मदत')}
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-300">{c('Highway Breakdown, Tyre Flat, Cold Storage Temperature Alert', 'हाइवे ब्रेकडाउन, टायर पंचर, कोल्ड स्टोरेज तापमान अलर्ट', 'महामार्ग बिघाड, टायर फ्लॅट, कोल्ड स्टोरेज तापमान इशारा')}</p>
                <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50 text-xs font-bold py-2">
                  {c('Call Toll-Free Helpline: 1800-419-8800', 'टोल-फ्री हेल्पलाइन पर कॉल करें: 1800-419-8800', 'टोल-फ्री हेल्पलाइनवर कॉल करा: 1800-419-8800')}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* OTP Delivery Verification Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        title={c(`Verify Buyer OTP for Delivery ${selectedTripForDelivery?.id}`, `डिलीवरी ${selectedTripForDelivery?.id} के लिए खरीदार ओटीपी दर्ज करें`, `डिलिव्हरी ${selectedTripForDelivery?.id} साठी खरेदीदार ओटीपी प्रविष्ट करा`)}
      >
        <form onSubmit={handleVerifyOtpAndDeliver} className="space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
              {c('Deliver Crop:', 'डिलीवरी फसल:', 'डिलिव्हरी पीक:')} {selectedTripForDelivery?.crop} ({selectedTripForDelivery?.quantity})
            </p>
            <p className="text-xs text-gray-600 dark:text-emerald-300 mt-0.5">
              {c('Ask buyer at', 'खरीदार', 'खरेदीदार')} <strong>{selectedTripForDelivery?.drop}</strong> {c('for 4-digit verification code.', 'से 4-अंकों का सत्यापन कोड मांगें।', 'कडून 4-अंकी पडताळणी कोड मागा.')}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-emerald-200 mb-1">
              {c('Enter 4-Digit Delivery OTP', '4-अंकों का डिलीवरी ओटीपी दर्ज करें', '4-अंकी डिलिव्हरी ओटीपी टाका')}
            </label>
            <Input 
              type="text" 
              placeholder={`Demo OTP is ${selectedTripForDelivery?.otp}`} 
              value={otpInput} 
              onChange={(e) => setOtpInput(e.target.value)}
              className="text-center font-mono text-xl font-bold tracking-widest"
              maxLength={4}
              required
            />
            {otpError && <p className="text-xs font-bold text-red-600 mt-1">{otpError}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOtpModalOpen(false)}>
              {c('Cancel', 'रद्द करें', 'रद्द करा')}
            </Button>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 font-bold">
              {c('Verify OTP & Complete Delivery', 'ओटीपी सत्यापित करें और डिलीवरी पूरी करें', 'ओटीपी तपासा आणि डिलिव्हरी पूर्ण करा')}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

