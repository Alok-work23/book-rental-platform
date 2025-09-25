// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Book, RentalRequest } from '../types';

// interface BookContextType {
//   books: Book[];
//   rentalRequests: RentalRequest[];
//   cart: Book[];
//   searchBooks: (query: string, filters: any) => Book[];
//   addBook: (book: Omit<Book, 'id'>) => void;
//   requestRental: (bookId: string, days: number) => void;
//   updateRentalStatus: (requestId: string, status: RentalRequest['status']) => void;
//   addToCart: (book: Book) => void;
//   removeFromCart: (bookId: string) => void;
//   checkout: () => void;
// }

// const BookContext = createContext<BookContextType | undefined>(undefined);

// const sampleBooks: Book[] = [
//   {
//     id: '1',
//     title: 'Physics Class 12 NCERT',
//     author: 'NCERT',
//     subject: 'Physics',
//     condition: 'excellent',
//     type: 'rent',
//     rentPrice: 15,
//     sellPrice: 200,
//     description: 'Well-maintained physics textbook for Class 12.',
//     image: 'https://images.pexels.com/photos/159832/book-open-book-read-literature-159832.jpeg',
//     ownerId: '2',
//     ownerName: 'Priya Patel',
//     location: 'Connaught Place, Delhi',
//     distance: 2.5,
//     availability: true,
//     rating: 4.8,
//     reviews: 12,
//   },
//   {
//     id: '2',
//     title: 'Organic Chemistry Morrison Boyd',
//     author: 'Morrison & Boyd',
//     subject: 'Chemistry',
//     condition: 'good',
//     type: 'both',
//     rentPrice: 25,
//     sellPrice: 350,
//     description: 'Classic organic chemistry textbook.',
//     image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
//     ownerId: '3',
//     ownerName: 'Amit Kumar',
//     location: 'Karol Bagh, Delhi',
//     distance: 5.2,
//     availability: true,
//     rating: 4.5,
//     reviews: 8,
//   },
// ];

// export function BookProvider({ children }: { children: ReactNode }) {
//   const [books, setBooks] = useState<Book[]>(sampleBooks);
//   const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
//   const [cart, setCart] = useState<Book[]>([]);

//   const searchBooks = (query: string, filters: any): Book[] => {
//     return books.filter(book => {
//       const matchesQuery = query === '' || 
//         book.title.toLowerCase().includes(query.toLowerCase()) ||
//         book.author.toLowerCase().includes(query.toLowerCase()) ||
//         book.subject.toLowerCase().includes(query.toLowerCase());

//       const matchesFilters = !filters.subject || book.subject === filters.subject;
//       return matchesQuery && matchesFilters && book.availability;
//     });
//   };

//   const addBook = (bookData: Omit<Book, 'id'>) => {
//     const newBook: Book = { ...bookData, id: Date.now().toString() };
//     setBooks(prev => [...prev, newBook]);
//   };

//   const requestRental = (bookId: string, days: number) => {
//     const book = books.find(b => b.id === bookId);
//     if (!book) return;

//     const request: RentalRequest = {
//       id: Date.now().toString(),
//       bookId,
//       bookTitle: book.title,
//       renterId: '1',
//       renterName: 'Aryan Saini',
//       ownerId: book.ownerId,
//       startDate: new Date().toISOString().split('T')[0],
//       endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       totalPrice: book.rentPrice * days,
//       status: 'pending',
//     };
//     setRentalRequests(prev => [...prev, request]);
//   };

//   const updateRentalStatus = (requestId: string, status: RentalRequest['status']) => {
//     setRentalRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
//   };

//   const addToCart = (book: Book) => {
//     if (!cart.find(item => item.id === book.id)) {
//       setCart(prevCart => [...prevCart, book]);
//       alert(`${book.title} has been added to your cart.`);
//     } else {
//       alert(`${book.title} is already in your cart.`);
//     }
//   };

//   const removeFromCart = (bookId: string) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== bookId));
//   };

//   const checkout = () => {
//     cart.forEach(book => requestRental(book.id, 14));
//     setCart([]);
//     alert('Your rental requests have been sent!');
//   };

//   return (
//     <BookContext.Provider
//       value={{
//         books,
//         rentalRequests,
//         cart,
//         searchBooks,
//         addBook,
//         requestRental,
//         updateRentalStatus,
//         addToCart,
//         removeFromCart,
//         checkout,
//       }}
//     >
//       {children}
//     </BookContext.Provider>
//   );
// }

// export function useBooks() {
//   const context = useContext(BookContext);
//   if (context === undefined) {
//     throw new Error('useBooks must be used within a BookProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, RentalRequest } from '../types';

// ADDED: A new type to represent the detailed delivery data from the backend
export interface DeliveryDetails extends RentalRequest {
  locationUpdates: { lat: number; lng: number; timestamp: string }[];
  estimatedArrival: string;
  sellerLocation?: { lat: number; lng: number; address: string };
  buyerLocation?: { lat: number; lng: number; address: string };
}

