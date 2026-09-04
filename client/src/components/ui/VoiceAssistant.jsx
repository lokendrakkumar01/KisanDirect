import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, X, Sparkles, Loader2, Bot, Globe, Send } from 'lucide-react';
import { askGeminiAI } from '../../services/geminiAiService';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';

export const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedLang, setSelectedLang] = useState('hi-IN');
    const [transcript, setTranscript] = useState('');
    const [manualText, setManualText] = useState('');
    const [responseMessage, setResponseMessage] = useState('अपनी पसंदीदा भाषा चुनें, माइक पर क्लिक करें और बोलें। Select language and click mic to speak.');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    const recognitionRef = useRef(null);
    const transcriptRef = useRef('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const SUPPORTED_LANGUAGES = [
        { code: 'hi-IN', name: 'हिन्दी (Hindi) 🇮🇳', promptLang: 'Hindi', navConfirmation: 'मार्केटप्लेस पर जा रहे हैं।' },
        { code: 'en-IN', name: 'English (India) 🇮🇳', promptLang: 'English', navConfirmation: 'Navigating to your requested page.' },
        { code: 'mr-IN', name: 'मराठी (Marathi) 🚩', promptLang: 'Marathi', navConfirmation: 'तुमच्या विनंतीनुसार नवीन पृष्ठावर जात आहे.' },
        { code: 'gu-IN', name: 'ગુજરાતી (Gujarati) 🌾', promptLang: 'Gujarati', navConfirmation: 'નવા પૃષ્ઠ પર જઈ રહ્યા છીએ.' },
        { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi) 🚜', promptLang: 'Punjabi', navConfirmation: 'ਤੁਹਾਡੇ ਕਹੇ ਪੰਨੇ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।' },
        { code: 'bn-IN', name: 'বাংলা (Bengali) 🌾', promptLang: 'Bengali', navConfirmation: 'নতুন পৃষ্ঠায় যাচ্ছি।' },
        { code: 'ta-IN', name: 'தமிழ் (Tamil) 🌴', promptLang: 'Tamil', navConfirmation: 'புதிய பக்கத்திற்கு செல்கிறது.' },
        { code: 'te-IN', name: 'తెలుగు (Telugu) 🌽', promptLang: 'Telugu', navConfirmation: 'కొత్త పేజీకి వెళ్తోంది.' },
        { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada) 🌻', promptLang: 'Kannada', navConfirmation: 'ಹೊಸ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ.' },
        { code: 'ml-IN', name: 'മലയാളം (Malayalam) 🥥', promptLang: 'Malayalam', navConfirmation: 'പുതിയ പേജിലേക്ക് പോകുന്നു.' }
    ];

    // Pre-load synthesis voices
    useEffect(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = selectedLang;

            recognition.onstart = () => {
                setIsListening(true);
                transcriptRef.current = '';
                setTranscript('Listening... (बोलिए...)');
            };

            recognition.onresult = (event) => {
                let current = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    current += event.results[i][0].transcript;
                }
                if (current.trim()) {
                    setTranscript(current);
                    transcriptRef.current = current;
                }
            };

            recognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
                setIsListening(false);
                if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                    setResponseMessage('Microphone access denied. Please allow microphone permissions in your browser bar.');
                } else if (event.error === 'no-speech') {
                    setResponseMessage('No speech detected. Please tap the microphone and speak clearly.');
                } else {
                    setResponseMessage(`Voice error (${event.error}). Tap microphone to try again or type below.`);
                }
            };

            recognition.onend = () => {
                setIsListening(false);
                if (transcriptRef.current.trim()) {
                    handleVoiceCommand(transcriptRef.current);
                }
            };

            recognitionRef.current = recognition;
        }
    }, [selectedLang]);

    const speakText = (text) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop current speech

        const cleanText = text.replace(/[*_#•🤖]/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = selectedLang;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        // Find browser voice matching current language
        const voices = window.speechSynthesis.getVoices();
        const langPrefix = selectedLang.split('-')[0];
        const matchVoice = voices.find(v => v.lang === selectedLang || v.lang.startsWith(langPrefix));
        if (matchVoice) {
            utterance.voice = matchVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            const msg = 'Speech recognition not supported in this browser. Please use Chrome or Edge, or type your query below.';
            setResponseMessage(msg);
            speakText(msg);
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {}
            setIsListening(false);
            if (transcriptRef.current.trim()) {
                handleVoiceCommand(transcriptRef.current);
            }
        } else {
            setTranscript('');
            transcriptRef.current = '';
            const langObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang);
            setResponseMessage(`Listening in ${langObj?.name}... Speak your command now.`);
            try {
                recognitionRef.current.lang = selectedLang;
                recognitionRef.current.start();
            } catch (err) {
                console.warn('Start error:', err);
                try {
                    recognitionRef.current.stop();
                    setTimeout(() => recognitionRef.current.start(), 200);
                } catch (e2) {}
            }
        }
    };

    const handleVoiceCommand = async (commandText) => {
        if (!commandText || !commandText.trim()) return;
        const text = commandText.toLowerCase().trim();
        setIsProcessing(true);
        setResponseMessage(`Recognized: "${commandText}" - Processing...`);

        const langObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang);
        const navMsg = langObj?.navConfirmation || 'Opening page...';

        // 1. Marketplace Navigation
        if (
            text.includes('marketplace') || text.includes('मार्केटप्लेस') || text.includes('मार्किटप्लेस') || 
            text.includes('बाज़ार') || text.includes('ખરીદો') || text.includes('சந்தை') || text.includes('చbuying') ||
            text.includes('મંડી') || text.includes('मंडी') || text.includes('फसल खरीदें')
        ) {
            const reply = `${navMsg} (Opening Marketplace)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/marketplace'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 2. Dashboard Navigation
        if (
            text.includes('dashboard') || text.includes('डैशबोर्ड') || text.includes('home') || 
            text.includes('होम') || text.includes('मुख्य पृष्ठ') || text.includes('ડેશબોર્ડ')
        ) {
            const dashPath = user?.role ? getRoleDashboardPath(user.role) : '/';
            const reply = `${navMsg} (Opening Dashboard)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(dashPath); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 3. Add Produce / Listing Navigation
        if (
            text.includes('add produce') || text.includes('add crop') || text.includes('फसल जोड़ो') || 
            text.includes('शेतमाल जोडा') || text.includes('પાક ઉમેરો') || text.includes('बेचो') || text.includes('सेल') || text.includes('फसल बेचो')
        ) {
            const reply = `${navMsg} (Opening Add Produce)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/farmer/add-produce'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 4. Orders & Deliveries Tracking
        if (
            text.includes('order') || text.includes('ऑर्डर') || text.includes('track') || 
            text.includes('ट्रैक') || text.includes('डिलिव्हरी') || text.includes('ઓર્ડર')
        ) {
            const orderPath = user?.role === 'farmer' ? '/farmer/orders' : user?.role === 'logistics' ? '/logistics/deliveries' : '/consumer/orders';
            const reply = `${navMsg} (Opening Orders)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(orderPath); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 5. Logistics Map Navigation
        if (
            text.includes('map') || text.includes('मैप') || text.includes('route') || 
            text.includes('नक्शा') || text.includes('रास्ता') || text.includes('मार्ग') || text.includes('નકશો')
        ) {
            const reply = `${navMsg} (Opening Map)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/logistics/map'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 6. AI Insights Navigation
        if (text.includes('insight') || text.includes('सलाह') || text.includes('भाव पूर्वानुमान') || text.includes('ai')) {
            const reply = `${navMsg} (Opening AI Insights)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/farmer/insights'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 7. Cart Navigation
        if (text.includes('cart') || text.includes('कार्ट') || text.includes('झोला') || text.includes('टोकरी')) {
            const reply = `${navMsg} (Opening Cart)`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate('/consumer/cart'); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 8. Search Command (e.g., "search tomato", "टमाटर खोजो", "कांदा शोधा")
        if (text.includes('search') || text.includes('find') || text.includes('खोजो') || text.includes('ढूंढो') || text.includes('शोधा')) {
            const cropMatch = text.replace(/(search|find|for|produce|crop|खोजो|ढूंढो|दिखाओ|शोधा)/gi, '').trim();
            const reply = `${navMsg} (Searching ${cropMatch || 'produce'})`;
            setResponseMessage(reply);
            speakText(reply);
            setTimeout(() => { setIsOpen(false); navigate(`/marketplace?q=${encodeURIComponent(cropMatch)}`); }, 1200);
            setIsProcessing(false);
            return;
        }

        // 9. Agricultural AI Query via Gemini API in Target Selected Language
        try {
            const activeLangName = langObj?.promptLang || 'Hindi';
            const promptWithLang = `Please answer this agricultural request strictly in ${activeLangName} language: "${commandText}"`;
            
            const aiResult = await askGeminiAI(promptWithLang, user?.role || 'farmer');
            setResponseMessage(aiResult);
            speakText(aiResult);
        } catch (err) {
            const errReply = 'Could not process voice query. Please try again.';
            setResponseMessage(errReply);
            speakText(errReply);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!manualText.trim()) return;
        handleVoiceCommand(manualText.trim());
        setManualText('');
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
                    <span className="text-sm font-bold">Voice AI 🎤</span>
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
                                    AgroVoice AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-semibold">Native Speech Audio Synthesis</p>
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
                    <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                        <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                        <select 
                            value={selectedLang} 
                            onChange={(e) => {
                                setSelectedLang(e.target.value);
                                setResponseMessage(`Switched language to ${SUPPORTED_LANGUAGES.find(l => l.code === e.target.value)?.name}`);
                            }}
                            className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                        >
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mic Visualizer Button */}
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
                                <span>Processing command via Gemini AI...</span>
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

                    {/* Text Fallback Input Bar */}
                    <form onSubmit={handleManualSubmit} className="flex gap-2">
                        <input 
                            type="text" 
                            value={manualText}
                            onChange={(e) => setManualText(e.target.value)}
                            placeholder="Or type voice command here..."
                            className="flex-1 text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                        <button 
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl flex items-center justify-center transition"
                        >
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </form>

                    {/* Quick Voice Navigation Buttons */}
                    <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Quick Navigation Shortcuts:</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                            <button onClick={() => handleVoiceCommand('Open Marketplace')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🛒 "Marketplace"
                            </button>
                            <button onClick={() => handleVoiceCommand('Add produce')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🌾 "Add Produce"
                            </button>
                            <button onClick={() => handleVoiceCommand('Open Dashboard')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                📊 "Dashboard"
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
