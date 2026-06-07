import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

// Derives a user-specific localStorage key so carts are fully isolated per user.
// Unauthenticated users share a guest key that is abandoned on login (their cart resets).
const getCartKey = (userId) =>
  userId ? `gearbazar_cart_${userId}` : 'gearbazar_cart_guest';

const readCart = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const cartKey = getCartKey(user?._id || user?.id);

  // Re-initialise cart whenever the logged-in user changes (login / logout).
  const [cartItems, setCartItems] = useState(() => readCart(cartKey));

  useEffect(() => {
    // Switch to the new user's cart whenever identity changes.
    setCartItems(readCart(cartKey));
  }, [cartKey]);

  // Persist on every change.
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item._id === productId) {
        const newQty = Math.max(1, Math.min(item.stock || 99, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearItem = useCallback((productId) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
