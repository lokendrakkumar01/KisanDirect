import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Sprout, Store, UserCheck, ShieldAlert, Users } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [role, setRole] = useState('farmer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const newUser = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: role
            });
            navigate(getRoleDashboardPath(newUser.role));
        }
        catch (err) {
            setError(err.message || 'Failed to register. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="text-gray-500 mt-2">Join India's smartest agricultural marketplace</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              {error && (<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2"/> {error}
                </div>)}

              <form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-4">I want to register as a:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button type="button" onClick={() => setRole('farmer')} className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'farmer' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <Sprout className={`w-8 h-8 mb-2 ${role === 'farmer' ? 'text-green-600' : 'text-gray-400'}`}/>
                      <span className="font-semibold text-sm">Farmer</span>
                    </button>
                    
                    <button type="button" onClick={() => setRole('fpo')} className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'fpo' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <Users className={`w-8 h-8 mb-2 ${role === 'fpo' ? 'text-blue-600' : 'text-gray-400'}`}/>
                      <span className="font-semibold text-sm">FPO</span>
                    </button>

                    <button type="button" onClick={() => setRole('consumer')} className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'consumer' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <UserCheck className={`w-8 h-8 mb-2 ${role === 'consumer' ? 'text-amber-500' : 'text-gray-400'}`}/>
                      <span className="font-semibold text-sm">Consumer</span>
                    </button>

                    <button type="button" onClick={() => setRole('bulk_buyer')} className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'bulk_buyer' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      <Store className={`w-8 h-8 mb-2 ${role === 'bulk_buyer' ? 'text-purple-600' : 'text-gray-400'}`}/>
                      <span className="font-semibold text-sm text-center">Bulk Buyer</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Business Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400"/>
                      </div>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="John Doe"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400"/>
                      </div>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="you@example.com"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400"/>
                      </div>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="+91 9876543210"/>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400"/>
                      </div>
                      <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="••••••••"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400"/>
                      </div>
                      <input type="password" name="confirmPassword" required minLength={6} value={formData.confirmPassword} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="••••••••"/>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-8">
                  <input id="terms" type="checkbox" required className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"/>
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                    I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                  Create Account
                </Button>
              </form>
            </div>
            
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>);
};
