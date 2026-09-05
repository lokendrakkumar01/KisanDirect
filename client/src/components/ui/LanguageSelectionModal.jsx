import React from 'react';
import { Globe, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LanguageSelectionModal = ({ isOpen, onClose, onSelectLanguage, targetRole }) => {
    const { language, setLanguage } = useLanguage();
    const [selectedCode, setSelectedCode] = React.useState(language || 'hi');

    if (!isOpen) return null;

    const handleConfirm = (code) => {
        const langCode = code || selectedCode;
        setLanguage(langCode);
        if (onSelectLanguage) {
            onSelectLanguage(langCode);
        } else if (onClose) {
            onClose();
        }
    };

    const roleNameMap = {
        farmer: { en: 'Farmer Dashboard 🌾', hi: 'किसान डैशबोर्ड 🌾', mr: 'शेतकरी डॅशबोर्ड 🌾' },
        fpo: { en: 'FPO Collective Hub 🏢', hi: 'एफपीओ हब 🏢', mr: 'एफपीओ हब 🏢' },
        bulk_buyer: { en: 'Bulk Buyer Portal 🏪', hi: 'थोक खरीदार पोर्टल 🏪', mr: 'घाऊक खरेदीदार पोर्टल 🏪' },
        consumer: { en: 'Consumer Marketplace 🛒', hi: 'उपभोक्ता बाज़ार 🛒', mr: 'ग्राहक बाजारपेठ 🛒' },
        logistics: { en: 'Driver Partner Portal 🚛', hi: 'चालक पार्टनर पोर्टल 🚛', mr: 'ड्रायव्हर पार्टनर पोर्टल 🚛' },
        admin: { en: 'Platform Admin Dashboard 🛡️', hi: 'प्लेटफ़ॉर्म एडमिन डैशबोर्ड 🛡️', mr: 'प्रशासक डॅशबोर्ड 🛡️' }
    };

    const currentRoleName = roleNameMap[targetRole] || roleNameMap.farmer;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-emerald-950 border-2 border-emerald-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                
                {/* Background decorative elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100 dark:bg-emerald-900/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-100 dark:bg-amber-900/40 rounded-full blur-2xl pointer-events-none" />

                {/* Modal Header */}
                <div className="text-center space-y-2 relative z-10">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 rounded-2xl flex items-center justify-center mx-auto shadow-md border border-emerald-200 dark:border-emerald-700">
                        <Globe className="w-8 h-8 animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        अपनी पसंदीदा भाषा चुनें <br />
                        <span className="text-emerald-700 dark:text-emerald-400 text-lg font-bold">Select Preferred Language</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-emerald-200">
                        लॉगिन/पंजीकरण सफल! ऐप और डैशबोर्ड को किस भाषा में देखना चाहते हैं?
                    </p>
                </div>

                {/* Role Destination Badge */}
                {targetRole && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-700 p-3 rounded-2xl text-center text-xs font-bold text-emerald-900 dark:text-emerald-100 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>नेविगेटिंग: {currentRoleName.hi} ({currentRoleName.en})</span>
                    </div>
                )}

                {/* Language Option Cards */}
                <div className="space-y-3 relative z-10">
                    {/* Hindi Option */}
                    <button
                        type="button"
                        onClick={() => handleConfirm('hi')}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition cursor-pointer ${
                            selectedCode === 'hi'
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/80 ring-2 ring-emerald-500 shadow-md'
                                : 'border-gray-200 dark:border-emerald-800 hover:border-emerald-400 bg-white dark:bg-emerald-950/60'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🇮🇳</span>
                            <div>
                                <div className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                    हिंदी (Hindi)
                                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">अनुशंसित / Recommended</span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-emerald-300 font-medium mt-0.5">
                                    पूरा ऐप, डैशबोर्ड और ऑप्शंस हिंदी में बदल जाएंगे
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>

                    {/* Marathi Option */}
                    <button
                        type="button"
                        onClick={() => handleConfirm('mr')}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition cursor-pointer ${
                            selectedCode === 'mr'
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/80 ring-2 ring-emerald-500 shadow-md'
                                : 'border-gray-200 dark:border-emerald-800 hover:border-emerald-400 bg-white dark:bg-emerald-950/60'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🇮🇳</span>
                            <div>
                                <div className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                    मराठी (Marathi)
                                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">प्रादेशिक / Regional</span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-emerald-300 font-medium mt-0.5">
                                    संपूर्ण अ‍ॅप आणि डॅशबोर्ड मराठीत पहा
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>

                    {/* English Option */}
                    <button
                        type="button"
                        onClick={() => handleConfirm('en')}
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition cursor-pointer ${
                            selectedCode === 'en'
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/80 ring-2 ring-emerald-500 shadow-md'
                                : 'border-gray-200 dark:border-emerald-800 hover:border-emerald-400 bg-white dark:bg-emerald-950/60'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🇬🇧</span>
                            <div>
                                <div className="text-base font-extrabold text-gray-900 dark:text-white">
                                    English
                                </div>
                                <div className="text-xs text-gray-500 dark:text-emerald-300 font-medium mt-0.5">
                                    View entire app &amp; dashboards in English
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-xs">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionModal;
