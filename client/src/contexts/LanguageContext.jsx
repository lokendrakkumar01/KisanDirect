import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext({ language: 'en', setLanguage: () => {}, t: (key) => key });

export const LanguageProvider = ({ children }) => {
    const { i18n, t } = useTranslation();
    const language = i18n.resolvedLanguage || i18n.language || 'en';

    const setLanguage = (code) => {
        if (!['en', 'hi'].includes(code)) return;
        i18n.changeLanguage(code);
        localStorage.setItem('agroconnect_language', code);
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
