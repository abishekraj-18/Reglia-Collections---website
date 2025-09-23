
import React from 'react';

interface IconProps {
  isActive: boolean;
}

const CategoriesIcon: React.FC<IconProps> = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary'}`}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
    <rect x="14" y="3" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
    <rect x="3" y="14" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
    <rect x="14" y="14" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
  </svg>
);

export default CategoriesIcon;
