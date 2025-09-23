import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const OwnerLoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { loginAsOwner, enterApp } = useAppContext();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formView, setFormView] = useState<'login' | 'forgot' | 'confirmation'>('login');
    const [email, setEmail] = useState('');

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = loginAsOwner(password);
        if (success) {
            enterApp();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    const handleForgotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Basic email validation
        if (email.includes('@') && email.includes('.')) {
            setFormView('confirmation');
        } else {
            setError('Please enter a valid email address.');
        }
    };
    
    const resetToLogin = () => {
        setFormView('login');
        setEmail('');
        setError('');
    }

    if (formView === 'confirmation') {
        return (
            <>
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-serif text-gray-800 dark:text-slate-200">Check Your Email</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                        Password reset instructions have been sent to <span className="font-semibold text-primary">{email}</span>.
                    </p>
                    <button
                        onClick={resetToLogin}
                        className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </>
        );
    }

    if (formView === 'forgot') {
        return (
            <>
                <button onClick={resetToLogin} className="absolute top-4 left-4 text-sm text-primary font-semibold hover:underline flex items-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Login
                </button>
                <h2 className="text-3xl font-serif text-gray-800 dark:text-slate-200 text-center mb-2">Reset Password</h2>
                <p className="text-center text-sm text-gray-500 dark:text-slate-400 mb-6">Enter your email to receive reset instructions.</p>
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="owner-email" className="sr-only">Email</label>
                        <input
                            id="owner-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="block w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors"
                    >
                        Send Reset Instructions
                    </button>
                </form>
            </>
        );
    }

    // Login View
    return (
        <>
            <button onClick={onBack} className="absolute top-4 left-4 text-sm text-primary font-semibold hover:underline flex items-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
            </button>
            <h2 className="text-3xl font-serif text-gray-800 dark:text-slate-200 text-center mb-2">Owner Login</h2>
            <p className="text-center text-sm text-gray-500 dark:text-slate-400 mb-6">Enter your password to access admin features.</p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                    <label htmlFor="owner-password" className="sr-only">Password</label>
                    <input
                        id="owner-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="block w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors"
                >
                    Login
                </button>
                 <div className="text-center pt-2">
                    <button
                        type="button"
                        onClick={() => { setFormView('forgot'); setError(''); }}
                        className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 hover:underline transition"
                    >
                        Forgot Password?
                    </button>
                </div>
            </form>
        </>
    );
};

const WelcomeView: React.FC = () => {
    const { enterApp } = useAppContext();
    return (
        <>
            <h1 className="text-5xl md:text-6xl font-serif text-primary dark:text-sky-400 tracking-wider mb-2">
              Reglia Collections
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-6 font-medium">
              Women's Wear
            </p>

            <div className="mt-6 text-gray-600 dark:text-slate-300 text-md">
                <p>
                    <strong className="font-serif text-primary dark:text-sky-400">Reglia</strong> signifies the splendid attire of royalty. At Reglia Collections, we believe every saree is a masterpiece, crafted to make you feel as magnificent and graceful as a queen.
                </p>
            </div>

            <div className="my-8 border-t border-gray-200 dark:border-slate-700"></div>

            <div className="text-gray-700 dark:text-slate-400">
                <div className="flex items-center justify-center space-x-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="font-semibold">Our Location</p>
                </div>
                <p className="mt-2 text-md">
                    Near Sengunthar Pillaiyar Kovil Street, <br/>
                    Keelapavoor, 627806, Tenkasi.
                </p>
            </div>

            <div className="mt-10">
              <button
                onClick={enterApp}
                className="w-full bg-primary text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-primary-focus transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                View Collections
              </button>
            </div>
        </>
    );
};


const LandingPage: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'login'>('welcome');

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="relative bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full">
        {view === 'welcome' ? <WelcomeView /> : <OwnerLoginForm onBack={() => setView('welcome')} />}
      </div>
      {view === 'welcome' && (
          <div className="mt-6">
              <button onClick={() => setView('login')} className="text-sm text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 hover:underline transition">
                  Owner Login
              </button>
          </div>
      )}
    </div>
  );
};

export default LandingPage;