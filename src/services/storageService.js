/**
 * Client storage utility for seamless mock persistence and hydration
 */
export const storageService = {
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(`ember_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.warn(`Error reading ${key} from storage:`, err);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`ember_${key}`, JSON.stringify(value));
    } catch (err) {
      console.warn(`Error writing ${key} to storage:`, err);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(`ember_${key}`);
    } catch (err) {
      console.warn(`Error removing ${key} from storage:`, err);
    }
  }
};
