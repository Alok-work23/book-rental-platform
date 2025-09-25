// import React, { useState } from 'react';
// import { Plus, Package, TrendingUp, Clock } from 'lucide-react';
// import AddBookModal from '../components/AddBookModal';
// import RentalRequestCard from '../components/RentalRequestCard';
// import { useBooks } from '../contexts/BookContext';
// import { useAuth } from '../contexts/AuthContext';

// export default function MyBooksPage() {
//   const [showAddBook, setShowAddBook] = useState(false);
//   const [activeTab, setActiveTab] = useState('books');
//   const { books, rentalRequests } = useBooks();
//   const { user } = useAuth();

//   const myBooks = books.filter(book => book.ownerId === user?.id);
//   const myRequests = rentalRequests.filter(req => req.ownerId === user?.id);
//   const totalEarnings = myRequests
//     .filter(req => req.status === 'completed')
//     .reduce((sum, req) => sum + req.totalPrice, 0);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       {/* Header & Add Book */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-6">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900 mb-1">My Books</h1>
//           <p className="text-gray-500 text-base">Easily manage your listings, rental requests and earnings.</p>
//         </div>
//         <button
//           onClick={() => setShowAddBook(true)}
//           className="inline-flex items-center gap-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
//         >
//           <Plus className="h-5 w-5" />
//           Add Book
//         </button>
//       </div>

//       {/* Stat cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <div className="rounded-2xl bg-white shadow-lg p-6 border border-blue-100 flex items-center gap-6">
//           <div className="bg-blue-50 rounded-xl p-3">
//             <Package className="h-7 w-7 text-blue-500" />
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Listed Books</span>
//             <div className="text-2xl font-extrabold text-blue-700">{myBooks.length}</div>
//           </div>
//         </div>
//         <div className="rounded-2xl bg-white shadow-lg p-6 border border-green-100 flex items-center gap-6">
//           <div className="bg-green-50 rounded-xl p-3">
//             <Clock className="h-7 w-7 text-green-600" />
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Active Rentals</span>
//             <div className="text-2xl font-extrabold text-green-600">
//               {myRequests.filter(req => ['approved', 'picked-up', 'delivered'].includes(req.status)).length}
//             </div>
//           </div>
//         </div>
//         <div className="rounded-2xl bg-white shadow-lg p-6 border border-orange-100 flex items-center gap-6">
//           <div className="bg-orange-50 rounded-xl p-3">
//             <TrendingUp className="h-7 w-7 text-orange-500" />
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Total Earnings</span>
//             <div className="text-2xl font-extrabold text-orange-500">₹{totalEarnings}</div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center mb-10 border-b border-gray-200">
//         {[
//           { id: 'books', label: 'My Books', count: myBooks.length },
//           { id: 'requests', label: 'Rental Requests', count: myRequests.length },
//           { id: 'earnings', label: 'Earnings', count: null }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`relative py-3 text-base font-semibold px-5 focus:outline-none transition
//               ${
//                 activeTab === tab.id
//                   ? 'text-blue-700 border-b-2 border-blue-600'
//                   : 'text-gray-500 border-b-2 border-transparent hover:text-blue-700'
//               }
//             `}
//             style={{
//               borderBottomWidth: '2px'
//             }}
//           >
//             {tab.label}
//             {tab.count !== null && (
//               <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
//                 {tab.count}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Tab content */}
//       {activeTab === 'books' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
//           {myBooks.map(book => (
//             <div key={book.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full h-52 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
//                 <div className="mb-2 text-gray-500 text-sm">by {book.author}</div>
//                 <div className="flex justify-between items-center mt-3">
//                   <div className="text-sm text-blue-800 font-semibold">
//                     {book.type === 'rent' && `₹${book.rentPrice}/day`}
//                     {book.type === 'sell' && `₹${book.sellPrice}`}
//                     {book.type === 'both' && (
//                       <>
//                         <span>₹{book.rentPrice}/day</span>
//                         <span className="mx-1 text-gray-400">•</span>
//                         <span>₹{book.sellPrice}</span>
//                       </>
//                     )}
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm uppercase ml-2 
//                     ${book.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
//                   `}>
//                     {book.availability ? 'Available' : 'Rented'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {myBooks.length === 0 && (
//             <div className="col-span-full text-center py-16">
//               <Package className="h-16 w-16 text-gray-200 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">No books listed yet</h3>
//               <p className="text-gray-500 mb-6">Start earning by listing your textbooks</p>
//               <button
//                 onClick={() => setShowAddBook(true)}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
//               >
//                 Add Your First Book
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === 'requests' && (
//         <div className="space-y-4">
//           {myRequests.map(request => (
//             <RentalRequestCard key={request.id} request={request} />
//           ))}
//           {myRequests.length === 0 && (
//             <div className="text-center py-16">
//               <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No rental requests yet</h3>
//               <p className="text-gray-500">Requests will show here when students want to rent your books.</p>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === 'earnings' && (
//         <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-3xl mx-auto">
//           <h3 className="text-2xl font-bold text-gray-900 mb-6">Earnings Overview</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800 mb-4">This Month</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Completed Rentals</span>
//                   <span className="font-medium">₹{Math.floor(totalEarnings * 0.6)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Book Sales</span>
//                   <span className="font-medium">₹{Math.floor(totalEarnings * 0.4)}</span>
//                 </div>
//                 <div className="border-t pt-3">
//                   <div className="flex justify-between">
//                     <span className="font-semibold">Total Earnings</span>
//                     <span className="font-bold text-lg text-orange-600">₹{totalEarnings}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h4>
//               <div className="space-y-3">
//                 <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                   <p className="text-green-700 font-semibold">Next Payout</p>
//                   <p className="text-green-600 text-sm">₹{Math.floor(totalEarnings * 0.3)} on 1st of next month</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Book Modal */}
//       {showAddBook && (
//         <AddBookModal onClose={() => setShowAddBook(false)} />
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Plus, Package, TrendingUp, Clock } from 'lucide-react';
import AddBookModal from '../components/AddBookModal';
import RentalRequestCard from '../components/RentalRequestCard';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

