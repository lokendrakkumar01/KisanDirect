import React, { useState } from 'react';
import { Bell, Menu, Search, LogOut, X, Globe, MessageSquarePlus, Sun, Moon, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Logo } from './Logo';
import { Badge } from '../ui/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { FeedbackModal } from '../ui/FeedbackModal';
import { useLanguage } from '../../contexts/LanguageContext';

export const TopBar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { unreadCount } = useNotification();
    const { isDark, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const navigate = useNavigate();

    const SEARCH_SUGGESTIONS = [
        { label: 'Fresh Red Tomatoes 🍅', query: 'tomato', category: 'vegetables' },
        { label: 'Export Red Onions 🧅', query: 'onion', category: 'vegetables' },
        { label: 'Seedless Green Grapes 🍇', query: 'grapes', category: 'fruits' },
        { label: 'Organic Potatoes 🥔', query: 'potato', category: 'vegetables' },
        { label: 'Sharbati Wheat 🌾', query: 'wheat', category: 'grains' },
        { label: 'Alphonso Mangoes 🥭', query: 'mango', category: 'fruits' },
        { label: 'Nashik Farmer Hub 📍', query: 'nashik', category: 'location' },
        { label: 'Pune Bulk Produce 📍', query: 'pune', category: 'location' }
    ];

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSuggestionsOpen(false);
        navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    const handleSelectSuggestion = (q) => {
        setSearchQuery(q);
        setIsSuggestionsOpen(false);
        navigate(`/marketplace?q=${encodeURIComponent(q)}`);
    };

    const filteredSuggestions = SEARCH_SUGGESTIONS.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.query.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case 'farmer': return 'success';
            case 'fpo': return 'primary';
            case 'bulk_buyer': return 'secondary';
            case 'consumer': return 'warning';
            case 'logistics': return 'neutral';
            case 'admin': return 'danger';
            default: return 'success';
        }
    };

    const roleLabel = user?.role ? user.role.replace('_', ' ').toUpperCase() : 'USER';
    const badgeVariant = getRoleBadgeVariant(user?.role);

    return (
        <>
            <header className="bg-emerald-50/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-200/90 dark:border-emerald-800/80 sticky top-0 z-20 shadow-xs transition-colors duration-300">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                    <div className="flex items-center">
                        <button onClick={onMenuClick} className="text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 focus:outline-none lg:hidden mr-4">
                            <Menu className="h-6 w-6"/>
                        </button>
                        <Logo size="sm" className="hidden lg:flex"/>
                        <Logo size="sm" className="lg:hidden"/>
                    </div>

                    {/* Global Search Bar */}
                    <div className="flex-1 px-4 flex justify-center max-w-lg mx-auto">
                        <div className="w-full relative">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400 dark:text-emerald-400"/>
                                    </div>
                                    <input 
                                        className="block w-full pl-9 pr-8 py-2 border border-emerald-300 dark:border-emerald-700 rounded-xl leading-5 bg-white/90 dark:bg-emerald-900/60 placeholder-gray-500 dark:placeholder-emerald-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs sm:text-sm font-medium transition duration-150 ease-in-out shadow-2xs" 
                                        placeholder={t('searchPlaceholder')}
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setIsSuggestionsOpen(true);
                                        }}
                                        onFocus={() => setIsSuggestionsOpen(true)}
                                    />
                                    {searchQuery && (
                                        <button 
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Search Dropdown Auto-Complete Suggestions */}
                            {isSuggestionsOpen && (searchQuery.trim().length > 0) && (
                                <div className="absolute left-0 right-0 top-11 bg-white dark:bg-emerald-900 rounded-xl shadow-xl border border-gray-200 dark:border-emerald-700 py-2 z-50 animate-in fade-in-50 duration-150">
                                    <div className="px-3 py-1 text-[10px] font-extrabold text-gray-400 dark:text-emerald-300 uppercase tracking-wider">
                                        {t('searchSuggestions')}
                                    </div>
                                    {filteredSuggestions.length > 0 ? (
                                        filteredSuggestions.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelectSuggestion(item.query)}
                                                className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-emerald-800 text-xs font-semibold text-gray-800 dark:text-white flex justify-between items-center transition"
                                            >
                                                <span>{item.label}</span>
                                                <span className="text-[10px] text-gray-400 dark:text-emerald-300 bg-gray-100 dark:bg-emerald-950 px-2 py-0.5 rounded capitalize">
                                                    {item.category}
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <button
                                            onClick={() => handleSelectSuggestion(searchQuery)}
                                            className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-emerald-800 text-xs font-bold text-green-700 dark:text-emerald-300"
                                        >
                                            {t('searchMarketplace')} "{searchQuery}" &rarr;
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center ml-4 space-x-2.5 sm:space-x-3">
                        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-emerald-100/80 px-3 py-1.5 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-100">
                            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                            <label htmlFor="dashboard-language" className="sr-only">{t('language')}</label>
                            <select
                                id="dashboard-language"
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                className="cursor-pointer appearance-none bg-transparent text-xs font-bold outline-none"
                            >
                                <option value="hi">हिंदी</option>
                                <option value="en">अंग्रेज़ी</option>
                            </select>
                        </div>
                        {/* Theme Switcher Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-800 border border-emerald-300/80 dark:border-emerald-700 transition cursor-pointer flex items-center justify-center shadow-2xs"
                            title={isDark ? `${t('lightModeTitle')} ☀️` : `${t('darkModeTitle')} 🌙`}
                        >
                            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
                        </button>

                        <button 
                            onClick={() => setIsFeedbackOpen(true)}
                            className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-950 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 px-3 py-1.5 rounded-full transition shadow-2xs cursor-pointer"
                        >
                            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                            <span>{t('feedback')}</span>
                        </button>

                        <Link to="/notifications" className="relative p-1.5 text-emerald-900 dark:text-emerald-200 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition focus:outline-none" title={t('notifications')}>
                            <span className="sr-only">{t('notifications')}</span>
                            <Bell className="h-5 w-5"/>
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white animate-pulse">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </Link>

                        <Link to="/settings" className="p-1.5 text-emerald-900 dark:text-emerald-200 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition focus:outline-none" title={t('settings')}>
                            <Settings className="h-5 w-5"/>
                        </Link>

                        <div className="relative flex items-center space-x-3">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.name || t('user')}</span>
                                <Badge variant={badgeVariant} className="text-[10px] px-2 py-0.5 mt-0.5">
                                    {roleLabel}
                                </Badge>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-100 font-bold border border-emerald-300 dark:border-emerald-600 shadow-xs">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <button onClick={logout} className="p-1.5 text-gray-400 dark:text-emerald-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer" title={t('logout')}>
                                <LogOut className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        </>
    );
};

export default TopBar;
