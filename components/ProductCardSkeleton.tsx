import React from 'react';

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="bg-slate-200 dark:bg-slate-700 h-48 w-full"></div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
      <div className="mt-auto pt-4">
        <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
