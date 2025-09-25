import React from 'react';
import {
  Repeat, CheckCircle, Clock, XOctagon, Mail
} from 'lucide-react';

const REFUND_SECTIONS = [
  {
    icon: <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />,
    title: "Eligibility for a Refund",
    points: [
      "You may be eligible for a refund if the book you received is not in the condition described in the listing.",
      "Refunds may be granted if delivery fails or is significantly delayed.",
      "Books that are lost or damaged during shipping qualify for refunds.",
      "Refunds are not available for buyer’s remorse or change of mind after delivery."
    ]
  },
  {
    icon: <Repeat className="h-7 w-7 text-blue-600 dark:text-cyan-400" />,
    title: "How to Request a Refund",
    points: [
      "Contact our support team within 24 hours of receiving the book.",
      "Provide your order details along with photos if applicable.",
      "Our team will review your request and may require additional information.",
      "Resolution may include replacement, full refund, or partial refund depending on the case."
    ]
  },
  {
    icon: <Clock className="h-7 w-7 text-orange-500 dark:text-orange-400" />,
    title: "Refund Process Timeline",
    points: [
      "Once approved, refunds will be processed within 5-7 business days.",
      "Refunds are issued via the original payment method.",
      "You will be notified via email when your refund has been processed.",
      "Banks may require additional time to credit the amount in your account."
    ]
  },
  {
    icon: <XOctagon className="h-7 w-7 text-red-500 dark:text-red-400" />,
    title: "Non-Refundable Items",
    points: [
      "Books that have been damaged or altered by the buyer.",
      "Digital goods or downloadable content.",
      "Orders cancelled after the shipping process has started."
    ]
  },
  {
    icon: <Mail className="h-7 w-7 text-blue-500 dark:text-cyan-400" />,
    title: "Contact Us",
    points: [
      <>
        For refund questions or assistance, email us at{' '}
        <a href="mailto:support@bookshare.com" className="text-blue-600 dark:text-cyan-400 underline">
          support@bookshare.com
        </a>
        .
      </>
    ]
  }
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-7 text-center">Refund Policy</h1>
        <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg">
          We strive to make every transaction smooth and worry-free. Here are our refund conditions, processes, and timelines.
        </p>
        <div className="space-y-8">
          {REFUND_SECTIONS.map((sec, idx) => (
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
          Last updated: {new Date().toLocaleDateString()}. Refunds are subject to BookShare's platform policies.
        </div>
      </div>
    </div>
  );
}
