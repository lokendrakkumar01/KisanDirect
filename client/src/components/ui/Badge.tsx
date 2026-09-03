import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'default' | 'destructive' | 'primary' | 'secondary' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral', 
  dot = false,
  className = ''
}) => {
  const normalizedVariant = 
    variant === 'default' ? 'neutral' : 
    variant === 'destructive' ? 'danger' : 
    variant === 'primary' ? 'info' :
    variant === 'secondary' ? 'neutral' :
    variant === 'outline' ? 'neutral' :
    variant;

  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800'
  };

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-500'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[normalizedVariant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[normalizedVariant]}`}></span>
      )}
      {children}
    </span>
  );
};
