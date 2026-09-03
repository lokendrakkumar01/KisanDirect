import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <Loader2 className={`${sizes[size]} animate-spin text-green-600 ${className}`} />
  );
};

export const LoadingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="lg" />
    <p className="mt-4 text-gray-500 font-medium">Loading...</p>
  </div>
);

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);
