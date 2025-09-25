import React, { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { Package, Calendar, MapPin, CreditCard, Eye, Truck } from 'lucide-react';

export default function OrdersPage() {
  const { getOrdersByUser, updateOrderStatus } = useOrder();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders = user ? getOrdersByUser(user.id) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'returned':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  if (!user) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please log in to view your orders</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">No orders yet</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Start shopping to see your orders here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label="Toggle order details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Details (Collapsible) */}
              {selectedOrder === order.id && (
                <div className="p-6 bg-gray-50 dark:bg-gray-700">
                  {/* Items */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <img
                            src={item.book.image}
                            alt={item.book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-grow">
                            <h5 className="font-medium text-gray-900 dark:text-white">{item.book.title}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">by {item.book.author}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.orderType === 'rent' ? 'Rent' : 'Buy'} × {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shipping Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Shipping Address
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress}</p>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment Method
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{order.paymentMethod}</p>
                    </div>

                    {/* Order Dates */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Important Dates
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>Order Date: {formatDate(order.orderDate)}</p>
                        {order.estimatedDelivery && (
                          <p>Estimated Delivery: {formatDate(order.estimatedDelivery)}</p>
                        )}
                        {order.actualDelivery && (
                          <p>Delivered: {formatDate(order.actualDelivery)}</p>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Order Summary
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                          <span>₹{order.totalAmount - order.deliveryCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                          <span>₹{order.deliveryCost}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-600 pt-1">
                          <span>Total:</span>
                          <span>₹{order.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {order.status === 'delivered' && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'returned')}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      >
                        Return Book
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
