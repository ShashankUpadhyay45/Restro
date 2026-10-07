import api from './axios';

export const paymentApi = {
  // POST /api/payments/create-order
  createPaymentOrder: async (amount, currency = 'INR') => {
    // TODO: Connect to backend Razorpay/Stripe order generation
    return api.post('/payments/create-order', { amount, currency });
  },

  // POST /api/payments/verify
  verifyPayment: async (paymentDetails) => {
    // TODO: Verify HMAC signature
    return api.post('/payments/verify', paymentDetails);
  },

  // POST /api/payments/refund
  refundPayment: async (orderId, amount) => {
    return api.post('/payments/refund', { orderId, amount });
  }
};

export const adminApi = {
  getOrders: async (params) => api.get('/admin/orders', { params }),
  updateOrderStatus: async (orderId, status) => api.patch(`/admin/orders/${orderId}/status`, { status }),
  createFood: async (foodData) => api.post('/admin/menu', foodData),
  updateFood: async (id, foodData) => api.put(`/admin/menu/${id}`, foodData),
  deleteFood: async (id) => api.delete(`/admin/menu/${id}`),
  toggleFoodStock: async (id, inStock) => api.patch(`/admin/menu/${id}/stock`, { inStock }),
  getTables: async () => api.get('/admin/tables'),
  updateTableStatus: async (tableId, status) => api.patch(`/admin/tables/${tableId}/status`, { status }),
  getBookings: async (params) => api.get('/admin/bookings', { params }),
  updateBookingStatus: async (bookingId, status) => api.patch(`/admin/bookings/${bookingId}/status`, { status }),
  getStaff: async () => api.get('/admin/staff'),
  getCustomers: async () => api.get('/admin/customers'),
  getOffers: async () => api.get('/admin/offers'),
  getInventory: async () => api.get('/admin/inventory')
};

export const customerApi = {
  getProfile: async () => api.get('/customer/profile'),
  updateProfile: async (data) => api.put('/customer/profile', data),
  getAddresses: async () => api.get('/customer/addresses'),
  addAddress: async (address) => api.post('/customer/addresses', address),
  deleteAddress: async (id) => api.delete(`/customer/addresses/${id}`)
};

export const staffApi = {
  getKitchenOrders: async () => api.get('/staff/kitchen/orders'),
  getWaiterTables: async () => api.get('/staff/waiter/tables'),
  getCashierBills: async () => api.get('/staff/cashier/bills')
};

export const reviewApi = {
  getReviews: async (foodId) => api.get('/reviews', { params: { foodId } }),
  createReview: async (reviewData) => api.post('/reviews', reviewData),
  replyReview: async (reviewId, reply) => api.post(`/reviews/${reviewId}/reply`, { reply })
};

export const offerApi = {
  getActiveOffers: async () => api.get('/offers'),
  validateCoupon: async (code, cartTotal) => api.post('/offers/validate', { code, cartTotal })
};

export const analyticsApi = {
  getOverview: async (period = '7days') => api.get('/admin/analytics', { params: { period } })
};
