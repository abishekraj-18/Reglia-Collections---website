import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import HomeIcon from './icons/HomeIcon';
import CategoriesIcon from './icons/CategoriesIcon';
import AccountIcon from './icons/AccountIcon';
import HelpIcon from './icons/HelpIcon';
import CartIcon from './icons/CartIcon';

interface NavItemProps {
  label: string;
  page: Page;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

const NavItem: React.FC<{ page: Page, label: string, IconComponent: React.ElementType }> = ({ page, label, IconComponent }) => {
    const { activePage, setActivePage } = useAppContext();
    const isActive = activePage === page;
    
    return (
        <button
            onClick={() => setActivePage(page)}
            className="flex flex-col items-center justify-center w-full pt-2 pb-1 focus:outline-none"
        >
            <IconComponent isActive={isActive} />
            <span className={`text-xs mt-1 ${isActive ? 'text-primary font-semibold' : 'text-secondary dark:text-slate-400'}`}>
                {label}
            </span>
        </button>
    );
};

const CartNavItem: React.FC = () => {
    const { activePage, setActivePage, cartCount } = useAppContext();
    const isActive = activePage === Page.Cart;

    return (
         <button
            onClick={() => setActivePage(Page.Cart)}
            className="relative flex flex-col items-center justify-center w-full pt-2 pb-1 focus:outline-none"
        >
            {cartCount > 0 && (
                 <div className="absolute top-0 right-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {cartCount}
                </div>
            )}
            <CartIcon isActive={isActive} />
            <span className={`text-xs mt-1 ${isActive ? 'text-primary font-semibold' : 'text-secondary dark:text-slate-400'}`}>
                Cart
            </span>
        </button>
    )
}

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-top z-50 md:hidden max-w-7xl mx-auto dark:bg-slate-800 dark:border-slate-700">
      <NavItem page={Page.Home} label="Home" IconComponent={HomeIcon} />
      <NavItem page={Page.Categories} label="Categories" IconComponent={CategoriesIcon} />
      <NavItem page={Page.Account} label="Account" IconComponent={AccountIcon} />
      <NavItem page={Page.Help} label="Help" IconComponent={HelpIcon} />
      <CartNavItem />
    </nav>
  );
};

export default BottomNav;
