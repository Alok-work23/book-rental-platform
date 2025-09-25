// import React, { useState } from "react";
// import { MapPin, Star, ShoppingCart, Calendar } from "lucide-react";
// import { Book } from "../types";
// import { useCart } from "../contexts/CartContext";
// import { motion } from "framer-motion";

// interface BookCardProps {
//   book: Book;
// }

// export default function BookCard({ book }: BookCardProps) {
//   const { addToCart } = useCart();
//   const [orderType, setOrderType] = useState<"buy" | "rent">("rent");
//   const [quantity, setQuantity] = useState(1);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const conditionColors: Record<string, string> = {
//     New: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//     "Like-New": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//     Good: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//     Fair: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
//     Poor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//   };

//   const handleAddToCart = () => {
//     if (orderType === "rent" && (!startDate || !endDate)) {
//       alert("Please select start and end dates for rental");
//       return;
//     }
//     addToCart(
//       book,
//       quantity,
//       orderType,
//       orderType === "rent" ? startDate : undefined,
//       orderType === "rent" ? endDate : undefined
//     );
//   };

//   const getCurrentPrice = () => {
//     return orderType === "buy" ? book.sellPrice : book.rentPrice;
//   };

//   const isAvailable = book.availability && book.quantity > 0;

//   const getOrderSegmentClass = (segment: "rent" | "buy"): string => {
//     if (orderType !== segment) {
//       return "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white";
//     }
//     if (!isAvailable) {
//       return "bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white";
//     }
//     return segment === "rent"
//       ? "bg-blue-600 text-white"
//       : "bg-emerald-600 text-white";
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.025, boxShadow: "0 4px 32px rgba(70,60,200,0.12)" }}
//       className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-800 overflow-hidden group transition"
//     >
//       {/* Colored blob background highlights (for visual impact) */}
//       <div className="absolute -top-12 right-0 w-32 h-32 bg-blue-400 opacity-20 blur-2xl rounded-full pointer-events-none" />
//       <div className="absolute -bottom-10 left-4 w-24 h-24 bg-pink-400 opacity-10 blur-2xl rounded-full pointer-events-none" />

//       {/* Card Content */}
//       <div className="relative z-10 flex flex-col h-full">

//         {/* Top: Book image & badges */}
//         <div className="relative rounded-xl overflow-hidden border border-blue-100 bg-white dark:bg-gray-900 mb-4">
//           <img
//             src={book.image}
//             alt={book.title}
//             className="w-full h-52 object-cover group-hover:scale-[1.04] transition"
//           />
//           {/* Rating badge */}
//           <div className="absolute top-2 right-2 flex items-center bg-black/60 backdrop-blur px-2 py-1 rounded-full text-xs text-white gap-1 shadow">
//             <Star className="h-3 w-3 text-yellow-400" />
//             {book.rating}
//           </div>
//           {/* Stock badge */}
//           <div className="absolute top-2 left-2">
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
//                 isAvailable
//                   ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                   : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
//               }`}
//             >
//               {isAvailable ? `In Stock (${book.quantity})` : "Out of Stock"}
//             </span>
//           </div>
//           {/* Category badge */}
//           {book.category && (
//             <div className="absolute bottom-2 left-2">
//               <span className="bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs shadow">
//                 {book.category}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Details Section */}
//         <div className="px-5 pb-5 flex-1 flex flex-col">
//           {/* Title & author - wrap for long text */}
//           <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 break-words whitespace-pre-wrap leading-snug">
//             {book.title}
//           </h3>
//           <div className="flex flex-wrap items-center gap-2 mb-2">
//             <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-700 dark:text-gray-300 font-medium">
//               by {book.author}
//             </span>
//             <div className="flex items-center text-xs text-gray-500 dark:text-gray-300">
//               <MapPin className="h-3 w-3 mr-1" />
//               <span className="truncate max-w-[10rem]">{book.location}</span>
//             </div>
//           </div>
//           {/* Chips: Condition & type */}
//           <div className="flex gap-2 flex-wrap items-center mb-1">
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-bold ${conditionColors[book.condition]}`}
//               title={`Condition: ${book.condition}`}
//             >
//               {book.condition}
//             </span>
//             {book.type && (
//               <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-semibold">
//                 {book.type.charAt(0).toUpperCase() + book.type.slice(1)}
//               </span>
//             )}
//           </div>
//           {/* Description: multiline, scrollable if needed */}
//           {book.description && (
//             <div className="mb-2 text-sm text-gray-700 dark:text-gray-200 max-h-[70px] overflow-auto leading-relaxed whitespace-pre-line break-words">
//               {book.description}
//             </div>
//           )}

//           {/* Segmented rent/buy */}
//           <div className="mb-3">
//             <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex">
//               <button
//                 onClick={() => setOrderType("rent")}
//                 className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${getOrderSegmentClass("rent")}`}
//               >
//                 Rent
//               </button>
//               {book.type !== "rent" && (
//                 <button
//                   onClick={() => setOrderType("buy")}
//                   className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${getOrderSegmentClass("buy")}`}
//                 >
//                   Buy
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Price & Quantity */}
//           <div className="flex flex-wrap gap-3 items-center mb-3">
//             <div className="flex flex-col">
//               <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-200 leading-none">
//                 ₹{getCurrentPrice()}
//               </span>
//               {orderType === "rent" && (
//                 <span className="text-xs text-gray-500 dark:text-gray-300">per day</span>
//               )}
//               {orderType === "rent" && book.sellPrice && (
//                 <span className="text-xs text-gray-400 mb-1">
//                   Or buy for ₹{book.sellPrice}
//                 </span>
//               )}
//             </div>
//             {/* Quantity */}
//             <div className="flex items-center ml-auto gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Qty</span>
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 text-lg font-bold"
//                 aria-label="Decrease Quantity"
//               >
//                 -
//               </button>
//               <span className="w-6 text-center font-semibold">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(Math.min(book.quantity, quantity + 1))}
//                 className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 text-lg font-bold"
//                 aria-label="Increase Quantity"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Rental Dates */}
//           {orderType === "rent" && (
//             <div className="space-y-2 mb-3">
//               <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                 <Calendar className="h-4 w-4" />
//                 <span>Select rental period:</span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     value={startDate}
//                     onChange={e => setStartDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="border border-gray-200 rounded py-1 px-2 w-full text-sm bg-white dark:bg-gray-900"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={endDate}
//                     onChange={e => setEndDate(e.target.value)}
//                     min={startDate || new Date().toISOString().split("T")[0]}
//                     className="border border-gray-200 rounded py-1 px-2 w-full text-sm bg-white dark:bg-gray-900"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             disabled={!isAvailable}
//             className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300
//               ${
//                 isAvailable
//                   ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
//                   : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             <ShoppingCart className="h-5 w-5" />
//             <span>
//               {isAvailable
//                 ? orderType === "rent"
//                   ? `Rent ₹${book.rentPrice}/day`
//                   : `Buy ₹${book.sellPrice}`
//                 : "Out of Stock"}
//             </span>
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }



