import React, { useState } from 'react';
import { X, Calendar, IndianRupee, Clock, MapPin, User } from 'lucide-react';
import { Book } from '../contexts/BookContext';
import { useBooks } from '../contexts/BookContext';

interface RentalModalProps {
  book: Book;
  onClose: () => void;
}

export default function RentalModal({ book, onClose }: RentalModalProps) {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const { requestRental } = useBooks();

  const totalPrice = book.rentPrice * days;

  const handleRent = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      requestRental(book.id, days);
      setLoading(false);
      onClose();
      alert('Rental request submitted! You will be notified once the owner approves.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Rent Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Book Info */}
          <div className="flex space-x-4 mb-6">
            <img
              src={book.image}
              alt={book.title}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-2">by {book.author}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <User className="h-4 w-4 mr-1" />
                <span>{book.ownerName}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{book.distance}km away</span>
              </div>
            </div>
          </div>

          {/* Rental Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rental Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[7, 14, 30].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setDays(duration)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    days === duration
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration} days
                </button>
              ))}
            </div>
            <div className="mt-3">
              <label className="block text-sm text-gray-600 mb-1">Custom duration</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-600">days</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Rent per day</span>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 text-gray-600" />
                <span className="font-medium">{book.rentPrice}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{days} days</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <div className="flex items-center font-bold text-lg">
                  <IndianRupee className="h-5 w-5 text-gray-900" />
                  <span>{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Delivery Timeline</span>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Book pickup within 24 hours</li>
              <li>• Delivery to your location within 48 hours</li>
              <li>• Return pickup before rental expires</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRent}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Rent for ₹${totalPrice}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}