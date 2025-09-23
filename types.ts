// FIX: Removed circular self-import of `Page`.
export enum Page {
  Home,
  Categories,
  Account,
  Help,
  Cart,
  OrderConfirmation,
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserDetails {
  name: string;
  mobile: string;
  state: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  userDetails: UserDetails;
  paymentMethod: string;
  status: 'Processing' | 'Delivered';
}

export interface Feedback {
  id: number;
  name: string;
  message: string;
  date: string;
}

export interface AppContextType {
  appState: 'landing' | 'main';
  enterApp: () => void;
  activePage: Page;
  setActivePage: (page: Page) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orders: Order[];
  placeOrder: (details: UserDetails, paymentMethod: string) => void;
  updateOrderStatus: (orderId: string, status: 'Processing' | 'Delivered') => void;
  isCheckingOut: boolean;
  startCheckout: () => void;
  cancelCheckout: () => void;
  viewingOrder: Order | null;
  setViewingOrder: (order: Order | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  viewingProductDetail: Product | null;
  setViewingProductDetail: (product: Product | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  feedback: Feedback[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date'>) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  products: Product[];
  updateProduct: (product: Product) => void;
  isOwnerLoggedIn: boolean;
  loginAsOwner: (password: string) => boolean;
  logoutOwner: () => void;
}