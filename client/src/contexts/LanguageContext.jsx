import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
    en: {
        appName: "AgroConnect",
        home: "Home",
        marketplace: "Marketplace",
        forFarmers: "For Farmers",
        forBuyers: "For Buyers",
        priceTrends: "Price Trends",
        logistics: "Driver Partner Portal",
        about: "About",
        login: "Login",
        signUp: "Sign Up",
        feedback: "+ Feedback",
        settings: "Settings",
        language: "Language",
        selectLanguage: "Select Preferred App Language",
        hindi: "Hindi (हिंदी 🇮🇳)",
        english: "English (English 🇬🇧)",
        marathi: "Marathi (मराठी 🚩)",
        saveSettings: "Save Settings",
        dashboard: "Dashboard",
        myListings: "My Listings",
        orders: "Orders",
        earnings: "Earnings",
        aiInsights: "AI Insights",
        profile: "Profile",
        themeMode: "Theme Preference",
        lightMode: "Light Mode ☀️",
        darkMode: "Dark Mode 🌙",
    },
    hi: {
        appName: "AgroConnect (कृषि कनेक्ट)",
        home: "होम",
        marketplace: "मार्केटप्लेस",
        forFarmers: "किसानों के लिए",
        forBuyers: "खरीदारों के लिए",
        priceTrends: "मंडी भाव एवं रुझान",
        logistics: "ड्राइवर पार्टनर पोर्टल",
        about: "हमारे बारे में",
        login: "लॉगिन करें",
        signUp: "रजिस्टर करें",
        feedback: "+ प्रतिक्रिया दें",
        settings: "सेटिंग्स",
        language: "भाषा चुनिए",
        selectLanguage: "अपनी पसंदीदा ऐप भाषा चुनें",
        hindi: "हिंदी (हिंदी 🇮🇳)",
        english: "English (English 🇬🇧)",
        marathi: "मराठी (मराठी 🚩)",
        saveSettings: "सेटिंग्स सुरक्षित करें",
        dashboard: "डैशबोर्ड",
        myListings: "मेरी फसल सूची",
        orders: "ऑर्डर सूची",
        earnings: "कुल कमाई",
        aiInsights: "AI मार्केट सलाह",
        profile: "प्रोफाइल",
        themeMode: "थीम पसंद",
        lightMode: "लाइट मोड ☀️",
        darkMode: "डार्क मोड 🌙",
    },
    mr: {
        appName: "AgroConnect (अ‍ॅग्रो कनेक्ट)",
        home: "मुख्यपृष्ठ",
        marketplace: "मार्केटप्लेस",
        forFarmers: "शेतकऱ्यांसाठी",
        forBuyers: "खरेदीदारांसाठी",
        priceTrends: "बाजार भाव व अंदाज",
        logistics: "ड्रायव्हर पार्टनर पोर्टल",
        about: "आमच्याबद्दल",
        login: "लॉगिन",
        signUp: "साइन अप करा",
        feedback: "+ अभिप्राय द्या",
        settings: "सेटिंग्ज",
        language: "भाषा निवडा",
        selectLanguage: "तुमची आवडती भाषा निवडा",
        hindi: "हिंदी (हिंदी 🇮🇳)",
        english: "English (English 🇬🇧)",
        marathi: "मराठी (मराठी 🚩)",
        saveSettings: "सेटिंग्ज जतन करा",
        dashboard: "डॅशबोर्ड",
        myListings: "माझे पीक शेती",
        orders: "ऑर्डर्स",
        earnings: "एकूण उत्पन्न",
        aiInsights: "AI बाजार सल्ला",
        profile: "प्रोफाइल",
        themeMode: "थीम पसंत",
        lightMode: "लाइट मोड ☀️",
        darkMode: "डार्क मोड 🌙",
    }
};

const LanguageContext = createContext({
    language: 'hi',
    setLanguage: () => {},
    t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        const saved = localStorage.getItem('agroconnect_language');
        return saved && ['hi', 'en', 'mr'].includes(saved) ? saved : 'hi';
    });

    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('agroconnect_language', lang);
    };

    const t = (key) => {
        return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
