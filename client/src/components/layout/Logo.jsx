import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Logo = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: { icon: 'w-5 h-5', text: 'text-lg' },
        md: { icon: 'w-7 h-7', text: 'text-2xl' },
        lg: { icon: 'w-10 h-10', text: 'text-4xl' }
    };
    return (<Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-green-600 p-1.5 rounded-lg">
        <Leaf className={`${sizes[size].icon} text-white`}/>
      </div>
      <span className={`font-bold text-gray-900 tracking-tight ${sizes[size].text}`}>
        Kisan<span className="text-green-600">Direct</span>
      </span>
    </Link>);
};
