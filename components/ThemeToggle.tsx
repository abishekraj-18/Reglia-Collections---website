import React from 'react';
import { useAppContext } from '../context/AppContext';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useAppContext();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-secondary dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
    );
};

export default ThemeToggle;
