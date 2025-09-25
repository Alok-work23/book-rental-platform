import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  CreditCard,
  Truck,
  RefreshCcw,
  Info,
  LogOut,
  UserPlus,
  HelpCircle
} from "lucide-react";

const FAQS = [
  {
    question: 'How do I reset my password?',
    icon: Lock,
    answer:
      'You can reset your password by clicking the "Forgot Password" link on the login page and following the email instructions.'
  },
  {
    question: 'What payment methods are accepted?',
    icon: CreditCard,
    answer:
      'We accept all major credit cards, debit cards, and UPI through our secure payment gateway.'
  },
  {
    question: 'How can I track my delivery?',
    icon: Truck,
    answer:
      'Track the status of your delivery in real-time from the "My Deliveries" section of your profile. Notifications will be sent on every update.'
  },
  {
    question: "How do I return a rented book?",
    icon: RefreshCcw,
    answer:
      "Go to the 'My Orders' page, select the rental order, and click 'Request Return.' Our delivery partner will contact you to schedule pickup."
  },
  {
    question: "How do I contact BookShare support?",
    icon: Info,
    answer:
      "Use the in-app chat, email us at support@bookshare.com, or click the Help widget at the bottom-right corner of every page."
  },
  {
    question: "How do I delete my account?",
    icon: LogOut,
    answer:
      "Go to Profile → Settings → Delete Account. For your security, this is irreversible and will remove all your data."
  },
  {
    question: "How do I become a BookShare member?",
    icon: UserPlus,
    answer:
      "Sign up using your email, Google, or phone number. Once verified, you can immediately list books or place rental requests."
  },
  {
    question: "Can't find my answer. What now?",
    icon: HelpCircle,
    answer:
      "If your question isn't listed, contact our support team via the button below or email support@bookshare.com. We're here to help!"
  }
];

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 mx-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">Help Center</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base mb-2">Find answers to your questions and get help using BookShare.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={faq.question}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow group"
            >
              <button
                aria-expanded={openIndex === idx}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none group-hover:bg-blue-50 dark:group-hover:bg-gray-700 transition"
                onClick={() => handleToggle(idx)}
              >
                <div className="flex items-center gap-3">
                  {faq.icon && <faq.icon className="h-5 w-5 text-blue-600 dark:text-cyan-400 shrink-0" />}
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                {openIndex === idx ? (
                  <ChevronDown className="h-5 w-5 text-blue-600 dark:text-cyan-400 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-transform duration-300" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-7 pb-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Still need help?{" "}
          <a
            href="mailto:support@bookshare.com"
            className="text-blue-600 dark:text-cyan-400 font-semibold underline hover:text-blue-800 dark:hover:text-cyan-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
