// import React from 'react';
// import { ShieldCheck, MessageSquare, MapPin } from 'lucide-react';

// export default function SafetyGuidelinesPage() {
//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
//           <p className="text-xl text-gray-600 dark:text-gray-400">Your safety is our priority. Follow these tips for a secure experience.</p>
//         </div>
//         <div className="space-y-8">
//             <div className="flex items-start space-x-4"><div className="flex-shrink-0"><ShieldCheck className="h-8 w-8 text-green-500"/></div><div><h3 className="text-xl font-semibold">Verify Profiles</h3><p className="text-gray-600 dark:text-gray-400">Always check user ratings and reviews before transacting. All our users are verified, but it's good practice to be aware.</p></div></div>
//             <div className="flex items-start space-x-4"><div className="flex-shrink-0"><MessageSquare className="h-8 w-8 text-blue-500"/></div><div><h3 className="text-xl font-semibold">Communicate on Platform</h3><p className="text-gray-600 dark:text-gray-400">Keep all communication within the BookShare platform. Avoid sharing personal contact information like phone numbers or email addresses until a transaction is confirmed.</p></div></div>
//             <div className="flex items-start space-x-4"><div className="flex-shrink-0"><MapPin className="h-8 w-8 text-orange-500"/></div><div><h3 className="text-xl font-semibold">Use Our Delivery Service</h3><p className="text-gray-600 dark:text-gray-400">For your safety, we strongly recommend using our verified delivery partners for all pickups and drop-offs. Avoid in-person meetups if possible.</p></div></div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import {
  ShieldCheck,
  MessageSquare,
  MapPin,
  Eye,
  AlertTriangle,
  Flag
} from 'lucide-react';

export default function SafetyGuidelinesPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your safety is our priority. Follow these tips for a secure and worry-free BookShare experience.
          </p>
        </div>
        <div className="space-y-8">

          {/* Verify Profiles */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Verify Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Always check user ratings and reviews before starting a transaction. All users are verified, but stay alert and aware.
              </p>
            </div>
          </div>

          {/* Communicate on Platform */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Communicate on Platform</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep all chats within the BookShare app or website. Avoid sharing phone numbers or email until a transaction is confirmed.
              </p>
            </div>
          </div>

          {/* Use Delivery Service */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <MapPin className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Use Our Delivery Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                For your peace of mind, use BookShare’s verified delivery partners for handover. Avoid in-person meetups with strangers unless absolutely essential.
              </p>
            </div>
          </div>
          
          {/* NEW: Inspect Your Book */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Inspect Before Accepting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                When your book arrives, quickly check for damages or incorrect items. Report any problems to BookShare support immediately—do not accept books that don't match the listing.
              </p>
            </div>
          </div>

          {/* NEW: Beware of Unrealistic Offers */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Be Cautious of Unrealistic Offers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beware of deals, prices, or requests that seem “too good to be true.” BookShare will never ask for payment outside the platform or for personal/OTP information via unofficial channels.
              </p>
            </div>
          </div>

          {/* NEW: Report Suspicious Activity */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Flag className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Report Suspicious Activity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                If you suspect a user, listing, or message is suspicious, immediately report or block via the app. Our team reviews all reports and will take appropriate action to keep the community safe.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
