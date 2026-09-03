import React from 'react';
import { PublicNav } from './PublicNav';
import { Footer } from './Footer';
export const PublicLayout = ({ children }) => {
    return (<div className="min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>);
};
