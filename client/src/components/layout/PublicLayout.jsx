import React from 'react';
import { PublicNav } from './PublicNav';
import { Footer } from './Footer';
import { VoiceAssistant } from '../ui/VoiceAssistant';

export const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <PublicNav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <VoiceAssistant />
        </div>
    );
};
