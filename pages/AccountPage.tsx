import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Order, Feedback } from '../types';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';

const CustomerOrderItem: React.FC<{ order: Order }> = ({ order }) => {
    const { setViewingOrder, setActivePage } = useAppContext();

    const handleViewDetails = () => {
        setViewingOrder(order);
        setActivePage(Page.OrderConfirmation);
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-1">
                <div>
                    <span className="font-bold text-primary">Order #{order.id}</span>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{order.date}</p>
                </div>
                <button 
                    onClick={handleViewDetails}
                    className="text-sm text-primary font-semibold hover:underline focus:outline-none"
                >
                    View Details
                </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">
                Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600 dark:text-green-500' : 'text-amber-500'}`}>{order.status}</span>
            </p>
            <div className="border-t dark:border-slate-700 mt-2 pt-2 flex justify-between font-bold text-gray-800 dark:text-slate-200">
                <span>Total</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
        </div>
    );
}

const OwnerOrderItem: React.FC<{ order: Order }> = ({ order }) => {
    const { updateOrderStatus } = useAppContext();
    
    return (
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <div>
                    <span className="font-bold text-primary">Order #{order.id}</span>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{order.date}</p>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="font-bold text-lg text-gray-800 dark:text-slate-200">₹{order.total.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-300">
                        Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600 dark:text-green-500' : 'text-amber-500'}`}>{order.status}</span>
                    </p>
                </div>
            </div>
            <div className="border-t dark:border-slate-700 mt-3 pt-3 space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300">Shipping Details:</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400"><strong>{order.userDetails.name}</strong> ({order.userDetails.mobile})</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">{order.userDetails.address}, {order.userDetails.state}</p>
            </div>
            <div className="border-t dark:border-slate-700 mt-3 pt-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Items Ordered:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-slate-400">
                    {order.items.map(item => (
                        <li key={item.product.id}>
                            {item.product.name} - {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}
                        </li>
                    ))}
                </ul>
            </div>
             {order.status === 'Processing' && (
                <div className="border-t dark:border-slate-700 mt-3 pt-3">
                    <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="w-full bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-200"
                    >
                        Mark as Delivered
                    </button>
                </div>
            )}
        </div>
    );
};

const FeedbackItem: React.FC<{ feedbackItem: Feedback }> = ({ feedbackItem }) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h4 className="font-bold text-gray-800 dark:text-slate-200">{feedbackItem.name}</h4>
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 ml-2">{new Date(feedbackItem.date).toLocaleDateString('en-GB')}</p>
        </div>
        <p className="text-gray-700 dark:text-slate-300 mt-2 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-md text-sm">{feedbackItem.message}</p>
    </div>
);


