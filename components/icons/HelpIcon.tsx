
import React from 'react';

interface IconProps {
  isActive: boolean;
}

const HelpIcon: React.FC<IconProps> = ({ isActive }) => (
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
    <circle cx="12" cy="12" r="10" fill={isActive ? 'currentColor' : 'none'}/>
    {!isActive && <circle cx="12" cy="12" r="10" />}
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={isActive ? 'white' : 'currentColor'}/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke={isActive ? 'white' : 'currentColor'}/>
  </svg>
);

export default HelpIcon;
