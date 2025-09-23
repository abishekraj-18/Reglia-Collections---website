import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { UserDetails } from '../types';

// Helper components for icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const AddressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const StateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
);


const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, cancelCheckout } = useAppContext();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    mobile: '',
    state: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};
    if (!userDetails.name.trim()) newErrors.name = 'Name is required';
    if (!userDetails.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(userDetails.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!userDetails.address.trim()) newErrors.address = 'Address is required';
    if (!userDetails.state.trim()) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      placeOrder(userDetails, paymentMethod);
    }
  };

  const inputBaseClasses = "block w-full pl-10 pr-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200";
  const inputNormalClasses = "focus:ring-primary focus:border-primary";
  const inputErrorClasses = "border-red-400 ring-1 ring-red-400 focus:ring-red-500 focus:border-red-500";


  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Form */}
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
          <button onClick={cancelCheckout} className="text-sm text-primary font-semibold mb-6 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Cart
          </button>
          <h2 className="text-2xl font-serif text-gray-700 dark:text-slate-300 mb-5">Shipping Information</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Full Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${errors.name ? inputErrorClasses : inputNormalClasses}`}
                      required
                      placeholder="e.g. Priya Kumar"
                    />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Mobile Number</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={userDetails.mobile}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${errors.mobile ? inputErrorClasses : inputNormalClasses}`}
                      required
                      placeholder="10-digit mobile number"
                    />
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">Address</label>
                 <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none"><AddressIcon /></div>
                    <textarea
                      id="address"
                      name="address"
                      value={userDetails.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`${inputBaseClasses} pt-2 ${errors.address ? inputErrorClasses : inputNormalClasses}`}
                      required
                      placeholder="Your full address"
                    />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1">State</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><StateIcon /></div>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={userDetails.state}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${errors.state ? inputErrorClasses : inputNormalClasses}`}
                      required
                      placeholder="e.g. Maharashtra"
                    />
                </div>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
            </div>

            <h3 className="text-xl font-serif text-gray-700 dark:text-slate-300 mt-8 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${paymentMethod === 'COD' ? 'border-primary bg-sky-50 dark:bg-primary/20' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-3 font-medium text-gray-700 dark:text-slate-300">Cash on Delivery (COD)</span>
              </label>
              <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${paymentMethod === 'UPI' ? 'border-primary bg-sky-50 dark:bg-primary/20' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-3 font-medium text-gray-700 dark:text-slate-300">UPI</span>
              </label>
            </div>
          </form>
        </div>

        {/* Right side: Order Summary */}
        <div className="bg-sky-50 dark:bg-slate-900 p-6 rounded-lg border border-sky-200 dark:border-slate-700 shadow-lg sticky top-20 h-fit">
            <h3 className="text-2xl font-serif text-primary border-b-2 border-primary/20 pb-3 mb-5">Order Summary</h3>
            <div className="space-y-1 mb-4 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-sm py-3 border-b border-sky-100 dark:border-slate-700 last:border-b-0">
                        <span className="text-gray-600 dark:text-slate-400 truncate pr-2">{item.product.name} <span className="text-xs">x {item.quantity}</span></span>
                        <span className="font-semibold text-gray-800 dark:text-slate-200 whitespace-nowrap">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                ))}
            </div>
            <div className="border-t-2 border-sky-200 dark:border-slate-700 pt-4 space-y-2">
                <div className="flex justify-between items-center font-bold text-xl">
                    <span className="text-gray-800 dark:text-slate-200">Total</span>
                    <span className="text-primary font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/50"
            >
                Place Order
            </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
