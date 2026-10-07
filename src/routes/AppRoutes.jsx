import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import OwnerLayout from '../layouts/OwnerLayout';
import StaffLayout from '../layouts/StaffLayout';

// Auth
import LoginPage from '../pages/auth/LoginPage';

// Customer Pages
import CustomerHomePage from '../pages/customer/CustomerHomePage';
import CustomerMenuPage from '../pages/customer/CustomerMenuPage';
import FoodDetailPage from '../pages/customer/FoodDetailPage';
import CartPage from '../pages/customer/CartPage';
import CheckoutPage from '../pages/customer/CheckoutPage';
import OrderSuccessPage from '../pages/customer/OrderSuccessPage';
import OrderTrackingPage from '../pages/customer/OrderTrackingPage';
import OrderHistoryPage from '../pages/customer/OrderHistoryPage';
import TableBookingPage from '../pages/customer/TableBookingPage';
import CustomerProfilePage from '../pages/customer/CustomerProfilePage';
import FavoritesPage from '../pages/customer/FavoritesPage';
import CustomerNotificationsPage from '../pages/customer/CustomerNotificationsPage';

// Owner Dashboard Pages
import OwnerDashboardOverview from '../pages/owner/OwnerDashboardOverview';
import OwnerOrdersPage from '../pages/owner/OwnerOrdersPage';
import OwnerMenuPage from '../pages/owner/OwnerMenuPage';
import OwnerCategoriesPage from '../pages/owner/OwnerCategoriesPage';
import OwnerTablesPage from '../pages/owner/OwnerTablesPage';
import OwnerBookingsPage from '../pages/owner/OwnerBookingsPage';
import OwnerCustomersPage from '../pages/owner/OwnerCustomersPage';
import OwnerStaffPage from '../pages/owner/OwnerStaffPage';
import OwnerOffersPage from '../pages/owner/OwnerOffersPage';
import OwnerInventoryPage from '../pages/owner/OwnerInventoryPage';
import OwnerAnalyticsPage from '../pages/owner/OwnerAnalyticsPage';
import OwnerReviewsPage from '../pages/owner/OwnerReviewsPage';
import OwnerSettingsPage from '../pages/owner/OwnerSettingsPage';

// Staff Dashboard Pages
import StaffDashboardPage from '../pages/staff/StaffDashboardPage';

// Error Pages
import NotFoundPage from '../pages/error/NotFoundPage';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';
import ServerErrorPage from '../pages/error/ServerErrorPage';

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-ember-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <Routes>
        {/* Entry 3D Role Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Customer Experience Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="/customer/home" replace />} />
          <Route path="home" element={<CustomerHomePage />} />
          <Route path="menu" element={<CustomerMenuPage />} />
          <Route path="menu/:foodId" element={<FoodDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="orders/:orderId/track" element={<OrderTrackingPage />} />
          <Route path="book-table" element={<TableBookingPage />} />
          <Route path="bookings" element={<TableBookingPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={['customer', 'owner', 'staff']}>
                <CustomerProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="notifications" element={<CustomerNotificationsPage />} />
        </Route>

        {/* Restaurant Owner Dashboard Routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/owner/dashboard" replace />} />
          <Route path="dashboard" element={<OwnerDashboardOverview />} />
          <Route path="orders" element={<OwnerOrdersPage />} />
          <Route path="menu" element={<OwnerMenuPage />} />
          <Route path="categories" element={<OwnerCategoriesPage />} />
          <Route path="tables" element={<OwnerTablesPage />} />
          <Route path="bookings" element={<OwnerBookingsPage />} />
          <Route path="customers" element={<OwnerCustomersPage />} />
          <Route path="staff" element={<OwnerStaffPage />} />
          <Route path="offers" element={<OwnerOffersPage />} />
          <Route path="inventory" element={<OwnerInventoryPage />} />
          <Route path="analytics" element={<OwnerAnalyticsPage />} />
          <Route path="reviews" element={<OwnerReviewsPage />} />
          <Route path="settings" element={<OwnerSettingsPage />} />
        </Route>

        {/* Staff & Kitchen POS Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={['staff', 'owner']}>
              <StaffLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/staff/dashboard" replace />} />
          <Route path="dashboard" element={<StaffDashboardPage />} />
          <Route path="orders" element={<StaffDashboardPage />} />
          <Route path="tables" element={<StaffDashboardPage />} />
          <Route path="bookings" element={<StaffDashboardPage />} />
        </Route>

        {/* Error Boundaries & Catch-All */}
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="/403" element={<UnauthorizedPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
