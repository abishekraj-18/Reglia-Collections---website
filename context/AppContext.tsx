import React, { createContext, useState, useContext, useMemo, useCallback, ReactNode, useEffect } from 'react';
import type { Page, CartItem, Product, Order, UserDetails, Review, AppContextType, Feedback } from '../types';
import { Page as PageEnum } from '../types';

const mockProducts: Product[] = [
  { id: 1, name: 'Kanjivaram Silk Saree', price: 12500, imageUrl: 'https://picsum.photos/seed/saree1/400/400', description: 'A timeless classic from the temple city of Kanchipuram, this silk saree is known for its rich texture, vibrant colors, and intricate zari work. Woven from pure mulberry silk, it is a symbol of luxury and tradition, perfect for weddings and grand occasions.' },
  { id: 2, name: 'Banarasi Georgette Saree', price: 8200, imageUrl: 'https://picsum.photos/seed/saree2/400/400', description: 'A masterpiece from the holy city of Varanasi, this Banarasi georgette saree blends traditional craftsmanship with contemporary grace. It features delicate, hand-woven floral motifs across a lightweight, flowing fabric that drapes beautifully. This saree is perfect for festive events and daytime celebrations, offering an ethereal and sophisticated look.' },
  { id: 3, name: 'Chanderi Cotton Saree', price: 4500, imageUrl: 'https://picsum.photos/seed/saree3/400/400', description: 'Originating from the historic town of Chanderi in Madhya Pradesh, this elegant cotton saree is celebrated for its sheer texture, feather-light weight, and luxurious feel. The subtle sheen and intricate motifs make it an ideal choice for both formal gatherings and casual day-outs, exuding an aura of understated grace and sophistication.' },
  { id: 4, name: 'Mysore Silk Saree', price: 9800, imageUrl: 'https://picsum.photos/seed/saree4/400/400', description: 'Crafted from the finest, lustrous silk sourced from Karnataka, the Mysore silk saree is a symbol of royalty and tradition. It is celebrated for its minimalist design, non-crush quality, and rich, vibrant solid colors, often accented with a simple yet elegant zari border. It\'s a timeless classic, perfect for official functions and traditional ceremonies.' },
  { id: 5, name: 'Paithani Silk Saree', price: 15000, imageUrl: 'https://picsum.photos/seed/saree5/400/400', description: 'A traditional treasure from the heart of Maharashtra, the Paithani silk saree is a poem in woven silk. It is characterized by its unique oblique square design borders and a pallu featuring intricate peacock, parrot, and lotus motifs. Each saree is woven with exquisite detail, making it a prized possession for weddings and heirloom collections.' },
  { id: 6, name: 'Linen Jamdani Saree', price: 6300, imageUrl: 'https://picsum.photos/seed/saree6/400/400', description: 'This beautiful saree combines the crisp comfort of pure linen with the intricate, hand-woven Jamdani technique, a heritage craft from Bengal. The fabric is breathable and stylish, featuring exquisite, translucent patterns. It\'s the perfect choice for navigating warm weather with effortless elegance and artistic flair.' },
  { id: 7, name: 'Tussar Silk Saree', price: 7100, imageUrl: 'https://picsum.photos/seed/saree7/400/400', description: 'Known for its rich, porous texture and natural deep golden hue, this Tussar silk saree exudes a unique, earthy charm. The fabric is cooler than other silks, making it comfortable to wear. It often features intricate tribal art motifs and kantha stitches, reflecting its rich cultural heritage and connecting the wearer to ancient traditions.' },
  { id: 8, name: 'Organza Saree', price: 5600, imageUrl: 'https://picsum.photos/seed/saree8/400/400', description: 'Light as a feather and delicately sheer, this organza saree is a modern classic that radiates sophistication. Its crisp texture and ethereal, translucent look create a dreamy silhouette, often enhanced with delicate embroidery or digital prints. It has become a popular choice for cocktail parties, evening soirees, and formal daytime events.' },
];

// Mock initial reviews
const initialReviews: Review[] = [
    { id: 1, productId: 1, author: 'Sunita', rating: 5, comment: 'Absolutely stunning saree! The silk is so pure.', date: '2023-10-15' },
    { id: 2, productId: 1, author: 'Priya', rating: 4, comment: 'Beautiful color, but a bit heavier than I expected.', date: '2023-10-18' },
    { id: 3, productId: 2, author: 'Meera', rating: 5, comment: 'The georgette flows so beautifully. Perfect for parties.', date: '2023-10-20' },
];

const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('theme');
        if (storedPrefs === 'light' || storedPrefs === 'dark') {
            return storedPrefs;
        }
    }
    // Default to light mode if no valid preference is stored.
    return 'light';
};

