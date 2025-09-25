// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Filter, Sparkles, ShieldCheck, Truck, BadgeCheck, MapPin, Coins } from 'lucide-react';
// import { useBooks } from '../contexts/BookContext';
// import BookCard from '../components/BookCard';
// import BookFilters from '../components/BookFilters';
// import Testimonials from '../components/Testimonials';

// export default function BooksPage() {
//   const { searchBooks } = useBooks();
//   const [searchParams] = useSearchParams();
//   const queryFromUrl = searchParams.get('q') || '';

//   const [searchQuery, setSearchQuery] = useState(queryFromUrl);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     subject: '',
//     condition: '',
//     type: '',
//     maxDistance: 50,
//     maxPrice: 2000,
//   });

//   useEffect(() => {
//     setSearchQuery(queryFromUrl);
//   }, [queryFromUrl]);

//   const filteredBooks = searchBooks(searchQuery, filters);

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 py-8">
//       {/* Background effects */}
//       <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
//         <div className="bg-grid-slate absolute inset-0 opacity-40 dark:opacity-10"></div>
//         <div className="absolute -top-24 -left-24 h-72 w-72 bg-gradient-to-tr from-cyan-400/25 to-blue-600/25 blur-3xl rounded-full" />
//         <div className="absolute top-1/3 -right-24 h-72 w-72 bg-gradient-to-tr from-fuchsia-400/25 to-purple-600/25 blur-3xl rounded-full" />
//       </div>

//       {/* Hero strip just below header */}
//       <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 border border-gray-200/60 dark:border-gray-700">
//           <div className="absolute -top-28 -right-24 h-72 w-72 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 blur-2xl rounded-full" />
//           <div className="absolute -bottom-20 -left-16 h-72 w-72 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 blur-2xl rounded-full" />
//           <div className="relative px-6 py-8 md:px-10 md:py-10">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
//               {/* Left: BookShare text content */}
//               <div className="flex-1 min-w-[260px]">
//                 <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-300 font-medium mb-2">
//                   <Sparkles className="h-4 w-4" />
//                   <span>Smart search near you</span>
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Browse Books</h1>
//                 <p className="text-gray-600 dark:text-gray-400 mb-6">Find textbooks from students nearby</p>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   <span className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium"><Coins className="h-4 w-4 text-yellow-500" />Save up to 70% vs new</span>
//                   <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium"><BadgeCheck className="h-4 w-4 text-green-500" />Quality checked</span>
//                   <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"><Truck className="h-4 w-4 text-orange-500" />Doorstep pickup & return</span>
//                 </div>
//               </div>
//               {/* Right: Features grid */}
//               <div className="flex-1 min-w-[260px]">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div className="flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
//                     <BadgeCheck className="h-4 w-4 text-green-600" />
//                     <span className="text-sm text-gray-700 dark:text-gray-300">Verified users</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
//                     <ShieldCheck className="h-4 w-4 text-emerald-600" />
//                     <span className="text-sm text-gray-700 dark:text-gray-300">Secure payments</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
//                     <Truck className="h-4 w-4 text-orange-600" />
//                     <span className="text-sm text-gray-700 dark:text-gray-300">Safe delivery</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
//                     <MapPin className="h-4 w-4 text-blue-600" />
//                     <span className="text-sm text-gray-700 dark:text-gray-300">Local listings</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-3 mb-8">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-gray-900 dark:text-white text-sm">
//             Showing <span className="font-bold">{filteredBooks.length}</span> results
//           </p>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto justify-center"
//           >
//             <Filter className="h-5 w-5" />
//             <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
//           </button>
//         </div>
//         {showFilters && <BookFilters filters={filters} onFiltersChange={setFilters} />}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//         {filteredBooks.map((book) => (
//           <BookCard
//             key={book.id}
//             book={book}
//           />
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-16">
//           <Search className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Books Found</h3>
//           <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
//         </div>
//       )}

//       {/* Show testimonials after login (books page) */}
//       <div className="mt-12">
//         <Testimonials />
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Sparkles,
  BadgeCheck,
  ShieldCheck,
  Truck,
  MapPin,
  Coins,
  CheckCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import Testimonials from "../components/Testimonials";

