import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: 'excellent' | 'good' | 'fair';
  type: 'rent' | 'sell' | 'both';
  rentPrice: number;
  sellPrice: number;
  description: string;
  image: string;
  ownerId: string;
  ownerName: string;
  location: string;
  distance: number;
  availability: boolean;
  rating: number;
  reviews: number;
}

export interface RentalRequest {
  id: string;
  bookId: string;
  bookTitle: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'picked-up' | 'delivered' | 'returned' | 'completed';
  deliveryId?: string;
}

interface BookContextType {
  books: Book[];
  rentalRequests: RentalRequest[];
  searchBooks: (query: string, filters: any) => Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  requestRental: (bookId: string, days: number) => void;
  updateRentalStatus: (requestId: string, status: RentalRequest['status']) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Physics Class 12 NCERT',
    author: 'NCERT',
    subject: 'Physics',
    condition: 'excellent',
    type: 'rent',
    rentPrice: 15,
    sellPrice: 200,
    description: 'Well-maintained physics textbook for Class 12. All chapters intact with minimal highlighting.',
    image: 'https://images.pexels.com/photos/159832/book-open-book-read-literature-159832.jpeg',
    ownerId: '2',
    ownerName: 'Priya Patel',
    location: 'Connaught Place, Delhi',
    distance: 2.5,
    availability: true,
    rating: 4.8,
    reviews: 12,
  },
  {
    id: '2',
    title: 'Organic Chemistry Morrison Boyd',
    author: 'Morrison & Boyd',
    subject: 'Chemistry',
    condition: 'good',
    type: 'both',
    rentPrice: 25,
    sellPrice: 350,
    description: 'Classic organic chemistry textbook. Some pages have notes but overall in good condition.',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    ownerId: '3',
    ownerName: 'Amit Kumar',
    location: 'Karol Bagh, Delhi',
    distance: 5.2,
    availability: true,
    rating: 4.5,
    reviews: 8,
  },
  {
    id: '3',
    title: 'Mathematics JEE Main & Advanced',
    author: 'R.D. Sharma',
    subject: 'Mathematics',
    condition: 'fair',
    type: 'sell',
    rentPrice: 0,
    sellPrice: 280,
    description: 'Comprehensive mathematics book for JEE preparation. Some wear and tear but all solutions are clear.',
    image: 'https://images.pexels.com/photos/1995842/pexels-photo-1995842.jpeg',
    ownerId: '4',
    ownerName: 'Sneha Singh',
    location: 'Lajpat Nagar, Delhi',
    distance: 7.8,
    availability: true,
    rating: 4.2,
    reviews: 15,
  },
];

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);

  const searchBooks = (query: string, filters: any): Book[] => {
    return books.filter(book => {
      const matchesQuery = query === '' || 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.subject.toLowerCase().includes(query.toLowerCase());

      const matchesSubject = !filters.subject || book.subject === filters.subject;
      const matchesCondition = !filters.condition || book.condition === filters.condition;
      const matchesType = !filters.type || book.type === filters.type || book.type === 'both';
      const matchesDistance = !filters.maxDistance || book.distance <= filters.maxDistance;

      return matchesQuery && matchesSubject && matchesCondition && matchesType && matchesDistance && book.availability;
    });
  };

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
    };
    setBooks(prev => [...prev, newBook]);
  };

  const requestRental = (bookId: string, days: number) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const request: RentalRequest = {
      id: Date.now().toString(),
      bookId,
      bookTitle: book.title,
      renterId: '1', // Current user
      renterName: 'Rahul Sharma',
      ownerId: book.ownerId,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalPrice: book.rentPrice * days,
      status: 'pending',
    };

    setRentalRequests(prev => [...prev, request]);
  };

  const updateRentalStatus = (requestId: string, status: RentalRequest['status']) => {
    setRentalRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status } : req)
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        rentalRequests,
        searchBooks,
        addBook,
        requestRental,
        updateRentalStatus,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}