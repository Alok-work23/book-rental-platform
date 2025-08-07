// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, Mail, CreditCard, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export default function LoginPage() {
//   const [step, setStep] = useState<'email' | 'aadhar' | 'otp'>('email');
//   const [email, setEmail] = useState('');
//   const [aadhar, setAadhar] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showAadhar, setShowAadhar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleEmailSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email) {
//       setStep('aadhar');
//       setError('');
//     }
//   };

//   const handleAadharSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (aadhar.length === 12) {
//       setStep('otp');
//       setError('');
//       // Simulate OTP sending
//       alert('OTP sent to your Aadhar-linked mobile number. Use 123456 for demo.');
//     } else {
//       setError('Please enter a valid 12-digit Aadhar number');
//     }
//   };

//   const handleOtpSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const success = await login({ email, aadhar, otp });
//       if (success) {
//         navigate('/books');
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold text-gray-900">Secure Login</h2>
//             <p className="text-gray-600 mt-2">
//               Aadhar-verified access to BookShare platform
//             </p>
//           </div>

//           {/* Progress Indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center space-x-2">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step === 'email' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
//               }`}>
//                 <Mail className="h-4 w-4" />
//               </div>
//               <div className={`w-8 h-1 ${step !== 'email' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step === 'aadhar' ? 'bg-blue-600 text-white' : 
//                 step === 'otp' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 <CreditCard className="h-4 w-4" />
//               </div>
//               <div className={`w-8 h-1 ${step === 'otp' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step === 'otp' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 <Shield className="h-4 w-4" />
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//               <p className="text-red-600 text-sm">{error}</p>
//             </div>
//           )}

//           {step === 'email' && (
//             <form onSubmit={handleEmailSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email address"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Continue
//               </button>
//             </form>
//           )}

//           {step === 'aadhar' && (
//             <form onSubmit={handleAadharSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-2">
//                   Aadhar Number
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="aadhar"
//                     type={showAadhar ? 'text' : 'password'}
//                     value={aadhar}
//                     onChange={(e) => setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//                     placeholder="Enter 12-digit Aadhar number"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowAadhar(!showAadhar)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showAadhar ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Your Aadhar details are encrypted and secure
//                 </p>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Send OTP
//               </button>
//             </form>
//           )}

//           {step === 'otp' && (
//             <form onSubmit={handleOtpSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//                   Enter OTP
//                 </label>
//                 <input
//                   id="otp"
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
//                   placeholder="000000"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-2">
//                   OTP sent to your Aadhar-linked mobile number
//                 </p>
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//               >
//                 {loading ? 'Verifying...' : 'Verify & Login'}
//               </button>
//             </form>
//           )}

//           <div className="mt-6 text-center">
//             <p className="text-xs text-gray-500">
//               By logging in, you agree to our Terms of Service and Privacy Policy
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login({ contact: contactInfo, password });
      if (success) {
        navigate('/books');
      } else {
        setError('Invalid email/mobile or password. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Log in to access your account.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-center">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="contact"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email or mobile"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}