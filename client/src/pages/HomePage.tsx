
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  MapPin,
  Star,
  Search,
  CreditCard,
  Truck,
  CheckCircle,
  List,
  LayoutGrid,
  Cog,
  Sigma,
  FlaskConical,
  Briefcase,
  TerminalSquare,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BookContext";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { books } = useBooks();
  const nearbyBooks = books.slice(0, 4);

  const categories = [
    { name: "Engineering", icon: Cog },
    { name: "Mathematics", icon: Sigma },
    { name: "Science", icon: FlaskConical },
    { name: "Business", icon: Briefcase },
    { name: "Computer Science", icon: TerminalSquare },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-violet-100 dark:from-gray-900 dark:via-blue-950 dark:to-violet-950 min-h-screen">
      
      {/* HEADER */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">BookShare</span>
          </div>
          {!isAuthenticated && (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-pink-400 min-h-[420px] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-3xl z-0 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>

        {/* main grid */}
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow">
              Rent, Buy & Sell
              <br />
              <span className="text-yellow-300">Books with Students</span>
            </h1>
            <p className="text-lg mb-8 text-white/90 max-w-lg drop-shadow">
              Build your library, save money, and join a passionate learning community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/books"
                className="px-8 py-3 font-bold rounded-xl bg-white text-blue-700 shadow-lg hover:bg-blue-100 hover:scale-105 transition"
              >
                Browse Books
              </Link>
              <Link
                to="/my-books"
                className="px-8 py-3 font-bold rounded-xl bg-pink-600 text-white shadow-lg hover:bg-pink-700 hover:scale-105 transition"
              >
                Sell a Book
              </Link>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="bg-white/90 rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-6 border border-blue-100 max-w-md w-full">
              <div className="flex flex-col items-center text-center p-5 rounded-xl bg-blue-50 shadow hover:shadow-lg transition">
                <BookOpen className="h-10 w-10 mb-3 text-blue-600" />
                <span className="text-lg font-bold text-blue-800">15,000+ Books</span>
              </div>
              <div className="flex flex-col items-center text-center p-5 rounded-xl bg-blue-50 shadow hover:shadow-lg transition">
                <Users className="h-10 w-10 mb-3 text-purple-600" />
                <span className="text-lg font-bold text-purple-800">5,000+ Students</span>
              </div>
              <div className="flex flex-col items-center text-center p-5 rounded-xl bg-blue-50 shadow hover:shadow-lg transition">
                <MapPin className="h-10 w-10 mb-3 text-pink-600" />
                <span className="text-lg font-bold text-pink-800">50+ Cities</span>
              </div>
              <div className="flex flex-col items-center text-center p-5 rounded-xl bg-blue-50 shadow hover:shadow-lg transition">
                <Star className="h-10 w-10 mb-3 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-700">4.8 Rated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Categories</h2>
            <Link to="/books" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.08 }}
                key={cat.name}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-tr from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-950 shadow hover:shadow-xl transition font-medium text-gray-700 dark:text-white"
              >
                <cat.icon className="h-5 w-5" />
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS NEAR YOU */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900/90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-cyan-100">Books Near You</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Available for rent/purchase in your area</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-medium">
                <option>Sort by Distance</option>
                <option>Sort by Price</option>
              </select>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button className="p-2">
                  <LayoutGrid className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2">
                  <List className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
          {nearbyBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {nearbyBooks.map((book) => (
                <motion.div whileHover={{ scale: 1.03 }} key={book.id}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-blue-300 dark:border-cyan-700 rounded-xl text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No books found in your area.</p>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-5 text-gray-900 dark:text-white">How BookShare Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            Simple, secure, and convenient book sharing in just a few steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 mb-4 mx-auto text-blue-500" />,
                title: "Find & Browse",
                desc: "Search by subject, author, or location. Browse verified listings from fellow students.",
                tags: ["Location-Based", "Verified Users"],
                color: "text-blue-600",
              },
              {
                icon: <CreditCard className="h-10 w-10 mb-4 mx-auto text-green-500" />,
                title: "Rent or Buy",
                desc: "Choose flexible rental terms or buy directly. Secure payments and buyer protection.",
                tags: ["Secure Payments", "Flexible Terms"],
                color: "text-green-600",
              },
              {
                icon: <Truck className="h-10 w-10 mb-4 mx-auto text-orange-500" />,
                title: "Doorstep Delivery",
                desc: "Pickup/drop-off handled by trusted partners. Track your order live.",
                tags: ["Real-Time Tracking", "Safe Delivery"],
                color: "text-orange-600",
              },
            ].map((step, idx) => (
              <motion.div
                whileHover={{ scale: 1.05, y: -6 }}
                key={idx}
                className="p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80"
              >
                {step.icon}
                <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 text-center">{step.desc}</p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {step.tags.map((tag) => (
                    <span key={tag} className={`flex items-center text-xs ${step.color}`}>
                      <CheckCircle className="h-4 w-4 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR BOOK OWNERS */}
      <section className="py-12 bg-gradient-to-tr from-blue-100 to-violet-200 dark:from-blue-950 dark:to-violet-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl bg-white dark:bg-gray-900/80 p-8 shadow-xl">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">For Book Owners</h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-green-500" /> List your books in under 2 minutes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-green-500" /> Set your own rental rates and selling prices
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-green-500" /> Zero effort delivery - we handle pickup & return
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-green-500" /> Instant payments to your account
                </li>
              </ul>
              <Link
                to="/my-books"
                className="mt-8 inline-block px-8 py-3 bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-bold rounded-lg shadow hover:scale-105 transition"
              >
                Start Listing Books
              </Link>
            </div>
            <div className="hidden md:block rounded-2xl overflow-hidden h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                alt="Books on desk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & FOOTER */}
      <Testimonials />
      <Footer />
    </div>
  );
}

