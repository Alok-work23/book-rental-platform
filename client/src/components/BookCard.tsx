import React from 'react';
import { MapPin, Star, Calendar, IndianRupee, Package } from 'lucide-react';
import { Book } from '../contexts/BookContext';

interface BookCardProps {
  book: Book;
  onRentClick: () => void;
}

export default function BookCard({ book, onRentClick }: BookCardProps) {
  const conditionColors = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-yellow-100 text-yellow-800',
    fair: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditionColors[book.condition]}`}>
            {book.condition}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium">{book.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {book.subject}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{book.distance}km away • {book.location}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {(book.type === 'rent' || book.type === 'both') && (
              <div className="flex items-center text-lg font-semibold text-gray-900">
                <IndianRupee className="h-4 w-4" />
                <span>{book.rentPrice}/day</span>
              </div>
            )}
            {(book.type === 'sell' || book.type === 'both') && (
              <div className="flex items-center text-sm text-gray-600">
                <IndianRupee className="h-3 w-3" />
                <span>{book.sellPrice} to buy</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500">Owned by</p>
            <p className="text-sm font-medium text-gray-900">{book.ownerName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {(book.type === 'rent' || book.type === 'both') && (
            <button
              onClick={onRentClick}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Rent</span>
            </button>
          )}
          {(book.type === 'sell' || book.type === 'both') && (
            <button
              className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span>Buy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}