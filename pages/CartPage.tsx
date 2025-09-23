import React from 'react';
import { useAppContext } from '../context/AppContext';
import type { CartItem } from '../types';


const CartItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
    const { removeFromCart } = useAppContext();
    return (
        <div className="flex items-center space-x-4 bg-white dark:bg-slate-800/50 p-3 rounded-lg border dark:border-slate-700">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-slate-200">{item.product.name}</h4>
                <p className="text-sm text-gray-500 dark:text-slate-400">Quantity: {item.quantity}</p>
                <p className="font-bold text-primary mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
            </div>
            <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};

const CartPage: React.FC = () => {
  const { cart, cartTotal, startCheckout } = useAppContext();

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-serif text-gray-700 dark:text-slate-300 mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <div className="md:flex md:items-start md:space-x-8">
            <div className="md:flex-1 space-y-3 mb-6 md:mb-0">
                {cart.map(item => <CartItemCard key={item.product.id} item={item} />)}
            </div>
            <div className="md:w-1/3 bg-sky-50 dark:bg-slate-700/50 p-6 rounded-lg border border-sky-200 dark:border-slate-700 shadow-lg sticky top-20">
                <h3 className="text-2xl font-serif text-primary border-b-2 border-primary/20 pb-3 mb-5">Order Summary</h3>
                <div className="flex justify-between items-center font-bold text-xl mb-6">
                    <span className="text-gray-800 dark:text-slate-200">Total</span>
                    <span className="text-primary font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button 
                    onClick={startCheckout} 
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/50"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300">Your cart is empty</h3>
            <p className="text-gray-500 dark:text-slate-400 mt-2">Looks like you haven't added anything to your cart yet.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
