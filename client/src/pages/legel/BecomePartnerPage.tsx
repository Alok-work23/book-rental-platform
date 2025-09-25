// import React from 'react';
// import { Handshake, Store, Bike } from 'lucide-react';

// export default function BecomePartnerPage() {
//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Become a BookShare Partner</h1>
//           <p className="text-xl text-gray-600 dark:text-gray-400">Join our network and help us grow the student community.</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
//                 <Handshake className="h-10 w-10 text-blue-600 dark:text-cyan-400 mb-4"/>
//                 <h3 className="text-2xl font-semibold mb-2">Campus Ambassador</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Represent BookShare at your university. Promote our platform, organize events, and earn rewards for bringing new users onboard.</p>
//             </div>
//             <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
//                 <Bike className="h-10 w-10 text-green-600 dark:text-green-400 mb-4"/>
//                 <h3 className="text-2xl font-semibold mb-2">Delivery Partner</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Join our fleet of delivery partners. Get flexible working hours and competitive pay for handling book pickups and drop-offs in your area.</p>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Handshake, Store, Bike, Users, Globe, Award } from 'lucide-react';

export default function BecomePartnerPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white dark:from-gray-950 dark:via-gray-900 to-white dark:to-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Become a BookShare Partner</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join our growth mission—partner with BookShare to build the future of student book access and community!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Campus Ambassador */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <Handshake className="h-10 w-10 text-blue-600 dark:text-cyan-400 mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Campus Ambassador</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Represent BookShare at your university. Host events, spread awareness, and unlock exclusive rewards for growing our student network.
            </p>
          </div>
          {/* Delivery Partner */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <Bike className="h-10 w-10 text-green-600 dark:text-green-400 mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Delivery Partner</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Become a BookShare delivery partner—enjoy flexible schedules, reliable earnings, and play a key role in education delivery in your city.
            </p>
          </div>
          {/* Bookshop Partner */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <Store className="h-10 w-10 text-orange-500 dark:text-orange-400 mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Bookshop Partner</h3>
            <p className="text-gray-600 dark:text-gray-400">
              If you run a local bookshop or store, collaborate to list inventory, expand reach, and get in-store pickup or drop-off traffic via BookShare.
            </p>
          </div>
          {/* Community/Influencer Partner */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <Users className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Community/Influencer Ally</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Are you a student leader, YouTuber, or campus society? Partner with us to promote BookShare, run campaigns, or co-create impact events for extra perks.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
            Have a partnership idea not listed here?
          </p>
          <a
            href="mailto:partnerships@bookshare.com"
            className="inline-flex items-center gap-2 bg-blue-600 dark:bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 dark:hover:bg-cyan-600 transition"
          >
            <Globe className="h-5 w-5" />
            Partner With Us
          </a>
        </div>
      </div>
    </div>
  );
}
