import React, { ReactNode } from 'react';
import { PublicNav } from './PublicNav';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