export default function MyBooksPage() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [activeTab, setActiveTab] = useState('books');
  const { books, rentalRequests } = useBooks();
  const { user } = useAuth();

  const myBooks = books.filter(book => book.ownerId === user?.id);
  const myRequests = rentalRequests.filter(req => req.ownerId === user?.id);
  const totalEarnings = myRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.totalPrice, 0);

  // Status/availability badge background: good contrast in both modes
  const getAvailabilityBadge = (isAvailable: boolean) =>
    isAvailable
      ? 'bg-green-100 dark:bg-green-900/70 text-green-700 dark:text-green-200'
      : 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-200';

  // Card backgrounds for stats, books etc.
  const cardBg = "bg-white dark:bg-gray-900";
  const border = "border border-gray-100 dark:border-gray-800";
  const statIconBg = {
    blue:   "bg-blue-50 dark:bg-blue-900/40",
    green:  "bg-green-50 dark:bg-green-900/40",
    orange: "bg-orange-50 dark:bg-orange-900/40"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Add Book */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">My Books</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base">Easily manage your listings, rental requests and earnings.</p>
        </div>
        <button
          onClick={() => setShowAddBook(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
        >
          <Plus className="h-5 w-5" />
          Add Book
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className={`${cardBg} rounded-2xl shadow-lg p-6 ${border} flex items-center gap-6`}>
          <div className={`${statIconBg.blue} rounded-xl p-3`}>
            <Package className="h-7 w-7 text-blue-500 dark:text-blue-300" />
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-300">Listed Books</span>
            <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">{myBooks.length}</div>
          </div>
        </div>
        <div className={`${cardBg} rounded-2xl shadow-lg p-6 ${border} flex items-center gap-6`}>
          <div className={`${statIconBg.green} rounded-xl p-3`}>
            <Clock className="h-7 w-7 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-300">Active Rentals</span>
            <div className="text-2xl font-extrabold text-green-600 dark:text-green-300">
              {myRequests.filter(req => ['approved', 'picked-up', 'delivered'].includes(req.status)).length}
            </div>
          </div>
        </div>
        <div className={`${cardBg} rounded-2xl shadow-lg p-6 ${border} flex items-center gap-6`}>
          <div className={`${statIconBg.orange} rounded-xl p-3`}>
            <TrendingUp className="h-7 w-7 text-orange-500 dark:text-orange-300" />
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-300">Total Earnings</span>
            <div className="text-2xl font-extrabold text-orange-500 dark:text-orange-300">₹{totalEarnings}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center mb-10 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'books', label: 'My Books', count: myBooks.length },
          { id: 'requests', label: 'Rental Requests', count: myRequests.length },
          { id: 'earnings', label: 'Earnings', count: null }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-3 text-base font-semibold px-5 focus:outline-none transition
              ${
                activeTab === tab.id
                  ? 'text-blue-700 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400'
                  : 'text-gray-500 dark:text-gray-300 border-b-2 border-transparent hover:text-blue-700 dark:hover:text-cyan-200'
              }
            `}
            style={{ borderBottomWidth: '2px' }}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-cyan-800/20 text-blue-700 dark:text-cyan-100'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                  {tab.count}
                </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {myBooks.map(book => (
            <div key={book.id} className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition`}>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{book.title}</h3>
                <div className="mb-2 text-gray-500 dark:text-gray-300 text-sm">by {book.author}</div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
                    {book.type === 'rent' && `₹${book.rentPrice}/day`}
                    {book.type === 'sell' && `₹${book.sellPrice}`}
                    {book.type === 'both' && (
                      <>
                        <span>₹{book.rentPrice}/day</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span>₹{book.sellPrice}</span>
                      </>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm uppercase ml-2 ${getAvailabilityBadge(book.availability)}`}>
                    {book.availability ? 'Available' : 'Rented'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {myBooks.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Package className="h-16 w-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No books listed yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Start earning by listing your textbooks</p>
              <button
                onClick={() => setShowAddBook(true)}
                className="bg-blue-600 dark:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 dark:hover:bg-cyan-700 transition"
              >
                Add Your First Book
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {myRequests.map(request => (
            <RentalRequestCard key={request.id} request={request} />
          ))}
          {myRequests.length === 0 && (
            <div className="text-center py-16">
              <Clock className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No rental requests yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Requests will show here when students want to rent your books.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Earnings Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">This Month</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Completed Rentals</span>
                  <span className="font-medium">₹{Math.floor(totalEarnings * 0.6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Book Sales</span>
                  <span className="font-medium">₹{Math.floor(totalEarnings * 0.4)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Earnings</span>
                    <span className="font-bold text-lg text-orange-600 dark:text-orange-400">₹{totalEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Payment Status</h4>
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 rounded-xl p-4">
                  <p className="text-green-700 dark:text-green-300 font-semibold">Next Payout</p>
                  <p className="text-green-600 dark:text-green-200 text-sm">₹{Math.floor(totalEarnings * 0.3)} on 1st of next month</p>
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
