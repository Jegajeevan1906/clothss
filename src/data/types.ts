export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export type CategoryType = 'silk' | 'cotton' | 'traditional' | 'designer';
export type SizeType = 'Free Size' | 'Unstitched Blouse' | 'Stitched S' | 'Stitched M' | 'Stitched L' | 'Stitched XL' | 'Stitched XXL';

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  name: string;
  category: CategoryType;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  shortDescription: string;
  description: string;
  size: SizeType;
  color: string;
  fabric: string;
  gender: string;
  occasion?: string;
  weaveCraft?: string;
  sareeLength?: string;
  blouseDetails?: string;
  ageGroup: string;
  careInstructions?: string;
  specialFeatures?: string[];
  deliveryDays: number;
  badges?: string[];
  reviews: Review[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface CartItem {
  productId: string;
  qty: number;
  size?: SizeType;
  color?: string;
  savedForLater?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  sku: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
  total_price: number;
}

export type PaymentMethod = 'online' | 'cod';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface OrderHistoryEvent {
  id: string;
  date: string;
  message: string;
}

export type OrderStage = 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  coupon_code?: string | null;
  coupon_discount?: number;
  gst_amount?: number;
  shipping_amount?: number;
  address: Address;
  paymentMethod: string; // legacy support
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_gateway?: string;
  payment_transaction_id?: string | null;
  payment_reference_id?: string;
  payment_amount?: number;
  payment_currency?: string;
  payment_completed_at?: string | null;
  history: OrderHistoryEvent[];
  stage: OrderStage;
  customerName: string;
  customerEmail: string;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent: number;
  minOrder: number;
  active: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  orders: number;
  totalSpent: number;
  status: 'Active' | 'Blocked';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

