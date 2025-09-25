// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useBooks } from '../contexts/BookContext';
// import { Book, BarChart, Bell, Edit, PlusCircle, Package } from 'lucide-react';
// import Testimonials from '../components/Testimonials'; // Import the new component

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const { books, rentalRequests } = useBooks();
  
//   // Ensure user exists before filtering
//   const myBooks = user ? books.filter(book => book.ownerId === user.id) : [];
//   const myRentalRequests = user ? rentalRequests.filter(req => req.ownerId === user.id) : [];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
//       <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your books, orders, and account from here.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">Books Listed</p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-white">{myBooks.length}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-white">{myRentalRequests.length}</p>
//         </div>
//          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">Rental Requests</p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-white">{myRentalRequests.filter(r => r.status === 'pending').length}</p>
//         </div>
//          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-white">₹0</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               <Package className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-2"/>
//               No orders yet.
//             </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
//             <ul className="space-y-3">
//               <li><Link to="/my-books" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"><PlusCircle className="mr-3 h-5 w-5 text-blue-500"/>List a New Book</Link></li>
//               <li><Link to="#" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"><BarChart className="mr-3 h-5 w-5 text-green-500"/>View Analytics</Link></li>
//               <li><Link to="/profile" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"><Edit className="mr-3 h-5 w-5 text-purple-500"/>Edit Profile</Link></li>
//               <li><Link to="#" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"><Bell className="mr-3 h-5 w-5 text-yellow-500"/>Notifications</Link></li>
//             </ul>
//         </div>
//       </div>

//       {/* ADDED: Testimonials section */}
//       <div className="mt-12">
//         <Testimonials />
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';
import {
  BookOpen, Package, TrendingUp, Users,
  BarChart, Bell, Edit, PlusCircle
} from 'lucide-react';
import Testimonials from '../components/Testimonials';

export default function DashboardPage() {
  const { user } = useAuth();
  const { books, rentalRequests } = useBooks();

  const myBooks = user ? books.filter(book => book.ownerId === user.id) : [];
  const myRentalRequests = user ? rentalRequests.filter(req => req.ownerId === user.id) : [];
  const activeRentals = myRentalRequests.filter(r => ['approved', 'picked-up', 'delivered'].includes(r.status));
  const pendingRequests = myRentalRequests.filter(r => r.status === 'pending').length;
  const totalEarnings = myRentalRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome header */}
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
        Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}!
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Manage your books, orders, and account from here.
      </p>

      {/* Stats Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-white dark:from-blue-950 dark:to-slate-900 shadow-md p-5 border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-500/10 rounded-xl p-3">
            <BookOpen className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <span className="text-sm text-blue-700 dark:text-blue-200">Books Listed</span>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">{myBooks.length}</div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-cyan-100 to-white dark:from-cyan-950 dark:to-slate-900 shadow-md p-5 border border-cyan-100 flex items-center gap-4">
          <div className="bg-cyan-500/10 rounded-xl p-3">
            <Users className="h-7 w-7 text-cyan-600" />
          </div>
          <div>
            <span className="text-sm text-cyan-700 dark:text-cyan-200">Total Orders</span>
            <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-200">{myRentalRequests.length}</div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-yellow-100 to-white dark:from-yellow-950 dark:to-slate-900 shadow-md p-5 border border-yellow-100 flex items-center gap-4">
          <div className="bg-yellow-400/10 rounded-xl p-3">
            <Package className="h-7 w-7 text-yellow-500" />
          </div>
          <div>
            <span className="text-sm text-yellow-700 dark:text-yellow-200">Rental Requests</span>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">{pendingRequests}</div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-orange-100 to-white dark:from-orange-950 dark:to-slate-900 shadow-md p-5 border border-orange-100 flex items-center gap-4">
          <div className="bg-orange-500/10 rounded-xl p-3">
            <TrendingUp className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <span className="text-sm text-orange-700 dark:text-orange-200">Total Earnings</span>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-200">₹{totalEarnings}</div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
          {/* If there are recent requests, list the top 3 */}
          {activeRentals.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {activeRentals.slice(0, 3).map(req => (
                <li key={req.id} className="py-4 flex items-center gap-4">
                  <Package className="h-8 w-8 text-orange-400 bg-orange-50 rounded-full p-2" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{req.bookTitle || 'Book'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status: {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-white font-bold">₹{req.totalPrice}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-gray-400">
              <Package className="h-14 w-14 mb-3 opacity-40" />
              <div className="font-medium text-gray-600 dark:text-gray-400">No recent orders.</div>
            </div>
          )}
          <Link
            to="/orders"
            className="block mt-6 text-center text-blue-600 dark:text-cyan-400 hover:underline font-medium"
          >
            View All Orders
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/my-books"
                className="flex items-center px-4 py-3 rounded-lg font-medium transition hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                <PlusCircle className="mr-3 h-5 w-5 text-blue-600" /> List a New Book
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center px-4 py-3 rounded-lg font-medium transition hover:bg-green-50 dark:hover:bg-green-900"
              >
                <BarChart className="mr-3 h-5 w-5 text-green-600" /> View Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 rounded-lg font-medium transition hover:bg-purple-50 dark:hover:bg-purple-900"
              >
                <Edit className="mr-3 h-5 w-5 text-purple-600" /> Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center px-4 py-3 rounded-lg font-medium transition hover:bg-yellow-50 dark:hover:bg-yellow-900"
              >
                <Bell className="mr-3 h-5 w-5 text-yellow-400" /> Notifications
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mt-10">
        <Testimonials />
      </div>
    </div>
  );
}
