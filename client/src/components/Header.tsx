// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BookOpen, User, LogOut, Sun, Moon, ShoppingCart, Package, Search, ChevronDown, MapPin, Bell, Settings, BarChart, CheckCircle, Truck } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';
// import { useCart } from '../contexts/CartContext';

// // Custom hook to detect clicks outside of a component
// const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler();
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// };

// export default function Header() {
//   const { isAuthenticated, user, logout, fetchUserLocation } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const { getTotalItems } = useCart();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
//   const [locationName, setLocationName] = useState('Set Location');
  
//   const profileDropdownRef = useRef<HTMLDivElement>(null);
//   const notificationDropdownRef = useRef<HTMLDivElement>(null);
  
//   useClickOutside(profileDropdownRef, () => setProfileDropdownOpen(false));
//   useClickOutside(notificationDropdownRef, () => setNotificationDropdownOpen(false));

//   const navigate = useNavigate();

//   // Effect to fetch location when user logs in
//   useEffect(() => {
//     if (isAuthenticated && !user?.coordinates) {
//       fetchUserLocation();
//     }
//   }, [isAuthenticated, user?.coordinates, fetchUserLocation]);

//   // Effect to convert coordinates to a readable address
//   useEffect(() => {
//     if (user?.coordinates) {
//       setLocationName('Fetching...');
//       fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.coordinates.latitude}&lon=${user.coordinates.longitude}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data && data.address) {
//             const city = data.address.city || data.address.town || data.address.village || 'Unknown Area';
//             setLocationName(city);
//           } else {
//             setLocationName('Location Not Found');
//           }
//         }).catch(() => setLocationName('Location Error'));
//     }
//   }, [user?.coordinates]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   // The sample notification data now lives here and will be passed to the dropdown
//   const sampleNotifications = [
//     { id: 1, type: 'approved', text: "Your rental request for 'Physics NCERT' was approved.", time: '5 min ago', read: false },
//     { id: 2, type: 'listed', text: "A new book has been listed in 'Mathematics'.", time: '2 hrs ago', read: false },
//     { id: 3, type: 'request', text: "Amit Kumar sent you a rental request.", time: '1 day ago', read: true },
//     { id: 4, type: 'rating', text: "You received a 5-star review on 'Organic Chemistry'.", time: '2 days ago', read: true },
//   ];

//   return (
//     <header className="sticky top-0 z-100 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
//       {/* Stronger Background Effect */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-tr from-blue-300 via-purple-200 to-pink-200 opacity-70 blur-3xl rounded-full"></div>
//         <div className="absolute top-10 right-0 w-72 h-32 bg-gradient-to-br from-pink-200 via-blue-100 to-transparent opacity-60 blur-2xl rounded-full"></div>
//       </div>
//       {/* Main header content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 gap-4">
//           <div className="flex items-center gap-4 flex-shrink-0">
//             <Link to={isAuthenticated ? "/books" : "/"} className="flex items-center space-x-2">
//               <BookOpen className="h-8 w-8 text-blue-600 dark:text-cyan-400" />
//               <span className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">BookShare</span>
//             </Link>
            
