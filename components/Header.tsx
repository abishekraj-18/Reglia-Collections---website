import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import CartIcon from './icons/CartIcon';
import ThemeToggle from './ThemeToggle';

const NavLink: React.FC<{ page: Page, label: string }> = ({ page, label }) => {
    const { activePage, setActivePage } = useAppContext();
    const isActive = activePage === page;
    return (
        <button
            onClick={() => setActivePage(page)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
                isActive ? 'bg-primary text-primary-content' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
        >
            {label}
        </button>
    );
};

const Header: React.FC = () => {
    const { cartCount, setActivePage, activePage, searchTerm, setSearchTerm } = useAppContext();
    const isCartActive = activePage === Page.Cart;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (activePage !== Page.Home) {
            setActivePage(Page.Home);
        }
    };
    
    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <header className="bg-white border-b sticky top-0 z-10 hidden md:block dark:bg-slate-800 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 
                          onClick={() => setActivePage(Page.Home)}
                          className="text-2xl font-serif text-gray-800 dark:text-slate-200 tracking-wider cursor-pointer">
                            Reglia Collections
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 flex justify-center px-8">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => activePage !== Page.Home && setActivePage(Page.Home)}
                                className="block w-full bg-gray-100 dark:bg-slate-700 border border-transparent text-slate-900 dark:text-white rounded-md py-2 pl-10 pr-10 text-sm placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                            {searchTerm && (
                                <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <nav className="flex items-center space-x-2">
                        <NavLink page={Page.Home} label="Home" />
                        <NavLink page={Page.Categories} label="Categories" />
                        <NavLink page={Page.Account} label="Account" />
                        <NavLink page={Page.Help} label="Help" />
                         <button
                            onClick={() => setActivePage(Page.Cart)}
                            className="relative p-2 rounded-full text-secondary dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
                            aria-label="Open cart"
                        >
                             {cartCount > 0 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {cartCount}
                                </div>
                            )}
                            <CartIcon isActive={isCartActive} />
                        </button>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;