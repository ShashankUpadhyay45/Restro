import api from './axios';

export const authApi = {
  // POST /api/auth/login
  login: async (credentials) => {
    // TODO: Connect to live backend POST /api/auth/login
    return api.post('/auth/login', credentials);
  },

  // POST /api/auth/register
  register: async (userData) => {
    // TODO: Connect to live backend POST /api/auth/register
    return api.post('/auth/register', userData);
  },

  // GET /api/auth/me
  getCurrentUser: async () => {
    // TODO: Connect to live backend GET /api/auth/me
    return api.get('/auth/me');
  },

  // POST /api/auth/logout
  logout: async () => {
    // TODO: Connect to live backend POST /api/auth/logout
    return api.post('/auth/logout');
  },

  // POST /api/auth/refresh
  refreshToken: async (token) => {
    return api.post('/auth/refresh', { token });
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  // POST /api/auth/reset-password
  resetPassword: async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  // POST /api/auth/google
  googleLogin: async (credential) => {
    return api.post('/auth/google', { credential });
  }
};