//             {isAuthenticated && (
//               <button 
//                 onClick={fetchUserLocation} 
//                 className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-700 dark:text-gray-300"
//                 aria-label="Update location"
//               >
//                 <MapPin className="h-4 w-4" />
//                 <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{locationName}</span>
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           {isAuthenticated && (
//             <div className="flex-1 max-w-2xl mx-auto">
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search books, subjects, authors..."
//                   className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-2 pl-11 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
//                 />
//               </form>
//             </div>
//           )}

//           <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
//             {isAuthenticated && user ? (
//               <nav className="flex items-center space-x-2 sm:space-x-4">
//                 <Link to="/my-books" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
//                   List a Book
//                 </Link>
                
//                 <Link to="/cart" className="relative p-2 text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
//                   <ShoppingCart className="h-6 w-6" />
//                   {getTotalItems() > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">{getTotalItems()}</span>
//                   )}
//                 </Link>

//                 <div className="relative" ref={notificationDropdownRef}>
//                   <button onClick={() => setNotificationDropdownOpen(prev => !prev)} className="relative p-2 text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400" aria-label="Toggle notifications">
//                      <Bell className="h-6 w-6" />
//                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">3</span>
//                   </button>
//                   {notificationDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-20">
//                       <div className="p-3 font-semibold border-b dark:border-gray-700 text-gray-900 dark:text-white">Notifications</div>
//                       <ul className="py-1 max-h-80 overflow-y-auto">
//                         {sampleNotifications.map(notif => (
//                            <li key={notif.id} className="flex items-start gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                              <notif.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${notif.color}`} />
//                              <div>
//                                <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
//                                <p className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</p>
//                              </div>
//                            </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>

//                 <div className="relative" ref={profileDropdownRef}>
//                   <button onClick={() => setProfileDropdownOpen(prev => !prev)} className="flex items-center gap-2" aria-label="Toggle profile menu">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-xs font-semibold">
//                       {(user?.name || user?.email || user?.phone || 'User')
//                         .trim()
//                         .split(/\s+/)
//                         .map(p => p[0])
//                         .slice(0,2)
//                         .join('')
//                         .toUpperCase()}
//                     </div>
//                     <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
//                   </button>
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border dark:border-gray-700 z-50">
//                       <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><BarChart className="h-4 w-4"/>Dashboard</Link>
//                       <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><Package className="h-4 w-4"/>My Orders</Link>
//                       <Link to="/delivery" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><Truck className="h-4 w-4"/>Track Delivery</Link>
//                       <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><User className="h-4 w-4"/>Profile</Link>
//                       <Link to="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><Settings className="h-4 w-4"/>Settings</Link>
//                       <div className="border-t my-1 border-gray-200 dark:border-gray-700"></div>
//                       <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><LogOut className="h-4 w-4"/>Logout</button>
//                     </div>
//                   )}
//                 </div>
//               </nav>
//             ) : null }
//              <button 
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//               aria-label="Toggle theme"
//             >
//               {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }







import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, User, LogOut, Sun, Moon, ShoppingCart, Package, Search, ChevronDown,
  MapPin, Bell, Settings, BarChart, CheckCircle, Truck, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';

// Hook for detecting clicks outside
const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Helper for notification icons
const getIcon = (type: string) => {
  switch (type) {
    case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'listed': return <Package className="h-5 w-5 text-blue-500" />;
    case 'request': return <User className="h-5 w-5 text-purple-500" />;
    case 'rating': return <Star className="h-5 w-5 text-yellow-500" />;
    default: return <Bell className="h-5 w-5 text-gray-400" />;
  }
};

export default function Header() {
  const { isAuthenticated, user, logout, fetchUserLocation } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [locationName, setLocationName] = useState('Set Location');

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileDropdownRef, () => setProfileDropdownOpen(false));
  useClickOutside(notificationDropdownRef, () => setNotificationDropdownOpen(false));

  const navigate = useNavigate();

  // Fetch location on login
  useEffect(() => {
    if (isAuthenticated && !user?.coordinates) {
      fetchUserLocation();
    }
  }, [isAuthenticated, user?.coordinates, fetchUserLocation]);

  // Convert coords to city
  useEffect(() => {
    if (user?.coordinates) {
      setLocationName('Fetching...');
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.coordinates.latitude}&lon=${user.coordinates.longitude}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || 'Unknown Area';
            setLocationName(city);
          } else {
            setLocationName('Location Not Found');
          }
        }).catch(() => setLocationName('Location Error'));
    }
  }, [user?.coordinates]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Your sample notifications
  const sampleNotifications = [
    { id: 1, type: 'approved', text: "Your rental request for 'Physics NCERT' was approved.", time: '5 min ago', read: false },
    { id: 2, type: 'listed', text: "A new book has been listed in 'Mathematics'.", time: '2 hrs ago', read: false },
    { id: 3, type: 'request', text: "Amit Kumar sent you a rental request.", time: '1 day ago', read: true },
    { id: 4, type: 'rating', text: "You received a 5-star review on 'Organic Chemistry'.", time: '2 days ago', read: true },
  ];

  const unread = sampleNotifications.filter(n => !n.read);
  const read = sampleNotifications.filter(n => n.read);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Left */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to={isAuthenticated ? "/books" : "/"} className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-cyan-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">BookShare</span>
            </Link>
            {isAuthenticated && (
              <button 
                onClick={fetchUserLocation} 
                className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-700 dark:text-gray-300"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm truncate max-w-[120px]">{locationName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Center Search */}
          {isAuthenticated && (
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, subjects, authors..."
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-2 pl-11 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
                />
              </form>
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated && user ? (
              <>
                <Link to="/my-books" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600">List a Book</Link>
                
                <Link to="/cart" className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600">
                  <ShoppingCart className="h-6 w-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{getTotalItems()}</span>
                  )}
                </Link>

                {/* Notifications */}
                <div className="relative" ref={notificationDropdownRef}>
                  <button
                    onClick={() => setNotificationDropdownOpen(p => !p)}
                    className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  >
                    <Bell className="h-6 w-6" />
                    {sampleNotifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {sampleNotifications.length}
                      </span>
                    )}
                  </button>
                  {notificationDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-h-[26rem] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                      <div className="px-4 py-2 font-bold border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex items-center gap-2">
                        <Bell className="h-5 w-5 text-blue-500" /> Notifications
                      </div>
                      <div className="p-3 space-y-3">
                        {unread.length > 0 && (
                          <>
                            <div className="text-xs text-blue-600 font-semibold">Unread</div>
                            {unread.map(n => (
                              <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
                                {getIcon(n.type)}
                                <div>
                                  <p className="text-sm text-gray-900 dark:text-white">{n.text}</p>
                                  <span className="text-xs text-gray-500">{n.time} • Unread</span>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {read.length > 0 && (
                          <>
                            <div className="text-xs text-gray-500 font-semibold">Earlier</div>
                            {read.map(n => (
                              <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                {getIcon(n.type)}
                                <div>
                                  <p className="text-sm text-gray-700 dark:text-gray-200">{n.text}</p>
                                  <span className="text-xs text-gray-400">{n.time}</span>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="py-2 px-4 border-t border-gray-100 dark:border-gray-800 text-right">
                        <Link to="/notifications" className="text-blue-600 dark:text-cyan-400 text-sm font-semibold hover:underline">
                          View all
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileDropdownRef}>
                  <button onClick={() => setProfileDropdownOpen(p => !p)} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-xs font-semibold">
                      {(user?.name || user?.email || user?.phone || 'U').trim().split(/\s+/).map(p => p[0]).slice(0,2).join('').toUpperCase()}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border dark:border-gray-700 z-50">
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><BarChart className="h-4 w-4"/>Dashboard</Link>
                      <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><Package className="h-4 w-4"/>My Orders</Link>
                      <Link to="/delivery" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><Truck className="h-4 w-4"/>Track Delivery</Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><User className="h-4 w-4"/>Profile</Link>
                      <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><Settings className="h-4 w-4"/>Settings</Link>
                      <div className="border-t my-1" />
                      <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"><LogOut className="h-4 w-4"/>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : null}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
