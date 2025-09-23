import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import StarRating from './StarRating';
import type { Review } from '../types';
import HeartIcon from './icons/HeartIcon';

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
    <div className="py-4 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
        <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800 dark:text-slate-200">{review.author}</p>
            <StarRating rating={review.rating} size="h-4 w-4" />
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{new Date(review.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-gray-600 dark:text-slate-300 mt-2">{review.comment}</p>
    </div>
);


const ProductDetailModal: React.FC = () => {
    const { 
        viewingProductDetail, setViewingProductDetail, reviews, addReview, addToCart,
        isInWishlist, addToWishlist, removeFromWishlist
    } = useAppContext();
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    
    // State for zoom functionality
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => setIsVisible(true), 10);

        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, []);

    if (!viewingProductDetail) return null;

    const product = viewingProductDetail;
    const productReviews = reviews.filter(r => r.productId === product.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const reviewCount = productReviews.length;
    const averageRating = reviewCount > 0
        ? productReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        : 0;
    const productInWishlist = isInWishlist(product.id);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !comment.trim() || rating === 0) {
            setError('Please fill out all fields and select a rating.');
            return;
        }
        addReview({
            productId: product.id,
            author,
            rating,
            comment,
        });
        setAuthor('');
        setRating(0);
        setComment('');
        setError('');
    };
    
    const handleAddToCart = () => {
        addToCart(product, quantity);
        handleClose();
    };

    const handleWishlistToggle = () => {
        if (productInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setViewingProductDetail(null), 300); // Wait for animation
    }
    
    // Handler for mouse move to update zoom origin
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    const reviewInputClasses = "block w-full bg-sky-400/30 dark:bg-slate-700/50 backdrop-blur-sm border-2 border-transparent rounded-lg py-2 px-3 text-white dark:text-slate-200 placeholder-sky-200 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300";

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
        >
            <div 
                className={`bg-slate-50 dark:bg-slate-900 h-full w-full flex flex-col transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                 <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 text-gray-800 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full p-2 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close product details"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex-1 overflow-y-auto">
                    <div 
                        className="relative overflow-hidden cursor-zoom-in bg-white dark:bg-slate-800"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                    >
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-auto max-h-[60vh] object-contain mx-auto transition-transform duration-300 ease-in-out"
                            style={{
                                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                                transform: isZoomed ? 'scale(1.75)' : 'scale(1)',
                            }}
                        />
                    </div>
                    
                    <div className="p-4 md:p-6 bg-white dark:bg-slate-800 mt-2">
                        <div className="flex justify-between items-start gap-4">
                             <h1 id="product-detail-title" className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-slate-200 flex-1">
                                {product.name}
                            </h1>
                            <button
                                onClick={handleWishlistToggle}
                                className="p-2 -mr-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                aria-label={productInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                <HeartIcon 
                                    isFilled={productInWishlist} 
                                    className={`h-7 w-7 ${productInWishlist ? 'text-red-500' : 'currentColor'}`} 
                                />
                            </button>
                        </div>

                        <div className="flex items-center my-3">
                            {reviewCount > 0 ? (
                                <>
                                    <StarRating rating={averageRating} />
                                    <a href="#reviews-section" className="text-sm text-gray-500 dark:text-slate-400 hover:text-primary ml-2 hover:underline">({reviewCount} reviews)</a>
                                </>
                            ) : (
                                <a href="#reviews-section" className="text-sm text-gray-500 dark:text-slate-400 hover:text-primary hover:underline">Be the first to review</a>
                            )}
                        </div>
                        
                        <p className="text-3xl font-bold text-primary my-4">₹{product.price.toLocaleString('en-IN')}</p>

                        <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-300 mt-6 mb-2">Product Description</h2>
                        <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{product.description}</p>
                    </div>
                    
                    <div id="reviews-section" className="p-4 md:p-6 mt-2 bg-white dark:bg-slate-800">
                         <div className="bg-gradient-to-br from-sky-500 to-teal-500 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg mb-6 shadow-xl">
                            <h3 className="text-2xl font-serif text-white dark:text-slate-200 mb-4 text-center">Share Your Thoughts!</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="author" className="block text-sm font-medium text-sky-100 dark:text-slate-400 mb-1">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="author" 
                                        value={author} 
                                        onChange={e => setAuthor(e.target.value)} 
                                        className={reviewInputClasses}
                                        placeholder="e.g. Priya Kumar"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-sky-100 dark:text-slate-400 mb-1">Your Rating</label>
                                    <StarRating rating={rating} setRating={setRating} size="h-8 w-8" />
                                </div>
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-sky-100 dark:text-slate-400 mb-1">Your Comment</label>
                                    <textarea 
                                        id="comment" 
                                        rows={3} 
                                        value={comment} 
                                        onChange={e => setComment(e.target.value)} 
                                        className={reviewInputClasses}
                                        placeholder="Share your thoughts about the product..."
                                    />
                                </div>
                                {error && <p className="text-yellow-300 text-sm font-semibold">{error}</p>}
                                <button 
                                    type="submit" 
                                    className="w-full bg-accent text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-500 dark:focus:ring-offset-slate-900 focus:ring-accent"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-300 mb-3">Customer Reviews ({reviewCount})</h3>
                            {productReviews.length > 0 ? (
                                productReviews.map(review => <ReviewItem key={review.id} review={review} />)
                            ) : (
                                <p className="text-center text-gray-500 dark:text-slate-400 py-8">No reviews yet for this product.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-4 border-t border-gray-200 dark:border-slate-700 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex items-center space-x-4">
                     <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-lg font-bold text-primary dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-md transition-colors">-</button>
                        <span className="px-4 py-2 text-lg font-semibold text-gray-800 dark:text-slate-200">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-lg font-bold text-primary dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-md transition-colors">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart} 
                        className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-colors duration-200 text-lg flex items-center justify-center space-x-2">
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;