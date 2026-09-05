import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, List, ClipboardList, PieChart, User, Settings, Users, Truck, MessageSquare, Map, Search, TrendingUp, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Logo } from './Logo';

export const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const { c } = useLanguage();

    if (!user) return null;

    const roleMenus = {
        farmer: [
            { label: c('Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'), path: '/farmer/dashboard', icon: Home },
            { label: c('My Produce Listings', 'मेरी फसल सूचियां', 'माझ्या शेतमालाच्या याद्या'), path: '/farmer/listings', icon: List },
            { label: c('Add New Produce', 'नयी फसल जोड़ें', 'नवीन शेतमाल जोडा'), path: '/farmer/listings/new', icon: List },
            { label: c('My Orders', 'मेरे ऑर्डर', 'माझे ऑर्डर'), path: '/farmer/orders', icon: ClipboardList },
            { label: c('Earnings & Realization', 'कमाई व आय', 'कमाई व उत्पन्न'), path: '/farmer/earnings', icon: PieChart },
            { label: c('AI Market Insights', 'एआई बाजार अंतर्दृष्टि', 'एआय बाजार अंतर्दृष्टी'), path: '/farmer/insights', icon: TrendingUp },
            { label: c('My Farm Profile', 'मेरी फ़ार्म प्रोफ़ाइल', 'माझे फार्म प्रोफाइल'), path: '/farmer/profile', icon: User },
        ],
        consumer: [
            { label: c('Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'), path: '/consumer/dashboard', icon: Home },
            { label: c('Browse Marketplace', 'बाजार देखें', 'बाजार पहा'), path: '/marketplace', icon: Search },
            { label: c('My Shopping Cart', 'मेरी कार्ट', 'माझी कार्ट'), path: '/consumer/cart', icon: ShoppingBag },
            { label: c('My Orders & Tracking', 'मेरे ऑर्डर व ट्रैकिंग', 'माझे ऑर्डर व ट्रॅकिंग'), path: '/consumer/orders', icon: ClipboardList },
        ],
        bulk_buyer: [
            { label: c('Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'), path: '/buyer/dashboard', icon: Home },
            { label: c('Find Produce & Sellers', 'ताज़ी फसल खोजें', 'ताजा शेतमाल शोधा'), path: '/buyer/find', icon: Search },
            { label: c('Post Bulk Requirement', 'थोक मांग पोस्ट करें', 'घाऊक मागणी पोस्ट करा'), path: '/buyer/requirements/new', icon: List },
            { label: c('Seller Offers', 'विक्रेता प्रस्ताव', 'विक्रेता ऑफर'), path: '/buyer/offers', icon: MessageSquare },
            { label: c('Bulk Orders', 'थोक ऑर्डर', 'घाऊक ऑर्डर'), path: '/buyer/orders', icon: ClipboardList },
            { label: c('Spend Analytics', 'खर्च विश्लेषण', 'खर्च विश्लेषण'), path: '/buyer/analytics', icon: PieChart },
        ],
        fpo: [
            { label: c('Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'), path: '/fpo/dashboard', icon: Home },
            { label: c('Farmer Members', 'किसान सदस्य', 'शेतकरी सदस्य'), path: '/fpo/members', icon: Users },
            { label: c('Harvest Aggregation', 'फसल एकत्रीकरण', 'पिक संकलन'), path: '/fpo/aggregation', icon: List },
            { label: c('Aggregated Inventory', 'एकत्रित इन्वेंटरी', 'एकत्रित इन्व्हेंटरी'), path: '/fpo/inventory', icon: ClipboardList },
            { label: c('FPO Orders', 'एफपीओ ऑर्डर', 'एफपीओ ऑर्डर'), path: '/fpo/orders', icon: ShoppingBag },
            { label: c('Analytics', 'विश्लेषण', 'विश्लेषण'), path: '/fpo/analytics', icon: PieChart },
        ],
        logistics: [
            { label: c('Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'), path: '/logistics/dashboard', icon: Home },
            { label: c('Driver Partner Portal', 'चालक पार्टनर पोर्टल', 'ड्रायव्हर पार्टनर पोर्टल'), path: '/logistics/driver-partner', icon: Truck },
            { label: c('All Deliveries', 'सभी डिलीवरी', 'सर्व डिलिव्हरी'), path: '/logistics/deliveries', icon: ClipboardList },
            { label: c('Route Optimization', 'रूट अनुकूलन', 'मार्ग ऑप्टिमायझेशन'), path: '/logistics/routes', icon: TrendingUp },
            { label: c('Live Maps', 'लाइव मैप', 'लाइव्ह नकाशे'), path: '/logistics/map', icon: Map },
            { label: c('Vehicles Fleet', 'वाहन बेड़ा', 'वाहने'), path: '/logistics/vehicles', icon: Settings },
            { label: c('Drivers Roster', 'चालक सूची', 'ड्रायव्हर्स सूची'), path: '/logistics/drivers', icon: Users },
        ],
        admin: [
            { label: c('Platform Dashboard', 'प्लेटफ़ॉर्म डैशबोर्ड', 'प्लॅटफॉर्म डॅशबोर्ड'), path: '/admin/dashboard', icon: Home },
            { label: c('User Management', 'उपयोगकर्ता प्रबंधन', 'वापरकर्ता व्यवस्थापन'), path: '/admin/users', icon: Users },
            { label: c('All Platform Orders', 'सभी ऑर्डर', 'सर्व ऑर्डर'), path: '/admin/orders', icon: ClipboardList },
            { label: c('Analytics & Insights', 'विश्लेषण व आंकड़े', 'विश्लेषण व आकडेवारी'), path: '/admin/analytics', icon: PieChart },
            { label: c('Grievance Management', 'शिकायत निवारण', 'तक्रार निवारण'), path: '/admin/complaints', icon: MessageSquare },
            { label: c('Impact Dashboard', 'प्रभाव डैशबोर्ड', 'प्रभाव डॅशबोर्ड'), path: '/admin/impact', icon: TrendingUp },
        ],
    };

    const menuItems = roleMenus[user.role] || roleMenus['farmer'];

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            <div 
                className={`fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`} 
                onClick={onClose} 
            />

            {/* Sidebar Drawer */}
            <aside 
                className={`fixed inset-y-0 left-0 bg-white dark:bg-[#11201c] w-72 sm:w-64 border-r border-gray-200 dark:border-emerald-800/80 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}
            >
                <div className="h-full flex flex-col justify-between">
                    
                    {/* Header for Mobile Drawer */}
                    <div>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-emerald-800/80 lg:hidden bg-emerald-50 dark:bg-emerald-950">
                            <Logo size="sm" />
                            <button 
                                onClick={onClose}
                                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-emerald-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-emerald-900 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Menu List */}
                        <div className="px-3 py-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink 
                                        key={item.path} 
                                        to={item.path} 
                                        className={({ isActive }) => `flex items-center px-3.5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-150 ${
                                            isActive
                                                ? 'bg-emerald-600 dark:bg-emerald-700 text-white font-extrabold shadow-md'
                                                : 'text-gray-700 dark:text-emerald-100 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 hover:text-emerald-950 dark:hover:text-white'
                                        }`} 
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                    >
                                        <Icon className="mr-3 flex-shrink-0 h-5 w-5 opacity-90" />
                                        <span className="truncate">{item.label}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Settings Link */}
                    <div className="p-3 border-t border-gray-200 dark:border-emerald-800/80 bg-gray-50/50 dark:bg-emerald-950/30">
                        <NavLink 
                            to="/settings" 
                            className={({ isActive }) => `flex items-center px-3.5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-150 ${
                                isActive 
                                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white font-extrabold shadow-md' 
                                    : 'text-gray-700 dark:text-emerald-100 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 hover:text-emerald-950 dark:hover:text-white'
                            }`}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                        >
                            <Settings className="mr-3 flex-shrink-0 h-5 w-5 opacity-90" />
                            <span>{c('Settings', 'सेटिंग्स', 'सेटिंग्ज')}</span>
                        </NavLink>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
