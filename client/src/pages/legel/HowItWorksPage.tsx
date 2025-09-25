// import React from 'react';
// import { Search, List, CreditCard, Truck, BookCheck, IndianRupee, CheckCircle } from 'lucide-react';

// export default function HowItWorksPage() {
//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">How BookShare Works</h1>
//           <p className="text-xl text-gray-600 dark:text-gray-400">A simple guide to renting, buying, and selling your textbooks.</p>
//         </div>

//         {/* For Renters & Buyers */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">For Renters & Buyers</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg"><Search className="h-6 w-6 text-blue-600 dark:text-blue-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">1. Find Your Book</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Use our powerful search and filter tools to find the exact textbook you need. Search by title, author, or subject and filter by your location to find books from students near you.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg"><CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">2. Rent or Buy Securely</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Add books to your cart and choose your rental duration or decide to buy. All payments are processed securely through our trusted payment partners, and your purchase is protected.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg"><Truck className="h-6 w-6 text-orange-600 dark:text-orange-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">3. Doorstep Delivery</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Once your request is approved, our delivery partners will pick up the book from the owner and deliver it straight to your doorstep. You can track the entire process in real-time.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg"><BookCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">4. Easy Returns</h3>
//                 <p className="text-gray-600 dark:text-gray-400">When your rental period is over, our delivery partner will contact you to schedule a convenient pickup time for the return. It's a completely hassle-free process.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* For Book Owners */}
//         <div>
//           <h2 className="text-3xl font-bold mb-8 text-center">For Book Owners</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg"><List className="h-6 w-6 text-blue-600 dark:text-blue-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">1. List Your Book</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Create a listing for your old textbooks in under two minutes. Just add the title, author, condition, and set your own rental and selling prices.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg"><CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">2. Approve Requests</h3>
//                 <p className="text-gray-600 dark:text-gray-400">You'll receive notifications when a student wants to rent or buy your book. You have full control to approve or decline any request.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg"><Truck className="h-6 w-6 text-orange-600 dark:text-orange-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">3. Effortless Pickup</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Once you approve a request, our delivery partner will handle the pickup from your location at a scheduled time. No need to leave your home.</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//               <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg"><IndianRupee className="h-6 w-6 text-purple-600 dark:text-purple-400" /></div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">4. Get Paid</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Receive your earnings directly in your account as soon as the rental or sale is confirmed. It's a simple and secure way to make money from your old books.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import {
  Search, List, CreditCard, Truck, BookCheck, IndianRupee, CheckCircle, Sparkles
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white dark:from-gray-950 dark:via-gray-900 to-white dark:to-gray-900 min-h-screen text-gray-900 dark:text-white py-10">
      {/* Hero/top section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <span className="uppercase tracking-wider text-blue-500 dark:text-cyan-300 font-semibold text-sm">Seamless Book Sharing</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">How BookShare Works</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
          Your all-in-one platform for renting, buying, and monetizing textbooks—completely hassle-free.
        </p>
      </div>

      {/* Divider/visual */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-blue-200 dark:border-blue-800" />
          <span className="font-semibold text-blue-500 dark:text-cyan-300 px-4">Made for Students</span>
          <hr className="flex-1 border-blue-200 dark:border-blue-800" />
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        {/* For Renters & Buyers */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-700 dark:text-cyan-300 tracking-tight">For Renters & Buyers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/60 p-3 rounded-xl">
                <Search className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Find Your Book</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instantly search by title, author, or subject. Filter by city or campus to find books from students near you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/60 p-3 rounded-xl">
                <CreditCard className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Rent or Buy Securely</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Add books to your cart, select rent or buy, and pay securely. Your payment and order are always protected.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/60 p-3 rounded-xl">
                <Truck className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Doorstep Delivery</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once approved, our delivery partner brings your chosen book straight to your door. Track progress in real time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/60 p-3 rounded-xl">
                <BookCheck className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When your rental ends, the delivery partner contacts you for a smooth, no-hassle pickup—just pack, hand over, done.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          {/* For Book Owners */}
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700 dark:text-emerald-400 tracking-tight">For Book Owners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/60 p-3 rounded-xl">
                <List className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">1. List Your Book</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create a listing in under 2 minutes—just add book details, condition, and your prices (rental, sale, or both).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/60 p-3 rounded-xl">
                <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Approve Requests</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive notifications instantly when a student wants your book. You choose to approve or decline each request.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/60 p-3 rounded-xl">
                <Truck className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Effortless Pickup</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Approved? We schedule a pickup with our partner at your convenience—no need to ship or meet at awkward times.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/60 p-3 rounded-xl">
                <IndianRupee className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Get Paid</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive your payment directly and securely once the rental or sale is verified. Earnings go straight to your account.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
