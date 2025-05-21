import React from 'react';

interface SkillBadgeProps {
  skill: string;
  variant?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  variant = 'primary',
  onClick,
}) => {
  const baseClasses = 'badge inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
  };
  
  const clickableClasses = onClick ? 'cursor-pointer hover:bg-opacity-80' : '';
  
  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${clickableClasses}`}
      onClick={onClick}
    >
      {skill}
    </span>
  );
};

export default SkillBadge;