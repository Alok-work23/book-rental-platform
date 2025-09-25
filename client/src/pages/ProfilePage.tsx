
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // ADDED: LocateFixed icon for the new button
// import { User, Mail, Phone, MapPin, Shield, Star, Edit3, CreditCard, Calendar, Users, LocateFixed } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export default function ProfilePage() {
//   // ADDED: fetchUserLocation from the context
//   const { user, updateProfile, fetchUserLocation } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
  
//   // ADDED: State to hold the readable live location address
//   const [liveLocation, setLiveLocation] = useState<string>('No live location fetched yet.');
  
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     address: user?.address || '',
//     dob: user?.dob || '',
//     gender: user?.gender || '',
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         address: user.address,
//         dob: user.dob,
//         gender: user.gender,
//       });

//       // ADDED: Effect to fetch address when coordinates change
//       if (user.coordinates) {
//         setLiveLocation('Fetching address...');
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.coordinates.latitude}&lon=${user.coordinates.longitude}`)
//           .then(res => res.json())
//           .then(data => {
//             if (data && data.display_name) {
//               setLiveLocation(data.display_name);
//             } else {
//               setLiveLocation('Could not determine address.');
//             }
//           })
//           .catch(() => setLiveLocation('Failed to fetch address.'));
//       }
//     }
//   }, [user]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleSave = () => {
//     updateProfile(formData);
//     setIsEditing(false);
//     alert('Profile updated successfully!');
//   };
  
//   const handleCancel = () => {
//     if (user) {
//         setFormData({
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             dob: user.dob,
//             gender: user.gender,
//         });
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your account settings and preferences.</p>
          
//           {/* ADDED: Navigation tabs for Profile and Deliveries */}
//           <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
//             <nav className="flex space-x-4">
//               <Link 
//                 to="/profile" 
//                 className="px-3 py-2 font-semibold text-blue-600 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400"
//               >
//                 My Profile
//               </Link>
//               <Link 
//                 to="/delivery" 
//                 className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//               >
//                 My Deliveries
//               </Link>
//             </nav>
//           </div>
//         </div>

//         {/* ADDED: Live Location Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Location</h3>
//                     <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center text-sm">
//                         <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
//                         {liveLocation}
//                     </p>
//                 </div>
//                 <button 
//                     onClick={fetchUserLocation}
//                     className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-cyan-600 transition-colors flex items-center space-x-2 w-full sm:w-auto"
//                 >
//                     <LocateFixed className="h-5 w-5" />
//                     <span>Update Current Location</span>
//                 </button>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//               <div className="text-center mb-6">
//                 <div className="w-24 h-24 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <User className="h-12 w-12 text-blue-600 dark:text-cyan-400" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
//                 <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Verification Status</span>
//                   <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-medium">
//                     <Shield className="h-4 w-4" />
//                     <span>Verified</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">User Rating</span>
//                   <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400 font-medium">
//                     <Star className="h-4 w-4 fill-current" />
//                     <span>4.8 (24 reviews)</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Member Since</span>
//                   <span className="font-medium text-gray-800 dark:text-white">Jan 2024</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
//                 <button onClick={() => isEditing ? handleCancel() : setIsEditing(true)} className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-sm font-semibold">
//                   <Edit3 className="h-4 w-4" />
//                   <span>{isEditing ? 'Cancel' : 'Edit'}</span>
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
//                   {isEditing ? <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"/> : <div className="flex items-center space-x-2 py-3"><User className="h-4 w-4 text-gray-500" /><span>{user?.name}</span></div>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
//                   {isEditing ? <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"/> : <div className="flex items-center space-x-2 py-3"><Mail className="h-4 w-4 text-gray-500" /><span>{user?.email}</span></div>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Phone Number</label>
//                   {isEditing ? <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"/> : <div className="flex items-center space-x-2 py-3"><Phone className="h-4 w-4 text-gray-500" /><span>{user?.phone}</span></div>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Address</label>
//                   {isEditing ? <input name="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"/> : <div className="flex items-center space-x-2 py-3"><MapPin className="h-4 w-4 text-gray-500" /><span>{user?.address}</span></div>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Date of Birth</label>
//                   {isEditing ? <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"/> : <div className="flex items-center space-x-2 py-3"><Calendar className="h-4 w-4 text-gray-500" /><span>{user?.dob}</span></div>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Gender</label>
//                   {isEditing ? (
//                     <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                       <option value="Prefer not to say">Prefer not to say</option>
//                     </select>
//                   ) : <div className="flex items-center space-x-2 py-3 capitalize"><Users className="h-4 w-4 text-gray-500" /><span>{user?.gender}</span></div>}
//                 </div>
//               </div>
//               {isEditing && (
//                 <div className="flex space-x-4 mt-6">
//                   <button onClick={handleSave} className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-black px-6 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-cyan-600">
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Shield, Star, Edit3,
  Calendar, Users, LocateFixed, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Replace with your own avatars!
const BOY_AVATAR = '/src/Avtar/Boy.jpg';
const GIRL_AVATAR = '/src/Avtar/Girl.jpg';

function initialsFromName(name = "") {
  return name.split(" ").map(w => w[0] || "").slice(0,2).join("").toUpperCase();
}

export default function ProfilePage() {
  const { user, updateProfile, fetchUserLocation } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showInitials, setShowInitials] = useState(false);
  const [liveLocation, setLiveLocation] = useState("No live location fetched yet.");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    // profilePic: user?.profilePic || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
      });
      if (user.coordinates) {
        setLiveLocation("Fetching address...");
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.coordinates.latitude}&lon=${user.coordinates.longitude}`
        )
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) setLiveLocation(data.display_name);
            else setLiveLocation("Could not determine address.");
          })
          .catch(() => setLiveLocation("Failed to fetch address."));
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
      });
    }
    setIsEditing(false);
  };

  // Avatar logic: use profilePic, else girl for "female", else boy
  function getAvatarImg() {
    if (user?.profilePic) return user.profilePic;
    if ((user?.gender || "").toLowerCase() === "female") return GIRL_AVATAR;
    return BOY_AVATAR;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:text-blue-800 mb-6 font-semibold"
          onClick={() => navigate('/books')}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Books
        </button>
        
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage your account settings and preferences.
          </p>
          <div className="mt-5 border-b border-gray-200 dark:border-gray-700">
            <nav>
              <span className="px-3 py-2 font-semibold text-blue-600 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400">
                My Profile
              </span>
            </nav>
          </div>
        </div>

        {/* Live Location */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6 mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Location</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1 flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                {liveLocation}
              </p>
            </div>
            <button
              onClick={fetchUserLocation}
              className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-cyan-600 transition flex items-center space-x-2 w-full sm:w-auto"
            >
              <LocateFixed className="h-5 w-5" />
              <span>Update Current Location</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar and Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center mb-7">
                {/* Flip avatar */}
                <div
                  className="w-28 h-28 mx-auto rounded-full shadow-lg relative group cursor-pointer mb-4"
                  style={{ perspective: 1000 }}
                  onMouseEnter={() => setShowInitials(true)}
                  onMouseLeave={() => setShowInitials(false)}
                  onClick={() => setShowInitials(v => !v)}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                      showInitials ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: showInitials ? 'rotateY(180deg)' : 'rotateY(0)',
                    }}
                  >
                    <img
                      src={getAvatarImg()}
                      alt="avatar"
                      className="w-28 h-28 object-cover rounded-full border-4 border-blue-200 dark:border-blue-700 bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-2xl font-bold transition-transform duration-500 ${
                      showInitials ? '' : 'rotate-y-180 pointer-events-none'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: showInitials ? 'rotateY(0)' : 'rotateY(180deg)',
                    }}
                  >
                    {initialsFromName(user?.name || "")}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Verification Status</span>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-semibold">
                    <Shield className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">User Rating</span>
                  <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400 font-semibold">
                    <Star className="h-4 w-4 fill-current" />
                    <span>4.8 (24 reviews)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Form */}
          <div className="lg:col-span-2 flex flex-col gap-7">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                <button
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                  className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-sm font-semibold"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{isEditing ? "Cancel" : "Edit"}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Info fields */}
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{user?.name}</span>
                    </div>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{user?.email}</span>
                    </div>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{user?.phone}</span>
                    </div>
                  )}
                </div>
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{user?.address}</span>
                    </div>
                  )}
                </div>
                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{user?.dob}</span>
                    </div>
                  )}
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2 py-3 capitalize">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{user?.gender}</span>
                    </div>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 dark:bg-cyan-500 text-white dark:text-black px-8 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-cyan-600 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
