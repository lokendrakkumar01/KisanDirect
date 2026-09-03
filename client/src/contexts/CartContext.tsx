import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CropListing } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (listing: CropListing, quantity: number) => void;
  removeFromCart: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  logisticsEstimate: number;
  platformFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (listing: CropListing, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.listingId === listing.id);
      if (existing) {
        return prev.map(item =>
          item.listingId === listing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { listingId: listing.id, listing, quantity }];
    });
  };

  const removeFromCart = (listingId: string) => {
    setItems(prev => prev.filter(item => item.listingId !== listingId));
  };

  const updateQuantity = (listingId: string, quantity: number) => {
    setItems(prev => prev.map(item =>
      item.listingId === listingId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
  // Simplistic estimates for simulation
  const logisticsEstimate = items.length > 0 ? items.reduce((sum, item) => sum + (item.quantity * 5), 0) : 0;
  const platformFee = subtotal * 0.02; // 2% fee
  const total = subtotal + logisticsEstimate + platformFee;

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, logisticsEstimate, platformFee, total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
