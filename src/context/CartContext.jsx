import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { orderService } from '../services/orderService';
import { INITIAL_OFFERS } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => storageService.get('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState(() => storageService.get('applied_coupon', null));
  const [orderType, setOrderType] = useState(() => storageService.get('order_type', 'delivery')); // 'delivery' | 'takeaway' | 'dine-in'
  const [selectedTable, setSelectedTable] = useState(() => storageService.get('selected_table', null));

  useEffect(() => {
    storageService.set('cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    storageService.set('applied_coupon', appliedCoupon);
  }, [appliedCoupon]);

  useEffect(() => {
    storageService.set('order_type', orderType);
  }, [orderType]);

  useEffect(() => {
    storageService.set('selected_table', selectedTable);
  }, [selectedTable]);

  const addToCart = ({
    food,
    quantity = 1,
    portion = null,
    portionDelta = 0,
    spiceLevel = 'medium',
    selectedAddOns = [] // Array of { name, price }
  }) => {
    // Generate unique composite key based on food id + portion + spice + sorted addons
    const addOnsKey = selectedAddOns.map(a => a.name).sort().join('|');
    const portionName = portion || (food.customizations?.portions?.[0]?.name || 'Regular');
    const cartItemId = `${food.id}_${portionName}_${spiceLevel}_${addOnsKey}`;

    const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + (item.price || 0), 0);
    const unitPrice = (food.discountPrice || food.price) + portionDelta + addOnsTotal;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          totalPrice: (next[existingIndex].quantity + quantity) * unitPrice
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            foodId: food.id,
            name: food.name,
            image: food.image,
            isVeg: food.isVeg,
            portion: portionName,
            spiceLevel,
            addOns: selectedAddOns.map(a => a.name),
            unitPrice,
            quantity,
            totalPrice: unitPrice * quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (couponCode) => {
    const found = INITIAL_OFFERS.find(o => o.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      throw new Error(`Coupon "${couponCode}" is invalid.`);
    }

    const currentSubtotal = cartItems.reduce((acc, i) => acc + i.totalPrice, 0);
    if (found.minOrder && currentSubtotal < found.minOrder) {
      throw new Error(`Coupon requires a minimum order of ₹${found.minOrder}.`);
    }

    setAppliedCoupon(found);
    return found;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Bill calculations
  const bill = orderService.calculateBill(cartItems, appliedCoupon, orderType);
  const totalItemsCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        orderType,
        setOrderType,
        selectedTable,
        setSelectedTable,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        bill
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
