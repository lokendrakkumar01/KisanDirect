import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, X, Sparkles, Loader2, Bot, Globe, Send } from 'lucide-react';
import { askGeminiAI } from '../../services/geminiAiService';
import { getPriceIntelligence } from '../../services/aiService';
import { useAuth, getRoleDashboardPath } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const CROP_ALIASES = [
    { value: 'tomato', terms: ['tomato', 'tamatar', 'टमाटर'] },
    { value: 'onion', terms: ['onion', 'pyaz', 'pyaaz', 'प्याज', 'प्याज़'] },
    { value: 'potato', terms: ['potato', 'aloo', 'आलू'] },
    { value: 'wheat', terms: ['wheat', 'gehun', 'गेहूं', 'गेहूँ'] },
    { value: 'rice', terms: ['rice', 'chawal', 'चावल'] },
    { value: 'grapes', terms: ['grape', 'grapes', 'angoor', 'अंगूर'] },
    { value: 'mango', terms: ['mango', 'aam', 'आम'] },
];

const findCrop = (text) => {
    const match = CROP_ALIASES.find(({ terms }) => terms.some((term) => text.includes(term)));
    return match?.value || '';
};

const isHindiVoice = (selectedLang) => selectedLang.startsWith('hi');

const WEBSITE_COMMANDS = [
    { path: '/marketplace', terms: ['marketplace', 'market place', 'बाजार', 'बाज़ार', 'मंडी', 'market kholo', 'बाजार खोलो'] },
    { path: '/how-it-works', terms: ['how it works', 'how does it work', 'कैसे काम करता', 'कैसे काम करती', 'जानकारी'] },
    { path: '/about', terms: ['about', 'हमारे बारे में', 'हम कौन हैं'] },
    { path: '/settings', terms: ['settings', 'setting', 'सेटिंग', 'सेटिंग्स', 'प्राथमिकता'] },
    { path: '/notifications', terms: ['notification', 'notifications', 'सूचना', 'सूचनाएं', 'नोटिफिकेशन'] },
    { path: '/reviews', terms: ['reviews', 'review', 'रेटिंग', 'समीक्षा'] },
    { path: '/farmer/listings', terms: ['my listings', 'my produce', 'मेरी लिस्टिंग', 'मेरी फसल', 'मेरी उपज'] },
    { path: '/farmer/earnings', terms: ['earnings', 'income', 'कमाई', 'आय'] },
    { path: '/farmer/profile', terms: ['my profile', 'profile', 'प्रोफाइल', 'मेरी प्रोफाइल'] },
    { path: '/buyer/find', terms: ['find produce', 'find crop', 'उपज खोजो', 'फसल खोजो', 'produce ढूंढो'] },
    { path: '/buyer/requirements/new', terms: ['post requirement', 'new requirement', 'जरूरत पोस्ट', 'आवश्यकता पोस्ट'] },
    { path: '/buyer/offers', terms: ['offers', 'offer', 'ऑफर', 'प्रस्ताव'] },
    { path: '/fpo/members', terms: ['fpo members', 'members', 'सदस्य', 'किसान सदस्य'] },
    { path: '/fpo/inventory', terms: ['inventory', 'stock', 'इन्वेंटरी', 'स्टॉक'] },
    { path: '/logistics/deliveries', terms: ['deliveries', 'delivery', 'डिलीवरी', 'डिलिवरी'] },
    { path: '/logistics/routes', terms: ['route optimization', 'optimize route', 'रूट ऑप्टिमाइज', 'मार्ग अनुकूलन'] },
    { path: '/logistics/vehicles', terms: ['vehicles', 'vehicle', 'गाड़ियां', 'वाहन'] },
    { path: '/logistics/drivers', terms: ['drivers', 'driver list', 'ड्राइवर', 'चालक'] },
    { path: '/admin/users', terms: ['user management', 'users', 'उपयोगकर्ता'] },
    { path: '/admin/analytics', terms: ['admin analytics', 'admin reports', 'एडमिन रिपोर्ट'] },
];

const findWebsiteCommand = (text) => WEBSITE_COMMANDS.find(({ terms }) => terms.some((term) => text.includes(term)));

