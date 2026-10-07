import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import {
  INITIAL_FOODS,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_OFFERS,
  INITIAL_CUSTOMERS,
  INITIAL_STAFF,
  INITIAL_REVIEWS,
  INITIAL_INVENTORY,
  RESTAURANT_INFO
} from '../data/mockData';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantInfo, setRestaurantInfo] = useState(() => storageService.get('info', RESTAURANT_INFO));
  const [foods, setFoods] = useState(() => storageService.get('foods', INITIAL_FOODS));
  const [tables, setTables] = useState(() => storageService.get('tables', INITIAL_TABLES));
  const [orders, setOrders] = useState(() => storageService.get('orders', INITIAL_ORDERS));
  const [bookings, setBookings] = useState(() => storageService.get('bookings', INITIAL_BOOKINGS));
  const [offers, setOffers] = useState(() => storageService.get('offers', INITIAL_OFFERS));
  const [customers, setCustomers] = useState(() => storageService.get('customers', INITIAL_CUSTOMERS));
  const [staffList, setStaffList] = useState(() => storageService.get('staff', INITIAL_STAFF));
  const [reviews, setReviews] = useState(() => storageService.get('reviews', INITIAL_REVIEWS));
  const [inventory, setInventory] = useState(() => storageService.get('inventory', INITIAL_INVENTORY));
  const [favorites, setFavorites] = useState(() => storageService.get('favorites', ['food_01', 'food_09']));

  const [notifications, setNotifications] = useState(() =>
    storageService.get('notifications', [
      {
        id: "notif_1",
        title: "Chef's Compliment",
        message: "Try our new Truffle Butter Naan paired with Dal Bukhara today.",
        type: "offer",
        read: false,
        time: "10m ago"
      },
      {
        id: "notif_2",
        title: "Table Reserved",
        message: "Your reservation for Window Garden 2 has been confirmed.",
        type: "booking",
        read: false,
        time: "1h ago"
      }
    ])
  );

  // Sync state changes with storage
  useEffect(() => { storageService.set('info', restaurantInfo); }, [restaurantInfo]);
  useEffect(() => { storageService.set('foods', foods); }, [foods]);
  useEffect(() => { storageService.set('tables', tables); }, [tables]);
  useEffect(() => { storageService.set('orders', orders); }, [orders]);
  useEffect(() => { storageService.set('bookings', bookings); }, [bookings]);
  useEffect(() => { storageService.set('offers', offers); }, [offers]);
  useEffect(() => { storageService.set('customers', customers); }, [customers]);
  useEffect(() => { storageService.set('staff', staffList); }, [staffList]);
  useEffect(() => { storageService.set('reviews', reviews); }, [reviews]);
  useEffect(() => { storageService.set('inventory', inventory); }, [inventory]);
  useEffect(() => { storageService.set('favorites', favorites); }, [favorites]);
  useEffect(() => { storageService.set('notifications', notifications); }, [notifications]);

  // Food Menu Operations (Owner CRUD)
  const addFood = (newFood) => {
    const foodWithId = {
      ...newFood,
      id: `food_${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      inStock: true
    };
    setFoods(prev => [foodWithId, ...prev]);
    return foodWithId;
  };

  const updateFood = (id, updatedFields) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, ...updatedFields } : f));
  };

  const deleteFood = (id) => {
    setFoods(prev => prev.filter(f => f.id !== id));
  };

  const toggleFoodStock = (id) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, inStock: !f.inStock } : f));
  };

  // Order Operations
  const createOrder = (orderData) => {
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderNumber,
      orderNumber,
      status: 'placed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: orderData.orderType === 'dine-in' ? '15-20 mins (Table)' : '35-40 mins',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);

    // Push notification
    addNotification({
      title: `Order Placed #${newOrder.orderNumber}`,
      message: `Your feast of ${newOrder.items.length} dishes is now confirmed with the kitchen.`,
      type: "order"
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId || ord.orderNumber === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Table & Booking Operations
  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  const createBooking = (bookingData) => {
    const bookingNumber = `BKG-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      id: bookingNumber,
      bookingNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);

    // Update table status to reserved
    if (bookingData.tableId) {
      updateTableStatus(bookingData.tableId, 'reserved');
    }

    addNotification({
      title: `Table Confirmed #${bookingNumber}`,
      message: `Reserved ${bookingData.tableName} for ${bookingData.guests} guests on ${bookingData.date} at ${bookingData.time}.`,
      type: "booking"
    });

    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  // Favorites
  const toggleFavorite = (foodId) => {
    setFavorites(prev => {
      if (prev.includes(foodId)) {
        return prev.filter(id => id !== foodId);
      } else {
        return [...prev, foodId];
      }
    });
  };

  const isFavorite = (foodId) => favorites.includes(foodId);

  // Reviews
  const addReview = (reviewData) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      date: 'Just now',
      likes: 0,
      ...reviewData
    };
    setReviews(prev => [newRev, ...prev]);
    return newRev;
  };

  // Notifications
  const addNotification = ({ title, message, type = 'general' }) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      read: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantInfo,
        setRestaurantInfo,
        foods,
        addFood,
        updateFood,
        deleteFood,
        toggleFoodStock,
        tables,
        updateTableStatus,
        orders,
        createOrder,
        updateOrderStatus,
        bookings,
        createBooking,
        updateBookingStatus,
        offers,
        setOffers,
        customers,
        staffList,
        setStaffList,
        reviews,
        addReview,
        inventory,
        setInventory,
        favorites,
        toggleFavorite,
        isFavorite,
        notifications,
        addNotification,
        markAllNotificationsRead
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
