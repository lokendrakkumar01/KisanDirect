import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';

export const PublicNav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
    ];
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-green-600 font-bold' : 'text-gray-600 hover:text-green-600'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <Link to="/admin/login">
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 font-bold flex items-center gap-1">
                                <ShieldCheck className="w-4 h-4" /> Admin Login
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">User Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" size="sm">Register</Button>
                        </Link>
                    </div>

                    <div className="flex items-center md:hidden gap-2">
                        <Link to="/admin/login">
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 px-2 text-xs font-bold">
                                Admin 🛡️
                            </Button>
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none p-1">
                            {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'bg-green-50 text-green-600 font-bold' : 'text-gray-700 hover:bg-gray-50'}`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col space-y-2 px-3 border-t">
                            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" fullWidth className="text-red-600 border-red-200 font-bold">Admin Login 🛡️</Button>
                            </Link>
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" fullWidth>User Login</Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" fullWidth>Register Account</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default PublicNav;