// Modern Filter Box
function ModernFilterBox({ filters, onChange, onClose }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 p-6 mb-10 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-200">
          Filters
        </h3>
        <button
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
          onClick={onClose}
          type="button"
        >
          <Filter className="w-5 h-5" /> Close
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* All filter fields as before */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-blue-100">Subject</label>
          <select className="w-full border border-blue-100 rounded p-2 focus:border-blue-400 dark:bg-slate-800 dark:text-white"
            value={filters.subject}
            onChange={e => onChange({ ...filters, subject: e.target.value })}>
            <option value="">All</option>
            <option value="Engineering">Engineering</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-blue-100">Condition</label>
          <select className="w-full border border-blue-100 rounded p-2 focus:border-blue-400 dark:bg-slate-800 dark:text-white"
            value={filters.condition}
            onChange={e => onChange({ ...filters, condition: e.target.value })}>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Like-New">Like-New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-blue-100">Book Type</label>
          <select className="w-full border border-blue-100 rounded p-2 focus:border-blue-400 dark:bg-slate-800 dark:text-white"
            value={filters.type}
            onChange={e => onChange({ ...filters, type: e.target.value })}>
            <option value="">All</option>
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-blue-100">Max Distance (km)</label>
          <input type="number" min={0} max={200}
            className="w-full border border-blue-100 rounded p-2 focus:border-blue-400 dark:bg-slate-800 dark:text-white"
            value={filters.maxDistance}
            onChange={e => onChange({ ...filters, maxDistance: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-blue-100">Max Price (₹)</label>
          <input type="number" min={0} max={5000}
            className="w-full border border-blue-100 rounded p-2 focus:border-blue-400 dark:bg-slate-800 dark:text-white"
            value={filters.maxPrice}
            onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  );
}

export default function BooksPage() {
  const { searchBooks } = useBooks();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: "",
    condition: "",
    type: "",
    maxDistance: 50,
    maxPrice: 2000,
  });

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  const filteredBooks = searchBooks(searchQuery, filters);

  return (
    <div className="relative px-0 min-h-screen bg-gray-50 dark:bg-slate-950 pt-0">
      {/* -- Sub-header/hero (card), no bg or blobs -- */}
      <div className="w-full mx-auto rounded-2xl border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-xl mt-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-6 py-8 md:px-10 md:py-10">
          {/* Left: Text */}
          <div className="flex-1 min-w-[260px]">
            <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-300 font-medium mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Smart search near you</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Browse Books
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Find textbooks from students nearby
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                <Coins className="h-4 w-4 text-yellow-500" /> Save up to 70% vs new
              </span>
              <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                <BadgeCheck className="h-4 w-4 text-green-500" /> Quality checked
              </span>
              <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                <Truck className="h-4 w-4 text-orange-500" /> Doorstep pickup & return
              </span>
            </div>
          </div>
          {/* Right: Features grid 2x2 */}
          <div className="flex-1 min-w-[260px] grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl flex items-center gap-3 bg-green-100 text-green-800 shadow hover:shadow-lg transition cursor-default">
              <CheckCircle className="h-6 w-6 text-green-500" /> Verified Users
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3 bg-blue-100 text-blue-800 shadow hover:shadow-lg transition cursor-default">
              <ShieldCheck className="h-6 w-6 text-blue-500" /> Secure Payments
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3 bg-yellow-100 text-yellow-800 shadow hover:shadow-lg transition cursor-default">
              <Truck className="h-6 w-6 text-yellow-500" /> Safe Delivery
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3 bg-purple-100 text-purple-800 shadow hover:shadow-lg transition cursor-default">
              <MapPin className="h-6 w-6 text-purple-500" /> Local Listings
            </div>
          </div>
        </div>
      </div>

      {/* Clean gap between sub-header and filter box */}
      <div className="h-4" />  {/* This ensures space between sub-header and filter box*/}

      {/* -- Filter Box (ALWAYS below, not overlapped) -- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-3 mb-8 mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-900 dark:text-white text-sm">
            Showing <span className="font-bold">{filteredBooks.length}</span> results
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition w-full sm:w-auto justify-center
              ${showFilters
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-600"}
            `}
          >
            <Filter className="h-5 w-5" />
            <span>{showFilters ? "Hide" : "Show"} Filters</span>
          </button>
        </div>
        {showFilters && (
          <ModernFilterBox
            filters={filters}
            onChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-7xl mx-auto">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Books Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      <div className="mt-16">
        <Testimonials />
      </div>
    </div>
  );
}
