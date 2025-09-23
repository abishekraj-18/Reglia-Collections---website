
import React from 'react';

interface IconProps {
  isActive: boolean;
}

const AccountIcon: React.FC<IconProps> = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary'}`}
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    fill={isActive ? 'currentColor' : 'none'}/>
  </svg>
);

export default AccountIcon;
