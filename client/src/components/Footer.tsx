// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BookOpen, Facebook, Instagram, Linkedin, ShieldCheck, Users, Truck } from 'lucide-react';
// import XLogoIcon from './icons/XLogoIcon';

// export default function Footer() {
//   const socialLinks = [
//     { name: 'Facebook', icon: Facebook, href: '#' },
//     { name: 'X (formerly Twitter)', icon: XLogoIcon, href: '#' },
//     { name: 'Instagram', icon: Instagram, href: '#' },
//     { name: 'LinkedIn', icon: Linkedin, href: '#' },
//   ];

//   const quickLinks = [
//     { name: 'How it Works', href: '/how-it-works' },
//     { name: 'Browse Books', href: '/books' },
//     { name: 'List a Book', href: '/my-books' },
//     { name: 'Become Partner', href: '/become-partner' },
//     { name: 'Safety Guidelines', href: '/safety-guidelines' },
//   ];

//   const supportLinks = [
//     { name: 'Help Center', href: '/help-center' },
//     { name: 'Contact Us', href: '/contact-us' },
//     { name: 'Terms of Service', href: '/terms-of-service' },
//     { name: 'Privacy Policy', href: '/privacy-policy' },
//     { name: 'Refund Policy', href: '/refund-policy' },
//   ];

//   return (
//     // UPDATED: Removed theme-specific classes to make the footer always dark.
//     <footer className="bg-slate-900 border-t border-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Column 1: Brand Info */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-2 mb-4">
//               <BookOpen className="h-8 w-8 text-cyan-400" />
//               <span className="text-xl font-bold text-white">BookShare</span>
//             </div>
//             <p className="text-gray-400 max-w-sm">
//               Connecting students through book sharing. Rent, buy, and sell academic books with verified users in your area.
//             </p>
//             <div className="flex space-x-4 mt-6">
//               {socialLinks.map((link) => (
//                 <a key={link.name} href={link.href} className="text-gray-400 hover:text-white">
//                   <span className="sr-only">{link.name}</span>
//                   <link.icon className="h-6 w-6" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Column 2: Quick Links */}
//           <div>
//             <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link to={link.href} className="text-base text-gray-400 hover:text-white">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Support */}
//           <div>
//             <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
//             <ul className="space-y-2">
//               {supportLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link to={link.href} className="text-base text-gray-400 hover:text-white">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
//           <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} BookShare. All rights reserved.</p>
//           <div className="flex space-x-6 mt-4 sm:mt-0">
//             <div className="flex items-center space-x-2 text-sm text-green-400">
//               <ShieldCheck className="h-5 w-5" />
//               <span>Secure Payments</span>
//             </div>
//             <div className="flex items-center space-x-2 text-sm text-green-400">
//               <Users className="h-5 w-5" />
//               <span>Verified Users</span>
//             </div>
//             <div className="flex items-center space-x-2 text-sm text-green-400">
//               <Truck className="h-5 w-5" />
//               <span>Safe Delivery</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }





import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Instagram, Linkedin, ShieldCheck, Users, Truck } from "lucide-react";
import XLogoIcon from "./icons/XLogoIcon";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "X (formerly Twitter)", icon: XLogoIcon, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const quickLinks = [
    { name: "How it Works", href: "/how-it-works" },
    { name: "Browse Books", href: "/books" },
    { name: "List a Book", href: "/my-books" },
    { name: "Become Partner", href: "/become-partner" },
    { name: "Safety Guidelines", href: "/safety-guidelines" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help-center" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 relative text-white border-t border-blue-800">
      {/* Decorative background blur/blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-0 -top-24 w-96 h-40 bg-blue-300 opacity-20 blur-2xl rounded-full" />
        <div className="absolute right-0 bottom-0 w-80 h-28 bg-indigo-400 opacity-20 blur-2xl rounded-full" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-100 to-indigo-400 text-transparent bg-clip-text">BookShare</span>
            </div>
            <p className="text-gray-200 max-w-sm font-medium">
              Connecting students through book sharing. Rent, buy, and sell academic books with verified users in your area.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-400 hover:text-cyan-300 transition">
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-cyan-300 tracking-wide uppercase mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-base text-gray-300 hover:text-cyan-200 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-cyan-300 tracking-wide uppercase mb-5">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-base text-gray-300 hover:text-cyan-200 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-bold text-cyan-200">BookShare</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
              <ShieldCheck className="h-5 w-5" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
              <Users className="h-5 w-5" />
              <span>Verified Users</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
              <Truck className="h-5 w-5" />
              <span>Safe Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
