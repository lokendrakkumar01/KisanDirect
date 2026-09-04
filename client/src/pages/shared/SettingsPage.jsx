import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { User, Globe, Moon, Sun, Shield, CheckCircle, Sparkles } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || 'Maharashtra, India'
    });

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-emerald-100">{t('settings')}</h1>
                <p className="text-sm text-gray-500 dark:text-emerald-300 mt-1">Manage your AgroConnect profile, language, and theme preferences</p>
            </div>

            {saved && (
                <div className="bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-100 px-4 py-3 rounded-xl flex items-center font-bold text-sm">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-300" /> {t('saveSettings')}!
                </div>
            )}

            {/* Language Selection Card */}
            <Card className="border-emerald-300 dark:border-emerald-800">
                <CardHeader className="bg-emerald-50/70 dark:bg-emerald-900/40">
                    <CardTitle className="flex items-center gap-2 text-emerald-950 dark:text-emerald-100">
                        <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> 
                        <span>{t('selectLanguage')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 py-6">
                    <p className="text-xs font-semibold text-gray-600 dark:text-emerald-300">
                        Choose the language you prefer for the AgroConnect platform interface. You can change this language anytime.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                            type="button"
                            onClick={() => { setLanguage('hi'); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                            className={`p-4 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                                language === 'hi'
                                    ? 'bg-emerald-100 dark:bg-emerald-800/90 border-emerald-600 text-emerald-950 dark:text-white font-extrabold shadow-md ring-2 ring-emerald-500'
                                    : 'bg-white dark:bg-emerald-900/40 border-gray-200 dark:border-emerald-800 text-gray-700 dark:text-emerald-200 hover:border-emerald-400'
                            }`}
                        >
                            <div>
                                <div className="text-sm font-bold">{t('hindi')}</div>
                                <div className="text-xs opacity-75">हिंदी भाषा</div>
                            </div>
                            {language === 'hi' && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setLanguage('en'); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                            className={`p-4 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                                language === 'en'
                                    ? 'bg-emerald-100 dark:bg-emerald-800/90 border-emerald-600 text-emerald-950 dark:text-white font-extrabold shadow-md ring-2 ring-emerald-500'
                                    : 'bg-white dark:bg-emerald-900/40 border-gray-200 dark:border-emerald-800 text-gray-700 dark:text-emerald-200 hover:border-emerald-400'
                            }`}
                        >
                            <div>
                                <div className="text-sm font-bold">{t('english')}</div>
                                <div className="text-xs opacity-75">English Language</div>
                            </div>
                            {language === 'en' && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setLanguage('mr'); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                            className={`p-4 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                                language === 'mr'
                                    ? 'bg-emerald-100 dark:bg-emerald-800/90 border-emerald-600 text-emerald-950 dark:text-white font-extrabold shadow-md ring-2 ring-emerald-500'
                                    : 'bg-white dark:bg-emerald-900/40 border-gray-200 dark:border-emerald-800 text-gray-700 dark:text-emerald-200 hover:border-emerald-400'
                            }`}
                        >
                            <div>
                                <div className="text-sm font-bold">{t('marathi')}</div>
                                <div className="text-xs opacity-75">मराठी भाषा</div>
                            </div>
                            {language === 'mr' && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />}
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Theme Preference Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-emerald-100">
                        {isDark ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-emerald-600" />}
                        <span>{t('themeMode')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">
                                {isDark ? t('darkMode') : t('lightMode')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-emerald-300">
                                Switch between Light mode and Dark mode theme colors
                            </p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer flex items-center gap-2"
                        >
                            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-white" />}
                            <span>Toggle Theme Mode</span>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-emerald-100">
                        <User className="w-5 h-5 text-emerald-600" /> Personal Profile Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-emerald-200 mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm bg-white dark:bg-emerald-900/60 dark:border-emerald-700 dark:text-white focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-emerald-200 mb-1">Email Address</label>
                                <input 
                                    type="email"
                                    disabled
                                    value={formData.email}
                                    className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 dark:bg-emerald-950/80 text-gray-500 dark:text-emerald-400 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-emerald-200 mb-1">Phone Number</label>
                                <input 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm bg-white dark:bg-emerald-900/60 dark:border-emerald-700 dark:text-white focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-emerald-200 mb-1">Location</label>
                                <input 
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg text-sm bg-white dark:bg-emerald-900/60 dark:border-emerald-700 dark:text-white focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-emerald-800 flex justify-end">
                            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 font-bold">{t('saveSettings')}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-emerald-100">
                        <Shield className="w-5 h-5 text-blue-600" /> Account Security & Role Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-emerald-800">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-emerald-100 text-sm">Account Role</p>
                            <p className="text-xs text-gray-500 dark:text-emerald-300">Your role determines portal permissions and dashboard access</p>
                        </div>
                        <Badge variant="primary" className="capitalize">{user?.role ? user.role.replace('_', ' ') : 'User'}</Badge>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-emerald-100 text-sm">Verification Status</p>
                            <p className="text-xs text-gray-500 dark:text-emerald-300">KYC and document verification status</p>
                        </div>
                        <Badge variant={user?.isVerified ? 'success' : 'warning'}>
                            {user?.isVerified ? 'Verified Account' : 'Pending Verification'}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export { SettingsPage };
