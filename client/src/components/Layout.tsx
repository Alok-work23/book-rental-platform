// // import React from 'react';
// // import { Outlet } from 'react-router-dom';
// // import Header from './Header'; // Uses the Header component you already have

// // export default function Layout() {
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />
// //       <main>
// //         {/* The Outlet will render the current page (e.g., BooksPage, ProfilePage) */}
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }




// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// export default function Layout() {
//   return (
//     <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
//       {/* Global background effects (fixed across all pages) */}
//       <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
//         <div className="bg-grid-slate absolute inset-0 opacity-60 dark:opacity-20"></div>
//         <div className="absolute -top-56 -left-56 h-[36rem] w-[36rem] bg-gradient-to-tr from-cyan-400/30 to-blue-600/30 blur-3xl rounded-full" />
//         <div className="absolute top-1/3 -right-56 h-[36rem] w-[36rem] bg-gradient-to-tr from-fuchsia-400/25 to-purple-600/25 blur-3xl rounded-full" />
//         <div className="absolute bottom-[-10rem] left-1/4 h-[28rem] w-[28rem] bg-gradient-to-tr from-amber-300/20 to-pink-400/20 blur-3xl rounded-full" />
//       </div>

//       <Header />
//       <main className="relative flex-grow">
//         {/* Content-layer background (behind page content) */}
//         <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
//           <div className="bg-grid-slate absolute inset-0 opacity-30 dark:opacity-10" />
//           <div className="absolute top-20 left-10 h-64 w-64 bg-gradient-to-tr from-blue-400/15 to-cyan-400/15 blur-2xl rounded-full" />
//           <div className="absolute bottom-10 right-10 h-64 w-64 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 blur-2xl rounded-full" />
//         </div>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Global background decorations */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid-slate absolute inset-0 opacity-60 dark:opacity-20" />
        <div className="absolute left-0 top-[-56px] w-[36rem] h-[36rem] bg-gradient-to-tr from-cyan-400/30 to-blue-600/30 blur-3xl rounded-full" />
        <div className="absolute right-0 top-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-fuchsia-400/25 to-purple-600/25 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10rem] left-1/4 w-[28rem] h-[28rem] bg-gradient-to-tr from-amber-300/20 to-pink-400/20 blur-3xl rounded-full" />
      </div>

      {/* Fixed Header */}
      <Header />

      {/* Main Content with padding to avoid overlap with fixed header */}
      <main className="pt-16 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
