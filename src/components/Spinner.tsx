import React from 'react';
import type { SpinnerProps } from '@/types';

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`${sizeClasses[size]} border-4 border-sky-500 border-solid border-t-transparent rounded-full animate-spin ${className}`}
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default Spinner;
