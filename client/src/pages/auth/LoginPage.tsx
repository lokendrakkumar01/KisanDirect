import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, UserCheck, Sprout, Store, Truck, ShieldAlert, Users } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
      navigate('/dashboard'); // Common dashboard path, internally resolves based on role
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoCreds = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Main Login Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Sign in to your KisanDirect account</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2" /> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">Forgot password?</a>
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                Sign in
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                Register now
              </Link>
            </div>
          </div>

          {/* Demo Mode Panel */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">SIH 2026 Demo Mode</h3>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold uppercase">Prototype</span>
            </div>
            <p className="text-gray-700 mb-6 text-sm">
              Quickly test the platform using these pre-configured personas. Click any role to auto-fill credentials.
            </p>

            <div className="space-y-3">
              <button onClick={() => setDemoCreds('farmer@demo.com')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-sm transition group">
                <Sprout className="w-5 h-5 text-green-600 mr-3 group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-sm">Farmer (Ramesh)</div>
                  <div className="text-xs text-gray-500">farmer@demo.com</div>
                </div>
              </button>
              
              <button onClick={() => setDemoCreds('fpo@demo.com')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition group">
                <Users className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-sm">FPO Admin (Nashik FPO)</div>
                  <div className="text-xs text-gray-500">fpo@demo.com</div>
                </div>
              </button>

              <button onClick={() => setDemoCreds('consumer@demo.com')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-sm transition group">
                <UserCheck className="w-5 h-5 text-amber-500 mr-3 group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-sm">Consumer User</div>
                  <div className="text-xs text-gray-500">consumer@demo.com</div>
                </div>
              </button>

              <button onClick={() => setDemoCreds('buyer@demo.com')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-sm transition group">
                <Store className="w-5 h-5 text-purple-600 mr-3 group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-sm">Bulk Buyer (Pune Fresh)</div>
                  <div className="text-xs text-gray-500">buyer@demo.com</div>
                </div>
              </button>

              <button onClick={() => setDemoCreds('logistics@demo.com')} className="w-full flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-500 hover:shadow-sm transition group">
                <Truck className="w-5 h-5 text-gray-600 mr-3 group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-sm">Logistics Partner</div>
                  <div className="text-xs text-gray-500">logistics@demo.com</div>
                </div>
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-200 text-xs text-center text-gray-500">
              All demo accounts use password: <strong className="text-gray-800">demo123</strong>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
