import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products as seedProducts, brands as seedBrands } from '../data/products';
import type { Address, AuthUser, CartItem, Coupon, Customer, Notification, Order, OrderStage, PaymentMethod, PaymentStatus, Product, SizeType } from '../data/types';

// Bump this key whenever the product catalog schema or seed data changes.
// Changing the key forces all browsers to start fresh from seedProducts
// instead of loading stale/corrupt data from old localStorage.
const LS_KEY = 'swarna_saree_boutique_v1';

interface ToastItem { id: string; message: string; tone: 'success' | 'error' | 'info'; }

interface StoreState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  notifications: Notification[];
  addresses: Address[];
  coupons: Coupon[];
  customers: Customer[];
  user: AuthUser | null;
  searchHistory: string[];
  appliedCoupon: string | null;
  deliveryMethod: 'standard' | 'express';
}

const defaultCoupons: Coupon[] = [
  { code: 'ROYAL10', description: '10% off on silk saree orders above ₹4,999', discountPercent: 10, minOrder: 4999, active: true },
  { code: 'WELCOME5', description: '5% off for first-time buyers', discountPercent: 5, minOrder: 0, active: true },
  { code: 'BRIDAL15', description: '15% off on bridal & festive weaves above ₹14,999', discountPercent: 15, minOrder: 14999, active: true },
];

const defaultAddresses: Address[] = [
  { id: 'a1', label: 'Home', name: 'Ananya Rao', line1: '221B, Richmond Towers, MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560025', phone: '9876543210', isDefault: true },
];

const defaultCustomers: Customer[] = [
  { id: 'c1', name: 'Ananya Rao', email: 'ananya.rao@example.com', phone: '9812345670', joined: '2026-01-14', orders: 4, totalSpent: 312000, status: 'Active' },
  { id: 'c2', name: 'Meera Deshmukh', email: 'meera.d@example.com', phone: '9812345671', joined: '2026-02-02', orders: 2, totalSpent: 158000, status: 'Active' },
  { id: 'c3', name: 'Neha Kulkarni', email: 'neha.k@example.com', phone: '9812345672', joined: '2026-02-20', orders: 1, totalSpent: 42990, status: 'Active' },
  { id: 'c4', name: 'Priya Iyer', email: 'priya.iyer@example.com', phone: '9812345673', joined: '2026-03-05', orders: 6, totalSpent: 587000, status: 'Active' },
  { id: 'c5', name: 'Divya Sundaram', email: 'divya.s@example.com', phone: '9812345674', joined: '2026-03-18', orders: 3, totalSpent: 224000, status: 'Active' },
];

const defaultNotifications: Notification[] = [
  { id: 'n1', title: 'Welcome to Swarna Sarees', body: 'Discover our handwoven Kanjivaram, Banarasi & Silk Mark certified collection.', date: new Date().toISOString(), read: false },
];

function loadState(): StoreState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      
      // Merge seed products with any admin modifications/additions in localStorage
      const localProducts = parsed.products || [];
      const customProducts = localProducts.filter((lp: Product) => !seedProducts.some(sp => sp.id === lp.id));
      const mergedProducts = [
        ...customProducts,
        ...seedProducts.map(sp => localProducts.find((lp: Product) => lp.id === sp.id) || sp)
      ];

      return {
        ...defaultState(),
        ...parsed,
        products: mergedProducts,
      };
    }
  } catch {
    // ignore corrupt or unparseable storage
  }
  return defaultState();
}

function defaultState(): StoreState {
  return {
    products: seedProducts,
    cart: [],
    wishlist: [],
    orders: [],
    notifications: defaultNotifications,
    addresses: defaultAddresses,
    coupons: defaultCoupons,
    customers: defaultCustomers,
    user: null,
    searchHistory: [],
    appliedCoupon: null,
    deliveryMethod: 'standard',
  };
}

