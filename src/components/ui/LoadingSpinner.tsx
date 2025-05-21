import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorMap = {
    primary: 'text-primary-600',
    white: 'text-white',
    gray: 'text-gray-600',
  };

  return (
    <div className="flex justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${
          sizeMap[size]
        } ${colorMap[color as keyof typeof colorMap] || 'text-primary-600'}`}
      />
    </div>
  );
};

export default LoadingSpinner;