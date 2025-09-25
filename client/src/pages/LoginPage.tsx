// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Shield } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export default function LoginPage() {
//   const [contactInfo, setContactInfo] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const success = await login({ contact: contactInfo, password });
//       if (success) {
//         navigate('/books');
//       } else {
//         setError('Invalid email/mobile or password. Please try again.');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          
//           <div className="p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-8">Log in to continue to BookShare.</p>
            
//             {error && (
//               <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-500/30 rounded-lg p-3 mb-6 text-center">
//                 <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
//               </div>
//             )}
            
//             <form onSubmit={handleLogin} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email or Mobile</label>
//                 <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600" required />
//               </div>
//               <button type="submit" disabled={loading} className="w-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-black p-3 rounded-lg font-bold">
//                 {loading ? 'Signing in...' : 'Sign In'}
//               </button>
//             </form>

//             <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//               Don't have an account? <Link to="/register" className="font-medium text-blue-600 dark:text-cyan-400 hover:underline">Register now</Link>
//             </p>
//           </div>

//           <div className="hidden lg:block relative bg-blue-600 dark:bg-slate-900 p-12">
//             <div className="relative z-10 flex flex-col justify-center h-full space-y-8">
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between mb-2"><h3 className="font-bold">Verified Users</h3><p className="text-2xl font-bold">25,000+</p></div>
//                 <div className="w-full bg-white/20 h-1.5 rounded-full"><div className="bg-cyan-400 h-1.5 rounded-full w-3/4"></div></div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-white/20 rounded-lg"><Shield className="h-6 w-6" /></div>
//                   <div>
//                     <h3 className="font-bold">Your Data, Your Rules</h3>
//                     <p className="text-sm text-blue-100 dark:text-slate-300">Your information is encrypted and secure.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, ArrowLeft, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Forgot Password Modal
function ForgotPasswordModal({ open, onClose }) {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const validateContact = () => {
    const contactRegex = /^(?:\d{10}|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
    return contact && contactRegex.test(contact);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setError("");
    if (!validateContact()) {
      setError("Please enter a valid email or mobile.");
      return;
    }
    setSent(true);
    // Simulate send (replace with real API in production)
    setTimeout(() => {}, 1000);
  };

  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30 transition-all">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 font-bold"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-white">
          Forgot Password
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Enter your registered email or mobile. You'll receive reset instructions.
        </p>
        {sent ? (
          <div className="text-green-700 py-4 text-center font-semibold">
            Reset link sent! (Use <span className="font-mono">123456</span> in demo)
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3">
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
              placeholder="Email or Mobile"
              required
              autoFocus
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const success = await login({ contact: contactInfo, password });
      if (success) {
        navigate("/books");
      } else {
        setError("Invalid email/mobile or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center p-4">
      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />

      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* LEFT SIDE FORM */}
          <div className="p-8 md:p-12 relative flex flex-col">
            <button
              type="button"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 -mt-2"
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Log in to continue to BookShare.</p>
            {error && (
              <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-500/30 rounded-lg p-3 mb-6 text-center">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email or Mobile
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="mt-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-black p-3 rounded-lg font-bold"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
            {/* Forgot Password link */}
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-blue-600 dark:text-cyan-400 font-medium hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-600 dark:text-cyan-400 hover:underline">
                Register now
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE - Welcome art and stats */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 dark:from-blue-900 dark:via-violet-950 dark:to-pink-900 p-12 relative">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400/30 via-pink-500/30 to-yellow-300/10 blur-2xl" />
            <div className="z-10 flex flex-col items-center space-y-6">
              <BookOpen className="h-20 w-20 text-white drop-shadow-md mb-3" />
              <h3 className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow-sm">
                Welcome back to <span className="text-yellow-200">BookShare</span>
              </h3>
              <p className="text-lg text-blue-100 text-center max-w-xs mb-6">
                <span className="font-semibold text-white">Ready to unlock your next chapter?</span>
                <br />
                We make studying brilliant—find, rent, or buy any book. Your data stays safe.
              </p>
              {/* Stats & Security */}
              <div className="grid grid-cols-1 gap-5 w-[260px]">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-white text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Verified Users</span>
                    <span className="text-xl font-bold">25,000+</span>
                  </div>
                  <div className="w-full bg-white/20 h-1 rounded-full mb-1">
                    <div className="bg-cyan-400 h-1 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-white text-sm flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold">Your Data Secure</span>
                    <div className="text-xs text-blue-100">Encrypted & protected privacy.</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative colored blobs */}
            <div className="absolute -bottom-16 right-0 w-32 h-32 bg-pink-400 opacity-20 blur-2xl rounded-full" />
            <div className="absolute bottom-2 left-0 w-16 h-16 bg-blue-400 opacity-10 blur-xl rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
