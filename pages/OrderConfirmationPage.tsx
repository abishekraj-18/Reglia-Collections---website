import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import CheckIcon from '../components/icons/CheckIcon';

const OrderConfirmationPage: React.FC = () => {
    const { viewingOrder, setActivePage } = useAppContext();

    if (!viewingOrder) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-red-600">Order Not Found</h2>
                <p className="text-gray-600 dark:text-slate-400 mt-2">Could not find order details. Please check your account history.</p>
                <button 
                    onClick={() => setActivePage(Page.Home)} 
                    className="mt-6 bg-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-focus transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const orderDateParts = viewingOrder.date.split('/').map(part => parseInt(part, 10));
    const orderDate = new Date(orderDateParts[2], orderDateParts[1] - 1, orderDateParts[0]);

    const deliveryStartDate = new Date(orderDate);
    deliveryStartDate.setDate(orderDate.getDate() + 5);
    const deliveryEndDate = new Date(orderDate);
    deliveryEndDate.setDate(orderDate.getDate() + 7);

    const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    <CheckIcon />
                </div>
                <h1 className="text-3xl font-serif text-gray-800 dark:text-slate-200">Thank you for your order!</h1>
                <p className="text-gray-600 dark:text-slate-400 mt-2">Your order has been placed successfully. A summary is shown below.</p>
                <p className="font-semibold text-gray-800 dark:text-slate-200 mt-4">Order ID: <span className="font-mono text-primary">{viewingOrder.id}</span></p>
                <p className="text-gray-500 dark:text-slate-400 mt-2">Estimated Delivery: <span className="font-semibold text-gray-700 dark:text-slate-300">{formatDate(deliveryStartDate)} - {formatDate(deliveryEndDate)}</span></p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-serif text-gray-700 dark:text-slate-300 border-b dark:border-slate-700 pb-2 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                    {viewingOrder.items.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center">
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-slate-200">{item.product.name}</p>
                                    <p className="text-gray-500 dark:text-slate-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium text-gray-800 dark:text-slate-200">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t dark:border-slate-700 pt-4 space-y-2">
                    <div className="flex justify-between font-semibold text-gray-800 dark:text-slate-200">
                        <span>Total</span>
                        <span>₹{viewingOrder.total.toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400">
                        <span>Payment Method</span>
                        <span>{viewingOrder.paymentMethod}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-serif text-gray-700 dark:text-slate-300 mb-2">Shipping To</h2>
                <div className="text-gray-700 dark:text-slate-300">
                    <p className="font-bold">{viewingOrder.userDetails.name}</p>
                    <p>{viewingOrder.userDetails.address}</p>
                    <p>{viewingOrder.userDetails.state}</p>
                    <p>{viewingOrder.userDetails.mobile}</p>
                </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button 
                    onClick={() => setActivePage(Page.Home)}
                    className="w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-focus transition-colors duration-200"
                >
                    Continue Shopping
                </button>
                <button 
                    onClick={() => setActivePage(Page.Account)}
                    className="w-full sm:w-auto bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                    View Order History
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
