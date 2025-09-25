// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Shield, CheckCircle } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// // UPDATED: Password validation logic to check for specific rules
// const validatePassword = (password: string) => {
//   const validations = {
//     length: password.length >= 8,
//     uppercase: /[A-Z]/.test(password),
//     lowercase: /[a-z]/.test(password),
//     number: /[0-9]/.test(password),
//   };
//   const score = Object.values(validations).filter(Boolean).length;
//   let strength = { label: 'Weak', color: 'text-red-500', width: 'w-1/4' };
//   if (score >= 2) strength = { label: 'Medium', color: 'text-yellow-500', width: 'w-1/2' };
//   if (score >= 4) strength = { label: 'Strong', color: 'text-green-500', width: 'w-full' };
  
//   return { validations, strength };
// };


// export default function RegisterPage() {
//   const [step, setStep] = useState<'contact' | 'otp' | 'password' | 'profile'>('contact');
//   const [contactInfo, setContactInfo] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [profileData, setProfileData] = useState({ name: '', dob: '', gender: '', address: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [errors, setErrors] = useState({ contact: '', confirmPassword: '' });

//   const { completeRegistration, updateProfile } = useAuth();
//   const navigate = useNavigate();
//   // UPDATED: Use the new validation logic
//   const { validations, strength } = validatePassword(password);

//   useEffect(() => {
//     if (password && confirmPassword && password !== confirmPassword) {
//       setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match." }));
//     } else {
//       setErrors(prev => ({ ...prev, confirmPassword: "" }));
//     }
//   }, [password, confirmPassword]);

//   const validateContact = () => {
//     const contactRegex = /^(?:\d{10}|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
//     if (!contactInfo || !contactRegex.test(contactInfo)) {
//       setErrors(prev => ({ ...prev, contact: "Please enter a valid 10-digit mobile number or email." }));
//       return false;
//     }
//     setErrors(prev => ({ ...prev, contact: "" }));
//     return true;
//   };
  