const ROLE_COMMANDS = [
    { role: 'farmer', terms: ['farmer', 'किसान', 'फार्मर'], dashboard: '/farmer/dashboard' },
    { role: 'consumer', terms: ['consumer', 'ग्राहक', 'उपभोक्ता'], dashboard: '/consumer/dashboard' },
    { role: 'bulk_buyer', terms: ['buyer', 'bulk buyer', 'खरीदार', 'थोक खरीदार'], dashboard: '/buyer/dashboard' },
    { role: 'fpo', terms: ['fpo', 'एफपीओ'], dashboard: '/fpo/dashboard' },
    { role: 'logistics', terms: ['logistics', 'driver', 'ड्राइवर', 'परिवहन'], dashboard: '/logistics/dashboard' },
    { role: 'admin', terms: ['admin', 'administrator', 'व्यवस्थापक', 'एडमिन'], dashboard: '/admin/dashboard', login: '/admin/login' },
];

const findRoleCommand = (text) => ROLE_COMMANDS.find(({ terms }) => terms.some((term) => text.includes(term)));

export const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedLang, setSelectedLang] = useState(() => (
        localStorage.getItem('agroconnect_language') === 'en' ? 'en-IN' : 'hi-IN'
    ));
    const [transcript, setTranscript] = useState('');
    const [manualText, setManualText] = useState('');
    const [responseMessage, setResponseMessage] = useState(() => (
        localStorage.getItem('agroconnect_language') === 'en'
            ? 'Select your language, click the microphone, and speak.'
            : 'अपनी पसंदीदा भाषा चुनें, माइक्रोफ़ोन पर क्लिक करें और बोलें।'
    ));
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    const recognitionRef = useRef(null);
    const transcriptRef = useRef('');
    const submittedTranscriptRef = useRef('');
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { language } = useLanguage();
    const isHindi = selectedLang === 'hi-IN';
    const uiText = isHindi ? {
        welcome: 'अपनी पसंदीदा भाषा चुनें, माइक्रोफ़ोन पर क्लिक करें और बोलें।',
        openTitle: 'बहुभाषी कृषि आवाज़ सहायक खोलें',
        assistant: 'कृषि आवाज़ सहायक',
        speech: 'आवाज़ में उत्तर देने की सुविधा',
        listening: 'सुन रहा हूँ... अभी बोलिए',
        speak: 'बोलने के लिए माइक्रोफ़ोन दबाएँ',
        processing: 'आदेश संसाधित हो रहा है...',
        response: 'आवाज़ में उत्तर',
        stop: 'आवाज़ रोकें',
        type: 'या अपना आदेश यहाँ लिखें...',
        shortcuts: 'त्वरित पृष्ठ शॉर्टकट',
        marketplace: 'बाज़ार',
        addProduce: 'उपज जोड़ें',
        dashboard: 'डैशबोर्ड',
        map: 'मानचित्र खोलें',
    } : {
        welcome: 'Select your language, click the microphone, and speak.',
        openTitle: 'Open multilingual AgroVoice Assistant',
        assistant: 'AgroVoice Assistant',
        speech: 'Voice response enabled',
        listening: 'Listening... Speak now',
        speak: 'Tap the microphone to speak',
        processing: 'Processing your command...',
        response: 'Voice response',
        stop: 'Stop audio',
        type: 'Or type your command here...',
        shortcuts: 'Quick page shortcuts',
        marketplace: 'Marketplace',
        addProduce: 'Add Produce',
        dashboard: 'Dashboard',
        map: 'Open Map',
    };

    useEffect(() => {
        setSelectedLang(language === 'hi' ? 'hi-IN' : 'en-IN');
    }, [language]);

    useEffect(() => {
        setResponseMessage(uiText.welcome);
    }, [selectedLang]);

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
            // Finish one command as soon as the browser detects the final phrase.
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = selectedLang;

            recognition.onstart = () => {
                setIsListening(true);
                transcriptRef.current = '';
                setTranscript(isHindi ? 'सुन रहा हूँ... बोलिए...' : 'Listening... Speak now...');
            };

            recognition.onresult = (event) => {
                let current = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    current += event.results[i][0].transcript;
                }
                if (current.trim()) {
                    setTranscript(current);
                    transcriptRef.current = current;
                    if (event.results[event.resultIndex]?.isFinal && current.trim() !== submittedTranscriptRef.current) {
                        submittedTranscriptRef.current = current.trim();
                        handleVoiceCommand(current.trim());
                    }
                }
            };

            recognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
                setIsListening(false);
                if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                    setResponseMessage('Microphone access denied. Please allow microphone permissions in your browser bar.');
                } else if (event.error === 'no-speech') {
                    setResponseMessage(isHindi ? 'आवाज़ सुनाई नहीं दी। माइक्रोफ़ोन दबाकर साफ़ बोलिए।' : 'No speech detected. Tap the microphone and speak clearly.');
                } else {
                    setResponseMessage(isHindi
                        ? `आवाज़ में समस्या (${event.error})। माइक्रोफ़ोन दबाकर फिर कोशिश करें या नीचे लिखें।`
                        : `Voice error (${event.error}). Tap the microphone to try again or type below.`);
                }
            };

            recognition.onend = () => {
                setIsListening(false);
                if (
                    transcriptRef.current.trim() &&
                    transcriptRef.current.trim() !== submittedTranscriptRef.current
                ) {
                    submittedTranscriptRef.current = transcriptRef.current.trim();
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
            const msg = isHindi
                ? 'इस ब्राउज़र में आवाज़ पहचान सुविधा उपलब्ध नहीं है। कृपया Chrome या Edge इस्तेमाल करें, या नीचे अपना आदेश लिखें।'
                : 'Speech recognition is not supported in this browser. Please use Chrome or Edge, or type your command below.';
            setResponseMessage(msg);
            speakText(msg);
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {}
            setIsListening(false);
        } else {
            setTranscript('');
            transcriptRef.current = '';
            submittedTranscriptRef.current = '';
            setResponseMessage(isHindi ? 'हिंदी में सुन रहा हूँ... अपना आदेश बोलिए।' : 'Listening in English... Speak your command now.');
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
        setResponseMessage(isHindi ? `"${commandText}" समझ गया। आदेश पूरा कर रहा हूँ...` : `Recognized: "${commandText}". Processing...`);

        const navMsg = isHindi ? 'आपके बताए पृष्ठ पर जा रहे हैं।' : 'Opening the requested page.';

        const navigateFast = (path) => {
            setIsOpen(false);
            navigate(path);
        };

        // Logout is an auth action, so handle it before normal page matching.
        if (
            text === 'logout' || text === 'log out' || text === 'sign out' ||
            text.includes('लॉग आउट') || text.includes('लॉगआउट') ||
            text.includes('बाहर निकलो') || text.includes('साइन आउट')
        ) {
            const reply = isHindi
                ? 'आपको लॉग आउट किया जा रहा है।'
                : 'You are being logged out.';
            setResponseMessage(reply);
            speakText(reply);
            logout();
            navigateFast('/login');
            setIsProcessing(false);
            return;
        }

        const roleCommand = findRoleCommand(text);
        if (roleCommand || text === 'login' || text === 'log in' || text.includes('लॉगिन') || text.includes('लॉग इन')) {
            const requestedRole = roleCommand?.role || user?.role;
            const path = requestedRole
                ? (user?.role === requestedRole
                    ? (roleCommand?.dashboard || getRoleDashboardPath(requestedRole))
                    : (roleCommand?.login || `/login?role=${requestedRole}`))
                : '/login';
            const reply = isHindi
                ? `${requestedRole ? 'आपका' : ''} लॉगिन पृष्ठ खोला जा रहा है।`
                : `Opening the ${requestedRole || ''} login page.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast(path);
            setIsProcessing(false);
            return;
        }

        // Common website pages are handled locally for an immediate response.
        const websiteCommand = findWebsiteCommand(text);
        if (websiteCommand) {
            const reply = isHindiVoice(selectedLang)
                ? 'ठीक है, पेज खोल रहा हूँ।'
                : 'Sure, opening that page now.';
            setResponseMessage(reply);
            speakText(reply);
            navigateFast(websiteCommand.path);
            setIsProcessing(false);
            return;
        }

        // 1. Marketplace Navigation
        if (
            text.includes('marketplace') || text.includes('मार्केटप्लेस') || text.includes('मार्किटप्लेस') || 
            text.includes('बाज़ार') || text.includes('ખરીદો') || text.includes('சந்தை') || text.includes('చbuying') ||
            text.includes('મંડી') || text.includes('मंडी') || text.includes('फसल खरीदें')
        ) {
            const reply = isHindi ? `${navMsg} बाज़ार खोला जा रहा है।` : `${navMsg} Opening Marketplace.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast('/marketplace');
            setIsProcessing(false);
            return;
        }

        // 2. Dashboard Navigation
        if (
            text.includes('dashboard') || text.includes('डैशबोर्ड') || text.includes('home') || 
            text.includes('होम') || text.includes('मुख्य पृष्ठ') || text.includes('ડેશબોર્ડ')
        ) {
            const dashPath = user?.role ? getRoleDashboardPath(user.role) : '/';
            const reply = isHindi ? `${navMsg} डैशबोर्ड खोला जा रहा है।` : `${navMsg} Opening Dashboard.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast(dashPath);
            setIsProcessing(false);
            return;
        }

        // 3. Add Produce / Listing Navigation
        if (
            text.includes('add produce') || text.includes('add crop') || text.includes('फसल जोड़ो') || 
            text.includes('शेतमाल जोडा') || text.includes('પાક ઉમેરો') || text.includes('बेचो') || text.includes('सेल') || text.includes('फसल बेचो')
        ) {
            const reply = isHindi ? `${navMsg} उपज जोड़ने वाला पृष्ठ खोला जा रहा है।` : `${navMsg} Opening Add Produce.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast('/farmer/add-produce');
            setIsProcessing(false);
            return;
        }

        // 4. Orders & Deliveries Tracking
        if (
            text.includes('order') || text.includes('ऑर्डर') || text.includes('track') || 
            text.includes('ट्रैक') || text.includes('डिलिव्हरी') || text.includes('ઓર્ડર')
        ) {
            const orderPath = user?.role === 'farmer' ? '/farmer/orders' : user?.role === 'logistics' ? '/logistics/deliveries' : '/consumer/orders';
            const reply = isHindi ? `${navMsg} ऑर्डर खोले जा रहे हैं।` : `${navMsg} Opening Orders.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast(orderPath);
            setIsProcessing(false);
            return;
        }

        // 5. Logistics Map Navigation
        if (
            text.includes('map') || text.includes('मैप') || text.includes('नक्शा') ||
            text.includes('नक्शे') || text.includes('route') || text.includes('रास्ता') ||
            text.includes('मार्ग') || text.includes('नकશો') || text.includes('open map') ||
            text.includes('map open') || text.includes('map kholo') || text.includes('मैप खोलो') ||
            text.includes('नक्शा खोलो')
        ) {
            const reply = isHindi ? `${navMsg} मानचित्र खोला जा रहा है।` : `${navMsg} Opening Map.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast('/logistics/map');
            setIsProcessing(false);
            return;
        }

        // 6. Today's crop price from the backend price intelligence service.
        if (
            text.includes('today price') || text.includes("today's price") ||
            text.includes('price today') || text.includes('today rate') ||
            text.includes('current price') || text.includes('market price') ||
            text.includes('आज का भाव') || text.includes('आज का भाव बताओ') ||
            text.includes('आज का रेट') || text.includes('आज की कीमत') ||
            text.includes('मंडी भाव') || text.includes('भाव बताओ') ||
            text.includes('रेट बताओ') || text.includes('कीमत बताओ')
        ) {
            const crop = findCrop(text);
            const locationMatch = text.match(/(?:in|at|में|मे|के)\s+([a-z\u0900-\u097f ]+)/i);
            const location = locationMatch?.[1]?.trim() || 'Nashik';

            if (!crop) {
                const reply = isHindiVoice(selectedLang)
                    ? 'किस फसल का आज का भाव चाहिए? जैसे, टमाटर का आज का भाव।'
                    : 'Which crop price do you need? For example, today price of tomato.';
                setResponseMessage(reply);
                speakText(reply);
                setIsProcessing(false);
                return;
            }

            try {
                const result = await getPriceIntelligence(crop, location);
                const price = result?.data || result;
                const unit = price?.unit || 'kg';
                const reply = isHindiVoice(selectedLang)
                    ? `${crop} का आज का अनुमानित भाव ${price.suggestedMin} से ${price.suggestedMax} रुपये प्रति ${unit} है। सुझाया गया संदर्भ भाव ${price.recommendedReference} रुपये है।`
                    : `Today's ${crop} price in ${location} is estimated at ₹${price.suggestedMin} to ₹${price.suggestedMax} per ${unit}. The recommended reference price is ₹${price.recommendedReference}.`;
                setResponseMessage(reply);
                speakText(reply);
            } catch (err) {
                const reply = isHindiVoice(selectedLang)
                    ? 'आज का भाव प्राप्त नहीं हो सका। कृपया कुछ देर बाद फिर कोशिश करें।'
                    : 'I could not fetch today’s price right now. Please try again in a moment.';
                setResponseMessage(reply);
                speakText(reply);
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        // 7. AI Insights Navigation
        if (text.includes('insight') || text.includes('सलाह') || text.includes('भाव पूर्वानुमान') || text.includes('ai')) {
            const reply = isHindi ? `${navMsg} कृत्रिम बुद्धिमत्ता सलाह खोली जा रही है।` : `${navMsg} Opening AI Insights.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast('/farmer/insights');
            setIsProcessing(false);
            return;
        }

        // 8. Cart Navigation
        if (text.includes('cart') || text.includes('कार्ट') || text.includes('झोला') || text.includes('टोकरी')) {
            const reply = isHindi ? `${navMsg} कार्ट खोला जा रहा है।` : `${navMsg} Opening Cart.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast('/consumer/cart');
            setIsProcessing(false);
            return;
        }

        // 9. Search Command (e.g., "search tomato", "टमाटर खोजो")
        if (text.includes('search') || text.includes('find') || text.includes('खोजो') || text.includes('ढूंढो') || text.includes('शोधा')) {
            const cropMatch = text.replace(/(search|find|for|produce|crop|खोजो|ढूंढो|दिखाओ|शोधा)/gi, '').trim();
            const reply = isHindi
                ? `${navMsg} ${cropMatch || 'उपज'} खोजी जा रही है।`
                : `${navMsg} Searching ${cropMatch || 'produce'}.`;
            setResponseMessage(reply);
            speakText(reply);
            navigateFast(`/marketplace?q=${encodeURIComponent(cropMatch)}`);
            setIsProcessing(false);
            return;
        }

        // 10. Agricultural AI Query via Gemini API in Target Selected Language
        try {
            const activeLangName = isHindi ? 'Hindi' : 'English';
            const promptWithLang = `Please answer this agricultural request strictly in ${activeLangName} language: "${commandText}"`;
            
            const aiResult = await askGeminiAI(promptWithLang, user?.role || 'farmer', language);
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
                    title={uiText.openTitle}
                >
                    <div className="relative">
                        <Mic className="w-5 h-5 animate-pulse text-amber-300" />
                    </div>
                    <span className="text-sm font-bold">{isHindi ? 'आवाज़ सहायक 🎤' : 'Voice AI 🎤'}</span>
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
                                    {uiText.assistant} <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-semibold">{uiText.speech}</p>
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
                                const nextHindi = e.target.value === 'hi-IN';
                                setResponseMessage(nextHindi ? 'भाषा हिंदी में बदल दी गई है।' : 'Language changed to English.');
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
                            {isListening ? uiText.listening : uiText.speak}
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
                                <span>{uiText.processing}</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">{uiText.response}</span>
                                    {isSpeaking && (
                                        <button onClick={stopSpeaking} className="text-red-500 font-bold flex items-center gap-1 text-[10px]">
                                            <Volume2 className="w-3 h-3 animate-bounce" /> {uiText.stop}
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
                            placeholder={uiText.type}
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
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">{uiText.shortcuts}:</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                            <button onClick={() => handleVoiceCommand('Open Marketplace')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🛒 "{uiText.marketplace}"
                            </button>
                            <button onClick={() => handleVoiceCommand('Add produce')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🌾 "{uiText.addProduce}"
                            </button>
                            <button onClick={() => handleVoiceCommand('Open Dashboard')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                📊 "{uiText.dashboard}"
                            </button>
                            <button onClick={() => handleVoiceCommand('Open Logistics Map')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-md">
                                🗺️ "{uiText.map}"
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;
