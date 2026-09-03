import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message, dismissible = false, className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-400" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-400" />
    }
  };

  const style = styles[type];

  return (
    <div className={`p-4 rounded-lg border flex items-start ${style.bg} ${style.border} ${className}`}>
      <div className="flex-shrink-0 mr-3">
        {style.icon}
      </div>
      <div className="flex-1">
        {title && <h3 className={`text-sm font-medium mb-1 ${style.text}`}>{title}</h3>}
        <div className={`text-sm ${style.text} opacity-90`}>{message}</div>
      </div>
      {dismissible && (
        <div className="ml-3 flex-shrink-0">
          <button
            onClick={() => setIsVisible(false)}
            className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-80 transition-opacity ${style.text} ${style.bg}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
