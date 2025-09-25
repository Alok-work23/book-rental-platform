import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '../types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], shippingAddress: string, paymentMethod: string) => Promise<Order>;
  getOrdersByUser: (userId: string) => Order[];
  getOrdersBySeller: (sellerId: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to parse orders from localStorage', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (items: CartItem[], shippingAddress: string, paymentMethod: string): Promise<Order> => {
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryCost = 50; // Fixed delivery cost for now

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      buyerId: user.id,
      buyerName: user.name,
      sellerId: items[0]?.book.ownerId || '',
      sellerName: items[0]?.book.ownerName || '',
      items: [...items],
      totalAmount: totalAmount + deliveryCost,
      shippingAddress,
      deliveryCost,
      paymentMethod,
      status: 'placed',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    };

    setOrders(currentOrders => [...currentOrders, newOrder]);
    return newOrder;
  };

  const getOrdersByUser = (userId: string): Order[] => {
    return orders.filter(order => order.buyerId === userId);
  };

  const getOrdersBySeller = (sellerId: string): Order[] => {
    return orders.filter(order => order.sellerId === sellerId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              actualDelivery: status === 'delivered' ? new Date().toISOString() : order.actualDelivery
            }
          : order
      )
    );
  };

  const getAllOrders = (): Order[] => {
    return orders;
  };

  const value: OrderContextType = {
    orders,
    createOrder,
    getOrdersByUser,
    getOrdersBySeller,
    updateOrderStatus,
    getAllOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
