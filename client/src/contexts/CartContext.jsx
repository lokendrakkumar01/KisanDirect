import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext(undefined);
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);
    const addToCart = (listing, quantity) => {
        setItems(prev => {
            const existing = prev.find(item => item.listingId === listing.id);
            if (existing) {
                return prev.map(item => item.listingId === listing.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            return [...prev, { listingId: listing.id, listing, quantity }];
        });
    };
    const removeFromCart = (listingId) => {
        setItems(prev => prev.filter(item => item.listingId !== listingId));
    };
    const updateQuantity = (listingId, quantity) => {
        setItems(prev => prev.map(item => item.listingId === listingId ? { ...item, quantity } : item));
    };
    const clearCart = () => setItems([]);
    const subtotal = items.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
    // Simplistic estimates for simulation
    const logisticsEstimate = items.length > 0 ? items.reduce((sum, item) => sum + (item.quantity * 5), 0) : 0;
    const platformFee = subtotal * 0.02; // 2% fee
    const total = subtotal + logisticsEstimate + platformFee;
    return (<CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart,
            subtotal, logisticsEstimate, platformFee, total
        }}>
      {children}
    </CartContext.Provider>);
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
