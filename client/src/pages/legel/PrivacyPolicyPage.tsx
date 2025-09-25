import React from 'react';
import {
  User, Lock, Eye, Cloud, Send, ShieldCheck, Trash2, Globe2
} from 'lucide-react';

const SECTIONS = [
  {
    icon: <User className="h-7 w-7 text-blue-600 dark:text-cyan-400" />,
    title: "Information We Collect",
    points: [
      "Personal details you provide when creating an account (name, email, phone).",
      "Profile info, delivery location, and communication history.",
      "Your listed books, book orders, and transaction data.",
      "Technical and device info (IP address, browser type, usage stats)."
    ]
  },
  {
    icon: <Eye className="h-7 w-7 text-green-600 dark:text-green-400" />,
    title: "How We Use Your Information",
    points: [
      "To provide, maintain, and improve BookShare services.",
      "To personalize your experience and recommend content.",
      "To help deliver books, manage orders, process payments, and provide customer support.",
      "To notify you about updates, offers, or changes to our platform."
    ]
  },
  {
    icon: <Lock className="h-7 w-7 text-purple-600 dark:text-purple-400" />,
    title: "How We Protect Your Data",
    points: [
      "All data is stored securely and encrypted where possible.",
      "We restrict access to your data to authorized staff only.",
      "Payment information is handled by trusted, PCI-compliant processors; BookShare never stores your card details."
    ]
  },
  {
    icon: <Send className="h-7 w-7 text-orange-500 dark:text-orange-400" />,
    title: "Sharing & Disclosure",
    points: [
      "We never sell your data to advertisers.",
      "BookShare may share your data with delivery partners, payment processors, or for legal compliance, always with minimum necessary access.",
      "Users with verified accounts may appear publicly in reviews, messages, or book listings."
    ]
  },
  {
    icon: <Trash2 className="h-7 w-7 text-red-500 dark:text-red-400" />,
    title: "Your Rights & Choices",
    points: [
      "You can update, download, or request deletion of your information at any time from Profile > Settings.",
      "You may opt out of marketing emails using the unsubscribe link.",
      "For account/data deletion, contact support: support@bookshare.com."
    ]
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-teal-500 dark:text-teal-400" />,
    title: "Children's Privacy",
    points: [
      "BookShare is intended for students 16+ only. We do not knowingly collect personal data from children under 16."
    ]
  },
  {
    icon: <Cloud className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />,
    title: "International Data Transfers",
    points: [
      "Your data may be processed outside your home country (including India or other jurisdictions) but is always protected under strict privacy standards."
    ]
  },
  {
    icon: <Globe2 className="h-7 w-7 text-cyan-500 dark:text-cyan-300" />,
    title: "Policy Changes & Contact",
    points: [
      "This policy is updated occasionally. Material changes will be notified in advance.",
      "For any questions, email us at: support@bookshare.com."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-7 text-center">Privacy Policy</h1>
        <p className="mb-10 text-center text-gray-600 dark:text-gray-400 text-lg">
          Your privacy is our priority. Please review how BookShare handles and protects your data.
        </p>
        <div className="space-y-8">
          {SECTIONS.map((sec, idx) => (
            <div key={sec.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-6 py-7 flex flex-col sm:flex-row items-start gap-5">
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
          Last updated: {new Date().toLocaleDateString()}. Continued use means acceptance of this Privacy Policy.
        </div>
      </div>
    </div>
  );
}
