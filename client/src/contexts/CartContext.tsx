import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Book } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, quantity: number, orderType: 'buy' | 'rent', startDate?: string, endDate?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateOrderType: (itemId: string, orderType: 'buy' | 'rent') => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getDeliveryCost: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book, quantity: number, orderType: 'buy' | 'rent', startDate?: string, endDate?: string) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.bookId === book.id && item.orderType === orderType
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          startDate,
          endDate,
          price: orderType === 'buy' ? book.sellPrice : book.rentPrice
        };
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${book.id}-${orderType}-${Date.now()}`,
          bookId: book.id,
          book,
          quantity,
          orderType,
          price: orderType === 'buy' ? book.sellPrice : book.rentPrice,
          startDate,
          endDate
        };
        return [...currentItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateOrderType = (itemId: string, orderType: 'buy' | 'rent') => {
    setItems(currentItems =>
      currentItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            orderType,
            price: orderType === 'buy' ? item.book.sellPrice : item.book.rentPrice
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryCost = () => {
    // Simple delivery cost calculation - can be enhanced based on location
    return items.length > 0 ? 50 : 0; // $50 flat rate for now
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateOrderType,
    clearCart,
    getTotalItems,
    getTotalAmount,
    getDeliveryCost
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
