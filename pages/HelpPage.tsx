import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-gray-800 dark:text-slate-200 mb-6 text-center">Help Center</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-4">Contact Us</h3>
        <p className="text-gray-600 dark:text-slate-400 mb-4">
          For any inquiries, support, or feedback, please feel free to reach out to us. We are here to help!
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:9042487765" className="text-lg text-gray-800 dark:text-slate-200 font-medium hover:text-primary">9042487765</a>
          </div>
          <div className="flex items-center space-x-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:6380732279" className="text-lg text-gray-800 dark:text-slate-200 font-medium hover:text-primary">6380732279</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;