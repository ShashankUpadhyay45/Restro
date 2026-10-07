import { storageService } from './storageService';
import { INITIAL_BOOKINGS, INITIAL_TABLES } from '../data/mockData';

export const bookingService = {
  getTables: () => {
    return storageService.get('tables', INITIAL_TABLES);
  },

  updateTableStatus: async (tableId, newStatus) => {
    const tables = storageService.get('tables', INITIAL_TABLES);
    const updated = tables.map(t => t.id === tableId ? { ...t, status: newStatus } : t);
    storageService.set('tables', updated);
    window.dispatchEvent(new CustomEvent('ember_table_updated', { detail: { tableId, status: newStatus } }));
    return updated;
  },

  getBookings: () => {
    return storageService.get('bookings', INITIAL_BOOKINGS);
  },

  createBooking: async (bookingData) => {
    await new Promise(r => setTimeout(r, 600));
    const bookings = storageService.get('bookings', INITIAL_BOOKINGS);
    const bookingNumber = `BKG-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = {
      id: bookingNumber,
      bookingNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };

    const updatedBookings = [newBooking, ...bookings];
    storageService.set('bookings', updatedBookings);

    // Also mark the table reserved
    if (bookingData.tableId) {
      const tables = storageService.get('tables', INITIAL_TABLES);
      const updatedTables = tables.map(t => t.id === bookingData.tableId ? { ...t, status: 'reserved' } : t);
      storageService.set('tables', updatedTables);
    }

    window.dispatchEvent(new CustomEvent('ember_booking_created', { detail: newBooking }));
    return newBooking;
  },

  updateBookingStatus: async (bookingId, newStatus) => {
    const bookings = storageService.get('bookings', INITIAL_BOOKINGS);
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    storageService.set('bookings', updated);
    return updated.find(b => b.id === bookingId);
  }
};
