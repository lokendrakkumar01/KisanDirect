import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '../types';
import { login as apiLogin, register as apiRegister, getMe } from '../services/authService';
import api from '../services/api';

export const getRoleDashboardPath = (role?: string): string => {
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

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [token]);

  const login = async (data: LoginRequest): Promise<User> => {
    const response = await apiLogin(data);
    if (response.success && response.data) {
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } else {
      throw new Error(response.error || 'Login failed');
    }
  };

  const register = async (data: RegisterRequest): Promise<User> => {
    const response = await apiRegister(data);
    if (response.success && response.data) {
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } else {
      throw new Error(response.error || 'Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
