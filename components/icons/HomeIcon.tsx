
import React from 'react';

interface IconProps {
  isActive: boolean;
}

const HomeIcon: React.FC<IconProps> = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary'}`}
  >
    <path
      d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.236L17.764 9H6.236L12 4.236zM17 18h-4v-4h-2v4H7v-7.368l5-4.545 5 4.545V18z"
      fill={isActive ? 'currentColor' : 'none'}
      stroke={isActive ? 'none' : 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {isActive && <path d="M11 14h2v4h-2z" fill="currentColor" />}
  </svg>
);

export default HomeIcon;
