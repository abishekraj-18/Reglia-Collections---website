
import React from 'react';

interface IconProps {
  isActive: boolean;
}

const CartIcon: React.FC<IconProps> = ({ isActive }) => (
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
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" 
    fill={isActive ? 'currentColor' : 'none'}/>
  </svg>
);

export default CartIcon;