import React, { useState } from "react";
import { MapPin, Star, ShoppingCart, Calendar } from "lucide-react";
import { Book } from "../types";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const [orderType, setOrderType] = useState<"buy" | "rent">("rent");
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const conditionColors: Record<string, string> = {
    New: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Like-New": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Good: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Fair: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Poor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const handleAddToCart = () => {
    if (orderType === "rent" && (!startDate || !endDate)) {
      alert("Please select start and end dates for rental");
      return;
    }
    addToCart(
      book,
      quantity,
      orderType,
      orderType === "rent" ? startDate : undefined,
      orderType === "rent" ? endDate : undefined
    );
  };

  const getCurrentPrice = () => {
    return orderType === "buy" ? book.sellPrice : book.rentPrice;
  };

  const isAvailable = book.availability && book.quantity > 0;

  const getOrderSegmentClass = (segment: "rent" | "buy"): string => {
    if (orderType !== segment) {
      return "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white";
    }
    if (!isAvailable) {
      return "bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white";
    }
    return segment === "rent"
      ? "bg-blue-600 text-white"
      : "bg-emerald-600 text-white";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.025, boxShadow: "0 4px 32px rgba(70,60,200,0.12)" }}
      className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-800 overflow-hidden group transition"
    >
      {/* Background blobs */}
      <div className="absolute -top-12 right-0 w-32 h-32 bg-blue-400 opacity-20 blur-2xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 left-4 w-24 h-24 bg-pink-400 opacity-10 blur-2xl rounded-full pointer-events-none" />

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image & badges */}
        <div className="relative rounded-xl overflow-hidden border border-blue-100 bg-white dark:bg-gray-900 mb-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-52 object-cover group-hover:scale-[1.04] transition"
          />
          {/* Rating */}
          <div className="absolute top-2 right-2 flex items-center bg-black/60 backdrop-blur px-2 py-1 rounded-full text-xs text-white gap-1 shadow">
            <Star className="h-3 w-3 text-yellow-400" />
            {book.rating}
          </div>
          {/* Stock */}
          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                isAvailable
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {isAvailable ? `In Stock (${book.quantity})` : "Out of Stock"}
            </span>
          </div>
          {/* Category */}
          {book.category && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs shadow">
                {book.category}
              </span>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 flex-1 flex flex-col">
          {/* Title & author */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 break-words whitespace-pre-wrap leading-snug">
            {book.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-700 dark:text-gray-300 font-medium">
              by {book.author}
            </span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-300">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate max-w-[10rem]">{book.location}</span>
            </div>
          </div>
          {/* Chips */}
          <div className="flex gap-2 flex-wrap items-center mb-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${conditionColors[book.condition]}`}
            >
              {book.condition}
            </span>
            {book.type && (
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-semibold">
                {book.type.charAt(0).toUpperCase() + book.type.slice(1)}
              </span>
            )}
          </div>
          {/* Description */}
          {book.description && (
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-200 max-h-[70px] overflow-auto leading-relaxed whitespace-pre-line break-words">
              {book.description}
            </div>
          )}

          {/* Rent/Buy toggle */}
          <div className="mb-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex">
              <button
                onClick={() => setOrderType("rent")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${getOrderSegmentClass("rent")}`}
              >
                Rent
              </button>
              {book.type !== "rent" && (
                <button
                  onClick={() => setOrderType("buy")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${getOrderSegmentClass("buy")}`}
                >
                  Buy
                </button>
              )}
            </div>
          </div>

          {/* Price & quantity */}
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-200 leading-none">
                ₹{getCurrentPrice()}
              </span>
              {orderType === "rent" && (
                <span className="text-xs text-gray-500 dark:text-gray-300">per day</span>
              )}
              {orderType === "rent" && book.sellPrice && (
                <span className="text-xs text-gray-400 mb-1">
                  Or buy for ₹{book.sellPrice}
                </span>
              )}
            </div>
            <div className="flex items-center ml-auto gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Qty</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                -
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(book.quantity, quantity + 1))}
                className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Rental dates */}
          {orderType === "rent" && (
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>Select rental period:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="border border-gray-200 rounded py-1 px-2 w-full text-sm bg-white dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    className="border border-gray-200 rounded py-1 px-2 w-full text-sm bg-white dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isAvailable
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>
              {isAvailable
                ? orderType === "rent"
                  ? `Rent ₹${book.rentPrice}/day`
                  : `Buy ₹${book.sellPrice}`
                : "Out of Stock"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
