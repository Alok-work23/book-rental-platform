// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BookOpen, User, Package, MapPin, LogOut } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export default function Header() {
//   const { isAuthenticated, user, logout } = useAuth();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <BookOpen className="h-8 w-8 text-blue-600" />
//             <span className="text-xl font-bold text-gray-900">BookShare</span>
//           </Link>

//           {isAuthenticated ? (
//             <nav className="flex items-center space-x-6">
//               <Link
//                 to="/books"
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive('/books')
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                 }`}
//               >
//                 <BookOpen className="h-4 w-4" />
//                 <span>Browse Books</span>
//               </Link>
              
//               <Link
//                 to="/my-books"
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive('/my-books')
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                 }`}
//               >
//                 <Package className="h-4 w-4" />
//                 <span>My Books</span>
//               </Link>
              
//               <Link
//                 to="/delivery"
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive('/delivery')
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                 }`}
//               >
//                 <MapPin className="h-4 w-4" />
//                 <span>Delivery</span>
//               </Link>

//               <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
//                 <Link
//                   to="/profile"
//                   className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
//                 >
//                   <User className="h-5 w-5" />
//                   <span className="text-sm font-medium">{user?.name}</span>
//                 </Link>
                
//                 <button
//                   onClick={logout}
//                   className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span className="text-sm">Logout</span>
//                 </button>
//               </div>
//             </nav>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, User, Package, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BookShare</span>
          </Link>

          {isAuthenticated && user ? (
            <nav className="flex items-center space-x-4">
              <NavLink to="/books" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Browse Books
              </NavLink>
              <NavLink to="/my-books" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                My Books
              </NavLink>
              <NavLink to="/delivery" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Delivery
              </NavLink>
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button onClick={logout} className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </nav>
          ) : (
            // FIX: Replaced single Login button with Login and Register
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}