export interface OrderSummary {
  subtotal: number;
  couponCode: string | null;
  couponDiscount: number;
  taxableAmount: number;
  gstAmount: number;
  shippingAmount: number;
  finalTotal: number;
}

interface StoreApi extends StoreState {
  toasts: ToastItem[];
  pushToast: (message: string, tone?: ToastItem['tone']) => void;
  addToCart: (productId: string, qty?: number, size?: SizeType, color?: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  toggleSaveForLater: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  moveWishlistToCart: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  setDeliveryMethod: (method: 'standard' | 'express') => void;
  placeOrder: (
    address: Address, 
    paymentMethod: PaymentMethod,
    paymentStatus: PaymentStatus,
    paymentTransactionId?: string | null,
    paymentGateway?: string
  ) => Order;
  updateOrderStage: (orderId: string, stage: OrderStage) => void;
  markOrderAsPaid: (orderId: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addSearchHistory: (term: string) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  toggleCustomerStatus: (id: string) => void;
  toggleCoupon: (code: string) => void;
  addCoupon: (c: Coupon) => void;
  cartCount: number;
  cartTotal: number;
  orderSummary: OrderSummary;
}

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(loadState);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  const pushToast = (message: string, tone: ToastItem['tone'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const findProduct = (id: string) => state.products.find((p) => p.id === id);

  const addToCart = (productId: string, qty = 1, size?: SizeType, color?: string) => {
    const prod = findProduct(productId);
    const selectedSize: SizeType = size || prod?.size || 'Free Size';
    const selectedColor = color || prod?.color || '';

    setState((s) => {
      const existing = s.cart.find(
        (c) => c.productId === productId && (c.size === selectedSize || !c.size) && !c.savedForLater
      );
      const cart = existing
        ? s.cart.map((c) =>
            c.productId === productId && (c.size === selectedSize || !c.size) && !c.savedForLater
              ? { ...c, qty: c.qty + qty, size: selectedSize, color: selectedColor }
              : c
          )
        : [...s.cart, { productId, qty, size: selectedSize, color: selectedColor }];
      return { ...s, cart };
    });
    pushToast(`${prod?.name ?? 'Item'} added to cart`, 'success');
  };

  const updateCartQty = (productId: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.productId === productId ? { ...c, qty: Math.max(1, qty) } : c)),
    }));
  };

  const removeFromCart = (productId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.productId !== productId) }));
    pushToast('Item removed from cart', 'info');
  };

  const toggleSaveForLater = (productId: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.productId === productId ? { ...c, savedForLater: !c.savedForLater } : c)),
    }));
  };

  const toggleWishlist = (productId: string) => {
    setState((s) => {
      const inList = s.wishlist.includes(productId);
      pushToast(inList ? 'Removed from wishlist' : 'Added to wishlist', 'success');
      return { ...s, wishlist: inList ? s.wishlist.filter((id) => id !== productId) : [...s.wishlist, productId] };
    });
  };

  const moveWishlistToCart = (productId: string) => {
    addToCart(productId);
    setState((s) => ({ ...s, wishlist: s.wishlist.filter((id) => id !== productId) }));
  };

  const applyCoupon = (code: string) => {
    const coupon = state.coupons.find((c) => c.code.toLowerCase() === code.toLowerCase() && c.active);
    if (!coupon) {
      pushToast('Invalid or expired coupon code', 'error');
      return false;
    }
    setState((s) => ({ ...s, appliedCoupon: coupon.code }));
    pushToast(`Coupon ${coupon.code} applied`, 'success');
    return true;
  };

  const clearCoupon = () => setState((s) => ({ ...s, appliedCoupon: null }));

  const cartTotal = useMemo(() => {
    return state.cart
      .filter((c) => !c.savedForLater)
      .reduce((sum, c) => {
        const p = findProduct(c.productId);
        return sum + (p ? p.price * c.qty : 0);
      }, 0);
  }, [state.cart, state.products]);

  const cartCount = useMemo(
    () => state.cart.filter((c) => !c.savedForLater).reduce((n, c) => n + c.qty, 0),
    [state.cart]
  );

  const setDeliveryMethod = (method: 'standard' | 'express') => {
    setState((s) => ({ ...s, deliveryMethod: method }));
  };

  const orderSummary = useMemo<OrderSummary>(() => {
    const subtotal = state.cart
      .filter((c) => !c.savedForLater)
      .reduce((sum, c) => {
        const p = findProduct(c.productId);
        return sum + (p ? p.price * c.qty : 0);
      }, 0);

    const coupon = state.coupons.find((c) => c.code === state.appliedCoupon && c.active);
    const couponDiscount = coupon && subtotal > 0 ? Math.round(subtotal * (coupon.discountPercent / 100)) : 0;
    const couponCode = coupon ? coupon.code : null;

    const discountedSubtotal = subtotal - couponDiscount;
    const taxableAmount = discountedSubtotal;
    const gstAmount = Math.round(taxableAmount * 0.18);
    
    let shippingAmount = 0;
    if (subtotal > 0) {
      if (state.deliveryMethod === 'express') {
        shippingAmount = 299;
      } else {
        shippingAmount = subtotal > 1499 ? 0 : 99;
      }
    }

    const finalTotal = discountedSubtotal + gstAmount + shippingAmount;

    return {
      subtotal,
      couponCode,
      couponDiscount,
      taxableAmount,
      gstAmount,
      shippingAmount,
      finalTotal,
    };
  }, [state.cart, state.products, state.appliedCoupon, state.coupons, state.deliveryMethod]);

  const placeOrder = (
    address: Address, 
    paymentMethod: PaymentMethod,
    paymentStatus: PaymentStatus,
    paymentTransactionId?: string | null,
    paymentGateway?: string
  ): Order => {
    const activeItems = state.cart.filter((c) => !c.savedForLater);
    const items = activeItems.map((c) => {
      const p = findProduct(c.productId)!;
      return { 
        productId: p.id, 
        name: p.name, 
        brand: p.brand,
        sku: p.sku,
        image: p.images[0], 
        price: p.price, 
        qty: c.qty,
        size: c.size || p.size,
        color: c.color || p.color,
        total_price: p.price * c.qty
      };
    });
    
    // Validate order summary is fresh before order creation
    const { finalTotal, couponCode, couponDiscount, gstAmount, shippingAmount } = orderSummary;
    
    const now = new Date().toISOString();

    const order: Order = {
      id: `KIN${Date.now().toString().slice(-8)}`,
      date: now,
      items,
      total: finalTotal,
      coupon_code: couponCode,
      coupon_discount: couponDiscount,
      gst_amount: gstAmount,
      shipping_amount: shippingAmount,
      address,
      paymentMethod, // legacy
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      payment_transaction_id: paymentTransactionId || null,
      payment_gateway: paymentGateway || (paymentMethod === 'online' ? 'Razorpay' : undefined),
      payment_amount: finalTotal,
      payment_currency: 'INR',
      payment_completed_at: paymentStatus === 'paid' ? now : null,
      stage: (paymentMethod === 'cod' || paymentStatus === 'paid') ? 'Confirmed' : 'Placed',
      customerName: state.user?.name ?? address.name,
      customerEmail: state.user?.email ?? 'guest@kinetic.in',
      created_at: now,
      updated_at: now,
      history: [{
        id: `h1-${Date.now()}`,
        date: now,
        message: paymentMethod === 'online' && paymentStatus === 'paid' 
          ? 'Online payment completed successfully.'
          : (paymentMethod === 'cod' ? 'Order placed. COD payment pending.' : 'Order placed.'),
      }]
    };
    setState((s) => ({
      ...s,
      orders: [order, ...s.orders],
      cart: s.cart.filter((c) => c.savedForLater),
      appliedCoupon: null,
      notifications: [
        { id: `n-${order.id}`, title: 'Order placed', body: `Your order ${order.id} has been placed successfully.`, date: new Date().toISOString(), read: false },
        ...s.notifications,
      ],
    }));
    return order;
  };

  const updateOrderStage = (orderId: string, stage: OrderStage) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === orderId ? { 
        ...o, 
        stage, 
        updated_at: new Date().toISOString(),
        history: [...(o.history || []), {
          id: `h-${Date.now()}`,
          date: new Date().toISOString(),
          message: `Order status updated to ${stage}.`
        }]
      } : o)),
      notifications: [
        { id: `n-${orderId}-${stage}`, title: `Order ${stage.toLowerCase()}`, body: `Order ${orderId} is now ${stage}.`, date: new Date().toISOString(), read: false },
        ...s.notifications,
      ],
    }));
  };

  const markOrderAsPaid = (orderId: string) => {
    const now = new Date().toISOString();
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === orderId && o.payment_method === 'cod' && o.payment_status === 'pending' ? {
        ...o,
        payment_status: 'paid' as PaymentStatus,
        payment_completed_at: now,
        updated_at: now,
        history: [...(o.history || []), {
          id: `h-${Date.now()}`,
          date: now,
          message: 'COD payment collected on delivery.'
        }]
      } : o)),
    }));
    pushToast(`Order ${orderId} marked as paid`, 'success');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    setState((s) => ({ ...s, addresses: [...s.addresses, { ...address, id: `a${Date.now()}` }] }));
    pushToast('Address saved', 'success');
  };

  const login = (name: string, email: string) => {
    setState((s) => ({ ...s, user: { id: 'u1', name, email, phone: '9876543210' } }));
    pushToast(`Welcome back, ${name.split(' ')[0]}`, 'success');
  };

  const logout = () => {
    setState((s) => ({ ...s, user: null }));
    pushToast('Signed out', 'info');
  };

  const markNotificationRead = (id: string) =>
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) }));

  const markAllNotificationsRead = () =>
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));

  const addSearchHistory = (term: string) => {
    if (!term.trim()) return;
    setState((s) => ({ ...s, searchHistory: [term, ...s.searchHistory.filter((t) => t !== term)].slice(0, 8) }));
  };

  const addProduct = (p: Product) => {
    setState((s) => ({ ...s, products: [p, ...s.products] }));
    pushToast('Product added', 'success');
  };
  const updateProduct = (p: Product) => {
    setState((s) => ({ ...s, products: s.products.map((x) => (x.id === p.id ? p : x)) }));
    pushToast('Product updated', 'success');
  };
  const deleteProduct = (id: string) => {
    setState((s) => ({ ...s, products: s.products.filter((x) => x.id !== id) }));
    pushToast('Product deleted', 'info');
  };

  const toggleCustomerStatus = (id: string) => {
    setState((s) => ({
      ...s,
      customers: s.customers.map((c) => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c)),
    }));
  };

  const toggleCoupon = (code: string) => {
    setState((s) => ({ ...s, coupons: s.coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c)) }));
  };

  const addCoupon = (c: Coupon) => {
    setState((s) => ({ ...s, coupons: [c, ...s.coupons] }));
    pushToast('Coupon created', 'success');
  };

  const value: StoreApi = {
    ...state,
    toasts,
    pushToast,
    addToCart,
    updateCartQty,
    removeFromCart,
    toggleSaveForLater,
    toggleWishlist,
    moveWishlistToCart,
    applyCoupon,
    clearCoupon,
    setDeliveryMethod,
    placeOrder,
    updateOrderStage,
    markOrderAsPaid,
    addAddress,
    login,
    logout,
    markNotificationRead,
    markAllNotificationsRead,
    addSearchHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleCustomerStatus,
    toggleCoupon,
    addCoupon,
    cartCount,
    cartTotal,
    orderSummary,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export { seedBrands };
