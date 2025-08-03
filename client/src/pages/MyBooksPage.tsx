import React, { useState } from 'react';
import { Plus, Package, TrendingUp, Clock } from 'lucide-react';
import AddBookModal from '../components/AddBookModal';
import RentalRequestCard from '../components/RentalRequestCard';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

export default function MyBooksPage() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'requests' | 'earnings'>('books');
  const { books, rentalRequests } = useBooks();
  const { user } = useAuth();

  const myBooks = books.filter(book => book.ownerId === user?.id);
  const myRequests = rentalRequests.filter(req => req.ownerId === user?.id);
  const totalEarnings = myRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Books</h1>
          <p className="text-gray-600">Manage your book listings and rental requests</p>
        </div>
        <button
          onClick={() => setShowAddBook(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Book</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Listed Books</p>
              <p className="text-2xl font-bold text-gray-900">{myBooks.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Rentals</p>
              <p className="text-2xl font-bold text-gray-900">
                {myRequests.filter(req => ['approved', 'picked-up', 'delivered'].includes(req.status)).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalEarnings}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'books', label: 'My Books', count: myBooks.length },
            { id: 'requests', label: 'Rental Requests', count: myRequests.length },
            { id: 'earnings', label: 'Earnings', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">by {book.author}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {book.type === 'rent' && `₹${book.rentPrice}/day`}
                    {book.type === 'sell' && `₹${book.sellPrice}`}
                    {book.type === 'both' && `₹${book.rentPrice}/day • ₹${book.sellPrice}`}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.availability ? 'Available' : 'Rented'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {myBooks.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No books listed yet</h3>
              <p className="text-gray-600 mb-6">Start earning by listing your textbooks</p>
              <button
                onClick={() => setShowAddBook(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Your First Book
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {myRequests.map((request) => (
            <RentalRequestCard key={request.id} request={request} />
          ))}
          
          {myRequests.length === 0 && (
            <div className="text-center py-16">
              <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rental requests yet</h3>
              <p className="text-gray-600">Requests will appear here when students want to rent your books</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Earnings Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">This Month</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Rentals</span>
                  <span className="font-medium">₹{Math.floor(totalEarnings * 0.6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Book Sales</span>
                  <span className="font-medium">₹{Math.floor(totalEarnings * 0.4)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Earnings</span>
                    <span className="font-bold text-lg">₹{totalEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Status</h4>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">Next Payout</p>
                  <p className="text-green-600 text-sm">₹{Math.floor(totalEarnings * 0.3)} on 1st of next month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBook && (
        <AddBookModal onClose={() => setShowAddBook(false)} />
      )}
    </div>
  );
}