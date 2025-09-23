import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const HomePage: React.FC = () => {
  const { searchTerm, setSearchTerm, reviews, products } = useAppContext();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const processedProducts = useMemo(() => {
    // 1. Filter products based on search term
    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    // Helper function to calculate average rating for a product
    const getAverageRating = (productId: number) => {
        const productReviews = reviews.filter(r => r.productId === productId);
        if (productReviews.length === 0) return 0;
        return productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
    };

    // 2. Sort the filtered products
    const sorted = [...filtered].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'rating-desc':
                return getAverageRating(b.id) - getAverageRating(a.id);
            case 'default':
            default:
                return 0; // Keep original order for "Featured"
        }
    });

    return sorted;
  }, [debouncedSearchTerm, sortOption, reviews, products]);

  useEffect(() => {
    setIsLoading(searchTerm !== debouncedSearchTerm);
  }, [searchTerm, debouncedSearchTerm]);


  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="p-4 md:p-6">
        {/* Mobile Search Bar */}
        <div className="mb-4 md:hidden">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-md py-2 pl-10 pr-10 text-sm placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {searchTerm && (
                    <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
            <h2 className="text-2xl font-serif text-gray-700 dark:text-slate-300">
                {debouncedSearchTerm ? `Results for "${debouncedSearchTerm}"` : 'New Collections'}
            </h2>
            <div className="flex items-center gap-2 flex-shrink-0">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-600 dark:text-slate-400">Sort by:</label>
                <select 
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md py-1.5 pl-2 pr-8 text-sm text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none"
                    style={{
                        // FIX: Replaced single quotes with template literals to prevent a syntax error in the string, which was causing cascading parsing issues.
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                    }}
                >
                    <option value="default">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="rating-desc">Average Rating</option>
                </select>
            </div>
        </div>
        
        {isLoading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
        ) : processedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {processedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 px-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300">No products found</h3>
                <p className="text-gray-500 dark:text-slate-400 mt-2">We couldn't find any products matching your search for "{debouncedSearchTerm}".</p>
            </div>
        )}
    </div>
  );
};

export default HomePage;