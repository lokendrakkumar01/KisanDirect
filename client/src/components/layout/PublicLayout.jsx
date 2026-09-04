import React from 'react';
import { PublicNav } from './PublicNav';
import { Footer } from './Footer';
import { VoiceAssistant } from '../ui/VoiceAssistant';
import { GeminiAiWidget } from '../ui/GeminiAiWidget';

export const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <PublicNav />
            <main className="flex-grow">
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
