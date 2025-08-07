import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Calendar, IndianRupee } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import BookFilters from '../components/BookFilters';
import RentalModal from '../components/RentalModal';

export default function BooksPage() {
  const { searchBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    subject: '',
    condition: '',
    type: '',
    maxDistance: 10,
    maxPrice: 1000,
  });

  const filteredBooks = searchBooks(searchQuery, filters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">Find textbooks from students nearby</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search books by title, author, or subject..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <BookFilters filters={filters} onFiltersChange={setFilters} />
        )}
      </div>

      {/* Results */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredBooks.length} books found
          {filters.maxDistance < 50 && (
            <span className="text-blue-600"> within {filters.maxDistance}km</span>
          )}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>Showing results near Delhi, India</span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRentClick={() => setSelectedBook(book.id)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({
                subject: '',
                condition: '',
                type: '',
                maxDistance: 10,
                maxPrice: 1000,
              });
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Rental Modal */}
      {selectedBook && (
        <RentalModal
          book={filteredBooks.find(b => b.id === selectedBook)!}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}