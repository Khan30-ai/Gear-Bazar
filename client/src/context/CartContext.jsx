import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {     //to avoid reading local storage on every render
    try {
      const stored = localStorage.getItem('gearbazar_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("Failed to read cart from local storage", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gearbazar_cart', JSON.stringify(cartItems));  //hydration pattern , will have to change in future
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
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
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item._id === productId) {
        const newQty = Math.max(1, Math.min(item.stock || 99, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearItem = (productId) => {
    removeFromCart(productId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
