// export interface Book {
//     id: string;
//     title: string;
//     author: string;
//     subject: string;
//     condition: 'New' | 'Like-New' | 'Good' | 'Fair' | 'Poor';
//     type: 'rent' | 'sell' | 'both';
//     rentPrice: number;
//     sellPrice: number;
//     description: string;
//     image: string;
//     ownerId: string;
//     ownerName: string;
//     location: string;
//     distance: number;
//     availability: boolean;
//     rating: number;
//     reviews: number;
//   }
  
//   export interface RentalRequest {
//     id: string;
//     bookId: string;
//     bookTitle: string;
//     renterId: string;
//     renterName: string;
//     ownerId: string;
//     startDate: string;
//     endDate: string;
//     totalPrice: number;
//     status: 'pending' | 'approved' | 'picked-up' | 'in-transit' | 'delivered' | 'returned' | 'completed';
//     deliveryId?: string;
//   }






export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  isProfileComplete: boolean;
  dob: string;
  gender: string;
  coordinates?: Coordinates | null;
  role: 'buyer' | 'seller' | 'admin';
  isVerified?: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  adminMessage?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: 'New' | 'Like-New' | 'Good' | 'Fair' | 'Poor';
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
  quantity: number;
  category: string;
}

export interface CartItem {
  id: string;
  bookId: string;
  book: Book;
  quantity: number;
  orderType: 'buy' | 'rent';
  price: number;
  startDate?: string;
  endDate?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  deliveryCost: number;
  paymentMethod: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  orderDate: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
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
  status: 'pending' | 'approved' | 'picked-up' | 'in-transit' | 'delivered' | 'returned' | 'completed';
  deliveryId?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  totalOrders: number;
  pendingVerifications: number;
  recentOrders: Order[];
  topSellers: User[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isRead: boolean;
  createdAt: string;
}