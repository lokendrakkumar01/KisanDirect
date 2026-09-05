import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext({ language: 'en', setLanguage: () => {}, t: (key) => key, c: (en, hi, mr) => en });

export const LanguageProvider = ({ children }) => {
    const { i18n, t } = useTranslation();
    const language = i18n.resolvedLanguage || i18n.language || 'en';

    const setLanguage = (code) => {
        if (!['en', 'hi', 'mr'].includes(code)) return;
        i18n.changeLanguage(code);
        localStorage.setItem('agroconnect_language', code);
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const c = (enText, hiText, mrText) => {
        if (language === 'hi') return hiText || enText;
        if (language === 'mr') return mrText || hiText || enText;
        return enText;
    };

    return <LanguageContext.Provider value={{ language, setLanguage, t, c }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
