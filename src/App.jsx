import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import CustomCursor from './components/3d/CustomCursor';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <RestaurantProvider>
              <CartProvider>
                <BrowserRouter>
                  <CustomCursor />
                  <AppRoutes />
                </BrowserRouter>
              </CartProvider>
            </RestaurantProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
