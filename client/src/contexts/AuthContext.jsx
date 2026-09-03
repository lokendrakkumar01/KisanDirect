import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/authService';
export const getRoleDashboardPath = (role) => {
    switch (role) {
        case 'farmer': return '/farmer/dashboard';
        case 'fpo': return '/fpo/dashboard';
        case 'consumer': return '/consumer/dashboard';
        case 'bulk_buyer': return '/buyer/dashboard';
        case 'logistics': return '/logistics/dashboard';
        case 'admin': return '/admin/dashboard';
        default: return '/farmer/dashboard';
    }
};
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await getMe();
                if (response.success && response.data) {
                    setUser(response.data);
                }
                else {
                    logout();
                }
            }
            catch (error) {
                logout();
            }
            finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, [token]);
    const login = async (data) => {
        const response = await apiLogin(data);
        if (response.success && response.data) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        }
        else {
            throw new Error(response.error || 'Login failed');
        }
    };
    const register = async (data) => {
        const response = await apiRegister(data);
        if (response.success && response.data) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        }
        else {
            throw new Error(response.error || 'Registration failed');
        }
    };
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };
    return (<AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
