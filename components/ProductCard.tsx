import React, { useRef } from 'react';
import type { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import HeartIcon from './icons/HeartIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    reviews, 
    setViewingProductDetail, 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist,
    isEditMode,
    updateProduct
  } = useAppContext();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productReviews = reviews.filter(r => r.productId === product.id);
  const reviewCount = productReviews.length;
  const averageRating = reviewCount > 0 
    ? productReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
    : 0;
  
  const productInWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewingProductDetail(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productInWishlist) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImageUrl = reader.result as string;
            updateProduct({ ...product, imageUrl: newImageUrl });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };


  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden group flex flex-col cursor-pointer"
      onClick={() => setViewingProductDetail(product)}
      aria-label={`View details for ${product.name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setViewingProductDetail(product)}
    >
      <div className="relative overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
        
        {isEditMode && (
            <button
                onClick={handleEditClick}
                className="absolute top-2 left-2 bg-black/30 p-1.5 rounded-full backdrop-blur-sm hover:bg-black/50 transition-colors duration-200"
                aria-label="Change product image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
            </button>
        )}

        <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 bg-black/30 p-1.5 rounded-full backdrop-blur-sm hover:bg-black/50 transition-colors duration-200"
            aria-label={productInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <HeartIcon 
                isFilled={productInWishlist} 
                className={`h-5 w-5 ${productInWishlist ? 'text-red-500' : 'text-white'}`} 
            />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-serif text-gray-800 dark:text-slate-200 truncate">{product.name}</h3>
        <p className="text-xl font-bold text-primary mt-1">₹{product.price.toLocaleString('en-IN')}</p>
        
        <div className="flex items-center mt-2 h-5">
            {reviewCount > 0 ? (
                <div className="flex items-center">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-amber-400' : 'text-gray-300 dark:text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <button onClick={handleViewDetails} className="text-xs text-gray-500 dark:text-slate-400 hover:text-primary hover:underline ml-2">({reviewCount} reviews)</button>
                </div>
            ) : (
                 <button onClick={handleViewDetails} className="text-xs text-gray-500 dark:text-slate-400 hover:text-primary hover:underline">Be the first to review</button>
            )}
        </div>

        <div className="mt-auto pt-4">
            <button
                onClick={handleAddToCart} 
                className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-focus transition-colors duration-200 text-sm">
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
