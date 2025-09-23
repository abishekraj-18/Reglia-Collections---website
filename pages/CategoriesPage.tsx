import React from 'react';

const CategoriesPage: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 dark:bg-slate-800/50 p-8 rounded-lg shadow-inner">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200 mb-2">Categories</h2>
            <p className="text-gray-600 dark:text-slate-300">This section is coming soon!</p>
            <p className="text-gray-500 dark:text-slate-400 mt-4">Browse our exquisite collections from the Home page.</p>
        </div>
    </div>
  );
};

export default CategoriesPage;
