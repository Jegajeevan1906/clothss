import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './lib/store';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Home } from './pages/Home';
import { ProductListing } from './pages/ProductListing';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ReturnPolicy } from './pages/ReturnPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { Notifications } from './pages/Notifications';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailed } from './pages/PaymentFailed';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { OtpVerification } from './pages/auth/OtpVerification';

import { Dashboard } from './pages/customer/Dashboard';
import { Orders } from './pages/customer/Orders';
import { OrderTracking } from './pages/customer/OrderTracking';
import { Wishlist } from './pages/customer/Wishlist';
import { Addresses } from './pages/customer/Addresses';
import { Profile } from './pages/customer/Profile';
import { Settings } from './pages/customer/Settings';

import { Suspense, lazy } from 'react';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then((m) => ({ default: m.AdminAnalytics })));
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminSettings } from './pages/admin/AdminSettings';

import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing mode="all" />} />
              <Route path="/category/:categoryId" element={<ProductListing mode="category" />} />
              <Route path="/search" element={<ProductListing mode="search" />} />
              <Route path="/deals" element={<ProductListing mode="deals" />} />
              <Route path="/new-arrivals" element={<ProductListing mode="new-arrivals" />} />
              <Route path="/brands" element={<ProductListing mode="brands" />} />
              <Route path="/product/:slug" element={<ProductDetail />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/notifications" element={<Notifications />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />

              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/otp" element={<OtpVerification />} />

              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/orders/:orderId" element={<OrderTracking />} />
              <Route path="/dashboard/addresses" element={<Addresses />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/settings" element={<Settings />} />

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<Suspense fallback={<div className="p-8 text-sm text-muted">Loading analytics…</div>}><AdminAnalytics /></Suspense>} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm mode="add" />} />
              <Route path="products/:id/edit" element={<AdminProductForm mode="edit" />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </HashRouter>
    </StoreProvider>
  );
}
