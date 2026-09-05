import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Globe, MessageSquarePlus, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { FeedbackModal } from '../ui/FeedbackModal';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const PublicNav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    const languageOptions = [
        { code: 'hi', label: 'हिंदी' },
        { code: 'en', label: 'अंग्रेज़ी' },
    ];
    
    const navLinks = [
        { key: 'home', path: '/' },
        { key: 'marketplace', path: '/marketplace' },
        { key: 'forFarmers', path: '/how-it-works' },
        { key: 'forBuyers', path: '/buyer/find' },
        { key: 'priceTrends', path: '/farmer/insights' },
        { key: 'logistics', path: '/logistics/map' },
        { key: 'about', path: '/about' },
    ];
    
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-emerald-50/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-200/90 dark:border-emerald-800/80 sticky top-0 z-50 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Brand Logo */}
                        <div className="flex items-center mr-6 lg:mr-10 shrink-0">
                            <Logo size="md" />
                        </div>
                        
                        {/* Main Nav Links */}
                        <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-3">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.key} 
                                    to={link.path} 
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                        isActive(link.path) 
                                            ? 'text-emerald-950 dark:text-emerald-100 bg-emerald-200/80 dark:bg-emerald-800/80 font-extrabold border-b-2 border-emerald-700 dark:border-emerald-400 shadow-2xs' 
                                            : 'text-emerald-950 dark:text-emerald-200 hover:text-emerald-800 dark:hover:text-emerald-100 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60'
                                    }`}
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Buttons (Language + Feedback + Dark Mode + Auth) */}
                        <div className="hidden md:flex items-center space-x-2.5">
                            {/* Dark/Light Mode Switcher */}
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-800 border border-emerald-300/80 dark:border-emerald-700 transition cursor-pointer flex items-center justify-center shadow-2xs"
                                title={isDark ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
                            >
                                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
                            </button>

                            <button 
                                onClick={() => setIsFeedbackOpen(true)}
                                className="flex items-center gap-1 text-xs font-bold text-amber-950 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 px-3 py-1.5 rounded-full transition shadow-2xs cursor-pointer"
                            >
                                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                                <span>{t('feedback')}</span>
                            </button>

                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-200/70 dark:hover:bg-emerald-800 transition">
                                <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                                <label htmlFor="public-language" className="sr-only">{t('language')}</label>
                                <select
                                    id="public-language"
                                    value={language}
                                    onChange={(event) => setLanguage(event.target.value)}
                                    className="cursor-pointer appearance-none bg-transparent pr-1 text-xs font-bold text-emerald-950 outline-none dark:text-emerald-200"
                                >
                                    {languageOptions.map((option) => (
                                        <option key={option.code} value={option.code}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <Link to="/admin/login">
                                <Button variant="outline" size="sm" className="text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/50 font-bold text-xs flex items-center gap-1 py-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                                </Button>
                            </Link>

                            <Link to="/login">
                                <button className="px-4 py-2 text-xs font-bold text-emerald-950 dark:text-emerald-100 border border-emerald-700 dark:border-emerald-500 hover:bg-emerald-200/70 dark:hover:bg-emerald-900 bg-white/60 dark:bg-emerald-950 rounded-full transition duration-200 shadow-2xs">
                                    {t('login')}
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-full shadow-md transition duration-200">
                                    {t('signUp')}
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center lg:hidden gap-2">
                            <button 
                                onClick={toggleTheme}
                                className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 p-1"
                            >
                                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
                            </button>
                            <Link to="/admin/login">
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 px-2 py-1 text-[10px] font-bold">
                                    Admin 🛡️
                                </Button>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-emerald-900 dark:text-emerald-100 focus:outline-none p-1">
                                {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-emerald-50/98 dark:bg-emerald-950/98 border-b border-emerald-200 dark:border-emerald-800 animate-in fade-in-50">
                        <div className="px-3 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.key} 
                                    to={link.path} 
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-semibold ${
                                        isActive(link.path) ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 font-bold' : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                                    }`} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col space-y-2 px-3 border-t border-emerald-200 dark:border-emerald-800">
                                <label className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-900 dark:text-emerald-100">
                                    <Globe className="w-4 h-4" aria-hidden="true" />
                                    {t('language')}
                                    <select
                                        value={language}
                                        onChange={(event) => setLanguage(event.target.value)}
                                        className="ml-auto rounded-lg border border-emerald-300 bg-white px-2 py-1 text-xs font-bold text-emerald-900 outline-none dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                                    >
                                    {languageOptions.map((option) => (
                                            <option key={option.code} value={option.code}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); setIsFeedbackOpen(true); }}
                                    className="w-full py-2 bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5"
                                >
                                    <MessageSquarePlus className="w-4 h-4 text-amber-700 dark:text-amber-400" /> {t('feedback')}
                                </button>
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" fullWidth className="font-bold border-emerald-700 dark:border-emerald-500 text-emerald-900 dark:text-emerald-100">{t('login')}</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 font-bold" fullWidth>{t('signUp')}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        </>
    );
};

export default PublicNav;
