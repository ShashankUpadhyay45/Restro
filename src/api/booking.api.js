import api from './axios';

export const bookingApi = {
  // GET /api/bookings/availability
  getAvailability: async (params) => {
    // TODO: Connect to GET /api/bookings/availability
    return api.get('/bookings/availability', { params });
  },

  // POST /api/bookings
  createBooking: async (bookingData) => {
    // TODO: Connect to POST /api/bookings
    return api.post('/bookings', bookingData);
  },

  // GET /api/bookings
  getMyBookings: async () => {
    return api.get('/bookings');
  },

  // GET /api/bookings/:id
  getBookingById: async (id) => {
    return api.get(`/bookings/${id}`);
  },

  // POST /api/bookings/:id/cancel
  cancelBooking: async (id) => {
    // TODO: Connect to POST /api/bookings/:id/cancel
    return api.post(`/bookings/${id}/cancel`);
  },

  // POST /api/bookings/:id/reschedule
  rescheduleBooking: async (id, newDateData) => {
    // TODO: Connect to POST /api/bookings/:id/reschedule
    return api.post(`/bookings/${id}/reschedule`, newDateData);
  }
};
