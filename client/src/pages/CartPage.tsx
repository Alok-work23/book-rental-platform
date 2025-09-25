import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Plus, Minus, Calendar } from 'lucide-react';

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    updateOrderType, 
    getTotalAmount, 
    getDeliveryCost,
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleOrderTypeChange = (itemId: string, orderType: 'buy' | 'rent') => {
    updateOrderType(itemId, orderType);
  };

  const totalAmount = getTotalAmount();
  const deliveryCost = getDeliveryCost();
  const finalTotal = totalAmount + deliveryCost;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="title-xl mb-6">Your Cart</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cart Items ({items.length})</h2>
                <button onClick={clearCart} className="btn-muted text-sm">Clear all</button>
              </div>
              <ul>
                {items.map((item, index) => (
                  <li key={item.id} className={`p-4 ${index < items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.book.image} 
                        alt={item.book.title} 
                        className="w-20 h-24 object-cover rounded-md flex-shrink-0" 
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.book.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="chip text-xs">by {item.book.author}</span>
                          <span className="badge-soft">{item.orderType.toUpperCase()}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.book.location}</p>
                        
                        {/* Order Type Selection */}
                        <div className="mt-3 bg-gray-100 dark:bg-gray-700 inline-flex rounded-lg p-1">
                          <button
                            onClick={() => handleOrderTypeChange(item.id, 'rent')}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                              item.orderType === 'rent'
                                ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                            }`}
                          >
                            Rent ₹{item.book.rentPrice}/day
                          </button>
                          {item.book.type !== 'rent' && (
                            <button
                              onClick={() => handleOrderTypeChange(item.id, 'buy')}
                              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                item.orderType === 'buy'
                                  ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white'
                                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                              }`}
                            >
                              Buy ₹{item.book.sellPrice}
                            </button>
                          )}
                        </div>

                        {/* Rental Dates */}
                        {item.orderType === 'rent' && item.startDate && item.endDate && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{item.price * item.quantity}
                        </p>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item.id)} 
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item from cart"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                  <span className="font-medium">₹{deliveryCost}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-blue px-6 py-3"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={clearCart}
                className="w-full mt-3 btn-muted px-6 py-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 card">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Add some books to get started.</p>
          <Link to="/books" className="mt-6 inline-block btn-blue px-5 py-2 font-semibold">
            Browse Books
          </Link>
        </div>
      )}
    </div>
  );
}