interface BookContextType {
  books: Book[];
  rentalRequests: RentalRequest[];
  cart: Book[];
  searchBooks: (query: string, filters: any) => Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  requestRental: (bookId: string, days: number) => void;
  updateRentalStatus: (requestId: string, status: RentalRequest['status']) => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  checkout: () => void;
  // ADDED: The function to fetch live delivery details
  fetchDeliveryDetails: (deliveryId: string) => Promise<DeliveryDetails | null>;
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
    rentPrice: 3,
    sellPrice: 200,
    description: 'Well-maintained physics textbook for Class 12.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
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
    rentPrice: 5,
    sellPrice: 350,
    description: 'Classic organic chemistry textbook.',
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
    title: 'Mathematics Class 12 RD Sharma',
    author: 'RD Sharma',
    subject: 'Mathematics',
    condition: 'New',
    type: 'both',
    rentPrice: 7,
    sellPrice: 400,
    description: 'Comprehensive mathematics textbook for Class 12.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
    ownerId: '4',
    ownerName: 'Rohit Verma',
    location: 'Lajpat Nagar, Delhi',
    distance: 3.1,
    availability: true,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: '4',
    title: 'English Literature Class 12 Hornbill',
    author: 'CBSE Board',
    subject: 'English',
    condition: 'Good',
    type: 'both',
    rentPrice: 2,
    sellPrice: 150,
    description: 'Popular English literature book for Class 12.',
    image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg',
    ownerId: '5',
    ownerName: 'Sneha Gupta',
    location: 'Saket, Delhi',
    distance: 4.0,
    availability: true,
    rating: 4.7,
    reviews: 10,
    quantity: 7,
    category: 'Textbook',
  },
];

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [cart, setCart] = useState<Book[]>([]);

  const searchBooks = (query: string, filters: any): Book[] => {
    return books.filter(book => {
      const matchesQuery = query === '' || 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.subject.toLowerCase().includes(query.toLowerCase());

      const matchesFilters = !filters.subject || book.subject === filters.subject;
      return matchesQuery && matchesFilters && book.availability;
    });
  };

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = { ...bookData, id: Date.now().toString() };
    setBooks(prev => [...prev, newBook]);
  };

  const requestRental = (bookId: string, days: number) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const request: RentalRequest = {
      id: Date.now().toString(),
      bookId,
      bookTitle: book.title,
      renterId: '1',
      renterName: 'Aryan Saini',
      ownerId: book.ownerId,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalPrice: book.rentPrice * days,
      status: 'pending',
    };
    setRentalRequests(prev => [...prev, request]);
  };

  const updateRentalStatus = (requestId: string, status: RentalRequest['status']) => {
    setRentalRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
  };

  const addToCart = (book: Book) => {
    if (!cart.find(item => item.id === book.id)) {
      setCart(prevCart => [...prevCart, book]);
      alert(`${book.title} has been added to your cart.`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const checkout = () => {
    cart.forEach(book => requestRental(book.id, 14));
    setCart([]);
    alert('Your rental requests have been sent!');
  };

  // ADDED: New function to fetch delivery details from the backend
  const fetchDeliveryDetails = async (deliveryId: string): Promise<DeliveryDetails | null> => {
    try {
      // Get auth token from sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      // In production, replace this URL with your actual API endpoint
      const response = await fetch(`/api/delivery/${deliveryId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        } else if (response.status === 403) {
          throw new Error('You are not authorized to view this delivery.');
        } else if (response.status === 404) {
          throw new Error('Delivery not found.');
        } else {
          throw new Error('Failed to fetch delivery details.');
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching delivery details:', error);
      
      // For demo purposes, return mock data if API is not available
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log(`Simulating fetch for delivery ID: ${deliveryId}`);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: deliveryId,
              bookId: '1',
              bookTitle: 'Physics Class 12 NCERT',
              renterId: 'user1',
              renterName: 'Aryan Saini',
              ownerId: 'user2',
              startDate: '2025-08-10',
              endDate: '2025-08-24',
              totalPrice: 210,
              status: 'in-transit',
              estimatedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
              locationUpdates: [
                { lat: 28.6139, lng: 77.2090, timestamp: '2025-08-10T10:00:00Z' }, // Delhi (Start)
                { lat: 28.5355, lng: 77.3910, timestamp: '2025-08-10T10:30:00Z' }, // Noida
                { lat: 28.5800, lng: 77.3200, timestamp: '2025-08-10T11:00:00Z' }, // Current Location
              ],
              // ADDED: Seller and buyer locations for map markers
              sellerLocation: { lat: 28.6139, lng: 77.2090, address: 'Delhi University Campus' },
              buyerLocation: { lat: 28.5800, lng: 77.3200, address: 'Student Hostel, IIT Delhi' },
            });
          }, 500);
        });
      }
      
      throw error;
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        rentalRequests,
        cart,
        searchBooks,
        addBook,
        requestRental,
        updateRentalStatus,
        addToCart,
        removeFromCart,
        checkout,
        fetchDeliveryDetails, // Expose the new function
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