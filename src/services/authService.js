import { storageService } from './storageService';
import { authApi } from '../api/auth.api';

const DEMO_USERS = {
  customer: {
    id: "usr_c101",
    name: "Aarav Sharma",
    email: "customer@demo.com",
    role: "customer",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    savedAddresses: [
      {
        id: "addr_1",
        label: "Home",
        street: "Flat 402, Embassy Habitat, 80ft Road",
        city: "Indiranagar, Bengaluru",
        pincode: "560038",
        isDefault: true
      },
      {
        id: "addr_2",
        label: "Office",
        street: "WeWork Galaxy, 43 Residency Road",
        city: "Ashok Nagar, Bengaluru",
        pincode: "560025",
        isDefault: false
      }
    ]
  },
  owner: {
    id: "usr_o201",
    name: "Vikramaditya Oberoi",
    email: "owner@demo.com",
    role: "owner",
    phone: "+91 98450 99887",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    restaurant: "Ember & Spice flagship"
  },
  staff: {
    id: "usr_s301",
    name: "Chef Harpal Soni",
    email: "staff@demo.com",
    role: "staff",
    subRole: "kitchen", // kitchen | waiter | cashier
    phone: "+91 98200 11001",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
};

export const authService = {
  login: async ({ email, password, role = 'customer' }) => {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 600));

    // In production: const response = await authApi.login({ email, password, role });
    const userRole = role.toLowerCase();
    const demoUser = DEMO_USERS[userRole] || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: userRole,
      phone: "+91 98765 00000",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    };

    const mockToken = `mock_jwt_token_${userRole}_${Date.now()}`;
    storageService.set('user', demoUser);
    storageService.set('token', mockToken);
    localStorage.setItem('ember_token', mockToken);

    return { user: demoUser, token: mockToken };
  },

  register: async (userData) => {
    await new Promise((r) => setTimeout(r, 700));
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98765 43210",
      role: userData.role || 'customer',
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      savedAddresses: []
    };
    const mockToken = `mock_jwt_token_customer_${Date.now()}`;
    storageService.set('user', newUser);
    storageService.set('token', mockToken);
    localStorage.setItem('ember_token', mockToken);
    return { user: newUser, token: mockToken };
  },

  logout: async () => {
    storageService.remove('user');
    storageService.remove('token');
    localStorage.removeItem('ember_token');
    return true;
  },

  getCurrentUser: () => {
    return storageService.get('user', null);
  },

  updateProfile: async (updatedData) => {
    const current = storageService.get('user', null);
    if (!current) return null;
    const merged = { ...current, ...updatedData };
    storageService.set('user', merged);
    return merged;
  }
};
