import { storageService } from './storageService';
import { INITIAL_ORDERS, RESTAURANT_INFO } from '../data/mockData';

export const orderService = {
  getOrders: () => {
    return storageService.get('orders', INITIAL_ORDERS);
  },

  getOrderById: (orderId) => {
    const orders = storageService.get('orders', INITIAL_ORDERS);
    return orders.find(o => o.id === orderId || o.orderNumber === orderId) || null;
  },

  createOrder: async (orderPayload) => {
    // Simulated network latency
    await new Promise(r => setTimeout(r, 600));

    const orders = storageService.get('orders', INITIAL_ORDERS);
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderNumber,
      orderNumber,
      status: 'placed', // placed -> confirmed -> preparing -> ready -> out_for_delivery -> delivered
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: orderPayload.orderType === 'dine-in' ? '15-20 mins (Table)' : '30-40 mins',
      ...orderPayload
    };

    const updated = [newOrder, ...orders];
    storageService.set('orders', updated);

    // Dispatch global event for live simulation
    window.dispatchEvent(new CustomEvent('ember_order_updated', { detail: newOrder }));

    return newOrder;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const orders = storageService.get('orders', INITIAL_ORDERS);
    const updated = orders.map(ord => {
      if (ord.id === orderId || ord.orderNumber === orderId) {
        return {
          ...ord,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return ord;
    });

    storageService.set('orders', updated);
    window.dispatchEvent(new CustomEvent('ember_order_updated', { detail: { id: orderId, status: newStatus } }));
    return updated.find(o => o.id === orderId);
  },

  calculateBill: (items = [], coupon = null, orderType = 'delivery') => {
    const subtotal = items.reduce((acc, item) => {
      return acc + (item.unitPrice * item.quantity);
    }, 0);

    let discount = 0;
    if (coupon) {
      if (coupon.percentage && subtotal >= (coupon.minOrder || 0)) {
        discount = Math.min((subtotal * coupon.percentage) / 100, coupon.maxDiscount || 9999);
      } else if (coupon.flatDiscount && subtotal >= (coupon.minOrder || 0)) {
        discount = coupon.flatDiscount;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Math.round(discountedSubtotal * RESTAURANT_INFO.taxRate * 100) / 100;
    const packagingFee = orderType === 'delivery' || orderType === 'takeaway' ? RESTAURANT_INFO.packagingFee : 0;
    const deliveryFee = orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
    const total = Math.round((discountedSubtotal + tax + packagingFee + deliveryFee) * 100) / 100;

    return {
      subtotal,
      discount,
      couponCode: coupon?.code || '',
      tax,
      packagingFee,
      deliveryFee,
      total
    };
  }
};