const getInitialProducts = (): Product[] => {
    try {
        const storedProducts = window.localStorage.getItem('products');
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
    } catch (error) {
        console.error("Could not parse products from localStorage", error);
    }
    window.localStorage.setItem('products', JSON.stringify(mockProducts));
    return mockProducts;
};

const getInitialOrders = (): Order[] => {
    try {
        const storedOrders = window.localStorage.getItem('orders');
        return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
        console.error("Could not parse orders from localStorage", error);
        return [];
    }
};

const getInitialFeedback = (): Feedback[] => {
    try {
        const storedFeedback = window.localStorage.getItem('feedback');
        return storedFeedback ? JSON.parse(storedFeedback) : [];
    } catch (error) {
        console.error("Could not parse feedback from localStorage", error);
        return [];
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<'landing' | 'main'>('landing');
  const [activePage, setActivePage] = useState<Page>(PageEnum.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(getInitialOrders);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [viewingProductDetail, setViewingProductDetail] = useState<Product | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>(getInitialFeedback);
  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(false);


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const enterApp = useCallback(() => setAppState('main'), []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);
  
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const placeOrder = useCallback((userDetails: UserDetails, paymentMethod: string) => {
    const newOrder: Order = {
      id: `RC-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB'),
      items: cart,
      total: cartTotal,
      userDetails,
      paymentMethod,
      status: 'Processing',
    };
    setOrders((prevOrders) => {
        const newOrdersList = [newOrder, ...prevOrders];
        localStorage.setItem('orders', JSON.stringify(newOrdersList));
        return newOrdersList;
    });
    setViewingOrder(newOrder);
    clearCart();
    setIsCheckingOut(false);
    setActivePage(PageEnum.OrderConfirmation);
  }, [cart, cartTotal, clearCart]);

  const updateOrderStatus = useCallback((orderId: string, newStatus: 'Processing' | 'Delivered') => {
    setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
    });
  }, []);
  
  const startCheckout = useCallback(() => {
      if(cart.length > 0) {
          setIsCheckingOut(true);
      }
  }, [cart]);

  const cancelCheckout = useCallback(() => {
    setIsCheckingOut(false);
  }, []);
  
  const addReview = useCallback((review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
        ...review,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => [...prev, product]);
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const addFeedback = useCallback((newFeedback: Omit<Feedback, 'id' | 'date'>) => {
    const feedbackToAdd: Feedback = {
        ...newFeedback,
        id: Date.now(),
        date: new Date().toISOString(),
    };
    setFeedback(prev => {
        const newFeedbackList = [feedbackToAdd, ...prev];
        localStorage.setItem('feedback', JSON.stringify(newFeedbackList));
        return newFeedbackList;
    });
  }, []);

  const toggleEditMode = useCallback(() => setIsEditMode(prev => !prev), []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts => {
        const newProducts = prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        localStorage.setItem('products', JSON.stringify(newProducts));
        return newProducts;
    });
    setCart(prevCart => prevCart.map(item => item.product.id === updatedProduct.id ? { ...item, product: updatedProduct } : item));
    setWishlist(prevWishlist => prevWishlist.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  }, []);
  
  const loginAsOwner = useCallback((password: string) => {
    // NOTE: This is a simple, insecure way to handle login for demonstration.
    // In a real application, use a proper authentication service.
    if (password === 'regalia123') {
        setIsOwnerLoggedIn(true);
        return true;
    }
    return false;
  }, []);

  const logoutOwner = useCallback(() => {
    setIsOwnerLoggedIn(false);
    setIsEditMode(false); // Ensure edit mode is off when logging out
  }, []);


  const value = useMemo(() => ({
    appState,
    enterApp,
    activePage,
    setActivePage,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    orders,
    placeOrder,
    updateOrderStatus,
    isCheckingOut,
    startCheckout,
    cancelCheckout,
    viewingOrder,
    setViewingOrder,
    searchTerm,
    setSearchTerm,
    reviews,
    addReview,
    viewingProductDetail,
    setViewingProductDetail,
    theme,
    toggleTheme,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    feedback,
    addFeedback,
    isEditMode,
    toggleEditMode,
    products,
    updateProduct,
    isOwnerLoggedIn,
    loginAsOwner,
    logoutOwner,
  }), [appState, enterApp, activePage, cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, orders, placeOrder, updateOrderStatus, isCheckingOut, startCheckout, cancelCheckout, viewingOrder, searchTerm, reviews, addReview, viewingProductDetail, theme, toggleTheme, wishlist, addToWishlist, removeFromWishlist, isInWishlist, feedback, addFeedback, isEditMode, toggleEditMode, products, updateProduct, isOwnerLoggedIn, loginAsOwner, logoutOwner]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};