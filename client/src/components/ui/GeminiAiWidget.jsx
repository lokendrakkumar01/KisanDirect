import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { askGeminiAI } from '../../services/geminiAiService';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const GeminiAiWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'm1', sender: 'ai', text: 'Hello! I am **AI Agricultural Assistant** 🤖. Ask me anything about crop prices, demand trends, harvest advisory, or smart logistics!' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { language } = useLanguage();

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userMsg = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const aiReply = await askGeminiAI(query, user?.role || 'farmer', language);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiReply }]);
        } catch (err) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: 'Sorry, I encountered an issue fetching AI data. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const QUICK_PROMPTS = [
        'Nashik Tomato Mandi price trend?',
        'Agra Potato 7-day demand forecast',
        'How to list fresh produce directly?',
        'Logistics route distance calculator'
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-900 text-white font-bold px-4.5 py-3 rounded-full shadow-2xl hover:shadow-emerald-900/30 flex items-center gap-2 transform hover:scale-105 transition-all group border-2 border-white cursor-pointer"
                >
                    <div className="relative">
                        <Bot className="w-6 h-6 animate-pulse text-amber-300" />
                        <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold">AI Assistant 🤖</span>
                </button>
            ) : (
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-white/15 p-2 rounded-xl backdrop-blur-sm">
                                <Bot className="w-5 h-5 text-amber-300" />
                            </div>
                            <div>
                                <h3 className="font-black text-sm flex items-center gap-1.5">
                                    AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
                                </h3>
                                <p className="text-[10px] text-emerald-100 font-medium">Real-time Agricultural Intelligence API</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-emerald-950/90 text-xs">
                        {messages.map((m) => {
                            const isAi = m.sender === 'ai';
                            const lowerText = (m.text || '').toLowerCase();
                            
                            let navAction = null;
                            if (isAi) {
                                if (lowerText.includes('marketplace') || lowerText.includes('crop prices') || lowerText.includes('tamatar') || lowerText.includes('tomato') || lowerText.includes('onion')) {
                                    navAction = { label: '🛒 Browse Marketplace', path: '/marketplace' };
                                } else if (lowerText.includes('logistics') || lowerText.includes('driver') || lowerText.includes('route')) {
                                    navAction = { label: '🚚 Driver Partner Portal', path: '/logistics/driver-partner' };
                                } else if (lowerText.includes('trend') || lowerText.includes('forecast')) {
                                    navAction = { label: '📈 View Price Trends', path: '/farmer/insights' };
                                } else if (lowerText.includes('list') || lowerText.includes('add produce') || lowerText.includes('sell')) {
                                    navAction = { label: '➕ Add Produce', path: '/farmer/add-produce' };
                                } else if (lowerText.includes('setting') || lowerText.includes('language')) {
                                    navAction = { label: '⚙️ Open Settings', path: '/settings' };
                                }
                            }

                            return (
                                <div
                                    key={m.id}
                                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${
                                            m.sender === 'user'
                                                ? 'bg-emerald-800 text-white font-medium rounded-br-none shadow-sm'
                                                : 'bg-white dark:bg-emerald-900 border border-gray-200 dark:border-emerald-700 text-gray-800 dark:text-emerald-100 rounded-bl-none shadow-sm whitespace-pre-wrap'
                                        }`}
                                    >
                                        {m.text}

                                        {navAction && (
                                            <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-emerald-800 flex justify-end">
                                                <button
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        window.location.href = navAction.path;
                                                    }}
                                                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-extrabold rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                                                >
                                                    <span>{navAction.label}</span> &rarr;
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-emerald-900 border border-gray-200 dark:border-emerald-700 text-gray-500 dark:text-emerald-200 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
                                    <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
                                    <span>AI Assistant is finding the best answer...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Prompts */}
                    <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto text-[10px]">
                        {QUICK_PROMPTS.map((p, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setInputText(p);
                                }}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full whitespace-nowrap font-bold transition"
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {/* Footer Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask AI Assistant about crops, market rates..."
                            className="flex-1 text-xs px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-medium"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white p-2 rounded-xl transition disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GeminiAiWidget;
