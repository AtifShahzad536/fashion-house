import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Shell
import AnnouncementBar from './components/layout/AnnouncementBar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import SearchModal from './components/layout/SearchModal.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import MobileMenuDrawer from './components/layout/MobileMenuDrawer.jsx';
import QuickViewModal from './components/common/QuickViewModal.jsx';
import PromoDiscountBanner from './components/common/PromoDiscountBanner.jsx';

// Public & Customer Pages
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx';
import AdminProductEditPage from './pages/admin/AdminProductEditPage.jsx';
import AdminDiscountPage from './pages/admin/AdminDiscountPage.jsx';
import AdminSocialLinksPage from './pages/admin/AdminSocialLinksPage.jsx';
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx';
import AdminCMSPage from './pages/admin/AdminCMSPage.jsx';

import { ADMIN_BASE_PATH } from './constants/theme.js';

export default function App() {
  return (
    <Routes>
      {/* Admin Panel Protected Nested Routes with Unique Secure Path */}
      <Route
        path={ADMIN_BASE_PATH}
        element={
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/products`}
        element={
          <AdminLayout>
            <AdminProductsPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/products/new`}
        element={
          <AdminLayout>
            <AdminProductEditPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/products/edit/:id`}
        element={
          <AdminLayout>
            <AdminProductEditPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/discounts`}
        element={
          <AdminLayout>
            <AdminDiscountPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/social-links`}
        element={
          <AdminLayout>
            <AdminSocialLinksPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/orders`}
        element={
          <AdminLayout>
            <AdminOrdersPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/hero-slides`}
        element={
          <AdminLayout>
            <AdminCMSPage />
          </AdminLayout>
        }
      />
      <Route
        path={`${ADMIN_BASE_PATH}/coupons`}
        element={
          <AdminLayout>
            <AdminCMSPage />
          </AdminLayout>
        }
      />

      {/* Customer Storefront Routes (Standard Shell with Header, Announcement & Footer) */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col bg-bridal-ivory text-bridal-charcoal font-sans">
            <AnnouncementBar />
            <Navbar />
            <PromoDiscountBanner />
            <SearchModal />
            <CartDrawer />
            <MobileMenuDrawer />
            <QuickViewModal />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account/*" element={<AccountPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
