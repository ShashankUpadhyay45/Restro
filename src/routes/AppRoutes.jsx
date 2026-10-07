import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Layouts
const CustomerLayout = lazy(() => import('../layouts/CustomerLayout'));
const OwnerLayout = lazy(() => import('../layouts/OwnerLayout'));
const StaffLayout = lazy(() => import('../layouts/StaffLayout'));

// Auth
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// Customer Pages
const CustomerHomePage = lazy(() => import('../pages/customer/CustomerHomePage'));
const CustomerMenuPage = lazy(() => import('../pages/customer/CustomerMenuPage'));
const FoodDetailPage = lazy(() => import('../pages/customer/FoodDetailPage'));
const CartPage = lazy(() => import('../pages/customer/CartPage'));
const CheckoutPage = lazy(() => import('../pages/customer/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/customer/OrderSuccessPage'));
const OrderTrackingPage = lazy(() => import('../pages/customer/OrderTrackingPage'));
const OrderHistoryPage = lazy(() => import('../pages/customer/OrderHistoryPage'));
const TableBookingPage = lazy(() => import('../pages/customer/TableBookingPage'));
const CustomerProfilePage = lazy(() => import('../pages/customer/CustomerProfilePage'));
const FavoritesPage = lazy(() => import('../pages/customer/FavoritesPage'));
const CustomerNotificationsPage = lazy(() => import('../pages/customer/CustomerNotificationsPage'));

// Owner Dashboard Pages
const OwnerDashboardOverview = lazy(() => import('../pages/owner/OwnerDashboardOverview'));
const OwnerOrdersPage = lazy(() => import('../pages/owner/OwnerOrdersPage'));
const OwnerMenuPage = lazy(() => import('../pages/owner/OwnerMenuPage'));
const OwnerCategoriesPage = lazy(() => import('../pages/owner/OwnerCategoriesPage'));
const OwnerTablesPage = lazy(() => import('../pages/owner/OwnerTablesPage'));
const OwnerBookingsPage = lazy(() => import('../pages/owner/OwnerBookingsPage'));
const OwnerCustomersPage = lazy(() => import('../pages/owner/OwnerCustomersPage'));
const OwnerStaffPage = lazy(() => import('../pages/owner/OwnerStaffPage'));
const OwnerOffersPage = lazy(() => import('../pages/owner/OwnerOffersPage'));
const OwnerInventoryPage = lazy(() => import('../pages/owner/OwnerInventoryPage'));
const OwnerAnalyticsPage = lazy(() => import('../pages/owner/OwnerAnalyticsPage'));
const OwnerReviewsPage = lazy(() => import('../pages/owner/OwnerReviewsPage'));
const OwnerSettingsPage = lazy(() => import('../pages/owner/OwnerSettingsPage'));

// Staff Dashboard Pages
const StaffDashboardPage = lazy(() => import('../pages/staff/StaffDashboardPage'));

// Error Pages
const NotFoundPage = lazy(() => import('../pages/error/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('../pages/error/UnauthorizedPage'));
const ServerErrorPage = lazy(() => import('../pages/error/ServerErrorPage'));

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
