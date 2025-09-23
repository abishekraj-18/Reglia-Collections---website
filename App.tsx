import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AccountPage from './pages/AccountPage';
import HelpPage from './pages/HelpPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { Page } from './types';
import ProductDetailModal from './components/ReviewsModal';
import LandingPage from './pages/LandingPage';

const PageRenderer: React.FC = () => {
    const { activePage, isCheckingOut } = useAppContext();

    if (isCheckingOut) {
        return <CheckoutPage />;
    }

    const renderPage = () => {
        switch (activePage) {
            case Page.Home:
                return <HomePage />;
            case Page.Categories:
                return <CategoriesPage />;
            case Page.Account:
                return <AccountPage />;
            case Page.Help:
                return <HelpPage />;
            case Page.Cart:
                return <CartPage />;
            case Page.OrderConfirmation:
                return <OrderConfirmationPage />;
            default:
                return <HomePage />;
        }
    };
    
    return (
        <main className="pb-20 md:pb-0">
          {renderPage()}
        </main>
    );
};

const AppLayout: React.FC = () => {
    const { viewingProductDetail } = useAppContext();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <div className="bg-white dark:bg-slate-800 shadow-lg min-h-screen max-w-7xl mx-auto">
                <header className="p-4 border-b bg-white dark:bg-slate-800 dark:border-slate-700 sticky top-0 z-10 md:hidden">
                    <h1 className="text-2xl font-serif text-gray-800 dark:text-slate-200 text-center tracking-wider">Reglia Collections</h1>
                </header>
                <Header />
                <PageRenderer />
                <BottomNav />
            </div>
            {viewingProductDetail && <ProductDetailModal />}
        </div>
    );
};

const AppContent: React.FC = () => {
    const { appState } = useAppContext();

    if (appState === 'landing') {
        return <LandingPage />;
    }

    return <AppLayout />;
};


const App: React.FC = () => {
  return (
    <AppProvider>
        <AppContent />
    </AppProvider>
  );
};

export default App;