//   const handleSendOtp = () => {
//     if (validateContact()) {
//       setStep('otp');
//       setError('');
//       alert(`OTP sent to ${contactInfo}. Use 123456 for demo.`);
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp === '123456') {
//       setStep('password');
//       setError('');
//     } else {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   const handlePasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (errors.confirmPassword || strength.label === 'Weak') {
//         setError('Please fix password errors before proceeding.');
//         return;
//     }
//     setStep('profile');
//     setError('');
//   };
  
//   const handleProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       // First complete the initial registration with contact and password
//       await completeRegistration({ contact: contactInfo, password });
      
//       // Then update the profile with the additional details
//       updateProfile({
//         name: profileData.name,
//         email: contactInfo.includes('@') ? contactInfo : '',
//         phone: !contactInfo.includes('@') ? contactInfo : '',
//         address: profileData.address,
//         dob: profileData.dob,
//         gender: profileData.gender,
//       });
      
//       navigate('/books');
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : 'Registration failed.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          
//           <div className="p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create an Account</h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-8">Join the BookShare community today.</p>
            
//             {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            
//             {step === 'contact' && (
//               <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-4">
//                 <div>
//                   <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email or Mobile</label>
//                   <div className="mt-1 flex space-x-2">
//                     <input id="contact" type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} onBlur={validateContact} className={`flex-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.contact ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`} required />
//                     <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Send OTP</button>
//                   </div>
//                   {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
//                 </div>
//               </form>
//             )}

//             {step === 'otp' && (
//               <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-4">
//                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Enter OTP for {contactInfo}</label>
//                 <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border rounded-lg text-center tracking-widest dark:bg-slate-700" required />
//                 <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">Verify OTP</button>
//               </form>
//             )}
            
//             {step === 'password' && (
//               <form onSubmit={handlePasswordSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Set Password</label>
//                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
                  
//                   {password && (
//                     <div className="mt-4 space-y-2">
//                       <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${strength.color.replace('text', 'bg')} ${strength.width}`}></div></div>
//                       <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
//                         <p className={`flex items-center ${validations.length ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>At least 8 characters</p>
//                         <p className={`flex items-center ${validations.uppercase ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One uppercase letter</p>
//                         <p className={`flex items-center ${validations.lowercase ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One lowercase letter</p>
//                         <p className={`flex items-center ${validations.number ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One number</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
//                   <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full p-3 border rounded-lg dark:bg-slate-700 ${errors.confirmPassword ? 'border-red-500' : 'dark:border-slate-600'}`} required />
//                   {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">Continue</button>
//               </form>
//             )}

//             {step === 'profile' && (
//               <form onSubmit={handleProfileSubmit} className="space-y-4">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tell us about yourself</h3>
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
//                   <input id="name" type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
//                 </div>
//                 <div>
//                   <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
//                   <input id="dob" type="date" value={profileData.dob} onChange={(e) => setProfileData({...profileData, dob: e.target.value})} className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
//                 </div>
//                 <div>
//                   <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
//                   <select id="gender" value={profileData.gender} onChange={(e) => setProfileData({...profileData, gender: e.target.value})} className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required>
//                     <option value="" disabled>Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
//                   <textarea id="address" rows={2} value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-black p-3 rounded-lg font-bold">
//                   {loading ? 'Finishing Up...' : 'Complete Registration'}
//                 </button>
//               </form>
//             )}

//             <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link to="/login" className="font-medium text-blue-600 dark:text-cyan-400 hover:underline">Sign in</Link></p>
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






import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Password validation logic
const validatePassword = (password) => {
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const score = Object.values(validations).filter(Boolean).length;
  let strength = { label: 'Weak', color: 'text-red-500', width: 'w-1/4' };
  if (score >= 2) strength = { label: 'Medium', color: 'text-yellow-500', width: 'w-1/2' };
  if (score >= 4) strength = { label: 'Strong', color: 'text-green-500', width: 'w-full' };
  return { validations, strength };
};

export default function RegisterPage() {
  const [step, setStep] = useState('contact');
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileData, setProfileData] = useState({ name: '', dob: '', gender: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ contact: '', confirmPassword: '' });

  const { completeRegistration, updateProfile } = useAuth();
  const navigate = useNavigate();

  const { validations, strength } = validatePassword(password);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match." }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  }, [password, confirmPassword]);

  const validateContact = () => {
    const contactRegex = /^(?:\d{10}|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
    if (!contactInfo || !contactRegex.test(contactInfo)) {
      setErrors(prev => ({ ...prev, contact: "Please enter a valid 10-digit mobile number or email." }));
      return false;
    }
    setErrors(prev => ({ ...prev, contact: "" }));
    return true;
  };

  // --- New: Back button logic
  const handleBack = () => {
    if (step === 'contact') {
      navigate(-1); // Go to previous route
    } else if (step === 'otp') {
      setStep('contact');
      setError('');
    } else if (step === 'password') {
      setStep('otp');
      setError('');
    } else if (step === 'profile') {
      setStep('password');
      setError('');
    }
  };

  const handleSendOtp = () => {
    if (validateContact()) {
      setStep('otp');
      setError('');
      alert(`OTP sent to ${contactInfo}. Use 123456 for demo.`);
    }
  };
  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setStep('password');
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (errors.confirmPassword || strength.label === 'Weak') {
      setError('Please fix password errors before proceeding.');
      return;
    }
    setStep('profile');
    setError('');
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await completeRegistration({ contact: contactInfo, password });
      await updateProfile({
        name: profileData.name,
        email: contactInfo.includes('@') ? contactInfo : '',
        phone: !contactInfo.includes('@') ? contactInfo : '',
        address: profileData.address,
        dob: profileData.dob,
        gender: profileData.gender,
      });
      navigate('/books');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-blue-950 dark:to-pink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* LEFT: FORM & BACK BUTTON */}
          <div className="p-8 md:p-12 relative flex flex-col min-h-[530px]">
            {/* Back button */}
            <button
              type="button"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 -mt-2"
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create an Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Join the BookShare community today.</p>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            {step === 'contact' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-4">
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email or Mobile</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      id="contact"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      onBlur={validateContact}
                      className={`flex-1 w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.contact ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                      required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                      Send OTP
                    </button>
                  </div>
                  {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                </div>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter OTP for {contactInfo}
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border rounded-lg text-center tracking-widest dark:bg-slate-700"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
                  Verify OTP
                </button>
              </form>
            )}

            {step === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Set Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />

                  {password && (
                    <div className="mt-4 space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${strength.color.replace('text', 'bg')} ${strength.width}`}></div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <p className={`flex items-center ${validations.length ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>At least 8 characters</p>
                        <p className={`flex items-center ${validations.uppercase ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One uppercase letter</p>
                        <p className={`flex items-center ${validations.lowercase ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One lowercase letter</p>
                        <p className={`flex items-center ${validations.number ? 'text-green-500' : ''}`}><CheckCircle className="h-3 w-3 mr-1"/>One number</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full p-3 border rounded-lg dark:bg-slate-700 ${errors.confirmPassword ? 'border-red-500' : 'dark:border-slate-600'}`}
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">
                  Continue
                </button>
              </form>
            )}

            {step === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tell us about yourself</h3>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input id="name" type="text" value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                  <input id="dob" type="date" value={profileData.dob}
                    onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                    className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                  <select id="gender" value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <textarea id="address" rows={2} value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-black p-3 rounded-lg font-bold">
                  {loading ? 'Finishing Up...' : 'Complete Registration'}
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account? <Link to="/login" className="font-medium text-blue-600 dark:text-cyan-400 hover:underline">Sign in</Link>
            </p>
          </div>

          {/* RIGHT: BOOKSHARE ART + SLOGAN */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 dark:from-blue-900 dark:via-violet-950 dark:to-pink-900 p-12 relative">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400/30 via-pink-500/20 to-yellow-300/10 blur-2xl" />
            <div className="z-10 flex flex-col items-center space-y-6">
              <BookOpen className="h-20 w-20 text-white drop-shadow-md mb-2" />
              <h3 className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow-sm">
                Welcome to BookShare
              </h3>
              <p className="text-lg text-blue-100 text-center max-w-xs mb-6">
                <span className="font-semibold text-white">Where students open new chapters!</span>
                <br />
                Discover, rent, and share the books that spark your next adventure.
              </p>
              {/* Stats & Security callouts */}
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
                  <div className="p-2 bg-white/10 rounded-lg"><Shield className="h-5 w-5" /></div>
                  <div>
                    <span className="font-bold">Your Data Secure</span>
                    <div className="text-xs text-blue-100">Encrypted & protected privacy.</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative colored blobs for effect */}
            <div className="absolute -bottom-16 right-0 w-32 h-32 bg-pink-400 opacity-20 blur-2xl rounded-full" />
            <div className="absolute bottom-2 left-0 w-16 h-16 bg-blue-400 opacity-10 blur-xl rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
