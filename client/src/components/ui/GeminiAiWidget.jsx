import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { askGeminiAI } from '../../services/geminiAiService';
import { useAuth } from '../../contexts/AuthContext';

export const GeminiAiWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'm1', sender: 'ai', text: 'Hello! I am **Gemini AI Agricultural Assistant** 🤖. Ask me anything about crop prices, demand trends, harvest advisory, or smart logistics!' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userMsg = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const aiReply = await askGeminiAI(query, user?.role || 'farmer');
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiReply }]);
        } catch (err) {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: 'Sorry, I encountered an issue fetching AI data. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:shadow-green-500/30 flex items-center gap-2 transform hover:scale-105 transition-all group border-2 border-white"
                >
                    <div className="relative">
                        <Bot className="w-6 h-6 animate-pulse" />
                        <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
                    </div>
                    <span className="text-sm">Ask Gemini AI 🤖</span>
                </button>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 h-[480px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Bot className="w-5 h-5 text-green-200" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                                    Gemini AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
                                </h3>
                                <p className="text-[10px] text-green-200">Real-time Agricultural Intelligence API</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-green-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-xs">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                                        m.sender === 'user'
                                            ? 'bg-green-600 text-white font-medium rounded-br-none shadow-sm'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm whitespace-pre-wrap'
                                    }`}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 text-gray-500 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
                                    <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                                    <span>Gemini AI is thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Prompts */}
                    <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto text-[10px]">
                        <button 
                            onClick={() => { setInputText('What is the Tomato demand trend?'); }} 
                            className="bg-green-50 text-green-700 hover:bg-green-100 font-semibold px-2 py-1 rounded-full whitespace-nowrap transition"
                        >
                            🍅 Tomato Prices
                        </button>
                        <button 
                            onClick={() => { setInputText('How to optimize onion logistics?'); }} 
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-2 py-1 rounded-full whitespace-nowrap transition"
                        >
                            🧅 Onion Logistics
                        </button>
                        <button 
                            onClick={() => { setInputText('Suggest top organic crops'); }} 
                            className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold px-2 py-1 rounded-full whitespace-nowrap transition"
                        >
                            🌾 Crop Advisory
                        </button>
                    </div>

                    {/* Input Footer */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask Gemini AI agricultural query..."
                            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputText.trim()}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white p-2 rounded-xl transition"
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
