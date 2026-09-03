import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, X, Sparkles, Loader2, Bot, Globe } from 'lucide-react';
import { askGeminiAI } from '../../services/geminiAiService';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';

export const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedLang, setSelectedLang] = useState('hi-IN');
    const [transcript, setTranscript] = useState('');
    const [responseMessage, setResponseMessage] = useState('अपनी भाषा चुनें और माइक दबाकर सवाल बोलें। Select language and speak.');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const SUPPORTED_LANGUAGES = [
        { code: 'hi-IN', name: 'हिन्दी (Hindi) 🇮🇳', promptLang: 'Hindi' },
        { code: 'en-IN', name: 'English (India) 🇮🇳', promptLang: 'English' },
        { code: 'mr-IN', name: 'मराठी (Marathi) 🚩', promptLang: 'Marathi' },
        { code: 'gu-IN', name: 'ગુજરાતી (Gujarati) 🌾', promptLang: 'Gujarati' },
        { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi) 🚜', promptLang: 'Punjabi' },
        { code: 'bn-IN', name: 'বাংলা (Bengali) 🌾', promptLang: 'Bengali' },
        { code: 'ta-IN', name: 'தமிழ் (Tamil) 🌴', promptLang: 'Tamil' },
        { code: 'te-IN', name: 'తెలుగు (Telugu) 🌽', promptLang: 'Telugu' },
        { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada) 🌻', promptLang: 'Kannada' },
        { code: 'ml-IN', name: 'മലയാളം (Malayalam) 🥥', promptLang: 'Malayalam' }
    ];

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = selectedLang;

            recognition.onstart = () => {
                setIsListening(true);
                setTranscript('Listening... (सुन रहा हूँ...)');
            };

            recognition.onresult = (event) => {
                let current = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    current += event.results[i][0].transcript;
                }
                setTranscript(current);

                if (event.results[0].isFinal) {
                    handleVoiceCommand(current);
                }
            };

            recognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
                setIsListening(false);
                setTranscript('');
                setResponseMessage('Voice recognition error. Please try tapping the microphone again.');
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, [selectedLang]);

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const cleanText = text.replace(/[*_#•🤖]/g, '').trim();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = selectedLang;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            const msg = 'Speech recognition not supported in this browser. Please use Google Chrome or Microsoft Edge.';
            setResponseMessage(msg);
            speakText(msg);
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setTranscript('');
            setResponseMessage('Listening for your voice command in ' + (SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name || selectedLang) + '...');
            try {
                recognitionRef.current.lang = selectedLang;
                recognitionRef.current.start();
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const handleVoiceCommand = async (commandText) => {
        const text = commandText.toLowerCase().trim();
        setIsProcessing(true);
        setResponseMessage('Analyzing voice request...');

        // 1. Universal Multilingual Navigation Keywords
        if (
            text.includes('marketplace') || text.includes('मार्केटप्लेस') || text.includes('मार्किटप्लेस') || 
            text.includes('बाज़ार') || text.includes('ખરીદો') || text.includes('சந்தை') || text.includes('చbuying')
        ) {
            const reply = 'Navigating to direct AgroConnect Marketplace.';
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/marketplace'); }, 1200);
            setIsProcessing(false);
            return;
        }

        if (
            text.includes('dashboard') || text.includes('डैशबोर्ड') || text.includes('home') || 
            text.includes('होम') || text.includes('मुख्य पृष्ठ')
        ) {
            const dashPath = user?.role ? getRoleDashboardPath(user.role) : '/';
            const reply = `Navigating to ${user?.role || 'user'} dashboard.`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(dashPath); }, 1200);
            setIsProcessing(false);
            return;
        }

        if (
            text.includes('add produce') || text.includes('add crop') || text.includes('फसल जोड़ो') || 
            text.includes('शेतमाल जोडा') || text.includes('પાક ઉમેરો') || text.includes('પાલ')
        ) {
            const reply = 'Opening Add Produce form for farmers.';
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/farmer/add-produce'); }, 1200);
            setIsProcessing(false);
            return;
        }

        if (
            text.includes('order') || text.includes('ऑर्डर') || text.includes('track') || 
            text.includes('ट्रैक') || text.includes('डिलिव्हरी')
        ) {
            const orderPath = user?.role === 'farmer' ? '/farmer/orders' : user?.role === 'logistics' ? '/logistics/deliveries' : '/consumer/orders';
            const reply = 'Opening orders and delivery tracking.';
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(orderPath); }, 1200);
            setIsProcessing(false);
            return;
        }

        if (
            text.includes('map') || text.includes('मैप') || text.includes('route') || 
            text.includes('नक्शा') || text.includes('रास्ता') || text.includes('मार्ग')
        ) {
            const reply = 'Opening Live Google Logistics Map.';
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/logistics/map'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 2. Multilingual Search Commands (e.g. "search tomato", "टमाटर खोजो", "कांदा शोधा")
        if (text.includes('search') || text.includes('find') || text.includes('खोजो') || text.includes('ढूंढो') || text.includes('शोधा')) {
            const cropMatch = text.replace(/(search|find|for|produce|crop|खोजो|ढूंढो|दिखाओ|शोधा)/gi, '').trim();
            const reply = `Searching marketplace for ${cropMatch || 'produce'}.`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(`/marketplace?q=${encodeURIComponent(cropMatch)}`); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 3. Agricultural & Mandi Price AI Query via Gemini API in Target Selected Language
        try {
            const activeLangName = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.promptLang || 'Hindi';
            const promptWithLang = `Please respond to this agricultural request in ${activeLangName} language: "${commandText}"`;
            
            const aiResult = await askGeminiAI(promptWithLang, user?.role || 'farmer');
            setResponseMessage(aiResult);
            speakText(aiResult);
        } catch (err) {
            const errReply = 'Sorry, could not process voice request. Please try again.';
            setResponseMessage(errReply);
            speakText(errReply);
        } finally {
            setIsProcessing(false);
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 flex items-center gap-2 transform hover:scale-105 transition-all group border-2 border-white"
                    title="Open Multilingual AgroVoice Assistant"
                >
                    <div className="relative">
                        <Mic className="w-5 h-5 animate-pulse text-amber-300" />
                    </div>
                    <span className="text-sm font-bold">Multilingual Voice AI 🎤</span>
                </button>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1">
                                    AgroVoice Multilingual <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-semibold">10+ Regional Indian Languages</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => { stopSpeaking(); setIsOpen(false); }}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Language Selector Dropdown */}
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                        <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                        <select 
                            value={selectedLang} 
                            onChange={(e) => setSelectedLang(e.target.value)}
                            className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                        >
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mic Visualizer */}
                    <div className="flex flex-col items-center justify-center py-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 relative">
                        <button
                            onClick={toggleListening}
                            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
                                isListening 
                                    ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-200' 
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-4 ring-emerald-100'
                            }`}
                        >
                            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                        </button>

                        <p className="text-xs font-bold text-gray-700 mt-3 text-center">
                            {isListening ? 'Listening... Speak Now (बोलिए)' : 'Tap Microphone to Speak'}
                        </p>

                        {transcript && (
                            <div className="mt-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-800 max-w-[90%] truncate shadow-sm">
                                "{transcript}"
                            </div>
                        )}
                    </div>

                    {/* Voice Feedback / Response Box */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 min-h-[110px] max-h-[160px] overflow-y-auto text-xs leading-relaxed text-gray-800">
                        {isProcessing ? (
                            <div className="flex items-center gap-2 text-purple-700 font-semibold py-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Processing query via Gemini AI...</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Voice Response</span>
                                    {isSpeaking && (
                                        <button onClick={stopSpeaking} className="text-red-500 font-bold flex items-center gap-1 text-[10px]">
                                            <Volume2 className="w-3 h-3 animate-bounce" /> Stop Audio
                                        </button>
                                    )}
                                </div>
                                <p className="whitespace-pre-wrap font-medium">{responseMessage}</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Voice Command Tips */}
                    <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Try Spoken Commands:</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                            <button onClick={() => handleVoiceCommand('Open Marketplace')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🛒 "Marketplace"
                            </button>
                            <button onClick={() => handleVoiceCommand('Tomato demand forecast')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🍅 "Tomato Demand"
                            </button>
                            <button onClick={() => handleVoiceCommand('Add produce')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🌾 "Add Produce"
                            </button>
                            <button onClick={() => handleVoiceCommand('Open Logistics Map')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🗺️ "Open Map"
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;
