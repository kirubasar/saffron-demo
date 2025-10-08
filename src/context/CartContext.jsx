import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === product.id);
      if (existingIndex !== -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + (product.quantity || 1),
        };
        return next;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const increment = (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const decrement = (id) => {
    setItems((prev) => prev.flatMap((p) => {
      if (p.id !== id) return [p];
      const nextQty = p.quantity - 1;
      return nextQty <= 0 ? [] : [{ ...p, quantity: nextQty }];
    }));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, p) => sum + p.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, p) => sum + p.quantity * p.price, 0), [items]);

  const value = useMemo(() => ({ items, addItem, removeItem, clear, increment, decrement, count, total }), [items, count, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


