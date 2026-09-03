import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  totalReviews?: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({ value, totalReviews, readOnly = true, onChange, size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <button
        key={i}
        disabled={readOnly}
        onClick={() => onChange && onChange(i)}
        className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'} focus:outline-none`}
      >
        <Star
          className={`${sizes[size]} ${i <= value ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
        />
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">{stars}</div>
      {totalReviews !== undefined && (
        <span className="text-sm text-gray-500">
          ({totalReviews})
        </span>
      )}
    </div>
  );
};
