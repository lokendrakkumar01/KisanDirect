import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, MapPin, ChevronDown, MessageSquarePlus } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { FeedbackModal } from '../ui/FeedbackModal';

export const PublicNav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const location = useLocation();
    
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'For Farmers', path: '/how-it-works' },
        { name: 'For Buyers', path: '/buyer/find' },
        { name: 'Price Trends', path: '/farmer/insights' },
        { name: 'Logistics', path: '/logistics/map' },
        { name: 'About', path: '/about' },
    ];
    
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-emerald-50/95 backdrop-blur-md border-b border-emerald-200/90 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Brand Logo & Tagline */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2.5">
                                <Logo size="md" />
                            </Link>
                        </div>
                        
                        {/* Main Nav Links */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                        isActive(link.path) 
                                            ? 'text-emerald-900 bg-emerald-200/80 font-bold border-b-2 border-emerald-700 shadow-2xs' 
                                            : 'text-emerald-950 hover:text-emerald-800 hover:bg-emerald-100/70'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Buttons (Country + Feedback + Auth) */}
                        <div className="hidden md:flex items-center space-x-3">
                            <button 
                                onClick={() => setIsFeedbackOpen(true)}
                                className="flex items-center gap-1 text-xs font-bold text-amber-950 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-full transition shadow-2xs cursor-pointer"
                            >
                                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-700" />
                                <span>+ Feedback</span>
                            </button>

                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 bg-emerald-100/80 border border-emerald-300/80 px-3 py-1.5 rounded-full cursor-pointer hover:bg-emerald-200/70 transition">
                                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                                <span>India</span>
                                <ChevronDown className="w-3 h-3 text-emerald-600" />
                            </div>

                            <Link to="/admin/login">
                                <Button variant="outline" size="sm" className="text-red-700 border-red-300 hover:bg-red-50 font-bold text-xs flex items-center gap-1 py-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                                </Button>
                            </Link>

                            <Link to="/login">
                                <button className="px-4 py-2 text-xs font-bold text-emerald-900 border border-emerald-700 hover:bg-emerald-200/70 bg-white/60 rounded-full transition duration-200 shadow-2xs">
                                    Login
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-full shadow-md transition duration-200">
                                    Sign Up
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center lg:hidden gap-2">
                            <Link to="/admin/login">
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 px-2 py-1 text-[10px] font-bold">
                                    Admin 🛡️
                                </Button>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-emerald-900 hover:text-emerald-950 focus:outline-none p-1">
                                {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-emerald-50/98 border-b border-emerald-200 animate-in fade-in-50">
                        <div className="px-3 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-semibold ${
                                        isActive(link.path) ? 'bg-emerald-200 text-emerald-900 font-bold' : 'text-emerald-950 hover:bg-emerald-100'
                                    }`} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col space-y-2 px-3 border-t border-emerald-200">
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); setIsFeedbackOpen(true); }}
                                    className="w-full py-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5"
                                >
                                    <MessageSquarePlus className="w-4 h-4 text-amber-700" /> + Share Feedback
                                </button>
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" fullWidth className="font-bold border-emerald-700 text-emerald-900">User Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="bg-emerald-800 hover:bg-emerald-900 font-bold" fullWidth>Sign Up Account</Button>
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
