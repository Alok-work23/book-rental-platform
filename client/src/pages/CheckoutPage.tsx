import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalAmount, getDeliveryCost, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = getTotalAmount();
  const deliveryCost = getDeliveryCost();
  const finalTotal = totalAmount + deliveryCost;

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      alert('Please enter your shipping address');
      return;
    }

    setIsProcessing(true);
    try {
      await createOrder(items, shippingAddress, paymentMethod);
      setOrderPlaced(true);
      clearCart();
      
      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some items to your cart before checkout.</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-black px-6 py-2 rounded-lg font-semibold"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your order has been placed and is being processed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h2>
            </div>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your complete shipping address..."
              className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-900 dark:text-white">Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-900 dark:text-white">UPI</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-900 dark:text-white">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
            </div>
            
            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.book.image}
                      alt={item.book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.book.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.orderType === 'rent' ? 'Rent' : 'Buy'} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                <span>₹{deliveryCost}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || !shippingAddress.trim()}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              isProcessing || !shippingAddress.trim()
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-black hover:bg-blue-700 dark:hover:bg-cyan-600'
            }`}
          >
            {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal}`}
          </button>
        </div>
      </div>
    </div>
  );
}
