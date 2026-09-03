import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { GeminiAiWidget } from '../ui/GeminiAiWidget';

export const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden relative">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
            <div className="flex-1 flex flex-col w-0 overflow-hidden">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)}/>
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
            {/* Gemini AI Floating Assistant */}
            <GeminiAiWidget />
        </div>
    );
};
