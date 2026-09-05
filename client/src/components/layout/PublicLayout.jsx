import React from 'react';
import { PublicNav } from './PublicNav';
import { Footer } from './Footer';
import { VoiceAssistant } from '../ui/VoiceAssistant';
import { GeminiAiWidget } from '../ui/GeminiAiWidget';

export const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-emerald-950/40 text-gray-900 dark:text-emerald-100 flex flex-col relative transition-colors duration-300">
            <PublicNav />
            <main className="flex-grow pb-20">
                {children}
            </main>
            <Footer />
            {/* Multilingual Voice Assistant (Bottom Left) */}
            <VoiceAssistant />
            {/* AI Assistant Chat Widget (Bottom Right) */}
            <GeminiAiWidget />
        </div>
    );
};
