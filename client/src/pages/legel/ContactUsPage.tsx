import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, HelpCircle, Shield } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 min-h-screen text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We’re here to help. Reach out anytime—you’ll always get a response within 24 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
          {/* Email */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <Mail className="h-10 w-10 text-blue-600 dark:text-cyan-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Email Support</h3>
            <a href="mailto:support@bookshare.com" className="text-blue-500 font-medium hover:underline">
              support@bookshare.com
            </a>
            <p className="text-gray-500 mt-3 text-sm">Responses within 24 hours</p>
          </div>
          {/* Phone */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <Phone className="h-10 w-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Phone Support</h3>
            <a href="tel:+911234567890" className="text-green-600 font-medium hover:underline">
              +91 123-456-7890
            </a>
            <p className="text-gray-500 mt-3 text-sm">Mon–Sat, 10AM–6PM IST</p>
          </div>
        </div>
        {/* Address and Chat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Office Location */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <MapPin className="h-10 w-10 text-orange-500 dark:text-orange-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Office Address</h3>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              BookShare, G-12 Knowledge Park,<br />
              Delhi NCR, New Delhi, India, 110016
            </p>
            <p className="text-gray-500 mt-2 text-sm">Visits by appointment only</p>
          </div>
          {/* Live Chat (placeholder) */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <MessageCircle className="h-10 w-10 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Live Chat</h3>
            <p className="text-gray-500 mb-2">Instant answers for urgent issues</p>
            <button
              className="mt-1 bg-blue-600 dark:bg-cyan-500 hover:bg-blue-700 dark:hover:bg-cyan-600 text-white rounded-lg px-6 py-2 font-semibold transition"
              onClick={() => alert("Chatbot coming soon!")}
            >
              Start Chat
            </button>
          </div>
        </div>
        {/* Helpful Quick Links */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="/help-center"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-blue-700 font-medium text-blue-600 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            <HelpCircle className="h-4 w-4" />
            Help Center / FAQ
          </a>
          <a
            href="/safety"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-green-700 font-medium text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 transition"
          >
            <Shield className="h-4 w-4" />
            Safety Guidelines
          </a>
        </div>
        <p className="text-center mt-10 text-gray-400 text-xs">
          We care about your privacy and security. Never share OTPs or payment info outside BookShare channels.
        </p>
      </div>
    </div>
  );
}
