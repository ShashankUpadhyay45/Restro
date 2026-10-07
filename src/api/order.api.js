import api from './axios';

export const orderApi = {
  // POST /api/orders
  createOrder: async (orderData) => {
    // TODO: Connect to POST /api/orders
    return api.post('/orders', orderData);
  },

  // GET /api/orders
  getMyOrders: async () => {
    // TODO: Connect to GET /api/orders
    return api.get('/orders');
  },

  // GET /api/orders/:id
  getOrderById: async (id) => {
    // TODO: Connect to GET /api/orders/:id
    return api.get(`/orders/${id}`);
  },

  // GET /api/orders/:id/track
  trackOrder: async (id) => {
    // TODO: Connect to GET /api/orders/:id/track
    return api.get(`/orders/${id}/track`);
  },

  // POST /api/orders/:id/cancel
  cancelOrder: async (id, reason) => {
    return api.post(`/orders/${id}/cancel`, { reason });
  }
};