const FeedbackForm: React.FC = () => {
    const { addFeedback } = useAppContext();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: { name?: string; message?: string } = {};
        if (!name.trim()) newErrors.name = 'Your name is required.';
        if (!message.trim()) newErrors.message = 'A message is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            addFeedback({ name, message });
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-10 px-4 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Thank You!</h3>
                <p className="text-green-700 dark:text-green-400 mt-2">Your feedback has been submitted successfully.</p>
                <button
                    onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setMessage('');
                        setErrors({});
                    }}
                    className="mt-6 bg-primary text-white py-2 px-5 rounded-lg font-semibold hover:bg-primary-focus transition-colors"
                >
                    Submit Another Feedback
                </button>
            </div>
        );
    }

    const inputBaseClasses = "block w-full bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 px-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all duration-300 shadow-sm";
    const inputNormalClasses = "focus:border-primary focus:ring-4 focus:ring-primary/10";
    const inputErrorClasses = "border-red-500 dark:border-red-500 focus:ring-4 focus:ring-red-500/10";


    return (
        <div>
            <h3 className="text-xl font-serif text-gray-800 dark:text-slate-200 mb-4">Submit Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">Have a concern or suggestion? We'd love to hear from you.</p>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                    <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Your Name</label>
                    <input
                        type="text"
                        id="feedback-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`${inputBaseClasses} ${errors.name ? inputErrorClasses : inputNormalClasses}`}
                        placeholder="e.g. Priya Kumar"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Message</label>
                    <textarea
                        id="feedback-message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`${inputBaseClasses} ${errors.message ? inputErrorClasses : inputNormalClasses}`}
                        placeholder="Please describe your feedback in detail..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors duration-200 shadow-lg hover:shadow-primary/50"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

const AccountPage: React.FC = () => {
    const { orders, wishlist, feedback, theme, toggleTheme, isEditMode, toggleEditMode, isOwnerLoggedIn, logoutOwner } = useAppContext();
    const [activeView, setActiveView] = useState<'orders' | 'wishlist' | 'feedback'>('orders');

    const MenuButton: React.FC<{
        view: 'orders' | 'wishlist' | 'feedback';
        label: string;
        count?: number;
    }> = ({ view, label, count }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`flex-1 p-4 text-center font-semibold transition-colors duration-200 flex justify-center items-center gap-2 ${
                activeView === view
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50'
            }`}
        >
            <span>{label}</span>
            {typeof count !== 'undefined' && (
                 <span className={`text-xs px-2 py-0.5 rounded-full ${activeView === view ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-600'}`}>{count}</span>
            )}
        </button>
    );

  return (
    <div className="p-4 md:p-6">
        {isOwnerLoggedIn && (
            <div className="flex items-center justify-between space-x-4 p-4 bg-sky-50 dark:bg-slate-700/50 rounded-lg border border-sky-200 dark:border-slate-700 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                        A
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-gray-800 dark:text-slate-200">Admin Panel</h3>
                        <p className="text-gray-600 dark:text-slate-400 truncate">owner@reglia.com</p>
                    </div>
                </div>
                <button
                    onClick={logoutOwner}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                >
                    Logout
                </button>
            </div>
        )}


        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-slate-700">
                <MenuButton view="orders" label={isOwnerLoggedIn ? "Customer Orders" : "My Orders"} count={orders.length} />
                {!isOwnerLoggedIn && <MenuButton view="wishlist" label="Wishlist" count={wishlist.length} />}
                <MenuButton view="feedback" label="Feedback" count={isOwnerLoggedIn ? feedback.length : undefined} />
            </div>
            
            <div className="p-4 md:p-6">
                {activeView === 'orders' && (
                    <div>
                        {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map(order => isOwnerLoggedIn 
                                    ? <OwnerOrderItem key={order.id} order={order} /> 
                                    : <CustomerOrderItem key={order.id} order={order} />
                                )}
                            </div>
                        ) : (
                             <div className="text-center py-10 px-4">
                                <p className="text-gray-600 dark:text-slate-300">{isOwnerLoggedIn ? "No orders have been placed yet." : "You haven't placed any orders yet."}</p>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{isOwnerLoggedIn ? "New orders from customers will appear here." : "Start shopping to see your orders here."}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeView === 'wishlist' && !isOwnerLoggedIn && (
                    <div>
                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {wishlist.map(product => <ProductCard key={product.id} product={product} />)}
                            </div>
                        ) : (
                            <div className="text-center py-10 px-4">
                                <p className="text-gray-600 dark:text-slate-300">Your wishlist is empty.</p>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Use the heart icon to save products you love.</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeView === 'feedback' && (
                    isOwnerLoggedIn ? (
                         <div>
                            {feedback.length > 0 ? (
                                <div className="space-y-4">
                                    {feedback.map(item => <FeedbackItem key={item.id} feedbackItem={item} />)}
                                </div>
                            ) : (
                                <div className="text-center py-10 px-4">
                                    <p className="text-gray-600 dark:text-slate-300">No feedback has been submitted yet.</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Customer feedback will appear here.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <FeedbackForm />
                    )
                )}
            </div>
        </div>

        <div className="mt-6 space-y-6">
            {isOwnerLoggedIn && (
                <div>
                    <h3 className="text-lg font-serif text-gray-700 dark:text-slate-300 mb-3">Admin Settings</h3>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700 flex justify-between items-center">
                        <div>
                            <span className="font-medium text-gray-700 dark:text-slate-300">Product Edit Mode</span>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Enable this to change product images on the home page.</p>
                        </div>
                        <label htmlFor="edit-mode-toggle" className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" checked={isEditMode} onChange={toggleEditMode} className="sr-only peer" id="edit-mode-toggle" />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:peer-focus:ring-primary-focus rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                        </label>
                    </div>
                </div>
            )}

            {/* Mobile Theme Toggle */}
            <div className="md:hidden">
                <h3 className="text-lg font-serif text-gray-700 dark:text-slate-300 mb-3">Appearance</h3>
                <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-slate-300">Dark Mode</span>
                    <label htmlFor="theme-toggle-mobile" className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" id="theme-toggle-mobile" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:peer-focus:ring-primary-focus rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountPage;