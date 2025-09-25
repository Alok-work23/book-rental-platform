import React from 'react';
import {
  UserCheck, BookOpen, CreditCard, Truck, ShieldOff, Gavel, Zap, Mail
} from 'lucide-react';

const CARDS = [
  {
    icon: <UserCheck className="h-7 w-7 text-blue-600 dark:text-cyan-400" />,
    title: "User Eligibility & Accounts",
    points: [
      "You must be a registered student or approved user to use BookShare.",
      "You’re responsible for safeguarding account login details.",
      "Provide and update accurate information as needed.",
      "Do not share your account—you're liable for all activity under it."
    ]
  },
  {
    icon: <BookOpen className="h-7 w-7 text-green-600 dark:text-green-400" />,
    title: "Book Listings & Responsibilities",
    points: [
      "Owners must ensure listings are accurate: title, author, condition, price, and photos if available.",
      "You may only list books you legally own and have rights to distribute.",
      "Listing or sharing pirated, illegal, or prohibited content is strictly forbidden."
    ]
  },
  {
    icon: <CreditCard className="h-7 w-7 text-purple-600 dark:text-purple-400" />,
    title: "Rentals, Sales & Payments",
    points: [
      "All payments must be made through the official BookShare platform; never send/receive money off-platform.",
      "BookShare may hold payments until orders or rentals are confirmed by both parties.",
      "Platform fees and commissions may apply and are shown at checkout."
    ]
  },
  {
    icon: <Truck className="h-7 w-7 text-orange-500 dark:text-orange-400" />,
    title: "Delivery, Returns & Refunds",
    points: [
      "Deliveries are via BookShare partners or approved local logistics only.",
      "Rented books must be returned in the described condition; damages/missing items may result in charges.",
      "Refunds are available for qualifying cancellations per our refund policy."
    ]
  },
  {
    icon: <ShieldOff className="h-7 w-7 text-red-500 dark:text-red-400" />,
    title: "Prohibited Conduct",
    points: [
      "Impersonation, harassment, spamming, and fake information are forbidden.",
      "Don’t circumvent BookShare’s messaging, listing, or payment process.",
      "Do not list or transact in illegal, counterfeit, or infringing books."
    ]
  },
  {
    icon: <Gavel className="h-7 w-7 text-yellow-500 dark:text-yellow-300" />,
    title: "Disputes & Resolution",
    points: [
      "Contact BookShare Support immediately for issues—our team will help resolve disputes fairly.",
      "BookShare isn’t responsible for problems when you transact outside the platform."
    ]
  },
  {
    icon: <Zap className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />,
    title: "Changes, Termination & Liability",
    points: [
      "BookShare may update these terms at any time. Material changes will be announced to users.",
      "We may suspend or terminate accounts violating these terms—at our discretion.",
      "BookShare isn’t liable for any losses from unauthorized use, incomplete listings, or off-platform actions."
    ]
  },
  {
    icon: <Mail className="h-7 w-7 text-blue-500 dark:text-cyan-400" />,
    title: "Contact & Support",
    points: [
      <>
        For any questions, reach us at{' '}
        <a href="mailto:support@bookshare.com" className="text-blue-600 dark:text-cyan-400 underline">
          support@bookshare.com
        </a>
        .
      </>
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-7 text-center">Terms of Service</h1>
        <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg">
          Welcome to BookShare! By accessing or using our platform, you agree to these Terms of Service.
        </p>
        <div className="space-y-8">
          {CARDS.map((sec, idx) => (
            <div
              key={sec.title}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-6 py-7 flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="sm:pt-2">{sec.icon}</div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-300">{sec.title}</h2>
                <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-200">
                  {sec.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-xs text-center text-gray-500 dark:text-gray-400">
          Continued use of BookShare means you accept all of the above terms. Last updated: {new Date().toLocaleDateString()}.
        </div>
      </div>
    </div>
  );
}
