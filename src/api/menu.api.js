import api from './axios';

export const menuApi = {
  // GET /api/menu
  getDishes: async (params) => {
    // TODO: Connect to GET /api/menu with query params
    return api.get('/menu', { params });
  },

  // GET /api/menu/:id
  getDishById: async (id) => {
    // TODO: Connect to GET /api/menu/:id
    return api.get(`/menu/${id}`);
  },

  // GET /api/categories
  getCategories: async () => {
    // TODO: Connect to GET /api/categories
    return api.get('/categories');
  },

  // GET /api/menu/specials
  getSpecials: async () => {
    return api.get('/menu/specials');
  }
};
